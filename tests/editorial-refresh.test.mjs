import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const browser = await chromium.launch();
try {
  for (const width of [390, 1440, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    await page.addInitScript(() => {
      window.heroFrames = [];
      const sample = () => {
        const title = document.querySelector('.site-editorial .hero h1');
        if (title) {
          const range = document.createRange();
          range.selectNodeContents(title);
          const rect = range.getBoundingClientRect();
          let visible = true;
          for (let node = title; node; node = node.parentElement) {
            const style = getComputedStyle(node);
            if (style.visibility !== 'visible' || Number(style.opacity) !== 1) visible = false;
          }
          window.heroFrames.push({ visible, width: rect.width, height: rect.height, x: rect.x, y: rect.y });
        }
        requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });
    for (const mode of ['cold', 'refresh', 'navigation']) {
      if (mode === 'navigation') {
        await page.goto(base, { waitUntil: 'networkidle' });
        // Navigate through the real shared menu rather than calling goto again.
        await page
          .locator('#nav a[href="/about"]')
          .first()
          .evaluate((link) => link.click());
        await page.waitForURL(/\/about\/?$/);
        await page.waitForLoadState('networkidle');
      } else if (mode === 'refresh') await page.reload({ waitUntil: 'networkidle' });
      else await page.goto(base + '/about', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1200);
      const frames = await page.evaluate(() => window.heroFrames);
      assert.ok(frames.length > 0);
      assert.ok(
        frames.every((frame) => frame.visible),
        `${width}px ${mode}: About must not fade from blank`
      );
      assert.equal(
        new Set(frames.map((frame) => JSON.stringify(frame))).size,
        1,
        `${width}px ${mode}: About heading must not resize or move`
      );
      console.log(`${width}px ${mode}: About visible immediately and stable`);
    }
    await page.close();
  }
} finally {
  await browser.close();
}
