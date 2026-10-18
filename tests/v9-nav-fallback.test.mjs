import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4343';
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  for (const route of ['/', '/candidates']) {
    await page.goto(base + route, { waitUntil: 'networkidle' });
    const cta = page.locator('.nav__cta');
    assert.equal(await cta.count(), 1, `${route}: required header CTA`);
    assert.equal(await cta.getAttribute('href'), '/contact', `${route}: valid fallback destination`);
    await cta.click();
    const modal = page.locator('#contactSalesModal');
    await modal.waitFor({ state: 'visible' });
    assert.equal(await modal.locator('[name=form_intent]').inputValue(), 'demo');
    await page.keyboard.press('Escape');
    await modal.waitFor({ state: 'hidden' });
    assert.equal(await cta.evaluate((el) => el === document.activeElement), true);
    assert.equal((await page.request.get(base + '/contact')).ok(), true);
  }
  console.log('2 legacy header CTAs retain demo modal, focus restoration and valid contact fallback');
} finally {
  await browser.close();
}
