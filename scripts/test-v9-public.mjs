import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';

const port = process.env.TEST_PORT || '4393';
const base = process.env.TEST_BASE_URL || `http://127.0.0.1:${port}`;
let server;
try {
  if (!process.env.TEST_BASE_URL) {
    server = spawn(
      process.execPath,
      ['node_modules/astro/bin/astro.mjs', 'preview', '--host', '127.0.0.1', '--port', port],
      { stdio: 'inherit' }
    );
    let ready = false;
    for (let attempt = 0; attempt < 120; attempt++) {
      assert.equal(server.exitCode, null, 'Preview server exited');
      try {
        ready = (await fetch(base, { signal: AbortSignal.timeout(1000) })).ok;
      } catch {
        /* starting */
      }
      if (ready) break;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    assert.ok(ready, 'Production preview must start');
  }
  const suites = [
    'tests/v9-public-routes.test.mjs',
    'tests/v9-content-pages.test.mjs',
    'tests/shared-chrome.test.mjs',
    'tests/v9-release-regressions.test.mjs',
    'tests/v9-content-journeys.test.mjs',
    'tests/v9-sharing.test.mjs',
  ];
  if (!process.env.BROWSER || process.env.BROWSER === 'chromium') {
    suites.push('tests/client-publication.test.mjs', 'tests/newsletter-journey.test.mjs');
  }
  for (const suite of suites) {
    const child = spawn(process.execPath, [suite], { stdio: 'inherit', env: { ...process.env, TEST_BASE_URL: base } });
    const [code] = await once(child, 'exit');
    assert.equal(code, 0, `${suite} failed`);
  }
} finally {
  if (server && server.exitCode === null) {
    const exited = once(server, 'exit');
    server.kill('SIGTERM');
    await exited;
  }
}
