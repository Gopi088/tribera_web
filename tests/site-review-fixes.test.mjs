import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch();
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
try {
  const page = await browser.newPage({ viewport: { width: 1520, height: 1000 }, reducedMotion: 'reduce' });
  await page.route('**/*', (route) => (route.request().method() === 'POST' ? route.abort() : route.continue()));
  await page.goto(base + '/careers/', { waitUntil: 'networkidle' });
  assert.equal(await page.locator('#rgrid .rc').count(), 7);
  assert.equal(await page.locator('#roleSel option').count(), 7);
  for (const option of await page.locator('#roleSel option').all()) {
    await page.locator('#roleSel').selectOption(await option.getAttribute('value'));
    const weights = await page.locator('.bw__v').allTextContents();
    assert.equal(
      weights.reduce((sum, value) => sum + parseFloat(value), 0),
      100
    );
  }
  for (const button of await page.locator('#rfilt button').all()) {
    await button.click();
    const department = await button.getAttribute('data-department');
    assert.ok((await page.locator('#rgrid .rc:visible').count()) > 0);
    for (const card of await page.locator('#rgrid .rc:visible').all()) {
      if (department !== 'All') assert.equal(await card.getAttribute('data-department'), department);
    }
  }
  console.log('Careers: seven roles, all scorecards total 100%, filters work');
  await page.goto(base + '/functions/', { waitUntil: 'networkidle' });
  for (const option of await page.locator('#secB option').all()) {
    await page.locator('#secB').selectOption(await option.getAttribute('value'));
    const sum = await page.evaluate(() =>
      Array.from({ length: 6 }, (_, index) => parseFloat(document.getElementById(`vb${index}`).textContent)).reduce(
        (a, b) => a + b,
        0
      )
    );
    assert.equal(sum, 100);
  }
  console.log('Functions: every comparison totals 100%');
  await page.goto(base + '/functions/data-analytics/', { waitUntil: 'networkidle' });
  const faq = page.locator('details').first();
  await faq.locator('summary').click();
  assert.equal(await faq.getAttribute('open'), '');
  assert.ok((await faq.innerText()).length > 100);
  console.log('Coverage FAQ expands with answer');
  await page.goto(base + '/industries/', { waitUntil: 'networkidle' });
  for (const step of await page.locator('#same .step').all()) {
    assert.equal(await step.evaluate((element) => getComputedStyle(element).opacity), '1');
    assert.equal(
      await step.locator('.step__d').evaluate((element) => getComputedStyle(element).color),
      'rgb(189, 189, 183)'
    );
  }
  await page.goto(base + '/industries/banking-financial-services/', { waitUntil: 'networkidle' });
  assert.equal(await page.locator('#faq h2').innerText(), 'What teams ask first.');
  assert.equal(await page.locator('#faq details').count(), 4);
  console.log('Industries: static steps remain readable and FAQ heading matches variable content');
  await page.goto(base + '/blog/', { waitUntil: 'networkidle' });
  const count = await page.locator('#posts .post').count();
  assert.equal(count, 7);
  for (const button of await page.locator('.fbar .fchip').all()) {
    await button.click();
    assert.equal(
      await page.locator('#posts .post:not(.hide)').count(),
      Number(await button.locator('span').innerText())
    );
    assert.equal(await button.getAttribute('aria-pressed'), 'true');
  }
  console.log('Blog: all seven posts present and filter counts match');
  await page.goto(base + '/candidates/start/', { waitUntil: 'networkidle' });
  assert.equal(await page.locator('#submitBtn').isDisabled(), true);
  await page
    .locator('#cvInput')
    .setInputFiles({ name: 'sample.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4\nSample test') });
  assert.equal(await page.locator('#submitBtn').isDisabled(), false);
  assert.equal(await page.locator('#submitBtn').evaluate((element) => getComputedStyle(element).opacity), '1');
  assert.equal(
    await page.locator('.drop__k b').evaluate((element) => getComputedStyle(element).color),
    'rgb(19, 19, 19)'
  );
  assert.equal(
    await page.locator('.drop__n').evaluate((element) => getComputedStyle(element).color),
    'rgb(37, 107, 69)'
  );
  console.log('Candidate submit correctly disabled before upload, enabled after valid upload');
} finally {
  await browser.close();
}
