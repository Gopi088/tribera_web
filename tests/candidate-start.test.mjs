import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch();
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
try {
  for (const width of [320, 390, 768, 1520]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    let requests = 0;
    // Exercise success and retry states without delivering a real profile.
    await page.route('**/.netlify/functions/candidate-profile', async (route) => {
      requests++;
      assert.equal(route.request().method(), 'POST');
      assert.match(route.request().headers()['content-type'], /multipart\/form-data/);
      await route.fulfill({
        status: requests === 1 ? 500 : 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: requests > 1 }),
      });
    });
    await page.goto(base + '/candidates/start', { waitUntil: 'networkidle' });
    assert.equal(await page.locator('main').count(), 1);
    assert.equal(await page.getByLabel('Your email', { exact: true }).inputValue(), '');
    const copy = await page.locator('.tribera-start').innerText();
    assert.doesNotMatch(
      copy,
      /within a day|anonymous from|one minute|two fields|Day 3|Day 7|~3 weeks|Most people|already have your email|goes live/i
    );
    assert.match(copy, /not a fixed timeline/);
    assert.equal(await page.locator('#submitBtn').isDisabled(), true);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    if ([390, 1520].includes(width))
      await page.screenshot({ path: `/tmp/candidate-start-${width}.png`, fullPage: true });
    await page.goto(base + '/candidates/start?email=old%40example.com');
    assert.equal(await page.locator('#emailInput').inputValue(), 'old@example.com');
    await page.getByLabel('Your email', { exact: true }).fill('corrected@example.com');
    await page.getByLabel('Your name', { exact: true }).fill('Layout Test');
    await page
      .locator('#cvInput')
      .setInputFiles({ name: 'test.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4 test') });
    assert.equal(await page.locator('#cvName').textContent(), 'test.pdf');
    await page.locator('#submitBtn').click();
    await page.locator('#startErr').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#submitBtn').isEnabled(), true);
    await page.locator('#submitBtn').click();
    await page.locator('#startOk').waitFor({ state: 'visible' });
    assert.match(await page.locator('#startOk').innerText(), /Your profile is with us/);
    assert.equal(await page.locator('#profileForm').isVisible(), false);
    assert.equal(requests, 2);
    console.log(`${width}px: copy, email correction, upload and mocked retry/success passed`);
    await page.close();
  }
} finally {
  await browser.close();
}
