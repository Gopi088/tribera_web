import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

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
  for (const test of [
    'hero-viewport',
    'home-handoff',
    'home-audit',
    'home-enquiry',
    'proof-responsive',
    'home-operations',
    'home-savings',
    'v61-approvals',
    'v60-copy',
    'experts-layout',
    'funnel-stages',
    'reviewed-bugs',
    'client-publication',
    'reviewed-route-audit',
    'content-typography',
    'full-text-sizing',
    'services-letter-typography',
  ]) {
    await run(`tests/${test}.test.mjs`);
  }
  const out = `/tmp/tribera-release-text-${port}`;
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
} finally {
  server.kill('SIGTERM');
}
