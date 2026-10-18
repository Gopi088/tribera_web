import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdir } from 'node:fs/promises';
import { chromium, firefox, webkit } from 'playwright';
const browserName = process.env.BROWSER || 'chromium';
const engine = { chromium, firefox, webkit }[browserName];
assert.ok(engine);
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4392';
const url = `${base}/__v9/candidates`;
const artifact = `artifacts/v9-g2-candidates/${browserName}`;
const pdf = {
  name: 'candidate.pdf',
  mimeType: 'application/pdf',
  buffer: Buffer.from('%PDF-1.4\n1 0 obj\n<<>>\nendobj\n%%EOF'),
};
test(`private candidate journey (${browserName})`, async () => {
  const browser = await engine.launch();
  try {
    await mkdir(artifact, { recursive: true });
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    for (const width of [320, 360, 390, 768, 1024, 1366, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal((await page.goto(url)).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      await page.locator('[data-preset="own"]').waitFor();
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('meta[name=robots]').getAttribute('content'), 'noindex, nofollow');
      assert.equal(await page.locator('link[rel=canonical]').count(), 0);
      const overflow = await page.evaluate(() =>
        [...document.querySelectorAll('main *')]
          .filter((e) => {
            const r = e.getBoundingClientRect();
            return (
              r.width > 0 && (r.right > innerWidth + 1 || r.left < -1) && getComputedStyle(e).position !== 'absolute'
            );
          })
          .map((e) => `${e.tagName}.${e.className}`)
      );
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        true,
        `${width}px overflow ${overflow.join(', ')}`
      );
      assert.equal(await page.locator('[data-weight]').count(), 9);
      assert.equal(await page.locator('.v9-testimonial').count(), 4);
      assert.equal(await page.locator('.v9-faq details').count(), 7);
      await page.screenshot({ path: `${artifact}/candidates-${width}.png`, fullPage: true });
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: 'ML platform', exact: true }).click();
    assert.equal(await page.locator('[data-score-band]').textContent(), 'Grey');
    assert.equal(await page.locator('[data-candidate-scorer]').getAttribute('data-playing'), 'false');
    assert.equal(await page.locator('[data-weight="6"]').inputValue(), '50');
    await page.getByRole('button', { name: 'Fintech platform', exact: true }).click();
    assert.equal(await page.locator('[data-score-value]').textContent(), '43');
    await page.locator('[data-evidence="6"]').focus();
    await page.keyboard.press('Enter');
    assert.match(await page.locator('[data-score-evidence]').textContent(), /has not owned a feature store/);
    await page.locator('.candidate-weights summary').click();
    await page.locator('[data-weight="0"]').focus();
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('[data-weight="0"]').inputValue(), '15');
    assert.equal(await page.locator('[data-preset][aria-pressed=true]').count(), 0);
    await page.locator('[data-weight]').evaluateAll((inputs) =>
      inputs.forEach((input) => {
        input.value = '0';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      })
    );
    assert.equal(await page.locator('[data-score-value]').textContent(), '0');
    assert.equal(await page.locator('[data-score-total]').textContent(), '0');
    const firstTab = page.locator('[data-question="0"]');
    await firstTab.focus();
    await page.keyboard.press('ArrowDown');
    assert.equal(await page.locator('[data-question="1"]').getAttribute('aria-selected'), 'true');
    assert.equal(await page.locator('[data-question-panel="1"]').isVisible(), true);
    assert.equal(await page.locator('[data-candidate-questions]').getAttribute('data-playing'), 'false');
    await page.getByRole('button', { name: 'Play question demo', exact: true }).click();
    assert.equal(await page.locator('[data-candidate-questions]').getAttribute('data-playing'), 'true');
    await page.locator('[data-question="3"]').click();
    assert.equal(await page.locator('[data-candidate-questions]').getAttribute('data-playing'), 'false');
    await page.waitForTimeout(4400);
    assert.equal(
      await page.locator('[data-score-value]').textContent(),
      '0',
      'Manual weights cancel the team demonstration'
    );
    assert.equal(
      await page.locator('[data-question="3"]').getAttribute('aria-selected'),
      'true',
      'Manual interaction cancels automatic question changes'
    );
    const privacy = page.getByRole('switch', { name: 'Anonymous by default' });
    await privacy.click();
    assert.equal(await privacy.getAttribute('aria-checked'), 'false');
    assert.match(await page.locator('#candidate-privacy-note').textContent(), /Nothing is saved/);
    await page.reload();
    assert.equal(await privacy.getAttribute('aria-checked'), 'true');
    const day = page.locator('[data-timeline-day]');
    await day.fill('4');
    await day.dispatchEvent('input');
    await page.locator('#start').scrollIntoViewIfNeeded();
    assert.equal(await page.locator('.clk-hr').textContent(), 'Day 4');
    let requests = 0;
    let mode = 'error';
    let payload = '';
    await page.route('**/.netlify/functions/candidate-profile-v9', async (route) => {
      requests++;
      payload = route.request().postDataBuffer().toString();
      assert.equal(route.request().headers().accept, 'application/json');
      await new Promise((resolve) => setTimeout(resolve, 150));
      await route.fulfill({
        status: mode === 'error' ? 422 : 200,
        contentType: 'application/json',
        body: JSON.stringify(
          mode === 'error'
            ? { success: false, message: 'The CV could not be scanned. Please try again.' }
            : { success: true }
        ),
      });
    });
    await page.locator('[name=cv]').setInputFiles(pdf);
    await page.getByText('Open to the right role', { exact: true }).click();
    assert.equal(await page.locator('[name=intent][value=open]').isChecked(), true);
    await page.locator('[name=phone]').fill('+91 9876543210');
    await page.getByRole('button', { name: 'Send my CV', exact: true }).click();
    await page
      .locator('[data-candidate-upload]')
      .evaluate((form) => form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })));
    await page.getByText('The CV could not be scanned. Please try again.', { exact: true }).waitFor();
    assert.equal(requests, 1, 'Duplicate submissions are locked');
    assert.equal(
      await page.locator('[name=cv]').evaluate((input) => input.files.length),
      1,
      'Failed submission keeps the CV'
    );
    assert.match(payload, /name="cv"; filename="candidate.pdf"/);
    assert.match(payload, /name="intent"\r\n\r\nopen/);
    assert.match(payload, /name="botcheck"/);
    const timestamp = Number(payload.match(/name="form_loaded_at"\r\n\r\n(\d+)/)[1]);
    assert.ok(Date.now() - timestamp < 120000 && Date.now() - timestamp >= 0);
    mode = 'success';
    await page.getByRole('button', { name: 'Send my CV', exact: true }).click();
    await page.getByText('Your CV has been received. A Tribera recruiter will be in touch.', { exact: true }).waitFor();
    assert.equal(requests, 2);
    assert.equal(await page.locator('[name=cv]').evaluate((input) => input.files.length), 0);
    await page
      .locator('[name=cv]')
      .setInputFiles({ name: 'bad.exe', mimeType: 'application/octet-stream', buffer: Buffer.from('MZ') });
    await page.getByRole('button', { name: 'Send my CV', exact: true }).click();
    assert.equal(requests, 2);
    assert.match(await page.locator('[name=cv]').evaluate((input) => input.validationMessage), /PDF or Word/);
    assert.deepEqual(errors, []);
    await page.close();
    const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const native = await nojs.newPage();
    await native.goto(url);
    assert.equal(await native.locator('[data-question-panel]:visible').count(), 4);
    assert.equal(await native.locator('.candidate-evidence-list li').count(), 9);
    assert.equal(await native.getByRole('button', { name: 'Send my CV', exact: true }).isDisabled(), true);
    assert.equal(
      await native.getByRole('link', { name: 'Open the CV submission form', exact: true }).getAttribute('href'),
      '/.netlify/functions/candidate-form-v9'
    );
    await native.locator('.v9-faq summary').first().click();
    assert.equal(await native.locator('.v9-faq details').first().getAttribute('open'), '');
    assert.equal(await native.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await nojs.close();
    const reduced = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
    const quiet = await reduced.newPage();
    await quiet.goto(url);
    await quiet.locator('[data-candidate-questions]').scrollIntoViewIfNeeded();
    assert.equal(await quiet.locator('[data-candidate-questions]').getAttribute('data-playing'), 'false');
    assert.equal(await quiet.locator('.clk-hr').textContent(), 'Day 21');
    assert.equal(
      await quiet
        .locator('[data-v9-candidates]')
        .evaluate((el) => el.getAnimations({ subtree: true }).filter((a) => a.playState === 'running').length),
      0
    );
    await reduced.close();
  } finally {
    await browser.close();
  }
});
