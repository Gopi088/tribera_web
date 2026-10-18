import test from 'node:test';
import assert from 'node:assert/strict';
import { handler as candidate } from '../netlify/functions/candidate-profile-v9.mjs';
import { handler as career } from '../netlify/functions/careers-apply-v9.mjs';
import { JOB_CATALOG } from '../netlify/functions/_lib/job-catalog.mjs';
import { resetRateLimitStore } from '../netlify/functions/_lib/request-guards.mjs';
import { createMultipartEvent, withEnv, withMockedFetch } from './netlify-function-test-utils.mjs';

const headers = { origin: 'http://localhost:3000', host: 'localhost:3000' };
const cv = {
  name: 'cv',
  filename: 'resume.pdf',
  type: 'application/pdf',
  content: '%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF',
};
const env = {
  RESEND_API_KEY: 'test',
  RESEND_FROM: 'test@example.com',
  FORM_UPLOAD_SCAN_MODE: 'off',
  FORM_RATE_LIMIT_SHARED_URL: '',
};
const event = (fields = {}, overrides = {}) =>
  createMultipartEvent({ fields: { intent: 'active', ...fields }, files: [cv], headers, ...overrides });
test.beforeEach(resetRateLimitStore);

for (const intent of ['active', 'open']) {
  test(`candidate accepts CV-first ${intent} without fabricated identity`, async () => {
    await withEnv(env, () =>
      withMockedFetch(async (calls) => {
        const response = await candidate(await event({ intent, phone: '+91 90000' }));
        assert.equal(response.statusCode, 200);
        assert.equal(calls.length, 1);
        assert.equal(calls[0].json.reply_to, undefined);
        assert.match(calls[0].json.text, /Phone: \+91 90000/);
        assert.equal(calls[0].json.attachments.length, 1);
      })
    );
  });
}

test('career validates role identity server-side and escapes paragraph', async () => {
  await withEnv(env, () =>
    withMockedFetch(async (calls) => {
      const response = await career(
        await event({ job_slug: 'backend-engineer', job_title: 'Spoofed', paragraph: '<script>alert(1)</script>' })
      );
      assert.equal(response.statusCode, 200);
      assert.match(calls[0].json.subject, /Backend Engineer/);
      assert.doesNotMatch(calls[0].json.text, /Spoofed/);
      assert.match(calls[0].json.html, /&lt;script&gt;/);
      assert.doesNotMatch(calls[0].json.html, /<script>/);
    })
  );
});

const invalidCases = [
  ['missing CV', candidate, {}, { files: [] }],
  ['wrong upload field', candidate, {}, { files: [{ ...cv, name: 'resume' }] }],
  ['extra upload', candidate, {}, { files: [cv, { ...cv, name: 'extra' }] }],
  ['invalid intent', candidate, { intent: 'anything' }],
  ['missing intent', candidate, { intent: '' }],
  ['long phone', candidate, { phone: '1'.repeat(33) }],
  ['invalid file signature', candidate, {}, { files: [{ ...cv, content: 'not a PDF' }] }],
  ['missing timestamp', candidate, { form_loaded_at: '' }],
  ['stale timestamp', candidate, { form_loaded_at: '1' }],
  ['foreign origin', candidate, {}, { headers: { ...headers, origin: 'https://evil.example' } }],
  ['missing paragraph', career, { job_slug: 'backend-engineer' }],
  ['long paragraph', career, { job_slug: 'backend-engineer', paragraph: 'x'.repeat(4001) }],
  ['unknown role', career, { job_slug: 'made-up', paragraph: 'My work' }],
  ['prototype role', career, { job_slug: 'constructor', paragraph: 'My work' }],
];
for (const [name, handler, fields, overrides] of invalidCases) {
  test(`${name} rejects without delivery`, async () => {
    await withEnv(env, () =>
      withMockedFetch(async (calls) => {
        const response = await handler(await event(fields, overrides));
        assert.equal(response.statusCode, 400);
        assert.equal(calls.length, 0);
      })
    );
  });
}

test('closed role rejects', async () => {
  const job = JOB_CATALOG['backend-engineer'];
  job.status = 'closed';
  try {
    const response = await career(await event({ job_slug: 'backend-engineer', paragraph: 'My work' }));
    assert.equal(response.statusCode, 400);
  } finally {
    job.status = 'open';
  }
});

