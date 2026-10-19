import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import fs from 'node:fs';
import path from 'node:path';

// Local compiled-page + actual-handler harness. All provider transport is mocked;
// no request from this harness may reach an external email/scanner service.
export async function startA2Server() {
  const handlers = Object.fromEntries(
    await Promise.all(
      ['contact-form-v9', 'contact-send-v9', 'sample-form-v9', 'sample-request-v9'].map(async (name) => [
        name,
        (await import(`../netlify/functions/${name}.mjs`)).handler,
      ])
    )
  );
  const provider = { attempts: [], deliveries: [], keys: new Map(), failNext: null };
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, options = {}) => {
    assert.equal(String(url), 'https://api.resend.com/emails', 'Unexpected external request in mocked journey');
    const headers = new Headers(options.headers);
    const key = headers.get('Idempotency-Key');
    assert.ok(key, 'Every A2 delivery must have a provider idempotency key');
    const body = JSON.parse(options.body);
    const request = { key, body, raw: options.body };
    provider.attempts.push(request);
    const prior = provider.keys.get(key);
    if (prior && prior.raw !== request.raw)
      return new Response(
        JSON.stringify({ name: 'invalid_idempotent_request', message: 'Payload differs for this key' }),
        { status: 409 }
      );
    if (prior) return new Response(JSON.stringify({ id: prior.id }), { status: 200 });
    const failure = provider.failNext;
    if (failure && (!failure.to || (Array.isArray(body.to) ? body.to : [body.to]).includes(failure.to))) {
      provider.failNext = null;
      if (!failure.accepted)
        return new Response(JSON.stringify({ name: 'application_error', message: 'Temporary provider failure' }), {
          status: 503,
        });
    }
    const sent = { ...request, id: `mock_${provider.deliveries.length + 1}` };
    provider.keys.set(key, sent);
    provider.deliveries.push(sent);
    if (failure?.accepted && provider.failNext === null)
      throw new TypeError('Mock response lost after provider acceptance');
    return new Response(JSON.stringify({ id: sent.id }), { status: 200 });
  };
  const dist = path.resolve(process.env.V9_DIST || 'dist');
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url, `http://${request.headers.host}`);
      const name = url.pathname.split('/.netlify/functions/')[1];
      if (name && Object.hasOwn(handlers, name)) {
        const chunks = [];
        for await (const chunk of request) chunks.push(chunk);
        const result = await handlers[name]({
          httpMethod: request.method,
          headers: request.headers,
          queryStringParameters: Object.fromEntries(url.searchParams),
          body: Buffer.concat(chunks).toString('base64'),
          isBase64Encoded: true,
        });
        response.writeHead(result.statusCode, result.headers);
        response.end(result.body);
        return;
      }
      let file = path.resolve(dist, '.' + decodeURIComponent(url.pathname));
      if (!file.startsWith(dist + path.sep) && file !== dist) throw new Error('Invalid static path');
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
      if (!fs.existsSync(file)) {
        response.writeHead(404);
        response.end('Not found');
        return;
      }
      const types = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.woff2': 'font/woff2',
        '.webp': 'image/webp',
        '.ico': 'image/x-icon',
      };
      response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
      response.end(fs.readFileSync(file));
    } catch (error) {
      response.writeHead(500);
      response.end(String(error));
    }
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  return {
    base: `http://127.0.0.1:${server.address().port}`,
    provider,
    async close() {
      globalThis.fetch = originalFetch;
      const closed = once(server, 'close');
      server.close();
      server.closeAllConnections();
      await closed;
    },
  };
}
