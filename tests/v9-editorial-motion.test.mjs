import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { writeFile, mkdir } from 'node:fs/promises';
const browser = await chromium.launch({ headless: true });
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const records = [];
try {
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(`${base}/__v9/about`);
  await page.locator('#abInk').scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  assert.ok(
    (await page.locator('#abInk').evaluate((e) => e.getAnimations({ subtree: true }).length)) > 0,
    'chart animates'
  );
  await page.locator('#abTl').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1600);
  assert.equal(await page.locator('[data-count]').innerText(), '200,000');
  assert.notEqual(await page.locator('#abTl').evaluate((e) => e.style.getPropertyValue('--p')), '', 'timeline updates');
  await page.locator('.fmark').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1400);
  assert.ok((await page.locator('.fmark i.lit').count()) > 0, 'field breathes');
  records.push('About ink draw, final count, scroll timeline, field breathing');
  await page.goto(`${base}/__v9/bfsi`);
  await page.locator('.ix-lab').scrollIntoViewIfNeeded();
  await page.waitForTimeout(4500);
  assert.notEqual(
    await page.locator('.ix-cmp[aria-selected=true]').getAttribute('data-s'),
    'product-saas',
    'auto cycles'
  );
  const first = page.locator('.ix-cmp').first();
  await first.click();
  const manual = await first.getAttribute('data-s');
  await page.waitForTimeout(4400);
  assert.equal(await page.locator('.ix-cmp[aria-selected=true]').getAttribute('data-s'), manual, 'manual takes over');
  assert.equal(await page.locator('.ix-q.in').count(), 3);
  records.push('BFSI auto cycle, manual takeover, three strikethroughs');
  await page.goto(`${base}/__v9/article`);
  assert.equal(await page.locator('.bl-prog').isVisible(), true);
  assert.ok(
    await page.evaluate(
      () =>
        document.querySelector('.bl-prog').getBoundingClientRect().top >=
        document.querySelector('.v9-nav').getBoundingClientRect().bottom
    ),
    'reading progress stays below the taller shared header'
  );
  await page.locator('.bl-copy').scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  assert.ok(
    parseFloat(await page.locator('.bl-prog i').evaluate((e) => e.style.getPropertyValue('--p'))) > 50,
    'reading progress'
  );
  await page.locator('.fn-r').first().click();
  await page.waitForTimeout(30);
  assert.equal(await page.locator('.v9-citation-preview').count(), 1);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.v9-citation-preview').count(), 0);
  records.push('Article reading progress and citation click/Escape');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(`${base}/__v9/bfsi`);
  await page.locator('.ix-lab').scrollIntoViewIfNeeded();
  await page.waitForTimeout(4400);
  assert.equal(await page.locator('.ix-cmp[aria-selected=true]').getAttribute('data-s'), 'product-saas');
  assert.equal(
    await page
      .locator('.v9-editorial')
      .evaluate((e) => e.getAnimations({ subtree: true }).filter((a) => a.playState === 'running').length),
    0
  );
  records.push('Reduced motion no auto cycling or running animations');
  const nojs = await browser.newPage({ javaScriptEnabled: false });
  await nojs.goto(`${base}/__v9/about`);
  assert.equal(await nojs.locator('[data-count]').innerText(), '200,000');
  assert.equal(await nojs.locator('#abFold').isVisible(), true);
  await nojs.goto(`${base}/__v9/article`);
  assert.equal(await nojs.locator('.bl-prog').isVisible(), false);
  records.push('NoJS final counts, complete letter, native citations, hidden progress');
  assert.deepEqual(errors, []);
  await mkdir('artifacts/v9-motion-sweep', { recursive: true });
  await writeFile(
    'artifacts/v9-motion-sweep/editorial-tests.json',
    JSON.stringify({ status: 'passed', records, errors }, null, 2)
  );
  console.log(records);
} finally {
  await browser.close();
}
