## Step 07 — Workflow: markup PASS, one actionable CSS issue

### Markup fidelity

Copied section is **character-for-character identical** to the sample: same section/`id`/`g-white` classes, `work-head` eyebrow/h2/lead with `--d:60ms`/`--d:120ms`, `.flow` with `--d:160ms`, both `.step` cards, both `.flow-arrow` SVGs (identical `viewBox`, `pathLength`, `d` values, `aria-hidden`), `.flow-work` label and all three `.fw-stage` blocks with `01/02/03`, headings, copy, and the `&amp;` entity. No placeholder links, scores, funnel captions, or FAQ in this section, so none of the sanctioned integration changes apply here. ✅

### Issue 1 (medium) — entrance animations are dead even when JS runs

The two trailing global rules:

```
… :is(.xp, .fw-stage, …, .fa-head, .wm-node) { opacity: 1; transform: none; }
… :is(.ob-bar, …, .fa-shaft, …) { stroke-dashoffset: 0; }
```

have specificity (0,2,0) and appear **after** the base hidden states `.fw-stage{opacity:0;transform:translateY(10px)}` (0,2,0) and `.fa-shaft{stroke-dashoffset:1}` (0,2,0), so they win. The `.flow.in …` rules are higher specificity, but they only transition _to_ `opacity:1` / `stroke-dashoffset:0` — the values the elements already hold. Net effect: the arrow draw-in and the `.34s/.5s/.66s` `.fw-stage` stagger never play; the `--ad` delay chain on `.flow-arrow` is inert too.

That is a behavioural deviation from the sample beyond the stated "preserve static content without JS" intent (the goal is a no-JS fallback, not permanent removal of the motion).

Fix: gate the override so it only applies when the reveal script isn't running, e.g. put it behind `html:not(.js)` / `.no-js` (with the homepage script setting the flag early), or keep it inside the existing `prefers-reduced-motion` block, rather than applying it unconditionally.

### Issue 2 (low, non-blocking) — dead/no-op CSS carried over

- `.flow` is `display:flex`, but two breakpoints set `grid-template-columns` on `.flow` (`1fr 1fr`, and `1fr` at `max-width:520px`). These are no-ops; the column→row switch is actually handled by the `min-width:900px` flex rule. Harmless, but if it came from the sample as-is, leave it; if it was added during the copy, drop it.
- `.flow .step.s-ours*` (5 rules) and `.flow .who.ours` match nothing in this section's markup. Dead but harmless.

Namespacing (`:is(.v126-home, .v126-footer, .v126-header)` prefix) is applied consistently to every selector in this section, including the two global visibility overrides, so no leakage to other pages. `.work` itself carries no styles beyond `g-white`, which is namespaced.
