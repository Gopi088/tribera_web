import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const pages = ['/', '/candidates', '/about', '/contact'];
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844, isMobile: true, hasTouch: true },
];
const report = [];
for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: !!vp.isMobile, hasTouch: !!vp.hasTouch, deviceScaleFactor: 1 });
  for (const path of pages) {
    const page = await context.newPage();
    const consoleErrors = [];
    page.on('console', msg => { if (['error','warning'].includes(msg.type())) consoleErrors.push({ type: msg.type(), text: msg.text() }); });
    await page.goto(`http://127.0.0.1:4321${path}`, { waitUntil: 'networkidle', timeout: 60000 });
    const data = await page.evaluate(() => {
      const overflow = [];
      const all = Array.from(document.querySelectorAll('body *'));
      for (const el of all) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && (r.right - window.innerWidth > 2 || r.left < -2)) {
          overflow.push({ tag: el.tagName, className: el.className?.toString().slice(0,120), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), text: (el.textContent || '').trim().slice(0,80) });
          if (overflow.length >= 8) break;
        }
      }
      return {
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        overflow,
      };
    });
    report.push({ path, viewport: vp.name, ...data, consoleErrors });
    await page.close();
  }
  await context.close();
}
console.log(JSON.stringify(report, null, 2));
await browser.close();
