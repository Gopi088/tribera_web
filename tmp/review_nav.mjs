import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
const results = [];
await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle', timeout: 60000 });
for (const text of ['For Candidates', 'About', 'Contact']) {
  const link = page.getByRole('link', { name: text }).first();
  const href = await link.getAttribute('href');
  await Promise.all([
    page.waitForLoadState('networkidle'),
    link.click(),
  ]).catch(() => {});
  results.push({ text, href, urlAfterClick: page.url(), title: await page.title() });
  await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle', timeout: 60000 });
}
const widths = await page.evaluate(() => ({
  innerWidth: window.innerWidth,
  scrollWidth: document.documentElement.scrollWidth,
  bodyScrollWidth: document.body.scrollWidth,
}));
console.log(JSON.stringify({ results, widths }, null, 2));
await browser.close();
