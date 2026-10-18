import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import { audit } from './v9-audit.mjs';
import { browserAudit } from './v9-browser.mjs';

const mode = process.argv[2];
if (!['static', 'browser'].includes(mode)) throw new Error('Usage: node scripts/v9-gate.mjs static|browser');
const root = path.resolve(process.env.V9_DIST || 'dist');
const output = path.resolve(process.env.V9_EVIDENCE || 'artifacts/v9-gates');
fs.mkdirSync(output, { recursive: true });
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const hash = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const manifest = {
  gate: mode,
  startedAt: new Date().toISOString(),
  commit: git('rev-parse', 'HEAD'),
  cleanTree: !git('status', '--porcelain'),
  lockHash: hash('package-lock.json'),
  node: process.version,
  platform: process.platform,
  command: process.argv.join(' '),
  buildPath: root,
  buildHash: null,
  status: 'not run',
  suites: [],
  limitations: [
    'Hosted delivery, redirect and scanner behavior require hosted validation.',
    'Browser smoke is not full interactive journey coverage.',
    'HTML reference audit does not parse CSS URLs or arbitrary script-created URLs.',
  ],
};
try {
  const files = fs
    .readdirSync(root, { recursive: true })
    .filter((file) => fs.statSync(path.join(root, file)).isFile())
    .sort();
  if (!files.length) throw new Error('Empty build');
  manifest.buildHash = crypto
    .createHash('sha256')
    .update(files.map((file) => `${file}:${hash(path.join(root, file))}`).join('\n'))
    .digest('hex');
  if (mode === 'static') {
    if (!fs.existsSync('tests/v9-gate.test.mjs')) throw new Error('Required checker suite is missing');
    const result = spawnSync(process.execPath, ['--test', 'tests/v9-gate.test.mjs'], { encoding: 'utf8' });
    fs.writeFileSync(path.join(output, 'checker-tests.log'), (result.stdout || '') + (result.stderr || ''));
    const tests = Number(result.stdout?.match(/# tests (\d+)/)?.[1] || 0);
    const skipped = Number(result.stdout?.match(/# skipped (\d+)/)?.[1] || 0);
    manifest.suites.push({
      name: 'checker-negative-tests',
      expectedMinimum: 5,
      executed: tests,
      skipped,
      exitCode: result.status,
      status: result.status === 0 && tests >= 5 && skipped === 0 ? 'passed' : 'failed',
    });
    const links = audit(root, 'docs/v9-route-map.csv');
    manifest.suites.push({
      name: 'route-map-and-built-references',
      ...links,
      status: links.errors.length ? 'failed' : 'passed',
    });
  } else {
    const result = await browserAudit(root, output);
    manifest.suites.push({
      name: 'browser-smoke-and-rendered-references',
      ...result,
      status:
        result.errors.length || !result.executedChecks || result.executedChecks !== result.expectedChecks
          ? 'failed'
          : 'passed',
    });
  }
  manifest.status = manifest.suites.length && manifest.suites.every((s) => s.status === 'passed') ? 'passed' : 'failed';
} catch (error) {
  manifest.status = 'failed';
  manifest.error = error.stack;
}
manifest.finishedAt = new Date().toISOString();
const destination = path.join(output, `${mode}-${process.env.V9_BROWSER || 'chromium'}.json`);
fs.writeFileSync(destination, JSON.stringify(manifest, null, 2) + '\n');
console.log(
  JSON.stringify(
    {
      status: manifest.status,
      evidence: destination,
      suites: manifest.suites.map(({ name, status, errors }) => ({ name, status, errors })),
      error: manifest.error,
    },
    null,
    2
  )
);
if (manifest.status !== 'passed') process.exitCode = 1;
