# Homepage Flow Trial

User-approved experiment following `homepage-flow-review-2026-09-14.md`.
This is not a launch approval or a replacement of the original bug spreadsheet.

## Structure

Current user-approved correction: hero/logos -> white thesis -> dark lab ->
white workflow -> paper experts/role coverage -> dark case funnel + benefits -> white engagement
options -> compact paper assurances -> dark testimonials -> short white CTA.

- The workflow follows the demonstration of the bar, before expert coverage.
  The earlier workflow-first trial was rejected. Its shared-chapter divider and
  reduced top padding are removed; workflow uses normal section spacing and a
  top-aligned heading/lead. Hero sizing is unchanged by this correction.
- Page-height measurements below predate the hero and order corrections and
  should not be treated as measurements of the current layout.
- The original 17 roles are grouped under their four specialisms in native
  details/summary disclosures. They remain server-rendered and work without JS.
  Each closed summary shows one concrete role plus the remaining count, so
  visitors can see the breadth without expanding every group.
- The old #cover, #savings and #benefits anchors remain in their merged chapters.
- The workflow distinguishes recruitment's three-person shortlist from the
  existing-pipeline ranked list. Approved engagement/pricing cards are unchanged.
- Case benefits now follow case evidence; the closing CTA no longer retells the
  full pitch. Paper colour, fonts, red accents and existing cards are retained.
- Lab/funnel data, formulae, interactions, client names and testimonials remain
  unchanged. Existing factual, legal and deployment gates remain open.

## Verification

The first trial passed all eight production browser suites. After Claude's
finishing feedback, the final development home-audit and experts-layout checks
passed, including the retained benefits anchor's fixed-header clearance.
Final Astro check: 242 files, zero errors/warnings (141 advisory hints).
Targeted ESLint and formatting passed. Final production build passed (76 pages).
All eight production browser suites passed against that final build, including
JavaScript-disabled fallbacks, linked funnel highlighting, keyboard disclosures,
client content, and all 34 detail routes at mobile and desktop widths.
Built-link audit passed: 77 HTML files, 6,621 internal links (external URLs and
fragments excluded from that audit; legacy benefits anchor tested separately).

Claude's follow-up found no blockers and judged the result suitable as a
reversible user design trial. Minor disclosure-row alignment, tablet footer
spacing, typography and additional test-coverage suggestions remain optional
follow-up notes, not completed fixes. See
`claude-homepage-flow-trial-final-2026-09-14.md` for the independent review.

Final evidence logs: `/tmp/tribera-flow-trial-final-{build,preview,astro,eslint,links}.log`.
The rollback patch was regenerated after the finishing changes and its reverse
check passed. User acceptance of the new flow and all existing owner gates remain
pending.

## Reversibility

Follow-up: the hero viewport correction adds a wrapper for the hero and client
strip, removing the 760px height cap. Desktop now fills the viewport below the
65px shared navigation; mobile remains content-led. This supersedes the hero
geometry and rollback patch recorded below. Do not apply that older patch blindly
after this follow-up. `tests/hero-viewport.test.mjs` covers seven screen sizes,
short-screen content safety, and JavaScript-disabled layout.

Only Home.astro and four homepage test files are changed by this trial. Their
exact pre-trial versions, including earlier uncommitted work, are stored under
`/tmp/tribera-flow-trial-baseline/`. The trial-only unified diff is
`/tmp/tribera-flow-trial.patch`; `git apply --reverse --check` passed against it.
Do not reset the entire worktree to undo this experiment.

The Excel workbook remains the accepted pre-trial baseline until the user decides
to keep this narrative. No commit, merge, push or deployment is included.
