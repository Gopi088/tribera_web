import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch();
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const selectors = ['.logo', '.nav__sw', '.nav__sw a', '.nav__links', '.nav__l', '.nav__login', '.nav__cta', '.burger'];
async function frame(page) {
  // A URL change can precede stylesheet loading; fonts.ready alone is then premature.
  await page.waitForLoadState('networkidle');
  await page.mouse.move(0, 0);
  await page.evaluate(() => document.fonts.ready);
  return page.locator('#nav').evaluate(
    (nav, selectors) =>
      selectors.flatMap((selector) =>
        [...nav.querySelectorAll(selector)].map((element) => {
          const { x, y, width, height } = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return { selector, x, y, width, height, font: style.font, display: style.display };
        })
      ),
    selectors
  );
}
try {
  for (const width of [320, 375, 390, 720, 900, 1080, 1180, 1520, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await page.goto(base, { waitUntil: 'networkidle' });
    const hiring = await frame(page);
    if (width < 390) {
      await page.locator('.burger').click();
      await page.locator('.navp__sw a[href="/candidates"]').click();
    } else {
      await page.locator('.nav__sw a[href="/candidates"]').click();
    }
    await page.waitForURL('**/candidates');
    assert.deepEqual(await frame(page), hiring, `${width}: navigation must not move when switching audience`);
    assert.equal(await page.locator('.nav__sw a[href="/candidates"]').getAttribute('class'), 'is');
    if (width < 390) {
      await page.locator('.burger').click();
      await page.locator('.navp__sw a[href="/"]').click();
    } else {
      await page.locator('.nav__sw a[href="/"]').click();
    }
    await page.waitForURL(base + '/');
    assert.deepEqual(await frame(page), hiring, `${width}: navigation stays put on the return trip`);
    await page.goto(base + '/candidates/start', { waitUntil: 'networkidle' });
    assert.deepEqual(await frame(page), hiring, `${width}: profile form uses the same navigation frame`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    const items = await page
      .locator('#nav .nav__in > *')
      .evaluateAll((elements) => elements.map((e) => e.getBoundingClientRect()).filter((rect) => rect.width));
    for (let i = 1; i < items.length; i++)
      assert.ok(items[i].x >= items[i - 1].right - 1, 'Navigation groups do not overlap');
    console.log(`${width}px: audience switches, profile route and navbar geometry passed`);
    await page.close();
  }
} finally {
  await browser.close();
}
