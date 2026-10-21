import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium, firefox, webkit } from 'playwright';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4394';
const engine = process.env.BROWSER || 'chromium';
for (const file of fs
  .readdirSync('dist', { recursive: true })
  .filter((file) => file.endsWith('.html') && !file.startsWith('__v9/'))) {
  const html = fs.readFileSync(`dist/${file}`, 'utf8');
  assert.ok(!/New Jersey|Address to follow/i.test(html), file + ' dropped location');
}
const browser = await { chromium, firefox, webkit }[engine].launch();
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const visit = (route) => page.goto(base + route, { waitUntil: 'domcontentloaded' });
  await visit('/blog');
  assert.equal(await page.locator('.posts .post').count(), 8);
  assert.equal(await page.locator('.feat').getAttribute('href'), '/blog/seventeen-interviews-one-hire');
  const featuredTime = (await page.locator('.feat__min').textContent()).trim();
  const listed = await page
    .locator('.post')
    .evaluateAll((posts) =>
      Object.fromEntries(
        posts.map((post) => [post.getAttribute('href'), post.querySelector('.post__t').textContent.trim()])
      )
    );
  assert.ok(listed['/blog/seventeen-interviews-one-hire']);
  await visit('/blog/seventeen-interviews-one-hire');
  assert.equal((await page.locator('.v9-author-meta > span').textContent()).trim(), featuredTime);
  const related = await page
    .locator('#related a.bt')
    .evaluateAll((links) =>
      links.map((link) => ({ href: link.getAttribute('href'), title: link.querySelector('h3').textContent.trim() }))
    );
  assert.equal(related.length, 3);
  assert.equal(new Set(related.map((link) => link.href)).size, 3);
  for (const story of related) {
    assert.equal(story.title, listed[story.href], story.href + ' published title matches listing');
    assert.notEqual(story.href, '/blog');
    const response = await visit(story.href);
    assert.equal(response.status(), 200);
    assert.equal(await page.locator('h1').count(), 1);
  }
  for (const route of ['/blog/seventeen-interviews-one-hire', '/intelligence']) {
    await visit(route);
    const section = page.locator(route === '/intelligence' ? '#start' : '#subscribe');
    assert.equal(await section.locator('input[type=email]').count(), 0, 'no active-looking unavailable subscription');
    const link = section.locator('a[href="/blog#sub"]');
    assert.equal(await link.count(), 1);
    await link.click();
    await page.waitForURL('**/blog#sub', { waitUntil: 'domcontentloaded' });
    assert.equal(await page.locator('#subscribeForm').count(), 1);
  }
  await page.route('**/.netlify/functions/site-inquiry', (route) => {
    assert.match(route.request().postData(), /newsletter/);
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
  });
  await page.locator('#subscribeForm [name=email]').fill('review@example.com');
  await page.locator('#subscribeForm button').click();
  await page.waitForFunction(() => document.querySelector('#subscribeStatus').textContent.includes('Thanks'));
  await visit('/intelligence');
  assert.match(await page.locator('#inRead').textContent(), /In this example/);
  await page.locator('.in-fn').nth(2).click();
  assert.match(await page.locator('#inRead').textContent(), /In this example/);
  await visit('/about');
  assert.match((await page.locator('.hx-side b').textContent()).replace(/\s+/g, ' '), /belong here\?/);
  await visit('/contact');
  assert.match(await page.locator('#offices h2').textContent(), /Two offices/);
  assert.equal(await page.locator('.ct-off > div').count(), 3, 'two offices and a general contact channel');
  await visit('/careers');
  assert.equal((await page.locator('main').innerText()).match(/filter coffee/g)?.length, 1);
  await visit('/candidates');
  assert.equal(await page.locator('.candidate-demo-label').isVisible(), true);
  assert.equal(await page.locator('footer').getByText('Our numbers', { exact: true }).count(), 0);
  await visit('/privacy');
  const dates = await page.locator('.legal-date').allTextContents();
  assert.match(dates[0], /Content last revised: 27 July 2025/);
  assert.match(dates[1], /Page presentation updated:/);
  assert.deepEqual(errors, []);
  console.log(
    `${engine}: publication discovery/metadata, related destinations, notification journey (mocked), sample context, office removal, About spacing and legal date hierarchy passed.`
  );
} finally {
  await browser.close();
}
