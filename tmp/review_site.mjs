import { chromium } from 'playwright';
import fs from 'fs/promises';

const browser = await chromium.launch({ headless: true });
const pages = [
  { path: '/', name: 'home' },
  { path: '/candidates/', name: 'candidates' },
  { path: '/about/', name: 'about' },
  { path: '/contact/', name: 'contact' },
];
const viewports = [
  { name: 'desktop', width: 1440, height: 2200 },
  { name: 'mobile', width: 390, height: 844, isMobile: true, hasTouch: true },
];

await fs.mkdir('tmp/review-shots', { recursive: true });

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.isMobile || false,
    hasTouch: vp.hasTouch || false,
    deviceScaleFactor: 1,
  });

  for (const p of pages) {
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:4321${p.path}`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.screenshot({ path: `tmp/review-shots/${p.name}-${vp.name}.png`, fullPage: true });
    await page.close();
  }

  await context.close();
}

await browser.close();
console.log('done');
