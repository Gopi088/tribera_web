PASS

## Verification of the four corrections

**1. Typography/overflow gap — closed.** `measurements.json` now reports computed-font measurements with headroom at every width:

| Width | Longest option | Available | Reserve |
|---|---|---|---|
| 320 | 152px | 203px | 51px |
| 390 | 188px | 209px | 21px |
| 768 | 188px | 554px | 366px |
| 1520/1920 | 188px | 368px | 180px |

`pageOverflow: false` at all five widths. The specificity fix is visible in the diff (`:root body .site-editorial .sel select`), and the screenshots corroborate it: `card-320.png` and `card-390.png` render "Consumer & digital commerce" in full with no ellipsis or clip. The 320 stacked fallback (chip on its own row, 11.5px, caret bottom-right) renders cleanly inside the 295px card.

**2. No-JS artifact — closed.** `nojs-state.json` records `aDisabled: true`, `bDisabled: true`, `swapHidden: true`, `cardOpacity: "1"`, and the hint string. `card-390-nojs.png` matches exactly: whole card visible, both selects dimmed with full labels and chips legible, no swap control, and the explanation rendered beneath the chart. The earlier truncated capture is superseded.

**3. Parent focus styling.** Diff confirms `.sel:has(select:focus-visible)` and the red `.sel--b` variant, replacing the former child-only `:focus`.

**4. `aria-describedby`.** Diff confirms both `#secA` and `#secB` carry `aria-describedby="comparisonHint"`.

Truncation — the original defect — is resolved structurally, not cosmetically: one full-width column at every breakpoint. A/B identity is now carried by persistent chips whose colours match the bars, including the `.bw__f--b` recolour to `#9b4a4d`/`#ff6b6f` so B reads red-family on non-key rows too. Swap is hidden and disabled in markup, enabled only by JS — no dead affordance.

## One non-blocking follow-up (judgment, not a blocker)

`charts.ts` still ends with `document.getElementById('comparisonHint')?.remove()`, so once JS initialises, both selects reference an ID that no longer exists. No user-facing harm — assistive tech ignores unresolvable references, and the hint is irrelevant once the controls are live — but automated audits (axe `aria-valid-attr-value`) will flag it. A one-line `removeAttribute('aria-describedby')` alongside the removal clears it. Same minor class as the original observation; ship without it if convenient.
