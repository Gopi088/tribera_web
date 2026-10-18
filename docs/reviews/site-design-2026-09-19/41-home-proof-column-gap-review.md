# Visual Review — Homepage Proof Section Spacing

## Verdict: **PASS**

The implementation matches the stakeholder's stated geometry. Every claim in the summary reconciles with the CSS and the measured JSON, with one wording correction (below) that is not a blocker.

---

## Measured verification of the stated contract

**CSS confirmed as described** (`sample.css`):

- L30–31: `--wrap: 1160px`, `--pad: clamp(22px, 5vw, 72px)`; L66–70 applies these to `.wrap`.
- L878–881: `.proof .wrap { display: block; max-width: 1280px; }` — the only width override.
- L2354–2358: `.lab-grid` = `1.04fr 0.96fr` at ≥900px — **original proportion preserved**.
- L2431–2437: at ≥1200px, `.proof .proof-head` and `.proof .lab-grid` share `1.04fr 0.96fr` + `column-gap: clamp(60px, 5vw, 72px)` — **shared gap, as described**.
- No later rule re-declares `.proof .wrap`, `.lab-grid` columns, or the gap (checked through L3150). Cascade is clean: the ≥1200 block is both later in source _and_ higher specificity (`.proof .lab-grid` beats `.lab-grid`), so no fragility.

**Arithmetic reconciles exactly.** At 1440: content = 1280 − 144 = 1136; 1136 − 72 gap = 1064; 1064 × 0.52 = **553.28** and × 0.48 = **510.72** — matching the measured `553.266px / 510.719px`. The fr ratio is mathematically intact, not approximated.

**Did the card shrink anywhere?** No. Comparing measured new values against old values I derived from the pre-change formula (my derivation reproduces the given 1440 baseline of 511/471/34 exactly, which validates the model):

| Viewport | Old card (derived) | New card (measured) | Δ card  | Old gap | New gap | Δ gap |
| -------- | ------------------ | ------------------- | ------- | ------- | ------- | ----- |
| 1199     | 525                | 545                 | **+20** | 31      | 31      | 0     |
| 1200     | 525                | 530                 | **+6**  | 31      | 60      | +29   |
| 1280     | 519                | 566                 | **+47** | 33      | 64      | +31   |
| 1440     | 511                | 553                 | **+42** | 34      | 72      | +38   |

The card is **larger than before at every viewport ≥1160**, and the gutter more than doubles at the reference widths (34 → 72 = 2.1×). This is the requested fix method — widen, then separate — not a manufactured gutter. Control column likewise grows (471 → 511).

**Overflow/errors:** `overflow: false`, `errors: []` at all eight widths. `rightRailAligned: true` at all eight.

---

## The 1200 breakpoint is visually sound

I verified rail alignment independently rather than trusting the flag. The right rail's start position:

- At 1199: head = 1031 × (1.05/2.05) + 48 = **576.0**; lab = 1048 × 0.52 + 31 = **576.0**
- At 1200: head and lab both = 1020 × 0.52 + 60 = **590.4**

The pre-existing sub-1200 design already tuned its two different gap clamps so the head and lab rails coincide; the ≥1200 block achieves the same by unifying both fractions and gaps. **Alignment holds on both sides of the breakpoint** — the change introduces no new misalignment, and above 1200 the h2 column now shares the card's exact edges (visible in `wider-1440.png`: heading and card left edge both at x≈152).

The crossing itself snaps the card 545 → 530 and the gap 31 → 60. _Judgment:_ acceptable. It is a ~2.8% transient visible only while dragging a window across one pixel of viewport, it is not a regression against the old design at either width (both are larger than before), and it self-corrects by ~1233px where the new card overtakes the old 1199 value.

---

## Visual assessment of the captures

**Separation (judgment): resolved.** In `before-1440.png` the card's right edge sits at x≈722 with the control rail's text starting at x≈758 — roughly 36px, and the numerals in the right-hand tiles ("Detection 5", "ML pipeline 5", "Data access 2") crowd directly against the slider-row labels. In `wider-1440.png` the card ends at x≈705 and the rail begins at x≈776, giving a clean, unambiguous channel. The two halves now read as two panels rather than one collided block.

**Card is not undersized (judgment): improved.** Internal tiles widened (e.g. "Systems built" ≈253px vs ≈230px). Since `.lt i` (L2584–2592) uses `text-overflow: ellipsis`, the extra width reduces truncation risk on the longer labels. The score block, verdict track and axis labels all scale cleanly with no crowding.

**1024 (judgment): correctly untouched.** `wider-1024.png` shows the pre-existing 27px gutter and 465/430 columns. Because the global wrap never binds below 1160px, the `max-width: 1280px` override is inert here — this is genuinely unchanged behavior, as intended. Layout is intact, sliders and percentages fit, rail aligned.

---

## Non-blocking findings

1. **The summary's "preserves the existing narrower behavior below 1200px" is imprecise.** `max-width: 1280px` is unconditional, so it also takes effect between **1160–1199px**, where the section goes full-width instead of capping at 1160. Measured at 1199: `wrapOuter: 1199, contentLeft: 60` — sibling sections would start at ≈79.5. That is a **cross-section step-out of up to 19.5px per side**, tapering to 0 at 1160, _without_ the compensating wider gutter (which starts at 1200). Benign in practice — the card is still larger than before and nothing overflows — but the band is worth knowing about, since a 1200px display with a scrollbar lands inside it (~1183px).

2. **Page balance is directionally right but unverified at the seam (judgment).** At ≥1280 the proof content is 1136px wide against siblings' 1016px — a deliberate **60px-per-side step-out**. Because `.proof` is a full-bleed dark slab, the background edge doesn't shift and the step-out is contained within a visually distinct band, which is a normal editorial device. However, **none of the three captures includes the boundary with the section above or below**, so I cannot measure whether an adjacent heading's left edge now visibly disagrees. The stakeholder explicitly asked for the widening, so I accept it — but one full-page capture spanning the seam would close the last evidence gap.

3. **A wider void has opened inside the control rail (judgment, minor).** `.row` (L2648–2655) is `16px 1fr 116px 44px`, so the entire +40px of right-column growth goes to the label column while the slider stays fixed at 116px. Measured in the captures, the empty channel between the longest label and the track grows from ≈107px to ≈153px. It is bounded (the rail caps at 511px above 1280) and the sliders remain a clean right-aligned column, so it reads as airy rather than broken — but letting the slider column grow slightly would tighten it.

4. **Style nit:** `1280px` is hardcoded rather than derived from `--wrap` (e.g. a `--wrap-proof` token or `calc(var(--wrap) + 120px)`). If the global wrap is ever retuned, this section will silently drift.

---

**Bottom line:** the fix follows the intended geometry — the content area widened first, both columns grew, and the gutter more than doubled without any card shrinking at any viewport. No overflow, no errors, no cascade risk, and rail alignment survives the 1200 breakpoint. None of the four findings is a concrete blocker. **PASS.** No files were modified.
