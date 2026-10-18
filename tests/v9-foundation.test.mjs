import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { chromium, firefox, webkit } from 'playwright';

const browserName = process.env.BROWSER || 'chromium';
const engine = { chromium, firefox, webkit }[browserName];
assert.ok(engine, `Unsupported browser: ${browserName}`);
const port = 4331 + ['chromium', 'firefox', 'webkit'].indexOf(browserName);
const base = process.env.TEST_BASE_URL || `http://127.0.0.1:${port}`;

test(`v9 foundation behavior (${browserName})`, { timeout: 120000 }, async () => {
  let server;
  let browser;
  let serverLog = '';
  try {
    if (!process.env.TEST_BASE_URL) {
      server = spawn(
        process.execPath,
        ['node_modules/astro/bin/astro.mjs', 'preview', '--host', '127.0.0.1', '--port', String(port)],
        { stdio: ['ignore', 'pipe', 'pipe'] }
      );
      server.stdout.on('data', (chunk) => {
        serverLog += chunk;
      });
      server.stderr.on('data', (chunk) => {
        serverLog += chunk;
      });
      let ready = false;
      for (let attempt = 0; attempt < 120; attempt++) {
        assert.equal(server.exitCode, null, `Preview exited: ${serverLog}`);
        try {
          ready = (await fetch(`${base}/__v9/foundation`)).status === 200;
        } catch {
          /* Server is starting. */
        }
        if (ready) break;
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
      assert.ok(ready, `Preview fixture unavailable; build with V9_PREVIEW=1 first. ${serverLog}`);
    }
    browser = await engine.launch();
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    for (const width of [320, 360, 390, 768, 861, 900, 1024, 1366, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(`${base}/__v9/foundation`);
      assert.ok(
        [200, 304].includes(response.status()),
        'Preview fixture must load (including a validated cached response)'
      );
      await page.waitForFunction(() => document.fonts.status === 'loaded', null, { timeout: 15000 });
      assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow');
      assert.equal(await page.locator('.v9-hero').count(), 3);
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        true,
        `${width}px overflow`
      );
      assert.equal(
        await page
          .locator('.v9-brand img')
          .first()
          .evaluate((img) => img.complete && img.naturalWidth > 0),
        true
      );
    }
    await page.setViewportSize({ width: 390, height: 844 });
    const menu = page.locator('[data-v9-menu]');
    await menu.locator('summary').focus();
    await page.keyboard.press('Enter');
    assert.equal(await menu.getAttribute('open'), '');
    await page.keyboard.press('Escape');
    assert.equal(await menu.getAttribute('open'), null);
    await menu.locator('summary').click();
    await menu.getByRole('link', { name: 'Review components' }).click();
    assert.equal(await menu.getAttribute('open'), null);
    assert.equal(new URL(page.url()).hash, '#components');
    const faq = page.locator('.v9-faq details').first();
    await faq.locator('summary').click();
    await page.waitForFunction(() => document.querySelector('.v9-faq details').open, null, { timeout: 5000 });
    assert.equal(await faq.getAttribute('open'), '');
    await page.locator('.v9-source summary').first().click();
    assert.equal(await page.locator('.v9-source a').first().isVisible(), true);
    const edge = page.locator('.fixture-edge .v9-source');
    await edge.locator('summary').focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => {
      const panel = document.querySelector('.fixture-edge .v9-source > div').getBoundingClientRect();
      return panel.left >= 11 && panel.right <= innerWidth - 11;
    });
    await page.keyboard.press('Escape');
    assert.equal(await edge.getAttribute('open'), null);
    await page.setViewportSize({ width: 1366, height: 600 });
    await page.locator('[data-v9-reveal]').first().scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('[data-v9-reveal]').classList.contains('rv-done'));
    await page.waitForFunction(() => document.querySelector('[data-v9-reveal]').getAnimations().length === 0);
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.locator('[data-v9-reveal]').first().scrollIntoViewIfNeeded();
    assert.equal(
      await page
        .locator('[data-v9-reveal]')
        .first()
        .evaluate((el) => el.getAnimations().length),
      0,
      'Arrival must not replay'
    );
    const strip = page.locator('[data-v9-strip]');
    await strip.scrollIntoViewIfNeeded();
    await strip.locator('button').click();
    assert.equal(await strip.locator('button').getAttribute('aria-pressed'), 'true');
    assert.equal(
      await strip.locator('.v9-client-track').evaluate((el) => getComputedStyle(el).animationPlayState),
      'paused'
    );
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await strip.locator('.v9-client-track').evaluate((el) => getComputedStyle(el).animationName), 'none');
    assert.equal(await strip.locator('ul').first().locator('li').count(), 13);
    assert.equal(await strip.locator('ul[aria-hidden]').isVisible(), false);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${base}/__v9/candidate`);
    await page.locator('[data-v9-menu] summary').click();
    assert.equal(
      await page
        .getByRole('navigation', { name: 'Mobile primary' })
        .getByRole('link', { name: 'For hiring teams' })
        .getAttribute('href'),
      '/'
    );
    assert.deepEqual(errors, []);
    const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const fallback = await noJs.newPage();
    await fallback.goto(`${base}/__v9/foundation`);
    await fallback.locator('[data-v9-menu] summary').click();
    assert.equal(await fallback.locator('[data-v9-menu] nav').isVisible(), true);
    await fallback.locator('.v9-faq summary').first().click();
    assert.equal(await fallback.locator('.v9-faq details').first().getAttribute('open'), '');
    assert.equal(
      await fallback.locator('.v9-client-track').evaluate((el) => getComputedStyle(el).animationName),
      'none'
    );
    assert.equal(
      await fallback
        .locator('[data-v9-reveal]')
        .first()
        .evaluate((el) => getComputedStyle(el).opacity),
      '1'
    );
    await fallback.locator('.fixture-edge summary').click();
    assert.equal(await fallback.locator('.fixture-edge a').isVisible(), true);
    assert.equal(await fallback.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await noJs.close();
  } finally {
    await browser?.close();
    if (server && server.exitCode === null) {
      server.kill('SIGTERM');
      await once(server, 'exit');
    }
  }
});
