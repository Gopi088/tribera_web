import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch();
try {
  for (const width of [320, 390, 768, 1024, 1180, 1520]) {
    const page = await browser.newPage({ viewport: { width, height: 1100 } });
    await page.goto(process.env.TEST_BASE_URL || 'http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
    const section = page.locator('.v58-work');
    assert.equal(await section.locator('article').count(), 5);
    assert.equal(await section.locator('.v58-flow-arrow').count(), 4);
    assert.equal(
      await section.locator('article').last().locator('p').textContent(),
      'You interview the three. The hire is your call.'
    );
    const layout = await section.evaluate((element) => {
      const wrap = element.querySelector('.v58-wrap').getBoundingClientRect();
      const flow = element.querySelector('.v58-work__flow');
      const rect = flow.getBoundingClientRect();
      const arrow = element.querySelector('.v58-flow-arrow');
      return {
        direction: getComputedStyle(flow).flexDirection,
        centreDifference: Math.abs((rect.left + rect.right - wrap.left - wrap.right) / 2),
        arrowWidth: getComputedStyle(arrow).width,
        stroke: getComputedStyle(arrow.querySelector('path')).strokeWidth,
        cardsFit: [...flow.querySelectorAll('article')].every((card) => card.scrollWidth <= card.clientWidth),
      };
    });
    assert.equal(layout.direction, width >= 1180 ? 'row' : 'column');
    if (width >= 680 && width < 1180) assert.ok(layout.centreDifference < 1);
    assert.equal(layout.arrowWidth, width >= 1180 ? '36px' : '42px');
    assert.equal(layout.stroke, width >= 1180 ? '1.9px' : '1.45px');
    assert.ok(layout.cardsFit);
    const cards = await section.locator('article').evaluateAll((elements) =>
      elements.map((card) => ({
        height: card.getBoundingClientRect().height,
        headingWeight: getComputedStyle(card.querySelector('h3')).fontWeight,
        headingSize: getComputedStyle(card.querySelector('h3')).fontSize,
        bodySize: getComputedStyle(card.querySelector('p')).fontSize,
        shadow: getComputedStyle(card).boxShadow,
      }))
    );
    for (const [index, card] of cards.entries()) {
      assert.equal(card.headingWeight, '600');
      assert.equal(card.headingSize, '16px');
      assert.equal(card.bodySize, '14px');
      assert.equal(card.shadow.includes('inset'), index === 0 || index === 4);
      if (width >= 1180) assert.ok(card.height >= 190 && card.height <= 220, 'Compact desktop card height');
    }
    if ([390, 1520].includes(width))
      await section.locator('.v58-work__flow').screenshot({ path: `/tmp/work-cards-${width}.png` });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    console.log(`${width}px: copy, flow, centring, arrow dimensions and overflow checks passed`);
    await page.close();
  }
} finally {
  await browser.close();
}
