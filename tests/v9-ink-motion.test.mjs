import assert from 'node:assert/strict';
import { test } from 'node:test';
import { chromium, firefox, webkit } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const engine = { chromium, firefox, webkit }[process.env.BROWSER || 'chromium'];

test('filled underlines draw in normal motion and remain visible without scripts', async () => {
  const browser = await engine.launch();
  const slugs = ['candidates', 'contact', 'bfsi', 'services', 'interview-as-a-service', 'case-study'];
  try {
    const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
    await page.addInitScript(() => {
      window.inkArrivals = [];
      const animate = Element.prototype.animate;
      Element.prototype.animate = function (frames, options) {
        if (this.matches('svg.hd-ink')) window.inkArrivals.push(frames);
        return animate.call(this, frames, options);
      };
    });
    for (const slug of slugs) {
      await page.goto(`${base}/__v9/${slug}`, { waitUntil: 'domcontentloaded' });
      const ink = page.locator('svg.hd-ink').first();
      await ink.scrollIntoViewIfNeeded();
      await page.waitForFunction(() => window.inkArrivals.some((frames) => frames[0].clipPath === 'inset(0 100% 0 0)'));
      await page.waitForFunction(() => document.querySelector('svg.hd-ink').getAnimations().length === 0);
      assert.equal(
        await ink.evaluate((element) => getComputedStyle(element).clipPath),
        'inset(-20% -4% -20% 0px)',
        `${slug}: completed ink stays visible`
      );
    }
    const native = await browser.newPage({ javaScriptEnabled: false });
    for (const slug of slugs) {
      await native.goto(`${base}/__v9/${slug}`, { waitUntil: 'domcontentloaded' });
      assert.equal(
        await native
          .locator('svg.hd-ink')
          .first()
          .evaluate((element) => getComputedStyle(element).clipPath),
        'inset(-20% -4% -20% 0px)',
        `${slug}: no-script ink is not clipped away`
      );
    }
  } finally {
    await browser.close();
  }
});
