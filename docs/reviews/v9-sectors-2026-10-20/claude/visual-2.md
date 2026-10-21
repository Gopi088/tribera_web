Healthcare & life sciences also matches structurally — hero, stat callout, comparison panel ("Product & SaaS" selected, consistent chart layout), three-things/three-questions cards, roles/guarantee block, FAQ, CTA, footer all present with no missing sections or illustration gaps.

## Stage 1 Review — Desktop (1366px) Full-Page Comparison

**Images actually read** (reference vs. chromium candidate, both full-page 1366px):

- `industries-cybersecurity-1366.png`
- `industries-enterprise-technology-1366.png`
- `industries-global-capability-centers-1366.png`
- `industries-healthcare-life-sciences-1366.png`

### Per-route verdicts

| Route                                | Verdict          | Notes                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| industries-cybersecurity             | ACCEPT (stage 1) | Full structural match: hero, bar chart, sector-comparison panel, "Three things a CV can't tell you" cards, "Three questions" cards, roles/guarantee block, FAQ, CTA, footer. Only difference seen is FAQ expand-state (reference shows Q2/Q3 expanded, candidate shows only Q1), which is the documented intentional reference-capture behavior. |
| industries-enterprise-technology     | ACCEPT (stage 1) | Same structural match. Chart comparison panel correctly shows "Pharmaceutical" as the selected comparison sector for this route (sector-specific chart state confirmed working, not a generic/static image).                                                                                                                                     |
| industries-global-capability-centers | ACCEPT (stage 1) | Same structural match, chart panel shows "Pharmaceutical" comparison correctly selected for GCC.                                                                                                                                                                                                                                                 |
| industries-healthcare-life-sciences  | ACCEPT (stage 1) | Same structural match, chart panel shows "Product & SaaS" comparison correctly selected for healthcare.                                                                                                                                                                                                                                          |

### Findings

No confirmed defects at this resolution. No missing sections, no obviously broken illustrations, no collapsed/overlapping layout, no missing charts across all four routes.

### Limitations (explicit)

- These are full-page screenshots downscaled roughly 3.3x for display (e.g., 1366×6590 shown at ~415×2000). Body-text copy at the paragraph level is at the edge of legibility; I did not attempt to verify exact wording beyond headline/section-label level, per instruction not to infer unreadable text from downscaling.
- FAQ expand/collapse state (which specific row shows "+" vs "−") could not be confirmed pixel-for-pixel for all three rows on every route at this resolution — I'm reporting the clearly legible pattern (reference fully expanded, candidate first-only) as it appeared for cybersecurity; this is consistent with the documented intentional difference, not a new finding.
- Static screenshots cannot confirm animation/motion behavior (chart draw-in, staggered arrivals, reduced-motion handling) — that would require inspecting the archived browser-chain evidence separately, which I have not done in this stage.

**Stage 1 verdict for all four routes: ACCEPT**, bounded to this desktop-layout/section-completeness check only. This does not constitute full acceptance of the 14-page private preview — only these four routes at 1366px were reviewed in this stage.

Let me know if you'd like me to continue with the remaining 10 industry routes, mobile widths, or the Intelligence page next.
