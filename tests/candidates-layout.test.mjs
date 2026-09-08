import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch();
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
const weights = [
  [30, 30, 15, 15, 10, 0],
  [25, 25, 25, 10, 10, 5],
  [15, 30, 15, 10, 30, 0],
  [15, 15, 10, 25, 5, 30],
];
const evidence = [96, 91, 95, 89, 74, 68];
try {
  for (const width of [320, 390, 768, 1000, 1520, 1920]) {
    const page = await browser.newPage({
      viewport: { width, height: 1000 },
      reducedMotion: 'reduce',
      hasTouch: width < 800,
    });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(base + '/candidates', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('main').count(), 1);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('link[href*="fonts.googleapis"]').count(), 0);
    assert.equal(await page.locator('#cvFile').count(), 0, 'No simulated CV upload');
    assert.equal(
      await page.locator('#candidate-email').evaluate((input) => getComputedStyle(input).borderTopWidth),
      '1px',
      'Email field has a visible outline'
    );
    const ids = await page.locator('[id]').evaluateAll((elements) => elements.map((e) => e.id));
    assert.equal(ids.length, new Set(ids).size);
    for (const id of ['score', 'tally', 'proof', 'thirty', 'controls', 'when', 'voices']) {
      const section = page.locator(`#${id}`);
      assert.ok(
        await section.evaluate(
          (e) =>
            Math.abs(
              e.querySelector('h2').getBoundingClientRect().left -
                e.querySelector('.c-wrap').getBoundingClientRect().left
            ) < 1
        )
      );
    }
    const pageCopy = await page.locator('.candidate-page').innerText();
    assert.doesNotMatch(
      pageCopy,
      /85%|1\.8 offers|shortlisted everywhere|never know you were here|never re-interview/i
    );
    assert.match(pageCopy, /Interview once\./);
    assert.match(pageCopy, /Be seen for your work\./);
    assert.match(pageCopy, /Same person\./);
    assert.match(pageCopy, /Different score\./);
    assert.equal(await page.locator('.c-weights dt i').count(), 0);
    assert.equal(await page.locator('.c-mobile-score').isVisible(), width < 900);
    assert.equal(await page.locator('[data-evidence-row]').count(), 6);
    await page.locator('[data-evidence-row="2"]').focus();
    assert.equal(
      await page.locator('[data-priority-row="2"]').evaluate((row) => row.classList.contains('is-linked')),
      true
    );
    await page.locator('[data-priority-row="4"]').focus();
    assert.equal(
      await page.locator('[data-evidence-row="4"]').evaluate((row) => row.classList.contains('is-linked')),
      true
    );
    assert.equal(await page.locator('.c-evidence .is-linked').count(), 1);
    assert.ok(
      await page
        .locator('.c-weights-heading')
        .evaluate(
          (heading) =>
            Math.abs(
              heading.lastElementChild.getBoundingClientRect().right -
                document.querySelector('[data-weight]').getBoundingClientRect().right
            ) < 1
        )
    );
    assert.match(pageCopy, /They may still ask follow-up questions and run their own interviews\./);
    const conversation = await page.locator('#thirty').evaluate((section) => {
      const heading = section.querySelector('h2');
      const lead = section.querySelector('.c-lead');
      return {
        stacked: lead.getBoundingClientRect().top > heading.getBoundingClientRect().bottom,
        aligned: Math.abs(lead.getBoundingClientRect().left - heading.getBoundingClientRect().left) < 1,
        serif: getComputedStyle(section.querySelector('h3')).fontFamily === getComputedStyle(heading).fontFamily,
        borders: [...section.querySelectorAll('.c-features article')].every(
          (article) => getComputedStyle(article).borderTopWidth === '0px'
        ),
        underlineFits:
          section.querySelector('.c-underline').getBoundingClientRect().right <=
          section.querySelector('.c-wrap').getBoundingClientRect().right + 1,
      };
    });
    assert.deepEqual(conversation, { stacked: true, aligned: true, serif: true, borders: true, underlineFits: true });
    for (const id of ['controls', 'when', 'proof']) {
      assert.ok(
        await page
          .locator(`#${id}`)
          .evaluate(
            (section) =>
              section.querySelector('.c-lead').getBoundingClientRect().top >
              section.querySelector('h2').getBoundingClientRect().bottom
          ),
        `${id}: stacked introduction`
      );
    }
    assert.equal(await page.locator('.c-step__arrow').count(), 3);
    assert.equal(await page.locator('.c-step--yours').count(), 2);
    assert.deepEqual(await page.locator('.c-step--yours h3').allTextContents(), [
      'Share your profile',
      'Choose your next move',
    ]);
    assert.ok(
      await page
        .locator('.c-control-grid h3')
        .evaluateAll((headings) =>
          headings.every(
            (heading) =>
              getComputedStyle(heading).fontFamily === getComputedStyle(document.querySelector('h2')).fontFamily
          )
        )
    );
    assert.equal(
      await page.locator('.c-preview__frame').evaluate((frame) => getComputedStyle(frame).backgroundColor),
      'rgb(255, 255, 255)'
    );
    assert.ok(
      await page
        .locator('#proof')
        .evaluate(
          (section) =>
            Math.abs(
              section.querySelector('.c-preview').getBoundingClientRect().left -
                section.querySelector('h2').getBoundingClientRect().left
            ) < 1
        )
    );
    assert.ok(
      await page
        .locator('.c-control-grid h3')
        .first()
        .evaluate(
          (heading) =>
            Math.abs(
              parseFloat(getComputedStyle(heading).fontSize) -
                1.1 * parseFloat(getComputedStyle(document.documentElement).fontSize)
            ) < 0.01
        )
    );
    for (const selector of ['h1', '.c-head h2', '.c-apply h2']) {
      assert.ok(
        await page
          .locator(selector)
          .evaluateAll((headings) => headings.every((heading) => heading.scrollWidth <= heading.clientWidth + 2)),
        'Revised headlines fit without clipping'
      );
    }
    for (let i = 0; i < weights.length; i++) {
      await page.locator(`[data-brief="${i}"]`).click();
      const expected = evidence.reduce((sum, value, index) => sum + value * weights[i][index], 0) / 100;
      assert.equal(await page.locator('[data-score]').textContent(), expected.toFixed(1));
      assert.equal(await page.locator('[data-mobile-score]').textContent(), expected.toFixed(1));
      assert.equal(
        await page.locator('[data-mobile-team]').textContent(),
        await page.locator(`[data-brief="${i}"]`).textContent()
      );
      assert.match(await page.locator('[data-score-note]').textContent(), /His interview scores stay the same/);
      if (width >= 900) {
        await page.waitForFunction(
          () =>
            Math.abs(
              document.querySelector('.c-evidence-label').getBoundingClientRect().top -
                document.querySelector('.c-weights-heading').getBoundingClientRect().top
            ) < 1
        );
        assert.ok(
          await page.locator('#score').evaluate((section) => {
            const heading = section.querySelector('h2').getBoundingClientRect();
            const lead = section.querySelector('.c-lead').getBoundingClientRect();
            const right = section.querySelector('.c-priorities').getBoundingClientRect();
            const buttons = [...section.querySelectorAll('[data-brief]')].map((button) =>
              button.getBoundingClientRect()
            );
            return (
              Math.abs(heading.top - lead.top) < 1 &&
              Math.abs(lead.left - right.left) < 1 &&
              Math.abs(buttons[0].top - buttons[1].top) < 1 &&
              Math.abs(buttons[2].top - buttons[3].top) < 1 &&
              buttons[2].top > buttons[0].bottom
            );
          }),
          'Shared columns, top-aligned intro and deliberate two-row selector'
        );
      }
      if (width < 900)
        assert.ok(
          await page.locator('.c-mobile-score').evaluate((summary) => {
            const box = summary.getBoundingClientRect();
            return box.top >= 0 && box.bottom <= innerHeight;
          }),
          'Score stays visible when a team is chosen'
        );
      assert.deepEqual((await page.locator('[data-weight]').allTextContents()).map(Number.parseFloat), weights[i]);
      const leading = weights[i]
        .map((value, index) => (value === Math.max(...weights[i]) ? String(index) : null))
        .filter((value) => value !== null);
      assert.deepEqual(
        await page
          .locator('[data-evidence-row].is-priority')
          .evaluateAll((rows) => rows.map((row) => row.dataset.evidenceRow)),
        leading
      );
      assert.deepEqual(
        await page
          .locator('[data-priority-row].is-priority')
          .evaluateAll((rows) => rows.map((row) => row.dataset.priorityRow)),
        leading
      );
      assert.deepEqual(await page.locator('.c-evidence .is-weaker dd').allTextContents(), ['74', '68']);
      assert.ok(
        await page
          .locator('[data-priority-row].is-priority [data-weight-bar]')
          .evaluateAll((bars) => bars.every((bar) => getComputedStyle(bar).backgroundColor === 'rgb(218, 0, 7)'))
      );
      assert.deepEqual((await page.locator('.c-evidence dd').allTextContents()).map(Number), evidence);
      assert.equal(await page.locator('[data-brief][aria-pressed=true]').count(), 1);
      assert.match(await page.locator('[data-score-status]').textContent(), /Interview evidence unchanged/);
    }
    await page.locator('[data-brief="0"]').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('[data-score]').textContent(), '91.1');
    const preview = page.locator('.c-preview__frame');
    const initialHeight = (await preview.boundingBox()).height;
    await page.locator('#profile-tab').focus();
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('#team-tab').getAttribute('aria-selected'), 'true');
    assert.equal(await page.locator('#team-panel').isVisible(), true);
    assert.equal(await page.locator('#profile-panel').isVisible(), false);
    assert.equal((await preview.boundingBox()).height, initialHeight, 'Tab switches keep the card frame stable');
    if ([390, 1520].includes(width))
      await page.locator('#proof').screenshot({
        path: `/tmp/candidate-reviewed-team-${width}.png`,
        style: '#nav { visibility:hidden!important; }',
      });
    await page.keyboard.press('Home');
    assert.equal(await page.locator('#profile-panel').isVisible(), true);
    if (width < 800)
      assert.ok(
        await page
          .locator('[data-brief]')
          .evaluateAll((buttons) => buttons.every((button) => button.getBoundingClientRect().height >= 44))
      );
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    if ([390, 1520].includes(width)) {
      await page.mouse.move(0, 0);
      for (const id of ['top', 'score', 'tally', 'proof', 'thirty', 'controls', 'when', 'voices', 'apply']) {
        await page.locator(`#${id}`).screenshot({
          path: `/tmp/candidate-reviewed-${id}-${width}.png`,
          style: '#nav { visibility:hidden!important; }',
        });
      }
    }
    await page.locator('#candidate-email').fill('layout-test@example.com');
    await page.locator('.c-signup button').click();
    await page.waitForURL('**/candidates/start?email=layout-test%40example.com');
    assert.equal(await page.locator('#emailInput').inputValue(), 'layout-test@example.com');
    assert.equal(await page.locator('#profileForm').getAttribute('action'), '/.netlify/functions/candidate-profile');
    assert.equal(await page.locator('#submitBtn').isDisabled(), true, 'No profile is submitted by this test');
    assert.deepEqual(errors, []);
    console.log(`${width}px: candidate layout, demo, keyboard tabs and profile handoff passed`);
    await page.close();
  }
  const page = await browser.newPage({ javaScriptEnabled: false });
  await page.goto(base + '/candidates');
  assert.equal(await page.locator('[data-score]').textContent(), '91.1');
  assert.equal(await page.locator('[data-evidence-row].is-priority').count(), 2);
  assert.equal(await page.locator('.c-evidence .is-weaker').count(), 2);
  assert.deepEqual((await page.locator('[data-weight]').allTextContents()).map(Number.parseFloat), weights[0]);
  assert.equal(await page.locator('.c-signup').getAttribute('action'), '/candidates/start');
  assert.equal(await page.locator('h1').isVisible(), true);
  await page.close();
  console.log('No-JS: candidate headline, initial calculation and profile path passed');
} finally {
  await browser.close();
}
