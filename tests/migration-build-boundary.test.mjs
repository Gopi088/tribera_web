import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { checkMigrationBuild } from '../scripts/check-migration-build.mjs';

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'v9-boundary-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const dist = path.join(root, 'dist');
  fs.mkdirSync(dist);
  fs.writeFileSync(path.join(dist, 'index.html'), '<h1>Public site</h1>');
  const referencePdf = path.join(root, 'private.pdf');
  fs.writeFileSync(referencePdf, '%PDF-1.4 private sample fixture %%EOF');
  const write = (name, value) => {
    const dest = path.join(dist, name);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, value);
  };
  return { dist, referencePdf, write };
}

test('accepts normal build and rejects absent build', (t) => {
  const f = fixture(t);
  assert.equal(checkMigrationBuild(f).filesChecked, 1);
  fs.unlinkSync(path.join(f.dist, 'index.html'));
  assert.throws(() => checkMigrationBuild(f), /index.html/);
});

test('requires explicit preview mode, existing fixture and noindex', (t) => {
  const f = fixture(t);
  assert.throws(() => checkMigrationBuild({ ...f, expectPreview: true }), /boundary violations/);
  f.write('__v9/foundation/index.html', '<meta name="robots" content="index,follow">');
  assert.throws(() => checkMigrationBuild(f), /boundary violations/);
  assert.throws(() => checkMigrationBuild({ ...f, expectPreview: true }), /boundary violations/);
  f.write('__v9/foundation/index.html', '<meta data-name="robots" data-content="noindex">');
  assert.throws(() => checkMigrationBuild({ ...f, expectPreview: true }), /boundary violations/);
  f.write('__v9/foundation/index.html', '<meta name = robots content = noindex>');
  assert.equal(checkMigrationBuild({ ...f, expectPreview: true }).previewFixtures, 1);
  f.write('__v9/foundation/index.html', '<meta name="robots" content="noindex,nofollow">');
  assert.equal(checkMigrationBuild({ ...f, expectPreview: true }).previewFixtures, 1);
  f.write('sitemap-0.xml', '<loc>https://www.tribera.ai/__v9/foundation</loc>');
  assert.throws(() => checkMigrationBuild({ ...f, expectPreview: true }), /boundary violations/);
});

test('rejects private PDF even if renamed or embedded', (t) => {
  const f = fixture(t);
  const bytes = fs.readFileSync(f.referencePdf);
  f.write('download.bin', bytes);
  assert.throws(() => checkMigrationBuild(f), /boundary violations/);
  fs.unlinkSync(path.join(f.dist, 'download.bin'));
  f.write('sample.html', `<object data="data:application/pdf;base64,${bytes.toString('base64')}"></object>`);
  assert.throws(() => checkMigrationBuild(f), /boundary violations/);
});

test('rejects copied internal documentation', (t) => {
  const f = fixture(t);
  f.write('docs/internal.md', 'Internal only');
  assert.throws(() => checkMigrationBuild(f), /boundary violations/);
});
