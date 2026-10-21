import assert from 'node:assert/strict';
import { test } from 'node:test';
import { chromium, firefox, webkit } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const engine = { chromium, firefox, webkit }[process.env.BROWSER || 'chromium'];

test('hiring motion, portrait color, native disclosures and manual takeover', async () => {
  const browser = await engine.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    for (const slug of ['services', 'interview-as-a-service', 'case-study']) {
      const response = await page.goto(`${base}/__v9/${slug}`);
      const baseline = await page.evaluate(
        (html) =>
          [...new DOMParser().parseFromString(html, 'text/html').querySelectorAll('.hero-field rect')]
            .map((cell) => cell.getAttribute('fill-opacity'))
            .join(','),
        await response.text()
      );
      const snapshot = () =>
        page
          .locator('.hero-field rect')
          .evaluateAll((cells) => cells.map((cell) => cell.getAttribute('fill-opacity')).join(','));
      const initial = await snapshot();
      await page.waitForFunction(
        (before) =>
          [...document.querySelectorAll('.hero-field rect')]
            .map((cell) => cell.getAttribute('fill-opacity'))
            .join(',') !== before,
        initial
      );
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForFunction(
        (original) =>
          [...document.querySelectorAll('.hero-field rect')]
            .map((cell) => cell.getAttribute('fill-opacity'))
            .join(',') === original,
        baseline
      );
      const stopped = await snapshot();
      await page.waitForTimeout(200);
      assert.equal(await snapshot(), stopped, `${slug}: reduced motion stops the field`);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
    }
    await page.goto(`${base}/__v9/services`);
    await page.locator('#fix').scrollIntoViewIfNeeded();
    await page.waitForFunction(
      () => document.querySelector('.sv-sym[aria-selected="true"]') !== document.querySelector('.sv-sym')
    );
    await page.locator('.sv-sym').first().click();
    await page.waitForTimeout(4800);
    assert.equal(await page.locator('.sv-sym').first().getAttribute('aria-selected'), 'true');
    await page.goto(`${base}/__v9/case-study`);
    const field = page.locator('[data-case-field]');
    await field.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('[data-case-field]').dataset.stage === '3');
    await page.locator('[data-case-stage]').first().click();
    await page.waitForTimeout(1900);
    assert.equal(await field.getAttribute('data-stage'), '0', 'manual stage takes over');
    await page.goto(`${base}/__v9/about`);
    const portrait = page.locator('.ab-ph-img').first();
    await portrait.scrollIntoViewIfNeeded();
    await page.waitForFunction(() =>
      document
        .querySelector('.ab-ph-img')
        .getAnimations()
        .some((animation) => animation.effect.getKeyframes().some((frame) => frame.filter))
    );
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(
      () => getComputedStyle(document.querySelector('.ab-ph-img')).filter === 'grayscale(0) contrast(1)'
    );
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    for (const slug of ['home', 'candidates', 'services', 'interview-as-a-service', 'bfsi', 'contact']) {
      await page.goto(`${base}/__v9/${slug}`);
      const details = page.locator('details.faq-item').first();
      const summary = details.locator('summary');
      // Exercise interruption too: a second activation must reverse the current motion.
      await summary.scrollIntoViewIfNeeded();
      await summary.evaluate((element) => (element.parentElement.open = false));
      await page.waitForTimeout(50);
      const heights = await summary.evaluate((element) => {
        element.click();
        return element.parentElement
          .getAnimations()
          .flatMap((animation) => animation.effect.getKeyframes().map((frame) => parseFloat(frame.height)));
      });
      assert.ok(heights[1] > heights[0], `${slug}: FAQ animates from closed to expanded height`);
      await summary.evaluate((element) => element.click());
      await page.waitForFunction(() => !document.querySelector('details.faq-item').open);
      await summary.focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(400);
      assert.equal(await details.evaluate((element) => element.open), true, `${slug}: native keyboard opening`);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await summary.click();
      assert.equal(await details.evaluate((element) => element.open), false);
      await page.emulateMedia({ reducedMotion: 'no-preference' });
    }
    await page.goto(`${base}/__v9/home`);
    const bar = page.locator('.bc-bar');
    await bar.scrollIntoViewIfNeeded();
    await bar.focus();
    await bar.evaluate((element) => {
      window.barPositions = [element.getAttribute('transform')];
      const observer = new MutationObserver(() => window.barPositions.push(element.getAttribute('transform')));
      observer.observe(element, { attributes: true, attributeFilter: ['transform'] });
      window.stopBarObservation = () => observer.disconnect();
    });
    await page.keyboard.press('End');
    assert.equal(await bar.getAttribute('aria-valuenow'), '42');
    await page.waitForFunction(
      () => Math.abs(document.querySelector('.bc-bar').transform.baseVal.consolidate().matrix.f - 75.6) < 0.01
    );
    assert.ok(
      await page.evaluate(() => new Set(window.barPositions).size > 2),
      'bar eases through intermediate positions'
    );
    await page.evaluate(() => window.stopBarObservation());
    assert.equal(
      await page
        .locator('.v9-nav')
        .evaluate((element) => getComputedStyle(element).getPropertyValue('view-transition-name')),
      'site-nav'
    );
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
});
