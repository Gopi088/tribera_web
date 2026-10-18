import { readFile, mkdir, writeFile } from 'node:fs/promises';

const input = process.env.AUDIT_OUT || '/tmp/tribera-heading-review';
const output = process.env.REVIEW_OUT || 'docs/reviews/typography-2026-09-14';
const records = JSON.parse(await readFile(`${input}/manifest.json`, 'utf8'));
const routes = [...new Set(records.map((r) => r.route))];
const clean = (text) => String(text).replaceAll('|', '\\|').replace(/\s+/g, ' ').trim();
const number = (value) => Number(value.toFixed(2));
const key = (e) => [e.tag, e.selector, e.section, e.text].join('|');
const family = (route) => {
  if (/^\/(privacy|security|terms)\/$/.test(route))
    return 'Legal document: retain smaller document subheads; do not apply marketing H2 globally.';
  if (/^\/(tag|category)\//.test(route))
    return 'Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.';
  if (/^\/blog\/.+/.test(route))
    return 'Article: restore article-body subhead tier and looser leading; distinguish body, related module, and closing CTA.';
  if (/^\/careers\/.+/.test(route))
    return 'Career detail: mobile H1 and H2 both 32px; restore role hierarchy through the shared template, retain scorecard labels.';
  if (/^\/(functions|industries)\/.+/.test(route))
    return 'Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review.';
  return (
    {
      '/': 'Home: mixed 36/48px peer sections, 12.96px mobile hero/funnel leads; preserve widened experts heading, hero height and small closing statement.',
      '/candidates/':
        'Candidate: mobile hero 27.3px below most section H2s at 30px; conversation 26.25px; hero lead 12.96px; preserve card/section separation.',
      '/about/':
        'About: 62px hero differs from 53.12px base; trust subtitle 20px differs from other 16.72px decks. Section H2s are internally consistent.',
      '/services/':
        'Services: deliverables heading and subtitle have different left edges and conflicting centering/nowrap rules. Card .lead paragraphs are not section subtitles.',
      '/intelligence/':
        'Intelligence: 62px four-line desktop hero; root-size drift accounts for 30px mobile H2. Review hierarchy/measure, not an invented local H2 override.',
      '/contact/':
        'Contact: 62px hero and 20px FAQ subtitle are distinct local variants. Preserve form labels and named-person card typography.',
      '/careers/':
        'Careers index: 48px marketing section H2 vs 53.12px hero; mobile32 vs33.28. Retain 19px role-card titles as a different role.',
      '/blog/':
        'Blog index: section H2 vs hero hierarchy needs the marketing-scale decision; featured/article card titles are distinct roles.',
      '/functions/': 'Function index: same near-equal hero/section hierarchy; preserve taxonomy/card labels.',
      '/industries/': 'Industry index: same near-equal hero/section hierarchy; preserve taxonomy/card labels.',
      '/candidates/start/':
        'Candidate form: section30 vs hero31.2 mobile; retain form heading/field label hierarchy and do not restyle form copy as subtitle.',
      '/404.html':
        'Error page: intentional single hero/title; no peer section headings to normalize. HTTP404 expected.',
    }[route] || 'Review role-specific hierarchy; see measured rows.'
  );
};
const lines = [
  '# Heading and Subtitle Inventory',
  '',
  'Generated from the current local implementation, not the older production build. The build supplies only the route list.',
  'Every route was measured at 390, 768 and 1520px. Values are CSS pixels; line counts are approximate line-box estimates.',
  'This is the per-element evidence appendix, not an assertion that every paragraph candidate is a subtitle or every difference is a defect.',
  'Visible semantic heading candidates exclude navigation/footer/dialogs. Subtitle candidates include adjacent body paragraphs, metadata and card copy; classify by role before editing.',
  'Default page state only; clipped/collapsible descendants can still have DOM boxes. No form submissions or third-party requests were made.',
  `Screenshots and detail crops: ${input}. Independent review scope and corrections are documented in ../../heading-subtitle-review-2026-09-14.md.`,
  '',
  '| # | Route | Desktop H1 / H2 sizes | Mobile H1 / H2 sizes | Review disposition |',
  '|---|---|---|---|---|',
];
const scale = (r) =>
  r?.headings
    ? `H1 ${
        r.headings
          .filter((h) => h.tag === 'H1')
          .map((h) => number(h.size))
          .join(',') || '-'
      }; H2 ${[...new Set(r.headings.filter((h) => h.tag === 'H2').map((h) => number(h.size)))].join(',') || '-'}`
    : 'missing';
routes.forEach((route, i) =>
  lines.push(
    `| ${i + 1} | ${route} | ${scale(records.find((r) => r.route === route && r.width === 1520))} | ${scale(records.find((r) => r.route === route && r.width === 390))} | ${family(route)} |`
  )
);
for (const [index, route] of routes.entries()) {
  const samples = [390, 768, 1520].map((width) => records.find((r) => r.route === route && r.width === width));
  lines.push(
    '',
    `## ${index + 1}. ${route}`,
    '',
    family(route),
    '',
    `Root sizes (mobile/tablet/desktop): ${samples.map((r) => r?.rootSize || 'missing').join(' / ')}.`,
    ''
  );
  for (const group of ['headings', 'subtitles']) {
    lines.push(
      `### ${group === 'headings' ? 'Heading Elements' : 'Subtitle Candidates'}`,
      '',
      '| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |',
      '|---|---|---|---|---|'
    );
    const elements = new Map(samples.flatMap((r) => (r?.[group] || []).map((e) => [key(e), e])));
    for (const [id, element] of elements) {
      const instances = samples.map((r) => r?.[group]?.find((e) => key(e) === id));
      const metrics = instances.map((e) =>
        e ? `${number(e.size)} / ${e.lineHeight} / ${e.estimatedLines}` : 'not present'
      );
      const desktop = instances[2] || element;
      lines.push(
        `| ${clean(element.tag + ' ' + element.text)} (${clean(element.section + ' ' + element.selector)}) | ${metrics.join(' | ')} | ${clean(desktop.font)} / ${desktop.weight} / ${desktop.align} |`
      );
    }
    lines.push('');
  }
}
await mkdir(output, { recursive: true });
await writeFile(`${output}/inventory.md`, lines.join('\n') + '\n');
console.log(`Recorded ${routes.length} routes and ${records.length} viewport audits in ${output}`);
