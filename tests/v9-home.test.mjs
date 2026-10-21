import assert from 'node:assert/strict';
import fs from 'node:fs';
import { test } from 'node:test';
import { chromium, firefox, webkit } from 'playwright';
import { skills } from '../src/scripts/v9/home/model.mjs';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4391';
const engine = process.env.BROWSER || 'chromium';
const output = `artifacts/v9-g2/home-${engine}`;
fs.mkdirSync(output, { recursive: true });

test(`home full content, responsive layout and interactions (${engine})`, async () => {
  const browser = await { chromium, firefox, webkit }[engine].launch();
  try {
    const page = await browser.newPage({ reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    for (const width of [320, 390, 768, 1024, 1366, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(`${base}/__v9/home`);
      assert.ok([200, 304].includes(response.status()));
      await page.waitForSelector('[data-v9-home][data-enhanced]');
      await page.evaluate(() => document.fonts.ready);
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        true,
        `${width}px page overflow`
      );
      assert.match(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex/);
      assert.equal(await page.locator('#ccFeed .hc-row').count(), 5);
      assert.equal(await page.locator('#labRows input').count(), 9);
      assert.equal(await page.locator('#fnlGrid .sq').count(), 126);
      assert.equal(await page.locator('.tm-card:not([data-clone])').count(), 5);
      assert.equal(await page.locator('.faq-item').count(), 7);
      if ([390, 1366].includes(width)) await page.screenshot({ path: `${output}/${width}-home.png`, fullPage: true });
    }
    const handoff = fs.readFileSync('sample_data/tribera-web-handoff-v9/index.html', 'utf8');
    const headings = await page.evaluate(
      (html) =>
        [...new DOMParser().parseFromString(html, 'text/html').querySelectorAll('h1,h2')].map((el) =>
          el.textContent.replace(/\s+/g, ' ').trim()
        ),
      handoff
    );
    assert.deepEqual(
      (await page.locator('.v9-home h1,.v9-home h2').evaluateAll((els) => els.map((el) => el.innerText))).map((s) =>
        s.replace(/\s+/g, ' ').trim()
      ),
      headings
    );
    for (const [preset, score, label] of [
      ['brief', '39', 'Select'],
      ['detect', '40', 'Select'],
      ['llm', '33', 'Grey'],
      ['own', '41', 'Select'],
    ]) {
      await page.locator(`[data-pre="${preset}"]`).click();
      assert.equal(await page.locator('#labScore').textContent(), score);
      assert.equal(await page.locator('#labBand').textContent(), label);
    }
    await page.locator('#tile2').click();
    assert.match(
      await page.locator('#labEv').textContent(),
      /could not point to a control he had tested in production/
    );
    await page.locator('#labRows input').evaluateAll((inputs) =>
      inputs.forEach((input) => {
        input.value = '1';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      })
    );
    assert.equal(
      (await page.locator('#labRows .rp').allTextContents()).reduce((sum, value) => sum + parseInt(value, 10), 0),
      100
    );
    await page.locator('#labRows input').evaluateAll((inputs) =>
      inputs.forEach((input) => {
        input.value = '0';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      })
    );
    assert.equal(await page.locator('#labScore').textContent(), '0');
    assert.equal(await page.locator('#labTotal').textContent(), '0');
    await page.locator('[data-pre="brief"]').click();
    assert.equal(await page.locator('#labScore').textContent(), '39');
    const bar = page.getByRole('slider', { name: 'Your bar', exact: true });
    await bar.focus();
    await page.keyboard.press('End');
    assert.equal(await bar.getAttribute('aria-valuenow'), '42');
    assert.match(await page.locator('#obCap').textContent(), /One clears/);
    await page.keyboard.press('Home');
    assert.equal(await bar.getAttribute('aria-valuenow'), '24');
    await page.locator('#ear-t0').focus();
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('#ear-t1').getAttribute('aria-selected'), 'true');
    assert.equal(await page.locator('#ear-p1').isVisible(), true);
    await page.locator('.fnl-step[data-n="5"]').click();
    assert.equal(await page.locator('#fnlN').textContent(), '2');
    assert.equal(await page.locator('#fnlGrid .sq:not(.out)').count(), 2);
    await page.locator('.faq-item summary').nth(1).click();
    assert.equal(await page.locator('.faq-item').nth(1).getAttribute('open'), '');
    assert.deepEqual(errors, []);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    // Remove focus/hover while each demo remains visible: visibility gating must not mask cancellation.
    async function leaveDemoVisible(selector, delay) {
      await page.mouse.move(1, 1);
      await page.locator(selector).evaluate((el) => {
        document.activeElement?.blur();
        el.scrollIntoView({ block: 'center', behavior: 'instant' });
      });
      await page.mouse.move(1, 1);
      assert.ok(
        await page.locator(selector).evaluate((el) => {
          const r = el.getBoundingClientRect();
          return (
            Math.max(0, Math.min(innerHeight, r.bottom) - Math.max(0, r.top)) / r.height > 0.4 &&
            !el.matches(':hover, :focus-within')
          );
        }),
        `${selector} remains visible without hover or focus`
      );
      await page.waitForTimeout(delay);
    }
    await bar.focus();
    await page.keyboard.press('End');
    await leaveDemoVisible('.bc', 5100);
    assert.equal(await bar.getAttribute('aria-valuenow'), '42');
    await page.locator('#ear-t2').click();
    await leaveDemoVisible('.ear', 7400);
    assert.equal(await page.locator('#ear-t2').getAttribute('aria-selected'), 'true');
    await page.locator('.fnl-step[data-n="4"]').click();
    await leaveDemoVisible('#funnel', 2200);
    assert.equal(await page.locator('#fnlN').textContent(), '5');
    assert.ok(
      parseFloat(await page.locator('.tm-track').evaluate((el) => getComputedStyle(el).animationDuration)) > 1,
      'motion preference change retains a real animation duration'
    );
    await page.locator('.tm-pause').click();
    assert.equal(await page.locator('.tm-pause').getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('.tm-track').evaluate((el) => getComputedStyle(el).animationPlayState), 'paused');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await page.locator('.tm-track').evaluate((el) => getComputedStyle(el).animationName), 'none');
    const fallback = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const nojs = await fallback.newPage();
    await nojs.goto(`${base}/__v9/home`);
    assert.equal(await nojs.locator('#ccFeed .hc-row').count(), 5);
    assert.equal(await nojs.locator('#labRows input:disabled').count(), 9);
    assert.equal(await nojs.locator('.home-evidence-reasons details').count(), 9);
    for (let i = 0; i < skills.length; i++) {
      const disclosure = nojs.locator('.home-evidence-reasons details').nth(i);
      await disclosure.locator('summary').click();
      assert.equal(await disclosure.locator('p').isVisible(), true);
      assert.equal(await disclosure.locator('p').textContent(), skills[i].ev);
    }
    assert.equal(await nojs.locator('.ear-p:visible').count(), 5);
    assert.equal(await nojs.locator('.faq-item:visible').count(), 7);
    await nojs.locator('.faq-item summary').last().click();
    assert.equal(await nojs.locator('.faq-item').last().getAttribute('open'), '');
    assert.equal(
      await nojs.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      true,
      'noJS phone overflow'
    );
    await fallback.close();
  } finally {
    await browser.close();
  }
});

