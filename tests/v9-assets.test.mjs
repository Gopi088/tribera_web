import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
const root = new URL('../', import.meta.url);
const read = (file) => fs.readFileSync(new URL(file, root));
const sha = (buffer) => createHash('sha256').update(buffer).digest('hex');
const fonts = JSON.parse(read('public/fonts/v9/manifest.json'));
const css = read('src/assets/styles/v9/fonts.css').toString();

test('official handoff font faces retain all required weights, subsets and optical axes', () => {
  const handoff = read('sample_data/tribera-web-handoff-v9/index.html').toString();
  assert.ok(handoff.includes(fonts.request));
  assert.equal(fonts.files.length, 19);
  assert.equal(fonts.faces.length, 48);
  assert.equal((css.match(/@font-face/g) || []).length, fonts.faces.length);
  assert.ok(!css.includes('https://'), 'Runtime font CSS must be completely self-hosted');
  const required = {
    Fraunces: { normal: [400, 500, 600], italic: [400, 500] },
    'Inter Tight': { normal: [400, 500, 600] },
    'JetBrains Mono': { normal: [400, 500] },
  };
  for (const [family, styles] of Object.entries(required)) {
    for (const [style, weights] of Object.entries(styles)) {
      for (const weight of weights)
        assert.ok(
          fonts.faces.some(
            (face) =>
              face.family === family && face.style === style && face.weight === weight && face.subset === 'latin'
          ),
          `${family} ${style} ${weight}`
        );
    }
  }
  for (const face of fonts.faces) {
    const file = fonts.files.find((record) => record.file === face.file);
    assert.ok(file);
    assert.ok(css.includes(`/fonts/v9/${face.file}`));
    assert.ok(css.includes(`V9 ${face.family}`));
    assert.ok(file.axes.wght.min <= face.weight && file.axes.wght.max >= face.weight);
    if (face.family === 'Fraunces') assert.deepEqual([file.axes.opsz.min, file.axes.opsz.max], [9, 144]);
  }
});

test('official binaries and pinned OFL licenses match provenance hashes', () => {
  for (const file of fonts.files) {
    const bytes = read(`public/fonts/v9/${file.file}`);
    assert.equal(bytes.subarray(0, 4).toString(), 'wOF2');
    assert.equal(bytes.length, file.bytes);
    assert.equal(sha(bytes), file.sha256);
    assert.equal(new URL(file.source).hostname, 'fonts.gstatic.com');
  }
  assert.equal(fonts.licenses.length, 3);
  for (const license of fonts.licenses) {
    const bytes = read(`public/fonts/v9/${license.file}`);
    assert.equal(sha(bytes), license.sha256);
    assert.ok(bytes.toString().includes('SIL OPEN FONT LICENSE Version 1.1'));
    assert.ok(license.source.includes(fonts.googleFontsRevision));
  }
});

test('all supplied icons are unchanged and manifest references existing correctly sized assets', () => {
  const icons = JSON.parse(read('public/brand/v9/icons-manifest.json'));
  assert.equal(icons.files.length, 6);
  for (const icon of icons.files) {
    const bytes = read(`public/brand/v9/${icon.file}`);
    assert.equal(sha(bytes), icon.sha256);
    assert.deepEqual(bytes, read(icon.source));
  }
  const manifest = JSON.parse(read('public/brand/v9/site.webmanifest'));
  const supplied = JSON.parse(read('sample_data/tribera-web-handoff-v9/site.webmanifest'));
  for (const icon of supplied.icons) icon.src = `/brand/v9${icon.src}`;
  assert.deepEqual(manifest, supplied);
  for (const icon of manifest.icons) {
    const bytes = read(path.join('public', icon.src));
    assert.equal(`${bytes.readUInt32BE(16)}x${bytes.readUInt32BE(20)}`, icon.sizes);
  }
});
