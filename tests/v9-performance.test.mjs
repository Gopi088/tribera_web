import test from 'node:test';
import assert from 'node:assert/strict';
import { checkPageBudget } from '../scripts/v9-performance.mjs';
const transfers = [
  { path: '/__v9/home', contentType: 'text/html', bytes: 1000, gzipBytes: 100 },
  { path: '/a.css', contentType: 'text/css', bytes: 500, gzipBytes: 50 },
  { path: '/a.js', contentType: 'application/javascript', bytes: 500, gzipBytes: 50 },
  { path: '/font.woff2', contentType: 'font/woff2', bytes: 200, gzipBytes: 210 },
  { path: '/logo.png', contentType: 'image/png', bytes: 200, gzipBytes: 210 },
];
const budgets = {
  pages: {
    home: { htmlGzipBytes: 150, cssGzipBytes: 75, jsGzipBytes: 75, fontBytes: 250, imageBytes: 250, otherBytes: 20 },
  },
};
test('page budget uses gzip for text and raw transfer for compressed fonts/images', () => {
  assert.equal(checkPageBudget('home', transfers, budgets).fontBytes, 200);
  assert.equal(checkPageBudget('home', transfers, budgets).htmlGzipBytes, 100);
});
test('oversized bundles and unclassified resources fail the gate', () => {
  assert.throws(
    () => checkPageBudget('home', [...transfers, { path: '/extra.js', bytes: 500, gzipBytes: 50 }], budgets),
    /exceeds/
  );
  assert.throws(
    () => checkPageBudget('home', [...transfers, { path: '/data', bytes: 21, gzipBytes: 10 }], budgets),
    /otherBytes.*exceeds/
  );
});
test('missing and invalid measurements or budgets never pass', () => {
  assert.throws(() => checkPageBudget('home', [], budgets), /missing/);
  assert.throws(() => checkPageBudget('home', transfers.slice(1), budgets), /missing html/);
  assert.throws(() => checkPageBudget('about', transfers, budgets), /missing explicit/);
  assert.throws(() => checkPageBudget('home', [{ ...transfers[0], bytes: NaN }], budgets), /invalid bytes/);
});
