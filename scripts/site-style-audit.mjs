import { readdir, mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const out = process.env.AUDIT_OUT || '/tmp/tribera-site-style/baseline';
const selected = process.env.AUDIT_ROUTES?.split(',');
async function walk(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...(await walk(file)));
    else if (file.endsWith('.html')) result.push(file);
  }
  return result;
}
const routes =
  selected ||
  (await walk('dist'))
    .map((file) => file.replace(/^dist/, '').replace(/index\.html$/, ''))
    .filter((route) => !route.startsWith('/decapcms/'))
    .sort();
if (!routes.length) throw new Error('No built public routes found; finish the build before auditing.');
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
let records = [];
if (selected) {
  try {
    records = JSON.parse(await readFile(path.join(out, 'manifest.json'), 'utf8')).filter(
      (record) => !selected.includes(record.route)
    );
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}
try {
  for (const route of routes) {
    const slug = route.replace(/^\/+|\/+$/g, '').replaceAll('/', '__') || 'home';
    for (const width of [390, 1520]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      // Audit rendering only: never submit a form or let a third party receive one.
      await page.route('**/*', (route) => (route.request().method() === 'POST' ? route.abort() : route.continue()));
      try {
        const response = await page.goto(base + route, { waitUntil: 'networkidle', timeout: 30000 });
        await page.evaluate(() => document.fonts.ready);
        // Trigger scroll-driven presentation before taking a full-page capture.
        await page.evaluate(async () => {
          for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
            window.scrollTo(0, y);
            await new Promise((resolve) => setTimeout(resolve, 20));
          }
          window.scrollTo(0, 0);
        });
        const details = await page.evaluate(() => ({
          title: document.title,
          description: document.querySelector('meta[name=description]')?.content,
          canonical: document.querySelector('link[rel=canonical]')?.href,
          mains: document.querySelectorAll('main').length,
          headings: [...document.querySelectorAll('h1,h2,h3')].map((e) => ({
            tag: e.tagName,
            text: e.textContent.trim(),
          })),
          overflow: document.documentElement.scrollWidth > innerWidth,
          forms: [...document.forms].map((form) => ({ action: form.getAttribute('action'), method: form.method })),
          links: [...document.querySelectorAll('a[href]')].map((e) => ({
            text: e.textContent.trim(),
            href: e.getAttribute('href'),
          })),
          copy:
            (document.querySelector('main') || document.body).innerText +
            '\n\nCOLLAPSIBLE CONTENT (including closed states):\n' +
            [...document.querySelectorAll('main details')].map((element) => element.textContent.trim()).join('\n\n'),
        }));
        const screenshot = path.join(out, `${slug}-${width}.png`);
        await page.screenshot({ path: screenshot, fullPage: true });
        if (width === 1520) await writeFile(path.join(out, `${slug}-copy.txt`), details.copy);
        if (process.env.AUDIT_CROPS === '1') {
          const sections = page.locator(
            'main > header, main > section, .site-editorial > header, .site-editorial > section, .v58-home > header, .v58-home > section, .candidate-page > header, .candidate-page > section'
          );
          for (let index = 0; index < (await sections.count()); index++) {
            await sections.nth(index).screenshot({ path: path.join(out, `${slug}-${width}-section-${index}.png`) });
          }
        }
        records.push({ route, width, status: response.status(), screenshot, errors, ...details });
        console.log(`${width} ${route} ${response.status()} overflow=${details.overflow}`);
      } catch (error) {
        records.push({ route, width, error: error.message, errors });
        console.log(`FAILED ${width} ${route}: ${error.message}`);
      } finally {
        await page.close();
      }
      await writeFile(path.join(out, 'manifest.json'), JSON.stringify(records, null, 2));
    }
  }
} finally {
  await browser.close();
}
if (records.some((record) => record.error)) process.exitCode = 1;
