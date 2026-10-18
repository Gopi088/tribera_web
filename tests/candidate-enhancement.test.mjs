import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { chromium } from 'playwright';

const markup = await readFile('src/components/candidates/candidate-v7.html', 'utf8');
const bundle = await build({
  entryPoints: ['src/components/candidates/candidate-v7.ts'],
  bundle: true,
  write: false,
  format: 'iife',
});
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  await page.setContent(`<div class="candidate-v7">${markup}</div>`);
  const buttons = page.locator('.pre2');
  assert.equal(await buttons.count(), 4);
  for (const button of await buttons.all())
    assert.equal(await button.isDisabled(), true, 'Static controls are inert until enhanced');
  assert.equal(await page.locator('#sScore').innerText(), '91.1');
  await page.addScriptTag({ content: bundle.outputFiles[0].text });
  for (const button of await buttons.all()) assert.equal(await button.isEnabled(), true);
  await buttons.nth(2).click();
  assert.equal(
    await page.locator('#sScore').innerText(),
    ((96 * 15 + 91 * 30 + 95 * 15 + 89 * 10 + 74 * 30) / 100).toFixed(1)
  );
  await page.close();
  console.log('Candidate presets disabled in static markup, enabled after setup, and update score');
} finally {
  await browser.close();
}
