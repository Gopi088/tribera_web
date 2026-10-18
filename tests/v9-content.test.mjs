import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { chromium, firefox, webkit } from 'playwright';

const browserName = process.env.BROWSER || 'chromium';
const engine = { chromium, firefox, webkit }[browserName];
assert.ok(engine, `Unsupported browser: ${browserName}`);
const port = 4341 + ['chromium', 'firefox', 'webkit'].indexOf(browserName);
const base = process.env.TEST_BASE_URL || `http://127.0.0.1:${port}`;

test(`v9 editorial content (${browserName})`, { timeout: 120000 }, async () => {
  let server;
  let browser;
  let log = '';
  try {
    if (!process.env.TEST_BASE_URL) {
      server = spawn(
        process.execPath,
        ['node_modules/astro/bin/astro.mjs', 'preview', '--host', '127.0.0.1', '--port', String(port)],
        { stdio: ['ignore', 'pipe', 'pipe'] }
      );
      server.stdout.on('data', (chunk) => {
        log += chunk;
      });
      server.stderr.on('data', (chunk) => {
        log += chunk;
      });
      let ready = false;
      for (let attempt = 0; attempt < 120; attempt++) {
        assert.equal(server.exitCode, null, log);
        try {
          ready = (await fetch(`${base}/__v9/content`)).status === 200;
        } catch {
          /* Starting. */
        }
        if (ready) break;
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
      assert.ok(ready, `Build with V9_PREVIEW=1 first. ${log}`);
    }
    browser = await engine.launch();
    for (const javaScriptEnabled of [true, false]) {
      const context = await browser.newContext({ javaScriptEnabled });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      for (const width of [320, 390, 768, 1366, 1920]) {
        await page.setViewportSize({ width, height: 900 });
        const response = await page.goto(`${base}/__v9/content`);
        assert.ok([200, 304].includes(response.status()));
        await page.waitForFunction(() => document.fonts.status === 'loaded', null, { timeout: 15000 });
        assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow');
        assert.equal(await page.locator('h1').count(), 1);
        assert.equal(
          await page.locator('.v9-article-lead').evaluate((el) => getComputedStyle(el).marginTop),
          '24px',
          'Foundation reset must preserve article lead spacing'
        );
        assert.equal(
          await page.locator('.v9-author-meta').evaluate((el) => getComputedStyle(el).marginTop),
          '6.4px',
          'Author metadata spacing must survive the shared reset'
        );
        if (javaScriptEnabled && [390, 1366].includes(width)) {
          const output = `artifacts/v9-g1/content-${browserName}`;
          fs.mkdirSync(output, { recursive: true });
          await page.locator('.v9-article-header').screenshot({ path: `${output}/${width}-article.png` });
          await page.locator('.v9-content-quotes').screenshot({ path: `${output}/${width}-testimonials.png` });
        }
        assert.match(await page.locator('h1').textContent(), /Seventeen interviews/);
        assert.equal(await page.locator('.v9-testimonial').count(), 5);
        assert.equal(await page.locator('.v9-testimonial blockquote').count(), 5);
        assert.equal(await page.locator('.v9-author time').getAttribute('datetime'), '2026-10-19');
        assert.equal(
          await page.locator('.v9-author img').evaluate((img) => img.complete && img.naturalWidth > 0),
          true
        );
        assert.equal(
          await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
          true,
          `${width}px JS=${javaScriptEnabled} overflow`
        );
        const grid = await page
          .locator('.v9-article-grid')
          .evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);
        assert.equal(grid, width <= 900 ? 1 : 2);
        const longSource = page.locator('#content-source-url a');
        assert.match(await longSource.textContent(), /^https:\/\//);
        const box = await longSource.boundingBox();
        assert.ok(box.x >= 0 && box.x + box.width <= width, 'Long source URL must remain within viewport');
        const citation = page.getByRole('link', { name: 'Read source 1', exact: true });
        await citation.focus();
        await page.keyboard.press('Enter');
        assert.equal(new URL(page.url()).hash, '#content-source-1');
        await page.locator('#content-source-1 a').focus();
        assert.equal(await page.locator('#content-source-1 a').evaluate((el) => el === document.activeElement), true);
        assert.equal(
          await page.locator('#content-source-1 a').getAttribute('href'),
          'https://www.ashbyhq.com/talent-trends-report/reports/2023-recruiter-productivity-trends-report'
        );
      }
      assert.deepEqual(errors, []);
      await context.close();
    }
    const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(`${base}/__v9/content`);
    assert.equal(await page.locator('.v9-testimonial').count(), 5);
    assert.equal(
      await page
        .locator('.v9-testimonial')
        .evaluateAll((cards) => cards.every((card) => card.getAnimations({ subtree: true }).length === 0)),
      true,
      'Static testimonials must not autoplay, including reduced motion'
    );
    await context.close();
  } finally {
    if (browser) await browser.close();
    if (server && server.exitCode === null) {
      const exited = once(server, 'exit');
      server.kill('SIGTERM');
      await exited;
    }
  }
});
