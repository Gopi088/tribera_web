import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const stage = process.argv[2] || 'current';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4322';
const out = path.resolve(`artifacts/industries-comparison-review/${stage}`);
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const results = [];
try {
  for (const width of [320, 390, 768, 1520, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await page.route('**/*', (request) =>
      request.request().url().startsWith(base) && request.request().method() === 'GET'
        ? request.continue()
        : request.abort()
    );
    await page.goto(`${base}/industries/`, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.locator('#secB').waitFor({ state: 'visible' });
    await page.locator('#secB').selectOption('product-saas');
    await page.evaluate(() => document.querySelectorAll('[data-rv]').forEach((el) => el.classList.add('in')));
    await page.screenshot({ path: `${out}/viewport-${width}.png` });
    await page.locator('.hero__card').screenshot({ path: `${out}/card-${width}.png` });
    results.push(
      await page.evaluate((width) => {
        const card = document.querySelector('.cmpw');
        const grid = document.querySelector('.cmpw__sel');
        const selects = [...document.querySelectorAll('.cmpw__sel select')];
        return {
          width,
          pageOverflow: document.documentElement.scrollWidth > innerWidth + 1,
          card: card?.getBoundingClientRect().toJSON(),
          selectorArea: grid?.getBoundingClientRect().toJSON(),
          selects: selects.map((select) => {
            const rect = select.getBoundingClientRect();
            const style = getComputedStyle(select);
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
            const label = select.options[select.selectedIndex].text;
            const optionWidths = [...select.options].map((option) => context.measureText(option.text).width);
            return {
              id: select.id,
              label,
              width: rect.width,
              availableTextWidth: rect.width - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight),
              measuredTextWidth: context.measureText(label).width,
              maxOptionTextWidth: Math.max(...optionWidths),
              disabled: select.disabled,
            };
          }),
        };
      }, width)
    );
    await page.close();
  }
} finally {
  await browser.close();
}
fs.writeFileSync(`${out}/measurements.json`, JSON.stringify(results, null, 2));
console.log(`${results.length} widths captured; ${results.filter((r) => r.pageOverflow).length} overflow`);
