import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { chromium, firefox, webkit } from 'playwright';

const name = process.env.BROWSER || 'chromium';
const engine = { chromium, firefox, webkit }[name];
assert.ok(engine, `Unsupported browser ${name}`);
const port = 4401 + ['chromium', 'firefox', 'webkit'].indexOf(name);
const base = process.env.TEST_BASE_URL || `http://127.0.0.1:${port}`;
const hiringLinks = {
  'How it works': '/__v9/home#proof',
  Services: '/services',
  Intelligence: '/intelligence',
  About: '/__v9/about',
  'For candidates': '/__v9/candidates',
};
const candidateLinks = {
  'How it works': '/__v9/candidates#proof',
  'Your controls': '/__v9/candidates#controls',
  'What happens': '/__v9/candidates#when',
  About: '/__v9/about',
  'For hiring teams': '/__v9/home',
};
const hrefPath = async (link) => {
  const url = new URL(await link.evaluate((element) => element.href));
  assert.equal(url.origin, new URL(base).origin, 'Preview navigation must stay on the test origin');
  return url.pathname + url.hash;
};
async function assertArrived(page, destination) {
  const expected = new URL(destination, base);
  await page.waitForURL((url) => url.pathname === expected.pathname && url.hash === expected.hash);
  assert.equal(await page.locator('h1').count(), 1);
  assert.match(await page.locator('meta[name=robots]').getAttribute('content'), /noindex/);
  if (expected.hash) {
    assert.equal(await page.locator(expected.hash).count(), 1, `${destination}: target must exist`);
    await page.waitForFunction((hash) => {
      const target = document.querySelector(hash);
      if (!target) return false;
      const box = target.getBoundingClientRect();
      return box.top >= 0 && box.top < innerHeight;
    }, expected.hash);
  }
}

test(`independent private preview navigation (${name})`, async () => {
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
        assert.equal(server.exitCode, null, `Preview exited: ${log}`);
        try {
          ready = (await fetch(`${base}/__v9/home`)).status === 200;
        } catch {
          /* starting */
        }
        if (ready) break;
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
      assert.ok(ready, `Build all five G2 previews with V9_PREVIEW=1 first. ${log}`);
    }
    browser = await engine.launch();
    for (const javaScriptEnabled of [true, false]) {
      const context = await browser.newContext({ javaScriptEnabled, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      for (const slug of ['home', 'candidates', 'about', 'bfsi', 'article']) {
        const pathname = `/__v9/${slug}`;
        await page.setViewportSize({ width: 1366, height: 900 });
        assert.ok([200, 304].includes((await page.goto(`${base}${pathname}`)).status()));
        const expectedLinks = slug === 'candidates' ? candidateLinks : hiringLinks;
        const desktop = page.getByRole('navigation', { name: 'Primary', exact: true });
        assert.equal(await desktop.isVisible(), true);
        assert.equal(await desktop.getByRole('link').count(), Object.keys(expectedLinks).length);
        for (const [label, destination] of Object.entries(expectedLinks)) {
          const link = desktop.getByRole('link', { name: label, exact: true });
          assert.equal(await hrefPath(link), destination, `${slug}: desktop ${label}`);
          // Home/Candidates link to their sections; only About has a standalone current-page item.
          assert.equal(await link.getAttribute('aria-current'), destination === pathname ? 'page' : null);
        }
        assert.equal(await hrefPath(page.getByRole('link', { name: 'Tribera, home', exact: true })), '/__v9/home');
        const headerCta = page.locator('.v9-nav-cta');
        assert.equal(await hrefPath(headerCta), slug === 'candidates' ? '/__v9/candidates#apply' : '/__v9/home#start');
        await desktop.getByRole('link', { name: 'About', exact: true }).focus();
        await page.keyboard.press('Enter');
        await assertArrived(page, '/__v9/about');
        assert.equal(
          await page
            .getByRole('navigation', { name: 'Primary', exact: true })
            .getByRole('link', { name: 'About', exact: true })
            .getAttribute('aria-current'),
          'page'
        );

        await page.goto(`${base}${pathname}`);
        await page.setViewportSize({ width: 390, height: 844 });
        assert.equal(await desktop.isVisible(), false);
        const menu = page.locator('[data-v9-menu]');
        const summary = menu.locator('summary');
        await summary.focus();
        await page.keyboard.press('Enter');
        assert.equal(await menu.getAttribute('open'), '');
        const mobile = page.getByRole('navigation', { name: 'Mobile primary', exact: true });
        for (const [label, destination] of Object.entries(expectedLinks)) {
          assert.equal(
            await hrefPath(mobile.getByRole('link', { name: label, exact: true })),
            destination,
            `${slug}: mobile ${label}`
          );
        }
        if (javaScriptEnabled) {
          await page.keyboard.press('Tab');
          assert.equal(
            await mobile
              .getByRole('link')
              .first()
              .evaluate((el) => el === document.activeElement),
            true
          );
          await page.keyboard.press('Escape');
          assert.equal(await menu.getAttribute('open'), null);
          assert.equal(await summary.evaluate((el) => el === document.activeElement), true);
        } else {
          // Native disclosure supplies keyboard open/close without relying on a scripted Escape handler.
          await summary.focus();
          await page.keyboard.press('Space');
          assert.equal(await menu.getAttribute('open'), null);
        }
        await summary.focus();
        await page.keyboard.press('Enter');
        await mobile.getByRole('link', { name: 'How it works', exact: true }).focus();
        await page.keyboard.press('Enter');
        await assertArrived(page, expectedLinks['How it works']);
        if (javaScriptEnabled) assert.equal(await page.locator('[data-v9-menu]').getAttribute('open'), null);
      }

      // Complete a cross-audience journey using only native link activation and keyboard disclosure.
      await page.goto(`${base}/__v9/home`);
      for (const [label, destination] of [
        ['For candidates', '/__v9/candidates'],
        ['About', '/__v9/about'],
      ]) {
        const menu = page.locator('[data-v9-menu]');
        await menu.locator('summary').focus();
        await page.keyboard.press('Enter');
        await menu.getByRole('link', { name: label, exact: true }).focus();
        await page.keyboard.press('Enter');
        await assertArrived(page, destination);
      }
      await page.getByRole('link', { name: 'Tribera, home', exact: true }).focus();
      await page.keyboard.press('Enter');
      await assertArrived(page, '/__v9/home');
      await page.goto(`${base}/__v9/candidates`);
      await page.locator('[data-v9-menu] summary').focus();
      await page.keyboard.press('Enter');
      await page
        .getByRole('navigation', { name: 'Mobile primary', exact: true })
        .getByRole('link', { name: 'For hiring teams', exact: true })
        .focus();
      await page.keyboard.press('Enter');
      await assertArrived(page, '/__v9/home');
      assert.deepEqual(errors, [], `JS=${javaScriptEnabled}: browser errors`);
      await context.close();
    }
  } finally {
    await browser?.close();
    if (server && server.exitCode === null) {
      const exited = once(server, 'exit');
      server.kill('SIGTERM');
      await exited;
    }
  }
});
