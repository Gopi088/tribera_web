import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch();
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321/';
try {
  for (const width of [320, 390, 640, 768, 900, 1520, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    const pageErrors = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('.tribera-home').count(), 0);
    assert.equal(await page.locator('#savings').count(), 1);
    const ids = await page.locator('[id]').evaluateAll((elements) => elements.map((element) => element.id));
    assert.equal(new Set(ids).size, ids.length, 'No duplicate IDs');
    const order = await page
      .locator('.v58-home section[id]')
      .evaluateAll((elements) => elements.map((element) => element.id));
    assert.ok(order.indexOf('what') < order.indexOf('proof'));
    assert.deepEqual(order, [
      'what',
      'proof',
      'funnel',
      'ops',
      'experts',
      'work',
      'savings',
      'ways',
      'trust',
      'results',
      'procurement',
      'start',
    ]);
    assert.equal(await page.locator('#work + #savings + #ways').count(), 1);
    const benefits = page.locator('#savings');
    assert.equal(await benefits.locator('article').count(), 3);
    assert.match(await benefits.innerText(), /Five wasted rounds, gone/);
    const benefitBoxes = await benefits.locator('article').evaluateAll((elements) =>
      elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return { x: rect.x, y: rect.y };
      })
    );
    assert.equal(
      benefitBoxes[0].y === benefitBoxes[1].y,
      width >= 760,
      'Benefits stack on mobile and form a row on desktop'
    );
    assert.deepEqual(order.slice(order.indexOf('proof'), order.indexOf('funnel') + 1), ['proof', 'funnel']);
    assert.equal(
      await page.locator('#proof.v58-dark + #funnel.v58-dark').count(),
      1,
      'The v61 demonstration leads directly into the real hiring case'
    );
    for (const id of ['what', 'proof', 'experts', 'funnel', 'ops', 'work', 'ways', 'results', 'trust']) {
      const alignment = await page.locator(`#${id}`).evaluate((section) => {
        const heading = section.querySelector('h2');
        // The tablet workflow intentionally centres a narrower, stacked column.
        const wrap =
          section.id === 'work' && innerWidth >= 680 && innerWidth < 1180
            ? section.querySelector('.v58-work__flow')
            : section.querySelector('.v58-wrap');
        return {
          offset: Math.abs(heading.getBoundingClientRect().left - wrap.getBoundingClientRect().left),
          textAlign: getComputedStyle(heading).textAlign,
        };
      });
      assert.ok(alignment.offset < 1, `${id}: heading follows its content column left edge`);
      assert.ok(['left', 'start'].includes(alignment.textAlign), `${id}: heading stays left aligned`);
    }
    for (const selector of ['.v58-hero-c h1', '#start h2']) {
      assert.equal(await page.locator(selector).evaluate((element) => getComputedStyle(element).textAlign), 'center');
    }
    const missingAnchors = await page
      .locator('.v58-home a[href^="#"]')
      .evaluateAll((links) =>
        links
          .map((link) => link.getAttribute('href'))
          .filter((href) => href.length > 1 && !document.getElementById(decodeURIComponent(href.slice(1))))
      );
    assert.deepEqual(missingAnchors, [], 'Every homepage section link has a target');
    await page.locator('#benefits').evaluate((el) => el.scrollIntoView({ behavior: 'instant' }));
    const benefitsAnchorTop = await page.locator('#benefits').evaluate((el) => el.getBoundingClientRect().top);
    assert.ok(benefitsAnchorTop >= 95 && benefitsAnchorTop <= 105, 'Legacy benefits anchor clears the fixed header');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.ok(
      await page.locator('h1').evaluate((element) => element.scrollWidth <= element.clientWidth + 8),
      'Hero text fits, allowing the hand-drawn underline overhang'
    );
    assert.doesNotMatch(
      await page.locator('.v58-home').innerText(),
      /Tribera Three|audited for adverse impact|transcript 04:12/
    );

    for (const [selector, title, intent] of [
      ['.v58-hero-c .v58-primary', 'Start with one role', 'role'],
      ['.v58-start .v58-primary', 'Start with one role', 'role'],
      ['.v58-start .v58-link', 'Book a demo', 'demo'],
    ]) {
      await page.locator(selector).click();
      const modal = page.locator('#contactSalesModal');
      assert.equal(await modal.isVisible(), true);
      assert.equal(await modal.locator('h2').textContent(), title);
      assert.equal(await modal.getAttribute('data-active-form-intent'), intent);
      assert.equal(await modal.locator('[name=form_type]').inputValue(), intent === 'role' ? 'sales' : 'demo');
      await modal.locator('[data-close-sales]').click();
    }

    const lab = page.locator('[data-v58-lab]');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const [weight, expectedScore, expectedBand] of [
      [1.75, '25.38', 'REJECT'],
      [2, '26.00', 'GREY'],
      [7, '34.00', 'SELECT'],
    ]) {
      await lab.locator('input[type=range]').evaluateAll((inputs, weight) => {
        inputs.forEach((input) => {
          input.value = '0';
        });
        inputs[0].value = String(weight);
        inputs[2].value = '8';
        inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
      }, weight);
      assert.equal(await lab.locator('[data-verdict-score]').textContent(), expectedScore);
      assert.equal(await lab.locator('[data-band]').textContent(), expectedBand);
    }
    assert.match(await lab.locator('.v58-verdict__axis').textContent(), /26.*34/);
    const split = await lab
      .locator('.v58-verdict__track')
      .evaluate((track) => track.children[0].getBoundingClientRect().width / track.getBoundingClientRect().width);
    assert.ok(Math.abs(split - 0.52) < 0.005);
    await lab.locator('[data-preset=brief]').click();
    if ([390, 1520].includes(width)) {
      for (const name of [
        'hero-c',
        'thesis',
        'proof',
        'funnel-section',
        'experts',
        'work',
        'savings',
        'ways',
        'results',
        'trust',
        'start',
      ]) {
        const section = page.locator(name === 'savings' ? '#savings' : `.v58-${name}`).first();
        await page.mouse.move(0, 0);
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(250);
        await section.screenshot({
          path: `/tmp/home-after-${name}-${width}.png`,
          style: '#nav { visibility:hidden !important; }',
        });
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(400);
      await page.screenshot({ path: `/tmp/home-after-full-${width}.png`, fullPage: true });
      console.log(`${width}px: document height ${await page.evaluate(() => document.body.scrollHeight)}`);
    }
    assert.deepEqual(pageErrors, [], 'No uncaught browser errors during homepage interactions');
    console.log(`${width}px: structure, CTA intents, thresholds and overflow passed`);
    await page.close();
  }
  const page = await browser.newPage({ javaScriptEnabled: false });
  await page.goto(base);
  assert.deepEqual(await page.locator('[data-v58-count]').allTextContents(), ['36', '36']);
  assert.equal(await page.locator('[data-square]').count(), 126);
  assert.equal(
    await page
      .locator('[data-square]')
      .evaluateAll((squares) =>
        squares.every((square) => getComputedStyle(square).backgroundColor !== 'rgba(0, 0, 0, 0)')
      ),
    true
  );
  const href = await page.locator('.v58-start .v58-primary').getAttribute('href');
  const response = await page.goto(new URL(href, base).href);
  assert.equal(response.status(), 200);
  console.log('No-JS: true shortlist time, coloured funnel and working contact fallback passed');
  await page.close();
} finally {
  await browser.close();
}
