import {
  badRequest,
  deliverFormEmail,
  escapeHtml,
  isValidEmail,
  json,
  logFunctionError,
  runFormRequestChecks,
  sanitizeSubjectPart,
  validateResumeFile,
} from './_lib/form-utils.mjs';

const FAILURE_MESSAGE =
  'Something went wrong while submitting your profile. Please try again or email your resume to careers@tribera.ai.';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { success: false, message: 'Method not allowed.' });
  }

  try {
    const requestChecks = await runFormRequestChecks(event, {
      scope: 'candidate-profile',
    });
    if (requestChecks.response) {
      return requestChecks.response;
    }

    const { fields, files } = requestChecks;
    const resumeFile = files[0];

    if (!fields.name || !fields.email || !resumeFile) {
      return badRequest('Please complete the required fields and attach your resume.');
    }

    if (!isValidEmail(fields.email)) {
      return badRequest('Please enter a valid email address.');
    }

    const resumeValidation = validateResumeFile(resumeFile);
    if (!resumeValidation.ok) {
      return badRequest(resumeValidation.message);
    }

    const recipient = process.env.CANDIDATES_TO || 'careers@tribera.ai';

    const text = [
      'New candidate profile submission',
      '',
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `Mobile: ${fields.mobile || 'Not provided'}`,
    ].join('\n');

    const html = `
      <div style="font-family: Inter, Arial, sans-serif; color: #111;">
        <h2 style="margin-bottom: 16px;">New candidate profile submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(fields.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
        <p><strong>Mobile:</strong> ${escapeHtml(fields.mobile || 'Not provided')}</p>
      </div>
    `;

    await deliverFormEmail({
      to: recipient,
      replyTo: fields.email,
      subject: `Candidate profile: ${sanitizeSubjectPart(fields.name)}`,
      text,
      html,
      attachments: [resumeValidation.file],
    });

    return json(200, { success: true });
  } catch (error) {
    logFunctionError(event, 'candidate-profile', 'candidate_profile_failed');

    return json(500, {
      success: false,
      message: FAILURE_MESSAGE,
    });
  }
};
