# v60 Homepage and 50-Row Bug Reconciliation

Latest follow-up: `v60-review-followup-2026-09-14.md` and
`v60-review-final-evidence-2026-09-14.md` record the fresh-review fixes, final
eight-suite production run, Claude approvals and refreshed workbook evidence.
They supersede earlier layout/readiness verification details below.

## Sources and Precedence

- Latest sample: `sample_data/tribera-home-v60 (2).html`.
- Latest handoff: `sample_data/Tribera-Fix-Handoff (2).docx`.
- Latest workbook: `sample_data/Tribera-Website-Bugs-Reviewed (2).xlsx`, Sheet2, rows 2-51 (50 entries).
- Current row-level record: `docs/excel-bug-status.json`. Original issue descriptions, recommendations and statuses are preserved.

The handoff says **copy and structure only**, explicitly protecting the lab model,
funnel interactions, experts, testimonials and pricing. The workbook contains
more specific copy fixes than the sample; those fixes take precedence. Source
HTML is not imported wholesale: doing so would restore known bugs and unsupported
claims. Owner/legal gates and the previously protected 32-hour estimate remain.

The sample and workbook directly conflict on R7 and R11: the HTML contains the
very sentences the workbook asks to replace. The workbook replacements are used.
R9 updates only the default note, on the server and client, not the model or other
preset notes. R49 is optional in the workbook but explicitly requested in the
handoff and the owner's request for the complete sample structure.

## Section-by-Section Disposition

| Area                     | Disposition                                                                                                                                                                                                                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Shared navigation/footer | Retained production shell, stable fonts, tracked forms, real routes and hover fixes. Sample navigation is not a replacement application shell.                                                                                                                                            |
| Hero                     | Latest definition of the bar; existing headline, primary CTA, See it live secondary link and cue target retained. Exactly three red squares, real SSR 36-hour value.                                                                                                                      |
| Logos                    | Same eleven approved sample names, shared with About and Candidates; no removed clients restored.                                                                                                                                                                                         |
| Intro strip              | Removed as explicitly instructed. Definition now appears in the hero.                                                                                                                                                                                                                     |
| Thesis                   | v60 heading/body and underlined payoff styling; payoff uses R7 replacement, not the stale sample wording. Plain resume retained; balanced wrapping and explicit build-safe spaces.                                                                                                        |
| Lab                      | Latest sample explanatory lead plus R8 conclusion, R9 default note and R10 footer. Candidate, nine scores, four briefs, weights, sliders, formula, bands and other notes unchanged. Scoring explanation and scale caveat retained. Sample-only evidence quotes and controls not imported. |
| Funnel                   | Moved directly after lab, before experts. Latest R14-16 labels; concise existing case context retained per R13. Sequence 126/40/14/5/2, shuffled squares, hover/keyboard behavior and protected 32-hour estimate retained. No 38-hour or all-five-hireable claim imported.                |
| Experts                  | Latest R11 heading and explicit R12 four-group clarification; existing seventeen roles, expertise and industry inventory preserved. No numeric tenures or CV-only method claims restored.                                                                                                 |
| Work                     | Five-step flow and line break after bar retained. Existing evidence-checking and hiring-decision wording retained instead of unsupported hundred-check and hire-one assurances.                                                                                                           |
| Savings                  | Restored sample section framing and Time/Cost/Effort structure in the existing benefits slot. Retains 36-hour shortlist and one-call/three-name messages. No invented baseline, five-wasted-round claim, percentage graphic or no-reopening guarantee. Old benefits anchor retained.      |
| Ways                     | Sample heading adopted; approved pricing, ranked-list descriptions and hiring choice retained per handoff. No never-a-percentage claim.                                                                                                                                                   |
| Coverage                 | Restored standalone sample-position section between ways and testimonials. Coverage confirmed on first call. All seventeen roles retained, not the sample's fourteen. Shares role data with experts.                                                                                      |
| Testimonials             | Existing three genuine quotes and static accessible layout retained per handoff; no duplicated marquee.                                                                                                                                                                                   |
| Trust                    | Existing four-card human-review/evidence/criteria/data-terms section retained. No invented adverse-impact audits, consent logs, transcript quotes or DPDP compliance assertions. Legal gates R34/R37 remain.                                                                              |
| Closing CTA              | Latest sample body restored; production contact intents and routes retained.                                                                                                                                                                                                              |

