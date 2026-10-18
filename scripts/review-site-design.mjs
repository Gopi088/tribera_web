import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4335';
const out = path.resolve(process.env.DESIGN_REVIEW_OUT || 'artifacts/site-design-review-2026-09-19');
fs.mkdirSync(out, { recursive: true });
const routes = fs
  .readdirSync('dist', { recursive: true })
  .filter((f) => f.endsWith('.html'))
  .map((f) => {
    const route = f === 'index.html' ? '/' : f.endsWith('/index.html') ? `/${f.slice(0, -11)}` : `/${f}`;
    return { route, scope: route === '/decapcms' ? 'admin' : 'public' };
  })
  .sort((a, b) => a.route.localeCompare(b.route));
const browser = await chromium.launch();
const results = [];
const family = (r) =>
  r === '/'
    ? 'homepage'
    : r === '/404.html'
      ? 'error'
      : /^\/(privacy|terms|security)$/.test(r)
        ? 'legal'
        : r.startsWith('/tag/') || r.startsWith('/category/')
          ? 'blog-taxonomy'
          : r.startsWith('/industries/')
            ? 'industry-detail'
            : r.startsWith('/functions/')
              ? 'function-detail'
              : r.startsWith('/careers/')
                ? 'career-detail'
                : r.startsWith('/blog/')
                  ? 'article'
                  : r.slice(1);
