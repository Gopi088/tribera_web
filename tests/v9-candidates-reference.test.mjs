import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs/promises';
import { chromium, firefox, webkit } from 'playwright';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4392';
const browserName = process.env.BROWSER || 'chromium';
const source = 'sample_data/tribera-web-handoff-v9/candidates.html';
const output = `artifacts/v9-g2-candidates/reference-${browserName}`;
test(`candidate final handoff cascade (${browserName})`, async () => {
  const browser = await { chromium, firefox, webkit }[browserName].launch();
  const records = [];
  try {
    await fs.mkdir(output, { recursive: true });
    const reference = await browser.newPage({ reducedMotion: 'reduce' });
    const migrated = await browser.newPage({ reducedMotion: 'reduce' });
    await reference.route('https://**/*', (route) => route.abort());
    await reference.goto(`${base}/__v9/candidates`);
    const html = (await fs.readFile(source, 'utf8')).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
    const fonts = (await fs.readFile('src/assets/styles/v9/fonts.css', 'utf8'))
      .replaceAll("url('/", `url('${base}/`)
      .replaceAll('url("/', `url("${base}/`);
    const selectors = [
      '.hero-two h1',
      '.hero-two .lead',
      '.pf',
      '.pf-score b',
      '.proof-head h2',
      '.proof-head .lead',
      '.verd-nm',
      '.verd-big b',
      '#cv h2',
      '.cvx-ask',
      '.cvx-line',
      '.cvx-fu p',
      '.cvx-feeds b',
      '#them h2',
      '.chk-row span',
      '#controls h2',
      '.sw-row b',
      '#when h2',
      '.clk-cap b',
      '#apply h2',
      '.qs-note',
      '.start h2',
    ];
    const properties = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing'];
    for (const width of [320, 360, 390, 768, 1024, 1366, 1920]) {
      await reference.setViewportSize({ width, height: 900 });
      await migrated.setViewportSize({ width, height: 900 });
      await migrated.goto(`${base}/__v9/candidates`);
      await migrated.evaluate(() => document.fonts.ready);
      await reference.setContent(html, { waitUntil: 'domcontentloaded' });
      await reference.addStyleTag({
        content: `${fonts}\n:root{--display:'V9 Fraunces',Georgia,serif;--body:'V9 Inter Tight',system-ui,sans-serif;--mono:'V9 JetBrains Mono',monospace;}`,
      });
      await reference.evaluate(() => document.fonts.ready);
      for (const selector of selectors) {
        const get = (page) =>
          page
            .locator(selector)
            .first()
            .evaluate((el, props) => {
              const s = getComputedStyle(el);
              return Object.fromEntries(props.map((p) => [p, s[p]]));
            }, properties);
        if (selector === '.cvx-line') {
          const geometry = (page) =>
            page
              .locator(selector)
              .first()
              .evaluate((el) => {
                const s = getComputedStyle(el);
                return Object.fromEntries(
                  [
                    'display',
                    'textAlign',
                    'backgroundColor',
                    'borderTopWidth',
                    'paddingTop',
                    'paddingRight',
                    'paddingBottom',
                    'paddingLeft',
                  ].map((key) => [key, s[key]])
                );
              });
          assert.deepEqual(
            await geometry(migrated),
            await geometry(reference),
            `${width}px CV tab must retain handoff row styling`
          );
        }
        const expected = await get(reference);
        const actual = await get(migrated);
        records.push({ width, selector, expected, actual });
      }
      if ([390, 1366].includes(width)) {
        await reference.screenshot({ path: `${output}/source-${width}.png`, fullPage: true });
        await migrated.screenshot({ path: `${output}/migrated-${width}.png`, fullPage: true });
        await migrated.locator('.hero-c').screenshot({ path: `${output}/hero-${width}.png` });
        await reference.locator('.hero-c').screenshot({ path: `${output}/source-hero-${width}.png` });
      }
    }
    const mismatches = records.filter((r) => JSON.stringify(r.actual) !== JSON.stringify(r.expected));
    await fs.writeFile(`${output}/result.json`, JSON.stringify({ source, records, mismatches }, null, 2) + '\n');
    assert.deepEqual(
      mismatches,
      [],
      'Final typography must match source; full-page composition requires visual review too'
    );
  } finally {
    await browser.close();
  }
});
