import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4331';
const browser = await chromium.launch();
try {
  for (const width of [320, 390, 768, 1520, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await page.route('**/*', (r) =>
      r.request().method() === 'GET' && r.request().url().startsWith(base) ? r.continue() : r.abort()
    );
    await page.goto(`${base}/services/`, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    // Independent content assertions: do not derive coverage from the CSS selector list.
    const styles = await page.locator('#why .ltr__body').evaluate((body) => {
      const style = (el) => {
        const s = getComputedStyle(el);
        return { size: s.fontSize, weight: s.fontWeight, family: s.fontFamily, color: s.color };
      };
      return {
        paragraphs: [...body.querySelectorAll('p:not(.ltr__lede)')].map(style),
        emphasis: style(body.querySelector('b')),
        introduction: style(body.querySelector('.ltr__lede')),
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
      };
    });
    assert.equal(styles.paragraphs.length, 3);
    for (const paragraph of styles.paragraphs) {
      assert.equal(paragraph.size, '16px');
      assert.equal(paragraph.weight, '400');
      assert(paragraph.family.includes('Inter Tight'));
      assert.equal(paragraph.color, 'rgb(59, 59, 57)');
    }
    assert.equal(styles.emphasis.size, '16px');
    assert.equal(styles.emphasis.weight, '600');
    assert.equal(styles.emphasis.color, 'rgb(19, 19, 19)');
    assert.equal(styles.introduction.weight, '700');
    assert(styles.introduction.family.includes('Fraunces'));
    assert.equal(styles.introduction.color, 'rgb(59, 59, 57)');
    assert.equal(styles.overflow, false);
    if (width === 1520) await page.locator('#why').screenshot({ path: '/tmp/services-letter-size-fixed.png' });
    console.log(`${width}px: Services letter body 16px; serif introduction, bold emphasis and colors preserved`);
    await page.close();
  }
} finally {
  await browser.close();
}