try {
  for (const width of [390, 1520, 1920]) {
    const page = await browser.newPage({
      viewport: { width, height: 1000 },
      reducedMotion: 'reduce',
      colorScheme: 'light',
    });
    await page.route('**/*', (r) =>
      r.request().url().startsWith(base) && r.request().method() === 'GET' ? r.continue() : r.abort()
    );
    for (const { route, scope } of routes) {
      if (scope === 'admin') continue;
      const errors = [];
      const onError = (e) => errors.push(e.message);
      page.on('pageerror', onError);
      try {
        const response = await page.goto(base + route, { waitUntil: 'load', timeout: 20000 });
        await page.evaluate(() => document.fonts.ready);
        await page.evaluate(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
        });
        await page.waitForTimeout(60);
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        const details = await page.evaluate(() => {
          const root = document.querySelector('main') || document.body;
          const visible = (e) => {
            const s = getComputedStyle(e);
            return (
              e.getClientRects().length &&
              s.display !== 'none' &&
              s.visibility !== 'hidden' &&
              !e.closest('[role="dialog"],.nav,#navp,footer')
            );
          };
          const style = (e) => {
            const s = getComputedStyle(e);
            return {
              font: s.fontFamily,
              size: s.fontSize,
              weight: s.fontWeight,
              line: s.lineHeight,
              tracking: s.letterSpacing,
              color: s.color,
              bg: s.backgroundColor,
              radius: s.borderRadius,
            };
          };
          const headings = [...root.querySelectorAll('h1,h2,h3,h4')].filter(visible).map((e) => ({
            tag: e.tagName,
            text: e.textContent.replace(/\s+/g, ' ').trim(),
            class: e.className,
            ...style(e),
          }));
          const paragraphs = [...root.querySelectorAll('p')].filter(visible);
          const bodyStyles = [
            ...new Map(
              paragraphs.map((e) => {
                const s = style(e);
                return [JSON.stringify(s), { ...s, text: e.textContent.replace(/\s+/g, ' ').trim().slice(0, 100) }];
              })
            ).values(),
          ];
          const overflow = [...root.querySelectorAll('h1,h2,h3,h4,p,button,input,textarea,label')]
            .filter(visible)
            .flatMap((e) => {
              const r = e.getBoundingClientRect();
              // Ignore intentional honeypots and visually hidden upload inputs.
              if (e.tagName === 'INPUT' && (r.width <= 2 || r.x < -1000)) return [];
              return r.width > 0 && (r.x < -2 || r.right > innerWidth + 2 || e.scrollWidth > e.clientWidth + 3)
                ? [
                    {
                      tag: e.tagName,
                      text: e.textContent.trim().slice(0, 100),
                      x: r.x,
                      right: r.right,
                      client: e.clientWidth,
                      scroll: e.scrollWidth,
                    },
                  ]
                : [];
            });
          const nav = document.querySelector('#nav');
          const footer = document.querySelector('footer.ft');
          const wraps = [...root.querySelectorAll('.wrap,.legal-document,.container')]
            .filter(visible)
            .slice(0, 4)
            .map((e) => ({
              class: e.className,
              x: e.getBoundingClientRect().x,
              width: e.getBoundingClientRect().width,
            }));
          return {
            title: document.title,
            rootFont: getComputedStyle(document.documentElement).fontSize,
            horizontalOverflow: document.documentElement.scrollWidth - innerWidth,
            headings,
            bodyStyles,
            overflow,
            wraps,
            nav: nav
              ? {
                  ...style(nav),
                  items: [...nav.querySelectorAll('.nav__links > a')].map((e) => e.textContent),
                  coverage: nav.querySelector('.dd__t')?.textContent,
                }
              : null,
            footer: footer
              ? {
                  ...style(footer),
                  wordmark: footer.querySelector('.logo')?.textContent,
                  cities: footer.querySelector('.ft__made')?.textContent,
                  topTargetExists: !!document.querySelector(
                    footer.querySelector('.ft__up')?.getAttribute('href') || '#nav'
                  ),
                  labels: [...footer.querySelectorAll('.ft__ttl')].map((e) => ({ text: e.textContent, ...style(e) })),
                  links: [...footer.querySelectorAll('a[href]')].map((e) => ({
                    text: e.textContent,
                    href: e.getAttribute('href'),
                  })),
                }
              : null,
            brokenImages: [...root.querySelectorAll('img')]
              .filter((e) => !e.complete || e.naturalWidth === 0)
              .map((e) => e.getAttribute('src')),
          };
        });
        const name = route === '/' ? 'home' : route.replace(/^\//, '').replaceAll('/', '__').replaceAll('.', '_');
        const shot = path.join(out, `${name}-${width}.png`);
        await page.screenshot({ path: shot });
        if (width !== 1920)
          await page.screenshot({ path: path.join(out, `${name}-${width}-full.png`), fullPage: true });
        results.push({
          route,
          family: family(route),
          width,
          status: response?.status(),
          screenshot: shot,
          errors,
          ...details,
        });
        console.log(
          `${width}px ${route}: ${details.headings.length} headings, ${details.overflow.length} overflow candidates`
        );
      } catch (e) {
        results.push({ route, width, family: family(route), failure: e.message });
        console.log(`FAILED ${width}px ${route}: ${e.message}`);
      }
      page.off('pageerror', onError);
      fs.writeFileSync(
        path.join(out, 'inventory.json'),
        JSON.stringify({ base, excluded: routes.filter((r) => r.scope === 'admin'), results }, null, 2)
      );
    }
    await page.close();
  }
} finally {
  await browser.close();
}
const compact = results.map(({ headings = [], bodyStyles = [], screenshot, ...r }) => ({
  ...r,
  screenshot,
  headings: headings.filter((h) => h.tag === 'H1' || h.tag === 'H2'),
  bodyStyles: bodyStyles.slice(0, 8),
  otherHeadingStyles: [
    ...new Set(
      headings
        .filter((h) => h.tag !== 'H1' && h.tag !== 'H2')
        .map((h) => `${h.tag} ${h.font} ${h.size}/${h.line} ${h.weight}`)
    ),
  ],
}));
fs.writeFileSync(path.join(out, 'census.json'), JSON.stringify(compact, null, 2));
console.log(
  `Finished ${results.length} rendered checks across ${routes.filter((r) => r.scope === 'public').length} public routes. Admin excluded: /decapcms.`
);
