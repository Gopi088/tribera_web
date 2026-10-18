import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { gzipSync } from 'node:zlib';
import { chromium, firefox, webkit } from 'playwright';
import { checkPageBudget } from '../scripts/v9-performance.mjs';
import { waitForFonts, waitForPageCondition } from '../scripts/v9-browser-readiness.mjs';

const name = process.env.BROWSER || 'chromium';
const engines = { chromium, firefox, webkit };
assert.ok(Object.hasOwn(engines, name), `Unknown browser ${name}`);
const port = process.env.TEST_PORT || '4390';
const base = process.env.TEST_BASE_URL || `http://127.0.0.1:${port}`;
const output = path.resolve(`artifacts/v9-g2/pages-${name}`);
const handoff = path.resolve('sample_data/tribera-web-handoff-v9');
const pages = [
  ['home', 'index.html'],
  ['candidates', 'candidates.html'],
  ['about', 'about.html'],
  ['bfsi', 'industries/banking-financial-services.html'],
  ['article', 'blog/seventeen-interviews-one-hire.html'],
];
const widths = name === 'chromium' ? [320, 360, 390, 600, 768, 830, 1024, 1366, 1600, 1920, 2560] : [390, 768, 1366];
const report = {
  status: 'failed',
  browser: name,
  widths,
  records: [],
  errors: [],
  scope:
    'Private representative pages: content headings, responsive overflow, loaded images, no-JS, reduced motion, screenshots and transfer measurements. Screenshots require separate visual review; local requests do not certify Netlify delivery.',
};
fs.mkdirSync(output, { recursive: true });
fs.rmSync(path.join(output, 'result.json'), { force: true });
let server, browser;
try {
  if (!process.env.TEST_BASE_URL) {
    server = spawn(
      process.execPath,
      ['node_modules/astro/bin/astro.mjs', 'preview', '--host', '127.0.0.1', '--port', port],
      { stdio: 'ignore' }
    );
    let ready = false;
    for (let attempt = 0; attempt < 120; attempt++) {
      assert.equal(server.exitCode, null, 'Preview exited');
      try {
        ready = (await fetch(`${base}/__v9/home`)).status === 200;
      } catch {
        /* starting */
      }
      if (ready) break;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    assert.ok(ready, 'Build all five G2 previews with V9_PREVIEW=1 first');
  }
  browser = await engines[name].launch();
  const reference = await browser.newPage({ reducedMotion: 'reduce' });
  const fonts = fs.readFileSync('src/assets/styles/v9/fonts.css', 'utf8');
  await reference.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.origin !== new URL(base).origin) return route.abort();
    if (!url.pathname.startsWith('/__handoff/')) return route.continue();
    const file = path.resolve(handoff, decodeURIComponent(url.pathname.slice('/__handoff/'.length)));
    if (!file.startsWith(handoff + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile())
      return route.fulfill({ status: 404, body: 'Missing reference asset' });
    if (!file.endsWith('.html')) return route.fulfill({ path: file });
    const html = fs
      .readFileSync(file, 'utf8')
      .replace(
        '</head>',
        `<style>${fonts}\n:root { --display:'V9 Fraunces',Georgia,serif; --body:'V9 Inter Tight',system-ui,sans-serif; --mono:'V9 JetBrains Mono',monospace; }\n/* Static comparison repairs reference-only hidden arrivals/infinite motion. */ .rv {opacity:1!important;transform:none!important;} *,*::before,*::after {animation-iteration-count:1!important;animation-duration:0s!important;transition-duration:0s!important;}</style></head>`
      );
    return route.fulfill({ contentType: 'text/html', body: html });
  });
  const normalizedHeadings = (page) =>
    page.locator('h1,h2').evaluateAll((els) => els.map((el) => el.innerText.replace(/\s+/g, ' ').trim()));
  for (const [slug, file] of pages) {
    await reference.goto(`${base}/__handoff/${file}`, { waitUntil: 'networkidle' });
    const expectedHeadings = await normalizedHeadings(reference);
    assert.ok(expectedHeadings.length > 1, `${slug}: reference heading coverage must not be empty`);
    for (const javaScriptEnabled of [true, false]) {
      const context = await browser.newContext({ javaScriptEnabled, reducedMotion: 'reduce' });
      const page = await context.newPage();
      if (javaScriptEnabled)
        await page.addInitScript(() => {
          window.__v9Metrics = { layoutShift: 0, longTasks: [], supported: PerformanceObserver.supportedEntryTypes };
          if (PerformanceObserver.supportedEntryTypes.includes('layout-shift'))
            new PerformanceObserver((list) => {
              for (const entry of list.getEntries())
                if (!entry.hadRecentInput) window.__v9Metrics.layoutShift += entry.value;
            }).observe({ type: 'layout-shift', buffered: true });
          if (PerformanceObserver.supportedEntryTypes.includes('longtask'))
            new PerformanceObserver((list) => {
              window.__v9Metrics.longTasks.push(...list.getEntries().map((entry) => entry.duration));
            }).observe({ type: 'longtask', buffered: true });
        });
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      const sizes = javaScriptEnabled
        ? widths.map((width) => ({ width, height: 900 }))
        : [
            { width: 390, height: 844 },
            { width: 1366, height: 900 },
          ];
      if (javaScriptEnabled) sizes.push({ width: 1024, height: 600 });
      for (const size of sizes) {
        await page.setViewportSize(size);
        const response = await page.goto(`${base}/__v9/${slug}`, { waitUntil: 'networkidle' });
        assert.ok([200, 304].includes(response?.status()), `${slug} must exist`);
        await waitForFonts(page, { timeout: 15000 });
        assert.equal(await page.locator('h1').count(), 1, `${slug}: one h1`);
        assert.match(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex/);
        assert.equal(await page.locator('link[rel="canonical"]').count(), 0);
        const headings = await normalizedHeadings(page);
        for (const heading of expectedHeadings)
          assert.ok(headings.includes(heading), `${slug}: missing source heading ${heading}`);
        assert.ok(
          await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
          `${slug} ${JSON.stringify(size)} JS=${javaScriptEnabled}: overflow`
        );
        // Scroll through the entire page to load below-fold images before inspection.
        // Browser-scheduled callbacks are unavailable with JavaScript disabled.
        // Drive scrolling from Node so the same image checks exercise native fallback.
        const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
        assert.ok(pageHeight < 70000, `${slug}: unexpected unbounded document height`);
        for (let y = 0; y < pageHeight; y += 700) {
          await page.evaluate((top) => scrollTo(0, top), y);
          await new Promise((resolve) => setTimeout(resolve, 20));
        }
        await page.evaluate(() => scrollTo(0, 0));
        await waitForPageCondition(page, () => [...document.images].every((image) => image.complete), null, {
          timeout: 15000,
        });
        assert.deepEqual(
          await page
            .locator('img')
            .evaluateAll((images) => images.filter((img) => !img.naturalWidth).map((img) => img.src)),
          [],
          `${slug}: broken images`
        );
        const infinite = await page.evaluate(
          () =>
            document
              .getAnimations()
              .filter(
                (animation) =>
                  animation.playState === 'running' && animation.effect?.getTiming().iterations === Infinity
              ).length
        );
        assert.equal(infinite, 0, `${slug}: reduced motion must stop infinite animations`);
        const record = { slug, ...size, javaScriptEnabled, headingCount: headings.length };
        if (javaScriptEnabled && size.height === 900 && [390, 768, 1024, 1366, 1920].includes(size.width)) {
          const prefix = `${slug}-${size.width}`;
          await page.screenshot({ path: path.join(output, `${prefix}-migrated.png`), fullPage: true });
          await reference.setViewportSize(size);
          await reference.goto(`${base}/__handoff/${file}`, { waitUntil: 'networkidle' });
          await waitForFonts(reference, { timeout: 15000 });
          await reference.screenshot({ path: path.join(output, `${prefix}-handoff.png`), fullPage: true });
          record.screenshots = [`${prefix}-migrated.png`, `${prefix}-handoff.png`];
        }
        if (javaScriptEnabled && size.width === 1366) {
          const urls = await page.evaluate(() => [
            location.href,
            ...performance.getEntriesByType('resource').map((entry) => entry.name),
          ]);
          const transfers = [];
          for (const url of [...new Set(urls)].filter((url) => url.startsWith(base))) {
            const resource = await fetch(url);
            assert.ok(resource.ok, `Transfer measurement ${url}: ${resource.status}`);
            const bytes = Buffer.from(await resource.arrayBuffer());
            transfers.push({
              path: new URL(url).pathname,
              bytes: bytes.length,
              gzipBytes: gzipSync(bytes).length,
              contentType: resource.headers.get('content-type'),
            });
          }
          record.transfers = transfers;
          record.budgetTotals = checkPageBudget(
            slug,
            transfers,
            JSON.parse(fs.readFileSync('tests/fixtures/v9-page-budgets.json', 'utf8'))
          );
          record.observedPerformance = await page.evaluate(() => window.__v9Metrics);
          // Collect long source paragraphs to make full-copy omissions reviewable.
          // This is evidence, not an automatic equivalence claim for interactive copy.
          const sourceParagraphs = await reference
            .locator('p,blockquote')
            .evaluateAll((els) =>
              els.map((el) => el.textContent.replace(/\s+/g, ' ').trim()).filter((text) => text.length >= 100)
            );
          const actualText = await page.locator('body').textContent();
          const normalized = actualText.replace(/\s+/g, ' ').trim();
          record.contentComparison = {
            sourceParagraphCount: sourceParagraphs.length,
            missingParagraphs: sourceParagraphs.filter((paragraph) => !normalized.includes(paragraph)),
          };
        }
        report.records.push(record);
      }
      assert.deepEqual(errors, [], `${slug}: browser errors`);
      await context.close();
    }
  }
  report.status = 'passed';
} catch (error) {
  report.errors.push(error.stack);
  throw error;
} finally {
  fs.writeFileSync(path.join(output, 'result.json'), JSON.stringify(report, null, 2) + '\n');
  await browser?.close();
  if (server && server.exitCode === null) {
    const exited = once(server, 'exit');
    server.kill('SIGTERM');
    await exited;
  }
}
console.log(`${name}: ${report.records.length} representative page checks passed`);
