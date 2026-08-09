import test from 'node:test';
import assert from 'node:assert/strict';

import { handler as siteInquiryHandler } from '../netlify/functions/site-inquiry.mjs';
import { handler as candidateProfileHandler } from '../netlify/functions/candidate-profile.mjs';
import { handler as careersApplyHandler } from '../netlify/functions/careers-apply.mjs';
import { resetRateLimitStore } from '../netlify/functions/_lib/request-guards.mjs';
import { parseMultipartForm } from '../netlify/functions/_lib/form-utils.mjs';

import { createMultipartEvent, parseJsonResponse, withEnv, withMockedFetch } from './netlify-function-test-utils.mjs';

const defaultHeaders = {
  origin: 'http://localhost:3000',
  host: 'localhost:3000',
  'x-forwarded-for': '203.0.113.10',
};
const validPdfContent = '%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF';
const validDocContent = Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1, 0x00, 0x01]);
const createStoredZipBuffer = (entries) => {
  const localRecords = [];
  const centralRecords = [];
  let offset = 0;

  for (const entry of entries) {
    const fileNameBuffer = Buffer.from(entry.name, 'utf8');
    const contentBuffer = Buffer.isBuffer(entry.content)
      ? entry.content
      : Buffer.from(String(entry.content || ''), 'utf8');
    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0, 6);
    localHeader.writeUInt16LE(0, 8);
    localHeader.writeUInt16LE(0, 10);
    localHeader.writeUInt16LE(0, 12);
    localHeader.writeUInt32LE(0, 14);
    localHeader.writeUInt32LE(contentBuffer.length, 18);
    localHeader.writeUInt32LE(contentBuffer.length, 22);
    localHeader.writeUInt16LE(fileNameBuffer.length, 26);
    localHeader.writeUInt16LE(0, 28);
    localRecords.push(localHeader, fileNameBuffer, contentBuffer);

    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014b50, 0);
    centralHeader.writeUInt16LE(20, 4);
    centralHeader.writeUInt16LE(20, 6);
    centralHeader.writeUInt16LE(0, 8);
    centralHeader.writeUInt16LE(0, 10);
    centralHeader.writeUInt16LE(0, 12);
    centralHeader.writeUInt16LE(0, 14);
    centralHeader.writeUInt32LE(0, 16);
    centralHeader.writeUInt32LE(contentBuffer.length, 20);
    centralHeader.writeUInt32LE(contentBuffer.length, 24);
    centralHeader.writeUInt16LE(fileNameBuffer.length, 28);
    centralHeader.writeUInt16LE(0, 30);
    centralHeader.writeUInt16LE(0, 32);
    centralHeader.writeUInt16LE(0, 34);
    centralHeader.writeUInt16LE(0, 36);
    centralHeader.writeUInt32LE(0, 38);
    centralHeader.writeUInt32LE(offset, 42);
    centralRecords.push(centralHeader, fileNameBuffer);

    offset += localHeader.length + fileNameBuffer.length + contentBuffer.length;
  }

  const centralDirectory = Buffer.concat(centralRecords);
  const endOfCentralDirectory = Buffer.alloc(22);
  endOfCentralDirectory.writeUInt32LE(0x06054b50, 0);
  endOfCentralDirectory.writeUInt16LE(0, 4);
  endOfCentralDirectory.writeUInt16LE(0, 6);
  endOfCentralDirectory.writeUInt16LE(entries.length, 8);
  endOfCentralDirectory.writeUInt16LE(entries.length, 10);
  endOfCentralDirectory.writeUInt32LE(centralDirectory.length, 12);
  endOfCentralDirectory.writeUInt32LE(offset, 16);
  endOfCentralDirectory.writeUInt16LE(0, 20);

  return Buffer.concat([...localRecords, centralDirectory, endOfCentralDirectory]);
};
const validDocxContent = createStoredZipBuffer([
  { name: '[Content_Types].xml', content: '<Types />' },
  { name: '_rels/.rels', content: '<Relationships />' },
  { name: 'word/document.xml', content: '<w:document />' },
]);
const createDocxWithDataDescriptors = (entries) => {
  const localRecords = [];
  const centralRecords = [];
  let offset = 0;

  for (const entry of entries) {
    const fileNameBuffer = Buffer.from(entry.name, 'utf8');
    const contentBuffer = Buffer.isBuffer(entry.content)
      ? entry.content
      : Buffer.from(String(entry.content || ''), 'utf8');

    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0x0008, 6);
    localHeader.writeUInt16LE(8, 8);
    localHeader.writeUInt16LE(0, 10);
    localHeader.writeUInt16LE(0, 12);
    localHeader.writeUInt32LE(0, 14);
    localHeader.writeUInt32LE(0, 18);
    localHeader.writeUInt32LE(0, 22);
    localHeader.writeUInt16LE(fileNameBuffer.length, 26);
    localHeader.writeUInt16LE(0, 28);

    const dataDescriptor = Buffer.alloc(16);
    dataDescriptor.writeUInt32LE(0x08074b50, 0);
    dataDescriptor.writeUInt32LE(0, 4);
    dataDescriptor.writeUInt32LE(contentBuffer.length, 8);
    dataDescriptor.writeUInt32LE(contentBuffer.length, 12);

    localRecords.push(localHeader, fileNameBuffer, contentBuffer, dataDescriptor);

    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014b50, 0);
    centralHeader.writeUInt16LE(20, 4);
    centralHeader.writeUInt16LE(20, 6);
    centralHeader.writeUInt16LE(0x0008, 8);
    centralHeader.writeUInt16LE(8, 10);
    centralHeader.writeUInt16LE(0, 12);
    centralHeader.writeUInt16LE(0, 14);
    centralHeader.writeUInt32LE(0, 16);
    centralHeader.writeUInt32LE(contentBuffer.length, 20);
    centralHeader.writeUInt32LE(contentBuffer.length, 24);
    centralHeader.writeUInt16LE(fileNameBuffer.length, 28);
    centralHeader.writeUInt16LE(0, 30);
    centralHeader.writeUInt16LE(0, 32);
    centralHeader.writeUInt16LE(0, 34);
    centralHeader.writeUInt16LE(0, 36);
    centralHeader.writeUInt32LE(0, 38);
    centralHeader.writeUInt32LE(offset, 42);
    centralRecords.push(centralHeader, fileNameBuffer);

    offset += localHeader.length + fileNameBuffer.length + contentBuffer.length + dataDescriptor.length;
  }

  const centralDirectory = Buffer.concat(centralRecords);
  const endOfCentralDirectory = Buffer.alloc(22);
  endOfCentralDirectory.writeUInt32LE(0x06054b50, 0);
  endOfCentralDirectory.writeUInt16LE(0, 4);
  endOfCentralDirectory.writeUInt16LE(0, 6);
  endOfCentralDirectory.writeUInt16LE(entries.length, 8);
  endOfCentralDirectory.writeUInt16LE(entries.length, 10);
  endOfCentralDirectory.writeUInt32LE(centralDirectory.length, 12);
  endOfCentralDirectory.writeUInt32LE(offset, 16);
  endOfCentralDirectory.writeUInt16LE(0, 20);

  return Buffer.concat([...localRecords, centralDirectory, endOfCentralDirectory]);
};
const validDocxWithDataDescriptors = createDocxWithDataDescriptors([
  { name: '[Content_Types].xml', content: '<Types />' },
  { name: '_rels/.rels', content: '<Relationships />' },
  { name: 'word/document.xml', content: '<w:document />' },
]);

