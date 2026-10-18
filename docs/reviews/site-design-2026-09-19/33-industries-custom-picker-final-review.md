PASS

## Measured facts

**Native popup eliminated.** `initComparison` sets `a.hidden = b.hidden = true` (charts.ts:187) and unhides `.sector-trigger` buttons (:194). `.sel.is-enhanced .sel__car--native { display: none }` removes the duplicate chevron. No `<select>` remains interactive in the enhanced state, so no native menu can be invoked. Captures at 320–1920 confirm only the custom panel.

**Containment.** `.cmpw` is `position:relative; overflow:hidden` (index.astro:5392–5397). The panel is `position:absolute; z-index:6` with `top: var(--picker-top)` computed from the trigger row rect (charts.ts:148–150) and `max-height: calc(100% - var(--picker-top) - 18px)`. validation.json reports `panelInsideCard: true`, `pageOverflow: false`, `optionCount: 12`, `groupCount: 3` at all five widths — confirmed visually in every capture.

**Coverage.** All 12 options in three labelled bands (Technology & product / Regulated & scientific / Industrial & capital) — fully visible without scrolling at 768/1520/1920; scrolled with a sticky "SCROLL FOR ALL SECTORS ↓" cue at 320/390 (`.sector-picker__scroll`, ≤559px, driven by `updateScrollHint`).

**States.** Selected row: `aria-selected="true"`, accent ✓, `rgba(255,255,255,.1)` background. Opposite side: chip badge replacing the check, coloured `#c9c9c2` in the B panel and `#ff6b6f` in the A panel (`.sector-picker.is-a .sector-picker__other`) — correct inversion, visible as the grey "A" badge in every open-B shot. Panel top border carries the owner accent.

**Behavior.** `choose()` swaps rather than duplicating (charts.ts:172). Swap button closes the picker, exchanges values, repaints, re-syncs labels, focuses trigger A. `paint()` and the `change` listeners are unchanged in logic; chart values and note text still derive from `comparison()`.

**Keyboard/dismissal.** Enter/Space/↓/↑ open with correct landing index; ↑↓/Home/End roving `tabIndex`, first-letter typeahead with 600 ms reset, Enter commits, Escape and Tab close and restore trigger focus, outside `pointerdown` closes, opening one closes the other.

**No-JS.** Selects stay visible (dimmed via `.sel:has(select:disabled)`), triggers and swap stay `hidden`, and `#comparisonHint` renders "Showing the default comparison. Enable JavaScript to change selections." — unchanged from the prior baseline.

**Navbar.** The diff touches only `.verd__big i`, the `.cmpw`/`.sel`/picker block, `.bw__f` colours, `.cmpw__ft`, and the comparison markup. No `.nav`, `.dd__p`, or z-index changes.

## Judgment

The open panel reads as a deliberate in-card sheet: header row, accent rule, grouped bands, consistent gutters. Nothing looks clipped. The mobile fade plus cue makes the scroll affordance legible. Desktop two-column spacing is even; "Consumer & digital commerce" wraps to two lines at 1520/1920 because the badge consumes 16px of a ~200px column — slightly uneven row height, cosmetic only.

Two optional nits, not blockers: `.sector-picker__items` sits unroled between `role="group"` and `role="option"` (add `role="presentation"`), and Escape is bound to `panelList`, so it is inert if focus somehow lands on the × button.
