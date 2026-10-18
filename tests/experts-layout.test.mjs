import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch();
try {
  for (const width of [320, 390, 768, 1607]) {
    const page = await browser.newPage({ viewport: { width, height: 1100 }, hasTouch: width < 900 });
    await page.goto(process.env.TEST_BASE_URL || 'http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
    const section = page.locator('.v58-experts');
    const headingBox = await section.locator('h2').boundingBox();
    const subtitleBox = await section.locator('.v58-lead').boundingBox();
    const wrapBox = await section.locator('.v58-wrap').boundingBox();
    assert.ok(subtitleBox.y >= headingBox.y + headingBox.height, 'Subtitle follows the title, not beside it');
    assert.ok(subtitleBox.y - headingBox.y - headingBox.height <= 32, 'Subtitle stays close to its title');
    assert.ok(Math.abs(subtitleBox.x - headingBox.x) < 1, 'Title and subtitle share a left edge');
    assert.ok(Math.abs(headingBox.width - wrapBox.width) < 1, 'Experts title uses the full section width');
    const grid = section.locator('.v58-coverage');
    assert.equal(await grid.getAttribute('role'), 'list');
    assert.equal(await grid.locator('[role=listitem]').count(), 4);
    assert.equal(await page.locator('.v58-cover').count(), 0);
    assert.equal(await page.locator('#cover').count(), 1);
    const roles = await page.locator('#cover .v58-role-coverage__list li').allTextContents();
    assert.deepEqual(
      roles.map((text) => text.trim()).sort(),
      [
        'Finance & accounting systems',
        'Data engineering & analytics',
        'Platform & infrastructure',
        'Software engineering',
        'AI & machine learning',
        'Cybersecurity',
        'Product & design',
        'Technology leadership',
        'Finance operations',
        'Procurement & sourcing',
        'Supply chain & planning',
        'HR operations',
        'Commercial & revenue analytics',
        'Risk, controls & compliance',
        'Networks & DC',
        'Capital markets',
        'Manufacturing',
      ].sort()
    );
    assert.equal(await grid.locator('[tabindex]').count(), 0);
    assert.equal(await grid.locator('.v58-coverage__years').count(), 0);
    const geometry = await grid.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      return [...element.children].map((card) => {
        const box = card.getBoundingClientRect();
        const detail = card.querySelector('.v58-coverage__focus');
        const detailBox = detail.getBoundingClientRect();
        const style = getComputedStyle(detail);
        return {
          row: box.top,
          detailTop: detailBox.top,
          fits: box.left >= bounds.left - 1 && box.right <= bounds.right + 1,
          contentFits: card.scrollWidth <= card.clientWidth,
          visible: style.opacity === '1' && style.display !== 'none' && style.visibility === 'visible',
        };
      });
    });
    for (const card of geometry) {
      assert.ok(card.fits && card.contentFits && card.visible, `${width}px: visible card content fits grid`);
    }
    assert.equal(new Set(geometry.map((group) => Math.round(group.row))).size, width < 768 ? 4 : 2);
    assert.equal(await grid.locator('details').count(), 4);
    const roleExamples = [
      'Software engineering',
      'Finance & accounting systems',
      'Supply chain & planning',
      'Product & design',
    ];
    const summaries = await grid.locator('summary').allTextContents();
    summaries.forEach((text, index) =>
      assert.ok(text.includes(roleExamples[index]), 'Each specialism exposes a concrete role before expanding')
    );
    for (const detail of await grid.locator('details').all()) {
      await detail.locator('summary').focus();
      await page.keyboard.press('Enter');
      assert.equal(await detail.getAttribute('open'), '');
      assert.ok(await detail.locator('li').first().isVisible());
      assert.ok(await detail.evaluate((el) => el.scrollWidth <= el.clientWidth));
      await page.keyboard.press('Enter');
      assert.equal(await detail.getAttribute('open'), null);
    }
    assert.doesNotMatch(await section.locator('.v58-lead').textContent(), /not a recruiter|without re-checking/);
    assert.equal(await section.locator('.v58-industries > span').count(), 12);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await section.screenshot({ path: `/tmp/experts-grouped-${width}.png` });
    console.log(`${width}px: four visible specialisms, 17 roles in Coverage and bounds passed`);
    await page.close();
  }
} finally {
  await browser.close();
}