test('honeypot silently succeeds without delivery', async () => {
  await withMockedFetch(async (calls) => {
    assert.equal((await candidate(await event({ botcheck: 'spam' }))).statusCode, 200);
    assert.equal(calls.length, 0);
  });
});

test('rate limiter applies to new adapter', async () => {
  await withEnv({ ...env, FORM_RATE_LIMIT_MAX: '1' }, () =>
    withMockedFetch(async (calls) => {
      assert.equal((await candidate(await event())).statusCode, 200);
      assert.equal((await candidate(await event())).statusCode, 429);
      assert.equal(calls.length, 1);
    })
  );
});

test('scanner rejection prevents email', async () => {
  const original = global.fetch;
  const calls = [];
  global.fetch = async (url) => {
    calls.push(url);
    return { ok: true, json: async () => ({ ok: false, message: 'Unsafe upload' }) };
  };
  try {
    await withEnv(
      { ...env, FORM_UPLOAD_SCAN_MODE: 'required', FORM_UPLOAD_SCAN_URL: 'https://scanner.example/scan' },
      async () => {
        assert.equal((await candidate(await event())).statusCode, 400);
        assert.deepEqual(calls, ['https://scanner.example/scan']);
      }
    );
  } finally {
    global.fetch = original;
  }
});

test('provider failure is visible and not success', async () => {
  const original = global.fetch;
  global.fetch = async () => ({ ok: false, json: async () => ({ message: 'Provider unavailable' }) });
  try {
    await withEnv(env, async () => {
      const response = await candidate(await event());
      assert.equal(response.statusCode, 500);
      assert.equal(JSON.parse(response.body).success, false);
    });
  } finally {
    global.fetch = original;
  }
});

test('native POST gets readable HTML result and enhanced request gets JSON', async () => {
  await withEnv(env, () =>
    withMockedFetch(async () => {
      const response = await candidate(await event({}, { headers: { ...headers, accept: 'text/html' } }));
      assert.equal(response.statusCode, 200);
      assert.match(response.headers['Content-Type'], /text\/html/);
      assert.match(response.body, /<h1>Submission received<\/h1>/);
      const error = await candidate(await event({ intent: 'bad' }, { headers: { ...headers, accept: 'text/html' } }));
      assert.equal(error.statusCode, 400);
      assert.match(error.body, /valid job-search preference/);
      const enhanced = await candidate(await event({}, { headers: { ...headers, accept: 'application/json' } }));
      assert.equal(JSON.parse(enhanced.body).success, true);
    })
  );
});

test('GET does not submit', async () => {
  assert.equal((await candidate({ httpMethod: 'GET' })).statusCode, 405);
  assert.equal((await career({ httpMethod: 'GET' })).statusCode, 405);
});

test('required scanner approval precedes delivery with same attachment', async () => {
  const original = global.fetch;
  const calls = [];
  global.fetch = async (url, options) => {
    calls.push({ url, body: JSON.parse(options.body) });
    return { ok: true, json: async () => ({ ok: true }) };
  };
  try {
    await withEnv(
      { ...env, FORM_UPLOAD_SCAN_MODE: 'required', FORM_UPLOAD_SCAN_URL: 'https://scanner.example/scan' },
      async () => {
        assert.equal(
          (await career(await event({ job_slug: 'backend-engineer', paragraph: 'A system I built.' }))).statusCode,
          200
        );
        assert.deepEqual(
          calls.map((call) => call.url),
          ['https://scanner.example/scan', 'https://api.resend.com/emails']
        );
        assert.equal(calls[0].body.contentBase64, calls[1].body.attachments[0].content);
      }
    );
  } finally {
    global.fetch = original;
  }
});

test('missing required scanner blocks delivery', async () => {
  await withEnv({ ...env, FORM_UPLOAD_SCAN_MODE: 'required', FORM_UPLOAD_SCAN_URL: '' }, () =>
    withMockedFetch(async (calls) => {
      assert.equal((await candidate(await event())).statusCode, 400);
      assert.equal(calls.length, 0);
    })
  );
});