test.beforeEach(() => {
  resetRateLimitStore();
});

test('site inquiry contact form accepts a valid submission and returns success', async () => {
  const event = await createMultipartEvent({
    fields: {
      form_type: 'contact',
      first_name: 'Asha',
      last_name: 'Rao',
      email: 'asha@example.com',
      company: 'Tribera Labs',
      interest: 'Hiring Talent',
      message: 'Need help with technical hiring.',
    },
    headers: defaultHeaders,
  });

  await withEnv(
    {
      RESEND_API_KEY: 'test_resend_key',
      RESEND_FROM: 'Tribera <no-reply@example.com>',
      CONTACT_TO: 'hello@example.com',
    },
    async () => {
      await withMockedFetch(async (calls) => {
        const response = parseJsonResponse(await siteInquiryHandler(event));

        assert.equal(response.statusCode, 200);
        assert.deepEqual(response.body, { success: true });
        assert.equal(calls.length, 1);
        assert.equal(calls[0].json.reply_to, 'asha@example.com');
        assert.equal(calls[0].json.subject, 'Contact form: Asha Rao');
        assert.match(calls[0].json.text, /Need help with technical hiring\./);
      });
    }
  );
});

test('site inquiry rejects invalid email addresses', async () => {
  const event = await createMultipartEvent({
    fields: {
      form_type: 'contact',
      first_name: 'Asha',
      last_name: 'Rao',
      email: 'not-an-email',
      interest: 'Hiring Talent',
      message: 'Need help with technical hiring.',
    },
    headers: defaultHeaders,
  });

  await withEnv(
    {
      RESEND_API_KEY: 'test_resend_key',
      RESEND_FROM: 'Tribera <no-reply@example.com>',
    },
    async () => {
      await withMockedFetch(async (calls) => {
        const response = parseJsonResponse(await siteInquiryHandler(event));

        assert.equal(response.statusCode, 400);
        assert.deepEqual(response.body, {
          success: false,
          message: 'Please enter a valid email address.',
        });
        assert.equal(calls.length, 0);
      });
    }
  );
});

test('site inquiry rejects submissions that arrive too quickly', async () => {
  const event = await createMultipartEvent({
    fields: {
      form_type: 'demo',
      name: 'Asha',
      email: 'asha@example.com',
      form_loaded_at: String(Date.now()),
    },
    headers: defaultHeaders,
  });

  const response = parseJsonResponse(await siteInquiryHandler(event));

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    success: false,
    message: 'Please take a moment to complete the form before submitting.',
  });
});

test('site inquiry rejects unknown interest values', async () => {
  const event = await createMultipartEvent({
    fields: {
      form_type: 'contact',
      first_name: 'Asha',
      last_name: 'Rao',
      email: 'asha@example.com',
      interest: 'Totally Different',
      message: 'Need help with technical hiring.',
    },
    headers: defaultHeaders,
  });

  const response = parseJsonResponse(await siteInquiryHandler(event));

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    success: false,
    message: 'Please select a valid inquiry type.',
  });
});

test('site inquiry escapes HTML in outbound email content', async () => {
  const event = await createMultipartEvent({
    fields: {
      form_type: 'contact',
      first_name: '<b>Asha</b>',
      last_name: 'Rao',
      email: 'asha@example.com',
      interest: 'Hiring Talent',
      message: '<script>alert(1)</script>',
    },
    headers: defaultHeaders,
  });

  await withEnv(
    {
      RESEND_API_KEY: 'test_resend_key',
      RESEND_FROM: 'Tribera <no-reply@example.com>',
    },
    async () => {
      await withMockedFetch(async (calls) => {
        const response = parseJsonResponse(await siteInquiryHandler(event));

        assert.equal(response.statusCode, 200);
        assert.equal(calls.length, 1);
        assert.doesNotMatch(calls[0].json.html, /<script>alert\(1\)<\/script>/);
        assert.match(calls[0].json.html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
      });
    }
  );
});

test('site inquiry rejects an invalid form type', async () => {
  const event = await createMultipartEvent({
    fields: {
      form_type: 'unknown',
      email: 'test@example.com',
    },
    headers: defaultHeaders,
  });

  const response = parseJsonResponse(await siteInquiryHandler(event));

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    success: false,
    message: 'Invalid form submission.',
  });
});

test('site inquiry honeypot returns success without sending email', async () => {
  const event = await createMultipartEvent({
    fields: {
      form_type: 'demo',
      name: 'Spam Bot',
      email: 'spam@example.com',
      botcheck: '1',
    },
    headers: defaultHeaders,
  });

  await withEnv(
    {
      RESEND_API_KEY: 'test_resend_key',
      RESEND_FROM: 'Tribera <no-reply@example.com>',
    },
    async () => {
      await withMockedFetch(async (calls) => {
        const response = parseJsonResponse(await siteInquiryHandler(event));

        assert.equal(response.statusCode, 200);
        assert.deepEqual(response.body, { success: true });
        assert.equal(calls.length, 0);
      });
    }
  );
});

