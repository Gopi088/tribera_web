# Corrected Typography Verdict

My earlier recommendation to "preserve rem values" was wrong. Because layout roots differ (15px on Home/Candidate/About mobile vs 16px on standalone Services/Contact), identical rem tokens do **not** produce identical visible text — e.g. `0.784rem` renders 11.76px on one route and 12.544px on another at the same 390px viewport. Source-equal is not visually equal, and a fix that only harmonizes rem values without accounting for root differences would leave the complaint (visibly inconsistent text across pages) intact.

I also incorrectly proposed fixing a benefits `h3` selector — that selector is dormant; the actual rendered nested benefit headings are `H4` at 18.4px desktop. Editing an unused rule changes nothing visible.

This review covers 8 representative routes (Home, Candidate, About, Services, Contact, Careers, Blog, Footer/global) and is a design recommendation, not a compliance audit — measurements below are observations from markup/CSS inspection, not automated or browser-verified.

## What's actually inconsistent (measurements, not proposals)

| Role                                                                                 | Observed                                                               | Problem                                                                                                                 |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Ordinary body paragraph                                                              | 13.5px (Home/Candidate compact) vs 16px (feature)                      | Two unlabeled tiers for what reads as the same role                                                                     |
| Card/section headings                                                                | Home Ways 24 vs Trust 17.6; Candidate Conversation 24 vs Controls 17.6 | Same semantic role (explanatory marketing card heading), different sizes — not a deliberate hierarchy, looks accidental |
| Testimonial quotes                                                                   | Fixed 16px                                                             | Stable, but a naive `1rem` token swap would regress it to 15px on 15px-root pages                                       |
| Contact field caption                                                                | 9.5px actual (not the 16px label container)                            | Below comfortable microcopy floor                                                                                       |
| Contact input/placeholder                                                            | 15.5px                                                                 | Fine                                                                                                                    |
| Candidate label / input                                                              | 14 / 16px                                                              | Inconsistent with Contact's 15.5px input                                                                                |
| Critical microcopy (first-shortlist promise, "Choose a brief" label, Importance tag) | 8.88 / 8.7 / 9px                                                       | Too small — these are explanatory, not decorative metadata, and shouldn't be exempted by calling them "labels"          |
| Footer                                                                               | 14.5 body / 10 heading / 10.5 location                                 | Internally stable, but the two 10px sizes are below a defensible floor for a persistent global element                  |
| Form button (Candidate)                                                              | 14px                                                                   | Inconsistent with other primary actions                                                                                 |

## Proposed coherent scale (roles, not just tokens)

Root sizes and nav/logo geometry stay untouched, per requirement. This is a _role_ system — routes with a 15px root and routes with a 16px root should each compute to the same **visible** pixel targets below, meaning their rem values will legitimately differ between root contexts. That's the fix: stop assuming shared rem = shared appearance.

- **Body (ordinary explanatory text):** 16px — collapse the 13.5/16 split; compact tiers should be a deliberate, named exception, not a byproduct of nesting.
- **Compact helper/support text:** 14px floor — this covers current 13.5px, Candidate labels, and similar secondary copy. Nothing explanatory drops below this.
- **Card/section headings (explanatory marketing cards):** standardize the smaller tier (currently 17.6) up to ~18–20px, or make 24 vs 17.6 an explicit two-level pattern (e.g., "feature heading" vs "sub-feature heading") applied consistently everywhere instead of ad hoc per component.
- **Primary actions (buttons):** 16px, matching input text — resolves Candidate's stray 14px button.
- **Secondary actions/links:** 14px.
- **Form labels:** 14px (matches Candidate; bring Contact's caption up from 9.5px to this floor).
- **Form inputs:** 16px (matches Candidate; bring Contact's 15.5px up to align, avoids iOS zoom-on-focus thresholds as a bonus).
- **Table/data text:** 14px.
- **Small labels/tags (Importance, brief-selection, promise microcopy):** raise from 8.7–9px to a 12px floor — these carry real explanatory meaning and shouldn't be miniaturized to metadata scale.
- **Quotes:**
  - Testimonials: keep fixed 16px (do not fold into a `1rem` token that would regress it on 15px-root pages).
  - Narrative pull quotes: keep as a deliberately larger, separate role (no change).
- **Footer:** body 14.5→15 (round to the new compact floor), heading 10→12, location 10.5→12 — footer text is persistent and global, so it shouldn't sit below the 12px small-label floor either.

## Key principle for implementation (when it happens)

Any fix must set target **pixel appearance per role**, then derive rem per root context (15px vs 16px), rather than copying one rem value everywhere and assuming equivalence. Compact/small roles are fine to keep distinct from body text, but only for genuinely secondary content — not for microcopy that communicates essential information to the user (shortlist promise, brief selection, importance indicators).
