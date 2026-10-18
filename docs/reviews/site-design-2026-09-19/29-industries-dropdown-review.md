CHANGES REQUIRED

Two narrow items; the redesign itself is sound and largely ships as recommended.

## Measured facts

**1. The 320px case is not established, and the evidence contradicts itself.**
`measurements.json` (width 320) records `availableTextWidth: 203` against `measuredTextWidth: 209` / `maxOptionTextWidth: 209` for "Consumer & digital commerce" — a 6px deficit. `index.astro:5556-5560` sets `text-overflow: clip` inside `@media (max-width: 340px)`, so any overflow is hard-cut with no ellipsis and no signal. `validation.md:6` claims "the full longest label is visible in every reference capture, including 320px." Both cannot be true.

Note the ambiguity: `maxOptionTextWidth` is exactly 209 at 320, 390, 768, 1520 and 1920, despite the 320 breakpoint overriding `font-size` to 11.5px from 14px. That strongly suggests the measurement was taken at a single 14px assumption and does not reflect the 320px render — in which case the real width is ~172px and there is no clip. In `card-320.png` the label reads end-to-end but terminates hard against the caret with no visible gap, which I cannot resolve by eye at this resolution. Re-measure at the applied computed font and correct `validation.md`; if the deficit is real, dropping to 11px or trimming the 24px right padding closes it.

**2. The no-JS artifact is unusable.** `after/card-390-nojs.png` renders as an empty gradient — no card, no controls. It substantiates nothing. The *code* is sound: `index.astro:6395,6440` keep both selects `disabled`, the swap button ships `hidden disabled`, `.sel__swap[hidden]{display:none}` holds without JS, and `charts.ts:38` removes `#comparisonHint` only after init — so the hint persists. Re-capture against `after-final`.

## Verified good

- **Clipping solved 390–1920** (facts): 209px needed against 209 / 554 / 368 / 368px available. Before was 209 needed against 102 (390) and 181 (1520). `pageOverflow: false` at all five widths.
- **A/B identity** (judgment): strong. The chip → bar → numeral chain is unbroken. `.bw__f--b` moving from bone `#b4b0a6` to `#9b4a4d` (diff:209) is the single most valuable change here — B now reads red-family at rest, not only when key. Chip `#ff6b6f` matches `.bw.key .bw__f--b` and `.bw.key .bw__v b` exactly.
- **Hierarchy** (judgment): intentional. Removing the 8.5px duplicate labels to `.sel__lab` sr-only and letting the swap pill act as the "vs" divider gives the stack a clear A / pivot / B rhythm. Mono micro-caps and 10px radii match the editorial system; the navbar in `viewport-1520.png` is untouched, consistent with the diff touching only two files.
- **Balance** (judgment): `viewport-1520.png` reads well — card 502px against the hero column, top-aligned near the headline. `viewport-390.png` stacks cleanly.
- **Model intact**: `charts.ts` swap mutates only `a.value`/`b.value` then `paint()`; twelve options per side preserved.

## Minor, non-blocking

`:focus-within` (diff:36) replaces the recommended `:has(select:focus-visible)`, so the ring fires on pointer click too. The recommended `aria-describedby="comparisonHint"` was not implemented.
