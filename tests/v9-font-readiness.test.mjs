import assert from 'node:assert/strict';
import { setTimeout as delay } from 'node:timers/promises';
import { test } from 'node:test';
import { chromium, firefox, webkit } from 'playwright';
import { waitForFonts, waitForPageCondition } from '../scripts/v9-browser-readiness.mjs';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4390';
const engine = process.env.BROWSER || 'chromium';

test('font readiness retains a finite deadline and reports the pending font', async () => {
  const state = { status: 'loading', faces: [{ family: 'Pending font', status: 'loading' }] };
  const start = performance.now();
  await assert.rejects(waitForFonts({ evaluate: async () => state }, { timeout: 120 }), (error) => {
    assert.equal(error.name, 'FontReadinessTimeoutError');
    assert.deepEqual(error.fontState, state);
    return true;
  });
  assert.ok(performance.now() - start >= 120, 'must not return early while fonts load');
  await assert.rejects(waitForFonts({ evaluate: () => new Promise(() => {}) }, { timeout: 120 }), /within 120ms/);
});

test(`font readiness observes delayed native fonts with JavaScript disabled (${engine})`, async () => {
  const browser = await { chromium, firefox, webkit }[engine].launch();
  let release;
  const held = new Promise((resolve) => {
    release = resolve;
  });
  try {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      reducedMotion: 'reduce',
      viewport: { width: 390, height: 844 },
    });
    const requests = [];
    const failures = [];
    await context.route('**/*.woff2', async (route) => {
      requests.push(route.request().url());
      await held;
      await route.continue();
    });
    const page = await context.newPage();
    page.on('requestfailed', (request) => failures.push({ url: request.url(), error: request.failure() }));
    await page.goto(`${base}/__v9/home`, { waitUntil: 'domcontentloaded' });
    // Force layout, then wait from Node until an actual font request is pending.
    await page.evaluate(() => document.body.offsetHeight);
    const deadline = performance.now() + 15000;
    let loading = false;
    while (performance.now() < deadline) {
      loading = await page.evaluate(
        () => document.fonts.status === 'loading' && [...document.fonts].some((face) => face.status === 'loading')
      );
      if (loading && requests.length) break;
      await delay(50);
    }
    assert.equal(loading, true, 'regression must begin while real FontFaces are loading');
    assert.ok(requests.length > 0, 'font responses must be held');
    let resolved = false;
    const ready = waitForFonts(page, { timeout: 15000 }).then(() => {
      resolved = true;
    });
    await delay(300);
    assert.equal(resolved, false, 'must not report readiness while font responses are held');
    release();
    await ready;
    const state = await page.evaluate(() => ({
      status: document.fonts.status,
      families: [...document.fonts].filter((face) => face.status === 'loaded').map((face) => face.family),
    }));
    assert.equal(state.status, 'loaded');
    assert.ok(state.families.some((family) => family.includes('V9 Fraunces')));
    assert.ok(state.families.some((family) => family.includes('V9 Inter Tight')));
    assert.deepEqual(
      failures.filter((request) => /woff/.test(request.url)),
      []
    );
  } finally {
    release();
    await browser.close();
  }
});

test('generic readiness preserves deadlines, arguments and evaluation errors', async () => {
  const start = performance.now();
  await assert.rejects(
    waitForPageCondition({ evaluate: async () => false }, () => false, null, { timeout: 120 }),
    (error) => {
      assert.equal(error.name, 'PageConditionTimeoutError');
      assert.equal(error.lastValue, false);
      return true;
    }
  );
  assert.ok(performance.now() - start >= 120);
  await assert.rejects(
    waitForPageCondition({ evaluate: () => new Promise(() => {}) }, () => true, null, { timeout: 120 }),
    /within 120ms/
  );
  await assert.rejects(
    waitForPageCondition(
      {
        evaluate: async () => {
          throw new Error('evaluation failed');
        },
      },
      () => true
    ),
    /evaluation failed/
  );
});

test(`generic readiness observes delayed native disclosure rendering without JavaScript (${engine})`, async () => {
  const browser = await { chromium, firefox, webkit }[engine].launch();
  try {
    const page = await browser.newPage({ javaScriptEnabled: false, reducedMotion: 'no-preference' });
    await page.setContent(`<style>
      @keyframes reveal { from { opacity: 0; } to { opacity: 1; } }
      details[open] .answer { animation: reveal 800ms linear both; }
      </style><details><summary>Read the answer</summary><p class="answer">Native disclosure answer</p></details>`);
    await page.locator('summary').click();
    assert.equal(await page.locator('details').getAttribute('open'), '');
    assert.ok(
      await page.locator('.answer').evaluate((el) => Number(getComputedStyle(el).opacity) < 1),
      'start while the native CSS animation is unfinished'
    );
    await waitForPageCondition(
      page,
      (selector) => Number(getComputedStyle(document.querySelector(selector)).opacity) === 1,
      '.answer',
      { timeout: 5000 }
    );
    assert.equal(await page.locator('.answer').isVisible(), true);
    assert.equal(await page.locator('.answer').evaluate((el) => getComputedStyle(el).opacity), '1');
    // A permanently false condition must still reject on the actual no-JS page.
    await assert.rejects(
      waitForPageCondition(page, () => document.querySelector('details').open === false, null, { timeout: 120 }),
      /within 120ms/
    );
  } finally {
    await browser.close();
  }
});
