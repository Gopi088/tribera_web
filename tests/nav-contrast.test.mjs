import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const browser = await chromium.launch();
const routes = ['/', '/about', '/candidates', '/candidates/start', '/services', '/industries', '/contact', '/blog'];
async function colors(link) {
  // Wait for legacy menu transitions before checking their final colors.
  await link.page().waitForTimeout(350);
  return link.evaluate((element) => {
    const style = getComputedStyle(element);
    return { color: style.color, background: style.backgroundColor };
  });
}
try {
  const page = await browser.newPage({ viewport: { width: 1520, height: 1000 } });
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: 'networkidle' });
    const menu = page.locator('#nav .dd').first();
    await menu.locator('.dd__t').hover();
    await page.waitForTimeout(500);
    for (const selector of ['.dd__c:first-child a', '.dd__c:last-child a', '.dd__f a']) {
      const link = menu.locator(selector).first();
      const before = await link.evaluate((element) => {
        const style = getComputedStyle(element);
        return { padding: style.paddingLeft, font: style.fontFamily };
      });
      await link.hover();
      assert.deepEqual(
        await colors(link),
        { color: 'rgb(19, 19, 19)', background: 'rgb(241, 241, 241)' },
        `${route}: ${selector} hover`
      );
      const after = await link.evaluate((element) => {
        const style = getComputedStyle(element);
        return { padding: style.paddingLeft, font: style.fontFamily };
      });
      assert.deepEqual(after, before, `${route}: hover does not shift text or change font`);
      assert.match(after.font, /Inter Tight/);
      if (selector !== '.dd__f a') {
        assert.equal(await link.evaluate((element) => getComputedStyle(element).fontSize), '14.72px');
      }
    }
    await page.mouse.move(0, 0);
    await menu.locator('.dd__t').focus();
    await page.keyboard.press('Tab');
    const first = menu.locator('.dd__c a').first();
    assert.equal(
      await first.evaluate((element) => element.matches(':focus-visible')),
      true,
      `${route}: keyboard focus enters menu`
    );
    assert.deepEqual(
      await colors(first),
      { color: 'rgb(19, 19, 19)', background: 'rgb(241, 241, 241)' },
      `${route}: keyboard contrast`
    );
    assert.equal(await first.evaluate((element) => getComputedStyle(element).outlineStyle), 'solid');
    await page.keyboard.press('Tab');
    assert.equal((await colors(first)).color, 'rgb(87, 86, 91)', `${route}: normal text color restored`);
    console.log(`${route}: dropdown hover, keyboard focus and reset passed`);
  }
} finally {
  await browser.close();
}
