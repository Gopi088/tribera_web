import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';

const routes = ['industries', 'functions', 'careers', 'blog'].flatMap((group) =>
  fs
    .readdirSync('dist/' + group, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(`dist/${group}/${entry.name}/index.html`))
    .map((entry) => '/' + group + '/' + entry.name)
);
assert.equal(routes.length, 34);
const browser = await chromium.launch();
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4331';
try {
  for (const width of [390, 1520]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await page.route('**/*', (route) =>
      route.request().method() !== 'GET' || route.request().url().startsWith('https:')
        ? route.abort()
        : route.continue()
    );
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    for (const route of routes) {
      assert.equal((await page.goto(base + route, { waitUntil: 'networkidle' })).status(), 200, route);
      assert.ok(await page.locator('h1').first().isVisible(), route + ' heading visible');
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
        route + ' overflow'
      );
    }
    assert.deepEqual(errors, []);
    for (const route of [
      '/about',
      '/intelligence',
      '/candidates',
      '/blog/rethinking-hiring-metrics-signal-efficiency',
    ]) {
      await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.screenshot({ path: `/tmp/bugs-${route.replaceAll('/', '-')}-${width}.png`, fullPage: true });
    }
    console.log(
      `${width}px: all 34 detail routes render, headings visible, no overflow or browser errors; GET-only audit`
    );
    await page.close();
  }
} finally {
  await browser.close();
}
