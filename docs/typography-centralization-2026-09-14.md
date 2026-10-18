# Shared Content Typography

## Implementation

The preceding [heading/subtitle audit](heading-subtitle-review-2026-09-14.md)
is retained as the before-state. This follow-up implements its role-based scale.

`src/assets/styles/content-typography.css` is the numeric source of truth.
`SiteFonts.astro` loads it through both the standard layout and standalone-page
metadata path. Content consumers use its variables rather than separate clamps.
The existing 15px/16px layout roots, font faces, navigation and colors are unchanged.
Display headings share weight 500 and -0.01em tracking as well as size/leading.

| Content role       | Desktop cap | Mobile floor | Line height |
| ------------------ | ----------: | -----------: | ----------: |
| Hero               |     53.12px |         32px |         1.1 |
| Marketing section  |        36px |         28px |        1.15 |
| Article subsection |        32px |         24px |         1.2 |
| Legal subsection   |        32px |         24px |         1.2 |
| Editorial card     |        24px |         20px |        1.25 |
| Subtitle           |        18px |         16px |         1.6 |

Below 360px, hero/section roles use 28px/26px. Metadata, process labels,
scorecard labels, specialist group headings and document H3s retain their
contextual roles rather than receiving a blanket heading reset.

## Migration Order

1. Home: unified peer section headings and true subtitles; removed conflicting
   Workflow/Assurance scales. Experts remains full-width with its subtitle below.
   The small serif supporting statement, section order and viewport hero remain.
2. Candidate: unified heading/subtitle roles, restored mobile H1/H2 separation,
   removed Conversation's smaller mobile exception and retained demo behavior.
3. Shared editorial shell and heading component: shared size/leading tokens;
   explicit smaller article-body H2 role; included previously omitted decks.
4. About, Services, Intelligence and Contact: reconciled local hero/section/deck
   declarations. Services Deliverables now stacks title and subtitle at the card
   grid's left edge and no longer forces the heading onto an overflowing line.
5. Careers and all job pages: shared hero/section hierarchy, including mobile;
   the later metrics pass also caught and removed the job-title-only 800 weight
   and tighter tracking. These now consume the shared display-weight/tracking
   tokens and are covered by assertions, not only size comparisons.
6. Industry/function indexes and all detail pages: template declarations now use
   the shared scale; each generated sibling is included in browser verification.
7. Blog index and seven articles: article subheads remain smaller than related
   content/closing marketing modules. Category/tag routes inherit shared roles.
8. Candidate start, legal documents and 404: shared roles with the document
   exception preserved. No form or legal copy changed.
9. Removed three obsolete legacy hero-heading rules identified during Claude's
   code review. Their old wrapper/hero combinations are absent from current
   markup. The generic critical hero fallback now uses Fraunces 500 and the same
   heading/subtitle tokens rather than the previous Figtree scale. Other critical
   layout rules were deliberately left alone.
10. Reconciled the higher-specificity `.v58-route` tracking rule in Tailwind with
    the shared weight/tracking tokens. The stricter computed-style test found
    this remaining override after the size/leading pass was already green.

## Regression Coverage

`tests/content-typography.test.mjs` checks every built public route at 320, 390,
768 and 1520px, including computed size, leading, font family, explicit card
roles, Services alignment, page overflow and browser errors. It is included in
`scripts/test-reviewed-site.mjs`. New subtitle classes must be added to the
shared consumer selector and corresponding test selector, or reuse a current
subtitle class; ordinary body paragraphs are not implicitly subtitle roles.

The fresh screenshot/measurement audit is separate from the before-state:
`/tmp/tribera-heading-after/`, with focused review images in
`/tmp/tribera-type-crops/`. These generated local artifacts are not source assets.

## Review Status

Claude reviewed the implementation and ten representative screenshots, not all
76 routes. Its initial mobile Experts orphan finding was disproved by the image
and retracted during a focused re-review: the title has three clean lines, and
the desktop groups form two columns, not four. No extra nowrap rule was added.
Its obsolete-override and critical-fallback findings were addressed, and the
final focused source review passes. Coverage now includes 320px and explicit
card-heading roles, addressing its test-gap feedback.
Claude also reviewed the later career weight/global tracking corrections and
five fresh final images; that final review passes without typography findings.

- [Code review](reviews/typography-2026-09-14/claude-implementation-code.md)
- [Initial visual review, superseded where corrected](reviews/typography-2026-09-14/claude-implementation-visual.md)
- [Corrected visual review](reviews/typography-2026-09-14/claude-implementation-final.md)
- [Final critical-style verification](reviews/typography-2026-09-14/claude-implementation-critical-final.md)
- [Career weight review](reviews/typography-2026-09-14/claude-implementation-weight-final.md)
- [Final visual and tracking review](reviews/typography-2026-09-14/claude-implementation-completion.md)
- [Post-migration route inventory](reviews/typography-2026-09-14/after-inventory.md)

## Verification

The production regression suite passed, including 304 typography checks over
76 routes at four widths, hero viewport geometry, approved copy/order, Experts
layout, demos, linked funnel stages, client publication and detail-page checks.
The separate 228-record rendered audit has no navigation failures, browser
exceptions or page-level horizontal overflow. No mobile H2 exceeded three lines
in that audit. That full snapshot set predates the final critical CSS, career
weight and global tracking corrections. A focused 21-record career audit verifies
all seven titles at weight500 with no overflow/errors. Fresh final Home, Candidate,
About and career crops are `/tmp/tribera-type-crops/final-*.png` and were used for
the final visual review. The final-artifact regression independently passes all
304 route/viewport checks including weight and tracking, not just size/leading.

The final build completes successfully. Astro reports 0 errors, 0 warnings and
144 hints across 246 files. Targeted ESLint, Prettier and `git diff --check` pass.
The Home refresh test sampler now waits for both the heading and following
subtitle to exist before reading their styles. Previously it could throw during
incremental HTML parsing and stop collecting frames, falsely reporting that the
homepage never became visible. Its visibility and no-resize assertions are
unchanged. Final Home/About cold-load, refresh and navigation checks pass, as do
delayed-style, delayed/blocked-font navbar and logo checks. Hero viewport and
Experts layout regressions also pass after the final tracking change. The link
check resolves 6,621 internal links across 77 built HTML files (including the CMS
document excluded from public typography audits).

All browser audits are local and GET-only; no forms were submitted. This is
Chromium coverage, not an exhaustive alternate-browser/zoom/interaction audit.
This task does not close prior owner, factual, legal or deployment gates. No
commit, merge, push or publication was performed.
