## Step 08 — `savings`: **PASS**

### Markup fidelity

Byte-for-byte identical to the sample: section classes/id, `proof-head` (eyebrow + `\` tick, h2, lead), three `.save` cards with matching `--d` stagger (0/75ms/150ms), `.cu` counter with `data-to="36"` and matching static text, `.cost-bar` + `.cost-lbl`, the decorative `.ways-merge` SVG (identical `viewBox`, `preserveAspectRatio`, all three `d` paths and `pathLength="1"`), `wm-node`, and `.ways-foot` with `.em`. No placeholder links, funnel captions, scoring percentages, FAQ, or evidence buttons occur in this section, so none of the intentional integration deltas apply here.

### CSS

All rules that this section depends on are present and correctly namespaced under `:is(.v126-home, .v126-footer, .v126-header)` — `.save-grid` (1-col → 3-col at `min-width:760px`), `.save`/`.save-k`/`.save b`/`.save p`, hover lift, `.cost-bar`/`.cost-lbl`, `.ways-merge` geometry + stroke-dash setup, `.ways-foot`, `.proof-head` grid, `.lead`, `.eyebrow`, `.em`, `.cu` tabular-nums, `.g-paper` + adjacent-section border. The `.savings .ways-merge` hide at `max-width:760px` aligns cleanly with the `min-width:760px` 3-column breakpoint, so the converging lines are never shown against a stacked grid. Reduced-motion fallbacks for both `.cost-bar span` and `.ways-merge path`/`.wm-node` are carried over.

### Non-blocking observations (no action required)

1. The trailing static-state block (`.wm-node{opacity:1}`, `.ways-merge path{stroke-dashoffset:0}`, `.cost-bar span{width:72%}`) means the line-draw and bar-fill transitions are effectively inert even when JS runs, since `.ways-merge.in path` and `.save.in .cost-bar span` resolve to the same values with no start→end delta. Final rendered state matches the sample exactly; only the in-view motion is dropped. This reads as the intended "preserve static content without JS" behaviour, so I'm flagging it only so it's a conscious tradeoff rather than an oversight.
2. `.save.in .cost-bar span` and `.ways-merge.in path` are now dead weight given (1); harmless, and keeping them costs nothing if JS-driven reveal is later re-enabled.

No fidelity, namespacing, accessibility, or responsive issues found in this step.
