import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4331';
const css = await readFile('src/assets/styles/content-typography.css', 'utf8');
const roles = [...css.matchAll(/([^{}]+)\{\s*font-size: var\((--type-[\w-]+)\);\s*\}/g)].map(([, selector, token]) => ({
  selector: selector.replace(/\/\*[\s\S]*?\*\//g, '').trim(),
  token,
}));
assert.equal(roles.length, 10, 'All full-text size roles are included');
async function routes(dir = 'dist') {
  const result = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const file = `${dir}/${item.name}`;
    if (item.isDirectory()) result.push(...(await routes(file)));
    else if (file.endsWith('.html') && !file.includes('/decapcms/'))
      result.push(file.replace(/^dist/, '').replace(/index\.html$/, ''));
  }
  return result;
}
const browser = await chromium.launch();
let checked = 0;
const failures = [];
try {
  for (const width of [320, 390, 768, 1520]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await page.route('**/*', (r) =>
      r.request().method() === 'GET' && r.request().url().startsWith(base) ? r.continue() : r.abort()
    );
    for (const route of await routes()) {
      await page.goto(base + route, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      const result = await page.evaluate((roles) => {
        const issues = [];
        const probe = document.createElement('span');
        document.body.append(probe);
        let count = 0;
        for (const { selector, token } of roles) {
          probe.style.fontSize = `var(${token})`;
          const target = parseFloat(getComputedStyle(probe).fontSize);
          for (const el of document.querySelectorAll(selector)) {
            if (!el.getClientRects().length) continue;
            count++;
            const actual = parseFloat(getComputedStyle(el).fontSize);
            if (Math.abs(actual - target) > 0.1)
              issues.push(`${el.className || el.tagName}: ${actual}, expected ${target}`);
          }
        }
        probe.remove();
        if (document.documentElement.scrollWidth > innerWidth + 1) issues.push('Horizontal overflow');
        return { count, issues };
      }, roles);
      checked += result.count;
      failures.push(...result.issues.map((issue) => `${route} ${width}: ${issue}`));
    }
    await page.close();
  }
} finally {
  await browser.close();
}
assert(checked > 1000, 'The site-wide roles must match actual visible content');
assert.deepEqual(failures, []);
console.log(`${checked} full-text size checks passed across all built routes at four widths.`);
