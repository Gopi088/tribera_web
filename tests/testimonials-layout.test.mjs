import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const source = await readFile(new URL('../src/components/home/v58/Home.astro', import.meta.url), 'utf8');
const quotes = [...source.matchAll(/\['(Hiring team|Candidate)', '(.*?)', '(.*?)', '(.*?)'\]/g)];
assert.equal(quotes.length, 3);
const browser = await chromium.launch();
try {
  for (const width of [320, 390, 768, 900, 1100, 1520]) {
    for (const reducedMotion of ['no-preference', 'reduce']) {
      const page = await browser.newPage({ viewport: { width, height: 1100 }, reducedMotion });
      await page.goto(process.env.TEST_BASE_URL || 'http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
      const section = page.locator('.v58-results');
      const cards = section.locator('figure');
      assert.equal(await cards.count(), 3);
      const alignment = await section.evaluate((element) => {
        const grid = element.querySelector('.v58-testimonials');
        return [...element.querySelectorAll('.v58-results__head h2, .v58-results__head .v58-kicker')].every(
          (heading) =>
            Math.abs(heading.getBoundingClientRect().left - grid.getBoundingClientRect().left) < 1 &&
            ['left', 'start'].includes(getComputedStyle(heading).textAlign)
        );
      });
      assert.ok(alignment, 'Testimonial heading and eyebrow align with the card grid');
      assert.equal(await section.locator('details, summary').count(), 0);
      assert.equal(await section.locator('h2').textContent(), 'What teams and candidates say.');
      for (let index = 0; index < quotes.length; index++) {
        const [, kind, quote, name, role] = quotes[index];
        const card = cards.nth(index);
        assert.equal(await card.locator('blockquote').textContent(), `“${quote}”`);
        assert.equal(await card.locator('blockquote').isVisible(), true);
        assert.equal(
          await card.locator('figcaption').evaluate((element) => getComputedStyle(element).borderTopWidth),
          '1px'
        );
        assert.equal(await card.locator('figcaption b').textContent(), name);
        assert.equal(await card.locator('figcaption span').textContent(), role);
        assert.equal(await card.locator('.v58-testimonial__tag').textContent(), kind);
      }
      const boxes = await cards.evaluateAll((elements) =>
        elements.map((element) => {
          const rect = element.getBoundingClientRect();
          for (let ancestor = element; ancestor?.closest('.v58-results'); ancestor = ancestor.parentElement) {
            const style = getComputedStyle(ancestor);
            if (style.animationName !== 'none' || style.maskImage !== 'none')
              throw new Error('Moving or masked testimonials');
          }
          return {
            x: rect.x,
            y: rect.y,
            bottom: rect.bottom,
            right: rect.right,
            fits: element.scrollWidth <= element.clientWidth,
          };
        })
      );
      assert.ok(boxes.every((box) => box.fits && box.x >= 0 && box.right <= width));
      if (width >= 1100) {
        assert.ok(boxes.every((box) => Math.abs(box.y - boxes[0].y) < 1 && Math.abs(box.bottom - boxes[0].bottom) < 1));
        assert.ok(boxes[0].x < boxes[1].x && boxes[1].x < boxes[2].x);
        assert.ok(boxes.every((box) => Math.abs(box.right - box.x - (boxes[0].right - boxes[0].x)) < 1));
      } else {
        assert.ok(boxes[0].bottom < boxes[1].y && boxes[1].bottom < boxes[2].y);
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      if ([390, 1520].includes(width) && reducedMotion === 'no-preference') {
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await section.screenshot({ path: `/tmp/testimonials-static-${width}.png` });
      }
      console.log(`${width}px / ${reducedMotion}: original quotes, static layout and bounds passed`);
      await page.close();
    }
  }
} finally {
  await browser.close();
}
