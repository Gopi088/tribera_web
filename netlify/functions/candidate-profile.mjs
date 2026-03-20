import { getResendConfig, json, parseMultipartForm, sendResendEmail } from './_lib/form-utils.mjs';

const FAILURE_MESSAGE =
  'Something went wrong while submitting your profile. Please try again or email your resume to careers@tribera.ai.';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { success: false, message: 'Method not allowed.' });
  }

  try {
    const { fields, files } = await parseMultipartForm(event);
    const resumeFile = files[0];

    if (fields.botcheck) {
      return json(200, { success: true });
    }

    if (!fields.name || !fields.email || !resumeFile) {
      return json(400, {
        success: false,
        message: 'Please complete the required fields and attach your resume.',
      });
    }

    const { resendApiKey, from } = getResendConfig();
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
        <p><strong>Name:</strong> ${fields.name}</p>
        <p><strong>Email:</strong> ${fields.email}</p>
        <p><strong>Mobile:</strong> ${fields.mobile || 'Not provided'}</p>
      </div>
    `;

    await sendResendEmail({
      to: recipient,
      from,
      resendApiKey,
      replyTo: fields.email,
      subject: `Candidate profile: ${fields.name}`,
      text,
      html,
      attachments: [resumeFile],
    });

    return json(200, { success: true });
  } catch (error) {
    console.error('Candidate profile function failed:', error);

    return json(500, {
      success: false,
      message: FAILURE_MESSAGE,
    });
  }
};
