import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { chromium, firefox, webkit } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const engine = process.env.BROWSER || 'chromium';
const browser = await { chromium, firefox, webkit }[engine].launch();
const routes = readdirSync('src/pages/blog')
  .filter((name) => name.endsWith('.astro') && name !== 'index.astro')
  .map((name) => '/blog/' + name.replace('.astro', ''));
const errors = [];
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (value) => {
          if (window.__denyCopy) throw new Error('Clipboard denied');
          window.__copied = value;
        },
      },
    });
  });
  for (const route of routes) {
    for (const width of [390, 967, 1678]) {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(base + route, { waitUntil: 'networkidle' });
      const share = page.locator('[data-social-share]');
      assert.equal(await share.count(), 1, route + ' uses one shared control');
      const linkedin = share.getByRole('link', { name: 'Share on LinkedIn (opens in a new tab)', exact: true });
      const canonical = new URL(await linkedin.getAttribute('href')).searchParams.get('url');
      assert.equal(canonical.replace(/\/$/, ''), 'https://www.tribera.ai' + route);
      const copy = share.getByRole('link', { name: 'Copy article link', exact: true });
      for (const control of [linkedin, copy]) {
        assert.equal(await control.locator('svg[aria-hidden="true"]').count(), 1);
        assert.ok((await control.boundingBox()).height >= 44, 'Accessible touch target');
        await control.focus();
        assert.equal(await control.evaluate((el) => getComputedStyle(el).outlineStyle), 'solid');
      }
      const tag = page.locator('.atag, .bl-tags span').first();
      const tags = page.locator('.atags, .bl-tags');
      const tagsBox = await tags.boundingBox();
      const shareBox = await share.boundingBox();
      assert.ok(Math.abs(tagsBox.x - shareBox.x) < 1, route + ' aligns tags and sharing to the same left edge');
      assert.ok(
        Math.abs(shareBox.y - (tagsBox.y + tagsBox.height) - 18) < 1,
        route + ' places sharing on its own row 18px below the tags'
      );
      assert.equal(
        await share.evaluate((el) => getComputedStyle(el).fontSize),
        await tag.evaluate((el) => getComputedStyle(el).fontSize)
      );
      await copy.click();
      assert.equal(await page.evaluate(() => window.__copied), canonical);
      await share.getByRole('status').getByText('Link copied.', { exact: true }).waitFor();
      assert.equal(await copy.locator('svg').count(), 1, 'Feedback preserves icon');
      await page.evaluate(() => {
        window.__denyCopy = true;
      });
      await copy.click();
      await share.getByRole('status').getByText(`Copy this link: ${canonical}`, { exact: true }).waitFor();
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
        route + ' has no overflow'
      );
    }
  }
  const native = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  for (const route of routes) {
    await native.goto(base + route, { waitUntil: 'networkidle' });
    const share = native.locator('[data-social-share]');
    assert.equal(
      (await share.getByRole('link', { name: 'Article permalink', exact: true }).getAttribute('href')).replace(
        /\/$/,
        ''
      ),
      'https://www.tribera.ai' + route
    );
    assert.ok(
      await share.getByRole('link', { name: 'Share on LinkedIn (opens in a new tab)', exact: true }).isVisible()
    );
  }
  assert.deepEqual(errors, []);
  console.log(
    `${engine}: ${routes.length} articles passed sharing, copy success/denial, focus, mobile/desktop and no-JavaScript checks.`
  );
} finally {
  await browser.close();
}
