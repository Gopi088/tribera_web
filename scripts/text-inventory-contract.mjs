import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';

// Record only after human/visual review. Normal runs fail on new contexts as well
// as changed sizes, so omitted short labels cannot silently bypass prose checks.
const file = process.env.TEXT_INVENTORY || '/tmp/tribera-all-text-final/inventory.json';
const records = JSON.parse(await readFile(file, 'utf8'));
async function builtRoutes(dir = 'dist') {
  const routes = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) routes.push(...(await builtRoutes(path)));
    else if (path.endsWith('.html') && !path.includes('/decapcms/'))
      routes.push(path.replace(/^dist/, '').replace(/index\.html$/, ''));
  }
  return routes;
}
const routes = await builtRoutes();
assert(routes.length > 0, 'Build the site before checking its text inventory');
const coverage = new Set(records.map((record) => `${record.route}|${record.width}`));
assert.equal(coverage.size, records.length, 'Duplicate route/width records');
for (const route of routes)
  for (const width of [320, 390, 768, 1520])
    assert(coverage.has(`${route}|${width}`), `Missing inventory: ${route} ${width}`);
for (const record of records) {
  assert.deepEqual(record.errors, [], `Failed capture: ${record.route} ${record.width}`);
  const defaults = record.states.filter((state) => state.name === 'default');
  assert.equal(defaults.length, 1, `Missing or duplicate default state: ${record.route}`);
  assert(defaults[0].rows.length > 0, `Empty text capture: ${record.route}`);
  assert(!defaults[0].overflow, `Page overflow: ${record.route} ${record.width}`);
}
const groups = new Map();
for (const record of records)
  for (const state of record.states.filter((s) => s.name === 'default'))
    for (const row of state.rows) {
      const key = [record.route, record.width, row.section, row.selector, row.context, row.kind].join('|');
      if (!groups.has(key)) groups.set(key, new Set());
      groups.get(key).add(JSON.stringify([row.size, row.family, row.weight, row.style, row.color]));
    }
const actual = Object.fromEntries(
  [...groups].sort(([a], [b]) => a.localeCompare(b)).map(([key, styles]) => [key, [...styles].sort()])
);
const fixture = 'tests/fixtures/text-inventory-contract.json';
if (process.argv.includes('--record')) {
  await mkdir('tests/fixtures', { recursive: true });
  await writeFile(fixture, JSON.stringify(actual, null, 2) + '\n');
  console.log(`Recorded ${groups.size} reviewed text-context/width combinations.`);
} else {
  const expected = JSON.parse(await readFile(fixture, 'utf8'));
  const changes = [];
  for (const key of new Set([...Object.keys(actual), ...Object.keys(expected)]))
    if (JSON.stringify(actual[key]) !== JSON.stringify(expected[key])) changes.push(key);
  assert.deepEqual(
    changes,
    [],
    'Text inventory changed: review new/missing contexts and style changes before updating the contract'
  );
  console.log(`${groups.size} independent text-context/width contracts passed.`);
}
