import { chromium } from 'playwright';
const browser = await chromium.launch();
const urls = ['/', '/candidates', '/services', '/careers', '/blog', '/industries', '/functions', '/contact', '/about', '/intelligence', '/blog/rethinking-hiring-metrics-signal-efficiency', '/careers/recruiter-technical-sourcer'];
for (const [w, tag] of [[375, 'M'], [1280, 'D']]) {
  for (const p of urls) {
    const pg = await browser.newPage({ viewport: { width: w, height: 800 } });
    await pg.goto('http://localhost:4321' + p, { waitUntil: 'networkidle' });
    await pg.evaluate(() => { const c = document.querySelector('.hero__card'); if (c) c.scrollIntoView({ block: 'center' }); });
    await pg.waitForTimeout(1600);
    const r = await pg.evaluate(() => {
      const c = document.querySelector('.hero__card');
      const h = document.querySelector('.hero');
      const n = h.nextElementSibling;
      if (!c) return 'NO-CARD';
      const cb = c.getBoundingClientRect().bottom, nb = n.getBoundingClientRect().top;
      return +(nb - cb).toFixed(1);
    });
    console.log(tag, p.padEnd(52), 'cardGapToNext:', r);
    await pg.close();
  }
}
await browser.close();
