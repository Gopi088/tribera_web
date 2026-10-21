import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4394';
const output = process.env.REVIEW_OUT || 'artifacts/v9-release-2026-10-22/initial';
fs.mkdirSync(output, { recursive: true });
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const files = fs
  .readdirSync('dist', { recursive: true })
  .filter((file) => fs.statSync(path.join('dist', file)).isFile())
  .sort();
const buildHash = hash(files.map((file) => `${file}:${hash(fs.readFileSync(path.join('dist', file)))}`).join('\n'));
const allRoutes = files
  .filter((file) => file.endsWith('.html'))
  .filter((file) => {
    const html = fs.readFileSync(path.join('dist', file), 'utf8');
    return !file.startsWith('__v9/') && file !== 'decapcms/index.html' && !/http-equiv="refresh"/i.test(html);
  })
  .map((file) => '/' + file.replace(/(?:\/)?index\.html$/, '').replace(/\.html$/, ''));
const requested = new Set((process.env.REVIEW_ROUTES || '').split(',').filter(Boolean));
const routes = allRoutes.filter((route) => !requested.size || requested.has(route));
const representatives = new Set([
  '/',
  '/candidates',
  '/services',
  '/about',
  '/contact',
  '/sample-write-up',
  '/intelligence',
  '/industries',
  '/industries/ai-data',
  '/industries/banking-financial-services',
  '/careers',
  '/careers/backend-engineer',
  '/careers/ai-ml-engineer',
  '/functions',
  '/functions/engineering-platform',
  '/functions/finance-risk',
  '/blog',
  '/blog/rethinking-hiring-metrics-signal-efficiency',
  '/blog/designing-for-trust-privacy-transparency-respect',
  '/blog/seventeen-interviews-one-hire',
  '/candidates/start',
  '/404',
  '/privacy',
  '/dpa',
  routes.find((route) => route.startsWith('/category/')),
  routes.find((route) => route.startsWith('/tag/')),
]);
const report = { status: 'running', base, buildHash, routes: routes.length, captures: [], errors: [] };
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  page.on('pageerror', (error) => report.errors.push(error.message));
  await page.route(
    (url) => url.origin !== new URL(base).origin,
    (route) => route.abort()
  );
  for (const route of routes)
    for (const width of [390, 1366]) {
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(base + route, { waitUntil: 'domcontentloaded' });
      assert.ok([200, 404].includes(response.status()), route);
      await page.evaluate(async () => {
        await document.fonts.ready;
        for (const image of document.images) {
          image.loading = 'eager';
        }
        await Promise.all([...document.images].map((image) => image.decode().catch(() => {})));
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
      const slug = route.replaceAll('/', '_') || '_';
      const prefix = `${slug}-${width}`;
      const metrics = await page.evaluate(() => ({
        title: document.title,
        heading: document.querySelector('h1')?.textContent.trim(),
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        font: getComputedStyle(document.querySelector('h1')).fontFamily,
        mainText: document.querySelector('main').innerText,
        brokenImages: [...document.images]
          .filter((image) => !image.naturalWidth)
          .map((image) => image.currentSrc || image.src),
      }));
      assert.equal(metrics.overflow, false, route + ' overflow at ' + width);
      await page.screenshot({ path: `${output}/${prefix}-full.png`, fullPage: true });
      const crops = [];
      if (representatives.has(route)) {
        await page.screenshot({ path: `${output}/${prefix}-top.png` });
        crops.push(`${prefix}-top.png`);
        for (const [index, element] of (
          await page.locator('main header, main section, main article, main .fig, main .pull').all()
        ).entries()) {
          const box = await element.boundingBox();
          const nested = await element.evaluate(
            (node) => !node.matches('.fig, .pull') && Boolean(node.parentElement.closest('header, section, article'))
          );
          if (!box || box.height < 120 || nested) continue;
          await element.evaluate((node) =>
            window.scrollTo({ top: node.getBoundingClientRect().top + window.scrollY - 90, behavior: 'instant' })
          );
          await page.screenshot({ path: `${output}/${prefix}-section-${index}.png` });
          crops.push(`${prefix}-section-${index}.png`);
        }
        await page.locator('footer').scrollIntoViewIfNeeded();
        await page.screenshot({ path: `${output}/${prefix}-footer.png` });
        crops.push(`${prefix}-footer.png`);
      }
      report.captures.push({ route, width, status: response.status(), full: `${prefix}-full.png`, crops, ...metrics });
      fs.writeFileSync(`${output}/manifest.json`, JSON.stringify(report, null, 2) + '\n');
      console.log(`${route} ${width}px`);
    }
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto(base + '/careers/backend-engineer', { waitUntil: 'domcontentloaded' });
  await page.locator('[data-open-careers-apply]').click();
  await page.screenshot({ path: `${output}/careers-dialog-390.png` });
  report.status = report.errors.length ? 'failed' : 'passed';
  assert.deepEqual(report.errors, []);
} finally {
  fs.writeFileSync(`${output}/manifest.json`, JSON.stringify(report, null, 2) + '\n');
  await browser.close();
}
console.log(`${report.captures.length} captures; build ${buildHash}`);
