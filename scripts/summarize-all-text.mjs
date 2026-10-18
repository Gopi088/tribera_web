import { readFile, writeFile } from 'node:fs/promises';

const out = process.env.AUDIT_OUT || '/tmp/tribera-all-text';
const records = JSON.parse(await readFile(`${out}/inventory.json`, 'utf8'));
const groups = new Map();
for (const record of records)
  for (const state of record.states)
    for (const row of state.rows) {
      const key = [row.selector, row.context || row.parent, row.section, row.family, row.kind].join('|');
      if (!groups.has(key))
        groups.set(key, {
          ...row,
          routes: new Set(),
          sections: new Set(),
          sizes: new Set(),
          samples: new Set(),
          states: new Set(),
        });
      const group = groups.get(key);
      group.routes.add(record.route);
      group.sections.add(row.section);
      group.sizes.add(`${record.width}:${row.size}`);
      if (group.samples.size < 3) group.samples.add(row.text.slice(0, 150));
      group.states.add(state.name);
    }
const result = [...groups.values()].map((g, i) => ({
  ...g,
  id: i + 1,
  routes: [...g.routes],
  sections: [...g.sections],
  sizes: [...g.sizes],
  samples: [...g.samples],
  states: [...g.states],
}));
for (const group of result) {
  const context = `${group.selector} ${group.block} ${group.parent}`;
  group.role = ['navigation', 'footer', 'chart-label', 'form', 'quote'].includes(group.kind)
    ? group.kind
    : /^h[1-6]([.#]|$)/.test(group.block)
      ? 'heading/inline emphasis'
      : /^(input|textarea|select|label)([.#]|$)/.test(group.block)
        ? 'form caption/control'
        : /__t\b|__n\b|post__t|lead__n|rc__t/.test(group.selector) && group.family.includes('Fraunces')
          ? 'card/group title'
          : /hero__p|v58-lead|c-lead|\bdek\b|__dek|ahead__sub|jd__lead|thesis__body/.test(context)
            ? 'subtitle/lead'
            : /sig\b|bbb2|logo/.test(context)
              ? 'brand/signature'
              : group.family.includes('Fraunces')
                ? 'editorial statement/attribution'
                : group.family.includes('Mono')
                  ? group.size >= 24
                    ? 'display metric'
                    : 'metadata/data label'
                  : group.kind === 'action'
                    ? 'action/linked content'
                    : /^(p|li|dd|figcaption)([.#]|$)/.test(group.block)
                      ? group.size <= 14
                        ? 'helper/compact prose'
                        : 'body copy'
                      : /^[\d\s.,%+/:-]+$/.test(group.samples[0])
                        ? 'metric'
                        : 'component label/data/inline text';
}
await writeFile(`${out}/groups.json`, JSON.stringify(result, null, 2));
await writeFile(
  `${out}/groups.tsv`,
  [
    'ID\tKind\tElement\tParent\tSizes\tFamily\tExample\tRoute',
    ...result.map((g) =>
      [g.id, g.kind, g.selector, g.parent, g.sizes.join(','), g.family, g.samples[0], g.routes[0]].join('\t')
    ),
  ].join('\n')
);
console.log(
  `${records.length} route/width records; ${records.reduce((n, r) => n + r.states.length, 0)} states; ${result.length} text groups.`
);
console.log(
  'Errors',
  records.filter((r) => r.errors.length).map((r) => [r.route, r.errors])
);
console.log(
  'Control failures',
  records.flatMap((r) =>
    (r.controls || []).filter((c) => c.status.startsWith('failed')).map((c) => [r.route, r.width, c])
  )
);
