import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { chromium, firefox, webkit } from 'playwright';

// V9_PREVIEW=1 build required. No build or baseline recording occurs here.
// BROWSER=chromium|firefox|webkit; TEST_BASE_URL reuses an existing preview.
const browserName = process.env.BROWSER || 'chromium';
const engines = { chromium, firefox, webkit };
const port = process.env.TEST_PORT || String(4384 + Object.keys(engines).indexOf(browserName));
const base = process.env.TEST_BASE_URL || `http://127.0.0.1:${port}`;
const output = `artifacts/v9-g1/content-reference-${browserName}`;
fs.mkdirSync(output, { recursive: true });
fs.rmSync(path.join(output, 'result.json'), { force: true });
const records = [];
const failures = [];
let browser;
let server;
const typography = [
  'fontFamily',
  'fontSize',
  'fontWeight',
  'fontStyle',
  'lineHeight',
  'letterSpacing',
  'color',
  'textTransform',
];
const article = [
  ['heading', '.bl-head h1', '.v9-article-header h1'],
  ['lead', '.bl-head .lead', '.v9-article-lead', [...typography, 'marginTop']],
  ['author name', '.bl-by > div > b', '.v9-author > div > b'],
  ['author role', '.bl-by > div > span', '.v9-author > div > span'],
  ['author date', '.bl-meta span:first-child', '.v9-author-meta time'],
  ['reading time', '.bl-meta span:last-child', '.v9-author-meta span'],
  ['author spacing', '.bl-by', '.v9-author', ['marginTop', 'gap']],
  ['metadata spacing', '.bl-meta', '.v9-author-meta', ['marginTop', 'gap']],
  ['source heading', '.fn-end > .ql', '.v9-sources h2'],
  ['source list', '.fn-end .fn-list', '.v9-sources ol'],
  ['source link', '.fn-end .fn-list li:first-child a', '.v9-sources li:first-child a'],
  ['cover issue', '.bl-head .cv-no', '.v9-article-issue'],
  ['cover numeral', '.bl-head .cv-n', '.v9-article-cover b'],
  ['cover caption', '.bl-head .cv-c', '.v9-article-caption'],
];
const testimonials = [
  ['testimonial tag', '.tm-card .tm-tag', '.v9-testimonial-tag'],
  ['testimonial quote', '.tm-card blockquote', '.v9-testimonial blockquote'],
  ['testimonial name', '.tm-card figcaption b', '.v9-testimonial figcaption b'],
  ['testimonial role', '.tm-card figcaption span', '.v9-testimonial figcaption span'],
];
const scope =
  'Final handoff cascade: article, author, sources, testimonial typography and cover mark geometry at five widths; excludes full-page parity and carousel behavior.';
const writeResult = (status, error) =>
  fs.writeFileSync(
    path.join(output, 'result.json'),
    JSON.stringify(
      { status, browser: browserName, base, records, failures, scope, ...(error ? { error: error.stack } : {}) },
      null,
      2
    )
  );
