import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium, firefox, webkit } from 'playwright';
import { waitForFonts } from '../scripts/v9-browser-readiness.mjs';

const name = process.env.BROWSER || 'chromium';
const base = process.env.TEST_BASE_URL || 'http://localhost:4390';
const data = JSON.parse(fs.readFileSync('src/data/v9/sectors.json', 'utf8'));
const original = JSON.parse(fs.readFileSync('sample_data/tribera-web-handoff-v9/data/sectors.json', 'utf8'));
const sample = JSON.parse(fs.readFileSync('src/data/v9/intelligence.json', 'utf8'));
const out = `artifacts/v9-sectors/${name}`;
fs.mkdirSync(out, { recursive: true });
const report = { status: 'failed', browser: name, base, records: [], errors: [] };
fs.writeFileSync(`${out}/result.json`, JSON.stringify(report, null, 2));
const routes = [
  ['industries', 'industries/index.html'],
  ...data.sectors.map((s) => [`industries/${s.slug}`, `industries/${s.slug}.html`]),
  ['intelligence', 'intelligence.html'],
];
const normalize = (text) =>
  text
    .replace(/\bdimensions\b/g, 'skills')
    .replace(/\brubric\b/g, 'scorecard')
    .replace(/\bmandates\b/g, 'searches')
    .replace(/\s+/g, ' ')
    .trim();
