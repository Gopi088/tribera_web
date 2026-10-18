# v61 Approved Rollout

Changes are being applied individually after owner approval, not as a wholesale
replacement of the current homepage.

1. Hero subtitle: approved and applied, starting "You interview three, not thirty."
2. Supporting statement: approved and applied, ending "the proof behind each one."
3. Built to run: approved and added directly after the funnel, before Ways to work
   with us. Existing section order is otherwise unchanged.

The operations section uses the four v61 items verbatim: 36 hrs, 1 or 50, Your ATS,
and Your panel, or ours. It uses shared section/card/body type tokens, existing
Fraunces and Inter Tight families, brand red metrics and muted body text. The grid
has four columns above 820px and two below, matching the sample breakpoint.

## Verification

- Operations copy, location, typography, clipping and grid tests passed at 320,
  390, 768, 820, 821 and 1520px. Desktop and mobile screenshots inspected.
- Homepage handoff tests passed at four widths, including lab/funnel interaction,
  reduced motion and no-JavaScript fallback checks.
- Hero/customer-strip viewport tests passed at seven sizes.
- Production build passed (76 pages), and the operations tests passed against
  production output. A fresh four-width Home text census added only 24 new
  operations contexts to the typography fixture; existing Home contexts were
  unchanged. The combined inventory check passed with archived non-Home records,
  not a new site-wide crawl.
- The broader homepage audit passed 320, 390, 640 and 768px, then stopped on a
  pre-existing hero-heading overflow at 900px: heading scroll width 560px versus
  available width 540px. Removing the operations section in the browser leaves
  those measurements unchanged. No hero CSS was changed in this step. A separate
  fix requires approval; this audit is not reported as fully passing.

Procurement copy and the signal-wording changes have not been applied in this
step. No commit, merge or deployment requested.

## Approved Hero Follow-Up

The owner subsequently approved fixing the 900px overflow. The desktop nowrap
rule now also releases the heading's 20ch width cap, letting it use its existing
parent width. Font size, copy, explicit line break and hero height are unchanged.
At 900px, heading client/scroll widths now both measure 795px (previously 540/560).
The rebuilt production output passes all 11 hero viewport/no-JavaScript checks
and the complete seven-width homepage audit. The earlier overflow finding above
is resolved. Remaining decisions are collected in
`pending-approvals-2026-09-16.md`.

## Approvals 1-3

The owner approved marketing wording, the procurement band and About/Blog label
font alignment. Contextual replacements were applied to rendered marketing copy
and shared metadata; article text, titles, URLs and technical security-alert uses
were preserved. The 76-route browser check verifies that boundary.

The compact procurement band sits between Results and Start. Pending item 4, it
uses existing data-handling discussion and proposal-pricing copy, not the sample's
DPDP/encryption/retention assurances or free-restart promise. The shared mono font
now covers closing-card labels on About, the Blog index and Blog article pages;
their existing weights, colors and sizes remain unchanged.

The five-width approval tests and seven-width homepage audit passed. A fresh
304-record typography census passed 5,664 explanatory-copy checks. Comparison to
the baseline found only eight new procurement context/width combinations and
32 Blog label-family changes. No other existing text-style changes were accepted.
The compact band spacing was corrected after that census and is covered by a
separate padding assertion; that layout-only correction does not alter text styles.

Items 4-9 remain open for individual review. No commit or deployment was performed.

## v61 Copy Correction

The owner rejected the substitute procurement wording and explicitly instructed
using v61. The paragraph now matches `.proc-line` in the sample verbatim, including
its data-handling assurances and "we go again, at no extra cost" wording. The
regression test compares directly with that sample element. No service-specific
eligibility conditions or policy interpretations were added. This supersedes the
earlier decision to omit those sentences; items 5-9 remain for individual review.

## Approved Section Sequence

The owner approved following v61 for the middle-page sequence: The bar, in
practice -> Nobody shows you the funnel -> Built to run -> The people who make
the call -> How the engagement works. The existing sections were moved intact,
without copy, style or script changes. This supersedes the earlier retained
section order. Coverage/savings consolidation and the later Trust/Results order
remain separate differences for review; this is not a full-page order migration.

The home-handoff and home-operations tests now assert this approved sequence.
The home-audit order assertions were updated too. Local browser verification
passed: handoff at four widths, operations at six widths, and the full homepage
audit at seven widths (320-1920px), including the no-JavaScript fallback.
Formatting and diff whitespace checks passed. No deployment was performed.

## Approved Standalone Savings Section

The owner approved restoring v61's standalone Savings section after Work and
before Ways. The shortened dark funnel benefits block was removed. The new
light-paper section uses the sample's heading, introduction and Time/Cost/Effort
copy, three white cards above 760px, stacked cards below, red metadata labels and
the animated decorative cost bar. The existing shared section typography remains.
The 36-hour counter reuses the homepage counter behaviour; no-JavaScript and
reduced-motion visitors see the final value and cost bar. The legacy `#benefits`
anchor is retained in the new section.

The dedicated home-savings test compares each text element directly with v61,
checks placement, background/card colours and the 759/760px breakpoint, and
checks the count/bar with JavaScript enabled and disabled. It is included in
the reviewed-site runner. No other sample differences are changed in this step.

Local verification passed: Savings at five widths (320, 390, 759, 760, 1520px),
handoff at four widths, operations at six widths, and the seven-width homepage
audit including the no-JavaScript contact fallback. Desktop/mobile savings
screenshots were inspected. Astro reported zero errors and warnings; targeted
ESLint passed.
The production build passed (76 pages). A four-width homepage text census
replaced only the 16 removed savings contexts with 36 restored savings contexts
in the typography fixture; unrelated baseline entries were preserved. This was
not a new site-wide typography audit. No deployment was performed.
