# Static Check Triage

## Shared Script Extraction

The executable common interaction block is now centralized under
`src/scripts/reference/`, replacing roughly 12,000 duplicated lines across 18
routes with about 860 lines of shared feature modules and preserved copy data.
Page-specific handlers remain local. Source comparisons confirm that page markup,
inline scripts and the remaining processed handlers are unchanged by extraction.

Astro checks all 227 files with **0 errors, 0 warnings and 143 hints**. The
production build (76 pages), ESLint, new-module formatting, 49 handler tests,
route smoke sweep, responsive interactions and mocked form journeys pass.
Audience navigation geometry also passes at all nine widths (320-1920px).
`reference-widgets.test.mjs` also verifies late mounting, duplicate initialization,
scoped flips/uploads and independent rubric state. The exact already-installed
esbuild version is declared for this test; an offline lockfile dry run passes.

The shared entry point is used only by reference-derived routes, not globally
in the hiring/candidate demos. Features accept a root and skip absent widgets.
Inactive reference snippets remain untouched. See the module README for scope
and initialization constraints. The sections below record earlier checkpoints.

## Astro Cleanup Follow-Up

The subsequent script cleanup resolves the remaining 1,704 errors. The full
Astro check reports **0 errors, 0 warnings and 466 non-failing hints**. ESLint
also passes. Strict null checking and the checked source scope remain enabled.

The fixes add DOM element types, event-target narrowing, runtime null guards,
animation handle/timestamp types and a declaration for the existing reanimation
hook. Newsletter submission uses the correct form/input/button types and guards
against missing or already-disabled submit buttons. No `any` casts, non-null
assertions or diagnostic suppressions were added.

A comparison against the staged source confirms that all 18 affected pages are
unchanged outside their processed script blocks: markup, copy, styles and inline
scripts are preserved. The historical triage results below describe the state
before this follow-up, not the current Astro status.

Final verification after formatting and adding the regression test:

- Astro: 217 files, zero errors/warnings, 466 hints.
- ESLint and formatting for this batch: pass.
- Production build: 76 pages; handler tests: 49 passed.
- Script smoke sweep: all 18 routes at 390px and 1520px, with no uncaught errors.
- Careers scorecards/filters, function comparisons, coverage FAQ and blog filters: pass.
- Services/intelligence responsive interaction checks: pass at six widths.
- Contact error/retry/success and newsletter submissions: pass with mocked requests.
- Funnel stage labels, linked highlighting, keyboard selection and counts: pass.

No commit or deployment was performed. Repository-wide formatting outside this
batch and the final hosted/Claude review remain separate tasks.

## Historical Baseline

Checked on 2026-09-08 against local `main` (`4d3f544`) and the redesign
checkpoint (`f134289`), using clean source exports with the same installed
dependencies. These are not clean dependency-install checks.

## Results

| Source                | Astro errors |
| --------------------- | -----------: |
| Main                  |            0 |
| Redesign checkpoint   |        1,705 |
| Release before triage |        1,713 |
| Release after triage  |        1,704 |

Diagnostic comparison uses file, error code and message counts, not line numbers.
No new diagnostics remain relative to the checkpoint. The remaining errors are
not inherited from main: they are a redesign backlog. `npm run check` still fails.

ESLint passes. Prettier passes for the explicitly selected release files.
Repository-wide formatting still has unrelated checkpoint/reference-script
warnings; this is not a claim that the global formatting gate passes.

## Fixes

- Corrected misplaced section closures in the functions index and trust article.
- Removed unused navigation imports and unused layout code.
- Typed homepage tuples, funnel tier values and SVG fill values.
- Typed contact form DOM queries and converted numeric text assignments to strings.
- Extracted candidate critical CSS into a component without changing its rules,
  allowing the formatter to parse the layout correctly.
- Formatted release files; excluded generated output and external design references.

The eight release-added diagnostics are resolved. The contact DOM typing also
resolved one checkpoint diagnostic. No type-check suppression was added.

Homepage refresh, contact error/retry/success journeys and the two repaired routes
passed browser checks during triage. The final production build passed for all
76 pages, and all 49 handler tests passed. Against a separate production preview,
audience navigation geometry passed at nine widths (320-1920px); funnel stage
labels, linked highlighting, keyboard selection and square counts passed at
320, 390 and 1520px. Hosted dev checks and the final Claude visual/copy review
remain separate release gates.
