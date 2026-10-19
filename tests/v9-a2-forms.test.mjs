import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { handler as contactGet } from '../netlify/functions/contact-form-v9.mjs';
import { handler as contactPost } from '../netlify/functions/contact-send-v9.mjs';
import { handler as sampleGet } from '../netlify/functions/sample-form-v9.mjs';
import { handler as samplePost } from '../netlify/functions/sample-request-v9.mjs';
import { resetRateLimitStore } from '../netlify/functions/_lib/request-guards.mjs';
const env = {
  FORM_REQUEST_TOKEN_SECRET: 'test-secret-only-32-characters-long-enough',
  RESEND_API_KEY: 'mock',
  RESEND_FROM: 'Tribera <test@example.com>',
  CONTACT_HIRING_TO: 'hiring@example.com',
  CONTACT_LOOKING_TO: 'looking@example.com',
  SAMPLE_LEADS_TO: 'leads@example.com',
  FORM_UPLOAD_SCAN_MODE: 'off',
  FORM_MIN_SUBMIT_MS: '1500',
  FORM_RATE_LIMIT_MAX: '100',
};
const headers = { host: 'tribera.ai', origin: 'https://tribera.ai', accept: 'application/json' };
let clock = Date.now();
const originalNow = Date.now,
  originalFetch = globalThis.fetch;
