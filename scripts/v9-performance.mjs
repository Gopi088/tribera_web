import assert from 'node:assert/strict';

// Gzip is a deterministic size estimate, not a claim about host compression or INP.
export function checkPageBudget(slug, transfers, budgets) {
  const totals = { htmlGzipBytes: 0, cssGzipBytes: 0, jsGzipBytes: 0, fontBytes: 0, imageBytes: 0, otherBytes: 0 };
  assert.ok(Array.isArray(transfers) && transfers.length, `${slug}: missing transfer measurements`);
  for (const resource of transfers) {
    for (const field of ['bytes', 'gzipBytes'])
      assert.ok(Number.isSafeInteger(resource[field]) && resource[field] >= 0, `${slug}: invalid ${field}`);
    const file = resource.path;
    assert.equal(typeof file, 'string');
    if (resource.contentType?.includes('text/html')) totals.htmlGzipBytes += resource.gzipBytes;
    else if (file.endsWith('.css')) totals.cssGzipBytes += resource.gzipBytes;
    else if (file.endsWith('.js')) totals.jsGzipBytes += resource.gzipBytes;
    else if (/\.(woff2?|ttf|otf)$/.test(file)) totals.fontBytes += resource.bytes;
    else if (resource.contentType?.startsWith('image/')) totals.imageBytes += resource.bytes;
    else totals.otherBytes += resource.bytes;
  }
  for (const key of ['htmlGzipBytes', 'cssGzipBytes', 'jsGzipBytes', 'fontBytes', 'imageBytes'])
    assert.ok(totals[key] > 0, `${slug}: missing ${key} coverage`);
  const budget = budgets.pages?.[slug];
  assert.ok(budget, `${slug}: missing explicit page budget`);
  for (const [key, actual] of Object.entries(totals)) {
    assert.ok(Number.isSafeInteger(budget[key]) && budget[key] > 0, `${slug}: invalid budget ${key}`);
    assert.ok(actual <= budget[key], `${slug}: ${key} ${actual} exceeds ${budget[key]}`);
  }
  return totals;
}
