import { chromium } from 'playwright';
const browser = await chromium.launch();
const pg = await browser.newPage({ viewport: { width: 375, height: 600 } });
await pg.goto('http://localhost:4321/services', { waitUntil: 'networkidle' });
await pg.waitForTimeout(1500);
const r = await pg.evaluate(() => {
  const card = document.querySelector('.hero__card');
  const tilt = card.querySelector('.tilt');
  const fl = card.querySelector('.flip');
  return {
    card: { transform: getComputedStyle(card).transform, mt: getComputedStyle(card).marginTop, mb: getComputedStyle(card).marginBottom },
    tilt: { transform: getComputedStyle(tilt).transform, mt: getComputedStyle(tilt).marginTop, mb: getComputedStyle(tilt).marginBottom },
    flip: { transform: getComputedStyle(fl).transform, mt: getComputedStyle(fl).marginTop, mb: getComputedStyle(fl).marginBottom },
  };
});
console.log(JSON.stringify(r, null, 1));
await browser.close();