let browser;
try {
  assert.equal(data.sectors.length, 12);
  assert.deepEqual(data.dimensions, original.dimensions);
  for (const sector of data.sectors) {
    assert.deepEqual(sector.weights, original.sectors.find((s) => s.slug === sector.slug).weights);
    assert.equal(
      Object.values(sector.weights).reduce((a, b) => a + b, 0),
      100
    );
  }
  assert.equal(sample.sample, true);
  assert.equal(sample.functions.length, 8);
  for (const fn of sample.functions)
    assert.equal(
      fn.v.reduce((a, b) => a + b, 0),
      100
    );
  browser = await { chromium, firefox, webkit }[name].launch();
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  for (const [route, source] of routes) {
    await page.setViewportSize({ width: 1366, height: 900 });
    const response = await page.goto(`${base}/__v9/${route}`);
    // Firefox can expose a cache revalidation response on repeat navigation.
    // The content and page-state assertions below still verify the rendered page.
    assert.ok([200, 304].includes(response.status()), `${route}: HTTP ${response.status()}`);
    await page.locator('.v9-editorial[data-ready=true]').waitFor();
    const sourceHtml = fs.readFileSync(path.join('sample_data/tribera-web-handoff-v9', source), 'utf8');
    const sourceContent = await page.evaluate((html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      doc.querySelectorAll('header.nav,footer,script,style').forEach((n) => n.remove());
      doc.querySelectorAll('br').forEach((n) => n.replaceWith(' '));
      return [...doc.querySelectorAll('h1,h2,p')]
        .filter((n) => n.tagName !== 'P' || n.textContent.trim().length > 100)
        .map((n) => n.textContent);
    }, sourceHtml);
    const content = normalize(
      await page.locator('main').evaluate((main) => {
        const clone = main.cloneNode(true);
        clone.querySelectorAll('br').forEach((n) => n.replaceWith(' '));
        return clone.textContent;
      })
    );
    for (const text of sourceContent)
      assert.ok(content.includes(normalize(text)), `${route} missing source content: ${text.slice(0, 100)}`);
    assert.equal(await page.locator('h1').count(), 1);
    assert.match(await page.locator('meta[name=robots]').getAttribute('content'), /noindex/);
    assert.equal(await page.locator('link[rel=canonical]').count(), 0);
    if (route.startsWith('industries/')) {
      const sector = data.sectors.find((s) => route.endsWith('/' + s.slug));
      assert.deepEqual(
        await page.locator('.ix-bars b').allTextContents(),
        Object.values(sector.weights).map((v) => `${v}%`)
      );
      assert.equal(
        await page.locator('.ix-cmp[aria-selected=true]').getAttribute('data-s'),
        sector.copy.comparisonSlug
      );
      assert.equal(await page.locator('.ix-miss>li').count(), sector.misses.length);
      assert.equal(await page.locator('.ix-q').count(), sector.questions.length);
      assert.equal(await page.locator('.faq-item').count(), sector.faq.length);
      assert.equal(
        await page.locator('header .btn-primary').getAttribute('href'),
        `/__v9/contact?sector=${sector.slug}`
      );
      for (const other of data.sectors.filter((s) => s.slug !== sector.slug)) {
        await page.locator(`.ix-cmp[data-s="${other.slug}"]`).click();
        assert.deepEqual(await page.locator('#ixC .ix-b').allTextContents(), Object.values(other.weights).map(String));
        assert.deepEqual(await page.locator('#ixC .ix-a').allTextContents(), Object.values(sector.weights).map(String));
        assert.equal(
          await page.locator('.ix-panel').getAttribute('aria-labelledby'),
          await page.locator('.ix-cmp[aria-selected=true]').getAttribute('id')
        );
      }
      const first = page.locator('.ix-cmp').first();
      await first.focus();
      await page.keyboard.press('End');
      assert.equal(await page.locator('.ix-cmp').last().getAttribute('aria-selected'), 'true');
      await page.locator('.faq-item').last().locator('summary').click();
      await page.waitForFunction(() => document.querySelectorAll('.faq-item[open]').length === 1);
      assert.equal(await page.locator('.faq-item[open]').count(), 1);
      await page.locator('.fn-r').click();
      await page.locator('.v9-citation-preview').waitFor();
      await page.keyboard.press('Escape');
    } else if (route === 'industries') {
      assert.equal(await page.locator('.ii-c').count(), 12);
      for (const sector of data.sectors) {
        await page.locator(`.ii-k[data-s="${sector.slug}"]`).click();
        assert.equal(await page.locator('.ii-line.on').getAttribute('data-s'), sector.slug);
        for (const skill of data.dimensions)
          assert.ok(
            (await page.locator('#industry-values').textContent()).includes(`${skill} ${sector.weights[skill]}%`)
          );
        assert.equal(await page.locator(`.ii-c[href="/__v9/industries/${sector.slug}"]`).count(), 1);
      }
      await page.locator('.ii-c').first().hover();
      assert.equal(await page.locator('.ii-line.on').getAttribute('data-s'), data.sectors[0].slug);
    } else {
      for (let i = 0; i < sample.functions.length; i++) {
        await page.locator(`.in-fn[data-i="${i}"]`).click();
        assert.equal(await page.locator('#inFnName').textContent(), sample.functions[i].n);
        assert.deepEqual(
          await page.locator('#inBars b').allTextContents(),
          sample.functions[i].v.map((v) => `${v}%`)
        );
        assert.match(await page.locator('.in-tag').textContent(), /Illustrative.*sample data/);
      }
      assert.equal(await page.locator('.in-sub input, .in-sub button').count(), 0);
      assert.equal(await page.locator('.in-sub a.btn').getAttribute('href'), '/blog#sub');
      assert.match(await page.locator('#intelligence-subscription-status').textContent(), /not available yet/);
    }
    const widths = name === 'chromium' ? [320, 390, 768, 1366, 1920] : [390, 1366];
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${base}/__v9/${route}`);
      await waitForFonts(page);
      const geometry = await page.evaluate(() => ({
        viewport: innerWidth,
        width: document.documentElement.scrollWidth,
        broken: [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src),
      }));
      assert.ok(geometry.width <= width + 1, `${route} overflow at ${width}: ${geometry.width}`);
      assert.deepEqual(geometry.broken, []);
      await page.screenshot({ path: `${out}/${route.replaceAll('/', '-')}-${width}.png`, fullPage: true });
      report.records.push({ route, width, mode: 'reduced', status: 'passed' });
    }
  }
  await page.goto(`${base}/__v9/industries/global-capability-centres`);
  await page.waitForURL('**/__v9/industries/global-capability-centers');
  await page.locator('h1').waitFor();
  assert.equal(
    (await page.locator('h1').textContent()).trim(),
    data.sectors.find((s) => s.slug === 'global-capability-centers').h1
  );
  report.records.push({ route: 'industries/global-capability-centres', mode: 'preview alias', status: 'passed' });
  assert.deepEqual(errors, []);
  await page.close();
  const noJS = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  for (const [route] of routes) {
    await noJS.goto(`${base}/__v9/${route}`);
    await waitForFonts(noJS);
    assert.equal(await noJS.locator('h1').isVisible(), true);
    assert.ok(
      await noJS.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      `${route}: no-JS overflow`
    );
    if (route === 'industries' || route === 'intelligence') {
      assert.equal(await noJS.locator('.sector-table tbody tr').count(), route === 'industries' ? 12 : 8);
      assert.equal(await noJS.locator('button[role=tab]:visible').count(), 0);
      if (route === 'industries')
        assert.ok(
          await noJS.locator('.ii-sp i').evaluateAll((bars) =>
            bars.every((bar) => {
              const transform = getComputedStyle(bar).transform;
              return transform === 'none' || new DOMMatrix(transform).m22 === 1;
            })
          ),
          'All card bars remain drawn without JavaScript'
        );
    } else {
      await noJS.locator('.faq-item').last().locator('summary').click();
      assert.equal(await noJS.locator('.faq-item').last().getAttribute('open'), '');
      assert.equal(await noJS.locator('#ixC .ix-b').count(), 6);
      assert.ok((await noJS.locator('#ixC .ix-b').allTextContents()).every((v) => Number(v) > 0));
    }
    report.records.push({ route, width: 390, mode: 'no-JS', status: 'passed' });
  }
  await noJS.close();
  const tablet = await browser.newPage({ viewport: { width: 768, height: 900 }, reducedMotion: 'reduce' });
  for (const route of ['industries', 'intelligence']) {
    await tablet.goto(`${base}/__v9/${route}`);
    await waitForFonts(tablet);
    const selector = route === 'industries' ? '.ii-k' : '.in-fn';
    await tablet.locator(selector).first().focus();
    for (let i = 0; i < (await tablet.locator(selector).count()); i++) {
      if (i) await tablet.keyboard.press('ArrowRight');
      await tablet.waitForFunction((sel) => {
        const tab = document.querySelector(`${sel}[aria-selected=true]`);
        const bounds = tab.getBoundingClientRect();
        const container = tab.parentElement.getBoundingClientRect();
        return bounds.left >= container.left - 1 && bounds.right <= container.right + 1;
      }, selector);
      assert.equal(await tablet.locator(selector).nth(i).getAttribute('aria-selected'), 'true');
    }
    report.records.push({ route, width: 768, mode: 'keyboard-tab-visibility', status: 'passed' });
  }
  await tablet.close();
  const motion = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  for (const route of ['industries', 'intelligence']) {
    const response = await motion.goto(`${base}/__v9/${route}`);
    const fieldBaseline = await motion.evaluate(
      (html) =>
        [...new DOMParser().parseFromString(html, 'text/html').querySelectorAll('.hero-field rect')].map((cell) => [
          cell.getAttribute('fill'),
          cell.getAttribute('fill-opacity'),
        ]),
      await response.text()
    );
    const selector = route === 'industries' ? '.ii-k' : '.in-fn';
    await motion.locator(route === 'industries' ? '#lines' : '.in-lab').scrollIntoViewIfNeeded();
    await motion.waitForFunction(
      (sel) => document.querySelector(`${sel}[aria-selected=true]`) !== document.querySelector(sel),
      selector
    );
    await motion.locator(selector).first().click();
    await motion.waitForTimeout(4500);
    assert.equal(
      await motion.locator(selector).first().getAttribute('aria-selected'),
      'true',
      'manual selection stops cycle'
    );
    await motion.keyboard.press('End');
    assert.equal(await motion.locator(selector).last().getAttribute('aria-selected'), 'true');
    await motion.emulateMedia({ reducedMotion: 'reduce' });
    await motion.waitForFunction(
      () =>
        matchMedia('(prefers-reduced-motion: reduce)').matches &&
        document.getAnimations().every((animation) => animation.playState !== 'running')
    );
    await motion.waitForFunction(
      (baseline) =>
        JSON.stringify(
          [...document.querySelectorAll('.hero-field rect')].map((cell) => [
            cell.getAttribute('fill'),
            cell.getAttribute('fill-opacity'),
          ])
        ) === JSON.stringify(baseline),
      fieldBaseline
    );
    assert.equal(
      await motion.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running').length),
      0,
      'reduced motion cancels animations'
    );
    await motion.emulateMedia({ reducedMotion: 'no-preference' });
    report.records.push({ route, mode: 'motion/manual/keyboard', status: 'passed' });
  }
  await motion.close();
  report.status = 'passed';
} catch (error) {
  report.errors.push(error.stack);
  process.exitCode = 1;
} finally {
  await browser?.close();
  fs.writeFileSync(`${out}/result.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ status: report.status, checks: report.records.length, errors: report.errors }, null, 2));
}
