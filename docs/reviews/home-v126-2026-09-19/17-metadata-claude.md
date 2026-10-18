## Review — v126 home page, OG pipeline, metadata plumbing

### What I verified end‑to‑end

**OG image path is correct and consistent.**
`new URL('/og-image.png', Astro.site).toString()` produces an absolute same‑origin URL. In `adaptOpenGraphImages` that string hits the `startsWith('http')` branch, `imageUrl.origin === astroSite.origin` matches, and the image is returned **unmodified with the declared `width: 2400 / height: 1260`** — no Sharp/unpic round‑trip, no rewritten hash path. The emitted `og:image`, `og:image:width`, `og:image:height` and `twitter:image` therefore all agree with the artifact the capture script actually writes (`page.screenshot` on a 2400×1260 viewport, `deviceScaleFactor` 1, non‑fullPage → exactly 2400×1260). Ratio 1.905:1 is within both FB and X large‑card tolerances. ✅

**Metadata merge order is sound.** `lodash.merge` ignores `undefined`, so `ignoreTitleTemplate: true → titleTemplate '%s'` survives and `resolvedTitle` is the raw page title. `twitter.cardType: 'summary_large_image'` is set explicitly and also matches the computed default (`openGraph.images.length` is truthy), so the card type is stable regardless of what `METADATA.twitter` contains. The `twitter:image` emit is guarded by `?.url &&`, so an empty‑string resolution can't leak a blank tag. ✅

**Noindex policy.** Canonical always points at production, and `shouldNoIndex` fails closed on unknown `CONTEXT` — dev/preview/branch deploys can't self‑present as the live page. Correct direction. ✅

**Capture script runtime.** `newPage({ viewport, reducedMotion })` is a valid Playwright context‑option shape; `goto(base)` before `setContent` preserves the dev‑server base URL so the sample's relative assets still resolve; the injected local `site-fonts.css` replaces the stripped remote font links so screenshots use the same typefaces the site ships. `box-sizing:border-box` + `margin:0` + explicit 2400×1260 body means the 144/112 padding is inside the frame. ✅

**Focus ring contrast.** `#DA0007` measures ≈4.5:1 against the `#F1EEE7` field and ≈3.6:1 against `#131313`, clearing the 3:1 non‑text requirement (WCAG 1.4.11 / 2.4.11) on both the light and dark surfaces used in the design. `outline-offset: 3px` keeps it off the glyphs. ✅ The decorative underline SVG is correctly `aria-hidden="true"`.

### Non-blocking items to tighten

1. **Confirm the page's final location.** Everything else is repo‑relative; this one is `/tmp/tribera-index-v126.astro`. Astro only routes from `src/pages/`, so if that path is literal the route doesn't exist and `capture-home-v126.mjs`'s `page.goto(base)` is rendering some other page. Assuming it's just the review export, no action.

2. **Give the design tokens fallbacks.** The global block uses `var(--v58-ui)` and `var(--v58-red)` with no fallback while the components live under `v126/`. If those custom properties are ever absent, `font-family: var(--v58-ui)` silently drops to the UA default, and — worse — `outline: 2px solid var(--v58-red)` becomes invalid‑at‑computed‑value‑time, which resets `outline` to `none` and **removes the focus indicator entirely** rather than falling back to the UA ring. The capture script already hardcodes the literal values, so mirror them:

   ```css
   font-family: var(--v58-ui, 'Inter Tight', sans-serif);
   outline: 2px solid var(--v58-red, #da0007);
   ```

3. **`public/og-image.png` must be committed.** Nothing in the build regenerates it; `capture-home-v126.mjs` is a manual step, and the metadata hard‑references the path. If the file is absent the tag points at a 404.

4. **Cosmetic:** `page.evaluate(() => document.fonts.ready)` resolves to a non‑serializable `FontFaceSet`. Playwright returns `undefined` rather than throwing, so the await still gates on font loading correctly, but `.then(() => true)` makes the intent explicit. Optionally add `overflow:hidden` to the OG `body` so an unexpectedly tall field SVG can't introduce a scrollbar into the frame.

## Verdict: **PASS**

No current runtime, accessibility, fidelity, or integration defects found in the supplied source. Item 2 is the only one I'd land before merge; items 1, 3, 4 are confirmations/cosmetics.
