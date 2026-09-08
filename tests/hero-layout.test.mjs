import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch();
try {
  for (const viewport of [
    { width: 1520, height: 1000 },
    { width: 1900, height: 1030 },
    { width: 1520, height: 1200 },
    { width: 1024, height: 700 },
    { width: 390, height: 844 },
    { width: 320, height: 640 },
  ]) {
    const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
    await page.goto(process.env.TEST_BASE_URL || 'http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const layout = await page.locator('.v58-hero-c').evaluate((hero) => {
      const rect = hero.getBoundingClientRect();
      const cue = hero.querySelector('.v58-hero-c__cue').getBoundingClientRect();
      return {
        height: rect.height,
        minHeight: getComputedStyle(hero).minHeight,
        headingSize: getComputedStyle(hero.querySelector('h1')).fontSize,
        rootSize: parseFloat(getComputedStyle(document.documentElement).fontSize),
        cueInside: cue.top >= rect.top && cue.bottom <= rect.bottom,
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    if (viewport.width >= 900) {
      assert.equal(parseFloat(layout.minHeight), viewport.height - 126);
      assert.ok(layout.height >= viewport.height - 126, 'Hero must grow with the viewport');
      if (viewport.height >= 1000) assert.ok(Math.abs(layout.height - (viewport.height - 126)) < 1);
      const expectedFontSize = Math.max(
        2.08 * layout.rootSize,
        Math.min(viewport.width * 0.0448, 3.32 * layout.rootSize)
      );
      assert.ok(
        Math.abs(parseFloat(layout.headingSize) - expectedFontSize) < 0.01,
        'Keep the existing desktop typography'
      );
    } else {
      assert.equal(layout.minHeight, '0px', 'Mobile remains content-height');
    }
    assert.ok(layout.cueInside);
    assert.equal(layout.overflow, false);
    if (viewport.width === 1900 || viewport.width === 390) {
      await page.screenshot({ path: `/tmp/hero-height-${viewport.width}.png` });
    }
    console.log(`${viewport.width}x${viewport.height}: hero height, typography, cue and overflow passed`);
    await page.close();
  }
} finally {
  await browser.close();
}
