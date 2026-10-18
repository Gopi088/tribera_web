# Claude Follow-up: Homepage Flow Trial

Read-only source and screenshot review. Claude did not execute tests.
The change-surface comment below concerns the finishing pass; the complete
trial includes Home.astro and four tests, as recorded in the trial document.
Nonblocking refinements remain review notes, not claims of fixes completed.

## Verdict

Suitable as a reversible user design trial. All five finishing fixes are present in `src/components/home/v58/Home.astro`, they are SSR-only (native `<details>`, no new JS, no data or claim changes), and I found no blockers. The change surface stays one component plus the two tests. Two of the five fixes have no regression coverage, and there is one real readability nit in the 768–819px band. Existing factual/legal/deployment gates are untouched by this — nothing here speaks to them.

## What holds up

- **First role + count in all four summaries** (`Home.astro:466-468`) is a better answer to finding 1 than opening Engineering: no group is privileged, the four blocks stay geometrically identical, and the counts (6/5/4/2) communicate depth. The visible set — Software engineering / Finance & accounting systems / Supply chain & planning / Product & design — is a fair spread across specialisms. Accessible name of each disclosure now reads as a role, not "View N roles".
- **Lead de-duplicated** (`452-455`). The review narrative is down from three to two, and the two survivors are in different registers: ownership (`484-486`) vs terms (`631-633`). The "human reviews before shortlisting" claim isn't lost, it now lives only in Trust, which is where the proposal put it.
- **Footer pairing** (`480-486` + `2760-2772`) fixes finding 3 at 1607: both paragraphs sit on one row, top-aligned, right half no longer blank.
- **`#benefits` anchor** (`578`, `.v58-anchor` at `2751-2754`). `.v58-case-benefits` is a plain block, so the zero-height `display:block` span adds no layout. Correct fix for finding 5.

## Findings

1. **Low-medium — disclosure summaries stagger within a row.** `.v58-coverage` cells are top-aligned, so a two-line group heading or focus line pushes its summary down: ~28px offset in row 1 at 1607, ~85px at 768 (Engineering's heading wraps there). The row reads as two unrelated blocks rather than a row. Contained fix: make `.v58-coverage > div` a column flexbox and give `.v58-coverage__detail` `margin-top: auto` so the four disclosures line up per row.
2. **Low-medium — footer breakpoint (820px, `2768`) doesn't match the coverage breakpoint (768px).** Between them, coverage is two columns while the footer stacks full-bleed, and `.v58-experts__confirmation` (`1674-1678`) has no `max-width` — unlike `.v58-experts__note`'s 62ch — so at 768 it runs as a single ~89-character line (visible in `/tmp/experts-grouped-768.png`). Move the footer breakpoint to 768 or cap the confirmation measure.
3. **Low — the "own class" fix is structural only.** `.v58-coverage__instruction` (`2755-2759`) declares exactly the same colour, `400 15px/1.6 var(--v58-ui)` and margin as `.v58-experts__confirmation` (`1674-1678`). The two paragraphs are still typographically identical; only distance and position now separate them. That does defuse the "repeated footnote" read, but if you want the instruction to read as instruction, it should differ (mono/smaller, tied to `.v58-coverage__label`).
4. **Low — dead CSS.** `.v58-experts__coverage + .v58-experts__confirmation { margin-top: 28px }` (`2744-2746`) no longer matches anything; the adjacent sibling is now `.v58-experts__footer`, which sets its own `margin-top: 28px`. Harmless, but it will mislead the next reader.
5. **Low — the summaries are now the most-scanned text in the section and the smallest.** 12px mono muted (`2733-2738`) against a 17px focus paragraph. The 44px min-height and red marker make the affordance clear; the role name itself is the thing worth 13–14px or ink colour.
6. **Low, data not code — `+ 1 more` on Product & leadership** makes the thinnest group's thinness more legible next to `+ 5 more`. Same information as the old "View 2 roles", so no regression, but more prominent in a buyer trial. Also `roles.length - 1` would render "+ 0 more" if a group ever drops to one role.

## Test coverage

- **Covered well:** the summary fix (`experts-layout.test.mjs:61-70`, per-group role match in order, plus keyboard open/close on all four at `71-79`), and the anchor fix (`home-audit.test.mjs:71-73`, asserted at all seven widths).
- **Not covered:** the footer pairing. Nothing asserts the two paragraphs share a row at ≥820px, and 820 isn't in either width list — the geometry assertion at `experts-layout.test.mjs:59` only checks the coverage grid. Finding 3 can silently return.
- **Not covered:** `.v58-coverage__instruction` — no assertion that the instruction exists or is distinct.
- **Weak:** `experts-layout.test.mjs:80` guards `/not a recruiter|without re-checking/`, neither of which is the phrase you removed. Re-adding "reviews the evidence" to the lead would pass. Adding `reviews? the evidence` to that regex would lock fix 2.
- **Weak:** the anchor assertion hardcodes 95–105 rather than comparing against the measured header bottom, so it verifies the CSS value, not clearance. If header height changes, the test stays green while the anchor lands under the nav.
- The summary assertion checks the role substring only, not `+ N more`; a regression that dropped the count would pass.

**Blockers: none.** No JS dependency, no new claims, section order unchanged (`home-audit.test.mjs:22`), no duplicate IDs introduced by `#benefits` alongside `#savings`.
