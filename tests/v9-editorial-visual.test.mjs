import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium, firefox, webkit } from 'playwright';

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
  console.log(`V9 About final portrait appearance passed (${engine}, five widths, three exact assets).`);
} finally {
  await browser.close();
}