Order: hero, logos, thesis, lab, funnel, experts, work, savings, ways, coverage,
testimonials, trust, closing CTA. Two consecutive dark sections (lab/funnel) are
intentional in v60; the old separating-experts assertion is superseded by this order.

## Row Verification

The JSON manifest is the authoritative one-entry-per-row record. Home copy rows
have exact rendered assertions in `tests/v60-copy.test.mjs`; layout, animation,
no-JS and numerical invariants are checked in `tests/home-handoff.test.mjs` and
`tests/home-audit.test.mjs`. Broader rows are covered by `reviewed-bugs`,
`client-publication`, `reviewed-route-audit` and `built-links` tests.

Experts now describes four specialisms with visible interview-focus text. The
seventeen-role inventory appears once in Coverage, not in both sections. The
funnel lead no longer repeats counts; both demos use visible disabled states and
static explanations until initialization succeeds. Unknown build contexts now
fail closed to noindex; actual deployment verification remains pending R20.

R44 now uses the workbook's explicit six-to-eleven wording in the assessment
article and Services. It does not alter either demo's dimensionality or formulas.
R39 now uses the exact Browse by industry label with /industries destination.
Coverage-checkpoint rows are not labelled as product bug fixes.

## Verification Progress

- Astro: 242 files, zero errors, zero warnings, 141 advisory hints.
- Homepage dev regression: 320/390/768/1520px, animation and no-JS passed.
- Expanded home audit: 320/390/640/768/900/1520/1920px, layout, forms opened but not submitted, threshold boundaries and no-JS passed.
- Built links: 77 HTML pages, 6,621 internal links; seven article reading times, number format, robots and sitemap checks passed. External URLs and fragments are excluded from this link checker.
- Workbook updater: generalized to the latest 50 rows; six preservation/refusal tests passed. Original A-E and source F are retained, and unrelated ZIP parts are byte-preserved.
- Production-preview suite: all seven suites completed with exit code 0 after fixing compressed whitespace, candidate control readiness and the blocked-script test. Includes home-audit as well as the exact copy, funnel, broader widget, client and detail-route checks. See `v60-verification-evidence-2026-09-14.md`.
- Claude: all 50 proposed dispositions ACCEPT; the four initial evidence rejections are resolved. Pending means pending, not factual or legal sign-off. See `claude-v60-final-review-2026-09-14.md`.
- Workbook updated and validated: 33 Verified (local), 1 Verified - existing, 1 Reviewed - no defect, 7 Reviewed - coverage, 4 Pending - owner, 2 Pending - legal, 1 Pending - deployment, 1 Deferred - enhancement. Original preserved in `sample_data/Tribera-Website-Bugs-Reviewed (2).before-status-update.xlsx`.
- Additional review fixes: unsupported quantified-method/hireability wording removed from Functions index; hero cue moved to the lower edge with 60-100px clearance; funnel context shortened; candidate brief buttons disabled until handlers attach. All checked against the production build.

## Unresolved Gates

These are not fixed by a sample or by rendering tests:

- R20: production deployment indexing/canonical/sitemap verification. Keep staging noindex.
- R23: commercial restart guarantee and engagement scope require owner confirmation.
- R28: named expert identities, claims, publication consent and guarantee alignment require owner confirmation.
- R29: exact registered address and operating offices require authoritative owner input.
- R33: Intelligence figures and About's interview-volume claim require underlying data and methodology.
- R34: privacy policy requires actual data-practice details and counsel review.
- R36: optional security/trust expansion requires verified controls; not an existing defect.
- R37: terms liability, jurisdiction and effective dates require counsel.

No commit, push, merge, deployment or real form submission is part of this work.
