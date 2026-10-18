# Reviewed Bug Fixes - 13 September 2026

Companion to `website-bugs-rca-2026-09-13.md`. Row numbers refer to the
reviewed spreadsheet, not a new bug numbering scheme.

## Implemented

| Rows                 | Change                                                                                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2-19                 | Retained the previously committed Home fixes; reran the Home handoff regression suite.                                                                                                     |
| 20                   | Extracted and tested the existing indexing policy. Staging stays noindex; production/custom-host behavior and route exclusions are tested. Live deployment verification remains pending.   |
| 21                   | Home, Candidates and About now use the same eleven customer names from the sample Home page, as explicitly requested by the owner.                                                         |
| 22                   | Removed the unsupported fixed expert count from About's narrative, statistic tile and bench statement. Used role-matched wording, not an invented replacement count.                       |
| 24                   | Replaced exclusive CV-origin wording with questions shaped by the role and candidate experience.                                                                                           |
| 25                   | Added scale/comparability context to both demos without changing their scores, formulas or thresholds.                                                                                     |
| 26                   | Retained the candidate SSR fallback and tested all four briefs plus no-JS and blocked-script states.                                                                                       |
| 27                   | Existing Chief Success Officer title was already consistent; no change required.                                                                                                           |
| 30                   | Standardized the active Markdown title/excerpt to 200,000. The historical unserved Markdown body was not rewritten.                                                                        |
| 31                   | Separated city and known neighbourhood in career data, retaining mode and all existing location facts.                                                                                     |
| 39                   | Differentiated Functions and Industries headings and corrected the Functions self-link to Browse by sector.                                                                                |
| 40                   | Rendered initial chart values, bars and explanatory notes on the server. Controls remain disabled until initialized, with a fallback hint. Shared calculations drive SSR and interactions. |
| 42                   | Derived all seven article reading times from their served Astro bodies. Featured/index metadata and article headers use the same normalized post record.                                   |
| 44                   | Replaced universal six/eleven/range claims with role-agreed criteria. Six-axis summaries remain illustrative; numerical models unchanged.                                                  |
| 46                   | Career detail scorecards use the canonical index order. Maximum weight and top criteria are calculated independently, keeping bars bounded.                                                |
| A1                   | Article category/tag links derive from canonical post metadata and permalink helpers. Added a built-link regression check to CI.                                                           |
| 32,35,38,41,43,45,47 | Coverage checkpoints, not separate product defects. Included in built-route and browser audits.                                                                                            |

## Preserved

Customer publication scope: the owner explicitly instructed, "Customer names
should match our dample home page." That instruction authorizes matching About
to the eleven-name Home sample. Home and Candidates already published this exact
list before this change; their change is deduplication, not new customer names
or a new publication surface. About is the only surface whose names changed.

- Funnel: 126 sourced, 40 HR interviews, 14 technical interviews, 5 qualified, 2 hires.
- Normalized Home importance percentages and existing scoring thresholds.
- The existing 32-hour estimate, not the sample's unsupported 38-hour claim.
- Hiring-page typography, colors, layout language and interactions.
- Separate candidate and hiring demo models.
- No form submissions, commits, pushes, merges or deployments.

## Verification

- Astro check: zero errors; existing advisory hints remain.
- Production build: successful, including sitemap generation.
- Built links: 77 HTML files, 6,621 internal page/file links resolved. External URLs and fragment targets are outside this check.
- All seven standalone read times match their served source bodies.
- Desktop/mobile chart tests: all functions, sectors, intelligence selections and candidate briefs; JavaScript enabled, disabled and blocked.
- All seven career detail scorecards: canonical order, unchanged weights, bars within 0-100%.
- Home handoff regression: 320, 390, 768 and 1520px; animation and no-JS checks pass.
- Customer strip regression: 320, 390, 768 and 1520px, plus no-JS.
- Browser sweep: all 34 detail routes at 390px and 1520px render without overflow, missing headings or browser errors.
- The same three browser suites passed against the production preview through the new CI runner, which exited with code 0.
- Claude's final re-review: **No remaining blocking findings within the implemented safe scope.** All ten first-review follow-ups resolved. Full verdict: [Claude review](claude-bugfix-review-2026-09-13.md).

## Claude Follow-ups

Claude's first review confirmed the principal fixes and identified follow-ups:

- Both comparison pages now use relative bar widths; percentage values remain unchanged.
- Equal weights have no false red difference highlight, including identical selections.
- CV-only question wording was also removed from About, Services, Careers and index process descriptions.
- Browser regression suites now run against a served production build in CI, not just locally.
- The built HTML sweep now rejects all ten cut customer names across the site.
- Standalone reading time requires exactly one article.art body and fails the build if it cannot find it. Dead frontmatter read times were removed.
- Shared browser calculations were split from page-copy datasets; the bundle dropped from 103,697 to 2,314 bytes before the final follow-ups.
- Comparison initialization now handles astro:page-load. Indexing tests exercise the same policy call, including route-level noindex, as Metadata.
- The featured blog card now derives its title, subtitle, excerpt and reading time from the canonical post record.
- New screenshots capture the actual default pair with JavaScript on, off and blocked, as well as the identical-selection state.
- The red secondary chart labels use a lighter red on the dark chart surface.

The neighbourhood remains visible in career detail markup:
`[role.neighborhood, role.loc].filter(Boolean).join(', ')`.
Index cards deliberately show city; the separate work-mode field is unchanged.

## Owner Review Queue

These are deliberately not reported as fixed or safe to publish:

1. R23: approve the commercial restart/guarantee wording and applicable engagement scope.
2. R28: confirm expert identities, experience claims and publication consent.
3. R29: provide the authoritative registered address and confirm office locations.
4. R33: substantiate Intelligence statistics, cohorts, methodology and availability figures. Rendering these correctly does not validate the claims.
5. R34: approve privacy terms against actual data practices.
6. R36: confirm any additional security assurances before publishing them.
7. R37: counsel review of liability, jurisdiction and legal effective dates.
8. R20: verify robots/canonical/sitemap on the actual production deployment before launch.

R44's public wording no longer promises a universal dimension count; any future
fixed product-wide range still needs product-owner confirmation.
