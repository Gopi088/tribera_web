import assert from 'node:assert/strict';
import { chromium } from 'playwright';
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
  await page.route('**/.netlify/functions/site-inquiry', async (route) => {
    const body = route.request().postData() || '';
    assert.match(body, /newsletter/);
    assert.match(body, /form_loaded_at/);
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
  });
  for (const route of ['/blog/', '/blog/designing-ai-for-high-stakes-technical-assessment/']) {
    await page.goto((process.env.TEST_BASE_URL || 'http://127.0.0.1:4321') + route, { waitUntil: 'networkidle' });
    const form = page.locator('#subscribeForm,[data-newsletter-form]');
    await form.locator('[name=email]').fill('test@example.com');
    await form.locator('[type=submit]').click();
    await page.waitForFunction(() =>
      /Thanks|thank|ready/i.test(document.querySelector('#subscribeStatus,[data-newsletter-status]')?.textContent || '')
    );
    assert.equal(await form.locator('[name=email]').inputValue(), '');
    console.log(`${route}: mocked newsletter waitlist submission passed`);
  }
} finally {
  await browser.close();
}
