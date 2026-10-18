## Review — v126 Header (wrapper background fix)

Scope reviewed: `sample.css` header/nav block + `.v126-header` override, `Header.astro` script, `sections/header.html`, `ApplyColorMode.astro`, `tests/home-v126.test.mjs`.

### Fix verification

- `.v126-header { background: #fff }` is the last rule for that selector, so it wins over the earlier `:is(.v126-home,.v126-footer,.v126-header){ background: var(--white) }` (equal 0,1,0 specificity, later source order) and over nothing else. The wrapper now paints opaque white **beneath** the nav's `rgba(255,255,255,.75)`, so the `dark` class on `<html>` (set by `ApplyColorMode`) can no longer bleed through. Matches the assertions `rgb(255, 255, 255)` on `.v126-header` and `/255, 255, 255/` on `.v126-nav`, and the pixel(5,5) checks at 390/1920.
- Sticky ownership is correct: `.v126-header header.v126-nav { position: relative }` and `:is(…) header.v126-nav { position: sticky }` are both (0,2,1); the `relative` rule is later, so it wins. The wrapper is the sticky/stacking element (`z-index:60`) and `.nav-mobile { position:absolute; top:100% }` resolves against `header.v126-nav`, which is why the menu anchors flush at `navBox.y + navBox.height`. No regression there.
- `scroll-margin-top: 74px` vs. 62px row + 1px border = 63px sticky block → 11px clearance. Correct, no under-tuck.

### Behavior / a11y checks that hold

- `setOpen()` keeps `aria-expanded`, `aria-label`, `.open`, and `panel.inert` in lockstep; `is-enhanced` gates `visibility:hidden` so the panel is only hidden when JS can reopen it (no-JS keeps the markup non-inert). Both `nav` landmarks are uniquely labelled and only one is ever exposed (desktop: `display:none` on `.nav-mobile`; mobile: `display:none` on `.nav-links`).
- Burger click does not self-close via the outside-click handler (`nav.contains(burger)` is true, and the header-level listener runs first). Escape closes and returns focus to the burger. Breakpoint change closes. No `outline:none` anywhere.
- `aria-controls="v126-menu"` resolves; `aria-current="location"` is a valid token; `link.hash` targets (`#proof`, `#funnel`, `#results`, `#ways`) all exist in the section order list, so `document.querySelector(link.hash)` never receives an empty selector.
- Contrast: nav links `#57565b` on white ≈ 7.3:1; mobile CTA white on `#da0007` ≈ 5.3:1. Both AA.

### Non-blocking observations (no code change required)

1. **Frosted-glass effect is now inert.** With an opaque white wrapper directly behind it, `backdrop-filter: saturate(1.6) blur(16px)` blurs a uniform white backdrop, and the `.scrolled` `0.75 → 0.86` background step is visually a no-op. Only the `.scrolled` box-shadow still reads. This is the accepted cost of the dark-bleed fix and the nav is white at rest in the sample, so fidelity at rest is preserved; the scroll-through translucency is not.
2. **Mobile menu close animation is dropped.** `visibility` isn't in the transition list, so on close `visibility:hidden` applies immediately and the 0.26s opacity fade never renders (open still animates). Cosmetic only; a `visibility 0s linear .26s` tail would restore symmetry.
3. **IntersectionObserver last-writer-wins.** If two sections are simultaneously inside the `-45%/-50%` band, the final entry in the batch decides the active link, and no link is active above the first observed section. Harmless for this layout.
4. **Eyebrow `--ink-3` (#9a998f on white ≈ 2.9:1)** is below AA for its 0.7rem size — pre-existing sample fidelity, outside this patch.
5. The supplied CSS excerpt shows an unterminated `.hero-cue-arr {` immediately followed by `.v126-header { … }` and ends mid-`.sr-only`. Under literal CSS nesting that would scope `.v126-header` under `.hero-cue-arr` and the background fix would not apply — but the reported computed styles (`rgb(255,255,255)` on `.v126-header`, sticky anchoring of `.nav-mobile`) prove the shipped file parses these as top-level rules, so this is excerpt elision, not a defect. Not blocking.

### Verdict

**PASS** — no concrete runtime, accessibility, fidelity, or integration bugs in the current fix.
