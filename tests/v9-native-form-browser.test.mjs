import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { chromium, firefox, webkit } from 'playwright';
import { handler as render } from '../netlify/functions/candidate-form-v9.mjs';
import { handler as submit } from '../netlify/functions/candidate-profile-v9.mjs';
import { resetRateLimitStore } from '../netlify/functions/_lib/request-guards.mjs';
import { withEnv, withMockedFetch } from './netlify-function-test-utils.mjs';

const name = process.env.BROWSER || 'chromium';
const engine = { chromium, firefox, webkit }[name];
assert.ok(engine, `Unknown browser ${name}`);
const server = createServer(async (request, response) => {
  try {
    const chunks = [];
    for await (const chunk of request) chunks.push(chunk);
    const url = new URL(request.url, `http://${request.headers.host}`);
    const event = {
      queryStringParameters: Object.fromEntries(url.searchParams),
      httpMethod: request.method,
      headers: request.headers,
      body: Buffer.concat(chunks).toString('base64'),
      isBase64Encoded: true,
    };
    const result =
      url.pathname === '/.netlify/functions/candidate-form-v9'
        ? await render(event)
        : url.pathname === '/.netlify/functions/candidate-profile-v9'
          ? await submit(event)
          : { statusCode: 404, body: 'Not found' };
    response.writeHead(result.statusCode, result.headers);
    response.end(result.body);
  } catch (error) {
    response.writeHead(500);
    response.end(String(error));
  }
});
server.listen(0, '127.0.0.1');
await once(server, 'listening');
const base = `http://127.0.0.1:${server.address().port}`;
let browser;
try {
  resetRateLimitStore();
  browser = await engine.launch();
  const page = await browser.newPage({ javaScriptEnabled: false });
  await withEnv(
    {
      ALLOWED_FORM_ORIGINS: base,
      RESEND_API_KEY: 'test',
      RESEND_FROM: 'test@example.com',
      FORM_UPLOAD_SCAN_MODE: 'off',
      FORM_RATE_LIMIT_SHARED_URL: '',
    },
    () =>
      withMockedFetch(async (calls) => {
        const response = await page.goto(`${base}/.netlify/functions/candidate-form-v9`);
        assert.equal(response.headers()['cache-control'], 'no-store');
        await page.getByRole('button', { name: 'Send my CV' }).click();
        assert.equal(calls.length, 0, 'Native required upload prevents an empty submission');
        assert.ok(page.url().endsWith('/candidate-form-v9'));
        await page
          .locator('input[name="cv"]')
          .setInputFiles({ name: 'resume.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4\n%%EOF') });
        await page.getByLabel('Open to the right role').check();
        await page.getByLabel('Phone number (optional)').fill('+91 9876543210');
        await new Promise((resolve) => setTimeout(resolve, 1600));
        await Promise.all([
          page.waitForURL('**/candidate-form-v9?received=1'),
          page.getByRole('button', { name: 'Send my CV' }).click(),
        ]);
        assert.equal(await page.locator('h1').textContent(), 'Submission received');
        assert.equal(calls.length, 1);
        await page.reload();
        assert.equal(calls.length, 1, 'Refreshing the GET receipt does not replay the POST');
        assert.match(calls[0].json.text, /Open to the right role/);
        assert.match(calls[0].json.text, /9876543210/);
        assert.equal(calls[0].json.attachments.length, 1);
        await page.goto(`${base}/.netlify/functions/candidate-form-v9`);
        await page
          .locator('input[name="cv"]')
          .setInputFiles({ name: 'invalid.pdf', mimeType: 'application/pdf', buffer: Buffer.from('not a PDF') });
        await new Promise((resolve) => setTimeout(resolve, 1600));
        await Promise.all([
          page.waitForURL('**/candidate-profile-v9'),
          page.getByRole('button', { name: 'Send my CV' }).click(),
        ]);
        assert.equal(await page.locator('h1').textContent(), 'Submission could not be completed');
        assert.equal(calls.length, 1, 'Invalid signature is rejected without delivery');
      })
  );
  console.log(
    `${name}: actual no-JS native GET/multipart POST handlers passed with mocked delivery; Netlify hosting not tested`
  );
} finally {
  await browser?.close();
  const closed = once(server, 'close');
  server.close();
  server.closeAllConnections();
  await closed;
}
