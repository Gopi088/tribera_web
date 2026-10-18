import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4335';
const sample = await readFile('sample_data/tribera-home-v61 (1).html', 'utf8');
async function routes(dir = 'dist') {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) result.push(...(await routes(path)));
    else if (path.endsWith('.html') && !path.includes('/decapcms/'))
      result.push(path.replace(/^dist/, '').replace(/index\.html$/, ''));
  }
  return result;
}
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  await page.route('**/*', (route) =>
    route.request().method() === 'GET' && route.request().url().startsWith(base) ? route.continue() : route.abort()
  );
  for (const width of [320, 390, 768, 900, 1520]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(base, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const band = page.locator('#results + #procurement:has(+ #start)');
    assert.equal(await band.count(), 1);
    const sampleCopy = await page.evaluate(
      (html) =>
        new DOMParser()
          .parseFromString(html, 'text/html')
          .querySelector('.proc-line')
          .textContent.replace(/\s+/g, ' ')
          .trim(),
      sample
    );
    assert.equal(
      (await band.innerText()).replace(/\s+/g, ' ').trim(),
      sampleCopy,
      'Procurement copy matches v61 exactly'
    );
    assert.equal(await band.locator('a, button, article').count(), 0);
    const padding = await band.evaluate((section) => parseFloat(getComputedStyle(section).paddingTop));
    assert.ok(padding >= 26 && padding <= 42, 'Procurement remains a thin band, not a full-height section');
    assert.equal(await band.locator('p').evaluate((p) => getComputedStyle(p).fontSize), '16px');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    if ([390, 1520].includes(width)) {
      await band.scrollIntoViewIfNeeded();
      await band.screenshot({ path: `/tmp/tribera-procurement-${width}.png` });
    }
    for (const route of ['/about/', '/blog/']) {
      await page.goto(base + route, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      const styles = await page.locator('.door__k').evaluateAll((labels) =>
        labels.map((label) => ({
          family: getComputedStyle(label).fontFamily,
          size: getComputedStyle(label).fontSize,
        }))
      );
      assert.equal(styles.length, 2);
      for (const style of styles) {
        assert.match(style.family, /JetBrains Mono/);
        assert.equal(style.size, '12px');
      }
    }
    console.log(`${width}px: procurement placement/copy/layout and shared label family passed`);
  }
  let count = 0;
  for (const route of await routes()) {
    await page.goto(base + route, { waitUntil: 'load' });
    assert.match(await page.locator('footer').innerText(), /AI reads the interview/);
    // Article wording/titles and their routes are not part of the marketing-copy approval.
    if (!/^\/(blog|tag|category)(\/|$)/.test(route)) {
      const text = await page.locator('main').evaluate((main) => {
        const copy = main.cloneNode(true);
        copy.querySelectorAll('script, style').forEach((node) => node.remove());
        return copy.textContent;
      });
      const marketing = text
        .replace(/database exfiltration signal/g, 'database exfiltration alert')
        .replace(/woken up by a real signal/g, 'woken up by a real alert');
      assert.doesNotMatch(marketing, /\bsignals?\b/i, `${route}: unreviewed marketing use of signal`);
    }
    count++;
  }
  console.log(`${count} public routes: footer wording and marketing-copy scope passed`);
} finally {
  await browser.close();
}
