import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { test } from 'node:test';
import { summarizeEvidence } from '../scripts/v9-evidence.mjs';

const revision = 'a'.repeat(40),
  lockHash = 'b'.repeat(64),
  buildHash = 'c'.repeat(64);
function raw(gate) {
  return {
    gate,
    status: 'passed',
    commit: revision,
    lockHash,
    buildHash,
    cleanTree: true,
    startedAt: '2026-10-18T00:00:00Z',
    finishedAt: '2026-10-18T00:01:00Z',
    command: `node scripts/v9-gate.mjs ${gate}`,
    node: 'v22.15.0',
    platform: 'linux',
    buildPath: '/build/dist',
    limitations: ['Not hosted validation'],
    suites:
      gate === 'static'
        ? [
            {
              name: 'checker-negative-tests',
              expectedMinimum: 5,
              executed: 5,
              skipped: 0,
              exitCode: 0,
              status: 'passed',
            },
            {
              name: 'route-map-and-built-references',
              expectedRoutes: 3,
              baselineRoutes: 2,
              futureRoutes: 1,
              executedPages: 2,
              references: 10,
              errors: [],
              status: 'passed',
            },
          ]
        : [
            {
              name: 'browser-smoke-and-rendered-references',
              browser: 'chromium',
              expectedChecks: 4,
              executedChecks: 4,
              renderedReferences: 10,
              routes: ['/', '/about'],
              viewports: [390, 1366],
              errors: [],
              status: 'passed',
            },
          ],
  };
}
function fixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'v9-evidence-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const manifest = {
    scope: 'Static and Chromium smoke only',
    revision,
    lockHash,
    builds: { production: buildHash },
    reports: [
      { id: 'static', path: 'static.json', build: 'production', gate: 'static' },
      { id: 'chromium', path: 'browser.json', build: 'production', gate: 'browser', browser: 'chromium' },
    ],
  };
  const write = (name, value) => fs.writeFileSync(path.join(dir, name), JSON.stringify(value));
  write('static.json', raw('static'));
  write('browser.json', raw('browser'));
  return { dir, manifest, write, run: () => summarizeEvidence(manifest, dir) };
}

test('derives success from complete explicit raw reports and preserves their hashes/statuses/counts', (t) => {
  const f = fixture(t),
    result = f.run();
  assert.equal(result.status, 'passed');
  assert.equal(result.verifiedReports, 2);
  assert.equal(
    result.reports[0].sha256,
    createHash('sha256')
      .update(fs.readFileSync(path.join(f.dir, 'static.json')))
      .digest('hex')
  );
  assert.equal(result.reports[1].suites[0].executedChecks, 4);
  assert.deepEqual(result.reports[1].limitations, ['Not hosted validation']);
});

test('missing and malformed files cannot turn into passing evidence', (t) => {
  const f = fixture(t);
  fs.unlinkSync(path.join(f.dir, 'browser.json'));
  let result = f.run();
  assert.equal(result.status, 'failed');
  assert.equal(result.reports[1].reportedStatus, null);
  fs.writeFileSync(path.join(f.dir, 'browser.json'), '{bad json');
  result = f.run();
  assert.equal(result.status, 'failed');
  assert.ok(result.reports[1].sha256);
});

test('failed, not-run and blocked reported statuses remain failures despite passing suites', (t) => {
  const f = fixture(t);
  for (const status of ['failed', 'not run', 'blocked', 'cancelled', undefined]) {
    const report = raw('browser');
    report.status = status;
    f.write('browser.json', report);
    const result = f.run();
    assert.equal(result.status, 'failed');
    assert.equal(result.reports[1].reportedStatus, status ?? null);
  }
});

test('rejects mismatched candidate/build/dependencies, dirty runs and missing metadata', (t) => {
  const f = fixture(t);
  for (const [field, value] of [
    ['commit', 'd'.repeat(40)],
    ['buildHash', 'e'.repeat(64)],
    ['lockHash', 'f'.repeat(64)],
    ['cleanTree', false],
    ['command', ''],
    ['finishedAt', 'invalid'],
    ['error', 'ignored exception'],
  ]) {
    const report = raw('static');
    report[field] = value;
    f.write('static.json', report);
    assert.equal(f.run().status, 'failed', field);
  }
});

