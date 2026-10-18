import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4331';
const out = process.env.AUDIT_OUT || '/tmp/tribera-heading-review';
const include = process.env.AUDIT_ROUTES?.split(',');
async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(file)));
    else if (file.endsWith('.html')) files.push(file);
  }
  return files;
}
const routes = (await walk('dist'))
  .map((file) => file.replace(/^dist/, '').replace(/index\.html$/, ''))
  .filter((route) => !route.startsWith('/decapcms/'))
  .filter((route) => !include || include.includes(route))
  .sort();
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const records = [];
try {
  for (const route of routes) {
    const slug = route.replace(/^\/+|\/+$/g, '').replaceAll('/', '__') || 'home';
    for (const width of [390, 768, 1520]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      await page.route('**/*', (request) =>
        request.request().method() !== 'GET' || request.request().url().startsWith('https:')
          ? request.abort()
          : request.continue()
      );
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      try {
        const response = await page.goto(base + route, { waitUntil: 'networkidle', timeout: 45000 });
        await page.evaluate(() => document.fonts.ready);
        await page.evaluate(async () => {
          for (let y = 0; y < document.documentElement.scrollHeight; y += 800) {
            scrollTo(0, y);
            await new Promise((resolve) => setTimeout(resolve, 10));
          }
          scrollTo(0, 0);
        });
        const data = await page.evaluate(() => {
          const excluded = (e) => e.closest('nav,footer,[role="dialog"],dialog,[aria-modal="true"],#nav');
          const visible = (e) => {
            const s = getComputedStyle(e);
            return e.getClientRects().length && s.display !== 'none' && s.visibility !== 'hidden';
          };
          const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(
            (e) => !excluded(e) && visible(e)
          );
          const text = (e) => e.textContent.replace(/\s+/g, ' ').trim();
          const selector = (e) =>
            e.id ? '#' + e.id : e.tagName.toLowerCase() + (e.classList.length ? '.' + [...e.classList].join('.') : '');
          const metric = (e) => {
            const s = getComputedStyle(e),
              r = e.getBoundingClientRect();
            const parent = e.parentElement;
            return {
              tag: e.tagName,
              text: text(e),
              selector: selector(e),
              parent: selector(parent),
              section: selector(e.closest('section,article,header') || parent),
              font: s.fontFamily,
              size: parseFloat(s.fontSize),
              weight: s.fontWeight,
              lineHeight: s.lineHeight,
              color: s.color,
              align: s.textAlign,
              maxWidth: s.maxWidth,
              marginTop: s.marginTop,
              marginBottom: s.marginBottom,
              x: r.x,
              y: r.y + scrollY,
              width: r.width,
              height: r.height,
              estimatedLines: Math.round(r.height / parseFloat(s.lineHeight)),
              overflow: e.scrollWidth > e.clientWidth + 1,
              opacity: s.opacity,
            };
          };
          const subtitles = [...document.querySelectorAll('p')]
            .filter(
              (e) =>
                !excluded(e) &&
                visible(e) &&
                (/lead|subtitle|description|intro|summary/.test(e.className) ||
                  /head|hero|intro/.test(e.parentElement.className) ||
                  headings.some((h) => h.nextElementSibling === e))
            )
            .map(metric);
          return {
            title: document.title,
            rootSize: getComputedStyle(document.documentElement).fontSize,
            overflow: document.documentElement.scrollWidth > innerWidth,
            headings: headings.map(metric),
            subtitles,
          };
        });
        const record = { route, width, status: response.status(), errors, ...data };
        records.push(record);
        if (width !== 768) {
          record.screenshot = `${out}/${slug}-${width}.png`;
          await page.screenshot({ path: record.screenshot, fullPage: true });
        }
        if (width === 1520) {
          const crops = page.locator('h1,h2');
          record.crops = [];
          for (let i = 0; i < (await crops.count()); i++) {
            const heading = crops.nth(i);
            if (
              !(await heading.isVisible()) ||
              (await heading.evaluate((e) => !!e.closest('nav,footer,[role="dialog"],dialog,#nav')))
            )
              continue;
            const file = `${out}/${slug}-heading-${i}.png`;
            const area = heading.locator('..');
            const bounds = await area.boundingBox();
            if (!bounds || bounds.height > 1000) continue;
            await area.screenshot({ path: file, style: '#nav { visibility: hidden !important; }' });
            record.crops.push({ text: await heading.textContent(), file });
          }
        }
        console.log(
          `${route} ${width}: ${record.status}, ${data.headings.length} headings, ${data.subtitles.length} subtitle candidates`
        );
      } catch (error) {
        records.push({ route, width, error: error.message, errors });
        console.log(`FAILED ${route} ${width}: ${error.message}`);
      } finally {
        await page.close();
      }
      await writeFile(`${out}/manifest.json`, JSON.stringify(records, null, 2));
    }
    const routeRecords = records.filter((r) => r.route === route);
    const lines = [
      `# ${route}`,
      'Rendered audit. Subtitle candidates include some labels/body paragraphs and require semantic review.',
    ];
    for (const r of routeRecords) {
      lines.push(`\n## ${r.width}px (status ${r.status}, overflow ${r.overflow})`);
      if (r.error) {
        lines.push(r.error);
        continue;
      }
      for (const e of [...r.headings, ...r.subtitles].sort((a, b) => a.y - b.y))
        lines.push(
          `- ${e.tag} ${e.selector} [${e.section}] ${e.size}px/${e.lineHeight} weight ${e.weight}; ${e.font}; ${e.color}; ${e.align}; width ${e.width.toFixed(1)}; ~${e.estimatedLines} lines; y=${e.y.toFixed(1)}: ${e.text}`
        );
      if (r.crops) lines.push('\nDesktop detail crops:', ...r.crops.map((c) => `- ${c.text.trim()}: ${c.file}`));
    }
    await writeFile(`${out}/${slug}.md`, lines.join('\n') + '\n');
  }
} finally {
  await browser.close();
}
if (records.some((r) => r.error)) process.exitCode = 1;
