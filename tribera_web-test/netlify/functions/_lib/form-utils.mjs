import Busboy from 'busboy';
import crypto from 'node:crypto';
import path from 'node:path';
import { enforceRateLimit, validateRequestOrigin } from './request-guards.mjs';

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
export const MAX_MULTIPART_BODY_BYTES = MAX_FILE_SIZE_BYTES + 256 * 1024;
const ALLOWED_RESUME_EXTENSIONS = new Set(['.pdf', '.doc', '.docx']);
const ALLOWED_RESUME_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

class FormValidationError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = 'FormValidationError';
    this.statusCode = statusCode;
  }
}

export const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
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

export const normalizeFields = (fields = {}) =>
  Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, typeof value === 'string' ? normalizeTextField(value) : value])
  );

export const validateFieldLengths = (fields, specs = []) => {
  for (const spec of specs) {
    const value = normalizeTextField(fields?.[spec.name]);
    if (!value) continue;

    if (value.length > spec.maxLength) {
      return {
        ok: false,
        message: spec.message || `${spec.label || spec.name} must be ${spec.maxLength} characters or fewer.`,
      };
    }
  }

  return { ok: true };
};

const isProductionRuntime = () => {
  const context = String(process.env.CONTEXT || process.env.NETLIFY_CONTEXT || '')
    .trim()
    .toLowerCase();
  const nodeEnv = String(process.env.NODE_ENV || '')
    .trim()
    .toLowerCase();
  return context === 'production' || nodeEnv === 'production';
};

const getUploadScanMode = () => {
  const configuredMode = String(process.env.FORM_UPLOAD_SCAN_MODE || '')
    .trim()
    .toLowerCase();

  if (configuredMode) {
    return configuredMode;
  }

  return isProductionRuntime() ? 'required' : 'off';
};

const getUploadScanTimeoutMs = () => Number(process.env.FORM_UPLOAD_SCAN_TIMEOUT_MS || 5000);

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
  const safeBase = (parsed.name || fallbackBase)
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `${safeBase || fallbackBase}${extension}`;
};

const PDF_SIGNATURE = Buffer.from('%PDF-');
const DOC_SIGNATURE = Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
const ZIP_SIGNATURE = Buffer.from([0x50, 0x4b, 0x03, 0x04]);
const PDF_EOF_MARKER = Buffer.from('%%EOF');
const DOCX_REQUIRED_MARKERS = ['[Content_Types].xml', '_rels/.rels', 'word/document.xml'];
const ZIP_CENTRAL_DIRECTORY_SIGNATURE = 0x02014b50;
const ZIP_END_OF_CENTRAL_DIRECTORY_SIGNATURE = 0x06054b50;

const hasSignature = (buffer, signature) =>
  Buffer.isBuffer(buffer) &&
  buffer.length >= signature.length &&
  buffer.subarray(0, signature.length).equals(signature);

const pdfHasExpectedMarkers = (buffer) => {
  if (!hasSignature(buffer, PDF_SIGNATURE)) return false;

  const tailWindow = buffer.subarray(Math.max(0, buffer.length - 4096));
  return tailWindow.includes(PDF_EOF_MARKER);
};

const findEndOfCentralDirectoryOffset = (buffer) => {
  const minOffset = Math.max(0, buffer.length - 65_557);

  for (let offset = buffer.length - 22; offset >= minOffset; offset -= 1) {
    if (buffer.readUInt32LE(offset) === ZIP_END_OF_CENTRAL_DIRECTORY_SIGNATURE) {
      return offset;
    }
  }

  return -1;
};

const getZipEntryNames = (buffer) => {
  if (!hasSignature(buffer, ZIP_SIGNATURE)) return [];

  const endOfCentralDirectoryOffset = findEndOfCentralDirectoryOffset(buffer);
  if (endOfCentralDirectoryOffset < 0 || endOfCentralDirectoryOffset + 22 > buffer.length) {
    return [];
  }

  const totalEntries = buffer.readUInt16LE(endOfCentralDirectoryOffset + 10);
  const centralDirectoryOffset = buffer.readUInt32LE(endOfCentralDirectoryOffset + 16);
  if (centralDirectoryOffset >= buffer.length) {
    return [];
  }

  const entryNames = [];
  let offset = centralDirectoryOffset;

  while (offset + 46 <= buffer.length) {
    const signature = buffer.readUInt32LE(offset);
    if (signature === ZIP_END_OF_CENTRAL_DIRECTORY_SIGNATURE) {
      break;
    }

    if (signature !== ZIP_CENTRAL_DIRECTORY_SIGNATURE) {
      return [];
    }

    const fileNameLength = buffer.readUInt16LE(offset + 28);
    const extraFieldLength = buffer.readUInt16LE(offset + 30);
    const fileCommentLength = buffer.readUInt16LE(offset + 32);
    const fileNameStart = offset + 46;
    const fileNameEnd = fileNameStart + fileNameLength;

    if (fileNameEnd > buffer.length) {
      return [];
    }

    const fileName = buffer.toString('utf8', fileNameStart, fileNameEnd);
    entryNames.push(fileName);

    const nextOffset = fileNameEnd + extraFieldLength + fileCommentLength;
    if (nextOffset <= offset || nextOffset > buffer.length) {
      return [];
    }

    offset = nextOffset;
    if (totalEntries && entryNames.length >= totalEntries) {
      break;
    }
  }

  return entryNames;
};

const docxHasExpectedMarkers = (buffer) => {
  if (!hasSignature(buffer, ZIP_SIGNATURE)) return false;

  const entryNames = new Set(getZipEntryNames(buffer));
  return DOCX_REQUIRED_MARKERS.every((marker) => entryNames.has(marker));
};

