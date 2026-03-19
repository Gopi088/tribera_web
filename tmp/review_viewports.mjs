import { chromium } from 'playwright';
import fs from 'fs/promises';
const browser = await chromium.launch({ headless: true });
const specs = [
  { url: 'http://127.0.0.1:4321/', name: 'home-desktop-viewport', viewport: { width: 1440, height: 1100 } },
  { url: 'http://127.0.0.1:4321/candidates', name: 'candidates-desktop-viewport', viewport: { width: 1440, height: 1100 } },
  { url: 'http://127.0.0.1:4321/about', name: 'about-desktop-viewport', viewport: { width: 1440, height: 1100 } },
  { url: 'http://127.0.0.1:4321/contact', name: 'contact-desktop-viewport', viewport: { width: 1440, height: 1100 } },
];
await fs.mkdir('tmp/review-shots', { recursive: true });
for (const spec of specs) {
  const page = await browser.newPage({ viewport: spec.viewport });
  await page.goto(spec.url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.screenshot({ path: `tmp/review-shots/${spec.name}.png` });
  await page.close();
}
await browser.close();
console.log('done');
