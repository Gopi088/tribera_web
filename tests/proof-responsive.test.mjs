import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch();
try {
  for (const width of [320, 390, 820, 1555]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, hasTouch: width < 900 });
    await page.goto(process.env.TEST_BASE_URL || 'http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
    const lab = page.locator('[data-v58-lab]');
    const inputs = lab.locator('input[type=range]');
    const strip = lab.locator('.v58-mobile-verdict');
    const status = lab.locator('[data-verdict-status]');
    const evidence = await lab.locator('.v58-score-tiles b').allTextContents();
    assert.deepEqual(evidence, ['5', '5', '2', '5', '4', '2', '4', '3', '4']);
    assert.equal(await lab.locator('.v58-score-tiles small').count(), 0);
    assert.ok(
      (
        await lab
          .locator('.v58-score-tiles > span')
          .evaluateAll((tiles) => tiles.map((tile) => tile.getAttribute('aria-label')))
      ).every((label) => label.endsWith('out of 5'))
    );
    const instruction = lab.locator('#weight-instruction');
    assert.equal(await instruction.innerText(), 'Adjust the sliders to set what matters most.');
    assert.equal(await instruction.isVisible(), true);
    assert.ok((await instruction.boundingBox()).width > 100);
    assert.equal(await inputs.first().getAttribute('aria-describedby'), 'weight-instruction');
    const presetSize = await lab.locator('[data-preset=brief]').boundingBox();
    if (width < 900) {
      assert.ok(presetSize.height >= 44, 'Presets retain a 44px touch target');
    } else {
      assert.ok(Math.abs(presetSize.height - 31.1) < 1, 'Desktop preset height matches sample');
      assert.ok(Math.abs(presetSize.width - 84.6) < 1, 'Desktop preset width matches sample');
    }
    assert.equal(await lab.locator('article[aria-live]').count(), 0);
    assert.equal(await status.textContent(), '');
    assert.equal(await page.locator('.v58-proof-emphasis').textContent(), 'Set your priorities');
    assert.equal(await page.locator('.v58-proof-intro > p').count(), 2);
    assert.equal(await page.locator('.v58-proof-intro br').count(), 0);

    for (const preset of ['llm', 'ownership']) {
      await lab.locator(`[data-preset=${preset}]`).click();
      await page.waitForTimeout(350);
      const score = await lab.locator('[data-verdict-score]').textContent();
      const band = await lab.locator('[data-band]').textContent();
      assert.equal(score, preset === 'llm' ? '32.80' : '41.00');
      assert.match(await lab.locator('[data-mobile-score]').textContent(), new RegExp(score));
      assert.equal(await lab.locator('[data-mobile-band]').textContent(), band);
      assert.equal(await status.textContent(), `${score} out of 50. ${band.toLowerCase()}.`);
      const prioritised = await lab
        .locator('.v58-score-tiles > span')
        .evaluateAll((tiles) =>
          tiles.flatMap((tile, index) => (tile.classList.contains('is-priority') ? [index] : []))
        );
      assert.deepEqual(prioritised, preset === 'llm' ? [2] : [0, 1, 3]);
    }

    const tiles = lab.locator('.v58-score-tiles > span');
    await tiles.nth(2).focus();
    assert.equal(await inputs.nth(2).evaluate((input) => input.parentElement.classList.contains('is-linked')), true);
    await tiles.nth(2).evaluate((tile) => tile.blur());
    if (width >= 900) {
      await tiles.nth(5).hover();
      assert.equal(await inputs.nth(5).evaluate((input) => input.parentElement.classList.contains('is-linked')), true);
      await page.mouse.move(0, 0);
      assert.equal(await lab.locator('.v58-score-tiles > .is-linked').count(), 0);
    }

    await inputs.last().scrollIntoViewIfNeeded();
    await inputs.last().focus();
    await inputs.last().press('ArrowRight');
    await page.waitForTimeout(350);
    assert.equal(await lab.locator('.v58-score-tiles > .is-linked').count(), 1);
    assert.deepEqual(await lab.locator('.v58-score-tiles b').allTextContents(), evidence);
    if (width < 900) {
      const bounds = await strip.boundingBox();
      assert.ok(
        bounds.y >= 64 && bounds.y + bounds.height < 900,
        `Sticky verdict visible at ${width}px: ${JSON.stringify(bounds)}`
      );
      await page.screenshot({ path: `/tmp/proof-fixed-${width}.png` });
    } else {
      assert.equal(await strip.isVisible(), false);
      const card = await lab.locator('.v58-verdict').boundingBox();
      const end = await lab.locator('.v58-calculation').boundingBox();
      assert.ok(Math.abs(card.y + card.height - end.y - end.height) < 70, 'Desktop column bottoms within 70px');
    }

    await inputs.evaluateAll((elements) => {
      elements.forEach((input) => {
        input.value = '0';
      });
      elements.at(-1).dispatchEvent(new Event('input', { bubbles: true }));
    });
    await page.waitForTimeout(350);
    assert.equal(await lab.locator('[data-verdict-score]').textContent(), '-');
    assert.equal(await lab.locator('[data-band]').textContent(), 'SET PRIORITIES');
    assert.equal(await lab.locator('[data-pin]').isVisible(), false);
    assert.equal(await status.textContent(), 'Set a priority above zero to calculate a verdict.');
    assert.equal(await lab.locator('.is-priority').count(), 0);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await lab.locator('[data-preset=ownership]').click();
    assert.equal(await lab.locator('[data-verdict-score]').textContent(), '41.00');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    console.log(`${width}px: sticky feedback, presets, keyboard, fixed evidence, status and overflow checks passed`);
    await page.close();
  }
} finally {
  await browser.close();
}
