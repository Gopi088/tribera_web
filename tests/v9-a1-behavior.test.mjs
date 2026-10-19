import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium, firefox, webkit } from 'playwright';
import { waitForPageCondition } from '../scripts/v9-browser-readiness.mjs';

const engine = process.env.BROWSER || 'chromium';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4390';
const source = fs.readFileSync('sample_data/tribera-web-handoff-v9/services.html', 'utf8');
const match = source.match(/var SV=(.*?), SYM=(.*?);\n/);
assert.ok(match, 'Source service/problem model must exist');
const offerings = JSON.parse(match[1]),
  problems = JSON.parse(match[2]);
assert.equal(Object.keys(offerings).length, 12);
assert.equal(problems.length, 9);
const labels = [...source.matchAll(/<button class="sv-sym"[^>]*>\s*<b>([^<]+)<\/b>/g)].map((match) => match[1]);
assert.equal(labels.length, 9);
const normalized = (text) => text.replace(/\s+/g, ' ').trim();
const browser = await { chromium, firefox, webkit }[engine].launch();
const records = [];
try {
  for (const javaScriptEnabled of [true, false]) {
    const context = await browser.newContext({
      javaScriptEnabled,
      reducedMotion: 'reduce',
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(base + '/__v9/services', { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.sv-door').count(), 4);
    assert.equal(await page.locator('details.sv-acc').count(), 8);
    assert.equal(await page.locator('a.sv-tile').count(), 12);
    assert.equal(await page.locator('.sv-sym').count(), 9);
    assert.equal(await page.locator('.sv-recommendation').count(), 9);
    for (let i = 0; i < problems.length; i++) {
      const button = page.locator('.sv-sym').nth(i);
      const panel = page.locator('.sv-recommendation').nth(i);
      assert.equal(normalized(await button.locator('b').textContent()), labels[i]);
      assert.equal(await panel.getAttribute('aria-label'), problems[i][0]);
      if (javaScriptEnabled) {
        await button.click();
        assert.equal(await button.getAttribute('aria-selected'), 'true');
        assert.equal(await panel.isVisible(), true);
        assert.equal(await page.locator('.sv-recommendation:visible').count(), 1);
      } else {
        assert.equal(await button.isDisabled(), true);
        assert.equal(await panel.isVisible(), true);
      }
      assert.deepEqual(
        await panel.locator('a').evaluateAll((links) => links.map((link) => link.hash)),
        problems[i][2].map((key) => '#sv-' + key)
      );
      for (const key of problems[i][2]) {
        const text = normalized(await panel.textContent());
        for (const value of Object.values(offerings[key]))
          assert.ok(text.includes(value), `Recommendation ${i}: ${key}: ${value}`);
      }
    }
    if (javaScriptEnabled) {
      const first = page.locator('.sv-sym').first();
      await first.focus();
      await page.keyboard.press('End');
      assert.equal(
        await page
          .locator('.sv-sym')
          .last()
          .evaluate((el) => el === document.activeElement),
        true
      );
      await page.keyboard.press('ArrowDown');
      assert.equal(await first.getAttribute('aria-selected'), 'true');
      await page.keyboard.press('ArrowUp');
      assert.equal(await page.locator('.sv-sym').last().getAttribute('aria-selected'), 'true');
      const visible = await page
        .locator('.sv-sym')
        .last()
        .evaluate((el) => {
          const r = el.getBoundingClientRect(),
            p = el.parentElement.getBoundingClientRect();
          return r.left >= p.left - 1 && r.right <= p.right + 1;
        });
      assert.ok(visible, 'Keyboard-selected phone choice must not be horizontally clipped');
      await page.locator('a.sv-tile[href="#sv-iaas"]').click();
      assert.equal(await page.locator('#sv-iaas').getAttribute('open'), '');
      await page.goto(base + '/__v9/services#sv-team', { waitUntil: 'networkidle' });
      assert.equal(await page.locator('#sv-team').getAttribute('open'), '');
    }
    for (let i = 0; i < 8; i++) {
      const detail = page.locator('details.sv-acc').nth(i);
      if ((await detail.getAttribute('open')) === null) await detail.locator('summary').click();
      assert.equal(await detail.getAttribute('open'), '');
      assert.ok(await detail.locator('p').first().isVisible(), 'Service answer is natively visible');
    }
    for (const [slug, count] of [
      ['services', 5],
      ['interview-as-a-service', 6],
    ]) {
      await page.goto(base + '/__v9/' + slug, { waitUntil: 'networkidle' });
      const details = page.locator('details.faq-item');
      assert.equal(await details.count(), count);
      assert.equal(await details.first().getAttribute('open'), '');
      await details.nth(1).locator('summary').click();
      assert.equal(await details.nth(1).getAttribute('open'), '');
      assert.equal(await details.first().getAttribute('open'), null);
      assert.ok(await details.nth(1).locator('p').first().isVisible());
      records.push({ slug, javaScriptEnabled, faqCount: count });
    }
    const iaas = await page.locator('main').textContent();
    assert.match(iaas, /48/);
    assert.match(iaas, /success fee/i);
    await page.goto(base + '/__v9/case-study', { waitUntil: 'networkidle' });
    const field = page.locator('[data-case-field]');
    assert.equal(await field.locator('i').count(), 327);
    assert.equal(await field.locator('i.e,i.b,i.h').count(), 11);
    assert.equal(await field.locator('i.b,i.h').count(), 2);
    assert.equal(await field.locator('i.h').count(), 1);
    assert.equal(await field.getAttribute('data-stage'), '3');
    const marked = await field
      .locator('i')
      .evaluateAll((cells) => cells.flatMap((cell, index) => (/\b(e|b|h)\b/.test(cell.className) ? [index] : [])));
    assert.deepEqual(marked, [12, 40, 61, 71, 94, 118, 124, 137, 176, 228, 313]);
    if (javaScriptEnabled) {
      for (let i = 0; i < 4; i++) {
        const button = page.locator(`[data-case-stage="${i}"]`);
        await button.click();
        assert.equal(await field.getAttribute('data-stage'), String(i));
        assert.equal(await button.getAttribute('aria-pressed'), 'true');
        assert.equal(await page.locator('[data-case-stage][aria-pressed=true]').count(), 1);
        assert.match(await page.locator('[data-case-status]').textContent(), [/327/, /11/, /2/, /1.*22/][i]);
      }
      await page.locator('[data-case-stage="3"]').focus();
      await page.keyboard.press('Home');
      assert.equal(await field.getAttribute('data-stage'), '0');
      await page.keyboard.press('ArrowLeft');
      assert.equal(await field.getAttribute('data-stage'), '3');
      assert.equal(await page.locator('[data-case-stage="3"]').evaluate((el) => el === document.activeElement), true);
    } else assert.equal(await page.locator('[data-case-controls]').isVisible(), false);
    await waitForPageCondition(page, () => document.querySelector('[data-case-field]').children.length === 327);
    records.push({ slug: 'case-study', javaScriptEnabled, profiles: 327 });
    assert.deepEqual(errors, []);
    await context.close();
  }
  assert.equal(records.length, 6);
  console.log(
    `${engine}: all nine source recommendations, twelve offerings, native FAQs and four case stages passed with JS/no-JS`
  );
} finally {
  await browser.close();
}
