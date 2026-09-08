import { readdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

async function pages(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const name = `${dir}/${entry.name}`;
    if (entry.isDirectory()) found.push(...(await pages(name)));
    else if (name.endsWith('.html')) found.push(name.replace(/^dist/, '').replace(/index\.html$/, ''));
  }
  return found;
}
const routes =
  process.env.AUDIT_ROUTES?.split(',') || (await pages('dist')).filter((route) => !route.startsWith('/decapcms/'));
const browser = await chromium.launch();
const findings = [];
let controls = 0;
try {
  const width = Number(process.env.AUDIT_WIDTH || 1440);
  const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('DOM.enable');
  await cdp.send('CSS.enable');
  for (const route of routes) {
    await page.goto((process.env.TEST_BASE_URL || 'http://127.0.0.1:4321') + route, { waitUntil: 'networkidle' });
    if (width < 1080) {
      await page.locator('#nav .burger').click();
      const toggle = page.locator('#nav .navp__t');
      if (await toggle.count()) await toggle.first().click();
    }
    await page.addStyleTag({
      content:
        '*,*::before,*::after { transition:none!important; animation:none!important; } [data-rv] { opacity:1!important; transform:none!important; }',
    });
    const count = await page.evaluate(() => {
      // Include card hover targets as well as native interactive controls.
      const selectors = new Set(['a', 'button', 'summary', 'label', '[tabindex]']);
      const readRules = (rules) => {
        for (const rule of rules) {
          if (rule.cssRules) readRules(rule.cssRules);
          if (!rule.selectorText?.includes(':hover')) continue;
          for (const selector of rule.selectorText.split(',')) {
            const prefix = selector.split(':hover')[0];
            try {
              document.querySelector(prefix);
              selectors.add(prefix);
            } catch {
              /* Ignore unsupported selectors. */
            }
          }
        }
      };
      for (const sheet of document.styleSheets) {
        try {
          readRules(sheet.cssRules);
        } catch {
          /* Cross-origin stylesheets cannot be inspected. */
        }
      }
      const targets = new Set();
      for (const selector of selectors) {
        for (const element of document.querySelectorAll(selector)) {
          if (!element.textContent.trim() || !element.getBoundingClientRect().width) continue;
          if (getComputedStyle(element).visibility !== 'visible') continue;
          targets.add(element);
        }
      }
      [...targets].forEach((element, index) => element.setAttribute('data-contrast-target', String(index)));
      window.readContrast = (element) => {
        const rgba = (value) => value.match(/[\d.]+/g)?.map(Number) || [0, 0, 0, 0];
        const composite = (fg, bg) => fg.slice(0, 3).map((v, i) => v * (fg[3] ?? 1) + bg[i] * (1 - (fg[3] ?? 1)));
        const luminance = (rgb) =>
          rgb
            .map((v) => v / 255)
            .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
            .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
        return [element, ...element.querySelectorAll('*')]
          .filter((node) => [...node.childNodes].some((child) => child.nodeType === 3 && child.textContent.trim()))
          .flatMap((node) => {
            const style = getComputedStyle(node);
            if (!node.getBoundingClientRect().width || style.visibility !== 'visible' || style.display === 'none')
              return [];
            let background = [255, 255, 255];
            const ancestors = [];
            for (let ancestor = node; ancestor; ancestor = ancestor.parentElement) ancestors.unshift(ancestor);
            let gradient = false;
            for (const ancestor of ancestors) {
              const s = getComputedStyle(ancestor);
              background = composite(rgba(s.backgroundColor), background);
              if (s.backgroundImage !== 'none') {
                gradient = true;
                const stop = s.backgroundImage.match(/rgba?\([^)]+\)/)?.[0];
                if (stop) background = composite(rgba(stop), background);
              }
            }
            const color = composite(rgba(style.color), background);
            const a = luminance(color),
              b = luminance(background);
            return [
              {
                text: [...node.childNodes]
                  .filter((child) => child.nodeType === 3)
                  .map((child) => child.textContent)
                  .join('')
                  .trim()
                  .slice(0, 90),
                class: node.className,
                color: style.color,
                background,
                ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
                gradient,
              },
            ];
          });
      };
      return targets.size;
    });
    const { root } = await cdp.send('DOM.getDocument');
    for (let i = 0; i < count; i++) {
      const selector = `[data-contrast-target="${i}"]`;
      const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector });
      if (!nodeId) continue;
      const before = await page.evaluate((selector) => window.readContrast(document.querySelector(selector)), selector);
      for (const state of ['hover', 'focus-visible']) {
        await cdp.send('CSS.forcePseudoState', {
          nodeId,
          forcedPseudoClasses: state === 'hover' ? ['hover'] : ['focus', 'focus-visible'],
        });
        const after = await page.evaluate((selector) => {
          const element = document.querySelector(selector);
          return {
            target: element.className,
            text: element.textContent.trim().slice(0, 80),
            items: window.readContrast(element),
          };
        }, selector);
        for (const [j, item] of after.items.entries()) {
          const baseline = before[j];
          if (item.ratio < 3 || (item.ratio < 4.5 && baseline?.ratio >= 4.5)) {
            findings.push({ route, state, target: after.target, ...item, before: baseline?.ratio });
          }
        }
        await cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: [] });
      }
      controls++;
    }
    console.log(`${route}: ${count} targets checked`);
  }
} finally {
  await browser.close();
  await writeFile(
    process.env.AUDIT_OUTPUT || '/tmp/site-hover-contrast.json',
    JSON.stringify({ routes, controls, findings }, null, 2)
  );
}
console.log(
  `${controls} targets; ${findings.length} low-contrast text observations (including pre-existing/gradient cases requiring visual review)`
);
