import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch();
try {
  for (const [width, height] of [
    [899, 1000],
    [900, 1000],
    [901, 1000],
    [1024, 768],
    [1366, 768],
    [1520, 1000],
    [1920, 1080],
    [1440, 1200],
    [1280, 600],
    [390, 844],
    [320, 568],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height },
      javaScriptEnabled: false,
      reducedMotion: 'reduce',
    });
    await page.goto(process.env.TEST_BASE_URL || 'http://127.0.0.1:4331/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const boxes = await page.evaluate(() => {
      const box = (selector) => {
        const { top, bottom, height } = document.querySelector(selector).getBoundingClientRect();
        return { top, bottom, height };
      };
      return {
        nav: box('#nav'),
        hero: box('.v58-hero-c'),
        strip: box('.v58-logo-strip'),
        copy: box('.v58-hero-c__copy'),
        cue: box('.v58-hero-c__cue'),
        next: box('#what'),
        overflow: document.documentElement.scrollWidth > innerWidth,
        headingFits: document.querySelector('h1').scrollWidth <= document.querySelector('h1').clientWidth + 8,
      };
    });
    assert.ok(Math.abs(boxes.hero.top - boxes.nav.bottom) < 1);
    assert.ok(Math.abs(boxes.strip.top - boxes.hero.bottom) < 1);
    assert.ok(Math.abs(boxes.next.top - boxes.strip.bottom) < 1);
    assert.ok(boxes.copy.top >= boxes.hero.top && boxes.copy.bottom <= boxes.cue.top);
    assert.ok(boxes.cue.bottom <= boxes.hero.bottom);
    assert.equal(boxes.overflow, false);
    assert.ok(boxes.headingFits, `${width}x${height}: hero heading fits its own container`);
    if (width >= 900 && height >= 768) {
      assert.ok(Math.abs(boxes.strip.bottom - height) <= 1, `${width}x${height}: strip ends at viewport bottom`);
    }
    if (width >= 900) assert.ok(boxes.strip.bottom >= height - 1);
    if (width === 390) assert.ok(boxes.strip.bottom < height, 'Mobile keeps its content-led height');
    if (width === 1520) await page.screenshot({ path: '/tmp/tribera-hero-viewport-fixed.png' });
    console.log(`${width}x${height}: strip placement, content bounds and no-JS layout passed`);
    await page.close();
  }
} finally {
  await browser.close();
}
