import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4331';
const cut = [
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
  'Flipkart',
  'Myntra',
  'Motherson',
  'Publicis Sapient',
  'Publicis Resources',
  'Heineken',
  'Ascendion',
  'Evident Microscopy',
  'CMART',
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
    await page.goto(base, { waitUntil: 'networkidle' });
    const track = page.locator('.v9-client-track');
    assert.deepEqual(await track.locator('ul:not([aria-hidden]) li').allTextContents(), home);
    assert.deepEqual(await track.locator('ul[aria-hidden="true"] li').allTextContents(), home);
    const accessibleText = await track.ariaSnapshot();
    for (const name of home) assert.equal(accessibleText.split(name).length - 1, 1, `${name} exposed once`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    console.log(`${width}px: v9 publication list, duplicate ARIA suppression and overflow passed`);
    await page.close();
  }
  const noJS = await browser.newPage({ javaScriptEnabled: false });
  await noJS.goto(base);
  assert.deepEqual(await noJS.locator('.v9-client-track ul:not([aria-hidden]) li').allTextContents(), home);
  console.log('No-JS: approved clients server-rendered');
} finally {
  await browser.close();
}
