import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium, firefox, webkit } from 'playwright';
import { waitForPageCondition } from '../scripts/v9-browser-readiness.mjs';

const engine = process.env.BROWSER || 'chromium';
const engines = { chromium, firefox, webkit };
assert.ok(Object.hasOwn(engines, engine), `Unknown browser ${engine}`);
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4390';
const source = fs.readFileSync('sample_data/tribera-web-handoff-v9/about.html', 'utf8');
const expected = [...source.matchAll(/<img class="ab-ph-img" src="data:image\/jpeg;base64,([^"]+)"/g)].map((match) =>
  Buffer.from(match[1], 'base64')
);
assert.equal(expected.length, 3);
const browser = await engines[engine].launch();
try {
  for (const width of [390, 768, 1024, 1366, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    await page.goto(`${base}/__v9/about`, { waitUntil: 'networkidle' });
    const portraits = page.locator('.ab-ph-img');
    assert.equal(await portraits.count(), 3);
    for (let index = 0; index < 3; index++) {
      const portrait = portraits.nth(index);
      await portrait.scrollIntoViewIfNeeded();
      await waitForPageCondition(page, (index) => document.querySelectorAll('.ab-ph-img')[index].complete, index, {
        timeout: 15000,
      });
      const observed = await portrait.evaluate((element) => {
        const style = getComputedStyle(element);
        const box = element.getBoundingClientRect();
        return {
          src: element.getAttribute('src'),
          height: box.height,
          width: box.width,
          filter: style.filter,
          fit: style.objectFit,
          decoded: element.complete && element.naturalWidth === 560 && element.naturalHeight === 560,
        };
      });
      assert.equal(observed.height, 560, `${width}: portrait ${index} retains source tall crop`);
      assert.ok(observed.width > 0 && observed.width <= width);
      assert.equal(observed.filter, 'grayscale(0) contrast(1)', 'Source completed reveal is full color');
      assert.equal(observed.fit, 'cover');
      assert.ok(observed.decoded);
      assert.deepEqual(fs.readFileSync(`public${observed.src}`), expected[index], 'Exact handoff portrait bytes');
    }
    await page.close();
  }
  const reference = await browser.newPage({ reducedMotion: 'reduce' });
  const migrated = await browser.newPage({ reducedMotion: 'reduce' });
  await reference.route('**/*', (route) =>
    new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort()
  );
  const fonts = fs.readFileSync('src/assets/styles/v9/fonts.css', 'utf8');
  const articleSource = fs
    .readFileSync('sample_data/tribera-web-handoff-v9/blog/seventeen-interviews-one-hire.html', 'utf8')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(
      '</head>',
      `<style>${fonts} :root { --display:'V9 Fraunces',Georgia,serif; --body:'V9 Inter Tight',system-ui,sans-serif; --mono:'V9 JetBrains Mono',monospace; } [data-rv] {opacity:1!important;transform:none!important}</style></head>`
    );
  await reference.route('**/__visual-article-reference', (route) =>
    route.fulfill({ contentType: 'text/html', body: articleSource })
  );
  for (const width of [390, 768, 1024, 1366, 1920]) {
    await reference.setViewportSize({ width, height: 900 });
    await migrated.setViewportSize({ width, height: 900 });
    await reference.goto(`${base}/__visual-article-reference`, { waitUntil: 'networkidle' });
    await migrated.goto(`${base}/__v9/article`, { waitUntil: 'networkidle' });
    await reference.evaluate(() => document.fonts.ready);
    await migrated.evaluate(() => document.fonts.ready);
    for (const [sourceSelector, targetSelector] of [
      ['.bl-head h1', '.v9-article-header h1'],
      ['.bl-head .cv', '.v9-article-cover'],
    ]) {
      const measure = (element) => {
        const r = element.getBoundingClientRect();
        return { x: r.x, width: r.width, height: r.height };
      };
      const expectedBox = await reference.locator(sourceSelector).evaluate(measure);
      const actualBox = await migrated.locator(targetSelector).evaluate(measure);
      for (const key of ['x', 'width', 'height'])
        assert.ok(
          Math.abs(expectedBox[key] - actualBox[key]) < 1,
          `${width}: ${targetSelector} ${key}: source ${expectedBox[key]}, migrated ${actualBox[key]}`
        );
    }
  }
  await reference.close();
  await migrated.close();
  console.log(`V9 article header geometry passed (${engine}, five widths).`);
  console.log(`V9 About final portrait appearance passed (${engine}, five widths, three exact assets).`);
} finally {
  await browser.close();
}
