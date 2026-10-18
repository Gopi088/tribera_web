import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4331';
const browser = await chromium.launch();
try {
  for (const width of [320, 390, 1520]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    let fail = true;
    let requests = 0;
    let body = '';
    let release;
    let delayResponse = false;
    await page.route('**/*', async (route) => {
      if (route.request().url().endsWith('/.netlify/functions/site-inquiry')) {
        requests++;
        body = route.request().postData() || '';
        if (delayResponse)
          await new Promise((resolve) => {
            release = resolve;
          });
        await route.fulfill({
          status: fail ? 500 : 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: !fail }),
        });
      } else if (route.request().method() === 'GET' && route.request().url().startsWith(base)) {
        await route.continue();
      } else await route.abort();
    });
    await page.goto(base, { waitUntil: 'networkidle' });
    const hero = page.locator('.v58-hero-c .v58-primary');
    const demo = page.locator('.v58-start .v58-link');
    const modal = page.locator('#contactSalesModal');
    const form = modal.locator('form');
    const submit = modal.locator('[type=submit]');
    const close = modal.locator('[data-close-sales]');
    const success = modal.locator('#contactSalesSuccessMsg');
    await hero.click();
    assert.equal(await modal.getAttribute('role'), 'dialog');
    assert.equal(await modal.getAttribute('aria-modal'), 'true');
    assert.equal(await form.locator('[name=name]').evaluate((e) => e === document.activeElement), true);
    await submit.click();
    assert.equal(requests, 0, 'Required fields prevent an empty submission');
    await close.focus();
    await page.keyboard.press('Shift+Tab');
    assert.equal(await submit.evaluate((e) => e === document.activeElement), true);
    await page.keyboard.press('Tab');
    assert.equal(await close.evaluate((e) => e === document.activeElement), true);
    await page.keyboard.press('Escape');
    assert.equal(await modal.isVisible(), false);
    assert.equal(await hero.evaluate((e) => e === document.activeElement), true);
    await hero.click();
    await form.locator('[name=name]').fill('QA Test');
    await form.locator('[name=email]').fill('qa@example.com');
    await form.locator('[name=message]').fill('Mocked homepage enquiry, never sent.');
    await submit.click();
    await modal.locator('#contactSalesErrorMsg').waitFor({ state: 'visible' });
    assert.equal(await form.locator('[name=name]').inputValue(), 'QA Test');
    assert.match(body, /name="form_source"\r\n\r\nv58-hero/);
    assert.match(body, /name="form_intent"\r\n\r\nrole/);
    assert.match(body, /name="form_loaded_at"\r\n\r\n\d+/);
    fail = false;
    await submit.click();
    await success.waitFor({ state: 'visible' });
    assert.equal(await success.evaluate((e) => e === document.activeElement), true);
    await close.click();
    await demo.click();
    assert.equal(await form.isVisible(), true);
    assert.equal(await success.isVisible(), false);
    assert.equal(await form.locator('[name=form_intent]').inputValue(), 'demo');
    await page.waitForTimeout(3200);
    assert.equal(await modal.isVisible(), true, 'Old success timer cannot close a newly opened form');

    delayResponse = true;
    await form.locator('[name=name]').fill('QA Demo');
    await form.locator('[name=email]').fill('qa@example.com');
    await submit.click();
    await page.waitForFunction(() => document.querySelector('#contactSalesSubmitBtn').disabled);
    for (let i = 0; !release && i < 50; i++) await page.waitForTimeout(20);
    assert.equal(typeof release, 'function');
    await close.click();
    await hero.click();
    release();
    await page.waitForTimeout(300);
    assert.equal(await form.isVisible(), true, 'Old request cannot overwrite the reopened form');
    assert.equal(await success.isVisible(), false);
    assert.equal(await submit.isEnabled(), true);
    delayResponse = false;
    await submit.click();
    await success.waitFor({ state: 'visible' });
    await modal.waitFor({ state: 'hidden', timeout: 5000 });
    assert.equal(await hero.evaluate((e) => e === document.activeElement), true);
    assert.equal(await page.evaluate(() => document.body.classList.contains('overflow-hidden')), false);
    console.log(
      `${width}px: dialog focus, validation, mocked retry/success, stale timer/request and focus restore passed`
    );
    await page.close();
  }
} finally {
  await browser.close();
}
