import assert from 'node:assert/strict';
import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { once } from 'node:events';

// All page suites consume the same already-built preview artifact, including CI.
// No child may silently test Astro dev in place of the candidate build.
const port = process.env.TEST_PORT || '4390';
const base = process.env.TEST_BASE_URL || `http://127.0.0.1:${port}`;
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const buildPath = path.resolve(process.env.V9_DIST || 'dist');
const output = `artifacts/v9-a2/page-suites-${process.env.BROWSER || 'chromium'}.json`;
const report = {
  status: 'failed',
  startedAt: new Date().toISOString(),
  commit: git('rev-parse', 'HEAD'),
  cleanTree: !git('status', '--porcelain'),
  lockHash: hash(fs.readFileSync('package-lock.json')),
  buildPath,
  buildHash: null,
  browser: process.env.BROWSER || 'chromium',
  base,
  expectedSuites: 4,
  suites: [],
  errors: [],
};
let server;
try {
  const files = fs
    .readdirSync(buildPath, { recursive: true })
    .filter((file) => fs.statSync(path.join(buildPath, file)).isFile())
    .sort();
  assert.ok(files.length, 'Compiled preview must not be empty');
  report.buildHash = hash(
    files.map((file) => `${file}:${hash(fs.readFileSync(path.join(buildPath, file)))}`).join('\n')
  );
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
        ready = (await fetch(`${base}/__v9/contact`, { signal: AbortSignal.timeout(1000) })).status === 200;
      } catch {
        /* starting */
      }
      if (ready) break;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    assert.ok(ready, 'Build both A2 conversion pages with V9_PREVIEW=1 before running this gate');
  }
  for (const suite of [
    'tests/v9-a2-pages.test.mjs',
    'tests/v9-a2-journeys.test.mjs',
    'tests/v9-a1-navigation.test.mjs',
    'tests/v9-preview-navigation.test.mjs',
  ]) {
    console.log(`Running ${suite} against ${base}`);
    const startedAt = new Date().toISOString();
    const child = spawn(process.execPath, [suite], {
      timeout: 10 * 60 * 1000,
      stdio: 'inherit',
      env: { ...process.env, TEST_BASE_URL: base },
    });
    const [code, signal] = await once(child, 'exit');
    report.suites.push({
      command: `${process.execPath} ${suite}`,
      startedAt,
      finishedAt: new Date().toISOString(),
      exitCode: code,
      signal,
      status: code === 0 ? 'passed' : 'failed',
    });
    assert.equal(code, 0, `${suite} failed (${signal || code})`);
  }
  assert.equal(report.suites.length, report.expectedSuites);
  assert.equal(git('rev-parse', 'HEAD'), report.commit, 'Revision changed during the page gate');
  assert.equal(!git('status', '--porcelain'), report.cleanTree, 'Working tree state changed during the page gate');
  report.status = 'passed';
} catch (error) {
  report.errors.push(error.stack);
  throw error;
} finally {
  report.finishedAt = new Date().toISOString();
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
  if (server && server.exitCode === null) {
    const exited = once(server, 'exit');
    server.kill('SIGTERM');
    await exited;
  }
}
