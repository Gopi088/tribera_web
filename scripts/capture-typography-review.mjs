import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4335';
const out = '/tmp/tribera-type-review-final';
await mkdir(out, { recursive: true });
const sections = [
  ['home-proof', '/', '#proof'],
  ['home-experts', '/', '#experts'],
  ['home-funnel', '/', '#funnel'],
  ['about-doors', '/about/', '#contact'],
  ['about-letter', '/about/', '#letter'],
  ['candidate-preview', '/candidates/', '#proof'],
  ['candidate-score', '/candidates/', '#score'],
  ['candidate-start', '/candidates/start/', '.apply'],
  ['careers-roles', '/careers/', '#roles'],
  ['career-details', '/careers/talent-associate/', '#bring'],
  ['services-letter', '/services/', '#why'],
  ['services-offers', '/services/', '.ocs'],
  ['blog-newsletter', '/blog/', '.sub'],
  ['function-evidence', '/functions/engineering-platform/', '#asks'],
  ['industry-cards', '/industries/', '#all'],
  ['intelligence', '/intelligence/', '#fail'],
  ['intelligence-availability', '/intelligence/', '#avail'],
];
const browser = await chromium.launch();
const manifest = [];
try {
  for (const width of [390, 1520]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await page.route('**/*', (r) =>
      r.request().url().startsWith(base) && r.request().method() === 'GET' ? r.continue() : r.abort()
    );
    for (const [name, route, selector] of sections) {
      await page.goto(base + route, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      if (name === 'services-offers') await page.locator('.oc__hd').first().click();
      const el = page.locator(selector).first();
      if (!(await el.count())) {
        manifest.push({ name, route, width, error: `Missing ${selector}` });
        continue;
      }
      const file = `${out}/${name}-${width}.png`;
      await el.screenshot({ path: file });
      manifest.push({ name, route, width, file });
    }
    await page.close();
  }
} finally {
  await browser.close();
}
await writeFile(`${out}/manifest.json`, JSON.stringify(manifest, null, 2));
console.log(manifest);
