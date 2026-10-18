import assert from 'node:assert/strict';
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

const source = process.env.TEXT_INVENTORY || '/tmp/tribera-all-text-final/inventory.json';
const original = JSON.parse(await readFile(source, 'utf8'));
const dir = await mkdtemp(`${tmpdir()}/tribera-inventory-mutation-`);
try {
  for (const mutation of [
    'unchanged',
    'new-short-label',
    'wrong-size',
    'lost-emphasis',
    'changed-color',
    'changed-italic',
    'missing-route',
    'failed-capture',
    'empty-state',
  ]) {
    const records = structuredClone(original);
    const rows = records.find((r) => r.route === '/' && r.width === 390).states.find((s) => s.name === 'default').rows;
    if (mutation === 'new-short-label')
      rows.push({
        ...rows[0],
        selector: 'span.unreviewed-label',
        context: 'div.new-component',
        kind: 'unclassified',
        text: 'New',
        size: 14,
      });
    if (mutation === 'wrong-size') rows[0].size += 1;
    if (mutation === 'lost-emphasis') rows[0].weight = '900';
    if (mutation === 'changed-color') rows[0].color = 'rgb(1, 2, 3)';
    if (mutation === 'changed-italic') rows[0].style = rows[0].style === 'italic' ? 'normal' : 'italic';
    if (mutation === 'missing-route') records.pop();
    if (mutation === 'failed-capture') records[0].errors.push('Simulated navigation failure');
    if (mutation === 'empty-state') records[0].states = [];
    const file = `${dir}/${mutation}.json`;
    await writeFile(file, JSON.stringify(records));
    const run = spawnSync(process.execPath, ['scripts/text-inventory-contract.mjs'], {
      env: { ...process.env, TEXT_INVENTORY: file },
      encoding: 'utf8',
    });
    assert.equal(run.status === 0, mutation === 'unchanged', `${mutation}: ${run.stderr.slice(0, 200)}`);
    console.log(`${mutation}: ${mutation === 'unchanged' ? 'accepted' : 'correctly rejected'}`);
  }
} finally {
  await rm(dir, { recursive: true, force: true });
}
