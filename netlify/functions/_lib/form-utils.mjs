import Busboy from 'busboy';
import path from 'node:path';
import { enforceRateLimit, validateRequestOrigin } from './request-guards.mjs';

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_RESUME_EXTENSIONS = new Set(['.pdf', '.doc', '.docx']);
const ALLOWED_RESUME_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

export const badRequest = (message) =>
  json(400, {
    success: false,
    message,
  });

export const logFunctionError = (event, operation, errorCode = 'internal_error') => {
  const requestId =
    event?.headers?.['x-nf-request-id'] ||
    event?.headers?.['X-Nf-Request-Id'] ||
    event?.headers?.['x-request-id'] ||
    event?.headers?.['X-Request-Id'] ||
    'unknown';

  console.error(JSON.stringify({ level: 'error', operation, errorCode, requestId }));
};

export const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

export const normalizeTextField = (value) => String(value || '').trim();

export const sanitizeSubjectPart = (value, maxLength = 120) =>
  normalizeTextField(value)
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .slice(0, maxLength);

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeTextField(value));

export const isValidHttpUrl = (value) => {
  const normalized = normalizeTextField(value);
  if (!normalized) return false;

  try {
    const url = new URL(normalized);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

export const validateSubmissionTiming = (value) => {
  const minSubmitMs = Number(process.env.FORM_MIN_SUBMIT_MS || 1500);
  const maxSubmitAgeMs = Number(process.env.FORM_MAX_SUBMIT_AGE_MS || 2 * 60 * 60 * 1000);
  const submittedAt = Number.parseInt(String(value || ''), 10);

  if (!Number.isFinite(submittedAt) || submittedAt <= 0) {
    return { ok: false, message: 'Invalid form submission.' };
  }

  const elapsedMs = Date.now() - submittedAt;

  if (elapsedMs < minSubmitMs) {
    return { ok: false, message: 'Please take a moment to complete the form before submitting.' };
  }

  if (elapsedMs > maxSubmitAgeMs) {
    return { ok: false, message: 'This form has expired. Please refresh and try again.' };
  }

  return { ok: true };
};

export const normalizeFilename = (filename, fallbackBase = 'resume') => {
  const parsed = path.parse(String(filename || ''));
  const extension = ALLOWED_RESUME_EXTENSIONS.has(parsed.ext.toLowerCase()) ? parsed.ext.toLowerCase() : '.pdf';
  const safeBase = (parsed.name || fallbackBase).replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  return `${safeBase || fallbackBase}${extension}`;
};

export const validateResumeFile = (file) => {
  if (!file) {
    return { ok: false, message: 'Please complete the required fields and attach your resume.' };
  }

  const extension = path.extname(String(file.filename || '')).toLowerCase();
  const mimeType = String(file.mimeType || '').toLowerCase();
  const hasAllowedExtension = ALLOWED_RESUME_EXTENSIONS.has(extension);
  const hasAllowedMimeType = ALLOWED_RESUME_MIME_TYPES.has(mimeType);

  if (!hasAllowedExtension || !hasAllowedMimeType) {
    return { ok: false, message: 'Please upload a PDF, DOC, or DOCX resume.' };
  }

  return {
    ok: true,
    file: {
      ...file,
      filename: normalizeFilename(file.filename),
    },
  };
};

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
        fields: 20,
        fieldNameSize: 100,
        fieldSize: 10 * 1024,
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

export const runFormRequestChecks = async (
  event,
  {
    scope,
    maxFiles = 1,
    maxFileSize = MAX_FILE_SIZE_BYTES,
    honeypotField = 'botcheck',
  } = {}
) => {
  const originCheck = validateRequestOrigin(event);
  if (!originCheck.ok) {
    return { response: badRequest(originCheck.message) };
  }

  const rateLimit = enforceRateLimit(event, scope);
  if (!rateLimit.ok) {
    return {
      response: json(rateLimit.statusCode, {
        success: false,
        message: rateLimit.message,
      }),
    };
  }

  const { fields, files } = await parseMultipartForm(event, { maxFiles, maxFileSize });

  if (fields[honeypotField]) {
    return { response: json(200, { success: true }) };
  }

  const submissionTiming = validateSubmissionTiming(fields.form_loaded_at);
  if (!submissionTiming.ok) {
    return { response: badRequest(submissionTiming.message) };
  }

  return { fields, files };
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

export const deliverFormEmail = async ({ to, replyTo, subject, text, html, attachments = [] }) => {
  const { resendApiKey, from } = getResendConfig();

  await sendResendEmail({
    to,
    from,
    resendApiKey,
    replyTo,
    subject,
    text,
    html,
    attachments,
  });
};