test('site inquiry rejects requests from disallowed origins', async () => {
  const event = await createMultipartEvent({
    fields: {
      form_type: 'demo',
      name: 'Asha',
      email: 'asha@example.com',
    },
    headers: {
      origin: 'https://evil.example',
      'x-forwarded-for': '203.0.113.10',
    },
  });

  const response = parseJsonResponse(await siteInquiryHandler(event));

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    success: false,
    message: 'Invalid request origin.',
  });
});

test('site inquiry accepts requests when origin matches the current host', async () => {
  const event = await createMultipartEvent({
    fields: {
      form_type: 'sales',
      name: 'Asha',
      email: 'asha@example.com',
    },
    headers: {
      origin: 'https://deploy-preview-42--tribera.netlify.app',
      host: 'deploy-preview-42--tribera.netlify.app',
      'x-forwarded-for': '203.0.113.10',
    },
  });

  await withEnv(
    {
      RESEND_API_KEY: 'test_resend_key',
      RESEND_FROM: 'Tribera <no-reply@example.com>',
      SALES_TO: 'sales@example.com',
    },
    async () => {
      await withMockedFetch(async (calls) => {
        const response = parseJsonResponse(await siteInquiryHandler(event));

        assert.equal(response.statusCode, 200);
        assert.deepEqual(response.body, { success: true });
        assert.equal(calls.length, 1);
        assert.equal(calls[0].json.subject, 'Sales inquiry: Asha');
      });
    }
  );
});

test('site inquiry accepts trusted Netlify preview hosts for this site only', async () => {
  const event = await createMultipartEvent({
    fields: {
      form_type: 'sales',
      name: 'Asha',
      email: 'asha@example.com',
    },
    headers: {
      origin: 'https://deploy-preview-42--tribera.netlify.app',
      host: 'deploy-preview-42--tribera.netlify.app',
      'x-forwarded-for': '203.0.113.10',
    },
  });

  await withEnv(
    {
      RESEND_API_KEY: 'test_resend_key',
      RESEND_FROM: 'Tribera <no-reply@example.com>',
      SALES_TO: 'sales@example.com',
      ALLOWED_FORM_HOST_PATTERNS: 'localhost:3000,*.tribera.ai,*--tribera.netlify.app,tribera.netlify.app',
    },
    async () => {
      await withMockedFetch(async (calls) => {
        const response = parseJsonResponse(await siteInquiryHandler(event));

        assert.equal(response.statusCode, 200);
        assert.deepEqual(response.body, { success: true });
        assert.equal(calls.length, 1);
      });
    }
  );
});

test('site inquiry rejects same-host origins when the host is not trusted', async () => {
  const event = await createMultipartEvent({
    fields: {
      form_type: 'sales',
      name: 'Asha',
      email: 'asha@example.com',
    },
    headers: {
      origin: 'https://malicious-preview.example',
      host: 'malicious-preview.example',
      'x-forwarded-for': '203.0.113.10',
    },
  });

  const response = parseJsonResponse(await siteInquiryHandler(event));

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    success: false,
    message: 'Invalid request origin.',
  });
});

test('site inquiry rejects Netlify preview hosts for other sites', async () => {
  const event = await createMultipartEvent({
    fields: {
      form_type: 'sales',
      name: 'Asha',
      email: 'asha@example.com',
    },
    headers: {
      origin: 'https://deploy-preview-42--another-site.netlify.app',
      host: 'deploy-preview-42--another-site.netlify.app',
      'x-forwarded-for': '203.0.113.10',
    },
  });

  const response = parseJsonResponse(await siteInquiryHandler(event));

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    success: false,
    message: 'Invalid request origin.',
  });
});

test('site inquiry rate limiting returns 429 after the threshold', async () => {
  const createEvent = () =>
    createMultipartEvent({
      fields: {
        form_type: 'demo',
        name: 'Asha',
        email: 'asha@example.com',
      },
      headers: defaultHeaders,
    });

  await withEnv(
    {
      RESEND_API_KEY: 'test_resend_key',
      RESEND_FROM: 'Tribera <no-reply@example.com>',
      FORM_RATE_LIMIT_MAX: '2',
      FORM_RATE_LIMIT_WINDOW_MS: '60000',
    },
    async () => {
      await withMockedFetch(async () => {
        const first = parseJsonResponse(await siteInquiryHandler(await createEvent()));
        const second = parseJsonResponse(await siteInquiryHandler(await createEvent()));
        const third = parseJsonResponse(await siteInquiryHandler(await createEvent()));

        assert.equal(first.statusCode, 200);
        assert.equal(second.statusCode, 200);
        assert.equal(third.statusCode, 429);
        assert.deepEqual(third.body, {
          success: false,
          message: 'Too many requests. Please try again shortly.',
        });
      });
    }
  );
});

test('candidate profile accepts a valid resume submission', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Neha Singh',
      email: 'neha@example.com',
      mobile: '9999999999',
    },
    files: [
      {
        name: 'resume',
        filename: 'resume.pdf',
        type: 'application/pdf',
        content: validPdfContent,
      },
    ],
    headers: defaultHeaders,
  });

  await withEnv(
    {
      RESEND_API_KEY: 'test_resend_key',
      RESEND_FROM: 'Tribera <no-reply@example.com>',
      CANDIDATES_TO: 'careers@example.com',
    },
    async () => {
      await withMockedFetch(async (calls) => {
        const response = parseJsonResponse(await candidateProfileHandler(event));

        assert.equal(response.statusCode, 200);
        assert.deepEqual(response.body, { success: true });
        assert.equal(calls.length, 1);
        assert.equal(calls[0].json.subject, 'Candidate profile: Neha Singh');
        assert.equal(calls[0].json.attachments.length, 1);
        assert.equal(calls[0].json.attachments[0].filename, 'resume.pdf');
      });
    }
  );
});

