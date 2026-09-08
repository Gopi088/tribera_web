import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const routes = (process.env.EDITORIAL_ROUTES || '/services,/intelligence').split(',');
const browser = await chromium.launch();
try {
  for (const width of [320, 390, 768, 1000, 1520, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await page.route('**/*', (route) => (route.request().method() === 'POST' ? route.abort() : route.continue()));
    for (const route of routes) {
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      assert.equal(response.status(), 200, route);
      assert.equal(await page.locator('main').count(), 1, `${route}: one main`);
      assert.equal(await page.locator('h1').count(), 1, `${route}: one h1`);
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
        `${route} ${width}: overflow`
      );
      assert.match(
        await page.locator('h1').evaluate((e) => getComputedStyle(e).fontFamily),
        /Fraunces/,
        `${route}: editorial heading`
      );
      for (const heading of await page.locator('.site-editorial section:not(.close) .shead').all()) {
        assert.equal(
          await heading.evaluate((e) => getComputedStyle(e).textAlign),
          'left',
          `${route}: section alignment`
        );
      }
      if (route === '/services') {
        await page.locator('.sym[data-i="2"]').click();
        assert.match(await page.locator('#recN').innerText(), /expert assessment/);
        assert.equal(await page.locator('#recX a').getAttribute('href'), '#dlv-interviews');
        const accordion = page.locator('.oc__hd').first();
        await accordion.click();
        assert.equal(await accordion.getAttribute('aria-expanded'), 'true');
        assert.ok(await page.locator('.oc.op .oc__in').first().isVisible());
        await accordion.click();
        assert.equal(await accordion.getAttribute('aria-expanded'), 'false');
      }
      console.log(`${width} ${route}: contract passed`);
    }
    await page.close();
  }
} finally {
  await browser.close();
}
