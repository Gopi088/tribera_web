## Step 03 — Thesis: **PASS**

Markup is byte-identical to the sample (copy/heading/claim, SVG geometry, `pathLength`, stem/square/check coordinates, escaped `data-msg` strings, `--d` delays, `id="what"`/`id="obCap"`). Numbers are internally consistent: 8 squares / 3 red / 3 stems up / 3 checks aligned to the red centers (178, 294, 410), caption "Three clear it. Five don't." matches the `aria-label`. No placeholder links, scores, or funnel captions in this section, so none of the intentional integration changes apply here.

Wiring checks that pass:

- Every selector used by the section exists namespaced: `.thesis .wrap/.body/.claim`, `.barcard`, `.lbl`, `.cap`, `.ob-bar/.ob-stems/.ob-sq`, `.hd-word/.hd-underline/.hd-check`.
- `.barcard[data-rv]` gets `.in` from the reveal observer, which is what all `.barcard.in ...` animation rules key off; reduced-motion fallbacks are present for `ob-bar`, `ob-stems`, `ob-sq`, `hd-check`.
- `:nth-of-type` staggers resolve correctly: the 8 `rect.ob-sq` are the only rects in their `<g>` and are in ascending-x DOM order, so the pop-in reads left→right; the 3 `path.hd-check` are alone in their `<g>`.
- `.barcard.in .hd-check` (0,3,0) correctly overrides the generic `.hd-check.drawn` (0,2,0) delays, and the reveal observer (`-14%`) fires before/with the stroke observer (`-12%`) for this card, so the choreography order (bar → stems → squares → checks) holds.
- Caption swap JS is `byId('obCap')`-scoped, captures the default `innerHTML` once, and restores it on `mouseleave`; the `<b>` in `data-msg` is static, so the `innerHTML` assignment is not an injection path.

### Non-blocking hardening notes (not fidelity failures)

1. **`.ob-sq` interaction is pointer-only.** `cursor:pointer` and the hover `scale(1.32)` advertise interactivity, but there are no `focus`/`blur` (or touch) handlers and no `tabindex`/`role` on the rects, so keyboard and touch users never see the "Below the bar / Cleared it" messages. Low impact because the `role="img"` + `aria-label` already conveys the chart's meaning; if you want parity, mirror the existing `mouseenter`/`mouseleave` listeners with `focus`/`blur` and add `tabindex="0"` + `role="button"` to `.ob-sq[data-msg]` (same pattern already used for `.fnl-step`).
2. **No-JS degradation of the card graphic.** `.in` is only added by script, so with JS off `.ob-bar` stays at `stroke-dashoffset:1`, `.ob-stems` and `.ob-sq` stay at `opacity:0` — the card renders as label + caption with an empty SVG. Given the stated "preserve static content without JS" goal, consider a `@media (scripting: none)` block (or an `html.no-js` hook) that applies the same resets as the `prefers-reduced-motion` rule.
3. **`.hd-check` depends on JS for `pathLength`.** The dash rules assume `pathLength="1"`, which the stroke-draw IIFE injects at runtime; `.ob-bar` already carries it inline. Adding `pathLength="1"` to the three `.hd-check` paths in markup removes that dependency and avoids a 1-user-unit dash artifact if the script doesn't run. (Would be a markup change to the copied sample, so only do it if you're comfortable diverging.)
