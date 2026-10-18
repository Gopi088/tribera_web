import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import * as playwright from 'playwright';
import { inventory, checkReference } from './v9-audit.mjs';

export async function browserAudit(root, evidence) {
  const name = process.env.V9_BROWSER || 'chromium';
  if (!['chromium', 'webkit', 'firefox'].includes(name)) throw new Error(`Unknown browser ${name}`);
  const base = process.env.TEST_BASE_URL || `http://127.0.0.1:${process.env.TEST_PORT || '4343'}`;
  const pages = inventory(root),
    errors = [];
  const routes = ['/', '/candidates', '/contact', '/careers', '/services', '/blog', '/industries'];
  if (pages.has('/__v9/foundation') || process.env.V9_REQUIRE_FOUNDATION === '1') routes.push('/__v9/foundation');
  const server = process.env.TEST_BASE_URL
    ? null
    : spawn(
        process.execPath,
        [
          'node_modules/astro/bin/astro.mjs',
          'preview',
          '--host',
          '127.0.0.1',
          '--port',
          process.env.TEST_PORT || '4343',
        ],
        { stdio: ['ignore', 'pipe', 'pipe'] }
      );
  const serverLog = fs.createWriteStream(path.join(evidence, `${name}-server.log`));
  server?.stdout.pipe(serverLog);
  server?.stderr.pipe(serverLog);
  let browser,
    checks = 0,
    renderedReferences = 0;
  let activeContext, activeTracePath;
  try {
    let ready = false;
    for (let i = 0; i < 60; i++) {
      if (server && server.exitCode !== null) throw new Error('Preview exited before ready');
      try {
        ready = (await fetch(base, { signal: AbortSignal.timeout(1000) })).ok;
      } catch {
        /* startup */
      }
      if (ready) break;
      await delay(500);
    }
    if (!ready) throw new Error('Preview unavailable');
    browser = await playwright[name].launch();
    for (const width of [390, 1366]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      activeContext = context;
      activeTracePath = path.join(evidence, `${name}-${width}-trace.zip`);
      await context.tracing.start({ screenshots: true, snapshots: true });
      const page = await context.newPage();
      page.on('pageerror', (error) => errors.push(`${page.url()}: ${error.message}`));
      for (const route of routes) {
        const response = await page.goto(base + route, { waitUntil: 'networkidle' });
        checks++;
        if (!response?.ok()) errors.push(`${route}: HTTP ${response?.status()}`);
        if (!(await page.title())) errors.push(`${route}: empty title`);
        if (!(await page.locator('h1').count())) errors.push(`${route}: missing h1`);
        if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2))
          errors.push(`${route}: horizontal overflow at ${width}`);
        const refs = await page
          .locator('a[href], img[src], script[src], link[href]')
          .evaluateAll((els) => els.map((el) => el.getAttribute('href') || el.getAttribute('src')).filter(Boolean));
        if (!refs.length) errors.push(`${route}: empty rendered link coverage`);
        for (const href of refs) {
          renderedReferences++;
          // Collect generated IDs for in-page anchors before checking the build inventory.
          const url = new URL(href, page.url());
          if (
            url.origin === new URL(base).origin &&
            url.pathname.replace(/\/$/, '') === route.replace(/\/$/, '') &&
            url.hash
          ) {
            const id = decodeURIComponent(url.hash.slice(1));
            if (
              await page.evaluate((id) => !!document.getElementById(id) || !!document.getElementsByName(id).length, id)
            )
              continue;
          }
          const error = checkReference(root, pages, route + (route === '/' ? '' : '/'), href, new URL(base).origin);
          if (error) errors.push(`${route} rendered: ${error}`);
        }
        await page.screenshot({
          path: path.join(evidence, `${name}-${width}-${route.replaceAll('/', '_') || 'home'}.png`),
          fullPage: true,
        });
      }
      await context.tracing.stop({ path: path.join(evidence, `${name}-${width}-trace.zip`) });
      await context.close();
      activeContext = null;
    }
    return {
      browser: name,
      expectedChecks: routes.length * 2,
      executedChecks: checks,
      renderedReferences,
      routes,
      viewports: [390, 1366],
      errors,
    };
  } finally {
    if (activeContext) {
      // Preserve diagnostics when navigation or an assertion throws; cleanup must
      // not replace the original failure with a secondary trace/close error.
      await activeContext.tracing.stop({ path: activeTracePath }).catch((error) => {
        serverLog.write(`Unable to save failure trace: ${error.message}\n`);
      });
    }
    await browser?.close().catch((error) => {
      serverLog.write(`Unable to close browser: ${error.message}\n`);
    });
    server?.kill();
    serverLog.end();
  }
}
