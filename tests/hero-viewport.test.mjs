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
        const element = document.querySelector(selector);
        if (!element) throw new Error(`Missing required layout region: ${selector}`);
        const { top, bottom, height } = element.getBoundingClientRect();
        return { top, bottom, height };
      };
      return {
        nav: box('#nav'),
        hero: box('.hero-c'),
        strip: box('.logo-strip'),
        copy: box('.hero-c .wrap'),
        cue: box('.hero-cue'),
        next: box('#proof'),
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
    assert.ok(boxes.hero.height > 0 && boxes.strip.height > 0, 'Hero and clients remain rendered');
    if (width === 1520) await page.screenshot({ path: '/tmp/tribera-hero-viewport-fixed.png' });
    console.log(`${width}x${height}: strip placement, content bounds and no-JS layout passed`);
    await page.close();
  }
} finally {
  await browser.close();
}
