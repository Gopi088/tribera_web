import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { chromium } from 'playwright';

async function moduleAt(path) {
  const result = await build({ entryPoints: [path], bundle: true, write: false, format: 'esm', platform: 'node' });
  return import('data:text/javascript;base64,' + Buffer.from(result.outputFiles[0].text).toString('base64'));
}
const { shouldNoIndex } = await moduleAt('src/utils/indexing-policy.ts');
for (const [options, expected] of [
  [{ dev: true }, true],
  [{ context: 'deploy-preview' }, true],
  [{ context: 'branch-deploy' }, true],
  [{ context: 'production', url: 'https://tribera.netlify.app' }, true],
  [{ context: 'production', url: 'https://www.tribera.ai' }, false],
  [{ context: 'production', url: 'https://www.tribera.ai', noindex: true }, true],
  [{}, true],
  [{ context: '', url: 'https://www.tribera.ai' }, true],
])
  assert.equal(shouldNoIndex(options), expected);
console.log('Index policy: local, preview, branch, production, Netlify host, route exception passed');

const { CAREER_ROLES, CAREER_DIMENSIONS } = await moduleAt('src/data/careers.ts');
const { functionSeries, industrySeries, intelligenceSeries } = await moduleAt('src/data/chart-series.ts');
const { briefs, weightedScore } = await moduleAt('src/components/candidates/model.ts');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4331';
const browser = await chromium.launch();
try {
  for (const width of [390, 1520]) {
    for (const mode of ['enabled', 'disabled', 'blocked']) {
      const page = await browser.newPage({
        viewport: { width, height: 1050 },
        reducedMotion: 'reduce',
        javaScriptEnabled: mode !== 'disabled',
      });
      await page.route('**/*', async (route) => {
        const request = route.request();
        if (request.method() !== 'GET' || request.url().startsWith('https:')) return route.abort();
        if (mode === 'blocked' && request.isNavigationRequest()) {
          // A request blocker alone misses Astro's inlined scripts.
          const response = await route.fetch();
          return route.fulfill({
            response,
            headers: { ...response.headers(), 'content-security-policy': "script-src 'none'" },
          });
        }
        if (mode === 'blocked' && request.resourceType() === 'script') return route.abort();
        return route.continue();
      });
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      for (const [path, series] of [
        ['functions', functionSeries],
        ['industries', industrySeries],
      ]) {
        assert.equal((await page.goto(base + '/' + path, { waitUntil: 'networkidle' })).status(), 200);
        const a = page.locator('#secA'),
          b = page.locator('#secB');
        assert.equal(await a.isDisabled(), mode !== 'enabled');
        await page.locator('header.hero').screenshot({ path: `/tmp/bugs-${path}-${width}-${mode}-default.png` });
        const keys = mode === 'enabled' ? Object.keys(series) : [await a.inputValue()];
        for (const key of keys) {
          if (mode === 'enabled') await a.selectOption(key);
          assert.deepEqual(await page.locator('[id^=va]').allTextContents(), series[key].w.map(String));
          if (mode === 'enabled') await b.selectOption(key);
          if (mode === 'enabled')
            assert.equal(
              await page.locator('.cmpw .bw.key').count(),
              0,
              'Identical selections have no difference highlight'
            );
          assert.deepEqual(
            await page.locator('[id^=vb]').allTextContents(),
            series[await b.inputValue()].w.map(String)
          );
        }
        assert.ok((await page.locator('#cmpFt').innerText()).length > 30);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        if (mode === 'enabled')
          await page.locator('header.hero').screenshot({ path: `/tmp/bugs-${path}-${width}.png` });
      }
      await page.goto(base + '/intelligence', { waitUntil: 'networkidle' });
      const select = page.locator('#fnSel');
      assert.equal(await select.isDisabled(), mode !== 'enabled');
      for (const key of mode === 'enabled' ? Object.keys(intelligenceSeries) : ['backend']) {
        if (mode === 'enabled') await select.selectOption(key);
        assert.deepEqual(
          (await page.locator('[id^=iv]').allTextContents()).map((text) => text.trim()),
          intelligenceSeries[key].w.map((v) => v + '%')
        );
      }
      assert.ok((await page.locator('#intelFt').innerText()).length > 30);
      await page.goto(base + '/candidates', { waitUntil: 'networkidle' });
      assert.ok(await page.locator('[data-score]').isVisible(), 'Candidate fallback is visible');
      for (const button of await page.locator('[data-brief]').all()) {
        assert.equal(await button.isDisabled(), mode !== 'enabled');
      }
      assert.equal(await page.locator('[data-brief-unavailable]').isVisible(), mode !== 'enabled');
      assert.match(
        await page
          .locator('.c-small')
          .allTextContents()
          .then((texts) => texts.join(' ')),
        /scores from different examples are not directly comparable/
      );
      if (mode !== 'enabled') {
        assert.equal(
          await page
            .locator('[data-brief]')
            .first()
            .evaluate((el) => getComputedStyle(el).cursor),
          'not-allowed'
        );
      }
      if (mode === 'enabled') {
        for (let i = 0; i < briefs.length; i++) {
          await page.locator('[data-brief]').nth(i).focus();
          await page.keyboard.press('Enter');
          assert.equal(await page.locator('[data-score]').innerText(), weightedScore(briefs[i].weights).toFixed(1));
        }
      } else assert.equal(await page.locator('[data-score]').innerText(), '91.1');
      await page.goto(base, { waitUntil: 'networkidle' });
      for (const control of await page.locator('[data-v58-lab] input[type="range"], [data-preset]').all()) {
        assert.equal(await control.isDisabled(), mode !== 'enabled');
        if (mode !== 'enabled')
          assert.equal(await control.evaluate((el) => getComputedStyle(el).cursor), 'not-allowed');
      }
      assert.equal(await page.locator('[data-lab-unavailable]').isVisible(), mode !== 'enabled');
      assert.equal(
        await page.locator('#weight-instruction').innerText(),
        mode === 'enabled'
          ? 'Adjust the sliders to set what matters most.'
          : 'Importance shows how much each skill counts in this example.'
      );
      assert.match(
        await page.locator('.v58-calculation').textContent(),
        /scores from different examples are not directly comparable/
      );
      assert.deepEqual(errors, []);
      console.log(`${width}px / ${mode}: comparison selections, SSR values, narrative, candidate scores passed`);
      await page.close();
    }
  }
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  await page.route('https://**', (route) => route.abort());
  for (const role of CAREER_ROLES) {
    await page.goto(base + '/careers', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => {
      const select = document.querySelector('#roleSel');
      return select && !select.disabled;
    });
    await page.locator('#roleSel').selectOption(role.slug);
    const card = page.locator(`.rc[href="/careers/${role.slug}/"] .rc__m`);
    assert.equal((await card.innerText()).split(' · ')[0], 'Bengaluru');
    assert.deepEqual(
      await page.locator('[id^=cv]').allTextContents(),
      role.w.map((v) => v + '%')
    );
    await page.goto(base + '/careers/' + role.slug, { waitUntil: 'domcontentloaded' });
    assert.deepEqual(await page.locator('.sc__n').allTextContents(), [...CAREER_DIMENSIONS]);
    assert.deepEqual(
      await page.locator('.sc__v').allTextContents(),
      role.w.map((v) => v + '%')
    );
    const widths = await page
      .locator('.sc__f')
      .evaluateAll((els) => els.map((el) => parseFloat(el.style.getPropertyValue('--w'))));
    assert.equal(Math.max(...widths), 100);
    assert.ok(widths.every((w) => w >= 0 && w <= 100));
  }
  console.log('All seven careers: canonical order, unchanged label/weights, bounded bar widths passed');
  await page.close();
} finally {
  await browser.close();
}
