import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

// Capture before a size-only migration, then compare emphasis and color afterward.
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:8888';
const out = process.env.TYPE_EVIDENCE || '/tmp/tribera-text-sizing';
const capture = process.argv.includes('--capture');
const routes = [
  '/',
  '/candidates/',
  '/about/',
  '/services/',
  '/contact/',
  '/careers/talent-associate/',
  '/functions/engineering-platform/',
  '/blog/why-tech-hiring-really-takes-so-long/',
];
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const results = [];
try {
  for (const width of [390, 1520]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await page.route('**/*', (r) =>
      r.request().method() === 'GET' && r.request().url().startsWith(base) ? r.continue() : r.abort()
    );
    for (const route of routes) {
      const response = await page.goto(base + route, { waitUntil: 'load' });
      assert.equal(response.status(), 200, route);
      await page.evaluate(() => document.fonts.ready);
      const elements = await page.evaluate(() =>
        [...document.querySelectorAll('body *')]
          .filter(
            (el) =>
              !el.closest('script,style,svg') &&
              el.getClientRects().length &&
              [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
          )
          .map((el) => {
            const s = getComputedStyle(el);
            return {
              tag: el.tagName,
              class: el.className,
              text: el.textContent.trim(),
              family: s.fontFamily,
              weight: s.fontWeight,
              style: s.fontStyle,
              color: s.color,
              size: s.fontSize,
            };
          })
      );
      results.push({ route, width, elements });
      const name = `${route.replaceAll('/', '_')}-${width}`;
      await page.screenshot({ path: `${out}/${capture ? 'before' : 'after'}-${name}.png`, fullPage: true });
      assert(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        `overflow: ${route} ${width}`
      );
    }
    await page.close();
  }
} finally {
  await browser.close();
}
await writeFile(`${out}/${capture ? 'before' : 'after'}.json`, JSON.stringify(results, null, 2));
if (!capture) {
  const before = JSON.parse(await readFile(`${out}/before.json`, 'utf8'));
  const emphasis = (rows) =>
    rows.map((row) => ({
      ...row,
      elements: row.elements.map((el) => ({
        tag: el.tag,
        text: el.text.replace(/\s+/g, ' ').trim(),
        family: el.family,
        weight: el.weight,
        style: el.style,
        color: el.color,
      })),
    }));
  assert.deepEqual(
    emphasis(results),
    emphasis(before),
    'Size migration must preserve text, family, weight, italics and color'
  );
}
console.log(`${capture ? 'Captured' : 'Preserved text styles on'} ${results.length} route/viewport combinations.`);