test('candidate profile rejects invalid email addresses', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Neha Singh',
      email: 'bad-email',
    },
    files: [
      {
        name: 'resume',
        filename: 'resume.pdf',
        type: 'application/pdf',
        content: validPdfContent,
      },
    ],
    headers: defaultHeaders,
  });

  const response = parseJsonResponse(await candidateProfileHandler(event));

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    success: false,
    message: 'Please enter a valid email address.',
  });
});

test('candidate profile rejects overlong mobile numbers', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Neha Singh',
      email: 'neha@example.com',
      mobile: '1'.repeat(40),
    },
    files: [
      {
        name: 'resume',
        filename: 'resume.pdf',
        type: 'application/pdf',
        content: validPdfContent,
      },
    ],
    headers: defaultHeaders,
  });

  const response = parseJsonResponse(await candidateProfileHandler(event));

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    success: false,
    message: 'Mobile number must be 32 characters or fewer.',
  });
});

test('candidate profile rejects disallowed resume file types', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Neha Singh',
      email: 'neha@example.com',
    },
    files: [
      {
        name: 'resume',
        filename: 'resume.exe',
        type: 'application/octet-stream',
        content: 'MZ fake exe',
      },
    ],
    headers: defaultHeaders,
  });

  const response = parseJsonResponse(await candidateProfileHandler(event));

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    success: false,
    message: 'Please upload a PDF, DOC, or DOCX resume.',
  });
});

test('candidate profile rejects disguised files that do not match the claimed resume format', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Neha Singh',
      email: 'neha@example.com',
    },
    files: [
      {
        name: 'resume',
        filename: 'resume.pdf',
        type: 'application/pdf',
        content: 'not actually a pdf',
      },
    ],
    headers: defaultHeaders,
  });

  const response = parseJsonResponse(await candidateProfileHandler(event));

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    success: false,
    message: 'The uploaded resume does not match the expected file format.',
  });
});

test('candidate profile rejects empty resumes', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Neha Singh',
      email: 'neha@example.com',
    },
    files: [
      {
        name: 'resume',
        filename: 'resume.pdf',
        type: 'application/pdf',
        content: '',
      },
    ],
    headers: defaultHeaders,
  });

  const response = parseJsonResponse(await candidateProfileHandler(event));

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    success: false,
    message: 'The uploaded resume appears to be empty.',
  });
});

test('candidate profile accepts a valid doc resume', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Neha Singh',
      email: 'neha@example.com',
    },
    files: [
      {
        name: 'resume',
        filename: 'resume.doc',
        type: 'application/msword',
        content: validDocContent,
      },
    ],
    headers: defaultHeaders,
  });

  await withEnv(
    {
      RESEND_API_KEY: 'test_resend_key',
      RESEND_FROM: 'Tribera <no-reply@example.com>',
      CANDIDATES_TO: 'careers@example.com',
    },
    async () => {
      await withMockedFetch(async (calls) => {
        const response = parseJsonResponse(await candidateProfileHandler(event));

        assert.equal(response.statusCode, 200);
        assert.deepEqual(response.body, { success: true });
        assert.equal(calls.length, 1);
        assert.equal(calls[0].json.attachments[0].filename, 'resume.doc');
      });
    }
  );
});

test('candidate profile accepts a valid docx resume', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Neha Singh',
      email: 'neha@example.com',
    },
    files: [
      {
        name: 'resume',
        filename: 'resume.docx',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        content: validDocxContent,
      },
    ],
    headers: defaultHeaders,
  });

  await withEnv(
    {
      RESEND_API_KEY: 'test_resend_key',
      RESEND_FROM: 'Tribera <no-reply@example.com>',
      CANDIDATES_TO: 'careers@example.com',
    },
    async () => {
      await withMockedFetch(async (calls) => {
        const response = parseJsonResponse(await candidateProfileHandler(event));

        assert.equal(response.statusCode, 200);
        assert.deepEqual(response.body, { success: true });
        assert.equal(calls.length, 1);
        assert.equal(calls[0].json.attachments[0].filename, 'resume.docx');
      });
    }
  );
});

test('candidate profile accepts docx resumes that use zip data descriptors', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Neha Singh',
      email: 'neha@example.com',
    },
    files: [
      {
        name: 'resume',
        filename: 'resume.docx',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        content: validDocxWithDataDescriptors,
      },
    ],
    headers: defaultHeaders,
  });

  await withEnv(
    {
      RESEND_API_KEY: 'test_resend_key',
      RESEND_FROM: 'Tribera <no-reply@example.com>',
      CANDIDATES_TO: 'careers@example.com',
    },
    async () => {
      await withMockedFetch(async (calls) => {
        const response = parseJsonResponse(await candidateProfileHandler(event));

        assert.equal(response.statusCode, 200);
        assert.deepEqual(response.body, { success: true });
        assert.equal(calls.length, 1);
        assert.equal(calls[0].json.attachments[0].filename, 'resume.docx');
      });
    }
  );
});

test('candidate profile rejects zip files disguised as docx resumes', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Neha Singh',
      email: 'neha@example.com',
    },
    files: [
      {
        name: 'resume',
        filename: 'resume.docx',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        content: Buffer.from('PK\x03\x04not-a-real-docx', 'latin1'),
      },
    ],
    headers: defaultHeaders,
  });

  const response = parseJsonResponse(await candidateProfileHandler(event));

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    success: false,
    message: 'The uploaded resume does not match the expected file format.',
  });
});

test('candidate profile rejects docx files with required markers outside zip entries', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Neha Singh',
      email: 'neha@example.com',
    },
    files: [
      {
        name: 'resume',
        filename: 'resume.docx',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        content: Buffer.from('PK\x03\x04[Content_Types].xml_rels/.relsword/document.xml', 'latin1'),
      },
    ],
    headers: defaultHeaders,
  });

  const response = parseJsonResponse(await candidateProfileHandler(event));

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    success: false,
    message: 'The uploaded resume does not match the expected file format.',
  });
});

