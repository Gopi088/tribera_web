import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4331';
const cut = [
  'Heineken',
  'ICICI Bank',
  'ICICI Securities',
  'PayU',
  'DSP Mutual Fund',
  'Utkarsh Bank',
  'Aeries',
  'SplashBI',
  'Aegon Life',
  'Enpro',
];
const home = [
  'Mizuho',
  'Capco',
  'Deloitte',
  'ArcelorMittal',
  'Flipkart',
  'Myntra',
  'Motherson',
  'Publicis Sapient',
  'Publicis Resources',
  'Evident Microscopy',
  'Antz',
];
const browser = await chromium.launch();
try {
  for (const width of [320, 390, 768, 1520]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await page.route('https://**', (route) => route.abort());
    const response = await page.goto(`${base}/about`, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    const html = await response.text();
    for (const name of cut) assert.ok(!html.includes(name), `${name} absent from About response`);
    const strip = page.locator('.clients');
    const names = strip.locator('.clients__g .cl');
    assert.deepEqual(await names.allTextContents(), home);
    await strip.scrollIntoViewIfNeeded();
    for (const name of await names.all()) assert.ok(await name.isVisible());
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    if (width === 390 || width === 1520) {
      await strip.screenshot({
        path: `/tmp/client-publication-${width}.png`,
        style: '#nav { visibility: hidden !important; }',
      });
    }
    await page.goto(base, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.v58-logo-strip__track > span:not([aria-hidden="true"])').count(), 11);
    assert.equal(await page.locator('.v58-logo-strip__track > span[aria-hidden="true"]').count(), 11);
    const accessibleText = await page.locator('.v58-logo-strip__track').ariaSnapshot();
    for (const name of home)
      assert.equal(accessibleText.split(name).length - 1, 1, `${name} exposed once in the ARIA snapshot`);
    assert.deepEqual(
      (await page.locator('.v58-logo-strip__track > span').allTextContents()).map((text) =>
        text.replace(/\s*·\s*$/, '').trim()
      ),
      [...home, ...home]
    );
    console.log(`${width}px: About removal, retained claims, layout and unchanged Home list passed`);
    await page.close();
  }
  const noJS = await browser.newPage({ javaScriptEnabled: false });
  await noJS.route('https://**', (route) => route.abort());
  await noJS.goto(`${base}/about`, { waitUntil: 'networkidle' });
  assert.deepEqual(await noJS.locator('.clients__g .cl').allTextContents(), home);
  console.log('No-JS: retained About clients server-rendered');
  await noJS.close();
} finally {
  await browser.close();
}
