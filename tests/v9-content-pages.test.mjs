import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium, firefox, webkit } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4392';
const engine = process.env.BROWSER || 'chromium';
const output = `artifacts/v9-content/${engine}`;
fs.mkdirSync(output, { recursive: true });
const routes = fs
  .readdirSync('dist', { recursive: true })
  .filter(
    (file) =>
      file.endsWith('.html') &&
      !file.startsWith('__v9/') &&
      fs.readFileSync(`dist/${file}`, 'utf8').includes('data-v9-content=')
  )
  .map((file) => '/' + file.replace(/(?:\/)?index\.html$/, '').replace(/\.html$/, ''));
assert.ok(
  routes.includes('/careers') &&
    routes.includes('/functions') &&
    routes.includes('/blog') &&
    routes.includes('/candidates/start')
);
const browser = await { chromium, firefox, webkit }[engine].launch();
const records = [],
  errors = [];
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.route('https://**', (route) => route.abort());
  for (const route of routes)
    for (const width of [390, 1366]) {
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(base + route, { waitUntil: 'domcontentloaded' });
      assert.ok([200, 404].includes(response.status()), route);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('html').getAttribute('class'), 'v9-document', route);
      assert.equal(await page.locator('main').count(), 1, route);
      assert.equal(await page.locator('h1').count(), 1, route);
      assert.equal(await page.locator('header.v9-nav').count(), 1, route);
      assert.equal(await page.locator('footer.v9-ft').count(), 1, route);
      assert.equal(await page.locator('.site-editorial, .v58-route, a[href*="/__v9/"]').count(), 0, route);
      const styles = await page.locator('h1').evaluate((heading) => ({
        font: getComputedStyle(heading).fontFamily,
        size: parseFloat(getComputedStyle(heading).fontSize),
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        text: heading.textContent.trim(),
      }));
      assert.ok(styles.font.includes('V9 Fraunces') && styles.size >= 40, route);
      assert.equal(styles.overflow, false, `${route} overflow at ${width}`);
      assert.ok(styles.text.length > 3, route);
      assert.equal(await page.locator('.v9-content').isVisible(), true, route);
      if (!route.startsWith('/404')) {
        const robots = await page.locator('meta[name=robots]').getAttribute('content');
        if (robots.startsWith('index'))
          assert.equal(
            (await page.locator('link[rel=canonical]').getAttribute('href')).replace(/\/$/, ''),
            `https://www.tribera.ai${route}`.replace(/\/$/, ''),
            route
          );
      }
      if (
        [
          '/careers',
          '/careers/backend-engineer',
          '/functions',
          '/functions/engineering-platform',
          '/blog',
          '/blog/rethinking-hiring-metrics-signal-efficiency',
          '/candidates/start',
        ].includes(route)
      ) {
        await page.screenshot({ path: `${output}/${route.replaceAll('/', '_')}-${width}.png`, fullPage: true });
      }
      records.push({ route, width, status: 'passed' });
    }
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto(base + '/careers', { waitUntil: 'domcontentloaded' });
  await page.locator('#rfilt button').filter({ hasText: 'Engineering' }).click();
  assert.equal(await page.locator('#rfilt button[aria-pressed=true]').textContent(), 'Engineering');
  for (const card of await page.locator('#rgrid .rc:visible').all())
    assert.equal(await card.getAttribute('data-department'), 'Engineering');
  await page.locator('#rfilt button').filter({ hasText: /^All$/ }).click();
  assert.equal(await page.locator('#rgrid .rc:visible').count(), 7);
  const oldNote = await page.locator('#roleFt').textContent();
  await page.selectOption('#roleSel', { index: 1 });
  assert.notEqual(await page.locator('#roleFt').textContent(), oldNote);
  assert.equal(
    await page.locator('#cf0').evaluate((el) => el.style.width),
    (await page.locator('#cv0').textContent()).trim()
  );
  await page.goto(base + '/functions', { waitUntil: 'domcontentloaded' });
  const oldChart = await page.locator('#cmpFt').textContent();
  await page.selectOption('#secB', { index: 2 });
  assert.notEqual(await page.locator('#cmpFt').textContent(), oldChart);
  await page.goto(base + '/blog', { waitUntil: 'domcontentloaded' });
  const filter = page.locator('.fbar button').nth(1);
  await filter.click();
  const category = await filter.getAttribute('data-c');
  assert.ok(await page.locator('.post:visible').count());
  for (const post of await page.locator('.post:visible').all())
    assert.equal(await post.getAttribute('data-c'), category);
  await page.goto(base + '/careers/backend-engineer', { waitUntil: 'domcontentloaded' });
  await page.locator('[data-open-careers-apply]').click();
  const dialog = page.locator('dialog');
  assert.equal(await dialog.evaluate((el) => el.open), true);
  assert.equal(await dialog.evaluate((el) => el.contains(document.activeElement)), true);
  await page.keyboard.press('Escape');
  assert.equal(await dialog.evaluate((el) => el.open), false);
  await page.locator('[data-open-careers-apply]').click();
  await page.locator('#careersApplyForm [name=name]').fill('Test Applicant');
  await page.locator('#careersApplyForm [name=email]').fill('test@example.com');
  await page
    .locator('#careersResumeInput')
    .setInputFiles({ name: 'resume.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4\nTest resume') });
  await page.route('**/.netlify/functions/careers-apply', (route) =>
    route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ success: false }) })
  );
  assert.equal(await page.locator('#careersSubmitBtn').evaluate((button) => button.form?.id), 'careersApplyForm');
  assert.equal(await page.locator('#careersResumeInput').evaluate((input) => input.form?.id), 'careersApplyForm');
  await page.locator('#careersSubmitBtn').click();
  await page.locator('#careersErrorMsg').waitFor({ state: 'visible' });
  assert.equal(await page.locator('#careersSubmitBtn').isEnabled(), true);
  assert.equal(await page.locator('#careersApplyForm [name=job_slug]').inputValue(), 'backend-engineer');
  await page.unroute('**/.netlify/functions/careers-apply');
  await page.route('**/.netlify/functions/careers-apply', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) })
  );
  await page.locator('#careersSubmitBtn').click();
  await page.locator('#careersSuccessMessage').waitFor({ state: 'visible' });
  await page.goto(base + '/candidates/start', { waitUntil: 'domcontentloaded' });
  await page.locator('#emailInput').fill('test@example.com');
  await page.locator('#nameInput').fill('Test Candidate');
  await page
    .locator('#cvInput')
    .setInputFiles({ name: 'resume.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4\nTest resume') });
  await page.route('**/.netlify/functions/candidate-profile', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) })
  );
  await page.locator('#submitBtn').click();
  await page.locator('#startOk').waitFor({ state: 'visible' });
  const noJS = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  for (const route of [
    '/careers',
    '/functions',
    '/blog',
    '/blog/rethinking-hiring-metrics-signal-efficiency',
    '/candidates/start',
    '/404',
  ]) {
    await noJS.goto(base + route, { waitUntil: 'domcontentloaded' });
    assert.equal(await noJS.locator('h1').isVisible(), true, `${route} no-JS heading`);
    assert.equal(await noJS.locator('.v9-content').isVisible(), true, `${route} no-JS content`);
    assert.ok(
      await noJS
        .locator('main')
        .innerText()
        .then((text) => text.length > 150)
    );
  }
  assert.deepEqual(errors, []);
  console.log(
    `${engine}: ${records.length} route/viewport checks plus filters, chart, dialog, mocked form success/retry and no-JS passed.`
  );
} finally {
  fs.writeFileSync(`${output}/result.json`, JSON.stringify({ records, errors }, null, 2) + '\n');
  await browser.close();
}
