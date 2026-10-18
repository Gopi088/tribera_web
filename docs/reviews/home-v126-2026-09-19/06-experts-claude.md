## Review — Step 06: `experts`

### Markup fidelity: PASS

The copied section is character‑for‑character identical to the sample: same `id`/classes, `data-rv` + `--d` delay values, both `hd-word`/`hd-underline` SVGs (identical path data, `stroke-width:2.6`, lead path relying on CSS `stroke`), all 12 `.xp` cards in original order with `.xp--more` last, both `.bench-note` paragraphs (including the inline `margin-top:1.1rem`), `.inds-k` + all 12 `.inds-g` pills. The sample's quirk of nesting the second `.bench-note` inside `.inds` is preserved — correct for a fidelity copy, no action. No placeholder links or funnel/score copy in this section, so none of the listed intentional deviations apply here.

### Issues (CSS — no‑JS / no‑`.in` fallback is incomplete for this section)

Both are specificity/coverage bugs in the two trailing override rules, not sample deviations.

**1. `.xp` cards stay invisible without the JS‑added `.bench.in` (blocking).**

- Hidden state: `:is(scope) .bench-g .xp{opacity:0;transform:translateY(14px) scale(.985)}` → specificity **(0,3,0)**.
- Intended fallback: `:is(scope) :is(.xp, .fw-stage, …){opacity:1;transform:none}` → **(0,2,0)** (`:is()` takes its highest‑specificity argument, here a single class).
- The fallback loses, so the whole 12‑card bench renders at `opacity:0` if `.bench.in` is never applied (JS disabled/failed, or observer missed). Fix by matching the descendant form, e.g. append `:is(.v126-home,.v126-footer,.v126-header) .bench-g .xp{opacity:1;transform:none}` (or add `.bench-g .xp` inside the existing `:is()` list, which raises it to (0,2,1)‑equivalent… safest is the explicit descendant rule placed after the reveal rule).

**2. `.inds-g span` pills have no fallback at all.**
`:is(scope) .inds-g span{…opacity:0}` is only reset by `.bench.in .inds-g span{animation:v126-pillIn … both}` or by the `prefers-reduced-motion` block. `.inds-g span` is absent from the final override list, so for a default‑motion user without `.in`, all 12 industry pills are invisible (borders/text gone) while the `.inds-k` label still shows. Add `.inds-g span{opacity:1;animation:none}` to the same scoped fallback rule.

### Verified OK

- `.hd-underline path` fallback works: override `:is(scope) :is(…, .hd-underline path, …){stroke-dashoffset:0}` is (0,2,1), equal to `:is(scope) .hd-underline path` (0,2,1), and it is declared later → underlines render drawn without JS. Both experts SVGs are covered.
- Hover states survive the `transform:none` override (`.xp:hover` (0,3,0) and `.bench.in .bench-g .xp:hover` (0,6,0) both outrank (0,2,0)).
- `nth-child` stagger covers exactly 12 pills — matches the markup count; no orphaned/missing delays.
- `.experts h2{max-width:20ch}`, `.g-paper` background, and the `g-paper + g-paper` divider all carry over correctly under the `v126-*` namespace; nothing in the section leaks unscoped selectors.

Re‑request review after the two fallback rules are added.
