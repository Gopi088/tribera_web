import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4331';
const browser = await chromium.launch();
const clean = (text) => text.replace(/\s+/g, ' ').trim();
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  await page.route('**/*', (route) =>
    route.request().method() !== 'GET' || route.request().url().startsWith('https:') ? route.abort() : route.continue()
  );
  await page.goto(base, { waitUntil: 'networkidle' });
  assert.match(await page.title(), /three candidates, every one worth the interview/i);
  console.log('R48: homepage title already correct');
  assert.equal(
    clean(await page.locator('.v58-hero-c .v58-lead').innerText()),
    'You interview three, not thirty. Every role has a bar — what “good” looks like — and whether we find them or interview yours, we send only the three who clear it.'
  );
  console.log('R2: exact latest hero definition');
  assert.equal(
    clean(await page.locator('.v58-thesis__claim').textContent()),
    'Three worth meeting — the proof behind each one.'
  );
  console.log('R7: owner-approved v61 supporting statement');
  assert.equal(
    clean(await page.locator('.v58-proof-intro__action').textContent()),
    'Set your priorities and the verdict follows — same person, a different bar.'
  );
  assert.doesNotMatch(await page.locator('#proof').textContent(), /prioritiesand/);
  console.log('R8/R50: explanation and spacing');
  assert.equal(
    clean(await page.locator('[data-note]').innerText()),
    "On this brief, his production detection work carries the weight; the AI-security answers are where we'd probe next."
  );
  assert.equal(
    clean(await page.locator('.v58-lab-foot').innerText()),
    'Tell us what matters most — and we re-weight to it.'
  );
  console.log('R9/R10: note and footer');
  assert.equal(
    clean(await page.locator('#experts h2').textContent()),
    "Senior experts who've done the job — held to one bar: the one you set."
  );
  assert.match(await page.locator('#experts').innerText(), /Four specialisms/);
  assert.equal((await page.locator('body').innerText()).split('We confirm interviewer coverage').length - 1, 1);
  assert.doesNotMatch(await page.locator('.v58-funnel-close').innerText(), /Five qualified candidates/);
  assert.equal(await page.locator('.v58-coverage__focus').count(), 4);
  const roles = await page.locator('.v58-role-coverage__list li').allTextContents();
  assert.equal(roles.length, 17);
  assert.equal(new Set(roles).size, 17);
  assert.equal(
    await page.locator('#experts #cover ul').count(),
    4,
    'Roles are grouped beside their expert specialisms'
  );
  console.log('R11/R12: contextual heading and all 17 roles retained');
  assert.match(await page.locator('.v58-funnel-step').first().innerText(), /Every CV read. Forty got a first call./);
  assert.match(await page.locator('.v58-funnel-field__head').innerText(), /126 possible candidates for this role/i);
  assert.doesNotMatch(await page.locator('#funnel').innerText(), /their team|Their team/);
  console.log('R14/R15/R16/R51: funnel labels and explicit hiring-team references');
  assert.deepEqual(await page.locator('.v58-home > section').evaluateAll((els) => els.map((el) => el.id)), [
    'what',
    'proof',
    'work',
    'experts',
    'funnel',
    'ways',
    'trust',
    'results',
    'start',
  ]);
  console.log('Owner-approved flow: lab before workflow, merged roles/benefits, assurances before testimonials');

  await page.goto(base + '/functions', { waitUntil: 'networkidle' });
  const crossLink = page.locator('a.btn[href="/industries"]');
  await crossLink.scrollIntoViewIfNeeded();
  assert.equal(clean(await crossLink.innerText()), 'Browse by industry');
  assert.equal(await crossLink.getAttribute('href'), '/industries');
  const functionHeading = clean(await page.locator('h1').textContent());
  assert.doesNotMatch(await page.locator('body').textContent(), /A hundred signals|all hireable/);
  await page.goto(base + '/industries', { waitUntil: 'domcontentloaded' });
  const industryHeading = clean(await page.locator('h1').textContent());
  assert.notEqual(functionHeading, industryHeading, 'Function and industry index headings are distinct');
  console.log('R39: exact corrected cross-link');
  await page.goto(base + '/blog/designing-ai-for-high-stakes-technical-assessment', { waitUntil: 'networkidle' });
  assert.match(clean(await page.locator('article.art').innerText()), /Six to eleven dimensions, weighted at intake/);
  await page.goto(base + '/services', { waitUntil: 'networkidle' });
  assert.match(clean(await page.locator('body').innerText()), /six to eleven criteria agreed for the role/);
  console.log('R44: explicit workbook range aligned with Services; models unchanged');

  const manifest = JSON.parse(await readFile('docs/excel-bug-status.json', 'utf8'));
  assert.equal(manifest.records.length, 50);
  assert.equal(manifest.last_row, 51);
  assert.equal(manifest.workbook, 'sample_data/Tribera-Website-Bugs-Reviewed (2).xlsx');
  for (const row of [20, 23, 28, 29, 33, 34, 37]) {
    assert.match(manifest.records.find((record) => record.row === row).status, /^Pending/);
  }
  console.log('50-row tracker covers latest workbook and retains unresolved owner/legal/deployment gates');
} finally {
  await browser.close();
}
