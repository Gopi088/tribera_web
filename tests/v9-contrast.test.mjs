import assert from 'node:assert/strict';
import { test } from 'node:test';
import { chromium, firefox, webkit } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4390';
const name = process.env.BROWSER || 'chromium';
const engine = { chromium, firefox, webkit }[name];
assert.ok(engine, `Unsupported browser ${name}`);

// Solid backgrounds only. Compose each group opacity *after* its content and
// background, matching the two rendered pixels (glyph and surrounding surface).
async function contrast(locator) {
  return locator.evaluate((element) => {
    const rgba = (color) => {
      const values = color.match(/[\d.]+/g)?.map(Number);
      if (!values || values.length < 3) throw new Error(`Unsupported color ${color}`);
      return [values[0], values[1], values[2], values[3] ?? 1];
    };
    const over = (fg, bg) => {
      const alpha = fg[3] + bg[3] * (1 - fg[3]);
      return [...[0, 1, 2].map((i) => (alpha ? (fg[i] * fg[3] + bg[i] * bg[3] * (1 - fg[3])) / alpha : 0)), alpha];
    };
    let glyph = rgba(getComputedStyle(element).color);
    let surface = [0, 0, 0, 0];
    const ancestors = [];
    for (let node = element; node; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (style.backgroundImage !== 'none')
        throw new Error('Gradient requires pixel/visual review, not a solid contrast assertion');
      const background = rgba(style.backgroundColor);
      const opacity = Number(style.opacity);
      glyph = over(glyph, background);
      surface = over(surface, background);
      glyph[3] *= opacity;
      surface[3] *= opacity;
      if (opacity !== 1) ancestors.push({ class: node.className, opacity });
    }
    glyph = over(glyph, [255, 255, 255, 1]);
    surface = over(surface, [255, 255, 255, 1]);
    const luminance = (color) =>
      color
        .slice(0, 3)
        .map((v) => v / 255)
        .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
        .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
    const a = luminance(glyph),
      b = luminance(surface);
    return {
      ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
      glyph: glyph.slice(0, 3),
      surface: surface.slice(0, 3),
      ancestors,
    };
  });
}
async function readable(locator, context) {
  const result = await contrast(locator);
  assert.ok(result.ratio >= 4.5, `${context}: ${JSON.stringify(result)}`);
}

test(`reviewed contrast states (${name})`, async () => {
  const browser = await engine.launch();
  try {
    const page = await browser.newPage({ reducedMotion: 'reduce' });
    for (const width of [390, 1366]) {
      await page.setViewportSize({ width, height: 900 });
      assert.ok([200, 304].includes((await page.goto(`${base}/__v9/home`)).status()));
      await page.evaluate(() => document.fonts.ready);
      const selector = '.hc-row.hc-below .hc-meta, .hc-row.hc-below .hc-pill';
      assert.equal(await page.locator(selector).count(), 4, 'Both below-bar rows retain metadata and verdicts');
      for (const label of await page.locator(selector).all())
        await readable(label, `${width}px home normal ${await label.textContent()}`);
      for (const row of await page.locator('.hc-row.hc-below').all()) {
        await row.hover();
        for (const label of await row.locator('.hc-meta,.hc-pill').all())
          await readable(label, `${width}px home hover`);
      }
      const sample = page.locator('.hc-sample b');
      await readable(sample, `${width}px sample normal`);
      await sample.hover();
      await readable(sample, `${width}px sample hover`);
      await page.keyboard.press('Tab');
      await page.locator('.hc-sample').focus();
      assert.equal(await page.locator('.hc-sample').evaluate((el) => el.matches(':focus-visible')), true);
      await readable(sample, `${width}px sample focus`);
      assert.ok([200, 304].includes((await page.goto(`${base}/__v9/article`)).status()));
      const citations = page.locator('.fn-r');
      assert.equal(await citations.count(), 2, 'Both article citations are covered');
      for (const citation of await citations.all()) {
        await page.mouse.move(0, 0);
        await citation.evaluate((el) => el.blur());
        await readable(citation, `${width}px citation normal`);
        const duration = await citation.evaluate((el) => getComputedStyle(el).transitionDuration);
        assert.ok(
          duration.split(',').every((value) => parseFloat(value) === 0),
          `Citation color inversion must not cross an unreadable transitional state: ${duration}`
        );
        await citation.hover();
        await readable(citation, `${width}px citation hover`);
        await page.mouse.move(0, 0);
        await page.keyboard.press('Tab');
        await citation.focus();
        assert.equal(await citation.evaluate((el) => el.matches(':focus-visible')), true);
        await readable(citation, `${width}px citation focus`);
        const outline = await citation.evaluate((el) => ({
          style: getComputedStyle(el).outlineStyle,
          width: parseFloat(getComputedStyle(el).outlineWidth),
        }));
        assert.ok(outline.style !== 'none' && outline.width >= 1, 'Citation keyboard focus remains visible');
      }
    }
  } finally {
    await browser.close();
  }
});
