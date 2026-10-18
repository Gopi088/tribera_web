import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import fs from 'node:fs';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4322';
const browser = await chromium.launch();
const normalize = (text) => text.replace(/\s+/g, ' ').trim();
const order = [
  'proof',
  'what',
  'funnel',
  '',
  'experts',
  'work',
  'savings',
  'ways',
  'results',
  'trust',
  'procurement',
  'faq',
  'start',
];
const shots = 'artifacts/home-v126';
fs.mkdirSync(shots, { recursive: true });
try {
  const samplePage = await browser.newPage({ javaScriptEnabled: false });
  await samplePage.setContent(fs.readFileSync('sample_data/tribera-home-v126.html', 'utf8'));
  const sampleHeadings = (await samplePage.locator('section h2').allInnerTexts()).map(normalize);
  await samplePage.close();
  const actualPage = await browser.newPage({ reducedMotion: 'reduce' });
  await actualPage.goto(base, { waitUntil: 'networkidle' });
  assert.deepEqual(
    (await actualPage.locator('.v126-home > section h2').allInnerTexts()).map(normalize),
    sampleHeadings,
    'All sample section headings and their order are preserved'
  );
  const ids = await actualPage.locator('[id]').evaluateAll((els) => els.map((el) => el.id));
  assert.equal(new Set(ids).size, ids.length, 'No duplicate element IDs');
  assert.equal(await actualPage.locator('meta[property="og:image:width"]').getAttribute('content'), '2400');
  assert.equal(await actualPage.locator('meta[property="og:image:height"]').getAttribute('content'), '1260');
  await actualPage.close();

  for (const width of [320, 390, 768, 900, 1280, 1520, 1920]) {
    const page = await browser.newPage({
      viewport: { width, height: 1000 },
      reducedMotion: 'reduce',
      colorScheme: width === 1920 ? 'dark' : 'light',
    });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('h1').count(), 1);
    assert.deepEqual(await page.locator('.v126-home > section').evaluateAll((els) => els.map((el) => el.id)), order);
    assert.equal(
      normalize(await page.locator('.hero-c .lead').innerText()),
      'You interview three, not thirty — only the ones who clear your bar.'
    );
    assert.equal(await page.locator('.xp').count(), 12);
    assert.equal(await page.locator('.inds-g > span').count(), 12);
    const clipping = await page.locator('.v126-home').evaluate((root) => {
      const failures = [];
      for (const el of root.querySelectorAll('h1,h2,h3,h4,p,.ops-n,.ops-k,.rn,.flow,.reg,.faq-list')) {
        const box = el.getBoundingClientRect();
        if (box.width && (box.left < -1 || box.right > innerWidth + 1 || el.scrollWidth > el.clientWidth + 2))
          failures.push({
            text: el.textContent.trim().slice(0, 80),
            left: box.left,
            right: box.right,
            client: el.clientWidth,
            scroll: el.scrollWidth,
          });
      }
      return failures;
    });
    assert.deepEqual(clipping, [], `No content clipping at ${width}px`);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    assert.equal(await page.locator('#nav').count(), 1, 'Original shared navigation restored');
    assert.equal(await page.locator('.v126-header').count(), 0);
    assert.equal(
      await page.locator('#nav').evaluate((el) => getComputedStyle(el).backgroundColor),
      'rgb(255, 255, 255)'
    );
    assert.deepEqual(await page.locator('#nav .nav__links > .nav__l').allTextContents(), [
      'Services',
      'Intelligence',
      'Blog',
      'About',
      'Contact',
      'Careers',
    ]);
    assert.equal(await page.locator('#nav .dd__t').textContent(), 'Coverage');
    assert.deepEqual((await page.locator('#nav .nav__sw a').allTextContents()).map(normalize), [
      'I’m hiring',
      'I’m looking',
    ]);
    assert.equal(await page.locator('#nav .nav__login').getAttribute('href'), 'https://app.tribera.ai/auth/login');
    if (width < 1080) {
      const burger = page.locator('#nav .burger');
      await burger.click();
      assert.equal(await burger.getAttribute('aria-expanded'), 'true');
      assert.equal(await page.locator('#navp').isVisible(), true);
      await page.locator('.navp__t').click();
      assert.equal(await page.locator('.navp__t').getAttribute('aria-expanded'), 'true');
      assert.equal(await page.locator('#navp-cov .navp__c').first().locator('a').count(), 12);
      assert.equal(await page.locator('#navp-cov .navp__c').last().locator('a').count(), 8);
      await page.keyboard.press('Escape');
      assert.equal(await burger.getAttribute('aria-expanded'), 'false');
    } else {
      await page.locator('#nav .dd__t').hover();
      await page.locator('#nav .dd__p').waitFor({ state: 'visible' });
      assert.equal(await page.locator('#nav .dd__c').first().locator('a').count(), 12);
      assert.equal(await page.locator('#nav .dd__c').last().locator('a').count(), 8);
      await page.keyboard.press('Escape');
    }
    const scores = await page.locator('.lt b').allTextContents();
    const expected = {
      brief: ['39.00', 'Select'],
      detect: ['40.00', 'Select'],
      llm: ['32.80', 'Grey'],
      own: ['41.00', 'Select'],
    };
    for (const [preset, [score, band]] of Object.entries(expected)) {
      await page.locator(`[data-pre="${preset}"]`).click();
      await page.waitForFunction((expected) => document.querySelector('#labScore').textContent === expected, score);
      assert.equal(await page.locator('#labScore').innerText(), score, `${preset} at ${width}px`);
      assert.equal((await page.locator('#labBand').textContent()).trim(), band);
      assert.deepEqual(await page.locator('.lt b').allTextContents(), scores, 'Candidate scores stay fixed');
      assert.equal(await page.locator('.pre[aria-pressed="true"]').count(), 1);
    }
    await page.locator('.lt').nth(2).click();
    assert.match(await page.locator('#labEv').innerText(), /AI \/ LLM security basics · 2\/5/);
    await page.locator('#labRows input').first().fill('40');
    assert.equal(await page.locator('#labTotal').innerText(), '100.00');
    const percentages = await page.locator('.rp').allTextContents();
    assert.ok(Math.abs(percentages.reduce((sum, value) => sum + parseFloat(value), 0) - 100) < 0.5);
    for (const [index, count] of [126, 40, 14, 5, 2].entries()) {
      const step = page.locator('.fnl-step').nth(index);
      await step.focus();
      await page.keyboard.press('Enter');
      assert.equal(await page.locator('#fnlN').innerText(), String(count));
      assert.equal(await page.locator('.sq:not(.out)').count(), count);
      assert.equal(await step.getAttribute('aria-pressed'), 'true');
    }
    const faq = page.locator('.faq-item');
    await faq
      .nth(1)
      .locator('summary')
      .evaluate((el) => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await faq.nth(1).locator('summary').click();
    assert.equal(await page.locator('.faq-item[open]').count(), 1);
    assert.equal(await faq.nth(1).getAttribute('open'), '');
    await faq.nth(2).locator('summary').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('.faq-item[open]').count(), 1);
    assert.equal(await faq.nth(2).getAttribute('open'), '');
    for (const intent of ['role', 'demo']) {
      await page.locator(`#start [data-form-intent="${intent}"]`).click();
      assert.equal(await page.locator('[data-form-intent-input]').inputValue(), intent);
      await page.keyboard.press('Escape');
    }
    assert.deepEqual(errors, [], 'No browser script errors');
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    if ([390, 1520].includes(width)) await page.screenshot({ path: `${shots}/${width}.png`, fullPage: true });
    await page.close();
    console.log(`v126 layout, scoring, evidence, funnel, FAQ and forms passed at ${width}px`);
  }
  for (const width of [390, 1520]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, javaScriptEnabled: false });
    await page.goto(base, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.lt').count(), 9);
    assert.equal(await page.locator('.sq').count(), 126);
    assert.equal(await page.locator('.ops-n .cu').innerText(), '36');
    assert.equal(await page.locator('.hero-c h1').isVisible(), true);
    assert.equal(await page.locator('.verd').isVisible(), true);
    const hidden = await page
      .locator('.v126-home [data-rv],.xp,.inds-g span,.ob-sq,.ho-head,.fa-head')
      .evaluateAll((els) => els.filter((el) => parseFloat(getComputedStyle(el).opacity) < 1).map((el) => el.className));
    assert.deepEqual(hidden, [], 'Static copy and diagrams have full opacity');

    await page.locator('.faq-item').nth(3).locator('summary').click();
    assert.equal(await page.locator('.faq-item[open]').count(), 1);
    assert.equal(await page.locator('.faq-item').nth(3).locator('.faq-a').isVisible(), true);
    assert.equal(await page.locator('#start .btn').getAttribute('href'), '/contact');
    await page.close();
  }
  console.log('v126 static fallback and native FAQ passed without JavaScript');
  const motion = await browser.newPage({ viewport: { width: 1520, height: 1000 } });
  const motionErrors = [];
  motion.on('pageerror', (error) => motionErrors.push(error.message));
  await motion.goto(base, { waitUntil: 'networkidle' });
  await motion.locator('[data-pre="llm"]').click();
  await motion.waitForFunction(() => document.querySelector('#labScore').textContent === '32.80');
  assert.equal(
    await motion
      .locator('.tm-card')
      .evaluateAll((els) => els.filter((el) => getComputedStyle(el).display !== 'none').length),
    6,
    'Both sets remain rendered for the continuous marquee'
  );
  assert.match(await motion.locator('.tm-track').evaluate((el) => getComputedStyle(el).animationName), /v126-tmmove/);
  const last = motion.locator('.fnl-step').last();
  await last.focus();
  await motion.keyboard.press('Enter');
  await motion.locator('.fnl-step').first().dispatchEvent('mouseenter');
  await motion.locator('.fnl-step').first().dispatchEvent('mouseleave');
  await motion.locator('#fnlGrid').dispatchEvent('mouseleave');
  assert.equal(
    await motion.locator('#fnlGrid').evaluate((el) => el.classList.contains('peek')),
    true,
    'Pointer exit preserves the focused stage highlight'
  );
  await motion.waitForTimeout(1100);
  assert.equal(await motion.locator('#fnlN').innerText(), '2', 'Autoplay cannot overwrite a user-selected stage');
  assert.deepEqual(motionErrors, []);
  await motion.close();
  console.log('v126 normal motion, marquee and keyboard focus ownership passed');
} finally {
  await browser.close();
}
