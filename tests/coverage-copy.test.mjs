import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
for (const file of ['src/data/function-pages.ts', 'src/data/industry-pages.ts']) {
  const source = await readFile(file, 'utf8');
  assert.doesNotMatch(
    source,
    /attзolution|dashthat|\{the\}|instinctz|incapacstrength|e6vel|weered|rehearsed answer without evidence|business line explain that|stood the funding question/
  );
  for (const line of source.split('\n').filter((line) => line.trim().startsWith('{"slug":'))) {
    const data = JSON.parse(line.trim().replace(/,$/, ''));
    assert.equal(
      data.bars.reduce((sum, bar) => sum + parseFloat(bar.v), 0),
      100,
      data.slug
    );
    assert.ok(
      data.faqs.every((faq) => faq.q && faq.a),
      data.slug
    );
  }
  console.log(`${file}: example totals and reviewed copy checks passed`);
}
