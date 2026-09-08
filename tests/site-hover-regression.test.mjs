import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch();
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const color = (locator) => locator.evaluate((element) => getComputedStyle(element).color);
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  await page.goto(base + '/services', { waitUntil: 'networkidle' });
  for (const card of await page.locator('.lead').all()) {
    await card.hover();
    assert.equal(await color(card.locator('.lead__n')), 'rgb(19, 19, 19)');
    assert.equal(await color(card.locator('.lead__why')), 'rgb(19, 19, 19)');
    await page.mouse.move(0, 0);
    await card.locator('.lead__go').focus();
    assert.equal(await color(card.locator('.lead__n')), 'rgb(19, 19, 19)');
    assert.equal(await color(card.locator('.lead__go')), 'rgb(19, 19, 19)');
  }
  const primary = page.locator('.hero .btn--light').first();
  await primary.hover();
  assert.equal(await color(primary), 'rgb(255, 255, 255)', 'Primary CTA retains white text');
  const symptom = page.locator('.sym').nth(1);
  await symptom.hover();
  assert.equal(await color(symptom), 'rgb(255, 255, 255)', 'Dark recommendation panel retains white text');
  await page.goto(base + '/blog', { waitUntil: 'networkidle' });
  await page.locator('.feat').hover();
  assert.equal(await color(page.locator('.feat__sub')), 'rgb(192, 192, 187)');
  console.log('Services cards, keyboard focus, red CTA and dark panels passed');
  for (const [route, selector, expected] of [
    ['/', '.v58-hero-c__copy .v58-link', 'rgb(87, 86, 91)'],
    ['/candidates', '.c-cue', 'rgb(87, 86, 91)'],
    ['/contact', '.cform .cswx:not(.on)', 'rgb(255, 255, 255)'],
  ]) {
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.keyboard.press('Tab');
    const link = page.locator(selector).first();
    await link.focus();
    await page.waitForTimeout(300);
    assert.equal(await color(link), expected, `${route}: keyboard-focused label stays readable`);
  }
  for (const route of ['/category/hiring-strategy', '/tag/technical-hiring']) {
    await page.goto(base + route, { waitUntil: 'networkidle' });
    const active = page.locator('.topic-filters .is-current');
    await active.hover();
    assert.equal(await color(active), 'rgb(255, 255, 255)', 'Active dark topic filter stays readable on hover');
    await page.mouse.move(0, 0);
    await page.keyboard.press('Tab');
    await active.focus();
    assert.equal(await color(active), 'rgb(255, 255, 255)', 'Active dark topic filter stays readable on focus');
    console.log(`${route}: selected topic hover and focus passed`);
  }
  for (const route of ['/', '/about', '/services', '/contact', '/candidates', '/industries']) {
    await page.setViewportSize({ width: 390, height: 1000 });
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.locator('#nav .burger').click();
    await page.locator('#nav .navp__t').click();
    for (const selector of ['.navp__coverage-link', '.navp__c a', '.navp__in > a', '.navp__sw a:not(.is)']) {
      const link = page.locator('#nav ' + selector).first();
      await link.hover();
      await page.waitForTimeout(300);
      assert.equal(await color(link), 'rgb(19, 19, 19)', `${route}: ${selector} hover stays dark`);
      await page.mouse.move(0, 0);
      await page.keyboard.press('Tab');
      await link.focus();
      await page.waitForTimeout(300);
      assert.equal(await color(link), 'rgb(19, 19, 19)', `${route}: ${selector} focus stays dark`);
    }
    const active = page.locator('#nav .navp__sw a.is');
    await active.hover();
    await page.waitForTimeout(300);
    assert.equal(await color(active), 'rgb(255, 255, 255)', 'Active dark switch retains white text');
    console.log(`${route}: mobile menu hover, focus and active states passed`);
  }
} finally {
  await browser.close();
}
