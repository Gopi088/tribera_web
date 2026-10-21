import assert from 'node:assert/strict';
import { setTimeout as delay } from 'node:timers/promises';

export async function verifyHeroMotion(browser, base) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
  try {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.addInitScript(() => {
      window.heroAnimations = [];
      const animate = Element.prototype.animate;
      Element.prototype.animate = function (frames, options) {
        if (this.closest('.hero-c'))
          window.heroAnimations.push({ className: this.className.baseVal ?? this.className, frames, options });
        return animate.call(this, frames, options);
      };
    });
    await page.goto(`${base}/__v9/home`);
    await page.waitForSelector('[data-v9-home][data-enhanced]');
    await page.waitForFunction(() => window.heroAnimations.some((entry) => entry.options.delay === 320));
    const animations = await page.evaluate(() => window.heroAnimations);
    const rows = animations.filter((entry) => entry.className.includes('hc-row'));
    assert.equal(rows.length, 5);
    assert.deepEqual(
      rows.map((entry) => entry.options.delay),
      [0, 110, 220, 330, 440]
    );
    assert.ok(rows.every((entry) => entry.options.duration === 620));
    assert.ok(animations.some((entry) => entry.className.includes('ink-stamp') && entry.options.delay === 1100));
    assert.ok(animations.some((entry) => entry.className.includes('hd-ink') && entry.options.duration === 850));
    const field = page.locator('.hero-field');
    const snapshot = () =>
      field
        .locator('rect')
        .evaluateAll((cells) =>
          cells.map((cell) => `${cell.getAttribute('fill')}:${cell.getAttribute('fill-opacity')}`).join('|')
        );
    const before = await snapshot();
    await delay(1800);
    assert.notEqual(await snapshot(), before, 'Handoff sweep must move through the grid');
    const hero = await page.locator('.hero-c').boundingBox();
    const finePointer = await page.evaluate(() => matchMedia('(hover:hover) and (pointer:fine)').matches);
    await page.mouse.move(hero.x + hero.width * 0.8, hero.y + hero.height * 0.3);
    if (finePointer) {
      await page.waitForFunction(
        () => document.querySelector('.hero-field').style.getPropertyValue('--fx') === '-4.2px'
      );
      assert.equal(await page.locator('.hero-clock').evaluate((el) => el.style.getPropertyValue('--cx')), '2.1px');
      await page.mouse.move(0, 0);
      await page.waitForFunction(() => document.querySelector('.hero-field').style.getPropertyValue('--fx') === '0px');
    } else {
      await delay(100);
      assert.equal(
        await field.evaluate((el) => parseFloat(el.style.getPropertyValue('--fx')) || 0),
        0,
        'Coarse/non-hover input must not trigger parallax'
      );
    }
    await page.locator('footer').scrollIntoViewIfNeeded();
    await delay(150);
    const offscreen = await snapshot();
    await delay(200);
    assert.equal(await snapshot(), offscreen, 'Offscreen sweep must stop');
    await page.locator('.hero-c').scrollIntoViewIfNeeded();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await delay(150);
    const reduced = await snapshot();
    await delay(200);
    assert.equal(await snapshot(), reduced, 'Reduced motion must settle the grid');
    assert.equal(
      await page
        .locator('.hero-c')
        .evaluate((el) => el.getAnimations({ subtree: true }).filter((a) => a.playState === 'running').length),
      0
    );
    assert.equal(await page.locator('.hc-row').count(), 5);
    assert.equal(await page.locator('.ink-stamp').isVisible(), true);
    assert.deepEqual(errors, []);
  } finally {
    await page.close();
  }
}
