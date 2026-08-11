import { chromium } from 'playwright';
const browser = await chromium.launch();
const pg = await browser.newPage({ viewport: { width: 375, height: 800 } });
await pg.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await pg.evaluate(() => { window.scrollTo(0, document.getElementById('lab').getBoundingClientRect().top + scrollY - 40); });
await pg.waitForTimeout(2500);
await pg.screenshot({ path: '/tmp/opencode/lab375.png' });
await browser.close();