test('does not trust passed labels over failed/skipped/zero/incomplete suite details', (t) => {
  const f = fixture(t);
  const mutations = [
    (r) => (r.suites = []),
    (r) => (r.suites[0].status = 'failed'),
    (r) => (r.suites[0].skipped = 1),
    (r) => (r.suites[0].exitCode = 1),
    (r) => (r.suites[0].executed = 0),
    (r) => (r.suites[1].errors = ['missing link']),
    (r) => (r.suites[1].references = 0),
    (r) => (r.suites[1].expectedRoutes = 9),
    (r) => (r.suites[1].executedPages = 1),
  ];
  for (const mutate of mutations) {
    const report = raw('static');
    mutate(report);
    f.write('static.json', report);
    assert.equal(f.run().status, 'failed');
  }
});

test('requires browser identity and nonempty exact route/viewport execution', (t) => {
  const f = fixture(t);
  for (const mutate of [
    (s) => (s.browser = 'webkit'),
    (s) => (s.executedChecks = 3),
    (s) => (s.expectedChecks = s.executedChecks = 2),
    (s) => (s.routes = []),
    (s) => (s.routes = ['/', '/']),
    (s) => (s.viewports = [390, 390]),
    (s) => (s.renderedReferences = 0),
  ]) {
    const report = raw('browser');
    mutate(report.suites[0]);
    f.write('browser.json', report);
    assert.equal(f.run().status, 'failed');
  }
});

test('empty requirements, duplicate inputs and unsupported hand-authored summaries fail', (t) => {
  const f = fixture(t);
  assert.equal(summarizeEvidence({ ...f.manifest, reports: [] }, f.dir).status, 'failed');
  assert.equal(
    summarizeEvidence({ ...f.manifest, reports: [...f.manifest.reports, f.manifest.reports[0]] }, f.dir).status,
    'failed'
  );
  assert.equal(
    summarizeEvidence({ ...f.manifest, builds: { ...f.manifest.builds, unused: buildHash } }, f.dir).status,
    'failed'
  );
  f.write('static-copy.json', raw('static'));
  assert.equal(
    summarizeEvidence(
      {
        ...f.manifest,
        reports: [...f.manifest.reports, { ...f.manifest.reports[0], id: 'duplicate-role', path: 'static-copy.json' }],
      },
      f.dir
    ).status,
    'failed'
  );
  f.write('browser.json', { status: 'passed', browser: 'chromium', records: [{}] });
  assert.equal(f.run().status, 'failed');
});

test('CLI writes reproducible provenance, fails nonzero, and cannot overwrite raw reports', (t) => {
  const f = fixture(t);
  f.write('required.json', f.manifest);
  const input = path.join(f.dir, 'required.json'),
    output = path.join(f.dir, 'summary.json');
  const invoke = (destination) =>
    spawnSync(process.execPath, ['scripts/v9-evidence.mjs', '--manifest', input, '--output', destination], {
      encoding: 'utf8',
    });
  assert.equal(invoke(output).status, 0);
  assert.equal(JSON.parse(fs.readFileSync(output)).requirements.sha256.length, 64);
  const rawPath = path.join(f.dir, 'static.json'),
    before = fs.readFileSync(rawPath, 'utf8');
  assert.equal(invoke(rawPath).status, 1);
  assert.equal(fs.readFileSync(rawPath, 'utf8'), before);
  const alias = path.join(f.dir, 'alias.json');
  fs.symlinkSync(rawPath, alias);
  assert.equal(invoke(alias).status, 1);
  assert.equal(fs.readFileSync(rawPath, 'utf8'), before);
  fs.unlinkSync(path.join(f.dir, 'browser.json'));
  assert.equal(invoke(output).status, 1);
  assert.equal(JSON.parse(fs.readFileSync(output)).status, 'failed');
});
