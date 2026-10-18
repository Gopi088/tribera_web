import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export function checkMigrationBuild({
  dist = 'dist',
  referencePdf = 'sample_data/tribera-web-handoff-v9/docs/email-assets/tribera-sample-candidate-write-up.pdf',
  expectPreview = false,
} = {}) {
  assert.ok(fs.existsSync(path.join(dist, 'index.html')), 'Build must contain index.html');
  const privatePdf = fs.readFileSync(referencePdf);
  const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
  const privateDigest = digest(privatePdf);
  const encodedPdf = privatePdf.toString('base64');
  const files = fs.readdirSync(dist, { recursive: true }).filter((file) => fs.statSync(path.join(dist, file)).isFile());
  const errors = [];
  const previewFiles = files.filter((file) => file.split(path.sep)[0] === '__v9');
  if (!expectPreview && previewFiles.length) errors.push('Production build includes private v9 preview fixtures');
  for (const file of files) {
    if (/^(?:docs|sample_data)(?:\/|\\)/.test(file)) errors.push(`Internal source path published: ${file}`);
    const bytes = fs.readFileSync(path.join(dist, file));
    if (digest(bytes) === privateDigest || file.includes('tribera-sample-candidate-write-up.pdf')) {
      errors.push(`Full private sample PDF published: ${file}`);
    }
    if (/\.(?:html|js|json)$/i.test(file) && bytes.toString('utf8').includes(encodedPdf)) {
      errors.push(`Full private sample PDF embedded: ${file}`);
    }
    if (/sitemap.*\.xml$/i.test(file) && bytes.toString('utf8').includes('/__v9/')) {
      errors.push(`Preview fixture included in sitemap: ${file}`);
    }
  }
  if (expectPreview) {
    const foundation = path.join(dist, '__v9/foundation/index.html');
    if (!fs.existsSync(foundation)) errors.push('Requested foundation fixture was not built');
    const htmlFixtures = previewFiles.filter((file) => file.endsWith('.html'));
    if (!htmlFixtures.length) errors.push('Preview build has zero HTML fixtures');
    for (const file of htmlFixtures) {
      const html = fs.readFileSync(path.join(dist, file), 'utf8');
      const attributes = (tag) =>
        Object.fromEntries(
          [...tag.matchAll(/\s([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)].map((match) => [
            match[1].toLowerCase(),
            match[2] ?? match[3] ?? match[4],
          ])
        );
      const robots = (html.match(/<meta\b[^>]*>/gi) || [])
        .map(attributes)
        .filter((attrs) => attrs.name?.toLowerCase() === 'robots');
      if (!robots.some((attrs) => /\bnoindex\b/i.test(attrs.content || ''))) {
        errors.push(`Preview fixture is missing noindex: ${file}`);
      }
    }
  }
  assert.deepEqual(errors, [], 'Migration build boundary violations');
  return { filesChecked: files.length, previewFixtures: previewFiles.filter((file) => file.endsWith('.html')).length };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  console.log(
    JSON.stringify(
      checkMigrationBuild({
        dist: process.env.V9_DIST || 'dist',
        expectPreview: process.argv.includes('--preview'),
      })
    )
  );
}
