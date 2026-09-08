import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('shared typography follows the approved hiring scale and retains semantic attributes', async () => {
  const heading = await read('../src/components/v58/EditorialHeading.astro');
  assert.match(heading, /clamp\(2\.08rem, 4\.48vw, 3\.32rem\)/);
  assert.match(heading, /letter-spacing: -\.01em/);
  assert.match(heading, /\.\.\.attributes/);
  const button = await read('../src/components/v58/Button.astro');
  assert.match(button, /\.784rem\/1\.5/);
  assert.match(button, /prefers-reduced-motion/);
  assert.match(button, /min-height:44px/);
  assert.match(button, /\.\.\.attributes/);
  const card = await read('../src/components/v58/EvidenceCard.astro');
  assert.match(card, /padding: 1\.25rem 1\.3rem 1\.3rem/);
  assert.match(card, /border-radius: 14px/);
});

test('V58 foundation uses self-hosted Fraunces rather than Google Fonts', async () => {
  const layout = await read('../src/layouts/Layout.astro');
  assert.match(layout, /\/fonts\/fraunces-400\.ttf/);
  assert.doesNotMatch(layout, /fonts\.googleapis\.com[^'"\n]*Fraunces/);
  await Promise.all([
    stat(new URL('../public/fonts/fraunces-400.ttf', import.meta.url)),
    stat(new URL('../public/fonts/fraunces-500.ttf', import.meta.url)),
    stat(new URL('../public/fonts/fraunces-600.ttf', import.meta.url)),
  ]);
});

test('V58 shared primitives expose the documented semantic roles', async () => {
  const css = await read('../src/assets/styles/tailwind.css');
  for (const token of ['--v58-white', '--v58-paper', '--v58-charcoal', '--v58-ink', '--v58-red', '--v58-display']) {
    assert.match(css, new RegExp(token));
  }
});

test('the V58 shell keeps production navigation and conversion hooks', async () => {
  const header = await read('../src/components/widgets/Header.astro');
  const css = await read('../src/assets/styles/tailwind.css');
  assert.match(header, /data-form-intent/);
  assert.match(header, /aria-controls="navp"/);
  assert.match(header, /aria-controls="navp-cov"/);
  assert.match(css, /V58 shell/);
  assert.match(css, /background: rgba\(255, 255, 255, \.86\);\s*background: color-mix/);
});

test('the homepage hero uses the V58 promise and a tracked production CTA', async () => {
  const home = await read('../src/components/home/v58/Home.astro');
  assert.match(home, /Three candidates\./);
  assert.match(home, /Every one <span class="v58-hd-word">worth the interview\.<svg class="v58-hd-underline" viewBox=/);
  assert.match(home, /v58-hero-c__field/);
  assert.match(home, /v58-client-move/);
  assert.match(home, /class="v58-hero-c" id="top"/);
  assert.match(home, /class="v58-hero-c__cue" href="#proof"/);
  assert.match(home, /class="v58-logo-strip__track"/);
  assert.match(home, /data-form-intent="role" data-form-source="v58-final"/);
});

test('the home route renders only the current composition', async () => {
  const route = await read('../src/pages/index.astro');
  const home = await read('../src/components/home/v58/Home.astro');
  assert.match(route, /import V58Home from/);
  assert.match(route, /<V58Home \/>/);
  assert.doesNotMatch(route, /ExpertBench|RatioHinge|class="tribera-home"/);
  assert.doesNotMatch(home, /:global\(\.v58-home ~ \*\)/);
});

test('presets expose selected state and the funnel has explicit buttons', async () => {
  const home = await read('../src/components/home/v58/Home.astro');
  assert.ok(home.includes('data-preset="brief" aria-pressed="true"'));
  assert.ok(home.includes("item.setAttribute('aria-pressed', String(item === button))"));
  assert.ok(home.includes("button.setAttribute('aria-pressed', String(index + 1 === stage))"));
  assert.match(home, /data-label=\{title\}/);
  assert.doesNotMatch(home, /data-funnel-caption|Outcomes at each stage/);
});

test('explanation precedes the demo and repetitive savings is retired', async () => {
  const home = await read('../src/components/home/v58/Home.astro');
  assert.ok(home.indexOf('id="what"') < home.indexOf('id="proof"'));
  assert.doesNotMatch(home, /id="savings"/);
  assert.match(home, /id="experts"/);
  assert.match(home, /coverageGroups\.map/);
  assert.match(home, /id="work"/);
  assert.match(home, /The hire is your call/);
});

test('trust distinguishes shortlist review from the hiring decision', async () => {
  const home = await read('../src/components/home/v58/Home.astro');
  assert.match(home, /Our team reviews the evidence before shortlisting/);
  assert.match(home, /makes the hiring decision/);
  assert.doesNotMatch(home, /DPDP-aligned|audited for adverse impact|transcript 04:12/);
});

test('the shared conversion modal adopts V58 presentation without losing its form intent', async () => {
  const modal = await read('../src/components/ContactSalesModal.astro');
  assert.match(modal, /formIntentConfigs\.demo/);
  assert.match(modal, /var\(--v58-white\)/);
  assert.match(modal, /font-family: var\(--v58-display\)/);
  assert.match(modal, /background: var\(--v58-red\)/);
  assert.match(modal, /border-color: var\(--v58-red\)/);
});

test('the shared page layout applies the V58 route bridge to every public template', async () => {
  const layout = await read('../src/layouts/PageLayout.astro');
  const css = await read('../src/assets/styles/tailwind.css');
  assert.match(layout, /class="v58-route w-full overflow-x-clip"/);
  assert.match(css, /V58 route bridge/);
  assert.match(css, /font-family: var\(--v58-display\)/);
  assert.match(css, /:focus-visible \{ outline: 2px solid var\(--v58-red\)/);
  assert.match(css, /\.v58-route :is\(input, textarea, select\):focus/);
});
