import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4331';
const sample = await readFile('sample_data/tribera-home-v61 (1).html', 'utf8');
const browser = await chromium.launch();
try {
  for (const width of [320, 390, 759, 760, 1520]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    const section = page.locator('#work + #savings + #ways');
    assert.equal(await section.count(), 1);
    assert.equal(await page.locator('#funnel #savings').count(), 0);
    const comparison = await page.evaluate((html) => {
      const reference = new DOMParser().parseFromString(html, 'text/html').querySelector('#savings');
      reference.querySelector('.cu').textContent = '36';
      const normalize = (s) => s.replace(/\\/g, '').replace(/\s+/g, ' ').trim();
      const actual = document.querySelector('#savings');
      return {
        reference: [...reference.querySelectorAll('.eyebrow, h2, .lead, .save-k, .save b, .save p, .cost-lbl')].map(
          (el) => normalize(el.textContent)
        ),
        actual: [
          ...actual.querySelectorAll('.v58-kicker, h2, .v58-lead, .v58-save-k, h3, article p, .v58-cost-label'),
        ].map((el) => normalize(el.textContent)),
        background: getComputedStyle(actual).backgroundColor,
        cards: [...actual.querySelectorAll('article')].map((card) => ({
          top: card.getBoundingClientRect().top,
          background: getComputedStyle(card).backgroundColor,
        })),
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    }, sample);
    assert.deepEqual(comparison.actual, comparison.reference, 'All savings copy matches v61');
    assert.equal(comparison.background, 'rgb(244, 243, 240)');
    assert.equal(comparison.cards.length, 3);
    assert.equal(new Set(comparison.cards.map((c) => c.top)).size, width >= 760 ? 1 : 3);
    assert.ok(comparison.cards.every((c) => c.background === 'rgb(255, 255, 255)'));
    assert.equal(comparison.overflow, false);
    if ([390, 1520].includes(width))
      await page.locator('#savings').screenshot({ path: `/tmp/v61-savings-${width}.png` });
    await page.close();
    console.log(`${width}px: exact v61 copy, standalone placement, colours and card layout passed`);
  }
  for (const javaScriptEnabled of [false, true]) {
    const page = await browser.newPage({ javaScriptEnabled, reducedMotion: 'no-preference' });
    await page.goto(base);
    await page.locator('#savings').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1800);
    assert.equal(await page.locator('#savings [data-v58-count]').textContent(), '36');
    const ratio = await page
      .locator('.v58-cost-bar')
      .evaluate((bar) => bar.firstElementChild.getBoundingClientRect().width / bar.getBoundingClientRect().width);
    assert.ok(Math.abs(ratio - 0.72) < 0.01);
    await page.close();
    console.log(`JavaScript ${javaScriptEnabled}: final count and cost bar passed`);
  }
} finally {
  await browser.close();
}
