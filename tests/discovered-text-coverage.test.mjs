import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

// This gate consumes a DOM census, never the selectors in the implementation CSS.
const file = process.env.TEXT_INVENTORY || '/tmp/tribera-all-text-after/inventory.json';
const records = JSON.parse(await readFile(file, 'utf8'));
if (process.env.TEXT_PARTIAL !== '1') {
  async function routes(dir = 'dist') {
    const paths = [];
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) paths.push(...(await routes(path)));
      else if (path.endsWith('.html') && !path.includes('/decapcms/'))
        paths.push(path.replace(/^dist/, '').replace(/index\.html$/, ''));
    }
    return paths;
  }
  const actual = new Set(records.map((r) => `${r.route}|${r.width}`));
  for (const route of await routes())
    for (const width of [320, 390, 768, 1520])
      assert(actual.has(`${route}|${width}`), `Missing inventory: ${route} ${width}`);
}
const failures = [];
let prose = 0;
for (const record of records) {
  failures.push(...record.errors.map((error) => `${record.route}: ${error}`));
  for (const state of record.states) {
    if (state.overflow) failures.push(`${record.route} ${record.width} ${state.name}: page overflow`);
    for (const row of state.rows) {
      if (['navigation', 'footer', 'chart-label'].includes(row.kind)) continue;
      if (!row.family.includes('Inter Tight') || row.text.length < 50) continue;
      if (!/^(p|li|dd|figcaption)([.#]|$)/.test(row.selector)) continue;
      prose++;
      if (![14, 16, 18].some((size) => Math.abs(size - row.size) < 0.1)) {
        failures.push(
          `${record.route} ${record.width} ${state.name}: ${row.selector} ${row.size}px: ${row.text.slice(0, 90)}`
        );
      }
    }
  }
}
assert(prose > 100, 'The independent inventory must contain real explanatory copy');
assert.deepEqual(failures, []);
console.log(
  `${prose} independently discovered explanatory text occurrences passed; ${records.length} route/width records.`
);
