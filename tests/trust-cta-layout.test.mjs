import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch();
try {
  for (const width of [320, 390, 720, 820, 1100, 1520, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await page.goto(process.env.TEST_BASE_URL || 'http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
    const trust = page.locator('#trust');
    const cards = await trust.locator('article').evaluateAll((elements) =>
      elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return { x: rect.x, y: rect.y, fits: element.scrollWidth <= element.clientWidth };
      })
    );
    assert.equal(cards.length, 4);
    assert.ok(cards.every((card) => card.fits));
    assert.equal(cards[0].y === cards[1].y, width >= 720);
    if (width >= 720) {
      assert.equal(cards[2].y, cards[3].y);
      assert.ok(cards[2].y > cards[0].y);
      assert.equal(cards[0].x, cards[2].x);
    }
    assert.deepEqual(await trust.locator('h2 > span').allTextContents(), ['The engine scores.', 'A person decides.']);
    assert.equal(await trust.locator('h2 .v58-hd-underline').count(), 1);
    assert.equal(
      await trust.locator('.v58-trust__decision path').evaluate((element) => getComputedStyle(element).stroke),
      'rgb(218, 0, 7)'
    );
    assert.equal(await trust.locator('.v58-trust__decision svg').getAttribute('aria-hidden'), 'true');
    assert.equal(
      await trust.locator('.v58-trust__decision').evaluate((element) => getComputedStyle(element).fontStyle),
      'normal'
    );
    assert.equal(await trust.locator('article a').count(), 0);
    const privacy = trust.locator('.v58-trust__privacy a');
    assert.equal(await privacy.getAttribute('href'), '/privacy');
    assert.ok(
      (await privacy.boundingBox()).y >
        (await trust.locator('.v58-trust__grid').boundingBox()).y +
          (await trust.locator('.v58-trust__grid').boundingBox()).height
    );
    if (width >= 1100) {
      const lineCounts = await trust.locator('h2 > span').evaluateAll((elements) =>
        elements.map((element) => {
          const range = document.createRange();
          range.selectNodeContents(element.firstChild);
          return range.getClientRects().length;
        })
      );
      assert.deepEqual(lineCounts, [1, 1], 'Each sentence fits one desktop line');
    }
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    const link = page.locator('#start .v58-link');
    const actions = page.locator('#start .v58-actions');
    assert.deepEqual(
      await actions.evaluate((element) => ({
        top: getComputedStyle(element).marginTop,
        gap: getComputedStyle(element).columnGap,
      })),
      { top: '40px', gap: '36px' }
    );
    assert.equal(
      await page.locator('.v58-start__phrase').evaluate((element) => element.getClientRects().length),
      1,
      'Keep your first shortlist together'
    );
    assert.ok(
      (await page.locator('.v58-start__copy').textContent()).endsWith(
        'each with the evidence your team needs to choose.'
      ),
      'Retain the decision-focused ending'
    );
    assert.deepEqual(
      await link.evaluate((element) => ({
        color: getComputedStyle(element).color,
        size: getComputedStyle(element).fontSize,
      })),
      { color: 'rgb(218, 0, 7)', size: '14px' }
    );
    if ([390, 1520].includes(width)) {
      await trust.screenshot({ path: `/tmp/trust-selected-${width}.png` });
      await page.locator('#start').screenshot({ path: `/tmp/cta-selected-${width}.png` });
    }
    await link.click();
    assert.equal(await page.locator('#contactSalesModal').isVisible(), true);
    assert.equal(await page.locator('#contactSalesModal').getAttribute('data-active-form-intent'), 'demo');
    console.log(`${width}px: trust grid, heading wrapping, CTA styling and demo modal passed`);
    await page.close();
  }
} finally {
  await browser.close();
}
