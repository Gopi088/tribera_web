import {
  badRequest,
  deliverFormEmail,
  escapeHtml,
  isValidEmail,
  isValidHttpUrl,
  inspectUploadedFile,
  json,
  logFunctionError,
  normalizeFields,
  runFormRequestChecks,
  sanitizeSubjectPart,
  validateFieldLengths,
  validateResumeFile,
} from './_lib/form-utils.mjs';
import { findJobBySlug } from './_lib/job-catalog.mjs';

const GENERIC_FAILURE_MESSAGE =
  'Something went wrong while submitting your application. Please try again or email your resume to careers@tribera.ai.';

const withBreaks = (value) => escapeHtml(value).replace(/\n/g, '<br />');

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { success: false, message: 'Method not allowed.' });
  }

  try {
    const requestChecks = await runFormRequestChecks(event, {
      scope: 'careers-apply',
    });
    if (requestChecks.response) {
      return requestChecks.response;
    }

    const fields = normalizeFields(requestChecks.fields);
    const { files } = requestChecks;
    const resumeFile = files[0];

    if (!fields.name || !fields.email || !fields.job_slug || !resumeFile) {
      return badRequest('Please complete the required fields and attach your resume.');
    }

    const fieldLengthValidation = validateFieldLengths(fields, [
      { name: 'name', label: 'Name', maxLength: 120 },
      { name: 'email', label: 'Email', maxLength: 254 },
      { name: 'mobile', label: 'Mobile number', maxLength: 32 },
      { name: 'current_company', label: 'Current company', maxLength: 120 },
      { name: 'linkedin', label: 'LinkedIn URL', maxLength: 300 },
      { name: 'note', label: 'Note', maxLength: 4000 },
      { name: 'job_slug', label: 'Role identifier', maxLength: 120 },
    ]);
    if (!fieldLengthValidation.ok) {
      return badRequest(fieldLengthValidation.message);
    }

    if (!isValidEmail(fields.email)) {
      return badRequest('Please enter a valid email address.');
    }

    if (fields.linkedin && !isValidHttpUrl(fields.linkedin)) {
      return badRequest('Please enter a valid LinkedIn URL.');
    }

    const job = findJobBySlug(fields.job_slug);
    if (!job) {
      return badRequest('Please select a valid role.');
    }

    const resumeValidation = validateResumeFile(resumeFile);
    if (!resumeValidation.ok) {
      return badRequest(resumeValidation.message);
    }

    const scanResult = await inspectUploadedFile(resumeValidation.file, 'careers-apply');
    if (!scanResult.ok) {
      return badRequest(scanResult.message);
    }

    const recipient = process.env.CAREERS_TO || 'careers@tribera.ai';

    const text = [
      `New application for ${job.title}`,
      '',
      `Role: ${job.title}`,
      `Slug: ${fields.job_slug}`,
      `Department: ${job.department}`,
      '',
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `Mobile: ${fields.mobile || 'Not provided'}`,
      `Current company: ${fields.current_company || 'Not provided'}`,
      `LinkedIn: ${fields.linkedin || 'Not provided'}`,
      '',
      'Note:',
      fields.note || 'Not provided',
    ].join('\n');

    const html = `
      <div style="font-family: Inter, Arial, sans-serif; color: #111;">
        <h2 style="margin-bottom: 16px;">New application for ${escapeHtml(job.title)}</h2>
        <p><strong>Role:</strong> ${escapeHtml(job.title)}</p>
        <p><strong>Slug:</strong> ${escapeHtml(fields.job_slug)}</p>
        <p><strong>Department:</strong> ${escapeHtml(job.department)}</p>
        <hr style="margin: 20px 0; border: 0; border-top: 1px solid rgba(0,0,0,0.08);" />
        <p><strong>Name:</strong> ${escapeHtml(fields.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
        <p><strong>Mobile:</strong> ${escapeHtml(fields.mobile || 'Not provided')}</p>
        <p><strong>Current company:</strong> ${escapeHtml(fields.current_company || 'Not provided')}</p>
        <p><strong>LinkedIn:</strong> ${escapeHtml(fields.linkedin || 'Not provided')}</p>
        <p><strong>Note:</strong></p>
        <p>${withBreaks(fields.note || 'Not provided')}</p>
      </div>
    `;

    await deliverFormEmail({
      to: recipient,
      replyTo: fields.email,
      subject: `Career application: ${sanitizeSubjectPart(job.title)} - ${sanitizeSubjectPart(fields.name)}`,
      text,
      html,
      attachments: [scanResult.file],
    });

    return json(200, { success: true });
  } catch {
    logFunctionError(event, 'careers-apply', 'careers_apply_failed');

    return json(500, {
      success: false,
      message: GENERIC_FAILURE_MESSAGE,
    });
  }
};