export const validateResumeFile = (file) => {
  if (!file) {
    return { ok: false, message: 'Please complete the required fields and attach your resume.' };
  }

  const extension = path.extname(String(file.filename || '')).toLowerCase();
  const mimeType = String(file.mimeType || '').toLowerCase();
  const content = Buffer.isBuffer(file.content) ? file.content : Buffer.alloc(0);
  const hasAllowedExtension = ALLOWED_RESUME_EXTENSIONS.has(extension);
  const hasAllowedMimeType = ALLOWED_RESUME_MIME_TYPES.has(mimeType);

  if (!hasAllowedExtension || !hasAllowedMimeType) {
    return { ok: false, message: 'Please upload a PDF, DOC, or DOCX resume.' };
  }

  if (content.length === 0) {
    return { ok: false, message: 'The uploaded resume appears to be empty.' };
  }

  const looksValid =
    (extension === '.pdf' && pdfHasExpectedMarkers(content)) ||
    (extension === '.doc' && hasSignature(content, DOC_SIGNATURE)) ||
    (extension === '.docx' && docxHasExpectedMarkers(content));

  if (!looksValid) {
    return { ok: false, message: 'The uploaded resume does not match the expected file format.' };
  }

  return {
    ok: true,
    file: {
      ...file,
      filename: normalizeFilename(file.filename),
    },
  };
};

export const inspectUploadedFile = async (file, context = 'resume') => {
  const scanMode = getUploadScanMode();
  const scanUrl = String(process.env.FORM_UPLOAD_SCAN_URL || '').trim();
  const required = scanMode === 'required';

  if (required && !scanUrl) {
    return {
      ok: false,
      message: 'Resume scanning is not configured. Please try again shortly.',
    };
  }

  if (!scanUrl || scanMode === 'off') {
    return { ok: true, file };
  }

  const headers = { 'Content-Type': 'application/json' };
  const token = String(process.env.FORM_UPLOAD_SCAN_TOKEN || '').trim();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const checksum = crypto.createHash('sha256').update(file.content).digest('hex');

  try {
    const response = await fetch(scanUrl, {
      method: 'POST',
      headers,
      signal: AbortSignal.timeout(getUploadScanTimeoutMs()),
      body: JSON.stringify({
        context,
        filename: file.filename,
        mimeType: file.mimeType,
        size: file.content.length,
        sha256: checksum,
        contentBase64: file.content.toString('base64'),
      }),
    });

    if (!response.ok) {
      throw new Error(`Upload scanner responded with status ${response.status}.`);
    }

    const payload = await response.json().catch(() => null);
    if (!payload || typeof payload.ok !== 'boolean') {
      throw new Error('Upload scanner returned an invalid response.');
    }

    if (!payload.ok) {
      return {
        ok: false,
        message: payload.message || 'The uploaded file could not be accepted.',
      };
    }

    return { ok: true, file };
  } catch {
    if (required) {
      return {
        ok: false,
        message: 'Resume scanning is temporarily unavailable. Please try again shortly.',
      };
    }

    return { ok: true, file };
  }
};

const getDecodedBodyByteLength = (eventBody, isBase64Encoded) => {
  if (!eventBody) return 0;

  if (!isBase64Encoded) {
    return Buffer.byteLength(eventBody, 'utf8');
  }

  const normalized = String(eventBody).replace(/\s+/g, '');
  const padding = normalized.endsWith('==') ? 2 : normalized.endsWith('=') ? 1 : 0;
  return Math.floor((normalized.length * 3) / 4) - padding;
};

export const parseMultipartForm = async (event, options = {}) => {
  const { maxFiles = 1, maxFileSize = MAX_FILE_SIZE_BYTES } = options;
  const contentType = event.headers['content-type'] || event.headers['Content-Type'];

  if (!contentType?.includes('multipart/form-data')) {
    throw new Error('Expected multipart form data.');
  }

  const decodedBodyByteLength = getDecodedBodyByteLength(event.body || '', event.isBase64Encoded);
  if (decodedBodyByteLength > MAX_MULTIPART_BODY_BYTES) {
    throw new FormValidationError('Uploaded file must be 10 MB or smaller.', 413);
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
        reject(new FormValidationError('Uploaded file must be 10 MB or smaller.', 413));
        return;
      }

      resolve({ fields, files });
    });

    busboy.end(bodyBuffer);
  });
};

export const runFormRequestChecks = async (
  event,
  { scope, maxFiles = 1, maxFileSize = MAX_FILE_SIZE_BYTES, honeypotField = 'botcheck' } = {}
) => {
  const originCheck = validateRequestOrigin(event);
  if (!originCheck.ok) {
    return { response: badRequest(originCheck.message) };
  }

  const rateLimit = await enforceRateLimit(event, scope);
  if (!rateLimit.ok) {
    return {
      response: json(rateLimit.statusCode, {
        success: false,
        message: rateLimit.message,
      }),
    };
  }

  let fields;
  let files;

  try {
    ({ fields, files } = await parseMultipartForm(event, { maxFiles, maxFileSize }));
  } catch (error) {
    if (error instanceof FormValidationError) {
      return {
        response: json(error.statusCode, {
          success: false,
          message: error.message,
        }),
      };
    }

    throw error;
  }

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
  const missingEnvVars = [!resendApiKey ? 'RESEND_API_KEY' : null, !from ? 'RESEND_FROM' : null].filter(Boolean);

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing environment variable${missingEnvVars.length > 1 ? 's' : ''}: ${missingEnvVars.join(', ')}`
    );
  }

  return { resendApiKey, from };
};

export const sendResendEmail = async ({ to, from, resendApiKey, subject, text, html, replyTo, attachments = [] }) => {
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
