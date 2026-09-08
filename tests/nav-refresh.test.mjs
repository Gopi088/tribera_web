import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch();
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
try {
  for (const width of [390, 1080, 1440, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    // Analytics delivery is unrelated to layout and can keep networkidle pending.
    await page.route(/https:\/\/(?:www\.)?(?:googletagmanager\.com|google-analytics\.com|google\.com)\//, (route) =>
      route.abort()
    );
    const checkLogoArtwork = async () => {
      assert.equal(await page.locator('#nav .logo svg path').count(), 2);
      assert.equal(await page.locator('#nav .logo svg text').count(), 0, 'Logo must not depend on fonts');
      assert.equal(await page.locator('#nav .logo').getAttribute('aria-label'), 'tribera home');
    };
    await page.route('**/fonts/**', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      await route.continue();
    });
    await page.addInitScript(() => {
      window.navFrames = [];
      const sample = () => {
        const nav = document.querySelector('#nav .nav__in');
        if (nav) {
          const frame = [
            ...nav.querySelectorAll('.logo,.nav__sw,.nav__links,.nav__l,.nav__login,.nav__cta,.burger'),
          ].map((element) => {
            const rect = element.getBoundingClientRect();
            const range = document.createRange();
            range.selectNodeContents(element);
            const text = range.getBoundingClientRect();
            return {
              x: rect.x,
              y: rect.y,
              width: rect.width,
              height: rect.height,
              textWidth: text.width,
              font: getComputedStyle(element).font,
              visibility: getComputedStyle(element).visibility,
            };
          });
          window.navFrames.push(JSON.stringify(frame));
        }
        requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });
    for (const route of ['/', '/candidates', '/about', '/blog']) {
      await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(() => window.navFrames.length > 0);
      await page.waitForTimeout(200);
      const frames = await page.evaluate(() => window.navFrames);
      assert.ok(frames.length > 0, 'Navigation becomes visible');
      assert.ok(
        frames.every((frame) => !frame.includes('hidden')),
        'Navigation must never be hidden while loading'
      );
      if (new Set(frames).size > 1) console.log([...new Set(frames)]);
      assert.equal(new Set(frames).size, 1, `${width}px ${route}: visible navigation must not shift`);
      await checkLogoArtwork();
      await page.reload({ waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(() => window.navFrames.length > 0);
      await page.waitForTimeout(200);
      const refreshed = await page.evaluate(() => window.navFrames);
      assert.ok(refreshed.length > 0);
      assert.equal(new Set(refreshed).size, 1, `${width}px ${route}: refresh must not shift navigation`);
      await checkLogoArtwork();
      console.log(`${width}px ${route}: stable navbar with delayed fonts`);
    }
    await page.close();
  }
  const noScript = await browser.newPage({ javaScriptEnabled: false });
  await noScript.goto(base);
  assert.equal(
    await noScript.locator('#nav .nav__in').evaluate((element) => getComputedStyle(element).visibility),
    'visible'
  );
  assert.equal(
    await noScript.locator('.v58-home').evaluate((element) => getComputedStyle(element).visibility),
    'visible'
  );
  console.log('JavaScript disabled: navigation and homepage remain visible');
  await noScript.close();
  const failedFont = await browser.newPage();
  await failedFont.route('**/fonts/**', (route) => route.abort());
  await failedFont.goto(base);
  await failedFont.evaluate(() => document.fonts.ready);
  assert.equal(
    await failedFont.locator('#nav .nav__in').evaluate((element) => getComputedStyle(element).visibility),
    'visible'
  );
  console.log('Failed font requests: navigation remains available');
  await failedFont.close();
} finally {
  await browser.close();
}
