## Step 11 — `trust` section review

### Markup fidelity: PASS

Character-for-character match with the sample for the whole section: `section.trust.g-paper#trust`, `.proof-head` (eyebrow + `\` tick, `h2` `--d:60ms`, `.lead` `--d:120ms`), `.handoff` `--d:150ms` (engine card, `aria-hidden` mid arrow with identical `viewBox="0 0 62 24"` / `pathLength="1"` paths, you card), `.trust-grid` `--d:180ms` with all four `.tp` blocks including `&amp;` entity and sample strings ("31/50", "3/5 · transcript 04:12", etc.). No omissions, no reordering, no attribute drift.

### CSS coverage: OK

Every class used here has a namespaced rule present: `.proof-head` (incl. `@media(min-width:820px)` two-column head and `.proof-head .lead{margin-top:0}`), `.handoff`/`.ho*` (incl. the `@media(max-width:640px)` stacking + arrow rotation), `.trust-grid` (1 col → 2 col at 720px), `.tp`/`.tp-sample`, plus shared `.eyebrow`, `.lead`, hover elevation. `.proof .lead{color:var(--pw)}` is correctly scoped to `.proof`, so this section's lead keeps `--ink-2` on paper. Reduced-motion guards for `.ho-shaft`/`.ho-head` are present.

### Issues

1. **No-JS fallback misses `[data-rv]` — this section renders invisible with JS off.** (Actionable; cross-cutting, but every visible element in step 11 is affected.)
   `[data-rv]{opacity:0;transform:translateY(14px)}` is only cleared by `.in` (JS) or `prefers-reduced-motion`. The `:not(.is-enhanced)` fallback block lists `.xp, .fw-stage, .ob-stems, .ob-sq, .ho-head, .fa-head, .wm-node` and the stroke-dashoffset set — but not `[data-rv]`. With scripting disabled, `.is-enhanced` is never added, yet nothing restores `[data-rv]`, so the eyebrow, `h2`, `.lead`, `.handoff` and `.trust-grid` (all five `data-rv` nodes here) stay at `opacity:0`. This contradicts the stated "preserve static content without JS" goal.
   Fix: add `[data-rv]` to the existing `:is(.v126-home, …):not(.is-enhanced)` reset (`opacity:1;transform:none`), same pattern already used for `.xp`/`.fw-stage`.

2. **`.handoff` arrow reveal depends on a JS-applied `.in`.** Once `.is-enhanced` is set, `.ho-shaft`/`.ho-head` are hidden until `.handoff.in` exists. The no-JS path is covered by the fallback block, but there is no CSS-only safety net for the "JS loaded, observer never fires for `.handoff`" case (e.g. element already in viewport at init). Confirm the homepage observer registers `.handoff` alongside `.flow`/`.bench`/`.ways-merge`; otherwise the arrow silently never draws.

### Minor notes (not blocking, copied behaviour)

- `.ho-tag--you` is applied in the markup but has no rule; styling comes from `.ho-you .ho-tag`. Dead class carried over from the sample — harmless, leave as-is for fidelity.
- `.tp-sample` is hover-only (`opacity:0` → `.tp:hover`), so the evidence strings are unreachable on touch/keyboard while `.tp{padding-bottom:2.7rem}` reserves visible empty space. Matches the sample exactly, so not a migration defect; flagging only as a known a11y limitation if you later want `:focus-within` parity.

**Verdict: PASS on fidelity; fix issue 1 before sign-off.**
