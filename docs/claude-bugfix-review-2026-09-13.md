# Claude Final Bug-fix Review

Read-only review of the implementation, copy, screenshots and execution logs.

## Verdict

**No remaining blocking findings within the implemented safe scope.** All ten items from the first review are resolved in code, and the resolutions hold up against the snippets, logs and screenshots in this follow-up. My earlier R21 framing was wrong on one point and I withdraw it: `docs/website-bugfix-verification-2026-09-13.md:30-34` records the owner instruction and the fact that Home and Candidates already published the exact eleven names, so About is the only surface whose names changed — Candidates is not a new publication surface.

Spot-checks that closed the remaining doubts:

- `chart-model.ts` is data-free and is all `charts.ts:1` imports; `chart-series.ts:1-2` re-exports it so `intelligence.astro` keeps working unchanged. Both indexes now pass `relative` true in SSR (`functions/index.astro:4`, `industries/index.astro:4-8`) and carry `data-scale="relative"` on `#secA` (`functions:6286`, `industries:6290`) — SSR and JS agree, and the two pages now match each other.
- `chart-model.ts:23` gates `key` on `gaps[top] > 0`, and the note has three branches including the zero-gap-distinct case (`:28-30`). Identity is now reference-based (`a === b`), which also retires the `heroEyebrow`-collision nit.
- `standalone-reading-time.ts:9-12` gates on `STANDALONE_BLOG_PERMALINKS` and throws on a missing source or anything other than exactly one `article.art` — no silent stale fallback. `built-links.test.mjs:62-76` independently recomputes all seven and asserts against the published HTML; `built-links.test.mjs:29` sweeps all ten cut names across every built file.
- `actions.yaml:27-29` runs the link/name sweep, installs Chromium and runs `scripts/test-reviewed-site.mjs`, which serves the built `dist` on a preview server and passes `TEST_BASE_URL` to all three browser suites.
- `Metadata.astro:79-84` now feeds `seoProps.noindex` into `shouldNoIndex`, so the unit test's route-exception case exercises live behaviour.
- `careers/[slug].astro:11517-11519` renders `[role.neighborhood, role.loc].filter(Boolean).join(', ')` — "Indiranagar, Bengaluru" is visible on detail, city-only on cards and meta, as intended.
- Screenshots: the enabled/disabled default pairs show the real SSR default (Engineering & platform vs Data & analytics; Consumer & digital commerce vs Banking & financial services), full-length relative bars, the correct largest-gap row highlighted, matching notes, and the no-JS hint present with disabled selects.
- `astro check`: 0 errors, 0 warnings, 141 hints. Build clean.

## Optional polish (non-blocking)

1. **Home's protected-value suite still has no CI guard.** `npm test` (home-handoff, funnel-stages, hero/experts/work layout, home-audit) is no longer referenced in `actions.yaml`; `test-reviewed-site.mjs:24` runs only the three new suites. Home is the surface carrying the most "must not change" invariants (126/40/14/5/2, 32h, normalized shares), and it _is_ modified in this tree. Adding it to the preview list is cheap insurance.
2. **Two `<article>` contracts.** `built-links.test.mjs:66` matches the first `<article>` of any class; `standalone-reading-time.ts:11` requires exactly one `article.art`. Drift would surface as a confusing test failure rather than a miss, but aligning the regex would be tidier.
3. **Featured card splits the title on `': '`** (`blog/index.astro:12518-12520`). Drop the colon from a title and the subtitle silently renders empty. A dedicated frontmatter subtitle would be sturdier. Also worth one editorial glance: the card now inherits the Markdown title case and excerpt verbatim, replacing the previous bespoke sentence-case copy — a deliberate consequence of single-sourcing, but a visible copy change.
4. `intelligence.astro:11037` hardcodes "Showing Backend & platform" beside the `selected` option — two places to keep in sync.
5. Tie conventions differ between charts: `chart-model.ts:49` highlights the first maximum, `careers/[slug].astro:11533` highlights every row equal to `mx`. Both are defensible; neither affects values.
6. At 390px the A-side select clips its longest labels ("Engineering & platf…", "Consumer & digita…"). Native select behaviour, pre-existing.

## Release checks still open (not code defects)

- **Preview-CI log is incomplete.** `/tmp/tribera-preview-ci-tests.log` ends at the 390px route-audit line; the 1520px line and a clean exit aren't in it yet. Confirm the run finished green before treating the CI suite as demonstrated. Everything else has a complete log: built-links (77 pages / 6,621 links / seven read times), clients (4 widths + no-JS), route audit (34 routes at both widths).
- **Owner/counsel queue, unchanged and correctly excluded from "fixed":** R23 guarantee wording (`industries/[slug].astro:6752`), R28 named bios (`function-pages.ts`), R29 address and the three-office claim (`about.astro:5156-5157`), R33 Intelligence figures and the 200,000 statistic (`chart-series.ts:14-63`, `about.astro:5166`), R34 privacy, R36 security assurances, R37 terms. Rendering these correctly and formatting them consistently does not make them substantiated.
- **R20 production verification** — robots, canonical and sitemap on the real deployment, per the doc's item 8.
- **R44** — public wording no longer promises a universal dimension count; any future fixed range still needs product-owner confirmation.

## Completion Note

After Claude read the in-progress preview log, the production-preview runner completed both 390px and 1520px route sweeps and exited with code 0. See `/tmp/tribera-preview-ci-tests.log`. No outstanding test failure remains.

The Intelligence fallback label is generated from `intelligenceSeries.backend.n`; it is not a duplicated literal. Optional polish recommendations are not release-blocking bug findings.
