import test from 'node:test';
import assert from 'node:assert/strict';

import { handler as siteInquiryHandler } from '../netlify/functions/site-inquiry.mjs';
import { handler as candidateProfileHandler } from '../netlify/functions/candidate-profile.mjs';
import { handler as careersApplyHandler } from '../netlify/functions/careers-apply.mjs';
import { resetRateLimitStore } from '../netlify/functions/_lib/request-guards.mjs';

import {
  createMultipartEvent,
  parseJsonResponse,
  withEnv,
  withMockedFetch,
} from './netlify-function-test-utils.mjs';

const defaultHeaders = {
  origin: 'http://localhost:3000',
  host: 'localhost:3000',
  'x-forwarded-for': '203.0.113.10',
};

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
        content: '%PDF-1.4 fake pdf',
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
        content: '%PDF-1.4 fake pdf',
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
        content: '%PDF-1.4 another fake pdf',
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
        content: '%PDF-1.4 another fake pdf',
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
        content: '%PDF-1.4 another fake pdf',
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
        content: '%PDF-1.4 another fake pdf',
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
