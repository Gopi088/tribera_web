# Review — `src/components/home/v126` (index route)

## Scope note

Only the supplied files could be verified. `hero/thesis/operations/experts/workflow/savings/ways/results/trust/procurement/faq/start.html` and `PageLayout.astro` were not provided, so section-level markup contracts consumed by `interactions.js` (`[data-rv]` on `.flow`, `.bench`, `.barcard`, `.handoff`, `.ramp`, `.save`, `.ways-merge`; `data-to` on `.cu`; `#obCap`) are asserted, not verified.

## What's correct

- **Lab math and data integrity check out.** Weights sum to 100; `got = 78` → `score = 39.00`; server-rendered `#labScore`, `#labPin` (`left: 78%`), `.b-sel` band, and the track geometry (`52%` / `16%` / `68%` for the 26 / 34 thresholds on a 0–50 scale) are all internally consistent. `isHeavy` is shared by `Proof.astro` and `interactions.js`, so SSR and client agree — no hydration flash on `.heavy`.
- **Funnel data is exact.** I counted the 126 squares: `drop` distribution is 86 / 26 / 9 / 3 / 2, which matches `STOP[1..5]` verbatim and yields cumulative reach 126 → 40 → 14 → 5 → 2, matching `COUNT`, `LBL`, `REACH` and the step markup. Inline square colours match `DOT[]`. 18-col grid × 7 rows = 126 exactly.
- **Degradation is genuinely handled**: `disabled` sliders re-enabled by JS, `:not(.is-enhanced)` fallbacks for every opacity/stroke-dash animation, reduced-motion honoured in both CSS and JS, divide-by-zero guarded (`tw > 0`), `elPin` clamped 1–99.
- **XSS is handled correctly**: `escape()` on all interpolated strings, and `.replaceAll('<', '\\u003c')` on the JSON payload correctly prevents `</script>` breakout while round-tripping through `JSON.parse`.
- `root.dataset.initialized` guard, `cancelAnimationFrame` before restarting the score tween, `userTook` guarding the autoplay timers, and `announce()`'s debounce + equality check (which correctly suppresses a spurious initial announcement) are all sound.

---

## Concrete defects

### 1. Nav order does not match DOM order — scrollspy highlights backwards (blocking)

`Home.astro` renders `… savings → ways → results → trust …`, but `header.html` and `footer.html` both list **Results before How we work (`#ways`)**:

```html
<a href="#results">Results</a> <a href="#ways">How we work</a>
```

The `IntersectionObserver` in `Header.astro` is order-agnostic, so scrolling down lights up _How we work_, then jumps **back up** to _Results_. The mobile menu is worse: it lists `proof, funnel, results, ways, experts` while the page is `proof, funnel, experts, ways, results`.

**Fix:** reorder the nav/footer links to `#proof, #funnel, #experts, #ways, #results`, or move the `results` fragment above `ways` in `Home.astro`.

### 2. `.fnl-step` ships `role="button" tabindex="0"` in static HTML (should-fix)

`funnel.html` bakes `role="button" tabindex="0" aria-pressed="…"` into all five steps, yet `interactions.js` _re-sets_ `role` and `tabindex` itself:

```js
st.setAttribute('tabindex', '0');
st.setAttribute('role', 'button');
```

With JS unavailable this leaves five focusable, screen-reader-announced toggle buttons that do nothing — the one place the otherwise-careful `:not(.is-enhanced)` strategy is violated. Remove the three attributes from the markup (the script already adds them, and `setStage(1)` seeds `aria-pressed`).

Secondary: `aria-pressed` models a mutually-exclusive 1-of-5 selection. `role="tab"` on a `role="tablist"` with `aria-selected` (and `aria-controls` → `.field`) is the correct pattern and would also solve #3.

### 3. `.sr-only` is not defined anywhere in the supplied CSS (blocking unless confirmed)

`Proof.astro` injects `<div class="sr-only" id="labStatus" aria-live="polite">Select, 39.00 out of 50</div>`. The full `sample.css` dump contains no `.sr-only` rule — it relies on Tailwind's utility reaching this page via `PageLayout`. If it doesn't, that string renders **visibly inside the verdict card**, duplicating the `39.00 / 50`. Either confirm Tailwind utilities are emitted on this route or add a scoped `.sr-only` to `sample.css`. (Note the scoped reset `:is(.v126-home,…) * { margin: 0 }` will override Tailwind's `margin: -1px` — harmless, the 1px + `clip` still hides it.)

### 4. Fonts are never loaded in the supplied source

`--display: 'Fraunces'`, `--body: 'Inter Tight'`, `--mono: 'JetBrains Mono'` and the `is:global` `body { font-family: 'Inter Tight' }` in `index.astro` have no `@font-face`, `@import`, or preload anywhere in the provided files. If `Layout.astro` doesn't load them, the entire design falls back to Georgia/system-ui. Verify.

### 5. `new URL('/og-image.png', Astro.site)` throws at build if `site` is unset

```js
images: [{ url: new URL('/og-image.png', Astro.site).toString(), … }]
```

`Astro.site` is `undefined` when `site` is absent from `astro.config`, and `new URL(path, undefined)` raises `TypeError: Invalid URL` — a hard build failure, not a silent one. Confirm `site` is configured (dimensions 2400×1260 are fine for `summary_large_image`).

---

## Minor notes (non-blocking)

- **Keyboard feedback gap, funnel:** focusing a step mutates `#fnlN` / `#fnlLbl` / `#fnlInPlay` / `#fnlFt` with no live region, while the lab has both `#labStatus` and `aria-live` on `#labEv`. The step's own accessible name contains the count, so the loss is partial — but a `role="tab"` / `aria-controls` conversion (see #2) would close it properly.
- **No `nav` landmark on mobile.** At ≤860px `.nav-links` (the only `<nav aria-label="Primary">`) is `display: none` and `.nav-mobile` is a plain `<div>`. Make `.nav-mobile` a `<nav aria-label="Primary">`.
- **Unprefixed global IDs.** `row0`, `tile0`, `pts0` are generated into the document ID namespace alongside otherwise-prefixed `v126-*` / `lab*` / `fnl*` IDs. Prefix them for safety.
- **`fnl-math` rounding.** 126 × 4min + 40 × 30min + 14 × 45min = 8.4 + 20 + 10.5 = **38.9h**; the copy says "About **38** hours". "About 39" is the honest round.
- `#labData` renders as a direct child of `.v126-home` _between_ two sections. Currently harmless because `.proof` is `g-dark` (no `.g-white + .g-paper` rule matches either way), but it does sit in the sibling chain. Moving it inside the `.proof` section would be tidier.
- `mainClass="v126-route w-full"` — `.v126-route` is referenced nowhere in `sample.css`; confirm `PageLayout` actually forwards `mainClass`, otherwise drop the prop.

---

## Verdict

**CHANGES REQUESTED.**

Blocking: **#1** (nav order vs. DOM order), **#3** (`.sr-only` undefined → visible live-region text). Confirm-or-fix: **#4** (fonts), **#5** (`Astro.site`). Should-fix before merge: **#2**.

Everything else — the lab scoring pipeline, the 126-square funnel dataset, escaping, reduced-motion handling, and the no-JS fallback layer — is correct and unusually well-constructed; no runtime exceptions or state-desync bugs found in the supplied JS.
