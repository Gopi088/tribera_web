# Fresh Review Follow-Up

Implements the actionable findings in `claude-v60-fresh-review-2026-09-14.md`.
This report supersedes earlier descriptions of the duplicated expertise/coverage
inventory, funnel intro and script-readiness behavior. Earlier review logs remain
historical evidence, not evidence for this revision.

## Dispositions

| Finding                      | Change or disposition                                                                                                                                                                                                                               |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Payoff wrapping           | Widened the measure to 30ch and moved the nonbreaking space inside the underlined phrase. Added glyph-position assertions: no line starts with a dash, and 390/1520px have two lines.                                                               |
| 2. Mobile coverage           | Replaced wrapping flex with a responsive grid: one aligned role per row on narrow screens. Added geometry assertions.                                                                                                                               |
| 3. Repeated coverage/copy    | Experts now shows the four specialisms and their interview focus; the complete 17-role inventory appears only in Coverage. Removed the repeated confirmation sentence and repeated funnel-close qualification sentence.                             |
| 4. Funnel intro              | Removed the 126/five summary from the lead, leaving role context above the visual. Regression rejects repeated counts in that lead.                                                                                                                 |
| 5. Candidate readiness       | Disabled controls have dashed borders, reduced opacity and a not-allowed cursor. A server-rendered static-example explanation remains visible until handlers attach, including CSP-blocked scripts.                                                 |
| 6. Home readiness            | Presets and sliders now ship disabled, with the same static-example explanation. Enabled only after event handlers and initial calculation succeed.                                                                                                 |
| 7. Indexing                  | Unknown or empty build contexts now default to noindex. Indexable releases require explicit CONTEXT=production; Netlify preview hosts and route-level exceptions remain noindex. R20 still requires deployed robots/canonical/sitemap verification. |
| 8. Evidence citations        | Added actual rendered career-card city assertions and both demos' scale/comparability caveat assertions to reviewed-bugs.                                                                                                                           |
| 9. Workbook preservation     | Removed fixture replacement of real review verdicts. New test validates the real manifest and compares the current workbook with the original backup, including A-E XML, original status in L and unrelated ZIP parts.                              |
| 10. Unsupported claims guard | Widened the Functions assertion from .steps to body.                                                                                                                                                                                                |
| 11. Accessible marquee       | Second copy is aria-hidden; the named track has role=group. Tests require eleven unhidden DOM copies, eleven hidden copies, and each client name exactly once in the ARIA snapshot.                                                                 |
| 12. CTA consistency          | Closing secondary CTA now says Book a demo, matching the existing shared modal without changing other pages' modal naming or submission intents.                                                                                                    |
| 13. Apostrophe glyphs        | Optional typography suggestion, not a behavioral defect. Retained existing ASCII contractions and original testimonial punctuation; no site-wide punctuation migration in this bug pass.                                                            |
| 14. Case provenance          | Still pending R33 owner evidence. Counts are not estimates merely because the time saving is estimated: changing their labels to estimated would invent a methodology. No factual sign-off or new guarantee added.                                  |
| 15. Minor checks             | Added Coverage to heading-alignment sweep; removed empty media query; wrapped the article edit; capped desktop hero minimum height at 760px and added a bound on the gap above the cue.                                                             |

The seven owner/legal/deployment gates remain open. R34 also needs disclosure
review for the existing per-score transcript-traceability claims. The approved
client list is based on the owner's explicit instruction in this thread to match
the sample, not independent publication-consent verification.

## Verification

- Production build: 76 pages built, exit 0. Astro: 242 files, zero errors, zero warnings, 141 advisory hints.
- Production preview: eight suites passed, exit 0. Home geometry/copy/animation and score thresholds; expertise/coverage; funnel interactions; enabled/disabled/CSP-blocked controls; clients; 34 detail routes at 390/1520px.
- Experts suite rerun after replacing its obsolete disclosure loop with an explicit always-visible assertion; four widths passed.
- Built links: 77 HTML files and 6,621 internal links resolve; all seven article reading times match.
- Workbook: seven tests passed, including original-backup preservation and real-manifest review gates.
- Targeted ESLint and git diff --check passed.
- Screenshots inspected: /tmp/handoff-thesis-{390,1520}.png, /tmp/v60-cover-390.png, /tmp/v60-hero-1520.png. Payoff two-line wrapping and single-column mobile roles confirmed visually.
- Logs: /tmp/tribera-review-followup-{build,astro,preview,experts,links,workbook,eslint}.log.

Claude approved findings 1-12 and 15; see `claude-v60-followup-review-2026-09-14.md`.
The optional punctuation choice and pending case-provenance gate were retained.

## Final Polish After Review

- Removed the dangling Coverage label from the expertise clarifier and added space below it.
- Static sliders now describe what importance means; only successful initialization changes the instruction to Adjust the sliders.
- Added regressions against repeated coverage confirmation and repeated funnel-close qualification text.
- Shortened the payoff underline to account for the trailing nonbreaking space.
- Added an actual ARIA snapshot check for one occurrence of each client name, beyond DOM attribute counts.

Final production rebuild and all eight suites passed after this polish. See
`v60-review-final-evidence-2026-09-14.md` for the final-tree log. Claude accepted
the polish; see `claude-v60-polish-review-2026-09-14.md`, including the targeted
clarification of the prose reference and underline selector.

Affected Excel outcomes/evidence and review references were refreshed without
changing any original issue, recommendation or pending-gate status. Post-write
validation and all seven workbook tests passed, including comparison with the
original backup. Counts remain 34 verified, 8 review-only/coverage entries,
7 pending gates and 1 optional enhancement. No merge, deployment or real form submission.
