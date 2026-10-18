import { mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const suiteGroup = process.env.LEGACY_SUITE_GROUP || 'all';
if (!['all', 'journeys', 'text'].includes(suiteGroup)) {
  throw new Error(`Unknown LEGACY_SUITE_GROUP: ${suiteGroup}`);
}
const port = process.env.TEST_PORT || '4333';
const base = `http://127.0.0.1:${port}`;
async function run(script, env = {}) {
  const child = spawn(process.execPath, [script], {
    stdio: 'inherit',
    env: { ...process.env, TEST_BASE_URL: base, ...env },
  });
  const code = await new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('exit', resolve);
  });
  if (code !== 0) throw new Error(`${script} exited with ${code}`);
}
const server = spawn(
  process.execPath,
  ['node_modules/astro/bin/astro.mjs', 'preview', '--host', '127.0.0.1', '--port', port],
  { stdio: 'inherit' }
);
try {
  let ready = false;
  for (let i = 0; i < 60; i++) {
    if (server.exitCode !== null) throw new Error('Preview server exited before becoming ready');
    try {
      ready = (await fetch(base, { signal: AbortSignal.timeout(1000) })).ok;
    } catch {
      /* Wait for preview. */
    }
    if (ready) break;
    await delay(500);
  }
  if (!ready) throw new Error('Preview server did not become ready');
  // Retired pre-v126 assertions and their replacements are recorded in
  // tests/reviewed-suite-migration.json; do not silently drop coverage.
  const journeySuites = [
    'hero-viewport',
    'home-v126',
    'home-enquiry',
    'candidate-start',
    'candidate-enhancement',
    'contact-journey',
    'newsletter-journey',
    'v9-nav-fallback',
    'reviewed-bugs',
    'client-publication',
    'reviewed-route-audit',
  ];
  const textSuites = ['content-typography', 'full-text-sizing', 'services-letter-typography'];
  const suites =
    suiteGroup === 'journeys' ? journeySuites : suiteGroup === 'text' ? textSuites : [...journeySuites, ...textSuites];
  console.log(
    `Legacy group ${suiteGroup}: ${suites.length} required browser suites${suiteGroup === 'journeys' ? '' : ' plus text census/contracts'}`
  );
  for (const test of suites) {
    await run(`tests/${test}.test.mjs`);
  }
  if (suiteGroup !== 'journeys') {
    const out = `artifacts/reviewed-site-${port}/text`;
    await mkdir(out, { recursive: true });
    await run('scripts/audit-all-text.mjs', {
      AUDIT_OUT: out,
      AUDIT_WIDTHS: '320,390,768,1520',
      AUDIT_SCREENSHOTS: '0',
      AUDIT_STATES: '0',
      AUDIT_ROUTES: '',
    });
    await run('tests/discovered-text-coverage.test.mjs', { TEXT_INVENTORY: `${out}/inventory.json` });
    await run('scripts/text-inventory-contract.mjs', { TEXT_INVENTORY: `${out}/inventory.json` });
    await run('tests/text-inventory-contract.test.mjs', { TEXT_INVENTORY: `${out}/inventory.json` });
    const states = `${out}-states`;
    await run('scripts/audit-all-text.mjs', {
      AUDIT_OUT: states,
      AUDIT_WIDTHS: '390,1520',
      AUDIT_SCREENSHOTS: '0',
      AUDIT_STATES: '1',
      AUDIT_ROUTES: '',
    });
    await run('tests/discovered-text-coverage.test.mjs', {
      TEXT_INVENTORY: `${states}/inventory.json`,
      TEXT_PARTIAL: '1',
    });
  }
} finally {
  server.kill('SIGTERM');
}