test('candidate profile rejects uploads when scanner marks the file unsafe', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Neha Singh',
      email: 'neha@example.com',
    },
    files: [
      {
        name: 'resume',
        filename: 'resume.pdf',
        type: 'application/pdf',
        content: validPdfContent,
      },
    ],
    headers: defaultHeaders,
  });

  const originalFetch = global.fetch;
  global.fetch = async (url) => {
    if (url === 'https://scan.example/check') {
      return {
        ok: true,
        async json() {
          return { ok: false, message: 'The uploaded file could not be accepted.' };
        },
      };
    }

    return {
      ok: true,
      async json() {
        return { id: 'email_test_123' };
      },
    };
  };

  try {
    await withEnv(
      {
        FORM_UPLOAD_SCAN_MODE: 'required',
        FORM_UPLOAD_SCAN_URL: 'https://scan.example/check',
      },
      async () => {
        const response = parseJsonResponse(await candidateProfileHandler(event));

        assert.equal(response.statusCode, 400);
        assert.deepEqual(response.body, {
          success: false,
          message: 'The uploaded file could not be accepted.',
        });
      }
    );
  } finally {
    global.fetch = originalFetch;
  }
});

test('candidate profile rejects uploads when required scanning is unavailable', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Neha Singh',
      email: 'neha@example.com',
    },
    files: [
      {
        name: 'resume',
        filename: 'resume.pdf',
        type: 'application/pdf',
        content: validPdfContent,
      },
    ],
    headers: defaultHeaders,
  });

  const originalFetch = global.fetch;
  global.fetch = async (url) => {
    if (url === 'https://scan.example/check') {
      throw new Error('scanner offline');
    }

    return {
      ok: true,
      async json() {
        return { id: 'email_test_123' };
      },
    };
  };

  try {
    await withEnv(
      {
        FORM_UPLOAD_SCAN_MODE: 'required',
        FORM_UPLOAD_SCAN_URL: 'https://scan.example/check',
      },
      async () => {
        const response = parseJsonResponse(await candidateProfileHandler(event));

        assert.equal(response.statusCode, 400);
        assert.deepEqual(response.body, {
          success: false,
          message: 'Resume scanning is temporarily unavailable. Please try again shortly.',
        });
      }
    );
  } finally {
    global.fetch = originalFetch;
  }
});

test('candidate profile rejects uploads in production when scanning is not configured', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Neha Singh',
      email: 'neha@example.com',
    },
    files: [
      {
        name: 'resume',
        filename: 'resume.pdf',
        type: 'application/pdf',
        content: validPdfContent,
      },
    ],
    headers: defaultHeaders,
  });

  await withEnv(
    {
      CONTEXT: 'production',
    },
    async () => {
      const response = parseJsonResponse(await candidateProfileHandler(event));

      assert.equal(response.statusCode, 400);
      assert.deepEqual(response.body, {
        success: false,
        message: 'Resume scanning is not configured. Please try again shortly.',
      });
    }
  );
});

test('candidate profile passes an abort signal to the upload scanner fetch', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Neha Singh',
      email: 'neha@example.com',
    },
    files: [
      {
        name: 'resume',
        filename: 'resume.pdf',
        type: 'application/pdf',
        content: validPdfContent,
      },
    ],
    headers: defaultHeaders,
  });

  const originalFetch = global.fetch;
  const calls = [];
  global.fetch = async (url, options = {}) => {
    calls.push({ url, options });

    if (url === 'https://scan.example/check') {
      return {
        ok: true,
        async json() {
          return { ok: true };
        },
      };
    }

    return {
      ok: true,
      async json() {
        return { id: 'email_test_123' };
      },
    };
  };

  try {
    await withEnv(
      {
        RESEND_API_KEY: 'test_resend_key',
        RESEND_FROM: 'Tribera <no-reply@example.com>',
        CANDIDATES_TO: 'careers@example.com',
        FORM_UPLOAD_SCAN_MODE: 'required',
        FORM_UPLOAD_SCAN_URL: 'https://scan.example/check',
      },
      async () => {
        const response = parseJsonResponse(await candidateProfileHandler(event));
        assert.equal(response.statusCode, 200);
      }
    );
  } finally {
    global.fetch = originalFetch;
  }

  const scanCall = calls.find((call) => call.url === 'https://scan.example/check');
  assert.ok(scanCall);
  assert.ok(scanCall.options.signal instanceof AbortSignal);
});

test('careers apply passes the expected scan context to the upload scanner', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Rahul Das',
      email: 'rahul@example.com',
      job_slug: 'ai-ml-engineer',
    },
    files: [
      {
        name: 'resume',
        filename: 'rahul-das.pdf',
        type: 'application/pdf',
        content: validPdfContent,
      },
    ],
    headers: defaultHeaders,
  });

  const originalFetch = global.fetch;
  const calls = [];
  global.fetch = async (url, options = {}) => {
    calls.push({
      url,
      options,
      json: options.body ? JSON.parse(options.body) : undefined,
    });

    if (url === 'https://scan.example/check') {
      return {
        ok: true,
        async json() {
          return { ok: true };
        },
      };
    }

    return {
      ok: true,
      async json() {
        return { id: 'email_test_123' };
      },
    };
  };

  try {
    await withEnv(
      {
        RESEND_API_KEY: 'test_resend_key',
        RESEND_FROM: 'Tribera <no-reply@example.com>',
        CAREERS_TO: 'careers@example.com',
        FORM_UPLOAD_SCAN_MODE: 'required',
        FORM_UPLOAD_SCAN_URL: 'https://scan.example/check',
      },
      async () => {
        const response = parseJsonResponse(await careersApplyHandler(event));
        assert.equal(response.statusCode, 200);
      }
    );
  } finally {
    global.fetch = originalFetch;
  }

  const scanCall = calls.find((call) => call.url === 'https://scan.example/check');
  assert.ok(scanCall);
  assert.equal(scanCall.json.context, 'careers-apply');
});

test('candidate profile rejects missing resume', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Neha Singh',
      email: 'neha@example.com',
    },
    headers: defaultHeaders,
  });

  const response = parseJsonResponse(await candidateProfileHandler(event));

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    success: false,
    message: 'Please complete the required fields and attach your resume.',
  });
});

