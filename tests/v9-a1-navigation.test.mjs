import assert from 'node:assert/strict';
import { chromium, firefox, webkit } from 'playwright';
const engine = process.env.BROWSER || 'chromium';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4390';
const browser = await { chromium, firefox, webkit }[engine].launch();
const routes = ['services', 'interview-as-a-service', 'case-study'];
let checks = 0;
try {
  for (const javaScriptEnabled of [true, false]) {
    const page = await browser.newPage({
      javaScriptEnabled,
      reducedMotion: 'reduce',
      viewport: { width: 1366, height: 900 },
    });
    for (const slug of routes) {
      await page.goto(base + '/__v9/' + slug, { waitUntil: 'networkidle' });
      const services = page
        .getByRole('navigation', { name: 'Primary', exact: true })
        .getByRole('link', { name: 'Services', exact: true });
      assert.equal(await services.getAttribute('href'), '/__v9/services');
      assert.equal(await services.getAttribute('aria-current'), slug === 'services' ? 'page' : null);
      await services.click();
      await page.waitForURL((url) => url.pathname.replace(/\/$/, '') === '/__v9/services');
      assert.match(await page.locator('h1').innerText(), /Hire the people/);
      await page.goto(base + '/__v9/' + slug, { waitUntil: 'networkidle' });
      if (slug === 'case-study') {
        await page.getByRole('link', { name: 'Book a scorecard session', exact: true }).first().click();
        await page.waitForURL(
          (url) => url.pathname.replace(/\/$/, '') === '/__v9/services' && url.hash === '#sv-scorecard'
        );
        await page.locator('#sv-scorecard').waitFor({ state: 'visible' });
      }
      const ctas = await page
        .locator('main a[href]')
        .evaluateAll((links) =>
          links
            .map((a) => ({ href: a.getAttribute('href'), text: a.textContent.trim() }))
            .filter((a) => a.href.startsWith('/__v9/contact'))
        );
      assert.ok(ctas.length > 0, slug + ': real enquiry destination');
      for (const cta of ctas) {
        const target = new URL(cta.href, base);
        assert.equal(target.pathname, '/__v9/contact');
        assert.ok(!target.searchParams.has('email'), 'No personal data in query');
      }
      const link = page.locator('main a[href^="/__v9/contact"]').first();
      const expected = new URL(await link.getAttribute('href'), base);
      await link.click();
      await page.waitForURL((url) => url.pathname.replace(/\/$/, '') === '/__v9/contact');
      assert.equal(new URL(page.url()).search, expected.search, 'Source query survives navigation');
      assert.equal(await page.locator('h1').count(), 1);
      assert.ok((await page.locator('form').count()) > 0, 'Private Contact form is present');
      checks++;
    }
    await page.goto(base + '/__v9/home', { waitUntil: 'networkidle' });
    await page.getByRole('link', { name: 'See how each service works' }).click();
    await page.waitForURL((url) => url.pathname.replace(/\/$/, '') === '/__v9/services');
    assert.equal(await page.locator('.sv-door').count(), 4);
    await page.close();
  }
  assert.equal(checks, 6);
  console.log(
    `${engine}: six hiring enquiry navigations preserve query URLs; actual Contact delivery is covered by the A2 handler/browser gate`
  );
} finally {
  await browser.close();
}
