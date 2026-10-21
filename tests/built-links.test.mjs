import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import readingTime from 'reading-time';

const root = path.resolve('dist');
assert.ok(fs.existsSync(path.join(root, 'index.html')), 'Run npm run build first');
const files = fs.readdirSync(root, { recursive: true }).filter((file) => file.endsWith('.html'));
const missing = [];
let checked = 0;
const cutClients = [
  'ICICI Bank',
  'ICICI Securities',
  'PayU',
  'DSP Mutual Fund',
  'Utkarsh Bank',
  'Aeries',
  'SplashBI',
  'Aegon Life',
  'Enpro',
];
for (const file of files) {
  const html = fs
    .readFileSync(path.join(root, file), 'utf8')
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
  const origin = new URL(file.replace(/index\.html$/, ''), 'https://local.test/');
  for (const name of cutClients) assert.ok(!html.includes(name), `${file}: unapproved customer ${name} absent`);
  for (const match of html.matchAll(/<a\b[^>]*\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi)) {
    const href = match[1] ?? match[2] ?? match[3];
    if (!href || href.startsWith('#')) continue;
    const url = new URL(href.replaceAll('&amp;', '&'), origin);
    if (url.origin !== origin.origin) continue;
    const route = decodeURIComponent(url.pathname).replace(/^\//, '');
    if (route.startsWith('.netlify/functions/')) {
      const name = route.slice('.netlify/functions/'.length);
      assert.ok(
        /^[\w-]+$/.test(name) &&
          ['mjs', 'js', 'ts'].some((extension) => fs.existsSync(`netlify/functions/${name}.${extension}`)),
        `${file}: ${href} must resolve to a checked-in Netlify handler`
      );
      checked++;
      continue;
    }
    const candidates = [route, path.join(route, 'index.html'), route + '.html'];
    checked++;
    if (
      !candidates.some((candidate) => {
        const target = path.join(root, candidate);
        return fs.existsSync(target) && fs.statSync(target).isFile();
      })
    )
      missing.push({ file, href });
  }
}
assert.deepEqual(missing, [], 'Internal page links must resolve to built routes or files');
console.log(
  `${files.length} built HTML pages; ${checked} internal links resolve. External URLs and fragments excluded.`
);

const index = fs.readFileSync(path.join(root, 'blog/index.html'), 'utf8');
const feature = index.match(/<a\b(?=[^>]*\bclass="feat")(?=[^>]*\bhref="([^"]+)")[^>]*>[\s\S]*?<\/a>/);
assert.ok(feature, 'Blog has a featured article');
const featuredRoute = feature[1].replace(/^\//, '').replace(/\/$/, '');
const article = fs.readFileSync(path.join(root, featuredRoute, 'index.html'), 'utf8');
const readTime = feature[0].match(/(\d+ min) read/)?.[1];
assert.ok(readTime, 'Featured card has computed reading time');
assert.ok(article.includes(readTime + ' read'), 'Featured card matches its actual article');
assert.ok(!index.includes('2,00,000'), 'Published index number format is consistent');
assert.ok(fs.existsSync(path.join(root, 'robots.txt')));
assert.ok(fs.existsSync(path.join(root, 'sitemap-index.xml')));
console.log('Featured read time, number format, robots.txt and generated sitemap passed');

for (const file of fs
  .readdirSync('src/pages/blog')
  .filter((file) => file !== 'index.astro' && file.endsWith('.astro'))) {
  const source = fs.readFileSync(
    file === 'seventeen-interviews-one-hire.astro'
      ? 'src/components/v9/editorial/article/ArticleBody.astro'
      : path.join('src/pages/blog', file),
    'utf8'
  );
  const body = source.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1];
  assert.ok(body, file + ' has a served article body');
  const text = body
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:#\d+|#x[\da-f]+|\w+);/gi, ' ');
  const expected = Math.max(1, Math.ceil(readingTime(text).minutes)) + ' min read';
  const published = fs.readFileSync(path.join(root, 'blog', file.replace('.astro', ''), 'index.html'), 'utf8');
  assert.ok(published.includes(expected), file + ' reading time derived from served body');
}
console.log('All eight article reading times match the served source bodies');
