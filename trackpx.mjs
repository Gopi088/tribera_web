import { chromium } from 'playwright';
const browser = await chromium.launch();
for (const [w, tag] of [[375, 'M375'], [1280, 'D1280']]) {
  const pg = await browser.newPage({ viewport: { width: w, height: 900 } });
  await pg.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  const info = await pg.evaluate(() => {
    const tr = document.querySelector('.verd__track').getBoundingClientRect();
    const lab = document.getElementById('lab').getBoundingClientRect();
    return { ys: Math.round(scrollY + tr.top), h: Math.round(tr.height), labY: Math.round(scrollY + lab.top) };
  });
  await pg.evaluate(s => { window.scrollTo(0, s); }, info.labY - 300);
  await pg.waitForTimeout(3000);
  await pg.screenshot({ path: `/tmp/opencode/tp_${tag}.png`, fullPage: true });
  console.log(tag, JSON.stringify(info));
  await pg.close();
}
await browser.close();
