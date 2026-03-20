import Busboy from 'busboy';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const GENERIC_FAILURE_MESSAGE =
  'Something went wrong while submitting your application. Please try again or email your resume to careers@tribera.ai.';

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

const parseMultipartForm = async (event) => {
  const contentType = event.headers['content-type'] || event.headers['Content-Type'];

  if (!contentType?.includes('multipart/form-data')) {
    throw new Error('Expected multipart form data.');
  }

  const bodyBuffer = Buffer.from(event.body || '', event.isBase64Encoded ? 'base64' : 'utf8');

  return await new Promise((resolve, reject) => {
    const fields = {};
    let resumeFile;
    let fileTooLarge = false;

    const busboy = Busboy({
      headers: { 'content-type': contentType },
      limits: {
        files: 1,
        fileSize: MAX_FILE_SIZE_BYTES,
      },
    });

    busboy.on('field', (name, value) => {
      fields[name] = value;
    });

    busboy.on('file', (name, file, info) => {
      const { filename, mimeType } = info;
      const chunks = [];

      file.on('limit', () => {
        fileTooLarge = true;
      });

      file.on('data', (chunk) => {
        if (!fileTooLarge) {
          chunks.push(chunk);
        }
      });

      file.on('end', () => {
        if (!filename || fileTooLarge) return;

        resumeFile = {
          fieldName: name,
          filename,
          mimeType,
          content: Buffer.concat(chunks),
        };
      });
    });

    busboy.on('error', reject);

    busboy.on('close', () => {
      if (fileTooLarge) {
        reject(new Error('Resume must be 10 MB or smaller.'));
        return;
      }

      resolve({ fields, resumeFile });
    });

    busboy.end(bodyBuffer);
  });
};

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { success: false, message: 'Method not allowed.' });
  }

  try {
    const { fields, resumeFile } = await parseMultipartForm(event);

    if (!fields.name || !fields.email || !fields.job_title || !fields.job_slug || !resumeFile) {
      return json(400, {
        success: false,
        message: 'Please complete the required fields and attach your resume.',
      });
    }

    const recipient = process.env.CAREERS_TO || 'careers@tribera.ai';
    const resendApiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM;

    const missingEnvVars = [
      !resendApiKey ? 'RESEND_API_KEY' : null,
      !from ? 'RESEND_FROM' : null,
    ].filter(Boolean);

    if (missingEnvVars.length > 0) {
      throw new Error(`Missing environment variable${missingEnvVars.length > 1 ? 's' : ''}: ${missingEnvVars.join(', ')}`);
    }

    const text = [
      `New application for ${fields.job_title}`,
      '',
      `Role: ${fields.job_title}`,
      `Slug: ${fields.job_slug}`,
      `Department: ${fields.department || 'Not provided'}`,
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
        <h2 style="margin-bottom: 16px;">New application for ${fields.job_title}</h2>
        <p><strong>Role:</strong> ${fields.job_title}</p>
        <p><strong>Slug:</strong> ${fields.job_slug}</p>
        <p><strong>Department:</strong> ${fields.department || 'Not provided'}</p>
        <hr style="margin: 20px 0; border: 0; border-top: 1px solid rgba(0,0,0,0.08);" />
        <p><strong>Name:</strong> ${fields.name}</p>
        <p><strong>Email:</strong> ${fields.email}</p>
        <p><strong>Mobile:</strong> ${fields.mobile || 'Not provided'}</p>
        <p><strong>Current company:</strong> ${fields.current_company || 'Not provided'}</p>
        <p><strong>LinkedIn:</strong> ${fields.linkedin || 'Not provided'}</p>
        <p><strong>Note:</strong></p>
        <p>${(fields.note || 'Not provided').replace(/\n/g, '<br />')}</p>
      </div>
    `;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: fields.email,
        subject: `Career application: ${fields.job_title} - ${fields.name}`,
        text,
        html,
        attachments: [
          {
            filename: resumeFile.filename,
            content: resumeFile.content.toString('base64'),
            content_type: resumeFile.mimeType || 'application/octet-stream',
          },
        ],
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.json().catch(() => null);
      const message = resendError?.message || 'Failed to send application email.';
      throw new Error(message);
    }

    return json(200, { success: true });
  } catch (error) {
    console.error('Careers application function failed:', error);

    return json(500, {
      success: false,
      message: GENERIC_FAILURE_MESSAGE,
    });
  }
};
