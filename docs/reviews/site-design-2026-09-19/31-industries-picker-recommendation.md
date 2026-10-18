## Evidence notes

- No user screenshot was present in this conversation; I reviewed `card-390.png` and `card-1520.png` only.
- `charts.ts` has no `initIndustry`; the relevant export is **`initComparison`** (lines 3–41). It reads `#secA`/`#secB` `.value`, repaints on `change`, and swaps by assigning `.value` — so anything that keeps a `<select>` as the value store keeps working untouched.
- **Measured blocker:** `.cmpw` is `position:relative; overflow:hidden` (index.astro 5391–5401). Any absolutely-positioned popup placed inside it is clipped; any popup escaping it must clear `.nav` (sticky, z-50) and `.dd__p` (z-60).

## Recommendation: an in-card listbox sheet (float, don't push)

Keep both `<select>`s in the DOM as the value store. `initComparison` adds `hidden` to each and injects a `<button role="combobox" aria-expanded aria-controls aria-haspopup="listbox">` styled exactly as today's `.sel` (chip + label + `.sel__car`), then writes `select.value` and dispatches `change` on commit. Swap, series data, note text and the 12 options are untouched.

**Geometry.** The panel is `position:absolute` _inside_ `.cmpw` — so `overflow:hidden` contains it rather than clipping it, no z-index war with the navbar (z-index 5 within the card's stacking context). Top = trigger bottom + 6px; `left/right` = card padding; background `#1a1a18`, 1px `--cline`, radius 10px, the same 0 24px 56px shadow. Bars beneath get `opacity:.35` — the chart is visibly _behind_, not overlapped by a foreign surface. Nothing reflows, so the card height never jumps.

**Columns/grouping.** ≥560px: two columns inside three labelled bands (mono 9.5px, `--onc3`): _Technology & product_ (4), _Regulated & scientific_ (4), _Industrial & capital_ (4). At the measured 1520 card, column width ≈208px against the 188px longest label — fits. <560px: one column, 44px rows, `max-height:58vh`, internal scroll.

**Typography/state.** Options `--ui` 13.5px/500, `#c9c9c2`; hover/active `rgba(255,255,255,.07)` + `#fff`. Selected row shows a 12px check in the owner's colour and `aria-selected="true"`. The option held by the _other_ selector carries its chip badge; choosing it performs a swap rather than duplicating.

**A/B identity.** 2px top accent on the panel — `#c9c9c2` for A, `#ff6b6f` for B — matching the existing chips and `.bw__f` bars.

**Keyboard/dismiss.** Enter/Space/↓/Alt+↓ open; ↑↓ Home End roving via `aria-activedescendant`; first-letter typeahead; Enter commits; Esc and Tab close and restore focus to the trigger; `pointerdown` outside closes. Opening B closes A.

**No-JS.** Script absent → the native `<select>` stays visible, enabled by markup order, with `#comparisonHint` intact — the state `card-390-nojs.png` already verifies.
