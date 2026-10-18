import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { chromium, firefox, webkit } from 'playwright';

// Run against the already-built private preview; compare the final cascade, not an early CSS block.
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4380';
const browserName = process.env.BROWSER || 'chromium';
let server;
const browser = await { chromium, firefox, webkit }[browserName].launch();
const output = `artifacts/v9-g1/reference-${browserName}`;
fs.mkdirSync(output, { recursive: true });
fs.rmSync(path.join(output, 'result.json'), { force: true });
const records = [];
try {
  if (!process.env.TEST_BASE_URL) {
    server = spawn(
      process.execPath,
      ['node_modules/astro/bin/astro.mjs', 'preview', '--host', '127.0.0.1', '--port', '4380'],
      { stdio: 'ignore' }
    );
    let ready = false;
    for (let attempt = 0; attempt < 120; attempt++) {
      assert.equal(server.exitCode, null, 'Preview server exited');
      try {
        ready = (await fetch(`${base}/__v9/foundation`)).status === 200;
      } catch {
        /* starting */
      }
      if (ready) break;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    assert.ok(ready, 'Build V9_PREVIEW=1 before reference comparisons');
  }
  const migrated = await browser.newPage({ reducedMotion: 'reduce' });
  const reference = await browser.newPage({ reducedMotion: 'reduce' });
  await reference.route('https://**/*', (route) => route.abort());
  await reference.goto(`${base}/__v9/foundation`);
  const fonts = fs
    .readFileSync('src/assets/styles/v9/fonts.css', 'utf8')
    .replaceAll("url('/", `url('${base}/`)
    .replaceAll('url("/', `url("${base}/`);
  const properties = ['fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'fontFamily'];
  const snapshot = (locator) =>
    locator.evaluate((el, properties) => {
      const style = getComputedStyle(el);
      return Object.fromEntries(properties.map((key) => [key, style[key]]));
    }, properties);
  for (const width of [320, 360, 390, 768, 1024, 1366, 1920]) {
    await migrated.setViewportSize({ width, height: 900 });
    await reference.setViewportSize({ width, height: 900 });
    await migrated.goto(`${base}/__v9/foundation`);
    await migrated.evaluate(() => document.fonts.ready);
    assert.ok(
      await migrated.evaluate(() =>
        [...document.fonts].some((face) => face.family.includes('V9 Fraunces') && face.status === 'loaded')
      ),
      'Pinned Fraunces must load'
    );
    for (const [file, variant] of [
      ['index', 'product'],
      ['about', 'editorial'],
      ['contact', 'compact'],
    ]) {
      const html = fs
        .readFileSync(`sample_data/tribera-web-handoff-v9/${file}.html`, 'utf8')
        .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
      await reference.setContent(html, { waitUntil: 'domcontentloaded' });
      await reference.addStyleTag({
        content: `${fonts}\n:root { --display: 'V9 Fraunces', Georgia, serif; --body: 'V9 Inter Tight', system-ui, sans-serif; --mono: 'V9 JetBrains Mono', monospace; }`,
      });
      await reference.evaluate(() => document.fonts.ready);
      const expected = await snapshot(reference.locator('h1').first());
      const actual = await snapshot(migrated.locator(`.v9-hero-${variant} h1`));
      const referenceGrid = reference
        .locator(variant === 'product' ? '.hero-two' : variant === 'editorial' ? '.hx-row' : '.hx-c-g')
        .first();
      const migratedGrid = migrated.locator(
        variant === 'editorial' ? '.v9-editorial-row' : `.v9-hero-${variant} .v9-hero-grid`
      );
      const gridSnapshot = (locator) =>
        locator.evaluate((el) => {
          const s = getComputedStyle(el);
          return { columns: s.gridTemplateColumns, gap: s.gap };
        });
      const expectedGrid = await gridSnapshot(referenceGrid);
      const actualGrid = await gridSnapshot(migratedGrid);
      assert.deepEqual(actualGrid, expectedGrid, `${browserName} ${width}px ${variant}: final handoff column geometry`);
      if (variant === 'editorial') {
        const boxStyle = (locator) =>
          locator.evaluate((el) => {
            const s = getComputedStyle(el);
            return {
              marginTop: s.marginTop,
              paddingTop: s.paddingTop,
              borderTopWidth: s.borderTopWidth,
              lineHeight: s.lineHeight,
            };
          });
        assert.deepEqual(
          await boxStyle(migrated.locator('.v9-hero-editorial .v9-hero-aside')),
          await boxStyle(reference.locator('.hx-side')),
          'Editorial aside must not repeat the row rule or spacing'
        );
      }
      if (variant === 'compact' && width > 860) {
        const offset = (page, heading, aside) =>
          page.evaluate(
            ({ heading, aside }) =>
              document.querySelector(aside).getBoundingClientRect().top -
              document.querySelector(heading).getBoundingClientRect().top,
            { heading, aside }
          );
        assert.ok(
          Math.abs(
            (await offset(migrated, '.v9-hero-compact h1', '.v9-hero-compact aside')) -
              (await offset(reference, '.hx h1', '.hx-c-g > aside'))
          ) < 1,
          'Compact supporting card aligns below the eyebrow'
        );
      }
      const expectedLead = await snapshot(
        reference.locator(variant === 'product' ? '.hero-two .lead' : '.hx .lead').first()
      );
      const actualLead = await snapshot(migrated.locator(`.v9-hero-${variant} .v9-lead`));
      assert.deepEqual(actualLead, expectedLead, `${browserName} ${width}px ${variant}: handoff lead typography`);
      records.push({ width, variant, expected, actual, expectedGrid, actualGrid, expectedLead, actualLead });
      assert.deepEqual(actual, expected, `${browserName} ${width}px ${variant}: final handoff typography`);
      if (width === 390 || width === 1366) {
        await migrated
          .locator(`.v9-hero-${variant}`)
          .screenshot({ path: path.join(output, `${width}-${variant}-migrated.png`) });
        const hero = reference.locator(file === 'index' ? '.hero-c' : '.hx').first();
        await hero.screenshot({ path: path.join(output, `${width}-${variant}-handoff.png`) });
      }
    }
  }
  fs.writeFileSync(
    path.join(output, 'result.json'),
    JSON.stringify(
      {
        status: 'passed',
        browser: browserName,
        records,
        scope:
          'Heading typography from final handoff cascade; screenshots preserve distinct page content. Full-page parity is G2.',
      },
      null,
      2
    )
  );
  console.log(`Passed ${records.length} final-cascade typography comparisons (${browserName})`);
} catch (error) {
  fs.writeFileSync(
    path.join(output, 'result.json'),
    JSON.stringify({ status: 'failed', browser: browserName, records, error: error.stack }, null, 2)
  );
  throw error;
} finally {
  await browser.close();
  if (server && server.exitCode === null) {
    server.kill('SIGTERM');
    await once(server, 'exit');
  }
}
