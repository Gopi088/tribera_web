import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { SECTORS, SERVICES } from '../netlify/functions/_lib/v9-a2-forms.mjs';
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
for (const [source, directory, count] of [
  ['contact', 'contact', 4],
  ['sample-write-up', 'sample', 1],
]) {
  test(`${source} publishes only the exact original preview images`, () => {
    const html = fs.readFileSync(`sample_data/tribera-web-handoff-v9/${source}.html`, 'utf8');
    const embedded = [...html.matchAll(/data:image\/jpeg;base64,([A-Za-z0-9+/=]+)/g)].map((match) =>
      digest(Buffer.from(match[1], 'base64'))
    );
    const files = fs.readdirSync(`public/images/v9/${directory}`);
    assert.equal(files.length, count);
    for (const file of files) {
      assert.match(file, /\.jpg$/);
      const bytes = fs.readFileSync(`public/images/v9/${directory}/${file}`);
      assert.ok(embedded.includes(digest(bytes)), file + ': exact original image');
      assert.notEqual(bytes.subarray(0, 4).toString(), '%PDF');
    }
  });
}

test('server context allowlists match the independent handoff models', () => {
  const source = fs.readFileSync('sample_data/tribera-web-handoff-v9/contact.html', 'utf8');
  const match = source.match(/var SECT=(\{.*?\}), SERV=(\{.*?\});/);
  assert.ok(match);
  assert.deepEqual([...SECTORS].sort(), Object.keys(JSON.parse(match[1])).sort());
  assert.deepEqual([...SERVICES].sort(), Object.keys(JSON.parse(match[2])).sort());
});