test(`home phone expert keyboard selection stays inside its horizontal clip (${engine})`, async () => {
  const browser = await { chromium, firefox, webkit }[engine].launch();
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await page.goto(`${base}/__v9/home`);
    await page.waitForSelector('[data-v9-home][data-enhanced]');
    await page.evaluate(() => document.fonts.ready);
    await page.locator('#ear-t0').focus();
    const scrollY = await page.evaluate(() => window.scrollY);
    for (const [key, index] of [
      ['End', 4],
      ['Home', 0],
      ['ArrowLeft', 4],
      ['ArrowRight', 0],
    ]) {
      await page.keyboard.press(key);
      const target = page.locator(`#ear-t${index}`);
      assert.equal(await target.getAttribute('aria-selected'), 'true');
      assert.equal(await target.evaluate((el) => el === document.activeElement), true);
      assert.ok(
        await target.evaluate((el) => {
          const tab = el.getBoundingClientRect();
          const clip = el.closest('.ear-tabs').getBoundingClientRect();
          return tab.left >= clip.left && tab.right <= clip.right;
        }),
        `${key} exposes the complete focused tab at 390px`
      );
      assert.equal(await page.evaluate(() => window.scrollY), scrollY, `${key} must not scroll the document`);
    }
  } finally {
    await browser.close();
  }
});

test(`home handoff hero motion and lifecycle (${engine})`, async () => {
  const { verifyHeroMotion } = await import('./v9-home-hero.mjs');
  const browser = await { chromium, firefox, webkit }[engine].launch();
  try {
    await verifyHeroMotion(browser, base);
  } finally {
    await browser.close();
  }
});
