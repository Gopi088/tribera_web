import { readdir, mkdir, writeFile, readFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:8888';
const out = process.env.AUDIT_OUT || '/tmp/tribera-all-text';
async function routes(dir = 'dist') {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = `${dir}/${entry.name}`;
    if (entry.isDirectory()) result.push(...(await routes(file)));
    else if (file.endsWith('.html') && !file.includes('/decapcms/'))
      result.push(file.replace(/^dist/, '').replace(/index\.html$/, ''));
  }
  return result.sort();
}
await mkdir(out, { recursive: true });
let ready = false;
for (let i = 0; i < 60 && !ready; i++) {
  try {
    ready = (await fetch(base, { signal: AbortSignal.timeout(1000) })).ok;
  } catch {
    /* Preview may still be starting. */
  }
  if (!ready) await new Promise((r) => setTimeout(r, 500));
}
if (!ready) throw new Error(`Audit server unavailable: ${base}`);
const browser = await chromium.launch();
let records = [];
if (process.env.AUDIT_ROUTES) {
  try {
    records = JSON.parse(await readFile(`${out}/inventory.json`, 'utf8')).filter(
      (r) => !process.env.AUDIT_ROUTES.split(',').includes(r.route)
    );
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
}
try {
  for (const route of await routes()) {
    if (process.env.AUDIT_ROUTES && !process.env.AUDIT_ROUTES.split(',').includes(route)) continue;
    for (const width of (process.env.AUDIT_WIDTHS || '390,1520').split(',').map(Number)) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      await page.route('**/*', (r) =>
        r.request().method() === 'GET' && r.request().url().startsWith(base) ? r.continue() : r.abort()
      );
      const record = { route, width, states: [], errors: [] };
      page.on('pageerror', (e) => record.errors.push(e.message));
      try {
        const response = await page.goto(base + route, { waitUntil: 'load' });
        record.status = response.status();
        await page.evaluate(() => document.fonts.ready);
        await page.evaluate(async () => {
          for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
            scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 25));
          }
          scrollTo(0, 0);
          await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        });
        const capture = async (name) => {
          const data = await page.evaluate(() => {
            const label = (el) =>
              el.tagName.toLowerCase() +
              (el.id
                ? `#${el.id}`
                : [...el.classList]
                    .filter((c) => !['in', 'on', 'op', 'drawn'].includes(c))
                    .map((c) => `.${c}`)
                    .join(''));
            const visible = (el) => {
              if (!el.getClientRects().length || el.closest('[hidden],[inert]')) return false;
              for (let p = el; p; p = p.parentElement) {
                const s = getComputedStyle(p);
                if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) === 0) return false;
                if (s.clipPath === 'inset(50%)' || s.clip === 'rect(0px, 0px, 0px, 0px)') return false;
                if (['hidden', 'clip'].includes(s.overflowY) && p.getBoundingClientRect().height <= 1) return false;
              }
              return true;
            };
            // Discover from DOM text nodes, not a list of migrated CSS classes.
            const nodes = [...document.querySelectorAll('body *')].filter(
              (el) =>
                !el.closest('script,style,noscript') &&
                (!el.closest('svg') || el.matches('text,tspan')) &&
                visible(el) &&
                ([...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) ||
                  el.matches('input,textarea,select'))
            );
            return {
              overflow: document.documentElement.scrollWidth > innerWidth + 1,
              rows: nodes.map((el) => {
                const s = getComputedStyle(el);
                const block =
                  el.closest('p,h1,h2,h3,h4,h5,h6,li,dt,dd,blockquote,figcaption,label,button,a,th,td') || el;
                return {
                  selector: label(el),
                  parent: label(el.parentElement),
                  block: label(block),
                  section: label(el.closest('section,article,header,footer,nav') || document.body),
                  context: [
                    ...(function* () {
                      for (let p = el.parentElement, i = 0; p && i < 4; p = p.parentElement, i++) yield label(p);
                    })(),
                  ].join(' > '),
                  text: (el.matches('input,textarea')
                    ? el.getAttribute('placeholder') || el.getAttribute('aria-label') || el.type
                    : el.textContent
                  )
                    .replace(/\s+/g, ' ')
                    .trim(),
                  size: parseFloat(s.fontSize),
                  leading: s.lineHeight,
                  weight: s.fontWeight,
                  style: s.fontStyle,
                  color: s.color,
                  family: s.fontFamily,
                  kind: el.closest('svg')
                    ? 'chart-label'
                    : el.closest('nav,#nav')
                      ? 'navigation'
                      : el.closest('footer')
                        ? 'footer'
                        : /^H[1-6]$/.test(el.tagName)
                          ? 'heading'
                          : el.matches('input,textarea,select,label')
                            ? 'form'
                            : el.closest('button,a,summary')
                              ? 'action'
                              : el.closest('blockquote')
                                ? 'quote'
                                : el.closest('p,li')
                                  ? 'prose'
                                  : 'unclassified',
                };
              }),
            };
          });
          const screenshot = `${out}/${route.replaceAll('/', '_') || 'home'}-${width}-${record.states.length}.png`;
          if (process.env.AUDIT_SCREENSHOTS !== '0')
            await page.screenshot({ path: screenshot, fullPage: name === 'default' });
          record.states.push({ name, screenshot, ...data });
        };
        await capture('default');
        if (process.env.AUDIT_STATES !== '0' && (await page.locator('#nav .burger').isVisible())) {
          await page.locator('#nav .burger').click();
          if (await page.locator('#nav .navp__t').isVisible()) {
            await page.locator('#nav .navp__t').click();
            await capture('navigation: mobile coverage expanded');
            await page.locator('#nav .navp__t').click();
          }
          await page.locator('#nav .burger').click();
        }
        if (process.env.AUDIT_STATES !== '0' && (await page.locator('#nav .dd__t').isVisible())) {
          await page.locator('#nav .dd__t').hover();
          await page.waitForTimeout(250);
          await capture('navigation: coverage hover');
          await page.mouse.move(0, 0);
        }
        const controls = page.locator(
          'summary,button[role="tab"],button[aria-expanded],button[data-brief],button[data-preset],button[aria-pressed],button.fchip,button.rfb,button.v58-funnel-step,select'
        );
        record.controls = [];
        for (let i = 0; process.env.AUDIT_STATES !== '0' && i < (await controls.count()); i++) {
          const control = controls.nth(i);
          const name = (await control.textContent()).replace(/\s+/g, ' ').trim();
          if (!(await control.isVisible()) || !(await control.isEnabled())) {
            record.controls.push({ name, status: 'not reachable in current state' });
            continue;
          }
          try {
            if (await control.evaluate((el) => el.tagName === 'SELECT')) {
              const options = await control
                .locator('option:not([disabled])')
                .evaluateAll((es) => es.map((e) => ({ value: e.value, text: e.textContent })));
              for (const option of options) {
                await control.selectOption(option.value);
                await page.waitForTimeout(100);
                await capture(`select: ${option.text}`);
              }
              record.controls.push({ name, status: 'captured all options' });
              continue;
            }
            await control.click({ timeout: 3000 });
            await page.waitForTimeout(100);
            await capture(`control: ${name}`);
            record.controls.push({ name, status: 'captured' });
            if (await control.evaluate((el) => el.matches('summary') || el.getAttribute('aria-expanded') === 'true'))
              await control.click({ timeout: 3000 });
          } catch (e) {
            record.controls.push({ name, status: `failed: ${e.message.split('\n')[0]}` });
          }
        }
        if (process.env.AUDIT_STATES !== '0') {
          const sliders = page.locator('input[type="range"]');
          for (let i = 0; i < (await sliders.count()); i++) {
            const slider = sliders.nth(i);
            if (!(await slider.isVisible()) || !(await slider.isEnabled())) continue;
            for (const endpoint of ['max', 'min']) {
              await slider.evaluate((el, endpoint) => {
                el.value = el[endpoint] || (endpoint === 'max' ? '100' : '0');
                el.dispatchEvent(new Event('input', { bubbles: true }));
              }, endpoint);
              await capture(`slider ${i}: ${endpoint}`);
            }
          }
        }
      } catch (e) {
        record.errors.push(e.message);
      }
      records.push(record);
      await writeFile(`${out}/inventory.json`, JSON.stringify(records));
      console.log(`${route} ${width}: ${record.states.length} states, ${record.errors.length} errors`);
      await page.close();
    }
  }
} finally {
  await browser.close();
}
if (records.some((r) => r.errors.length || r.controls?.some((c) => c.status.startsWith('failed'))))
  process.exitCode = 1;
