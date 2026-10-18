## Review — inline `html.v126-document { scrollbar-gutter: auto }`

### Correctness of the cascade (the crux of the fix)

- Shared rule is `html { scrollbar-gutter: stable }` → specificity **(0,0,1)**. The added rule is `html.v126-document` → **(0,1,1)**. The override wins on specificity, so it does not depend on stylesheet order (`<style is:inline>` vs. the external Tailwind bundle). ✔
- Layer interaction is also safe in the correct direction: if the shared rule lives in `@layer base`, unlayered inline styles beat any cascade layer. ✔
- `auto` is the initial value, so this is a clean revert-to-default rather than a competing value. ✔
- `scrollbar-gutter` is **not inherited** and is set on `html`, which is the element whose value propagates to the viewport — correct target. ✔
- Route isolation is correct: the selector is class-gated, and Astro's `class:list` silently drops an undefined/false `htmlClass`, so non-home routes emit no class and keep `stable`. ✔
- Unsupported in Safari/older WebKit, but there both `stable` and `auto` are ignored equally, so this cannot introduce a Safari-only divergence. ✔

### Fidelity rationale checks out

`stable` reserves the gutter _unconditionally_, including when the capture has no visible scrollbar (headless/full-page Chromium captures suppress or eliminate the scrollbar). Centered content therefore sits 15px/2 = 7.5px left of the un-gutter sample — exactly the reported delta, and exactly what `auto` removes. Diagnosis and remedy are consistent.

### Accessibility

No a11y delta. Reflow/zoom behavior, focus order, and semantics are untouched; removing a reserved gutter does not reduce target size or hit area. (The `html { font-size: 16px }` px-pinning that overrides a user's default-font-size preference is **pre-existing** in both the shared and home-only rules and is not introduced here.)

### Notes — not blockers, no change requested

1. **Pre-existing, unchanged:** `html.v126-document` (0,1,1) also outranks both `@media (min-width:1536px) html { font-size:20px }` (0,0,1) and Tailwind's `.2xl:text-[20px]` (0,1,0), so home is pinned at 16px root at ≥1536px while other routes scale to 20px. That predates this patch and is presumably the intended sample match; flagging only so it isn't mistaken later for fallout from this diff.
2. **Verify if a scroll-lock exists on home:** `stable` is commonly added to stop a 15px jump when a dialog/mobile-nav sets `overflow:hidden`. If home has such a lock, that jump returns on home only. Not verifiable from the supplied head snippet, and invisible in normal overflowing-page browsing (a classic scrollbar occupies the gutter either way), so it is not a demonstrable defect here.
3. Home↔other-route navigation now differs by 7.5px in the no-overflow case only; with real classic scrollbars on overflowing pages the two are pixel-identical.

## Verdict: **PASS**

Single-declaration, correctly scoped, specificity-safe, order-independent, and it targets the right element for viewport gutter propagation. No concrete runtime, accessibility, fidelity, or integration defects found in the supplied source.