test('careers apply accepts a valid application with resume', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Rahul Das',
      email: 'rahul@example.com',
      mobile: '9999999999',
      current_company: 'Example Corp',
      linkedin: 'https://www.linkedin.com/in/rahuldas',
      note: 'I have built evaluation systems before.',
      job_title: 'AI/ML Engineer',
      job_slug: 'ai-ml-engineer',
      department: 'Engineering',
    },
    files: [
      {
        name: 'resume',
        filename: 'rahul-das.pdf',
        type: 'application/pdf',
        content: validPdfContent,
      },
    ],
    headers: defaultHeaders,
  });

  await withEnv(
    {
      RESEND_API_KEY: 'test_resend_key',
      RESEND_FROM: 'Tribera <no-reply@example.com>',
      CAREERS_TO: 'careers@example.com',
    },
    async () => {
      await withMockedFetch(async (calls) => {
        const response = parseJsonResponse(await careersApplyHandler(event));

        assert.equal(response.statusCode, 200);
        assert.deepEqual(response.body, { success: true });
        assert.equal(calls.length, 1);
        assert.equal(calls[0].json.reply_to, 'rahul@example.com');
        assert.equal(calls[0].json.subject, 'Career application: AI/ML Engineer - Rahul Das');
        assert.equal(calls[0].json.attachments.length, 1);
      });
    }
  );
});

test('careers apply rejects invalid email addresses', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Rahul Das',
      email: 'bad-email',
      job_title: 'AI/ML Engineer',
      job_slug: 'ai-ml-engineer',
    },
    files: [
      {
        name: 'resume',
        filename: 'rahul-das.pdf',
        type: 'application/pdf',
        content: validPdfContent,
      },
    ],
    headers: defaultHeaders,
  });

  const response = parseJsonResponse(await careersApplyHandler(event));

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    success: false,
    message: 'Please enter a valid email address.',
  });
});

test('careers apply rejects disallowed resume file types', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Rahul Das',
      email: 'rahul@example.com',
      job_title: 'AI/ML Engineer',
      job_slug: 'ai-ml-engineer',
    },
    files: [
      {
        name: 'resume',
        filename: 'resume.exe',
        type: 'application/octet-stream',
        content: 'MZ fake exe',
      },
    ],
    headers: defaultHeaders,
  });

  const response = parseJsonResponse(await careersApplyHandler(event));

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    success: false,
    message: 'Please upload a PDF, DOC, or DOCX resume.',
  });
});

test('careers apply rejects requests missing required metadata or resume', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Rahul Das',
      email: 'rahul@example.com',
      job_title: 'AI/ML Engineer',
    },
    headers: defaultHeaders,
  });

  const response = parseJsonResponse(await careersApplyHandler(event));

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    success: false,
    message: 'Please complete the required fields and attach your resume.',
  });
});

test('careers apply accepts trusted role submissions without client job_title', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Rahul Das',
      email: 'rahul@example.com',
      job_slug: 'ai-ml-engineer',
    },
    files: [
      {
        name: 'resume',
        filename: 'rahul-das.pdf',
        type: 'application/pdf',
        content: validPdfContent,
      },
    ],
    headers: defaultHeaders,
  });

  await withEnv(
    {
      RESEND_API_KEY: 'test_resend_key',
      RESEND_FROM: 'Tribera <no-reply@example.com>',
      CAREERS_TO: 'careers@example.com',
    },
    async () => {
      await withMockedFetch(async (calls) => {
        const response = parseJsonResponse(await careersApplyHandler(event));

        assert.equal(response.statusCode, 200);
        assert.deepEqual(response.body, { success: true });
        assert.equal(calls.length, 1);
        assert.equal(calls[0].json.subject, 'Career application: AI/ML Engineer - Rahul Das');
      });
    }
  );
});

test('site inquiry rejects oversized multipart request bodies before parsing', async () => {
  const oversizedBody = Buffer.alloc(11 * 1024 * 1024, 'a').toString('base64');
  const event = {
    httpMethod: 'POST',
    headers: {
      'content-type': 'multipart/form-data; boundary=----tribera-test',
      ...defaultHeaders,
    },
    body: oversizedBody,
    isBase64Encoded: true,
  };

  const response = parseJsonResponse(await siteInquiryHandler(event));

  assert.equal(response.statusCode, 413);
  assert.deepEqual(response.body, {
    success: false,
    message: 'Uploaded file must be 10 MB or smaller.',
  });
});

test('candidate profile rejects oversized multipart request bodies before parsing', async () => {
  const oversizedBody = Buffer.alloc(11 * 1024 * 1024, 'a').toString('base64');
  const event = {
    httpMethod: 'POST',
    headers: {
      'content-type': 'multipart/form-data; boundary=----tribera-test',
      ...defaultHeaders,
    },
    body: oversizedBody,
    isBase64Encoded: true,
  };

  const response = parseJsonResponse(await candidateProfileHandler(event));

  assert.equal(response.statusCode, 413);
  assert.deepEqual(response.body, {
    success: false,
    message: 'Uploaded file must be 10 MB or smaller.',
  });
});

test('careers apply rejects oversized multipart request bodies before parsing', async () => {
  const oversizedBody = Buffer.alloc(11 * 1024 * 1024, 'a').toString('base64');
  const event = {
    httpMethod: 'POST',
    headers: {
      'content-type': 'multipart/form-data; boundary=----tribera-test',
      ...defaultHeaders,
    },
    body: oversizedBody,
    isBase64Encoded: true,
  };

  const response = parseJsonResponse(await careersApplyHandler(event));

  assert.equal(response.statusCode, 413);
  assert.deepEqual(response.body, {
    success: false,
    message: 'Uploaded file must be 10 MB or smaller.',
  });
});

test('site inquiry rejects overlong contact messages', async () => {
  const event = await createMultipartEvent({
    fields: {
      form_type: 'contact',
      first_name: 'Asha',
      last_name: 'Patel',
      email: 'asha@example.com',
      interest: 'Hiring Talent',
      message: 'a'.repeat(4001),
    },
    headers: defaultHeaders,
  });

  const response = parseJsonResponse(await siteInquiryHandler(event));

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    success: false,
    message: 'Message must be 4000 characters or fewer.',
  });
});