try {
  assert.ok(Object.hasOwn(engines, browserName), `Unsupported BROWSER: ${browserName}`);
  if (!process.env.TEST_BASE_URL) {
    server = spawn(
      process.execPath,
      ['node_modules/astro/bin/astro.mjs', 'preview', '--host', '127.0.0.1', '--port', port],
      { stdio: 'ignore' }
    );
    let ready = false;
    for (let attempt = 0; attempt < 120; attempt++) {
      assert.equal(server.exitCode, null, 'Preview server exited');
      try {
        ready = (await fetch(`${base}/__v9/content`, { signal: AbortSignal.timeout(1000) })).status === 200;
      } catch {
        /* starting */
      }
      if (ready) break;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    assert.ok(ready, 'Build V9_PREVIEW=1 before content reference comparisons');
  }
  browser = await engines[browserName].launch();
  const migrated = await browser.newPage({ reducedMotion: 'reduce' });
  const reference = await browser.newPage({ reducedMotion: 'reduce' });
  // Remote fonts and scripts must not influence a deterministic local comparison.
  await reference.route('**/*', (route) =>
    new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort()
  );
  await reference.goto(`${base}/__v9/content`);
  const fonts = fs
    .readFileSync('src/assets/styles/v9/fonts.css', 'utf8')
    .replaceAll("url('/", `url('${base}/`)
    .replaceAll('url("/', `url("${base}/`);
  const snapshot = (locator, properties) =>
    locator.evaluate((el, keys) => {
      const style = getComputedStyle(el);
      return Object.fromEntries(keys.map((key) => [key, style[key]]));
    }, properties);
  const compare = (record) => {
    records.push(record);
    try {
      assert.deepEqual(record.actual, record.expected);
    } catch {
      failures.push(`${record.width}px ${record.name}`);
    }
  };
  for (const width of [320, 390, 768, 1366, 1920]) {
    await migrated.setViewportSize({ width, height: 900 });
    await reference.setViewportSize({ width, height: 900 });
    const response = await migrated.goto(`${base}/__v9/content`);
    assert.equal(response.status(), 200, 'Private content fixture must exist');
    await migrated.evaluate(() => document.fonts.ready);
    for (const [file, pairs] of [
      ['blog/seventeen-interviews-one-hire.html', article],
      ['index.html', testimonials],
    ]) {
      const html = fs
        .readFileSync(`sample_data/tribera-web-handoff-v9/${file}`, 'utf8')
        .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
      await reference.setContent(html, { waitUntil: 'domcontentloaded' });
      await reference.addStyleTag({
        content: `${fonts}\n:root { --display:'V9 Fraunces',Georgia,serif; --body:'V9 Inter Tight',system-ui,sans-serif; --mono:'V9 JetBrains Mono',monospace; }`,
      });
      await reference.evaluate(() => document.fonts.ready);
      for (const page of [reference, migrated]) {
        assert.ok(
          await page.evaluate(() =>
            [...document.fonts].some((font) => font.family.includes('V9 Inter Tight') && font.status === 'loaded')
          ),
          'Pinned body font must load'
        );
      }
      for (const [name, sourceSelector, migratedSelector, properties = typography] of pairs) {
        const source = reference.locator(sourceSelector).first();
        const target = migrated.locator(migratedSelector).first();
        assert.equal(await source.count(), 1, `Missing handoff selector: ${sourceSelector}`);
        assert.equal(await target.count(), 1, `Missing migrated selector: ${migratedSelector}`);
        compare({
          width,
          name,
          file,
          sourceSelector,
          migratedSelector,
          expected: await snapshot(source, properties),
          actual: await snapshot(target, properties),
        });
      }
      if (file.startsWith('blog/')) {
        const marks = async (locator) =>
          locator.evaluateAll((elements) =>
            elements.map((el) => {
              const s = getComputedStyle(el);
              return {
                width: s.width,
                height: s.height,
                borderRadius: s.borderRadius,
                opacity: s.opacity,
                backgroundColor: s.backgroundColor,
              };
            })
          );
        const expected = await marks(reference.locator('.bl-head .cv-f i'));
        assert.equal(expected.length, 12, 'Reference cover must contain twelve marks');
        compare({
          width,
          name: 'cover marks',
          file,
          expected,
          actual: await marks(migrated.locator('.v9-article-marks i')),
        });
      }
    }
    if (failures.some((failure) => failure.startsWith(`${width}px`))) {
      await migrated.screenshot({ path: path.join(output, `${width}-failure.png`), fullPage: true });
    }
  }
  assert.equal(records.length, 95, 'All nineteen comparisons must run at all five widths');
  assert.equal(failures.length, 0, `Handoff discrepancies: ${failures.join(', ')}`);
  writeResult('passed');
  console.log(`Passed ${records.length} content reference comparisons (${browserName})`);
} catch (error) {
  writeResult('failed', error);
  throw error;
} finally {
  try {
    await browser?.close();
  } finally {
    if (server && server.exitCode === null) {
      const exited = once(server, 'exit');
      server.kill('SIGTERM');
      await exited;
    }
  }
}
