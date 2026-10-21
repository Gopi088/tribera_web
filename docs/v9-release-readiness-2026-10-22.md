# v9 release review — 22 October 2026

This record supersedes the pending local content items in the 21 October route-promotion report. Historical acceptance reports retain their original scope and results.

## Implemented public scope

All 81 public HTML pages use v9 chrome and typography. Careers and seven role details, Functions and eight function details, blog and its seven older articles, category/tag lists, candidate signup and the 404 page now use the shared v9 content layer. The eighth article, “Seventeen interviews. One hire.”, is in the post collection, latest listing and relevant taxonomy. Its composed body determines its reading time. Related cards link to three published articles with collection metadata.

A production build has 83 HTML entries including the GCC redirect document and retained CMS asset. The private review routes only build in development or with `V9_PREVIEW=1`. Historical pre-v9 components remain as reference source; they are not imported by active public routes. Optional future articles and the proposed methodology page remain unpublished. The footer no longer presents About as “Our numbers”. The route map records implementation and pending hosted checks separately.

## Independent review and corrections

Actual read-only Claude CLI code and visual reviews, their prompts, raw JSON provenance, exported reports and sequential state are in `docs/reviews/v9-release-2026-10-22/`. The first migration follow-up and final content follow-up both returned ACCEPT for their bounded local scopes. Initial visual evidence covers all 81 public pages at 390 and 1366 pixels; follow-ups cover changed routes and legible section crops. Review reports enumerate images actually inspected and limitations. They do not certify CI, hosted email or pixel parity for every page.

Corrections include valid function chart widths, consistent career percentage scales, readable mobile labels, closing-heading contrast, upload validation and retry state, preserved button markup, dialog scroll/focus, no-JavaScript email alternatives, native article sharing, topic navigation and pagination. Content corrections remove New Jersey from all built pages, fix About word wrapping, remove duplicate Careers copy, label candidate controls and scarcity data as examples, and separate policy revision dates from presentation dates. Publication dates use explicit UTC.

Newsletter and quarterly email subscriptions are explicitly in preparation. Their calls to action lead to the existing notification waitlist at `/blog#sub`. Wired waitlist forms say “Notify me” and include no-JavaScript email alternatives. A notification request does not establish an active newsletter subscription.

## Owner publication decisions

The owner approved Heineken, directed retaining existing business claims “as is”, and directed dropping New Jersey. `claims-decisions.json` records those decisions. Numerical, timing, anonymity and case claims have not been independently substantiated by this review. Legal policy bodies and original revision dates remain unchanged.

## Validation and release boundaries

The required workflow is `.github/workflows/actions.yaml`: source checks, 124 unit tests, production and private-preview build boundaries/static audit, production links, migration browser gates for both artifacts, private foundation/page/A1/A2/sector suites and public regression in Chromium, Firefox and WebKit. Public replacement coverage and retained historical suites are recorded in `tests/reviewed-suite-migration.json`.

Local run logs and screenshots are generated under ignored `artifacts/v9-release-2026-10-22/`; they are evidence of the working tree named by their reports. A feature-branch commit and matching successful remote CI are required for a reproducible candidate. Hosted verification remains separate: HTTP redirects/statuses, indexing metadata and actual form/provider/inbox delivery must be checked on the configured deployment. Mocked browser tests do not establish delivery. Production deployment is not part of this review.

## Local checkpoint before commit

Astro completed with zero errors and warnings; ESLint, full Prettier and whitespace checks passed. All 124 migration unit tests passed. Production boundary/static/link checks passed: 83 HTML entries, 3,115 internal links and eight computed article reading times. The migration browser gate and complete public suite passed in Chromium, Firefox and WebKit. The private preview build, boundary/static/browser gate, foundation comparisons, eleven representative-page suites, A1, A2 and sector suites passed in Chromium. The complete private three-browser matrix remains a remote CI requirement.

Two test expectations were corrected without weakening their assertions: Firefox's first native no-JavaScript layout now waits for heading visibility, and the A2 source-copy comparison uses the explicitly approved Pune/Bengaluru sentence in place of the removed New Jersey claim. Original failed logs and successful reruns remain in local validation artifacts. This checkpoint precedes the candidate commit and does not claim remote CI or hosted delivery.