test('site inquiry rate limiting prefers authoritative Netlify client IP headers', async () => {
  const firstEvent = await createMultipartEvent({
    fields: {
      form_type: 'demo',
      name: 'Asha',
      email: 'asha@example.com',
    },
    headers: {
      ...defaultHeaders,
      'x-forwarded-for': '198.51.100.1, 198.51.100.2',
      'x-nf-client-connection-ip': '203.0.113.77',
    },
  });
  const secondEvent = await createMultipartEvent({
    fields: {
      form_type: 'demo',
      name: 'Asha',
      email: 'asha@example.com',
    },
    headers: {
      ...defaultHeaders,
      'x-forwarded-for': '192.0.2.1, 192.0.2.2',
      'x-nf-client-connection-ip': '203.0.113.77',
    },
  });

  await withEnv(
    {
      RESEND_API_KEY: 'test_resend_key',
      RESEND_FROM: 'Tribera <no-reply@example.com>',
      FORM_RATE_LIMIT_MAX: '1',
      FORM_RATE_LIMIT_WINDOW_MS: '60000',
    },
    async () => {
      await withMockedFetch(async () => {
        const first = parseJsonResponse(await siteInquiryHandler(firstEvent));
        const second = parseJsonResponse(await siteInquiryHandler(secondEvent));

        assert.equal(first.statusCode, 200);
        assert.equal(second.statusCode, 429);
      });
    }
  );
});

test('site inquiry can use a shared rate limiter backend when configured', async () => {
  const event = await createMultipartEvent({
    fields: {
      form_type: 'demo',
      name: 'Asha',
      email: 'asha@example.com',
    },
    headers: defaultHeaders,
  });

  const originalFetch = global.fetch;
  const calls = [];
  global.fetch = async (url, options = {}) => {
    calls.push({
      url,
      options,
      json: options.body ? JSON.parse(options.body) : undefined,
    });

    if (url === 'https://rate-limit.example/check') {
      return {
        ok: true,
        async json() {
          return { ok: false, statusCode: 429, message: 'Rate limited by shared backend.' };
        },
      };
    }

    return {
      ok: true,
      async json() {
        return { id: 'email_test_123' };
      },
    };
  };

  try {
    await withEnv(
      {
        RESEND_API_KEY: 'test_resend_key',
        RESEND_FROM: 'Tribera <no-reply@example.com>',
        FORM_RATE_LIMIT_SHARED_URL: 'https://rate-limit.example/check',
        FORM_RATE_LIMIT_SHARED_TOKEN: 'shared-token',
      },
      async () => {
        const response = parseJsonResponse(await siteInquiryHandler(event));

        assert.equal(response.statusCode, 429);
        assert.deepEqual(response.body, {
          success: false,
          message: 'Rate limited by shared backend.',
        });
      }
    );
  } finally {
    global.fetch = originalFetch;
  }

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://rate-limit.example/check');
  assert.equal(calls[0].options.headers.Authorization, 'Bearer shared-token');
  assert.match(calls[0].json.key, /^site-inquiry:/);
});

test('site inquiry falls back to the local rate limiter when the shared backend fails', async () => {
  const createEvent = () =>
    createMultipartEvent({
      fields: {
        form_type: 'demo',
        name: 'Asha',
        email: 'asha@example.com',
      },
      headers: defaultHeaders,
    });

  const originalFetch = global.fetch;
  const calls = [];
  global.fetch = async (url, options = {}) => {
    calls.push({ url, options });

    if (url === 'https://rate-limit.example/check') {
      throw new Error('shared backend offline');
    }

    return {
      ok: true,
      async json() {
        return { id: 'email_test_123' };
      },
    };
  };

  try {
    await withEnv(
      {
        RESEND_API_KEY: 'test_resend_key',
        RESEND_FROM: 'Tribera <no-reply@example.com>',
        FORM_RATE_LIMIT_MAX: '1',
        FORM_RATE_LIMIT_WINDOW_MS: '60000',
        FORM_RATE_LIMIT_SHARED_URL: 'https://rate-limit.example/check',
      },
      async () => {
        const first = parseJsonResponse(await siteInquiryHandler(await createEvent()));
        const second = parseJsonResponse(await siteInquiryHandler(await createEvent()));

        assert.equal(first.statusCode, 200);
        assert.equal(second.statusCode, 429);
        assert.deepEqual(second.body, {
          success: false,
          message: 'Too many requests. Please try again shortly.',
        });
      }
    );
  } finally {
    global.fetch = originalFetch;
  }

  assert.equal(calls.filter((call) => call.url === 'https://rate-limit.example/check').length, 2);
});

test('site inquiry fails closed in production when the shared rate limiter backend fails', async () => {
  const event = await createMultipartEvent({
    fields: {
      form_type: 'demo',
      name: 'Asha',
      email: 'asha@example.com',
    },
    headers: defaultHeaders,
  });

  const originalFetch = global.fetch;
  global.fetch = async (url) => {
    if (url === 'https://rate-limit.example/check') {
      throw new Error('shared backend offline');
    }

    return {
      ok: true,
      async json() {
        return { id: 'email_test_123' };
      },
    };
  };

  try {
    await withEnv(
      {
        CONTEXT: 'production',
        RESEND_API_KEY: 'test_resend_key',
        RESEND_FROM: 'Tribera <no-reply@example.com>',
        FORM_RATE_LIMIT_SHARED_URL: 'https://rate-limit.example/check',
      },
      async () => {
        const response = parseJsonResponse(await siteInquiryHandler(event));

        assert.equal(response.statusCode, 429);
        assert.deepEqual(response.body, {
          success: false,
          message: 'Too many requests. Please try again shortly.',
        });
      }
    );
  } finally {
    global.fetch = originalFetch;
  }
});

