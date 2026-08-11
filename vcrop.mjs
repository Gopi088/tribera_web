import { chromium } from 'playwright';
const browser = await chromium.launch();
for (const [w, tag] of [[375, 'm'], [1280, 'd']]) {
  const pg = await browser.newPage({ viewport: { width: w, height: 900 } });
  await pg.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  const info = await pg.evaluate(() => {
    const tr = document.querySelector('.verd__track').getBoundingClientRect();
    const pin = document.getElementById('labPin').getBoundingClientRect();
    const sel = document.querySelector('.verd__sel').getBoundingClientRect();
    const grey = document.querySelector('.verd__grey').getBoundingClientRect();
    const lab = document.getElementById('lab').getBoundingClientRect();
    return {
      toScroll: Math.round(scrollY + lab.top - 500),
      tr: { y: Math.round(scrollY + tr.top), x: Math.round(tr.left) },
      pin: { x: Math.round(scrollY + pin.left) , len: Math.round(pin.width) },
      sel: { x: Math.round(sel.left), len: Math.round(sel.width) },
      grey: { x: Math.round(grey.left), len: Math.round(grey.width) },
    };
  });
  await pg.evaluate(s => { window.scrollTo(0, s); }, info.toScroll);
  await pg.waitForTimeout(3000);
  console.log(tag, JSON.stringify(info));
  await pg.close();
}
await browser.close();
