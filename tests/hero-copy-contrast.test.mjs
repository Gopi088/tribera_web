import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:8888';
function routesIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return routesIn(path);
    if (entry.name !== 'index.html' || path.includes('decapcms')) return [];
    return ['/' + relative('dist', directory).split(sep).filter(Boolean).join('/')];
  });
}

const browser = await chromium.launch();
try {
  let paragraphs = 0;
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    for (const route of routesIn('dist')) {
      await page.goto(base + route, { waitUntil: 'domcontentloaded' });
      const copy = page.locator('.site-editorial .hero .hero__p');
      for (const paragraph of await copy.all()) {
        const colors = await paragraph.evaluate((element) =>
          [element, ...element.querySelectorAll('b,strong')].map((node) => getComputedStyle(node).color)
        );
        for (const color of colors)
          assert.equal(
            color,
            'rgb(87, 86, 91)',
            `${width}px ${route}: light hero body and emphasis must use the readable grey token`
          );
        paragraphs++;
      }
    }
    await page.close();
  }
  assert.ok(paragraphs > 0, 'Must exercise rendered hero copy');
  console.log(`${paragraphs} hero paragraphs passed across built routes at mobile and desktop widths`);
} finally {
  await browser.close();
}
