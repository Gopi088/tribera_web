import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const routes = [
  '/about/',
  '/careers/',
  '/careers/backend-engineer/',
  '/contact/',
  '/intelligence/',
  '/services/',
  '/functions/',
  '/functions/data-analytics/',
  '/industries/',
  '/industries/banking-financial-services/',
  '/blog/',
  '/blog/designing-ai-for-high-stakes-technical-assessment/',
  '/blog/designing-for-trust-privacy-transparency-respect/',
  '/blog/hiring-is-not-a-transaction-its-a-relationship/',
  '/blog/rethinking-hiring-metrics-signal-efficiency/',
  '/blog/signal-vs-noise-technical-hiring/',
  '/blog/when-job-hunting-feels-like-a-black-hole/',
  '/blog/why-tech-hiring-really-takes-so-long/',
];

const browser = await chromium.launch();
try {
  for (const width of [390, 1520]) {
    for (const route of routes) {
      const page = await browser.newPage({ viewport: { width, height: 1000 } });
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.route('**/*', (request) =>
        request.request().method() === 'POST' ? request.abort() : request.continue()
      );
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, route);
      await page.mouse.move(width / 2, 300);
      await page.evaluate(() => {
        // Exercise delegated handlers with a non-element target as well as real controls.
        for (const host of document.querySelectorAll('#labRows, #tiles, #grid, .key, .mapx')) {
          const text = document.createTextNode('');
          host.append(text);
          text.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
          text.remove();
        }
        for (const select of document.querySelectorAll('#secA, #secB, #fnSel')) {
          if (select.options.length > 1) select.selectedIndex = 1;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
      for (const selector of ['.vseg', '.pre', '.sym', '.chip', '.oc__hd']) {
        const control = page.locator(`${selector}:visible`).first();
        if (await control.count()) await control.click();
      }
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);
      assert.deepEqual(errors, [], `${route} ${width}px: uncaught script errors`);
      console.log(`${route} ${width}px: script smoke test passed`);
      await page.close();
    }
  }
} finally {
  await browser.close();
}
