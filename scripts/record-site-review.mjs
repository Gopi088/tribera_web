import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';

const root = 'docs/reviews/site-style/claude';
const groups = {
  initial: ['claude-site-wide', 'claude-site-wide-middle', 'claude-site-wide-late'],
  followup: ['claude-final-first', 'claude-final-last'],
};
const reviews = { initial: new Map(), followup: new Map() };
for (const [phase, dirs] of Object.entries(groups)) {
  await mkdir(`${root}/${phase}`, { recursive: true });
  for (const dir of dirs) {
    const records = JSON.parse(await readFile(`/tmp/tribera-site-style/${dir}/manifest.json`, 'utf8'));
    for (const record of records) {
      if (!record.completed) continue;
      const target = `${root}/${phase}/${record.name}.txt`;
      await copyFile(record.report, target);
      for (const route of record.routes) reviews[phase].set(route, target);
    }
  }
}
const manifest = JSON.parse(await readFile('/tmp/tribera-site-style/site-wide/manifest.json', 'utf8'));
const routes = [
  ...new Set(
    JSON.parse(await readFile('/tmp/tribera-site-style/baseline/manifest.json', 'utf8')).map((record) => record.route)
  ),
];
const rows = routes.map((route) => {
  const records = manifest.filter((record) => record.route === route);
  const checked =
    records.length === 2 &&
    records.every((record) => !record.error && !record.overflow && !record.errors.length && record.mains === 1);
  const report = reviews.followup.get(route) || reviews.initial.get(route);
  const review = report
    ? `[${reviews.followup.has(route) ? 'Follow-up received' : 'Initial received'}](${report.replace(/^docs\//, '')})`
    : 'Pending';
  return `| \`${route}\` | ${checked ? 'Implemented; desktop/mobile checks pass' : 'Check evidence'} | ${review} | ${review} |`;
});
await writeFile(
  'docs/site-style-route-audit.md',
  `# Site Style Route Audit

Updated 2026-09-08. ${routes.length} public routes retained; Decap CMS excluded.
${reviews.initial.size} initial route reviews and ${reviews.followup.size} follow-up route reviews received from Claude.
"Received" means an actual visual and copy report, not automatic approval of every
claim. See [correction disposition](reviews/site-style/correction-disposition.md)
and the final summary for engineering results, remaining owner evidence and review limits.

Screenshots/copy: \`/tmp/tribera-site-style/site-wide/\`; readable final interaction
crops: \`/tmp/tribera-site-style/final-states/\`. Reports are retained in this repo.
The built error document is \`/404.html\`, correcting the initial ledger's \`/404\` label.

| Route | Implementation / verification | Claude visual | Claude copy |
| --- | --- | --- | --- |
${rows.join('\n')}
`
);
console.log(
  JSON.stringify(
    {
      routes: routes.length,
      initial: reviews.initial.size,
      followup: reviews.followup.size,
      captures: manifest.length,
      problems: manifest
        .filter((record) => record.error || record.overflow || record.errors.length || record.mains !== 1)
        .map((record) => ({ route: record.route, width: record.width, error: record.error, errors: record.errors })),
    },
    null,
    2
  )
);
