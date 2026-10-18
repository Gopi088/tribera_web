import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const out = path.resolve(process.env.DESIGN_REVIEW_OUT || 'artifacts/site-design-fixes-2026-09-19/final-all-routes');
const { results } = JSON.parse(fs.readFileSync(`${out}/inventory.json`, 'utf8'));
const routes = [...new Set(results.map((r) => r.route))];
const escape = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const sheets = [];
for (const width of [390, 1520]) {
  const tileWidth = width === 390 ? 390 : 760;
  const tileHeight = width === 390 ? 1034 : 534;
  for (let i = 0; i < routes.length; i += 4) {
    const group = routes.slice(i, i + 4);
    const layers = [];
    for (const [j, route] of group.entries()) {
      const item = results.find((r) => r.route === route && r.width === width);
      const name = route === '/' ? 'home' : route.replace(/^\//, '').replaceAll('/', '__').replaceAll('.', '_');
      const png = await sharp(path.join(out, `${name}-${width}.png`))
        .resize({ width: tileWidth })
        .toBuffer();
      const left = (j % 2) * tileWidth,
        top = Math.floor(j / 2) * tileHeight;
      const label = Buffer.from(
        `<svg width="${tileWidth}" height="34"><rect width="100%" height="100%" fill="#eee"/><text x="8" y="23" font-family="sans-serif" font-size="14">${escape(item.route)}</text></svg>`
      );
      layers.push({ input: label, left, top }, { input: png, left, top: top + 34 });
    }
    const file = `contact-${width}-${String(i / 4 + 1).padStart(2, '0')}.jpg`;
    await sharp({ create: { width: tileWidth * 2, height: tileHeight * 2, channels: 3, background: '#fff' } })
      .composite(layers)
      .jpeg({ quality: 90 })
      .toFile(`${out}/${file}`);
    sheets.push({ width, routes: group, path: `${out}/${file}` });
  }
}
fs.writeFileSync(`${out}/contact-sheets.json`, JSON.stringify(sheets, null, 2));
const failures = results.filter(
  (r) => r.failure || r.errors?.length || r.brokenImages?.length || r.horizontalOverflow > 1
);
const missingFooter = results.filter((r) => !r.footer || !r.footer.topTargetExists);
const summary = [
  '# Final rendered design evidence',
  '',
  `${routes.length} public routes; ${results.length} rendered checks at 390, 1520 and 1920px. ${sheets.length} mobile/desktop contact sheets.`,
  '',
  `Render/error/image/page overflow failures: ${failures.length}. Missing canonical footer/back-to-top targets: ${missingFooter.length}.`,
  '',
  '| Route | Family | H1 at 390 / 1520 / 1920 | Footer background |',
  '| --- | --- | --- | --- |',
];
for (const route of routes) {
  const rows = [390, 1520, 1920].map((w) => results.find((r) => r.route === route && r.width === w));
  summary.push(
    `| ${route} | ${rows[0].family} | ${rows.map((r) => r.headings?.find((h) => h.tag === 'H1')?.size || 'missing').join(' / ')} | ${rows[0].footer?.bg || 'see census'} |`
  );
}
summary.push(
  '',
  '## Footer parity',
  '',
  `Wordmarks: ${JSON.stringify([...new Set(results.map((r) => r.footer?.wordmark))])}`,
  '',
  `Cities: ${JSON.stringify([...new Set(results.map((r) => r.footer?.cities))])}`,
  '',
  `Label styles: ${JSON.stringify([...new Set(results.flatMap((r) => (r.footer?.labels || []).map((s) => `${s.font} ${s.size} ${s.color}`)))])}`,
  '',
  '## Failures',
  '',
  JSON.stringify({ failures, missingFooter }, null, 2)
);
fs.writeFileSync(`${out}/review-census.md`, summary.join('\n'));
fs.copyFileSync('artifacts/site-design-review-2026-09-19/index.html', `${out}/index.html`);
console.log(
  `${routes.length} routes packaged in ${sheets.length} contact sheets; ${failures.length} failures; ${missingFooter.length} missing footer targets`
);
