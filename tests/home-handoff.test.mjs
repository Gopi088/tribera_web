import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4331';
const browser = await chromium.launch();
try {
  for (const width of [320, 390, 768, 1520]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    await page.route('https://**', (route) => route.abort());
    await page.goto(base, { waitUntil: 'networkidle' });
    const hero = page.locator('.v58-hero-c');
    assert.match(await hero.locator('.v58-lead').innerText(), /or interview the ones you already have/);
    assert.match(await hero.locator('.v58-lead').innerText(), /three who meet your requirements/);
    assert.equal(await hero.locator('.v58-primary').innerText(), 'Start with one role');
    assert.equal(await hero.locator('.is-accent').count(), 3);
    assert.equal(await hero.locator('.v58-primary').getAttribute('href'), '/contact');
    assert.match(await hero.locator('.v58-link').innerText(), /See it live/);
    assert.equal(await hero.locator('.v58-hero-c__cue').getAttribute('href'), '#proof');
    assert.equal(await hero.locator('.v58-hero-c__copy > .v58-micro + .v58-hero-c__cue').count(), 1);
    const cueBox = await hero.locator('.v58-hero-c__cue').boundingBox();
    const logosBox = await page.locator('.v58-logo-strip').boundingBox();
    assert.ok(logosBox.y - cueBox.y - cueBox.height >= 60, 'Cue stays separate from the logo strip');
    assert.doesNotMatch(await hero.innerText(), /move the bar/i);
    assert.equal(await page.locator('.v58-logo-strip + #in-three-steps').count(), 1);
    assert.equal(await page.locator('#in-three-steps + #what').count(), 1);
    const intro = page.locator('#in-three-steps');
    assert.match(await intro.innerText(), /what .good. looks like for this role/);
    const positions = await intro
      .locator('.v58-intro__step')
      .evaluateAll((steps) =>
        steps.map((step) => ({ x: step.getBoundingClientRect().x, y: step.getBoundingClientRect().y }))
      );
    assert.equal(positions.length, 3);
    assert.equal(positions[0].y === positions[1].y, width > 760);
    assert.equal(positions[0].x === positions[1].x, width <= 760);
    assert.equal(await page.locator('.v58-barcard figcaption').innerText(), "Three clear it. Five don't.");
    assert.equal(await page.locator('.v58-thesis__claim').innerText(), 'Three to interview. Evidence to decide.');
    assert.match(await page.locator('.v58-proof-intro').innerText(), /your priorities change the shortlist/);
    assert.match(await page.locator('#experts h2').innerText(), /your requirements/);
    assert.equal(await page.locator('.v58-coverage__roles li').count(), 17);
    assert.equal(await page.locator('#work h2 br').count(), 1);
    assert.match(
      await page.locator('.v58-funnel-field__head').innerText(),
      /From 126 candidates sourced for this role/i
    );
    assert.match(await page.locator('.v58-funnel-close').innerText(), /The hiring team chose two/);
    assert.match(await page.locator('.v58-funnel-close').innerText(), /32 hours/);
    const stages = page.locator('.v58-funnel-step');
    assert.match(await stages.nth(1).innerText(), /HR interview/);
    assert.match(await stages.nth(2).innerText(), /technical work/);
    const inputs = page.locator('[data-v58-lab] input[type="range"]');
    assert.equal(await inputs.count(), 9);
    const originalNote = await page.locator('[data-note]').innerText();
    assert.match(originalNote, /LLM security and data access scored lower/);
    await page.locator('[data-preset="llm"]').click();
    assert.match(await page.locator('[data-note]').innerText(), /both scored 2 out of 5/);
    await page.locator('[data-preset="brief"]').click();
    assert.equal(await page.locator('[data-note]').innerText(), originalNote);
    await inputs.first().evaluate((input) => {
      input.value = input.max;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    const shares = await page.locator('[data-share]').allTextContents();
    assert.equal(Math.round(shares.reduce((total, share) => total + parseFloat(share), 0) * 10), 1000);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    const squares = await page
      .locator('.v58-bar-square')
      .evaluateAll((elements) => elements.map((element) => getComputedStyle(element).opacity));
    assert.ok(
      squares.every((opacity) => opacity === '1'),
      'Reduced-motion squares remain visible'
    );
    if (width === 390 || width === 1520) {
      await page.locator('[data-preset="brief"]').click();
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForFunction(() => window.scrollY === 0);
      assert.ok((await hero.locator('h1').boundingBox()).y < 500, 'Hero heading is in frame');
      await page.screenshot({ path: `/tmp/handoff-hero-${width}.png` });
      await intro.screenshot({ path: `/tmp/handoff-intro-${width}.png` });
      await page.locator('#what').screenshot({ path: `/tmp/handoff-thesis-${width}.png` });
      for (const id of ['proof', 'experts', 'funnel', 'work']) {
        await page.mouse.move(0, 0);
        if (id === 'funnel') {
          await page.locator('[data-v58-funnel] [data-stage]').first().focus();
          await page.waitForTimeout(500);
        }
        await page.locator(`#${id}`).screenshot({
          path: `/tmp/handoff-${id}-${width}.png`,
          style: '#nav { visibility: hidden !important; }',
        });
      }
    }
    console.log(`${width}px: copy, intro layout, preserved lab/funnel and reduced motion passed`);
    await page.close();
  }
  const animated = await browser.newPage({ viewport: { width: 1520, height: 1000 }, reducedMotion: 'no-preference' });
  await animated.route('https://**', (route) => route.abort());
  await animated.goto(base, { waitUntil: 'networkidle' });
  const card = animated.locator('.v58-barcard');
  assert.equal(await card.evaluate((element) => element.classList.contains('is-animated')), true);
  assert.equal(await card.evaluate((element) => element.classList.contains('drawn')), false);
  await card.scrollIntoViewIfNeeded();
  await animated.waitForFunction(() => document.querySelector('.v58-barcard').classList.contains('drawn'));
  await animated.waitForTimeout(2100);
  assert.ok(
    (
      await card
        .locator('.v58-bar-checks path')
        .evaluateAll((paths) => paths.map((path) => getComputedStyle(path).strokeDashoffset))
    ).every((offset) => parseFloat(offset) === 0)
  );
  const delays = await card
    .locator('.v58-bar-checks path')
    .evaluateAll((paths) => paths.map((path) => parseFloat(getComputedStyle(path).transitionDelay)));
  assert.ok(delays[0] < delays[1] && delays[1] < delays[2], 'Checks draw from left to right');
  await animated.close();
  const noScript = await browser.newPage({ javaScriptEnabled: false });
  await noScript.goto(base);
  assert.ok(
    (
      await noScript
        .locator('.v58-bar-square')
        .evaluateAll((squares) => squares.map((square) => getComputedStyle(square).opacity))
    ).every((opacity) => opacity === '1')
  );
  console.log('Scroll animation, staggered checks and JavaScript-disabled fallback passed');
  await noScript.close();
} finally {
  await browser.close();
}
