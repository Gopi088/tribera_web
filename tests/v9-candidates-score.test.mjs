import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile } from 'node:fs/promises';
import { candidateScore } from '../src/assets/scripts/v9/candidate-score.mjs';
const demo = JSON.parse(await readFile(new URL('../src/data/v9/candidate-demo.json', import.meta.url)));
test('Meera weights preserve fixed interview evidence and verdicts', () => {
  const before = JSON.stringify(demo.dimensions);
  for (const preset of demo.presets) {
    const result = candidateScore(demo.dimensions, preset.weights);
    const expected = Math.round(
      (demo.dimensions.reduce((sum, d, i) => sum + d.s * preset.weights[i], 0) /
        preset.weights.reduce((a, b) => a + b, 0)) *
        10
    );
    assert.equal(result.score, expected);
    assert.equal(
      result.shares.reduce((a, b) => a + b, 0),
      100
    );
    assert.equal(result.band, preset.id === 'own' ? 'Grey' : 'Select');
  }
  assert.equal(candidateScore(demo.dimensions, demo.presets[0].weights).score, 43);
  assert.equal(JSON.stringify(demo.dimensions), before);
});
test('Scorer handles all-zero weights and exact verdict thresholds', () => {
  assert.deepEqual(candidateScore([{ s: 5 }], [0]), { score: 0, exact: 0, shares: [0], total: 0, band: 'Reject' });
  for (const [score, band] of [
    [25, 'Reject'],
    [26, 'Grey'],
    [33, 'Grey'],
    [34, 'Select'],
    [50, 'Select'],
  ])
    assert.equal(candidateScore([{ s: score / 10 }], [50]).band, band);
  assert.equal(candidateScore([{ s: 5 }], [Infinity]).score, 50);
  assert.equal(candidateScore([{ s: 5 }], [-2]).score, 0);
});
