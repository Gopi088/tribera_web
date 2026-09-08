# Refresh and Navigation Stability

## Logo Follow-Up

The user still observed logo shrinking on About navigation after the font changes. It did not reproduce in the follow-up local Chromium trace. Rather than rely on font timing for brand artwork, the shared Header now uses inline SVG paths generated from the same bundled Figtree 800 font, original 20px size, tracking and baseline. The 76 by 20 navbar slot and accessible home-link label are preserved. Before/after logo crops were visually checked.

`tests/logo-navigation.test.mjs` compares vector-path dimensions from the first sampled frame across real Home/About link navigation and refresh, with fonts both available and deliberately blocked, at three viewport widths. The existing navbar regression now verifies outlined artwork instead of requiring a text font.

## Cause and Fix

- The previous font-readiness guard explicitly hid the homepage and navbar on each document load. About additionally animated hero content from opacity zero for roughly one second.
- Font faces were declared in Layout, Tailwind and the editorial wrapper with different loading strategies and overlapping Fraunces definitions.
- Font definitions now live in `/fonts/site-fonts.css`, generated at static build time from local assets. Critical WOFF2 bytes are embedded in this shared stylesheet; supporting Figtree weights and the below-fold Caveat signature remain demand-loaded local files.
- The head script starts font decoding after the stylesheet registers the faces, before body layout. It does not wait, hide content or toggle visibility classes. Removing this decode warmup reproduced a one-frame fallback measurement in the browser tests.
- Editorial hero reveal attributes no longer hide or translate above-the-fold content. Below-fold reveal effects are retained.

## Review

Claude Sonnet reviewed the Layout, font endpoint and About regression test. Its main actionable concern was the size of the render-blocking font payload. Supporting fonts were subsequently removed from the embedded payload. A cold load still waits for this stylesheet, like other critical CSS; slow-network first-paint performance remains a tradeoff, not a claim of zero loading time.

The build expects the repository working directory, consistent with the existing npm build command. Existing duplicated legacy navigation geometry was not redesigned in this fix.

Two review observations did not match the implementation or test evidence: `document.fonts.load()` explicitly starts decoding registered but unused faces; Playwright `browser.newPage()` creates an isolated context, so each width has a separate cold cache.

## Verification

- `nav-refresh.test.mjs`: homepage, candidates and About, four widths, delayed fonts, reloads, actual logo font identity, glyph and element geometry, JavaScript disabled and failed font requests.
- `home-refresh.test.mjs`: three widths, cold/cached/delayed styles; records visibility and text geometry from the first sampled frame rather than ignoring hidden frames.
- `editorial-refresh.test.mjs`: About cold load, reload and actual navbar-link navigation at three widths; rejects hidden ancestors and moving/resizing headings.
- These three tests passed against the local Netlify proxy and a built static preview. All three passed again against the final production build after the supporting-font payload reduction.
- Audience switching passed at nine widths; site hover regression tests passed.
- Production build succeeded with 76 pages. No deployment or commit was performed.
