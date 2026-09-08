import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch();
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
try {
  for (const width of [390, 1440, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 1080 } });
    await page.addInitScript(() => {
      window.visibleTypeFrames = [];
      const sample = () => {
        const title = document.querySelector('.v58-home h1');
        if (title) {
          const frame = ['.v58-home h1', '.v58-hero-c__copy .v58-lead'].map((selector) => {
            const element = document.querySelector(selector);
            const style = getComputedStyle(element);
            const range = document.createRange();
            range.selectNodeContents(element);
            const rect = range.getBoundingClientRect();
            return {
              font: style.font,
              width: rect.width,
              height: rect.height,
              visibility: style.visibility,
              opacity: style.opacity,
            };
          });
          window.visibleTypeFrames.push(JSON.stringify(frame));
        }
        requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });
    for (const mode of ['cold', 'cached', 'delayed styles']) {
      if (mode === 'delayed styles') {
        await page.route('**/*', async (route) => {
          if (route.request().resourceType() === 'stylesheet' || /\.css(?:\?|$)/.test(route.request().url())) {
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
          await route.continue();
        });
      }
      if (mode === 'cold') await page.goto(base, { waitUntil: 'networkidle' });
      else await page.reload({ waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(500);
      const frames = await page.evaluate(() => window.visibleTypeFrames);
      assert.ok(frames.length > 0, 'Homepage must become visible');
      assert.ok(
        frames.every((frame) =>
          JSON.parse(frame).every((item) => item.visibility === 'visible' && item.opacity === '1')
        ),
        'Homepage type must not be hidden while loading'
      );
      if (new Set(frames).size > 1) console.log([...new Set(frames)]);
      assert.equal(new Set(frames).size, 1, `${width}px ${mode}: visible text must not resize`);
      console.log(`${width}px ${mode}: stable visible heading and body text`);
    }
    await page.close();
  }
} finally {
  await browser.close();
}
