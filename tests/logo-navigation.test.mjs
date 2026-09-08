import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch();
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:8888';
try {
  for (const width of [390, 1440, 1920]) {
    for (const blockedFonts of [false, true]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 } });
      if (blockedFonts) await page.route('**/fonts/**', (route) => route.abort());
      await page.addInitScript(() => {
        window.logoFrames = [];
        function sample() {
          const logo = document.querySelector('#nav .logo svg');
          if (logo) {
            const rect = logo.getBoundingClientRect();
            const paths = [...logo.querySelectorAll('path')].map((path) => {
              const box = path.getBoundingClientRect();
              return [box.width, box.height];
            });
            window.logoFrames.push({ width: rect.width, height: rect.height, paths });
          }
          requestAnimationFrame(sample);
        }
        requestAnimationFrame(sample);
      });
      await page.goto(base, { waitUntil: 'networkidle' });
      const original = await page.evaluate(() => window.logoFrames.at(-1));
      assert.equal(original.width, 76);
      assert.equal(original.height, 20);
      for (const action of ['about', 'refresh', 'home', 'about']) {
        if (action === 'refresh') await page.reload({ waitUntil: 'networkidle' });
        else {
          const selector = action === 'home' ? '#nav .logo' : '#nav a[href="/about"]';
          // The mobile About link lives in the collapsed menu; activate the actual link.
          await page
            .locator(selector)
            .first()
            .evaluate((link) => link.click());
          await page.waitForURL(action === 'home' ? (url) => url.pathname === '/' : /\/about\/?$/);
          await page.waitForLoadState('networkidle');
        }
        const frames = await page.evaluate(() => window.logoFrames);
        assert.ok(frames.length > 0);
        for (const frame of frames)
          assert.deepEqual(
            frame,
            original,
            `${width}px ${action}, blocked fonts=${blockedFonts}: artwork must never resize`
          );
      }
      console.log(`${width}px, blocked fonts=${blockedFonts}: logo stable through About navigation and refresh`);
      await page.close();
    }
  }
} finally {
  await browser.close();
}
