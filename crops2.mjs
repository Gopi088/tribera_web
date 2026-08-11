import { chromium } from 'playwright';
const browser = await chromium.launch();
for (const [w, tag] of [[375, 'm'], [1280, 'd']]) {
  const pg = await browser.newPage({ viewport: { width: w, height: 900 } });
  await pg.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  const info = await pg.evaluate(() => {
    const tr = document.querySelector('.verd__track').getBoundingClientRect();
    const in1 = document.querySelector('#labRows input').getBoundingClientRect();
    const lab = document.getElementById('lab').getBoundingClientRect();
    const trx = (el) => { const b = el.getBoundingClientRect(); return { x: Math.round(b.left), y: Math.round(scrollY + b.top), w: Math.round(b.width), h: Math.round(b.height) }; };
    return { labTop: Math.round(lab.top), toScroll: Math.round(scrollY + lab.top - 60), tr: trx(document.querySelector('.verd__track')), in1: trx(document.querySelector('#labRows input')) };
  });
  await pg.evaluate(s => { window.scrollTo(0, s); }, info.toScroll);
  await pg.waitForTimeout(2500);
  const full = await pg.evaluate(() => document.body.scrollHeight);
  await pg.screenshot({ path: `/tmp/opencode/full_${tag}.png`, fullPage: true });
  console.log(tag, JSON.stringify({ ...info, full }));
  await pg.close();
}
await browser.close();
