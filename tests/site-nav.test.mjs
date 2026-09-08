import assert from 'node:assert/strict';
import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
async function builtPages(dir) {
  const pages = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) pages.push(...(await builtPages(file)));
    else if (file.endsWith('.html')) pages.push(file);
  }
  return pages;
}
const routes = (await builtPages('dist'))
  .map((file) => file.replace(/^dist/, '').replace(/index\.html$/, ''))
  .filter((route) => !route.startsWith('/decapcms/'))
  .sort();
assert.ok(routes.length > 0, 'Build the public routes before running the navigation test');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const browser = await chromium.launch();
const failures = [];
try {
  for (const width of [390, 1080, 1520]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    let reference;
    for (const route of routes) {
      await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const fontsLoaded = await page.evaluate(() =>
        [...document.fonts].some(
          (face) => face.family.replaceAll('"', '') === 'Inter Tight' && face.status === 'loaded'
        )
      );
      if (!fontsLoaded) failures.push({ route, width, error: 'Shared Inter Tight font not loaded' });
      const frame = await page.locator('#nav').evaluate((nav) =>
        [...nav.querySelectorAll('.logo,.nav__sw,.nav__links,.nav__login,.nav__cta,.burger')].map((element) => {
          const rect = element.getBoundingClientRect();
          return { class: element.className, x: rect.x, y: rect.y, width: rect.width, height: rect.height };
        })
      );
      if (!reference) reference = frame;
      try {
        assert.deepEqual(frame, reference);
      } catch {
        failures.push({ route, width, frame, reference });
      }
    }
    console.log(`${width}: checked ${routes.length} public navigation frames`);
    await page.close();
  }
  await writeFile(
    '/tmp/site-style-nav-results.json',
    JSON.stringify({ routes: routes.length, widths: [390, 1080, 1520], failures }, null, 2)
  );
  assert.equal(failures.length, 0, `${failures.length} differing frames; see /tmp/site-style-nav-results.json`);
} finally {
  await browser.close();
}
