import { chromium } from 'playwright';
const browser = await chromium.launch();
const pg = await browser.newPage({ viewport: { width: 375, height: 800 } });
await pg.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
const info = await pg.evaluate(() => {
  const lab = document.getElementById('lab');
  const r = lab.getBoundingClientRect();
  return { toScroll: scrollY + r.top - 40 };
});
await pg.evaluate(s => { window.scrollTo(0, s); }, info.toScroll);
await pg.waitForTimeout(2500);
await pg.screenshot({ path: '/tmp/opencode/labpx.png' });
console.log('scrolled to', info.toScroll);
await browser.close();
