import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch();
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const expectedSections = ['score', 'tally', 'proof', 'thirty', 'controls', 'when', 'voices', 'apply', 'close'];

try {
  for (const width of [320, 390, 768, 1000, 1520, 1920]) {
    const page = await browser.newPage({
      viewport: { width, height: 1000 },
      reducedMotion: 'reduce',
      hasTouch: width < 800,
    });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    await page.goto(base + '/candidates', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    assert.equal(await page.locator('main').count(), 1);
    assert.equal(await page.locator('.candidate-v7').count(), 1);
    assert.equal(await page.locator('.candidate-v7 h1').count(), 1);
    assert.match(
      await page.locator('.candidate-v7 h1').innerText(),
      /Interviewed once\.\s*Shortlisted everywhere\s*\./
    );
    assert.equal(await page.locator('.candidate-v7 > .nav').count(), 0, 'Standalone sample nav is excluded');
    assert.equal(await page.locator('.candidate-v7 > .ft').count(), 0, 'Standalone sample footer is excluded');
    assert.equal(await page.locator('#nav').count(), 1, 'Shared navbar remains the only primary navbar');
    assert.equal(await page.locator('link[href*="fonts.googleapis"]').count(), 0);

    const ids = await page.locator('[id]').evaluateAll((elements) => elements.map((element) => element.id));
    assert.equal(ids.length, new Set(ids).size, 'IDs remain unique after shared-layout integration');
    for (const id of expectedSections) assert.equal(await page.locator(`#${id}`).count(), 1, `#${id} exists`);

    assert.equal(
      await page.locator('.candidate-v7').evaluate((root) => getComputedStyle(root).fontFamily.split(',')[0]),
      '"Inter Tight"'
    );
    assert.match(
      await page.locator('.candidate-v7 h1').evaluate((heading) => getComputedStyle(heading).fontFamily),
      /Fraunces/
    );
    assert.match(
      await page
        .locator('.candidate-v7 .eyebrow')
        .first()
        .evaluate((label) => getComputedStyle(label).fontFamily),
      /JetBrains Mono/
    );

    await page.waitForFunction(() => document.querySelector('#sScore')?.textContent === '91.1');
    await page.locator('.pre2').nth(2).click();
    await page.waitForFunction(() => document.querySelector('#sScore')?.textContent === '87.0');
    assert.equal(await page.locator('.pre2.on').count(), 1);
    assert.equal(await page.locator('.pre2').nth(2).getAttribute('class'), 'pre2 on');

    const privacy = page.locator('.ctl').first();
    assert.equal(await privacy.getAttribute('aria-pressed'), 'true');
    await privacy.click();
    assert.equal(await privacy.getAttribute('aria-pressed'), 'false');
    assert.equal(await privacy.locator('.ctl__st').textContent(), 'Visible');

    assert.equal(await page.locator('#tabA').getAttribute('aria-selected'), 'true');
    await page.locator('#tabB').click();
    assert.equal(await page.locator('#tabB').getAttribute('aria-selected'), 'true');
    assert.equal(await page.locator('#faceB').getAttribute('aria-hidden'), 'false');
    assert.equal(await page.locator('#faceA').getAttribute('aria-hidden'), 'true');
    assert.equal(await page.locator('#flip').evaluate((element) => element.classList.contains('is-b')), true);
    await page.locator('#tabB').press('Home');
    assert.equal(await page.locator('#tabA').getAttribute('aria-selected'), 'true');
    assert.equal(await page.locator('#tabA').evaluate((element) => document.activeElement === element), true);

    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.deepEqual(errors, []);
    console.log(`${width}px: candidate v7 layout, shared nav isolation and interactions passed`);
    await page.close();
  }

  const page = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  await page.goto(base + '/candidates');
  assert.equal(await page.locator('.candidate-v7 h1').isVisible(), true);
  assert.equal(await page.locator('#sScore').textContent(), '91.1');
  assert.equal(await page.locator('#nav').count(), 1);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  await page.close();
  console.log('No-JS: candidate v7 content and shared navbar remain visible');
} finally {
  await browser.close();
}