let calls, seen, behavior;
test.beforeEach(() => {
  Object.assign(process.env, env);
  resetRateLimitStore();
  Date.now = () => clock;
  calls = [];
  seen = new Map();
  behavior = null;
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    const key = options.headers['Idempotency-Key'];
    const body = options.body;
    calls.push({ key, body: JSON.parse(body) });
    if (behavior) {
      const result = await behavior(key, body);
      if (result) return result;
    }
    if (seen.has(key) && seen.get(key) !== body)
      return Response.json({ name: 'invalid_idempotent_request' }, { status: 409 });
    seen.set(key, body);
    return Response.json({ id: `email-${key}` });
  };
});
test.afterEach(() => {
  Date.now = originalNow;
  globalThis.fetch = originalFetch;
  for (const key of Object.keys(env)) delete process.env[key];
  delete process.env.FORM_UPLOAD_SCAN_URL;
});
const handshake = async (kind, query = {}) => {
  const r = await (kind === 'sample' ? sampleGet : contactGet)({
    httpMethod: 'GET',
    headers,
    queryStringParameters: { format: 'json', ...query },
  });
  assert.equal(r.statusCode, 200);
  const t = JSON.parse(r.body);
  clock += 1600;
  return { request_token: t.request_token, form_loaded_at: t.form_loaded_at };
};
const event = async (fields, file, accept = 'application/json') => {
  const form = new FormData();
  for (const [k, v] of Object.entries(fields)) form.set(k, String(v));
  if (file)
    form.append(
      file.field || 'cv',
      new Blob([file.bytes || '%PDF-1.7\nfixture\n%%EOF'], { type: file.type || 'application/pdf' }),
      file.name || 'resume.pdf'
    );
  const request = new Request('https://tribera.ai', { method: 'POST', body: form });
  return {
    httpMethod: 'POST',
    headers: { ...headers, accept, 'content-type': request.headers.get('content-type') },
    body: Buffer.from(await request.arrayBuffer()).toString('base64'),
    isBase64Encoded: true,
  };
};
const hiring = (t) => ({
  ...t,
  side: 'hiring',
  name: 'Person',
  email: 'person@example.com',
  role: 'Engineer',
  company: 'Company',
  botcheck: '',
});
const sample = (t) => ({
  ...t,
  name: 'Person',
  email: 'person@example.com',
  company: 'Company',
  website: '',
  botcheck: '',
});
test('GET token is fresh, no-store; native contextual form and explicit clearing', async () => {
  const response = await contactGet({
    httpMethod: 'GET',
    headers: { ...headers, referer: 'https://tribera.ai/__v9/contact?side=looking&service=iaas&sector=ai-data' },
    queryStringParameters: { format: 'json' },
  });
  const body = JSON.parse(response.body);
  assert.equal(body.context.side, 'looking');
  assert.equal(body.context.service, 'iaas');
  assert.equal(body.ready_at, clock + 1500);
  assert.equal(response.headers['Cache-Control'], 'no-store');
  const cleared = await contactGet({
    httpMethod: 'GET',
    headers: { ...headers, referer: 'https://tribera.ai/?side=looking&service=iaas' },
    queryStringParameters: { format: 'json', service: '' },
  });
  assert.equal(JSON.parse(cleared.body).context.side, 'hiring');
  assert.equal(JSON.parse(cleared.body).context.service, '');
  const foreign = await contactGet({
    httpMethod: 'GET',
    headers: { ...headers, referer: 'https://evil.test/?side=looking' },
    queryStringParameters: { format: 'json' },
  });
  assert.equal(JSON.parse(foreign.body).context.side, 'hiring');
  const html = await contactGet({
    httpMethod: 'GET',
    headers,
    queryStringParameters: { side: 'looking', service: 'iaas' },
  });
  assert.match(html.body, /enctype="multipart\/form-data"/);
  assert.match(html.body, /name="cv"/);
  assert.match(html.body, /name="service" value="iaas"/);
});
test('contact hiring only sends active fields and validated context to configured recipient', async () => {
  const f = {
    ...hiring(await handshake('contact')),
    service: 'iaas',
    sector: 'ai-data',
    intent: 'sample-write-up',
    note: 'IGNORE',
    to: 'attacker@example.com',
  };
  const r = await contactPost(await event(f));
  assert.equal(r.statusCode, 200);
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0].body.to, ['hiring@example.com']);
  assert.match(calls[0].body.text, /service: iaas/);
  assert.doesNotMatch(calls[0].body.text, /IGNORE|attacker/);
});
test('looking CV validates bytes and routes only active candidate details', async () => {
  const f = { ...hiring(await handshake('contact')), side: 'looking', note: 'Candidate note', role: 'IGNORE' };
  assert.equal((await contactPost(await event(f, { bytes: 'fake pdf' }))).statusCode, 400);
  assert.equal((await contactPost(await event(f, { field: 'unexpected' }))).statusCode, 400);
  assert.equal(calls.length, 0);
  assert.equal((await contactPost(await event(f, {}))).statusCode, 200);
  assert.deepEqual(calls[0].body.to, ['looking@example.com']);
  assert.match(calls[0].body.text, /cv_sha256:/);
  assert.doesNotMatch(calls[0].body.text, /IGNORE|company:/);
});
test('origin, forged token, changed timestamp, expired, missing active fields and unsupported context fail closed', async () => {
  const f = hiring(await handshake('contact'));
  for (const delta of [
    { request_token: f.request_token + 'x' },
    { form_loaded_at: '1' },
    { side: 'other' },
    { role: '' },
    { email: 'bad' },
    { sector: 'forged' },
  ])
    assert.equal((await contactPost(await event({ ...f, ...delta }))).statusCode, 400);
  const e = await event(f);
  e.headers.origin = 'https://evil.test';
  assert.equal((await contactPost(e)).statusCode, 400);
  clock += 2 * 60 * 60 * 1000;
  assert.equal((await contactPost(await event(f))).statusCode, 400);
  assert.equal(calls.length, 0);
});
test('required scanner and config absence block delivery honestly', async () => {
  const f = { ...hiring(await handshake('contact')), side: 'looking' };
  process.env.FORM_UPLOAD_SCAN_MODE = 'required';
  assert.equal((await contactPost(await event(f, {}))).statusCode, 503);
  delete process.env.CONTACT_LOOKING_TO;
  assert.equal((await contactPost(await event(f, {}))).statusCode, 503);
  assert.equal(calls.length, 0);
});
test('sample email attaches only private PDF, records lead, and exact retries dedupe', async () => {
  const f = sample(await handshake('sample'));
  assert.equal((await samplePost(await event(f))).statusCode, 200);
  assert.equal((await samplePost(await event(f))).statusCode, 200);
  assert.equal(seen.size, 2);
  assert.deepEqual(calls[0].body.to, ['person@example.com']);
  assert.deepEqual(calls[1].body.to, ['leads@example.com']);
  assert.deepEqual(
    Buffer.from(calls[0].body.attachments[0].content, 'base64'),
    fs.readFileSync('sample_data/tribera-web-handoff-v9/docs/email-assets/tribera-sample-candidate-write-up.pdf')
  );
  assert.ok(calls.every((c) => !JSON.stringify(c.body).includes('audience_id')));
});
test('lost accepted response retries identical first step, then lead; partial lead failure retries safely', async () => {
  const f = sample(await handshake('sample'));
  let lost = true;
  behavior = async (key, body) => {
    if (lost) {
      lost = false;
      seen.set(key, body);
      throw new Error('Lost response after accepted');
    }
  };
  assert.equal((await samplePost(await event(f))).statusCode, 503);
  behavior = null;
  assert.equal((await samplePost(await event(f))).statusCode, 200);
  assert.equal(seen.size, 2);
  let failLead = true;
  const f2 = sample(await handshake('sample'));
  behavior = async (key) => {
    if (key.endsWith('/lead') && failLead) {
      failLead = false;
      return Response.json({ message: 'temporary' }, { status: 503 });
    }
  };
  assert.equal((await samplePost(await event(f2))).statusCode, 503);
  assert.equal((await samplePost(await event(f2))).statusCode, 200);
  assert.equal(seen.size, 4);
});
test('changed retry payload stops before lead; concurrent409 retryable; malformed provider success not success', async () => {
  const f = sample(await handshake('sample'));
  await samplePost(await event(f));
  const changed = await samplePost(await event({ ...f, company: 'Changed' }));
  assert.equal(changed.statusCode, 409);
  assert.equal(JSON.parse(changed.body).retryable, false);
  assert.equal(calls.length, 3);
  behavior = () => Response.json({ name: 'concurrent_idempotent_requests' }, { status: 409 });
  const concurrent = await samplePost(await event(f));
  assert.equal(JSON.parse(concurrent.body).retryable, true);
  behavior = () => Response.json({});
  assert.equal((await samplePost(await event(f))).statusCode, 503);
});
test('native success PRG; ambiguous HTML preserves token and escaped fields', async () => {
  const f = hiring(await handshake('contact'));
  behavior = () => {
    throw new Error('uncertain');
  };
  const failure = await contactPost(await event({ ...f, name: '<Person>' }, null, 'text/html'));
  assert.equal(failure.statusCode, 503);
  assert.ok(failure.body.includes(f.request_token));
  assert.match(failure.body, /&lt;Person&gt;/);
  assert.match(failure.body, /Submit same request/);
  behavior = null;
  const success = await contactPost(await event(f, null, 'text/html'));
  assert.equal(success.statusCode, 303);
  assert.equal(success.headers.Location, '/.netlify/functions/contact-form-v9?received=1');
  const received = await contactGet({ httpMethod: 'GET', headers, queryStringParameters: { received: '1' } });
  assert.doesNotMatch(received.body, /<form/);
});

test('A2 honeypots explicitly reject and never claim delivery', async () => {
  const f = sample(await handshake('sample'));
  for (const honeypot of ['website', 'botcheck']) {
    const response = await samplePost(await event({ ...f, [honeypot]: 'bot' }));
    assert.equal(response.statusCode, 400);
    assert.equal(JSON.parse(response.body).success, false);
  }
  assert.equal(calls.length, 0);
});

test('native expired/conflicting request has terminal guidance without a new send form', async () => {
  const f = sample(await handshake('sample'));
  await samplePost(await event(f));
  const conflict = await samplePost(await event({ ...f, company: 'Changed' }, null, 'text/html'));
  assert.equal(conflict.statusCode, 409);
  assert.doesNotMatch(conflict.body, /<form/);
  clock += 2 * 60 * 60 * 1000;
  const expired = await samplePost(await event(f, null, 'text/html'));
  assert.equal(expired.statusCode, 400);
  assert.doesNotMatch(expired.body, /<form/);
});
