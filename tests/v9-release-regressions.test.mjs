import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium, firefox, webkit } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4394';
const engine = process.env.BROWSER || 'chromium';
const output = `artifacts/v9-release-2026-10-22/regressions/${engine}`;
fs.mkdirSync(output, { recursive: true });
const browser = await { chromium, firefox, webkit }[engine].launch();
const errors = [],
  records = [];
const detailRoutes = fs
  .readdirSync('dist', { recursive: true })
  .filter((file) => /^(careers|functions)\/[^/]+\/index\.html$/.test(file))
  .map((file) => '/' + file.replace('/index.html', ''));
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.route(
    (url) => url.origin !== new URL(base).origin,
    (route) => route.abort()
  );
  for (const route of ['/careers', ...detailRoutes])
    for (const width of [390, 1366]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base + route, { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => document.fonts.ready);
      const bars = await page.locator('main .cmpw .bw').evaluateAll((rows) =>
        rows.map((row) => {
          const track = row.querySelector('.bw__b').getBoundingClientRect();
          const fill = row.querySelector('.bw__f').getBoundingClientRect();
          return {
            label: row.querySelector('.bw__n').textContent,
            expected: parseFloat(row.querySelector('.bw__v').textContent) / 100,
            actual: fill.width / track.width,
          };
        })
      );
      assert.equal(bars.length, 6, route);
      for (const bar of bars)
        assert.ok(
          Math.abs(bar.actual - bar.expected) < 0.015,
          `${route} ${bar.label}: drawn ${bar.actual}, labelled ${bar.expected}`
        );
      if (route.startsWith('/functions/')) {
        const contrast = await page.locator('#contact h2').evaluate((heading) => {
          const luminance = (color) => {
            const channels = color
              .match(/[\d.]+/g)
              .slice(0, 3)
              .map(Number)
              .map((value) => {
                const v = value / 255;
                return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
              });
            return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
          };
          let ancestor = heading;
          let background = 'rgb(255,255,255)';
          while (ancestor) {
            const color = getComputedStyle(ancestor).backgroundColor;
            if (color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent') {
              background = color;
              break;
            }
            ancestor = ancestor.parentElement;
          }
          const foreground = luminance(getComputedStyle(heading).color),
            behind = luminance(background);
          return (Math.max(foreground, behind) + 0.05) / (Math.min(foreground, behind) + 0.05);
        });
        assert.ok(contrast >= 3, route + ' closing heading contrast ' + contrast);
      }
      records.push({ route, width, bars, status: 'passed' });
    }
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto(base + '/careers/backend-engineer', { waitUntil: 'domcontentloaded' });
  const opener = page.locator('[data-open-careers-apply]');
  await opener.click();
  const dialog = page.locator('dialog');
  assert.equal(await dialog.evaluate((element) => element.open), true);
  const actionBounds = await page.locator('#careersSubmitBtn').evaluate((button) => {
    const b = button.getBoundingClientRect(),
      d = button.closest('dialog').getBoundingClientRect();
    return { inside: b.top >= d.top && b.bottom <= d.bottom + 1 && b.bottom <= innerHeight };
  });
  assert.equal(actionBounds.inside, true, 'application actions visible without scrolling the fields');
  assert.equal(await page.locator('#careersResumeInput').getAttribute('tabindex'), '-1');
  await page.keyboard.press('Escape');
  await page.waitForFunction(
    () => document.activeElement?.hasAttribute('data-open-careers-apply') && document.body.style.overflow === ''
  );
  await opener.click();
  await page.locator('#careersApplyForm [name=name]').fill('Review Test Applicant');
  await page.locator('#careersApplyForm [name=email]').fill('test@example.com');
  const file = page.locator('#careersResumeInput');
  await file.setInputFiles({
    name: 'too-large.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.alloc(10 * 1024 * 1024 + 1),
  });
  assert.equal(await page.locator('#careersSubmitBtn').isDisabled(), true);
  assert.match(await page.locator('#careersErrorMsg').textContent(), /10 MB/);
  await file.setInputFiles({ name: 'resume.txt', mimeType: 'text/plain', buffer: Buffer.from('unsupported') });
  assert.match(await page.locator('#careersErrorMsg').textContent(), /PDF, DOC or DOCX/);
  await file.setInputFiles({
    name: 'resume.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.from('%PDF-1.4\nReview fixture'),
  });
  let replyStatus = 503;
  const requests = [];
  await page.route('**/.netlify/functions/careers-apply', (route) => {
    requests.push(route.request().postData());
    return route.fulfill({
      status: replyStatus,
      contentType: 'application/json',
      body: JSON.stringify({
        success: replyStatus === 200,
        message: replyStatus === 400 ? 'This form has expired. Please refresh and try again.' : 'Provider unavailable',
      }),
    });
  });
  await page.locator('#careersSubmitBtn').click();
  await page.locator('#careersErrorMsg').waitFor({ state: 'visible' });
  assert.match(await page.locator('#careersErrorMsg').textContent(), /Something went wrong/);
  assert.equal(await page.locator('#careersSubmitBtn .apply__ar').count(), 1);
  assert.equal(await page.locator('#careersSubmitBtn').isEnabled(), true);
  const payload = requests[0];
  assert.match(payload, /name="job_slug"\r?\n\r?\nbackend-engineer/);
  assert.match(payload, /name="form_loaded_at"\r?\n\r?\n\d{13}/);
  assert.match(payload, /name="resume"; filename="resume.pdf"/);
  replyStatus = 400;
  await page.locator('#careersSubmitBtn').click();
  await page.waitForFunction(() => document.querySelector('#careersErrorMsg')?.textContent.includes('expired'));
  replyStatus = 200;
  await page.locator('#careersSubmitBtn').click();
  await page.locator('#careersSuccessMessage').waitFor({ state: 'visible' });
  assert.equal(
    await page.locator('#careersSuccessMessage').evaluate((element) => element === document.activeElement),
    true
  );
  await page.locator('#closeCareersApplyModal').click();
  await opener.click();
  await page.locator('#careersApplyForm [name=name]').fill('New application stays open');
  await page.waitForTimeout(3400);
  assert.equal(await dialog.evaluate((element) => element.open), true);
  assert.equal(await page.locator('#careersApplyForm [name=name]').inputValue(), 'New application stays open');
  await page.screenshot({ path: `${output}/dialog-390.png` });
  await page.goto(base + '/candidates/start', { waitUntil: 'domcontentloaded' });
  await page.locator('#emailInput').fill('test@example.com');
  await page.locator('#nameInput').fill('Review Test Candidate');
  await page.locator('#cvInput').setInputFiles({
    name: 'resume.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.from('%PDF-1.4\nReview fixture'),
  });
  let candidateStatus = 400;
  await page.route('**/.netlify/functions/candidate-profile', (route) =>
    route.fulfill({
      status: candidateStatus,
      contentType: 'application/json',
      body: JSON.stringify({
        success: candidateStatus === 200,
        message: 'This form has expired. Please refresh and try again.',
      }),
    })
  );
  await page.locator('#submitBtn').click();
  await page.locator('#startErr').waitFor({ state: 'visible' });
  assert.match(await page.locator('#startErr').textContent(), /expired/);
  assert.equal(await page.locator('#submitBtn svg').count(), 1);
  candidateStatus = 200;
  await page.locator('#submitBtn').click();
  await page.locator('#startOk').waitFor({ state: 'visible' });
  const noJS = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  for (const route of ['/careers/backend-engineer', '/candidates/start']) {
    await noJS.goto(base + route, { waitUntil: 'domcontentloaded' });
    const fallback = noJS.locator('main a[href^="mailto:careers@tribera.ai"]').first();
    assert.equal(await fallback.isVisible(), true, route + ' native email fallback');
  }
  await noJS.goto(base + '/blog/rethinking-hiring-metrics-signal-efficiency', { waitUntil: 'domcontentloaded' });
  assert.match(
    await noJS.locator('.ashare a').first().getAttribute('href'),
    /^https:\/\/www.linkedin.com\/sharing\/share-offsite/
  );
  assert.match(await noJS.locator('[data-copy-article]').getAttribute('href'), /^https:\/\/www.tribera.ai\/blog\//);
  const category = fs.readdirSync('dist/category')[0];
  await page.goto(base + '/category/' + category, { waitUntil: 'domcontentloaded' });
  assert.equal(await page.locator('.topic-filters').count(), 1);
  assert.equal(await page.locator('.fbar').count(), 0);
  assert.deepEqual(errors, []);
  console.log(
    `${engine}: ${records.length} chart/contrast cases, dialog focus/reopen, 4xx/5xx/retry, multipart payload, file validation and no-JS fallbacks passed.`
  );
} finally {
  fs.writeFileSync(`${output}/result.json`, JSON.stringify({ records, errors }, null, 2) + '\n');
  await browser.close();
}
