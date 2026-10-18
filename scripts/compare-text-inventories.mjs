import { readFile, writeFile } from 'node:fs/promises';

const before = JSON.parse(await readFile(process.env.TEXT_BEFORE || '/tmp/tribera-all-text/inventory.json', 'utf8'));
const after = JSON.parse(
  await readFile(process.env.TEXT_AFTER || '/tmp/tribera-all-text-after/inventory.json', 'utf8')
);
const differences = [];
let compared = 0;
const changes = [];
const key = (row) => [row.selector, row.parent, row.section, row.text].join('|');
for (const a of after) {
  const b = before.find((b) => b.route === a.route && b.width === a.width);
  if (!b) continue;
  for (const state of a.states) {
    const old = b.states.find((s) => s.name === state.name);
    if (!old) continue;
    const rows = new Map(old.rows.map((row) => [key(row), row]));
    for (const row of state.rows) {
      const previous = rows.get(key(row));
      if (!previous) continue;
      compared++;
      const entry = { route: a.route, width: a.width, state: state.name, selector: row.selector, text: row.text };
      for (const property of ['family', 'weight', 'style', 'color'])
        if (previous[property] !== row[property])
          differences.push({ ...entry, property, before: previous[property], after: row[property] });
      if (previous.size !== row.size) changes.push({ ...entry, before: previous.size, after: row.size });
    }
  }
}
const result = { compared, differences, changes };
await writeFile(process.env.TEXT_DIFF || '/tmp/tribera-text-inventory-diff.json', JSON.stringify(result, null, 2));
console.log(
  `${compared} matched visible text occurrences; ${changes.length} size changes; ${differences.length} family/weight/style/color differences.`
);
if (differences.length) console.log(differences.slice(0, 10));
