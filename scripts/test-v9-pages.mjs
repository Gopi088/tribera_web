import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';

// All page suites consume the same already-built preview artifact, including CI.
// No child may silently test Astro dev in place of the candidate build.
const port = process.env.TEST_PORT || '4390';
const base = process.env.TEST_BASE_URL || `http://127.0.0.1:${port}`;
let server;
try {
  if (!process.env.TEST_BASE_URL) {
    server = spawn(
      process.execPath,
      ['node_modules/astro/bin/astro.mjs', 'preview', '--host', '127.0.0.1', '--port', port],
      { stdio: 'ignore' }
    );
    let ready = false;
    for (let attempt = 0; attempt < 120; attempt++) {
      assert.equal(server.exitCode, null, 'Preview server exited');
      try {
        ready = (await fetch(`${base}/__v9/home`, { signal: AbortSignal.timeout(1000) })).status === 200;
      } catch {
        /* starting */
      }
      if (ready) break;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    assert.ok(ready, 'Build all five representative pages with V9_PREVIEW=1 before running this gate');
  }
  for (const suite of [
    'tests/v9-pages.test.mjs',
    'tests/v9-native-form-browser.test.mjs',
    'tests/v9-candidates.test.mjs',
    'tests/v9-candidates-reference.test.mjs',
    'tests/v9-editorial.test.mjs',
    'tests/v9-preview-navigation.test.mjs',
  ]) {
    console.log(`Running ${suite} against ${base}`);
    const child = spawn(process.execPath, [suite], { stdio: 'inherit', env: { ...process.env, TEST_BASE_URL: base } });
    const [code, signal] = await once(child, 'exit');
    assert.equal(code, 0, `${suite} failed (${signal || code})`);
  }
} finally {
  if (server && server.exitCode === null) {
    const exited = once(server, 'exit');
    server.kill('SIGTERM');
    await exited;
  }
}
