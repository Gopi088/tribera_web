**PASS**

Measured facts:

- Diff is a single, scoped addition: `.hero h1 + .hero__p { margin-top: 18px; }` in `TopicIndex.astro`. No type-scale, filter-chip, or content changes, matching the stated intent.
- The selector uses an adjacent-sibling combinator, so it only fires when `.hero__p` directly follows the `h1` — no leakage to other blocks.

Screenshots:

- 1520px: eyebrow → h1 → dek → chips read as a clean four-step descent; the dek is clearly closer to the h1 than to the chip row, so hierarchy groups correctly.
- 390px: the two-line dek wraps without crowding the h1, and the chip rows below keep visible separation. No clipping, no overflow, no horizontal scroll.

Judgment: spacing now reads consistently with the specialist hero, and mobile fit is fine. No correction needed.
