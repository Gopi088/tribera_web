import {
  badRequest,
  deliverFormEmail,
  escapeHtml,
  inspectUploadedFile,
  json,
  logFunctionError,
  normalizeFields,
  runFormRequestChecks,
  sanitizeSubjectPart,
  validateFieldLengths,
  validateResumeFile,
} from './form-utils.mjs';
import { JOB_CATALOG } from './job-catalog.mjs';

// Native POSTs receive a readable result; enhanced clients must request JSON.
// The UI must still provide botcheck and a fresh form_loaded_at. The candidate
// native form issues that timestamp at request time in candidate-form-v9.mjs.
const negotiateResponse = (event, response) => {
  const accept = event.headers?.accept || event.headers?.Accept || '';
  if (!accept.includes('text/html') || accept.includes('application/json')) return response;
  const result = JSON.parse(response.body);
  const heading = result.success ? 'Submission received' : 'Submission could not be completed';
  const message = result.success
    ? 'Thank you. Your CV has been received by the team.'
    : result.message || 'Please try again.';
  return {
    ...response,
    headers: {
      ...response.headers,
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Content-Security-Policy': "default-src 'none'; base-uri 'none'; frame-ancestors 'none'",
    },
    body: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${heading}</title></head><body><main><h1>${heading}</h1><p>${escapeHtml(message)}</p><p><a href="/">Return to Tribera</a></p></main></body></html>`,
  };
};

export const createV9CvHandler = (kind) => {
  if (!['candidate', 'career'].includes(kind)) throw new Error('Unknown CV submission kind.');
  const career = kind === 'career';
  // Share the existing limiter buckets so alternate versions cannot double quotas.
  const scope = career ? 'careers-apply' : 'candidate-profile';
  return async (event) => {
    const respond = (response) => negotiateResponse(event, response);
    if (event.httpMethod !== 'POST') return respond(json(405, { success: false, message: 'Method not allowed.' }));
    try {
      const checks = await runFormRequestChecks(event, { scope, rejectExtraFiles: true });
      if (checks.response) return respond(checks.response);
      const fields = normalizeFields(checks.fields);
      const cv = checks.files.find((file) => file.fieldName === 'cv');
      if (!cv || (career ? !fields.paragraph || !fields.job_slug : !fields.intent)) {
        return respond(badRequest('Please complete the required fields and attach your CV.'));
      }
      const lengths = validateFieldLengths(fields, [
        { name: 'phone', label: 'Phone number', maxLength: 32 },
        { name: 'paragraph', label: 'Paragraph', maxLength: 4000 },
        { name: 'job_slug', label: 'Role identifier', maxLength: 120 },
      ]);
      if (!lengths.ok) return respond(badRequest(lengths.message));
      let job;
      if (career) {
        job = Object.hasOwn(JOB_CATALOG, fields.job_slug) ? JOB_CATALOG[fields.job_slug] : null;
        if (!job || job.status !== 'open') return respond(badRequest('Please select an open role.'));
      } else if (!['active', 'open'].includes(fields.intent)) {
        return respond(badRequest('Please select a valid job-search preference.'));
      }
      const validation = validateResumeFile(cv);
      if (!validation.ok) return respond(badRequest(validation.message));
      const scan = await inspectUploadedFile(validation.file, scope);
      if (!scan.ok) return respond(badRequest(scan.message));
      const title = career ? `New application for ${job.title}` : 'New candidate profile submission';
      const lines = career
        ? [
            title,
            `Role: ${job.title}`,
            `Slug: ${fields.job_slug}`,
            `Department: ${job.department}`,
            `Paragraph: ${fields.paragraph}`,
          ]
        : [title, `Intent: ${fields.intent === 'active' ? 'Actively looking' : 'Open to the right role'}`];
      lines.push(`Phone: ${fields.phone || 'Not provided'}`, 'Contact details: see attached CV.');
      await deliverFormEmail({
        to: (career ? process.env.CAREERS_TO : process.env.CANDIDATES_TO) || 'careers@tribera.ai',
        subject: career ? `Career application: ${sanitizeSubjectPart(job.title)}` : 'Candidate profile: CV submission',
        text: lines.join('\n\n'),
        html: lines.map((line) => `<p>${escapeHtml(line).replace(/\n/g, '<br>')}</p>`).join(''),
        attachments: [scan.file],
      });
      return respond(json(200, { success: true }));
    } catch {
      logFunctionError(event, `${scope}-v9`, 'cv_submission_failed');
      return respond(
        json(500, {
          success: false,
          message: 'Something went wrong. Please try again or email your CV to careers@tribera.ai.',
        })
      );
    }
  };
};
