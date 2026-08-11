import { chromium } from 'playwright';
const browser = await chromium.launch();
const out = {};
for (const [w, tag] of [[375, 'm'], [1280, 'd']]) {
  const pg = await browser.newPage({ viewport: { width: w, height: 900 } });
  await pg.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  const info = await pg.evaluate(() => {
    const lab = document.getElementById('lab');
    const tr = document.querySelector('.verd__track').getBoundingClientRect();
    const in1 = document.querySelector('#labRows input').getBoundingClientRect();
    const verd = document.querySelector('.verd').getBoundingClientRect();
    return { toScroll: scrollY + lab.getBoundingClientRect().top - 60,
      tr: { x: Math.round(tr.left), y: Math.round(tr.top), w: Math.round(tr.width), h: Math.round(tr.height) },
      in1: { x: Math.round(in1.left), y: Math.round(in1.top), w: Math.round(in1.width), h: Math.round(in1.height) },
      verd: { x: Math.round(verd.left), y: Math.round(verd.top), w: Math.round(verd.width), h: Math.round(verd.height) } };
  });
  await pg.evaluate(s => { window.scrollTo(0, s); }, info.toScroll);
  await pg.waitForTimeout(2500);
  const tr = info.tr, in1 = info.in1;
  await pg.screenshot({ path: `/tmp/opencode/tr_${tag}.png`, clip: { x: tr.x - 8, y: tr.y - 30, width: tr.w + 16, height: 90 } });
  await pg.screenshot({ path: `/tmp/opencode/sl_${tag}.png`, clip: { x: in1.x - 8, y: in1.y - 12, width: in1.w + 16, height: 44 } });
  await pg.close();
}
await browser.close();
