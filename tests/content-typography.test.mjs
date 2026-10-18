import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4331';
async function routes(dir = 'dist') {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = `${dir}/${entry.name}`;
    if (entry.isDirectory()) result.push(...(await routes(file)));
    else if (file.endsWith('.html') && !file.includes('/decapcms/')) {
      result.push(file.replace(/^dist/, '').replace(/index\.html$/, ''));
    }
  }
  return result.sort();
}

const browser = await chromium.launch();
const failures = [];
let count = 0;
try {
  for (const width of [320, 390, 768, 1520]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await page.route('**/*', (request) =>
      request.request().method() !== 'GET' || !request.request().url().startsWith(base)
        ? request.abort()
        : request.continue()
    );
    for (const route of await routes()) {
      const errors = [];
      const onError = (error) => errors.push(error.message);
      page.on('pageerror', onError);
      // Typography depends on loaded styles/fonts, not an arbitrary network-idle delay.
      const response = await page.goto(base + route, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      const issues = await page.evaluate(() => {
        const issues = [];
        const probe = document.createElement('span');
        document.body.append(probe);
        const size = (role) => {
          probe.style.fontSize = `var(--type-${role}-size)`;
          return parseFloat(getComputedStyle(probe).fontSize);
        };
        const near = (a, b) => Math.abs(a - b) < 0.1;
        const visible = (el) => el.getClientRects().length && !el.closest('nav,footer,dialog,[role="dialog"],#nav');
        for (const el of [...document.querySelectorAll('h1,h2,.v58-heading--h3,.c-preview__heading h3')].filter(
          visible
        )) {
          const role =
            el.tagName === 'H3'
              ? 'card'
              : el.tagName === 'H1'
                ? 'hero'
                : el.closest('.legal-document')
                  ? 'document'
                  : el.closest('article.art')
                    ? 'article'
                    : 'section';
          const css = getComputedStyle(el);
          const label = el.textContent.trim().slice(0, 65);
          const clamp = (min, vw, max) => Math.max(min, Math.min(max, (innerWidth * vw) / 100));
          let expectedSize = size(role);
          let expectedWeight = '500';
          let expectedTracking = -0.01;
          const leadingRole = role === 'document' ? 'article' : role;
          let leading = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue(`--type-${leadingRole}-leading`)
          );
          // Explicit version contracts from sample.css, candidate-v7.css and the
          // current industries hero. These routes intentionally predate v9 with
          // their own scales; shared editorial tokens still govern other routes.
          if (el.closest('.v126-home') && ['H1', 'H2'].includes(el.tagName)) {
            expectedSize = el.tagName === 'H1' ? clamp(41.6, 5.6, 66.4) : clamp(32, 3.9, 48);
            leading = 1.08;
            if (el.matches('.ops h2')) {
              expectedSize = clamp(26, 3, 40);
              expectedWeight = '600';
              expectedTracking = -0.02;
            }
            if (el.matches('.proc h2')) expectedSize = clamp(24, 2.6, 32.8);
          } else if (el.closest('.candidate-v7') && ['H1', 'H2'].includes(el.tagName)) {
            expectedSize = el.tagName === 'H1' ? clamp(36, 4.6, 62) : clamp(30, 4.2, 54);
            leading = el.tagName === 'H1' ? 1.02 : 1.08;
          } else if (el.matches('.industries-hero h1')) {
            expectedSize = clamp(41.6, 5.6, 66.4);
            leading = 1.08;
          }
          if (!near(parseFloat(css.fontSize), expectedSize))
            issues.push(`${label}: ${css.fontSize}, expected ${role} ${expectedSize}`);
          if (!near(parseFloat(css.lineHeight), parseFloat(css.fontSize) * leading))
            issues.push(`${label}: wrong ${role} leading ${css.lineHeight}`);
          if (!css.fontFamily.includes('Fraunces')) issues.push(`${label}: wrong display family`);
          if (el.tagName !== 'H3' && css.fontWeight !== expectedWeight)
            issues.push(`${label}: wrong heading weight ${css.fontWeight}`);
          if (
            ['hero', 'section', 'article'].includes(role) &&
            !near(parseFloat(css.letterSpacing), expectedTracking * parseFloat(css.fontSize))
          )
            issues.push(`${label}: wrong display tracking ${css.letterSpacing}`);
        }
        for (const el of [
          ...document.querySelectorAll(
            '.v58-lead,.v58-thesis__body,.v58-start__copy,.c-lead,.site-editorial :is(.hero__p,.dek,.fn__dek,.buy__dek,.trust__dek,.ahead__sub,.jd__lead)'
          ),
        ].filter(visible)) {
          const css = getComputedStyle(el);
          if (!near(parseFloat(css.fontSize), size('subtitle')))
            issues.push(`Subtitle ${el.textContent.trim().slice(0, 45)}: ${css.fontSize}`);
          if (!near(parseFloat(css.lineHeight), parseFloat(css.fontSize) * 1.6))
            issues.push(`Subtitle leading: ${css.lineHeight}`);
          if (!css.fontFamily.includes('Inter Tight')) issues.push('Wrong subtitle family');
        }
        if (!near(size('section'), innerWidth < 360 ? 26 : Math.max(28, Math.min(36, innerWidth * 0.03))))
          issues.push('Section token changed');
        const deliverables = document.querySelector('#deliverables');
        if (deliverables) {
          const title = deliverables.querySelector('h2').getBoundingClientRect();
          const lead = deliverables.querySelector('.fn__dek').getBoundingClientRect();
          const wrap = deliverables.querySelector('.wrap').getBoundingClientRect();
          if (!near(title.x, wrap.x) || !near(lead.x, wrap.x) || lead.y < title.bottom)
            issues.push('Services title and subtitle must stack at the shared left edge');
        }
        if (document.documentElement.scrollWidth > innerWidth + 1) issues.push('Page overflows horizontally');
        probe.remove();
        return issues;
      });
      // Static preview serves the explicit error document with 200; dev uses 404.
      if (response.status() !== 200 && !(route === '/404.html' && response.status() === 404))
        issues.push(`HTTP ${response.status()}`);
      failures.push(...[...issues, ...errors].map((issue) => `${route} @${width}: ${issue}`));
      if (issues.length || errors.length) console.error(route, width, issues, errors);
      page.off('pageerror', onError);
      count++;
    }
    await page.close();
    console.log(`Typography: ${width}px complete`);
  }
} finally {
  await browser.close();
}
assert.deepEqual(failures, [], failures.join('\n'));
console.log(`Content typography passed: ${count} route/viewport checks`);
