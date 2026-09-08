import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { chromium } from 'playwright';

const bundle = await build({
  entryPoints: ['src/scripts/reference/index.ts'],
  bundle: true,
  write: false,
  format: 'iife',
  globalName: 'ReferenceWidgets',
});
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.setContent('<main><section id="one"></section><section id="two"></section></main>');
  await page.addScriptTag({ content: bundle.outputFiles[0].text });
  await page.evaluate(() => {
    for (const id of ['one', 'two']) {
      const root = document.getElementById(id);
      window.ReferenceWidgets.initReferenceInteractions(root);
      root.innerHTML = `
        <div class="hero__card">
          <button class="ftab" id="tabA">Front</button><button class="ftab" id="tabB">Back</button>
          <div id="flip"><div id="faceA">Front face</div><div id="faceB">Back face</div></div>
        </div>
        <label class="apply__file"><span>Choose a file</span><input type="file"></label>
        <div id="labRows"></div><div id="labTiles"></div><span id="labScore"></span>
        <span id="labBand"></span><span id="labPin"></span><span id="labTotal"></span><span id="labNote"></span>
        <button class="pre" data-pre="auto">Automation</button>`;
      window.ReferenceWidgets.initReferenceInteractions(root);
      window.ReferenceWidgets.initReferenceInteractions(root);
    }
  });
  await page.locator('#one #flip').click();
  assert.equal(await page.locator('#one #flip').getAttribute('class'), 'is-b');
  assert.equal(await page.locator('#two #flip').getAttribute('class'), null);
  await page.locator('#one #tabA').click();
  assert.equal(await page.locator('#one #flip').getAttribute('class'), '');
  assert.equal(await page.locator('#one #tabA').getAttribute('aria-selected'), 'true');
  await page.locator('#one input[type=file]').setInputFiles({
    name: 'candidate.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.from('fixture only'),
  });
  assert.equal(await page.locator('#one .apply__file span').innerText(), 'candidate.pdf');
  assert.equal(await page.locator('#two .apply__file span').innerText(), 'Choose a file');
  assert.equal(await page.locator('#one #labRows input').count(), 11);
  const untouched = await page
    .locator('#two #labRows input')
    .evaluateAll((inputs) => inputs.map((input) => input.value));
  await page.locator('#one .pre').click();
  assert.equal(await page.locator('#one #labRows input[data-i="9"]').inputValue(), '12');
  assert.deepEqual(
    await page.locator('#two #labRows input').evaluateAll((inputs) => inputs.map((input) => input.value)),
    untouched
  );
  assert.deepEqual(errors, []);
  console.log(
    'Shared widgets: late mounting, repeated initialization, scoped flips, uploads and independent rubric state passed'
  );
} finally {
  await browser.close();
}
