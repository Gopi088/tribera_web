# Batch 1: Shared Foundation Pilot

Status: pilot verified; full shared-foundation adoption/review still in progress.

## Changes

- Shared editorial heading adopts hiring-page scale and semantic attribute forwarding.
- Shared button uses the red pill/quiet link pattern with focus, touch and reduced-motion support.
- Section forwards semantic attributes; eyebrow uses the hiring label scale.
- EvidenceCard and SectionHeader prepared for later template migration.
- Candidate score heading is the first shared-heading consumer. Copy unchanged.
- Navigation test now waits for stylesheet loading before font/geometry measurement.

## Verification

Candidate layout passed at 320, 390, 768, 1000, 1520 and 1920px before recovery.
Foundation/navigation rerun after recovery: 12 tests passed; nine navigation widths.
`git diff --check` passed. Full repository check is not green; see batch 0.

Before: `/tmp/tribera-site-style/baseline/candidates-{390,1520}.png`.
After: `/tmp/tribera-site-style/batch-1/candidates-{390,1520}.png`.
Review also used `/tmp/candidate-reviewed-score-390.png` and
`/tmp/style-audit-hiring-trust.png`.

## Claude Review

Initial broad request exhausted its turn limit. A bounded read-only visual/copy
review completed; raw response: `/tmp/site-tranche-claude-batch1-retry.txt`.

Claude found no blocking heading-migration regressions. Full-page before/after
height and section rhythm matched. Full-page images were downscaled, so this does
not certify pixel-level type differences or the unused primitives.

Pre-existing candidate findings retained for batch 4:

- Medium: rename ambiguous "Consumer scale" to a clearer team archetype.
- Medium: measure and improve leading-priority border contrast if insufficient.
- Medium: give "Weighted score, not a ranking" more readable prominence.
- Low/medium: assess whether the score indicator resembles a draggable control.
- Low/medium: clarify the repeated mobile score while preserving sticky feedback.
- Low: explain zero-weight dimensions and reduce values/importance/weights terminology drift.

Optional red heading underline is not adopted: red is restrained emphasis, not a
mandatory decoration on every heading. Mobile score repetition serves the existing
sticky-feedback requirement and must not be removed without interaction testing.

This is not whole-site sign-off. New primitives still need review in their actual
consumer contexts; batches 2-8 remain pending.
