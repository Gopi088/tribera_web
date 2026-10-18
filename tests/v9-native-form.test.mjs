import test from 'node:test';
import assert from 'node:assert/strict';
import { handler as form } from '../netlify/functions/candidate-form-v9.mjs';
import { handler as submit } from '../netlify/functions/candidate-profile-v9.mjs';
import { resetRateLimitStore } from '../netlify/functions/_lib/request-guards.mjs';
import { createMultipartEvent, withEnv, withMockedFetch } from './netlify-function-test-utils.mjs';

test('native CV form issues a fresh uncacheable timestamp and rejects other methods', async () => {
  const before = Date.now();
  const response = await form({ httpMethod: 'GET' });
  const stamp = Number(response.body.match(/name="form_loaded_at" value="(\d+)"/)[1]);
  assert.ok(stamp >= before && stamp <= Date.now());
  assert.equal(response.headers['Cache-Control'], 'no-store');
  assert.equal(response.headers['X-Robots-Tag'], 'noindex, nofollow');
  assert.match(response.body, /action="\/\.netlify\/functions\/candidate-profile-v9"/);
  assert.equal((await form({ httpMethod: 'POST' })).statusCode, 405);
});

test('server-issued native form submits after reading time, with existing timing and delivery guards', async (t) => {
  resetRateLimitStore();
  const now = Date.now();
  t.mock.method(Date, 'now', () => now);
  const rendered = await form({ httpMethod: 'GET' });
  const timestamp = rendered.body.match(/name="form_loaded_at" value="(\d+)"/)[1];
  const event = await createMultipartEvent({
    fields: { form_loaded_at: timestamp, botcheck: '', intent: 'open' },
    files: [{ name: 'cv', filename: 'cv.pdf', type: 'application/pdf', content: '%PDF-1.4\n%%EOF' }],
    headers: { origin: 'http://localhost:3000', host: 'localhost:3000', accept: 'text/html' },
  });
  await withEnv(
    {
      RESEND_API_KEY: 'test',
      RESEND_FROM: 'test@example.com',
      FORM_UPLOAD_SCAN_MODE: 'off',
      FORM_RATE_LIMIT_SHARED_URL: '',
    },
    () =>
      withMockedFetch(async (calls) => {
        assert.equal((await submit(event)).statusCode, 400, 'Immediate bot submission remains rejected');
        t.mock.method(Date, 'now', () => now + 3000);
        const accepted = await submit(event);
        assert.equal(accepted.statusCode, 303);
        assert.equal(accepted.headers.Location, '/.netlify/functions/candidate-form-v9?received=1');
        assert.equal(accepted.body, '');
        assert.equal(calls.length, 1);
        t.mock.method(Date, 'now', () => now + 3 * 60 * 60 * 1000);
        assert.equal((await submit(event)).statusCode, 400, 'Expired form remains rejected');
        assert.equal(calls.length, 1);
      })
  );
});
