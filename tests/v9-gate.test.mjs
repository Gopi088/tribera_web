import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { audit, csv } from '../scripts/v9-audit.mjs';

function fixture(t, html) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'v9-check-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  const map = path.join(dir, 'routes.csv');
  fs.writeFileSync(
    map,
    'route,baseline_present,target_route,planned_action,status\n/,yes,/,replace,not started\n/future,no,/future,add,not started\n'
  );
  return { dir, map };
}
test('valid fragments and future routes do not require premature publication', (t) => {
  const { dir, map } = fixture(t, '<h1 id="hello">Hi</h1><a href="https://www.tribera.ai/#hello">hello</a>');
  assert.deepEqual(audit(dir, map).errors, []);
});
test('broken absolute links, fragments and assets fail independently', (t) => {
  const { dir, map } = fixture(
    t,
    '<a href="https://tribera.ai/missing">bad</a><a href="#gone">bad</a><img src="/lost.png">'
  );
  const result = audit(dir, map);
  assert.equal(result.errors.length, 3);
  assert.match(result.errors.join('\n'), /Missing fragment/);
});
test('empty coverage and missing baseline routes fail', (t) => {
  const { dir, map } = fixture(t, '<h1>Empty</h1>');
  fs.appendFileSync(map, '/missing,yes,/missing,retain,not started\n');
  assert.equal(audit(dir, map).errors.length, 2);
});
test('untracked generated routes fail', (t) => {
  const { dir, map } = fixture(t, '<a href="/">Home</a>');
  fs.writeFileSync(path.join(dir, 'generated.html'), '<h1>Generated</h1>');
  assert.match(audit(dir, map).errors.join(), /Untracked built route/);
});
test('quoted CSV cells are parsed', () => assert.equal(csv('route,note\n/,"one, two"\n')[0].note, 'one, two'));
test('only the implemented request-time native form is a server-side link exception', (t) => {
  const { dir, map } = fixture(
    t,
    '<a href="/.netlify/functions/candidate-form-v9">Native form</a><a href="/.netlify/functions/contact-form-v9?side=looking">Native Contact</a><a href="/.netlify/functions/sample-form-v9">Native sample</a><a href="/.netlify/functions/missing">Missing</a><a href="/.netlify/functions/candidate-form-v9#missing">Bad fragment</a>'
  );
  const result = audit(dir, map);
  assert.equal(result.errors.length, 2);
  assert.ok(result.errors.every((error) => /Missing target/.test(error)));
});
