import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch();
const counts = [126, 40, 14, 5, 2];
const labels = [
  'Sourced & screened',
  'A first conversation',
  'Interviewed by an expert',
  'Sent to their team',
  'They hired two',
];

try {
  for (const width of [320, 390, 1520]) {
    const page = await browser.newPage({ viewport: { width, height: 1100 }, hasTouch: width < 900 });
    await page.goto(process.env.TEST_BASE_URL || 'http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
    const funnel = page.locator('[data-v58-funnel]');
    const steps = funnel.locator('[data-stage]');
    assert.equal(await page.locator('[data-funnel-caption], .v58-funnel-exits').count(), 0);
    const tiers = await funnel
      .locator('[data-square]')
      .evaluateAll((squares) => squares.map((square) => Number(square.dataset.tier)));
    assert.deepEqual(
      [1, 2, 3, 4, 5].map((tier) => tiers.filter((value) => value === tier).length),
      [86, 26, 9, 3, 2]
    );
    const oldDiagonalPattern = Array.from({ length: 126 }, (_, index) => {
      const position = (index * 53) % 126;
      return position < 86 ? 1 : position < 112 ? 2 : position < 121 ? 3 : position < 124 ? 4 : 5;
    });
    assert.notDeepEqual(tiers, oldDiagonalPattern, 'Squares no longer follow the old diagonal pattern');
    assert.match(await page.locator('#funnel .v58-lead').textContent(), /40 HR interviews.*14 candidates technically/);
    assert.match(await steps.nth(1).textContent(), /An HR interview.*Fourteen progressed to an expert/);
    assert.match(await steps.nth(2).textContent(), /Forty-five minutes on the technical work.*Five cleared the bar/);
    assert.match(await steps.nth(3).textContent(), /Five qualified candidates/);

    for (let index = 0; index < counts.length; index += 1) {
      await steps.nth(index).focus();
      assert.equal(await funnel.locator('[data-stage].is-active').count(), 1);
      assert.equal(await steps.nth(index).evaluate((button) => button.classList.contains('is-active')), true);
      assert.equal(await funnel.locator('[data-funnel-label]').textContent(), labels[index]);
      assert.equal(await funnel.locator('[data-funnel-number]').textContent(), String(counts[index]));
      assert.equal(await funnel.locator('[data-square]:not(.is-out)').count(), counts[index]);
      await steps.nth(index).press('Enter');
      assert.equal(await steps.nth(index).getAttribute('aria-pressed'), 'true');
      assert.equal(await funnel.locator('[data-funnel-label]').textContent(), labels[index]);
    }
    assert.deepEqual(
      await funnel
        .locator('[data-square]')
        .evaluateAll((squares) => squares.map((square) => Number(square.dataset.tier))),
      tiers,
      'Square positions remain stable across stages'
    );
    if (width === 1520) {
      await steps.first().click();
      await funnel.locator('.v58-funnel-field').screenshot({ path: '/tmp/funnel-scatter.png' });
      await steps.last().click();
    }

    // Square hover previews the whole stage, including later hires.
    for (let index = 0; index < counts.length; index += 1) {
      await funnel
        .locator(`[data-square][data-tier="${index + 1}"]`)
        .first()
        .dispatchEvent('mouseover');
      assert.equal(await funnel.locator('[data-stage].is-active').count(), 1);
      assert.equal(
        await steps.nth(index).evaluate((button) => button.classList.contains('is-active')),
        true,
        'Square preview highlights its matching text row'
      );
      assert.equal(await funnel.locator('[data-funnel-number]').textContent(), String(counts[index]));
      assert.equal(await funnel.locator('[data-funnel-label]').textContent(), labels[index]);
      assert.equal(await funnel.locator('[data-square]:not(.is-out)').count(), counts[index]);
      await page.waitForTimeout(400);
      assert.ok(
        (
          await funnel
            .locator('[data-square][data-tier="5"]')
            .evaluateAll((squares) => squares.map((square) => Number(getComputedStyle(square).opacity)))
        ).every((opacity) => opacity === 1),
        'Both red hired squares stay highlighted in every stage'
      );
      assert.equal(await steps.nth(4).getAttribute('aria-pressed'), 'true');
      await funnel.locator('.v58-square-grid').dispatchEvent('mouseleave');
      assert.equal(await funnel.locator('[data-funnel-number]').textContent(), '2');
      assert.equal(
        await steps.nth(4).evaluate((button) => button.classList.contains('is-active')),
        true,
        'Leaving the squares restores the selected row'
      );
    }
    for (let index = 0; index < counts.length; index += 1) {
      await steps.nth(index).dispatchEvent('mouseenter');
      assert.equal(await steps.nth(index).evaluate((button) => button.classList.contains('is-active')), true);
      assert.equal(await funnel.locator('[data-square]:not(.is-out)').count(), counts[index]);
      assert.equal(await steps.nth(4).getAttribute('aria-pressed'), 'true', 'Hover does not commit a selection');
      await steps.nth(index).dispatchEvent('mouseleave');
      assert.equal(await steps.nth(4).evaluate((button) => button.classList.contains('is-active')), true);
    }
    assert.doesNotMatch(await funnel.textContent(), /ranked below|14 cleared the bar|40 reached an expert/);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    console.log(
      `${width}px: removed copy, stage labels, linked highlighting, keyboard selection and square counts passed`
    );
    await page.close();
  }
} finally {
  await browser.close();
}
