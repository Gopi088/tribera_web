import assert from 'node:assert/strict';
import { test } from 'node:test';
import { scoreBrief, presets, clearCount } from '../src/scripts/v9/home/model.mjs';

test('home brief presets retain independently calculated handoff verdicts', () => {
  for (const [name, score, label] of [
    ['brief', 39, 'Select'],
    ['detect', 40, 'Select'],
    ['llm', 33, 'Grey'],
    ['own', 41, 'Select'],
  ]) {
    assert.equal(scoreBrief(presets[name]).score, score);
    assert.equal(scoreBrief(presets[name]).label, label);
  }
});
test('home scoring handles empty brief, normalization and exact rounded verdict boundaries', () => {
  assert.deepEqual(scoreBrief(Array(9).fill(0)), { score: 0, total: 0, label: 'Reject', band: 'b-rej' });
  // Skill A scores 5/5; skill C scores 2/5. These mixes straddle both verdict boundaries.
  for (const [high, low, score, label] of [
    [2, 9, 25, 'Reject'],
    [1, 4, 26, 'Grey'],
    [4, 5, 33, 'Grey'],
    [7, 8, 34, 'Select'],
  ]) {
    const weights = [high, 0, low, 0, 0, 0, 0, 0, 0];
    assert.equal(scoreBrief(weights).score, score);
    assert.equal(scoreBrief(weights).label, label);
  }
  assert.equal(scoreBrief(presets.brief.map((w) => w * 2)).score, 39);
  assert.throws(() => scoreBrief([1]), /Invalid/);
  assert.throws(() => scoreBrief([NaN, ...Array(8).fill(0)]), /Invalid/);
});
test('home hiring bar includes exact matches and narrows the same eight people', () => {
  assert.equal(clearCount(24), 7);
  assert.equal(clearCount(34), 3);
  assert.equal(clearCount(37), 3);
  assert.equal(clearCount(38), 2);
  assert.equal(clearCount(42), 1);
});
