# Site-Wide Alignment Review

Local worktree, 2026-09-08. Not deployed or committed.
Base commit: `f134289`; the worktree includes pre-existing and resumed changes.
Final source-tree checksum (sorted `src` file SHA-256 inventory):
`42a7e8287b50ac8a049e4a74092d8545143849d9e0144c1235de79cbaa41265d`.

## Scope And Outcomes

All 76 public routes retained and included in the route ledger. Hiring-page
typography, color palette, section alignment, card treatment and shared navigation
now cover services/intelligence, coverage, company/contact, careers/candidate
onboarding, blog/topics, legal/security and 404. Decap CMS is intentionally excluded.

Beyond presentation: careers roles render without JavaScript; careers filters,
services controls, blog filters and contact submission work; function example weights
total 100 and share one source; candidate upload labels are readable in both states.
Published articles, testimonials and legal substance were retained. The terms
disclaimer heading received punctuation-only cleanup.

## Verification

- Production build retains 76 public pages; no route removal.
- Desktop/mobile audit: 152 captures, no horizontal overflow or browser errors,
  one main per page. Selected corrected routes were recaptured after fixes.
- Navigation geometry: 76 routes at 390, 1080 and 1520px, zero differences (228 checks).
- Final narrow-screen check caught and fixed a selector-display override at 320px;
  the nine-width audience-switch test passes after that rule-order correction.
- Editorial contract: 12 representative routes at six widths, all pass.
- Built-output smoke check: all 76 routes return HTTP 200 with one main and one H1;
  six representative built pages pass the same six-width editorial contract.
- Final built-output navigation sweep also passes all 228 route/width comparisons.
- Hiring/candidate regressions: audience nav, candidate layout/start, funnel, hero,
  workflow, testimonials, trust/CTA, proof, experts and foundation pass. Candidate
  score test initially failed under concurrent load; the full isolated rerun passed
  all six widths and the no-JavaScript case. Initial failure was not erased.
- Existing handler tests: 49 pass. Contact hiring/candidate error/retry/success,
  upload state, careers filters, example totals and blog filter counts pass with
  mocked/blocked network submissions. No real test leads sent.
- Newsletter index/article waitlist submissions also pass with mocked responses.
- Full repository check is not green: the recovered larger-heap Astro check reported
  1709 diagnostics; default check exhausted memory. Lint/format stages were not
  reached. Targeted tests/build do not replace that missing clean static check.

## Claude Review

Every route has actual initial and follow-up visual/copy reports in
`claude/initial/` and `claude/followup/`, linked in the route ledger. A second,
cross-site review used readable section crops, navigation crops, enabled upload,
expanded FAQ and service-accordion states. Its initial findings are retained in
`claude/cross-site-initial.txt`, not overwritten by later approval.

Final corrective closure: Claude explicitly verified the remaining upload, copy,
topic-casing and navigation findings as fixed. See
[closure report](claude/cross-site-closure.txt); the intervening review is retained
in `claude/cross-site-second.txt` so unresolved findings were not erased.
The subsequent 320px navigation correction is explicitly reviewed in
[navigation closure](claude/navigation-closure.txt).

Full-page images are downscaled for long pages, so the review is not a pixel-perfect
accessibility certification. Functional tests independently cover key controls;
static screenshots alone cannot prove backend delivery or every interaction state.

Audit screenshots/copy are backed up locally in ignored `artifacts/site-style-audit/`;
readable final state crops are in `artifacts/site-style-final-states/`. Text reviews
are retained under `docs/reviews/site-style/claude/`, not only temporary storage.

Release still needs owner evidence for existing statistics, prices, SLA/guarantee
claims, client/expert permissions and legal/security facts. See
[correction disposition](correction-disposition.md). Claude approval cannot supply
that evidence. No production release was authorized.
