import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium, firefox, webkit } from 'playwright';
const engine = process.env.BROWSER || 'chromium';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4392';
const sectors = JSON.parse(fs.readFileSync('src/data/v9/sectors.json', 'utf8')).sectors;
const routes = [
  '/',
  '/candidates',
  '/services',
  '/interview-as-a-service',
  '/case-study',
  '/about',
  '/contact',
  '/sample-write-up',
  '/industries',
  '/intelligence',
  '/blog/seventeen-interviews-one-hire',
  ...sectors.map((s) => `/industries/${s.slug}`),
];
const out = `artifacts/v9-default/${engine}`;
fs.mkdirSync(out, { recursive: true });
const browser = await { chromium, firefox, webkit }[engine].launch();
const errors = [],
  records = [];
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  page.on('pageerror', (e) => errors.push(e.message));
  for (const route of routes)
    for (const width of [390, 1366]) {
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(base + route, { waitUntil: 'domcontentloaded' });
      assert.ok([200, 304].includes(response.status()), route);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('html').getAttribute('class'), 'v9-document', route);
      assert.equal(await page.locator('h1').count(), 1, route);
      assert.equal(await page.locator('meta[name=robots]').getAttribute('content'), 'index, follow', route);
      assert.equal(
        (await page.locator('link[rel=canonical]').getAttribute('href')).replace(/\/$/, ''),
        `https://www.tribera.ai${route}`.replace(/\/$/, ''),
        route
      );
      assert.equal(await page.locator('a[href*="/__v9/"]').count(), 0, route);
      assert.ok(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        `${route} overflow at ${width}`
      );
      assert.equal(await page.locator('header .v9-brand').getAttribute('href'), '/', route);
      await page.screenshot({ path: `${out}/${route.replaceAll('/', '_') || 'home'}-${width}.png`, fullPage: true });
      records.push({ route, width, status: 'passed' });
    }
  await page.goto(base + '/industries/global-capability-centres', { waitUntil: 'domcontentloaded' });
  await page.waitForURL('**/industries/global-capability-centers', { waitUntil: 'domcontentloaded' });
  await page.goto(base + '/intelligence', { waitUntil: 'domcontentloaded' });
  await page.setViewportSize({ width: 768, height: 900 });
  await page.locator('.in-fn').first().focus();
  for (let i = 0; i < 8; i++) {
    if (i) await page.keyboard.press('ArrowRight');
    await page.waitForFunction(() => {
      const tab = document.querySelector('.in-fn[aria-selected=true]'),
        r = tab.getBoundingClientRect(),
        p = tab.parentElement.getBoundingClientRect();
      return r.left >= p.left - 1 && r.right <= p.right + 1;
    });
    assert.equal(await page.locator('#inFnName').textContent(), await page.locator('.in-fn').nth(i).textContent());
  }
  await page.goto(base + '/industries/ai-data', { waitUntil: 'domcontentloaded' });
  await page.locator('main a[href="/contact?sector=ai-data"]').first().click();
  await page.waitForURL('**/contact?sector=ai-data', { waitUntil: 'domcontentloaded' });
  assert.equal(await page.locator('h1').count(), 1);
  const fallback = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  for (const route of [
    '/',
    '/industries',
    '/industries/ai-data',
    '/intelligence',
    '/contact',
    '/sample-write-up',
    '/candidates',
  ]) {
    await fallback.goto(base + route, { waitUntil: 'domcontentloaded' });
    // DOMContentLoaded can precede Firefox's first native layout with scripts disabled.
    await fallback.locator('h1').waitFor({ state: 'visible' });
    assert.equal(await fallback.locator('h1').isVisible(), true, route);
    assert.equal(await fallback.locator('a[href*="/__v9/"]').count(), 0, route);
  }
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    `${out}/result.json`,
    JSON.stringify(
      {
        status: 'passed',
        engine,
        records,
        checks: [
          'canonical/indexing',
          'public-navigation',
          'responsive',
          'GCC-alias',
          'tablet-keyboard',
          'sector-contact-context',
          'no-JS',
        ],
        errors,
      },
      null,
      2
    )
  );
  console.log(
    `${engine}: ${records.length} public route/viewport checks plus navigation, alias, tablet keyboard and no-JS passed`
  );
} finally {
  await browser.close();
}
