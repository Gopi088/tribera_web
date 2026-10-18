# Independent Typography Audit

## Scope And Outcome

This audit addresses the missed Services letter and the risk that a selector-based
test can pass while an unmigrated section remains inconsistent. Text discovery now
starts from rendered DOM text, inputs, selects and SVG text, independently of the
selectors in `content-typography.css`.

All 76 built public routes were crawled at 320, 390, 768 and 1520px. A separate
390/1520px crawl covered 751 states, including available navigation menus,
accordions, tabs, filters, selects, presets, funnel stages and slider endpoints.
Both crawls completed without recorded page or control failures.

Additional size inconsistencies were found and corrected in shared CSS:

- Editorial paragraphs, career requirements, candidate facts and form introductions.
- Related cards, closing cards, industry cards and compact component headings.
- Captions, supporting explanations, action labels and select controls.
- Breadcrumbs, service metadata, interview labels and other small component labels.
- The Blog newsletter heading, now using the shared section-heading size.

The About closing-card paragraphs required more specific shared selectors to
override scoped page CSS. No copy, font family, weight, italic style or color was
intentionally changed in this pass. The application edits are font-size overrides.

## Evidence

| Check                                          | Result                                                                                     |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Independent default-state census               | 304 route/width records; 1,001 contextual groups                                           |
| Independent interaction census                 | 152 route/width records; 751 states; 1,096 groups                                          |
| Independently discovered long explanatory copy | 5,656 default-state occurrences passed                                                     |
| Interaction-state explanatory copy             | 16,225 occurrences passed                                                                  |
| Shared-role computed font sizes                | 13,668 assertions passed                                                                   |
| Page-specific text-style contract              | 17,468 context/width combinations recorded                                                 |
| Mutation checks                                | New short label, wrong size, changed weight, color and italics correctly rejected          |
| Capture-health mutations                       | Missing route, failed capture and missing default state correctly rejected                 |
| Baseline-to-final style preservation           | 17,788 matched occurrences; 3,347 size changes; zero family/weight/style/color differences |
| Repeat-crawl stability                         | 18,332 matched occurrences; zero size or other style differences                           |
| Targeted visual captures                       | 34 section crops across 17 sections at two widths                                          |
| Astro check                                    | Zero errors and warnings; 146 hints                                                        |
| Production build                               | 76 pages built successfully                                                                |

Heading/subtitle, Services letter, hero viewport, candidate layout, navbar/font
loading, Home refresh, experts and funnel checks also passed individually. The
combined release runner was extended but was not rerun end-to-end in this pass.

## Regression Coverage

`scripts/test-reviewed-site.mjs` now runs an independent all-route, four-width
census, a prose-size guard, a page-specific text-style contract and mutation tests
after the existing site checks. It also repeats the two-width interaction census
and prose/overflow guard. Build the site before running that preview runner.

The prose guard checks long explanatory copy against the body/helper/lead scale.
The separate contract covers discovered short labels, headings, forms, navigation
and other text contexts, recording size, family, weight, italic style and color.
It fails for new or missing contexts as well as changed styles. Its fixture is not
automatically updated during verification. Use `--record` only after reviewing an
intentional change; recording alone is not visual approval.

## Preserved Exceptions And Limits

Display heroes, numerical scores, compact chart annotations, narrative pullquotes,
signatures, navigation and footer roles need not share the body size. Existing
bold, italic, serif, muted and red treatments remain intact.

Claude identified a pre-existing family difference: closing-card `.door__k` labels
use JetBrains Mono on About but Fraunces on Blog. It remains unchanged because this
task explicitly preserves font families. Harmonizing that is a separate design
decision, not a completed part of this size-only pass.

Automated coverage is not equivalent to manual visual approval of every page.
Claude reviewed representative screenshots and audit data, not all 304 rendered
views. Testing used Chromium; it does not prove all browsers, all intermediate
viewport widths, every slider value, every text occurrence within a repeated
same-style context, or every possible interactive combination. No real forms were
submitted. This is not a comprehensive accessibility/contrast audit.

The contract covers default-state contexts; interaction coverage currently uses
the separate census and prose guard. Baseline preservation comparisons apply only
to matched visible text occurrences, not every possible node.

## Local Artifacts

- `/tmp/tribera-all-text-final/`: final four-width inventory and groups.
- `/tmp/tribera-all-text-states-final/`: final interaction inventory and groups.
- `/tmp/tribera-type-review-final/`: screenshot manifest and 34 section captures.
- `/tmp/tribera-text-inventory-diff.json`: baseline preservation comparison.
- `/tmp/tribera-repeat-text-diff.json`: repeated-crawl stability comparison.

## Claude Follow-Up

The [initial review](reviews/typography-2026-09-14/claude-independent-census-initial.md)
inspected ten representative images but used a stale metadata capture. The
[follow-up](reviews/typography-2026-09-14/claude-independent-census-followup.md)
confirmed all eight pending metadata selectors at 12px across four widths and
inspected the refreshed mobile Services offers image. It did not independently
verify every reported count or the preservation comparison.

Follow-up actions taken after that report:

- The baseline recorder and verifier now require every built route at all four
  widths, unique records, zero capture errors, populated default states and no
  default-state page overflow. Mutation tests prove incomplete/failed captures
  are rejected. The normal check passes all 17,468 page-specific contexts.
- The release runner now includes the two-width interaction crawl and prose
  guard. It does not yet snapshot every interactive text style.
- About's mixed `.fct__n` sizes come from the explicit smaller `Role-matched`
  textual value alongside numerical facts; this is not a body-text size miss.
  Candidate weight headings likewise pair a label with a smaller unit heading.

The raw reviewer reports are retained with their limitations and superseded
findings intact, rather than rewritten as blanket approval.

No commit, merge, push or deployment was performed.
