This is enough to assess the readable crops already reviewed plus the hero/H1 area. Here's my review:

## Hierarchy & scale — passes
- Hero H1 (53.12) vs marketing H2 (36) vs article H2 (32) reads correctly across all crops — the Experts page hero clearly dominates its section headers, and the article page ("Where the months actually went", "What actually changed") sits appropriately between H1 and body.
- Candidate-score dark pages (91.1 / 100 hero numeral, "Same person. Different team. Different score." H1) hold hierarchy well at both 1520 and 390 — no competing weight with body copy.
- Services page: "Start where hiring gets stuck." (marketing H2 scale) reads clearly above card titles ("Role scorecard" etc., which are a visibly smaller serif tier) — good three-level hierarchy (H2 → card title → body).

## Line wrapping — one real issue
- **Experts H1 mobile (390px)**: "Senior experts who've done the job — held to one bar: *the one you set.*" breaks across 4 lines with an awkward wrap — "one" stranded alone on line 3 before "the one you set." drops to line 4. This is a scale-driven wrap artifact (title is long for 28px/mobile at this width), not a copy issue. Worth a orphan-control check (e.g., non-breaking space between "one bar:" and "the"), but low severity since the italic clause still reads as a unit.
- All other headings/subtitles wrap cleanly with no orphans or awkward breaks (services, candidate-score, article H2s all clean at both widths).

## Subtitle readability — passes
- 18/16 subtitles are legible and clearly subordinate to headings at both breakpoints (Experts intro line, services intro, candidate-score copy). Contrast and line-length are fine, including on the dark candidate-score background.

## Spacing & alignment — passes
- Experts four-column expertise grid: consistent vertical rhythm between title/body/link-row pairs at 1520; mobile stack collapses cleanly to single column with even spacing.
- Services cards: consistent padding and baseline alignment between numbered cards (01–04) and the "Eight more" plus-icon cards.
- No collision or overlap observed between headings, subtitles, and adjacent UI elements (sliders, pills, badges) in the candidate-score screens.

## Pre-existing / not in scope
- Small metadata row on the article page (byline/date under "Designing for trust") is tiny gray text — this predates the typography centralization and isn't a scale regression.
- Card micro-copy sizing (e.g. "2 days · Fixed fee · Fixed price") on services is intentionally small utility text, consistent across cards — not a defect.

## Limits of this review
I only read the 10 screenshots provided — no live browser testing, no interaction states (hover/focus), and no check of the other ~68 routes in the site.

**Verdict: pass**, with one minor mobile line-wrap orphan on the Experts H1 worth a quick look, everything else consistent with the intended type scale.
