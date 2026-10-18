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
    assert.equal(
      await page.locator('.v58-bar-line').evaluate((line) => parseFloat(getComputedStyle(line).strokeDashoffset)),
      0,
      'Reduced-motion threshold line remains visible'
    );
    assert.match(await hero.locator('.v58-lead').innerText(), /Every role has a bar/);
    assert.match(await hero.locator('.v58-lead').innerText(), /or interview yours/);
    assert.equal(await hero.locator('.v58-primary').innerText(), 'Start with one role');
    assert.equal(await hero.locator('.is-accent').count(), 3);
    assert.equal(await hero.locator('.v58-primary').getAttribute('href'), '/contact');
    assert.match(await hero.locator('.v58-link').innerText(), /See it live/);
    assert.equal(await hero.locator('.v58-hero-c__cue').getAttribute('href'), '#proof');
    assert.equal(await hero.locator(':scope > .v58-hero-c__main + .v58-hero-c__cue').count(), 1);
    const cueBox = await hero.locator('.v58-hero-c__cue').boundingBox();
    const logosBox = await page.locator('.v58-logo-strip').boundingBox();
    assert.ok(logosBox.y - cueBox.y - cueBox.height >= 60, 'Cue stays separate from the logo strip');
    assert.ok(logosBox.y - cueBox.y - cueBox.height <= 100, 'Cue stays near the hero bottom, without a dead band');
    const microBox = await hero.locator('.v58-micro').boundingBox();
    const cueGapLimit = width >= 900 ? page.viewportSize().height * 0.25 : 170;
    assert.ok(cueBox.y - microBox.y - microBox.height < cueGapLimit, 'Cue gap stays proportionate to the viewport');
    assert.doesNotMatch(await hero.innerText(), /move the bar/i);
    assert.equal(await page.locator('#in-three-steps').count(), 0);
    assert.equal(await page.locator('.v58-opening + #what').count(), 1);
    const order = await page.locator('.v58-home > section').evaluateAll((es) => es.map((e) => e.id));
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
    assert.equal(await page.locator('#experts #cover').count(), 1);
    assert.equal(await page.locator('#work + #savings + #ways').count(), 1);
    assert.equal(
      await page.locator('#proof + #funnel + #ops + #experts + #work').count(),
      1,
      'Follow v61: demonstration, case, delivery, experts, engagement'
    );
    for (const detail of await page.locator('#cover details').all()) await detail.locator('summary').click();
    assert.equal(await page.locator('#cover .v58-role-coverage__list li').count(), 17);
    const coverageRows = await page.locator('#cover li').evaluateAll((items) =>
      items.map((item) => ({
        x: Math.round(item.getBoundingClientRect().x),
        y: Math.round(item.getBoundingClientRect().y),
      }))
    );
    if (width <= 390) {
      assert.equal(new Set(coverageRows.map((row) => row.x)).size, 1, 'Mobile coverage has one consistent column');
      assert.equal(new Set(coverageRows.map((row) => row.y)).size, 17);
    }
    const claimStyle = await page.locator('.v58-thesis__claim').evaluate((element) => {
      const style = getComputedStyle(element);
      return { size: parseFloat(style.fontSize), leading: parseFloat(style.lineHeight) / parseFloat(style.fontSize) };
    });
    assert.ok(claimStyle.size >= 18 && claimStyle.size <= 22.5, 'Supporting statement stays below heading scale');
    assert.ok(claimStyle.leading >= 1.34, 'Statement gives the underline enough line spacing');
    const claimLines = await page.locator('.v58-thesis__claim').evaluate((element) => {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      const lines = new Map();
      while (walker.nextNode()) {
        const node = walker.currentNode;
        for (let i = 0; i < node.textContent.length; i++) {
          const character = node.textContent[i];
          if (/\s/.test(character)) continue;
          const range = document.createRange();
          range.setStart(node, i);
          range.setEnd(node, i + 1);
          const rect = range.getBoundingClientRect();
          // Group display-face and italic-face glyphs by the shared line box.
          const line = Math.round(
            (rect.y - element.getBoundingClientRect().y) / parseFloat(getComputedStyle(element).lineHeight)
          );
          if (!lines.has(line)) lines.set(line, character);
        }
      }
      return [...lines.values()];
    });
    assert.ok(
      claimLines.every((first) => first !== '—'),
      'No orphan dash at the start of a payoff line'
    );
    if (width === 390 || width === 1520) assert.equal(claimLines.length, 2, 'Payoff fits two balanced lines');
    for (const detail of await page.locator('#cover details').all()) await detail.locator('summary').click();
    assert.equal(await page.locator('.v58-barcard figcaption').innerText(), "Three clear it. Five don't.");
    assert.equal(
      (await page.locator('#what h2').innerText()).replace(/\s+/g, ' ').trim(),
      "We don't send CVs. We send three who've cleared your bar."
    );
    assert.equal(
      (await page.locator('.v58-thesis__claim').textContent()).replace(/\s+/g, ' ').trim(),
      'Three worth meeting — the proof behind each one.'
    );
    assert.equal(await page.locator('.v58-thesis__claim .v58-hd-underline').count(), 1);
    assert.match(await page.locator('.v58-thesis__body').innerText(), /each with the proof behind the score/);
    assert.match(await page.locator('.v58-thesis__body').innerText(), /stops screening and starts choosing/);
    assert.match(await page.locator('.v58-proof-intro').innerText(), /same person, a different bar/);
    assert.match(await page.locator('#experts h2').innerText(), /the one you set/);
    assert.equal(await page.locator('.v58-coverage__focus').count(), 4);
    assert.equal(await page.locator('#work h2 br').count(), 1);
    assert.match(await page.locator('.v58-funnel-field__head').innerText(), /126 possible candidates for this role/i);
    assert.match(await page.locator('.v58-funnel-close').innerText(), /The hiring team chose two/);
    assert.match(await page.locator('.v58-funnel-close').innerText(), /32 hours/);
    const stages = page.locator('.v58-funnel-step');
    assert.match(await stages.nth(1).innerText(), /HR interview/);
    assert.match(await stages.nth(2).innerText(), /technical work/);
    const inputs = page.locator('[data-v58-lab] input[type="range"]');
    assert.equal(await inputs.count(), 9);
    const originalNote = await page.locator('[data-note]').innerText();
    assert.match(originalNote, /his production detection work carries the weight/);
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
      await hero.screenshot({ path: `/tmp/v60-hero-${width}.png` });
      await page.locator('#cover').screenshot({ path: `/tmp/v60-cover-${width}.png` });
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
    console.log(`${width}px: v60 copy/order, preserved lab/funnel and reduced motion passed`);
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
        .locator('.v58-bar-line, .v58-bar-checks path')
        .evaluateAll((paths) => paths.map((path) => getComputedStyle(path).strokeDashoffset))
    ).every((offset) => parseFloat(offset) === 0)
  );
  const delays = await card
    .locator('.v58-bar-checks path')
    .evaluateAll((paths) => paths.map((path) => parseFloat(getComputedStyle(path).transitionDelay)));
  assert.ok(delays[0] < delays[1] && delays[1] < delays[2], 'Checks draw from left to right');
  await card.screenshot({ path: '/tmp/handoff-bar-line-animated.png' });
  await animated.close();
  const noScript = await browser.newPage({ javaScriptEnabled: false });
  await noScript.route('https://**', (route) => route.abort());
  await noScript.goto(base);
  for (const detail of await noScript.locator('#cover details').all()) {
    await detail.locator('summary').click();
    assert.equal(await detail.getAttribute('open'), '');
    assert.ok(await detail.locator('li').first().isVisible(), 'Role coverage works without JavaScript');
  }
  assert.equal(await noScript.locator('#cover li:visible').count(), 17);
  assert.equal(
    await noScript.locator('.v58-bar-line').evaluate((line) => parseFloat(getComputedStyle(line).strokeDashoffset)),
    0,
    'No-JS threshold line remains visible'
  );
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
