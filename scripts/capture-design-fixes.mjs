import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const stage = process.argv[2] || 'final';
const out = path.resolve(`artifacts/site-design-fixes-2026-09-19/${stage}`);
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const records = [];
const selected = new Set((process.env.DESIGN_TARGETS || '').split(',').filter(Boolean));
const targets = [
  ['home-hero', '/', '#nav'],
  ['home-proof', '/', '#proof'],
  ['home-funnel', '/', '#funnel'],
  ['home-footer', '/', 'footer'],
  ['career-note', '/careers/talent-associate/', '#bring'],
  ['about-letter', '/about/', '.ltr'],
  ['about-footer', '/about/', 'footer'],
  ['archive', '/tag/technical-hiring/', '.hero'],
  ['archive-nav', '/tag/technical-hiring/', '#nav'],
  ['category', '/category/technical-hiring/', '.hero'],
  ['industry', '/industries/ai-data/', '.shead'],
  ['function', '/functions/engineering-platform/', '.shead'],
  ['legal', '/privacy/', '.legal-document'],
  ['missing', '/404.html', '.missing-page'],
  ['about-claims', '/about/', '#ahead'],
].filter(([name]) => !selected.size || selected.has(name));
try {
  for (const width of [390, 1520, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4322';
    await page.route('**/*', (r) =>
      r.request().url().startsWith(base) && r.request().method() === 'GET' ? r.continue() : r.abort()
    );
    for (const [name, route, selector] of targets) {
      await page.goto(base + route, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => document.querySelectorAll('[data-rv]').forEach((el) => el.classList.add('in')));
      const target = page.locator(selector).first();
      if (!(await target.count())) throw new Error(`Missing ${selector} on ${route}`);
      if (selector !== '#nav')
        await page.locator('#nav').evaluate((el) => {
          el.style.visibility = 'hidden';
        });
      await target.screenshot({ path: `${out}/${name}-${width}.png` });
      records.push(
        await page.evaluate(
          ({ name, route, width }) => {
            const selectors = [
              '.v58-eyebrow',
              '.lab-key',
              '.eyebrow',
              '.own',
              '.side-k',
              '.verd-ax',
              '.lt i',
              '.jd__note',
              '.ft__ttl',
              '.ft__line',
              '.ft__bar',
              '.nav__sw a:not(.is)',
              '.ltr__k',
              '.legal-document__body',
              '.shead .dek',
              '.hero h1',
              '.hero__p',
              '.topic-filters a[aria-current]',
              '#nav a[href="/blog"]',
            ];
            const styles = selectors.flatMap((selector) =>
              Array.from(document.querySelectorAll(selector))
                .slice(0, 4)
                .map((el) => {
                  const s = getComputedStyle(el),
                    r = el.getBoundingClientRect();
                  return {
                    selector,
                    text: el.textContent.trim().slice(0, 180),
                    color: s.color,
                    background: s.backgroundColor,
                    fontSize: s.fontSize,
                    fontFamily: s.fontFamily,
                    maxWidth: s.maxWidth,
                    textAlign: s.textAlign,
                    width: r.width,
                    height: r.height,
                    top: r.top,
                    bottom: r.bottom,
                    ariaCurrent: el.getAttribute('aria-current'),
                  };
                })
            );
            return { name, route, width, pageOverflow: document.documentElement.scrollWidth > innerWidth + 1, styles };
          },
          { name, route, width }
        )
      );
    }
    await page.close();
  }
  fs.writeFileSync(`${out}/measurements.json`, JSON.stringify(records, null, 2));
  console.log(`${records.length} captures; ${records.filter((r) => r.pageOverflow).length} pages overflow`);
} finally {
  await browser.close();
}