test('site inquiry passes an abort signal to the shared rate limiter fetch', async () => {
  const event = await createMultipartEvent({
    fields: {
      form_type: 'demo',
      name: 'Asha',
      email: 'asha@example.com',
    },
    headers: defaultHeaders,
  });

  const originalFetch = global.fetch;
  const calls = [];
  global.fetch = async (url, options = {}) => {
    calls.push({ url, options });

    if (url === 'https://rate-limit.example/check') {
      return {
        ok: true,
        async json() {
          return { ok: true };
        },
      };
    }

    return {
      ok: true,
      async json() {
        return { id: 'email_test_123' };
      },
    };
  };

  try {
    await withEnv(
      {
        RESEND_API_KEY: 'test_resend_key',
        RESEND_FROM: 'Tribera <no-reply@example.com>',
        FORM_RATE_LIMIT_SHARED_URL: 'https://rate-limit.example/check',
      },
      async () => {
        const response = parseJsonResponse(await siteInquiryHandler(event));
        assert.equal(response.statusCode, 200);
      }
    );
  } finally {
    global.fetch = originalFetch;
  }

  const rateLimitCall = calls.find((call) => call.url === 'https://rate-limit.example/check');
  assert.ok(rateLimitCall);
  assert.ok(rateLimitCall.options.signal instanceof AbortSignal);
});

test('site inquiry prefers Netlify authoritative IP headers over spoofed client-ip values', async () => {
  const firstEvent = await createMultipartEvent({
    fields: {
      form_type: 'demo',
      name: 'Asha',
      email: 'asha@example.com',
    },
    headers: {
      ...defaultHeaders,
      'x-nf-client-connection-ip': '203.0.113.77',
      'client-ip': '198.51.100.1',
    },
  });
  const secondEvent = await createMultipartEvent({
    fields: {
      form_type: 'demo',
      name: 'Asha',
      email: 'asha@example.com',
    },
    headers: {
      ...defaultHeaders,
      'x-nf-client-connection-ip': '203.0.113.77',
      'client-ip': '198.51.100.99',
    },
  });

  await withEnv(
    {
      RESEND_API_KEY: 'test_resend_key',
      RESEND_FROM: 'Tribera <no-reply@example.com>',
      FORM_RATE_LIMIT_MAX: '1',
      FORM_RATE_LIMIT_WINDOW_MS: '60000',
    },
    async () => {
      await withMockedFetch(async () => {
        const first = parseJsonResponse(await siteInquiryHandler(firstEvent));
        const second = parseJsonResponse(await siteInquiryHandler(secondEvent));

        assert.equal(first.statusCode, 200);
        assert.equal(second.statusCode, 429);
      });
    }
  );
});

test('parseMultipartForm returns a 413 when a multipart file part exceeds the configured limit', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Asha',
    },
    files: [
      {
        name: 'resume',
        filename: 'resume.pdf',
        type: 'application/pdf',
        content: validPdfContent,
      },
    ],
    headers: defaultHeaders,
  });

  await assert.rejects(
    () => parseMultipartForm(event, { maxFileSize: 5 }),
    (error) => error?.statusCode === 413 && error?.message === 'Uploaded file must be 10 MB or smaller.'
  );
});

test('site inquiry does not trust x-forwarded-for in production when authoritative IP headers are absent', async () => {
  const createEvent = (forwardedFor) =>
    createMultipartEvent({
      fields: {
        form_type: 'demo',
        name: 'Asha',
        email: 'asha@example.com',
      },
      headers: {
        origin: 'http://localhost:3000',
        host: 'localhost:3000',
        'x-forwarded-for': forwardedFor,
      },
    });

  await withEnv(
    {
      CONTEXT: 'production',
      RESEND_API_KEY: 'test_resend_key',
      RESEND_FROM: 'Tribera <no-reply@example.com>',
      FORM_RATE_LIMIT_MAX: '1',
      FORM_RATE_LIMIT_WINDOW_MS: '60000',
    },
    async () => {
      await withMockedFetch(async () => {
        const first = parseJsonResponse(await siteInquiryHandler(await createEvent('198.51.100.1')));
        const second = parseJsonResponse(await siteInquiryHandler(await createEvent('203.0.113.99')));

        assert.equal(first.statusCode, 200);
        assert.equal(second.statusCode, 429);
      });
    }
  );
});

test('careers apply ignores spoofed role metadata and uses trusted slug metadata', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Rahul Das',
      email: 'rahul@example.com',
      job_title: 'Totally Different Role',
      job_slug: 'ai-ml-engineer',
      department: 'Fake Department',
    },
    files: [
      {
        name: 'resume',
        filename: 'rahul-das.pdf',
        type: 'application/pdf',
        content: validPdfContent,
      },
    ],
    headers: defaultHeaders,
  });

  await withEnv(
    {
      RESEND_API_KEY: 'test_resend_key',
      RESEND_FROM: 'Tribera <no-reply@example.com>',
      CAREERS_TO: 'careers@example.com',
    },
    async () => {
      await withMockedFetch(async (calls) => {
        const response = parseJsonResponse(await careersApplyHandler(event));

        assert.equal(response.statusCode, 200);
        assert.equal(calls.length, 1);
        assert.equal(calls[0].json.subject, 'Career application: AI/ML Engineer - Rahul Das');
        assert.match(calls[0].json.text, /Role: AI\/ML Engineer/);
        assert.match(calls[0].json.text, /Department: Engineering/);
        assert.doesNotMatch(calls[0].json.text, /Totally Different Role/);
        assert.doesNotMatch(calls[0].json.text, /Fake Department/);
      });
    }
  );
});

test('careers apply rejects unknown job slugs', async () => {
  const event = await createMultipartEvent({
    fields: {
      name: 'Rahul Das',
      email: 'rahul@example.com',
      job_title: 'Unknown Role',
      job_slug: 'unknown-role',
    },
    files: [
      {
        name: 'resume',
        filename: 'rahul-das.pdf',
        type: 'application/pdf',
        content: validPdfContent,
      },
    ],
    headers: defaultHeaders,
  });

  const response = parseJsonResponse(await careersApplyHandler(event));

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    success: false,
    message: 'Please select a valid role.',
  });
});
