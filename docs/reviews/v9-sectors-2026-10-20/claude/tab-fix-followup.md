## Evidence read

- `docs/reviews/v9-sectors-2026-10-20/claude/viewports-4.md` — my original 768px tab-row finding (REVISE, unconfirmed from screenshot resolution).
- `docs/reviews/v9-sectors-2026-10-20/claude/detail-followup.md` — follow-up confirming visual clipping, flagging "needs live-browser check: scrollable vs. clipped," ACCEPT with that one open item.
- `src/scripts/v9/sector-charts.ts` (`choose()`, lines 22–41) — the fix itself.
- `src/assets/styles/v9/intelligence.css` (lines 1089–1112) — `.in-fns` horizontal scroll/snap rules confirming `overflow-x: auto`, `scroll-snap-type: x mandatory`, `scroll-padding-inline: var(--pad)`.
- `artifacts/v9-sectors/claude-detail/tablet-tabs.json` — DOM probe, 3 engines at 768px.
- `artifacts/v9-sectors/claude-detail/intelligence-tablet-last-tab.png` — visual check of last tab state.
- `tests/v9-sectors.test.mjs` lines 194–211 — new `keyboard-tab-visibility` assertions for both `industries` and `intelligence`.

## Source inspection

`choose()` (lines 33–38) now computes the scroll offset identically for both clipping directions:

```
offset = tabBounds.left < bounds.left
  ? tabBounds.left - bounds.left - 8
  : tabBounds.right > bounds.right
    ? tabBounds.left - bounds.left - 8   // previously likely used .right, causing snap-back
    : 0;
```

Both branches now align the tab's **left** edge into view, which combined with `scroll-snap-align: start` on `.in-fn` (intelligence.css:1109) and `scroll-snap-type: x mandatory` on `.in-fns` (line 1097) is consistent with the described bug and fix: a minimal rightward nudge using the old right-edge logic combined with snap-to-start could have snapped the scroller back to an earlier tab. This matches the stated fix.

## JSON evidence

`tablet-tabs.json` shows, for all three engines at 768px: tabs 0–3 (`Backend & platform` → `Cybersecurity`) stay at `scrollLeft: 0`; tab 4 (`Infrastructure & SRE`) jumps directly to a stable `scrollLeft` (576/582/581 depending on engine) and tabs 5–7 remain at that same value, each with `visible: true` and a `heading` matching the tab text. No oscillation or snap-back is recorded in the probe sequence.

## Screenshot

`intelligence-tablet-last-tab.png` shows the eighth tab "Leadership & GCC" focused/selected (focus ring visible, `aria-selected` styling applied), fully within the visible tab row, with the panel heading "LEADERSHIP & GCC" and matching chart data — consistent with the JSON record for that state.

## Test coverage

`tests/v9-sectors.test.mjs:194–211` adds a 768px loop for both `industries` (`.ii-k`) and `intelligence` (`.in-fn`): tabs through every index via `ArrowRight`, asserting after each step that the selected tab's bounding box is within its scroll container's bounds (`bounds.left >= container.left - 1 && bounds.right <= container.right + 1`), and that `aria-selected` is set correctly. This directly targets the snap-back/clipping failure mode previously only guessed at from static screenshots.

## Disposition

This resolves my outstanding finding. The original concern (unconfirmed overflow visibility) and the follow-up's open item (live scroll behavior under keyboard navigation, scrollable-vs-clipped) are both addressed: the CSS confirms intentional native horizontal scroll (not all 8 tabs simultaneously visible, by design), and the code fix + JSON probe + screenshot + new automated assertions together show the fifth tab onward reaches full visibility without snapping back, across Chromium/Firefox/WebKit at 768px.

**ACCEPT** for this bounded finding.

Scope reminder, per your instructions: this is local source/artifact inspection only. I have not observed live animation, have not accessed any production deployment, and am not rendering a G2/G3 sign-off — this disposition covers only the single tablet-tab keyboard-visibility item, not a re-review of the full 14-page/5-width/mobile-engine set (that remains as closed out in `detail-followup.md`, which already carried an overall ACCEPT with this one item pending). I'm not reporting on the "test suites rerunning separately" — no new suite results were provided to me in this turn.
