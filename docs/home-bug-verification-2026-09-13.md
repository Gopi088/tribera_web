# Homepage bug verification

Local branch: `test`. Not deployed or merged to `main`.

References: `sample_data/Tribera-Fix-Handoff (1).docx` and
`sample_data/tribera-home-v59C (3).html`.

The latest request to resolve the full bug list takes precedence where the
handoff says to leave lab notes and expert presentation unchanged. Changes in
those areas are copy and presentation only, not new scoring or coverage data.

## Final checklist

| Item | Resolution | Claude review |
| --- | --- | --- |
| 1 | Hero subtitle shortened to three direct sentences. | PASS |
| 2 | Secondary hero link is "See it live". | PASS |
| 3 | Scroll cue no longer mentions an undefined bar. | PASS |
| 4 | Cue sits with hero copy, separated from logos, linking to `#proof`. | PASS |
| 5 | Caption reads "Three clear it. Five don't." | PASS |
| 6 | Payoff reads "Three to interview. Evidence to decide." | PASS |
| 7 | Lab introduction explains why role priorities change fit. | PASS |
| 8 | Brief notes explain strengths and gaps using existing scores. | PASS |
| 9 | Footer promises to adjust the assessment to match priorities. | PASS |
| 10 | Expert heading explicitly refers to the user's requirements. | PASS |
| 11 | Seventeen roles displayed individually under four named groups. | PASS |
| 12 | Short case introduction; separate clarification of five introductions. | PASS |
| 13 | CV screening explicitly connects 126 CVs to 40 HR interviews. | PASS |
| 14 | Stable pool label: "From 126 candidates sourced for this role". | PASS |
| 15 | Hiring team named explicitly, including in the time estimate. | PASS |
| 16 | Workflow heading breaks between its two sentences. | PASS |
| 17 | Exactly three red hero accents. | PASS |
| 18 | Scroll-triggered drawing and stagger restored; reduced-motion/no-JS fallbacks retained. | PASS |

## Protected exclusions

- Preserve 126 sourced, 40 HR interviews, 14 technical interviews, five qualified, two hired.
- Preserve normalised importance percentages and existing scoring logic.
- Retain the existing 32-hour estimate; do not import the sample's 38-hour calculation.

## Verification

Claude reviewed source, references and desktop/mobile screenshots, first flagged
remaining issues, then re-reviewed the corrections and returned all 18 PASS.
It did not execute browser tests. Animation verification is based on source and
the automated tests executed locally, not on static screenshots.

Local checks passed:

- `home-handoff.test.mjs`: four widths, copy, cue spacing, counts, lab reset,
  percentage normalisation, animation, reduced motion and no-JS fallback.
- `funnel-stages.test.mjs`: three widths, stage labels, square counts, hover and keyboard linking.
- `experts-layout.test.mjs`: four widths, all 17 roles and keyboard disclosures.
- `work-layout.test.mjs`: six widths, flow geometry and section left alignment.
- `hero-layout.test.mjs`: six viewport sizes, height, typography and overflow.
- `home-audit.test.mjs`: seven widths, page structure, CTA intents, thresholds and no-JS fallback.
- Astro check: zero errors, zero warnings, 145 hints.
- Targeted ESLint and Prettier checks.

Browser tests used `http://127.0.0.1:4331`, explicitly supplied via
`TEST_BASE_URL` for suites whose default port differs. Hero screenshots wait for
scroll position zero; section screenshots hide the sticky nav only during capture.

Optional aesthetic observations are not part of the original bug closure:
the thesis heading can orphan "bar" at desktop width, and the first two funnel
tiers have similar grey values. No unsupported expert-tenure or evidence claims
were imported from the sample.
