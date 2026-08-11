import { chromium } from 'playwright';
const browser = await chromium.launch();
for (const [url, tag] of [['http://localhost:4321/', 'HOME'], ['http://localhost:4321/services', 'SERVICES'], ['http://localhost:4321/careers', 'CAREERS'], ['http://localhost:4321/blog', 'BLOG']]) {
  const pg = await browser.newPage({ viewport: { width: 375, height: 800 } });
  await pg.goto(url, { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.querySelector('.burger, .nav__burger, [aria-label*="Menu"], button:has(span.burger)')) // ensure exists
  await pg.locator('.burger, [aria-label="Menu"], .navb, .nv').first().click().catch(() => {});
  await pg.waitForTimeout(400);
  const r = await pg.evaluate(() => {
    const navp = document.querySelector('.navp, #navp, nav.mobile, .menu');
    if (!navp) return { missing: true };
    const links = [...navp.querySelectorAll('a')].filter(a => getComputedStyle(a).display !== 'none');
    return links.slice(0, 12).map(a => {
      const c = getComputedStyle(a);
      return { t: a.textContent.trim().slice(0, 18), fs: parseFloat(c.fontSize), fw: c.fontWeight, lh: parseFloat(c.lineHeight), ff: c.fontFamily.split(',')[0].trim().replace(/"/g, ''), ls: c.letterSpacing, cls: (a.className || '').toString().slice(0, 22) };
    });
  });
  console.log('### ' + tag);
  console.log(JSON.stringify(r));
  await pg.close();
}
await browser.close();
