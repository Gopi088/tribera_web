import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium, firefox, webkit } from 'playwright';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321',
  engine = process.env.BROWSER || 'chromium';
const out = `artifacts/shared-chrome/${engine}`;
fs.mkdirSync(out, { recursive: true });
const htmls = fs.readdirSync('dist', { recursive: true }).filter((f) => f.endsWith('.html') && !f.startsWith('__v9/'));
let checked = 0;
for (const file of htmls) {
  const html = fs.readFileSync(`dist/${file}`, 'utf8');
  // Redirect documents and the CMS administration app do not use the marketing shell.
  if (/http-equiv="refresh"/i.test(html) || file === 'decapcms/index.html') continue;
  assert.equal((html.match(/<header\b[^>]*class="[^"]*\bv9-nav\b/g) || []).length, 1, file + ' shared header');
  assert.equal((html.match(/<footer\b[^>]*class="[^"]*\bv9-ft\b/g) || []).length, 1, file + ' shared footer');
  assert.equal(
    (html.match(/<(?:nav|footer)\b[^>]*class="(?:nav|ft)(?:"|\s)/g) || []).length,
    0,
    file + ' legacy shell'
  );
  checked++;
}
const routes = [
  '/',
  '/privacy',
  '/security',
  '/terms',
  '/dpa',
  '/blog',
  '/blog/rethinking-hiring-metrics-signal-efficiency',
  '/careers',
  '/careers/frontend-engineer',
  '/functions',
  '/functions/engineering-platform',
  '/candidates/start',
  '/404',
];
// Select an actual career detail from the built inventory instead of assuming a slug.
routes[8] = '/' + htmls.find((f) => /^careers\/[^/]+\/index\.html$/.test(f)).replace(/\/index\.html$/, '');
const browser = await { chromium, firefox, webkit }[engine].launch(),
  p = await browser.newPage({ reducedMotion: 'reduce' }),
  records = [],
  errors = [];
p.on('pageerror', (e) => errors.push(e.message));
try {
  for (const width of engine === 'chromium' ? [390, 1366, 1920] : [390, 1366]) {
    let baseline;
    for (const route of routes) {
      await p.setViewportSize({ width, height: 900 });
      await p.goto(base + route, { waitUntil: 'domcontentloaded' });
      await p.evaluate(() => document.fonts.ready);
      const styles = await p.evaluate(() => {
        const nav = document.querySelector('header.v9-nav'),
          link = nav.querySelector('.v9-desktop-nav a'),
          foot = document.querySelector('.v9-ft'),
          ft = foot.querySelector('.v9-ft-col a');
        const n = getComputedStyle(nav),
          l = getComputedStyle(link),
          f = getComputedStyle(foot),
          t = getComputedStyle(ft);
        return {
          height: nav.getBoundingClientRect().height,
          font: l.fontFamily,
          fontSize: l.fontSize,
          background: n.backgroundColor,
          footerBackground: f.backgroundColor,
          footerFont: t.fontFamily,
          footerSize: t.fontSize,
        };
      });
      if (!baseline) baseline = styles;
      else assert.deepEqual(styles, baseline, `${route} shared styles at ${width}`);
      assert.ok(
        await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        `${route} overflow at ${width}`
      );
      assert.equal(await p.locator('footer a[href="/dpa"]').count(), 1, route);
      if (width === 390) {
        await p.locator('[data-v9-menu] summary').click();
        assert.equal(await p.locator('[data-v9-menu]').getAttribute('open'), '');
        await p.keyboard.press('Escape');
        assert.equal(await p.locator('[data-v9-menu]').getAttribute('open'), null);
      }
      if (['/privacy', '/security', '/terms', '/dpa'].includes(route)) {
        assert.equal(await p.locator('time[datetime="2026-10-21"]').count(), 1);
        assert.equal(await p.locator('meta[name=robots]').getAttribute('content'), 'noindex, follow');
      }
      await p.evaluate(() => document.activeElement?.blur());
      await p.locator('header.v9-nav').screenshot({ path: `${out}/${route.replaceAll('/', '_')}-${width}-header.png` });
      await p.locator('footer.v9-ft').screenshot({ path: `${out}/${route.replaceAll('/', '_')}-${width}-footer.png` });
      if (['/privacy', '/dpa'].includes(route)) {
        await p.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await p.screenshot({ path: `${out}/${route.slice(1)}-${width}.png`, fullPage: true });
      }
      records.push({ route, width, styles, status: 'passed' });
    }
  }
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    `${out}/result.json`,
    JSON.stringify({ status: 'passed', staticPages: checked, records, errors }, null, 2)
  );
  console.log(`${engine}: ${checked} pages share one header/footer; ${records.length} viewport checks passed`);
} finally {
  await browser.close();
}
