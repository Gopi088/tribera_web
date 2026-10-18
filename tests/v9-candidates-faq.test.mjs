import assert from 'node:assert/strict';
import fs from 'node:fs';
import { test } from 'node:test';
import { chromium, firefox, webkit } from 'playwright';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4391';
const engine = process.env.BROWSER || 'chromium';

test(`candidate FAQ source styling and native no-JS disclosure (${engine})`, async () => {
  const browser = await { chromium, firefox, webkit }[engine].launch();
  try {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    const reference = await context.newPage();
    await reference.goto(`${base}/__v9/candidates`);
    const html = fs
      .readFileSync('sample_data/tribera-web-handoff-v9/candidates.html', 'utf8')
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<link\b[^>]*>/gi, '');
    const fonts = fs.readFileSync('src/assets/styles/v9/fonts.css', 'utf8').replaceAll("url('/", `url('${base}/`);
    const fontStyle = `${fonts}\n:root { --display:'V9 Fraunces',Georgia,serif; --body:'V9 Inter Tight',system-ui,sans-serif; --mono:'V9 JetBrains Mono',monospace; }`;
    const styles = async (target, selector, properties) =>
      target
        .locator(selector)
        .first()
        .evaluate((el, properties) => {
          const css = getComputedStyle(el);
          return Object.fromEntries(properties.map((key) => [key, css[key]]));
        }, properties);
    for (const width of [390, 768, 900, 1366]) {
      await page.setViewportSize({ width, height: 900 });
      await reference.setViewportSize({ width, height: 900 });
      await page.goto(`${base}/__v9/candidates`);
      await reference.setContent(html, { waitUntil: 'domcontentloaded' });
      await reference.addStyleTag({ content: fontStyle });
      await Promise.all([page.evaluate(() => document.fonts.ready), reference.evaluate(() => document.fonts.ready)]);
      const details = page.locator('.faq-list details');
      assert.equal(await details.count(), 7);
      assert.equal(await details.first().getAttribute('open'), '');
      assert.equal(await page.locator('.faq-list details[open]').count(), 1);
      for (const [selector, props] of [
        ['.faq-top', ['gridTemplateColumns', 'gap']],
        ['.faq-aside h2', ['fontSize', 'fontWeight', 'lineHeight', 'maxWidth', 'marginTop']],
        [
          '.faq-q',
          [
            'fontFamily',
            'fontSize',
            'fontWeight',
            'letterSpacing',
            'lineHeight',
            'height',
            'paddingTop',
            'paddingBottom',
          ],
        ],
        ['.faq-a p', ['fontFamily', 'fontSize', 'lineHeight', 'paddingBottom']],
      ]) {
        assert.deepEqual(
          await styles(page, selector, props),
          await styles(reference, selector, props),
          `${width}px ${selector} source styles`
        );
      }
      assert.equal(
        await page
          .locator('.faq-q')
          .first()
          .evaluate((el) => getComputedStyle(el).listStyleType),
        'none'
      );
      assert.equal(
        await page
          .locator('.faq-ic')
          .first()
          .evaluate((el) => getComputedStyle(el, '::after').opacity),
        '0'
      );
      assert.equal(await details.first().locator('.faq-a p').isVisible(), true);
      await details.nth(1).locator('summary').click();
      assert.equal(await details.nth(1).getAttribute('open'), '');
      assert.equal(await details.first().getAttribute('open'), null);
      assert.equal(await details.nth(1).locator('.faq-a p').isVisible(), true);
      await details.nth(1).locator('summary').press('Enter');
      assert.equal(await details.nth(1).getAttribute('open'), null);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    }
    const nojsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const nojs = await nojsContext.newPage();
    await nojs.goto(`${base}/__v9/candidates`);
    const disclosures = nojs.locator('.faq-list details');
    assert.equal(await disclosures.first().getAttribute('open'), '');
    await disclosures.nth(1).locator('summary').click();
    assert.equal(await disclosures.first().getAttribute('open'), null);
    assert.equal(await disclosures.nth(1).locator('.faq-a p').isVisible(), true);
    await disclosures.nth(1).locator('summary').press('Enter');
    assert.equal(await disclosures.nth(1).getAttribute('open'), null);
  } finally {
    await browser.close();
  }
});
