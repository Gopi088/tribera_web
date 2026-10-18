import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { chromium, firefox, webkit } from 'playwright';

// Uses the private V9_PREVIEW artifact when TEST_BASE_URL is set; otherwise starts Astro dev, never builds.
const engine = process.env.BROWSER || 'chromium';
const engines = { chromium, firefox, webkit };
const port = process.env.TEST_PORT || '4393';
const base = process.env.TEST_BASE_URL || `http://127.0.0.1:${port}`;
const output = `artifacts/v9-g2/editorial-${engine}`;
fs.mkdirSync(output, { recursive: true });
const records = [];
const errors = [];
let browser;
let server;
let activePage;
const write = (status, error) =>
  fs.writeFileSync(
    path.join(output, 'result.json'),
    JSON.stringify(
      { status, browser: engine, base, records, errors, ...(error ? { error: error.stack } : {}) },
      null,
      2
    )
  );
try {
  assert.ok(engines[engine], `Unsupported browser ${engine}`);
  if (!process.env.TEST_BASE_URL) {
    server = spawn(
      process.execPath,
      ['node_modules/astro/bin/astro.mjs', 'dev', '--host', '127.0.0.1', '--port', port],
      { stdio: 'ignore' }
    );
    let ready = false;
    for (let i = 0; i < 120; i++) {
      assert.equal(server.exitCode, null, 'Dev server exited');
      try {
        ready = (await fetch(`${base}/__v9/about`, { signal: AbortSignal.timeout(1000) })).status === 200;
      } catch {
        /* startup */
      }
      if (ready) break;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    assert.ok(ready, 'Private editorial routes must be available');
  }
  browser = await engines[engine].launch();
  for (const width of [390, 1366]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    activePage = page;
    page.on('pageerror', (error) => errors.push(error.message));
    const goto = async (route) => {
      const response = await page.goto(`${base}/__v9/${route}`);
      assert.equal(response.status(), 200);
      await page.locator('.v9-editorial[data-ready="true"]').waitFor();
    };
    await goto('about');
    const fold = page.locator('#abFold');
    assert.equal(await fold.evaluate((el) => el.inert), true);
    await page.locator('#abMore').click();
    assert.equal(await page.locator('#abMore').getAttribute('aria-expanded'), 'true');
    assert.equal(await fold.evaluate((el) => el.inert), false);
    assert.ok(await fold.locator('.ab-close').isVisible());
    await page.locator('#abMore').click();
    assert.equal(await fold.evaluate((el) => el.inert), true);
    const people = await page.locator('.ab-p').evaluateAll((cards) =>
      cards.map((card) => ({
        name: card.querySelector('h3').textContent,
        role: card.querySelector('.ab-role').textContent,
      }))
    );
    assert.deepEqual(people, [
      { name: 'Akshata Chandavarkar', role: 'Founder & CEO' },
      { name: 'Abhishek Prasad', role: 'Co-founder & CBO' },
      { name: 'Pranav Gandhi', role: 'Chief Strategy Officer' },
    ]);
    for (const img of await page.locator('.ab-ph-img').all()) {
      await img.scrollIntoViewIfNeeded();
      await img.evaluate((el) => el.decode());
    }
    assert.equal(await page.locator('.ab-tl li').count(), 4);
    assert.equal(await page.locator('.fmark i').count(), 36);
    assert.equal(
      await page
        .locator('.fmark i')
        .evaluateAll((cells) => cells.every((cell) => getComputedStyle(cell).opacity === '1')),
      true
    );
    for (const side of ['keep', 'let', 'skip']) {
      if (side !== 'keep') await goto('about');
      await page.locator(side === 'skip' ? '.ab-db-skip' : `[data-side="${side}"] .ab-db-b`).click();
      assert.ok(await page.locator('.ab-db-ft').isVisible());
      assert.match(
        await page.locator('.ab-db-r').textContent(),
        side === 'keep' ? /You’d keep them/ : side === 'let' ? /You’d let them go/ : /Where we landed/
      );
      assert.equal(await page.locator('.ab-db-b[aria-pressed="true"]').count(), side === 'skip' ? 0 : 1);
    }
    records.push({
      page: 'about',
      width,
      status: 'passed',
      checks: [
        'letter expand/collapse and inert',
        'three named roles',
        'portraits decoded',
        'four history steps',
        '36 visible closing cells',
        'both debate choices and skip',
      ],
    });
    await goto('bfsi');
    assert.equal(await page.locator('.ix-miss > li').count(), 4);
    assert.equal(await page.locator('.ix-roles > li').count(), 8);
    assert.deepEqual(await page.locator('.ix-bars b').allTextContents(), ['20%', '14%', '30%', '10%', '18%', '8%']);
    const tabs = page.locator('.ix-cmp');
    assert.equal(await tabs.count(), 11);
    for (const tab of await tabs.all()) {
      await tab.click();
      assert.equal(await tab.getAttribute('aria-selected'), 'true');
      const values = (await page.locator('#ixC .ix-b').allTextContents()).map(Number);
      assert.equal(values.length, 6);
      assert.equal(
        values.reduce((sum, value) => sum + value, 0),
        100
      );
      assert.equal(await page.locator('#ixBName').textContent(), await tab.textContent());
    }
    await tabs.last().focus();
    await page.keyboard.press('Home');
    assert.equal(await tabs.first().getAttribute('aria-selected'), 'true');
    await page.keyboard.press('ArrowLeft');
    assert.equal(await tabs.last().getAttribute('aria-selected'), 'true');
    const questions = page.locator('.faq-item');
    assert.equal(await questions.count(), 5);
    for (const question of await questions.all()) {
      if (!(await question.evaluate((el) => el.open))) await question.locator('summary').click();
      assert.equal(await question.evaluate((el) => el.open), true);
      assert.equal(await question.locator('.faq-a').evaluate((el) => el.getBoundingClientRect().height > 20), true);
    }
    await page.locator('.fn-r').click();
    assert.ok(page.url().endsWith('#src-1'));
    assert.match(await page.locator('#src-1').textContent(), /KPMG.*Nasscom/);
    records.push({
      page: 'bfsi',
      width,
      status: 'passed',
      checks: [
        'four misses',
        'eight roles',
        'banking weights',
        '11 sector selections totaling 100',
        'keyboard tabs',
        'five native FAQs',
        'market citation anchor',
      ],
    });
    await goto('article');
    assert.equal(await page.locator('.v9-author time').getAttribute('datetime'), '2026-10-19');
    assert.equal(await page.locator('.v9-article-marks i').count(), 12);
    assert.equal(await page.locator('.bl-mn').count(), 3);
    assert.equal(await page.locator('.bl-rel > a').count(), 3);
    await page.evaluate(() =>
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async (value) => {
            window.__copied = value;
          },
        },
      })
    );
    await page.locator('.bl-copy').click();
    assert.equal(await page.evaluate(() => window.__copied), `${base}/__v9/article`);
    assert.equal(await page.locator('.v9-copy-status').textContent(), 'Link copied.');
    const shared = new URL(await page.locator('[data-preview-share]').getAttribute('href'));
    assert.equal(shared.searchParams.get('url'), `${base}/__v9/article`);
    assert.equal((await fetch(shared.searchParams.get('url'))).status, 200, 'Shared preview must resolve');
    await page.evaluate(() =>
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async () => {
            throw new Error('Denied');
          },
        },
      })
    );
    await page.locator('.bl-copy').click();
    assert.match(await page.locator('.v9-copy-status').textContent(), /Copy this link: https?:/);
    assert.equal(await page.locator('#subscribe button').isDisabled(), true);
    assert.match(await page.locator('#v9-subscription-status').textContent(), /unavailable in this private preview/);
    assert.equal(await page.locator('#subscribe form').count(), 0, 'No subscription POST or false signup in preview');
    await page.locator('.fn-r').first().click();
    assert.ok(page.url().endsWith('#src-1'));
    records.push({
      page: 'article',
      width,
      status: 'passed',
      checks: [
        'future date private fixture',
        '12 cover marks',
        'three margin notes',
        'three related cards',
        'copy success/failure',
        'source anchor',
        'disabled honest subscription',
      ],
    });
    await page.close();
  }
  const nojs = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  activePage = nojs;
  await nojs.goto(`${base}/__v9/about`);
  assert.equal(await nojs.locator('#abFold').evaluate((el) => el.getBoundingClientRect().height > 500), true);
  assert.equal(await nojs.locator('#abMore').isVisible(), false);
  assert.ok(await nojs.locator('.ab-db-ft').isVisible());
  await nojs.goto(`${base}/__v9/bfsi`);
  assert.deepEqual(await nojs.locator('#ixC .ix-b').allTextContents(), ['22', '18', '6', '20', '8', '26']);
  const faq = nojs.locator('.faq-item').nth(2);
  await faq.locator('summary').click();
  assert.equal(await faq.evaluate((el) => el.open), true);
  // WebKit exposes the first transition frame immediately after native disclosure opens.
  // Wait for readable geometry and opacity, not an arbitrary delay or a looser assertion.
  await nojs.waitForFunction(
    () => {
      const answer = document.querySelectorAll('.faq-item')[2].querySelector('.faq-a');
      return (
        answer.getBoundingClientRect().height > 20 && Number(getComputedStyle(answer.firstElementChild).opacity) >= 0.99
      );
    },
    null,
    { timeout: 5000 }
  );
  assert.equal(await faq.locator('.faq-a').evaluate((el) => el.getBoundingClientRect().height > 20), true);
  await nojs.goto(`${base}/__v9/article`);
  assert.equal(await nojs.locator('.bl-copy').isVisible(), false);
  assert.equal(await nojs.locator('[data-preview-share]').isVisible(), false);
  assert.match(await nojs.locator('.bl-share noscript').textContent(), /Copy this preview’s address/);
  assert.equal(await nojs.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow');
  records.push({
    page: 'all',
    width: 390,
    mode: 'no-js',
    status: 'passed',
    checks: [
      'full letter readable',
      'retention policy readable',
      'real initial comparison weights',
      'native FAQ',
      'sharing link',
      'private article noindex',
    ],
  });
  assert.deepEqual(errors, []);
  assert.equal(records.length, 7);
  write('passed');
  console.log(`Passed ${records.length} editorial behavior groups (${engine})`);
} catch (error) {
  if (activePage && !activePage.isClosed())
    await activePage.screenshot({ path: path.join(output, 'failure.png'), fullPage: true }).catch(() => {});
  write('failed', error);
  throw error;
} finally {
  await browser?.close();
  if (server && server.exitCode === null) {
    const exited = once(server, 'exit');
    server.kill('SIGTERM');
    await exited;
  }
}
