import Busboy from 'busboy';

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

export const parseMultipartForm = async (event, options = {}) => {
  const { maxFiles = 1, maxFileSize = MAX_FILE_SIZE_BYTES } = options;
  const contentType = event.headers['content-type'] || event.headers['Content-Type'];

  if (!contentType?.includes('multipart/form-data')) {
    throw new Error('Expected multipart form data.');
  }

  const bodyBuffer = Buffer.from(event.body || '', event.isBase64Encoded ? 'base64' : 'utf8');

  return await new Promise((resolve, reject) => {
    const fields = {};
    const files = [];
    let fileTooLarge = false;

    const busboy = Busboy({
      headers: { 'content-type': contentType },
      limits: {
        files: maxFiles,
        fileSize: maxFileSize,
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

        files.push({
          fieldName: name,
          filename,
          mimeType,
          content: Buffer.concat(chunks),
        });
      });
    });

    busboy.on('error', reject);

    busboy.on('close', () => {
      if (fileTooLarge) {
        reject(new Error('Uploaded file must be 10 MB or smaller.'));
        return;
      }

      resolve({ fields, files });
    });

    busboy.end(bodyBuffer);
  });
};

export const getResendConfig = () => {
  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const missingEnvVars = [
    !resendApiKey ? 'RESEND_API_KEY' : null,
    !from ? 'RESEND_FROM' : null,
  ].filter(Boolean);

  if (missingEnvVars.length > 0) {
    throw new Error(`Missing environment variable${missingEnvVars.length > 1 ? 's' : ''}: ${missingEnvVars.join(', ')}`);
  }

  return { resendApiKey, from };
};

export const sendResendEmail = async ({
  to,
  from,
  resendApiKey,
  subject,
  text,
  html,
  replyTo,
  attachments = [],
}) => {
  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      reply_to: replyTo,
      subject,
      text,
      html,
      attachments: attachments.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content.toString('base64'),
        content_type: attachment.mimeType || 'application/octet-stream',
      })),
    }),
  });

  if (!resendResponse.ok) {
    const resendError = await resendResponse.json().catch(() => null);
    const message = resendError?.message || 'Failed to send email via Resend.';
    throw new Error(message);
  }
};
