import assert from 'node:assert/strict';
import { chromium } from 'playwright';
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
  let fail = true;
  let body = '';
  await page.route('**/.netlify/functions/site-inquiry', async (route) => {
    body = route.request().postData() || '';
    await route.fulfill({
      status: fail ? 500 : 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: !fail }),
    });
  });
  await page.goto((process.env.TEST_BASE_URL || 'http://127.0.0.1:4321') + '/contact/', { waitUntil: 'networkidle' });
  const form = page.locator('.cform__f');
  for (const mode of ['hire', 'look']) {
    await page.locator(`.cswx[data-m="${mode}"]`).click();
    await form.locator('[name=first_name]').fill('Test');
    await form.locator('[name=last_name]').fill('Person');
    await form.locator('[name=email]').fill('test@example.com');
    await form.locator('[name=message]').fill('Mocked verification only.');
    await form.locator(`[name=${mode === 'hire' ? 'role' : 'stack'}]`).fill('Backend');
    fail = true;
    await form.locator('[type=submit]').click();
    await page.waitForFunction(() => document.querySelector('#contactStatus').textContent.includes('could not'));
    assert.equal(await form.locator('[name=first_name]').inputValue(), 'Test');
    fail = false;
    await form.locator('[type=submit]').click();
    await page.waitForFunction(() => document.querySelector('#contactStatus').textContent.includes('has been sent'));
    assert.match(body, new RegExp(mode === 'hire' ? 'Hiring Talent' : 'Getting Hired'));
    assert.match(body, /Backend/);
    assert.match(body, /name="form_loaded_at"\r\n\r\n\d+/);
    assert.equal(await form.locator('[name=first_name]').inputValue(), '');
    console.log(`${mode}: mocked error/retry/success passed`);
  }
  await page.screenshot({ path: '/tmp/tribera-site-style/contact-success-390.png', fullPage: true });
} finally {
  await browser.close();
}
