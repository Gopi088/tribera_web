import assert from 'node:assert/strict';
import { test } from 'node:test';
import { chromium, firefox, webkit } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const engine = { chromium, firefox, webkit }[process.env.BROWSER || 'chromium'];
test('conversion pages restore source motion without hiding no-JS content', async () => {
  const browser = await engine.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    for (const [slug, count] of [
      ['candidates', 49],
      ['contact', 26],
      ['sample-write-up', 4],
    ]) {
      await page.goto(`${base}/__v9/${slug}`);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(
        await page
          .locator('.v9-candidates [data-v9-reveal],.v9-contact [data-v9-reveal],.v9-sample [data-v9-reveal]')
          .count(),
        count,
        `${slug} exact source arrival targets`
      );
      await page.waitForFunction(() => document.querySelector('h1[data-v9-reveal]')?.classList.contains('rv-done'));
      if (slug !== 'sample-write-up') {
        const cells = page.locator('.hero-field svg rect[fill="#131313"]');
        assert.ok((await cells.count()) > 50);
        const before = await cells.evaluateAll((items) => items.map((el) => el.getAttribute('fill-opacity')).join(','));
        await page.waitForFunction(
          (prior) =>
            [...document.querySelectorAll('.hero-field svg rect[fill="#131313"]')]
              .map((el) => el.getAttribute('fill-opacity'))
              .join(',') !== prior,
          before
        );
        if (await page.evaluate(() => matchMedia('(hover:hover) and (pointer:fine)').matches)) {
          await page.mouse.move(0, 0);
          await page.mouse.move(1200, 240);
          await page.waitForFunction(
            () =>
              document.querySelector('.hero-field').style.getPropertyValue('--fx') !== '0px' &&
              document.querySelector('.hero-field').style.getPropertyValue('--fx') !== ''
          );
        }
      }
    }
    await page.goto(`${base}/__v9/candidates`);
    await page.waitForFunction(() => document.querySelector('.pf').hasAttribute('data-motion-complete'));
    assert.ok(
      await page
        .locator('.pf')
        .evaluate((el) => el.getAnimations({ subtree: true }).some((a) => a.effect.getTiming().delay === 1500)),
      'profile stamp sequence is active'
    );
    await page.locator('[data-candidate-drift]').scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    await page.waitForFunction(() => document.querySelector('[data-candidate-drift]').hasAttribute('data-running'));
    assert.ok((await page.locator('[data-clone]').count()) >= 4);
    assert.equal(await page.locator('.tm-track > .v9-testimonial:not([data-clone])').count(), 4);
    assert.ok(
      await page
        .locator('[data-clone]')
        .evaluateAll((els) => els.every((el) => el.inert && el.getAttribute('aria-hidden') === 'true'))
    );
    await page.locator('[data-testimonial-pause]').click();
    assert.equal(await page.locator('[data-testimonial-pause]').getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('[data-candidate-drift]').getAttribute('data-running'), null);
    await page.locator('[data-testimonial-pause]').click();
    await page.locator('[data-question="1"]').click();
    assert.equal(await page.locator('[data-question="1"]').getAttribute('aria-selected'), 'true');
    assert.equal(await page.locator('[data-candidate-questions]').getAttribute('data-playing'), 'false');
    assert.ok(
      await page.locator('[data-question-panel="1"]').evaluate((el) => el.getAnimations().length > 0),
      'question arrival motion'
    );
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => !document.querySelector('[data-clone]'));
    assert.equal(await page.locator('[data-clone]').count(), 0);
    assert.equal(await page.locator('[data-candidate-drift]').getAttribute('data-running'), null);
    assert.equal(await page.locator('[data-testimonial-pause]').isVisible(), false);
    await page.waitForTimeout(100);
    assert.equal(
      await page
        .locator('.v9-candidates')
        .evaluate(
          (el) =>
            el
              .getAnimations({ subtree: true })
              .filter((a) => a.playState === 'running' && a.effect.getTiming().iterations === Infinity).length
        ),
      0
    );
    for (const width of [390, 768, 1024, 1366, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      for (const slug of ['candidates', 'contact', 'sample-write-up']) {
        await page.goto(`${base}/__v9/${slug}`, { waitUntil: 'domcontentloaded' });
        await page.evaluate(() => document.fonts.ready);
        assert.ok(
          await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
          `${slug} ${width} overflow`
        );
      }
    }
    const native = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1366, height: 900 } });
    const noJs = await native.newPage();
    for (const slug of ['candidates', 'contact', 'sample-write-up']) {
      await noJs.goto(`${base}/__v9/${slug}`);
      assert.equal(await noJs.locator('h1').evaluate((el) => getComputedStyle(el).opacity), '1');
    }
    await noJs.goto(`${base}/__v9/candidates`);
    assert.equal(await noJs.locator('.v9-testimonial').count(), 4);
    assert.equal(await noJs.locator('.pf-stamp').evaluate((el) => getComputedStyle(el).opacity), '0.88');
    await native.close();
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
});
