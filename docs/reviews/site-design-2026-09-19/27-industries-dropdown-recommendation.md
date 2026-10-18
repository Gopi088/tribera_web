## Measured facts

| Evidence | Measurement |
|---|---|
| `industries-1520.png` | Select A ≈216 px wide, renders "Consumer & digital comm‹clip›"; B ≈216 px, "Banking & financial service‹clip›". Both truncated at the default values. |
| `industries-390.png` | Boxes ≈138 px / ≈136 px. "Consumer & d", "Banking & fina" — roughly 12 visible characters of a 27-character label. |
| `index.astro:5404-5409` | `.cmpw__sel{grid-template-columns:1fr 1fr;gap:12px}` inside `padding:clamp(20px,2.2vw,26px)` — width is fixed at half the card at every breakpoint. |
| `:5425-5446` | `appearance:none`, `font-size:13px`, `padding-right:26px`, caret drawn as two 5×5 px gradients in `#9c9c97` on `rgba(255,255,255,.06)`. |
| `:5415-5424` | Label `font-size:8.5px`; B label `#ff6b70`. |
| `:6290,6307` | Both selects ship `disabled`; `charts.ts:24` enables them only after JS runs. |
| `charts.ts:11-19` | Comparison logic depends only on `a.value`/`b.value`; markup around the selects is free to change. |

## Diagnosis

1. **Truncation is structural, not incidental.** Half-card columns give ~216 px desktop / ~137 px mobile; the longest options ("Global capability centres", "Consumer & digital commerce") need ~190 px at 13 px. The *selected* value — the single most important state in the card — is the one thing you cannot read.
2. **Four text objects, no hierarchy.** "SECTOR A" (8.5 px) + a clipped select, twice, above six chart rows. The 8.5 px mono is below the site's micro-label size and reads as noise.
3. **Dead affordance.** `appearance:none` + a 5 px low-contrast caret + `disabled` at paint time = a muted, un-clickable-looking field. The screenshots show the disabled state; that is what users judge.
4. **Duplicated labels.** "Sector A" is redundant with the sector name beneath it. The identity that *is* missing — which of the two stacked bars is A and which is B — is never stated.
5. **Cramped width is self-inflicted**: side-by-side is the only reason the column is narrow.

## Recommendation: stacked "A vs B" compare bar with a swap control

One column, full card width, at every breakpoint. Identity moves from a text label to a persistent A/B chip that matches the bar colours.

```html
<div class="cmpw__sel">
  <label class="sel sel--a" for="secA">
    <span class="sel__chip" aria-hidden="true">A</span>
    <span class="sel__lab u-sr">Sector A</span>
    <select id="secA" aria-describedby="comparisonHint" disabled …>…</select>
    <svg class="sel__car" viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5 6 6.5 11 1.5"/></svg>
  </label>
  <button type="button" id="secSwap" class="sel__swap" hidden>
    <span aria-hidden="true">⇅</span> Swap sectors
  </button>
  <label class="sel sel--b" for="secB"> … chip "B" … </label>
</div>
```

```css
.cmpw__sel{display:grid;grid-template-columns:1fr;gap:8px;
  padding-bottom:16px;border-bottom:1px solid var(--cline);margin-bottom:6px}
.sel{position:relative;display:grid;grid-template-columns:auto 1fr auto;
  align-items:center;gap:10px;background:rgba(255,255,255,.06);
  border:1px solid var(--cline);border-radius:10px;padding:0 12px}
.sel__chip{font-family:var(--mono);font-size:10px;letter-spacing:.14em;
  width:20px;height:20px;display:grid;place-items:center;border-radius:6px;
  background:#c9c9c2;color:#141413}
.sel--b .sel__chip{background:var(--red);color:#fff}
.sel select{appearance:none;width:100%;background:none;border:0;
  font:400 14px/1 var(--ui);color:#fff;padding:11px 0;cursor:pointer;
  text-overflow:ellipsis}          /* full label now fits: 452px desktop / 327px mobile */
.sel__car{width:12px;height:8px;fill:none;stroke:#d8d5cf;stroke-width:1.4}
.sel:has(select:focus-visible){border-color:transparent;
  box-shadow:0 0 0 2px #141413,0 0 0 4px rgba(255,255,255,.6)}
.sel--b:has(select:focus-visible){box-shadow:0 0 0 2px #141413,0 0 0 4px var(--red)}
.sel:has(select:disabled){opacity:.72;cursor:default}
.sel select:disabled{color:#fff;cursor:default}   /* kill the "broken" grey */
.sel__swap{justify-self:center;font:400 11px/1 var(--mono);letter-spacing:.12em;
  text-transform:uppercase;color:var(--onc3);background:none;border:0;
  padding:4px 8px;cursor:pointer}
.sel__swap:hover{color:#fff}
.bw__f--b{background:rgba(218,0,7,.42)}   /* B is red-family always, not only when key */
```

**Swap: yes.** It converts "re-pick both dropdowns" into one click and doubles as the visual "vs" divider. Wire in `initComparison`: `const t=a.value;a.value=b.value;b.value=t;paint();` then `swap.hidden=false` beside `a.disabled=b.disabled=false`. Hidden without JS, so no dead control.

**No-JS / disabled:** keep `disabled` (changing a select that can't repaint is worse), but the chips, full labels and `#comparisonHint` (now referenced via `aria-describedby`) stay legible at `opacity:.72`.

**Accessibility preserved:** "Sector A/B" remains the `<label>` text, visually hidden; chips are `aria-hidden`. Twelve options per side, chart rows, card, hero structure and navbar untouched.

**Consistency:** mono micro-caps, bone/red duotone, 10 px radii and the chevron stroke match the updated homepage navbar and editorial cards.
