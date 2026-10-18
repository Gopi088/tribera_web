import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4322';
const browser = await chromium.launch();
const folder = 'artifacts/home-v126';
fs.mkdirSync(folder, { recursive: true });
try {
  const sample = fs
    .readFileSync('sample_data/tribera-home-v126.html', 'utf8')
    .replace(/<link[^>]*href="https:\/\/fonts[^>]*>/g, '')
    .replace('</head>', `<link rel="stylesheet" href="${base}/fonts/site-fonts.css"></head>`);
  for (const width of [390, 1520]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await page.goto(base);
    await page.setContent(sample, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${folder}/sample-${width}.png`, fullPage: true });
    await page.close();
  }
  // The sample references an omitted share image. Recreate its documented design
  // using the supplied field mark and the site's locally hosted typefaces.
  const field = fs
    .readFileSync('src/components/home/v126/sections/hero.html', 'utf8')
    .match(/<div class="hero-field"[^>]*>([\s\S]*?)<\/div>/)[1];
  const page = await browser.newPage({ viewport: { width: 2400, height: 1260 }, reducedMotion: 'reduce' });
  await page.goto(base);
  await page.setContent(
    `<!doctype html><html><head><link rel="stylesheet" href="${base}/fonts/site-fonts.css"><style>
    *{box-sizing:border-box}body{margin:0;background:#F1EEE7;color:#131313;width:2400px;height:1260px;position:relative;padding:112px 144px;font-family:'Inter Tight',sans-serif}
    .brand{font-size:64px;font-weight:600;letter-spacing:-3px}.brand sup{color:#DA0007;font-size:28px;vertical-align:super}
    .field{position:absolute;width:2112px;left:144px;top:375px}.field svg{width:100%;height:auto}
    .headline{position:absolute;top:360px;left:144px;font-family:Fraunces,Georgia,serif;font-weight:500;font-size:132px;line-height:1.12;letter-spacing:-1.32px;margin:0}
    .word{font-style:italic;position:relative;display:inline-block}.word svg{position:absolute;left:0;bottom:-26px;width:100%;height:28px;overflow:visible}
    .signoff{position:absolute;left:144px;bottom:114px;font-family:'JetBrains Mono',monospace;font-size:28px;letter-spacing:4px;text-transform:uppercase}
  </style></head><body><div class="brand">tribera<sup>™</sup></div><div class="field">${field}</div><h1 class="headline">Three candidates.<br>Every one <span class="word">worth the interview.<svg viewBox="0 0 120 12" preserveAspectRatio="none" aria-hidden="true"><path d="M2,8 C26,3.5 54,9.5 84,6 C104,3.6 116,8 118,5" fill="none" stroke="#DA0007" stroke-width="2.6" stroke-linecap="round"/></svg></span></h1><p class="signoff">One bar. Every candidate. The proof behind each one.</p></body></html>`,
    { waitUntil: 'networkidle' }
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.resolve('public/og-image.png') });
  await page.close();
  console.log('Captured sample references and recreated og-image.png (2400×1260)');
} finally {
  await browser.close();
}
