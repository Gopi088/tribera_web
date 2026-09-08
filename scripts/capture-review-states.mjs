import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
const out = '/tmp/tribera-site-style/final-states';
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const records = [];
try {
  for (const width of [390, 1520]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await page.route('**/*', (route) => (route.request().method() === 'POST' ? route.abort() : route.continue()));
    for (const [name, route, selector] of [
      ['hiring-work', '/', '#work'],
      ['candidate-score', '/candidates/', '#score'],
      ['services', '/services/', '.leads'],
      ['intelligence', '/intelligence/', '.hero'],
      ['career-roles', '/careers/', '#roles'],
      ['contact', '/contact/', '.cform'],
      ['topic', '/category/candidate-experience/', '.band'],
      ['function', '/functions/data-analytics/', '.hero'],
    ]) {
      await page.goto('http://127.0.0.1:4321' + route, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() =>
        document.querySelectorAll('[data-rv]').forEach((element) => element.classList.add('in'))
      );
      const path = `${out}/${name}-${width}.png`;
      await page.locator(selector).screenshot({ path });
      await page.locator('#nav').screenshot({ path: `${out}/${name}-nav-${width}.png` });
      records.push({ name, route, width, path });
    }
    await page.goto('http://127.0.0.1:4321/candidates/start/', { waitUntil: 'networkidle' });
    await page
      .locator('#cvInput')
      .setInputFiles({ name: 'sample.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4\nMock sample') });
    await page.locator('.apply').screenshot({ path: `${out}/candidate-enabled-${width}.png` });
    await page.goto('http://127.0.0.1:4321/functions/data-analytics/', { waitUntil: 'networkidle' });
    const faq = page.locator('details').first();
    await faq.locator('summary').click();
    await faq.screenshot({ path: `${out}/faq-expanded-${width}.png` });
    await page.goto('http://127.0.0.1:4321/services/', { waitUntil: 'networkidle' });
    await page.locator('.oc__hd').first().click();
    await page
      .locator('.oc.op')
      .first()
      .screenshot({ path: `${out}/service-expanded-${width}.png` });
    await page.close();
  }
  await writeFile(`${out}/manifest.json`, JSON.stringify(records, null, 2));
} finally {
  await browser.close();
}
