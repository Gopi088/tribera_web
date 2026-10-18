import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4331';
const browser = await chromium.launch();
const expected = [
  ['36 hrs', 'To your first shortlist — then a steady flow.'],
  ['1 or 50', 'Roles at once — the same bar on every one.'],
  ['Your ATS', 'We work alongside it. No rip-and-replace.'],
  ['Your panel, or ours', 'We find them, or interview the ones you already have.'],
];
try {
  for (const width of [320, 390, 768, 820, 821, 1520]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await page.route('https://**', (route) => route.abort());
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const section = page.locator('#funnel + #ops');
    assert.equal(await section.count(), 1);
    assert.equal(await page.locator('#ops + #experts + #work + #savings + #ways').count(), 1);
    assert.equal(await section.locator('h2').innerText(), 'Everything a shortlist needs to actually ship.');
    assert.deepEqual(
      await section
        .locator('article')
        .evaluateAll((cards) =>
          cards.map((card) => ['h3', 'p'].map((tag) => card.querySelector(tag).textContent.replace(/\s+/g, ' ').trim()))
        ),
      expected
    );
    const data = await section.evaluate((element) => {
      const heading = element.querySelector('h2');
      const cards = [...element.querySelectorAll('article')];
      return {
        left: heading.getBoundingClientRect().left - element.querySelector('.v58-wrap').getBoundingClientRect().left,
        headingSize: getComputedStyle(heading).fontSize,
        peerSize: getComputedStyle(document.querySelector('#ways h2')).fontSize,
        columns: new Set(cards.map((card) => Math.round(card.getBoundingClientRect().left))).size,
        overflow: document.documentElement.scrollWidth > innerWidth,
        cards: cards.map((card) => ({
          size: getComputedStyle(card.querySelector('p')).fontSize,
          color: getComputedStyle(card.querySelector('h3')).color,
          family: getComputedStyle(card.querySelector('h3')).fontFamily,
          clipped: [...card.querySelectorAll('h3, p')].some((node) => node.scrollWidth > node.clientWidth + 1),
        })),
      };
    });
    assert.equal(data.left, 0);
    assert.equal(data.headingSize, data.peerSize);
    assert.equal(data.columns, width <= 820 ? 2 : 4);
    assert.equal(data.overflow, false);
    for (const [index, card] of data.cards.entries()) {
      assert.equal(card.size, '16px');
      assert.match(card.family, /Fraunces/);
      assert.equal(card.clipped, false);
      if (index < 2) assert.equal(card.color, 'rgb(218, 0, 7)');
    }
    if ([390, 1520].includes(width)) {
      await section.scrollIntoViewIfNeeded();
      await section.screenshot({ path: `/tmp/tribera-v61-ops-${width}.png` });
    }
    console.log(`${width}px: operations copy, placement, shared type and responsive grid passed`);
    await page.close();
  }
} finally {
  await browser.close();
}
