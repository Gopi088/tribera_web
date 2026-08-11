import { chromium } from 'playwright';
const browser = await chromium.launch();
const shots = [
  ['http://localhost:4321/services', 'hero-svc', 560],
  ['http://localhost:4321/blog', 'hero-blog', 560],
  ['http://localhost:4321/careers', 'hero-careers', 560],
  ['http://localhost:4321/', 'hero-home', 560],
];
for (const [url, name, h] of shots) {
  const pg = await browser.newPage({ viewport: { width: 375, height: h } });
  await pg.goto(url, { waitUntil: 'networkidle' });
  await pg.waitForTimeout(600);
  const box = await pg.evaluate(() => {
    const c = document.querySelector('.hero__card');
    if (!c) return null;
    const r = c.getBoundingClientRect();
    return { top: r.top, bottom: r.bottom, h: r.height, vh: innerHeight, page: document.body.scrollHeight };
  });
  console.log(url, JSON.stringify(box));
  await pg.screenshot({ path: `/tmp/opencode/${name}.png`, clip: { x: 0, y: 0, width: 375, height: h } });
  await pg.close();
}
await browser.close();
