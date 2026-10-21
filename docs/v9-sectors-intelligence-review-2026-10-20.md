# Sector and Intelligence implementation review — 20 October 2026

This is a local implementation record, not an accepted migration gate or a publication record. Work continues in the existing dirty workspace and preserves the earlier motion changes. No commit, push, deployment or live email is included.

## Implemented scope

- `/__v9/industries`: twelve-sector line chart, accessible selection, exact selected weights, sector cards and static no-JavaScript table.
- `/__v9/industries/<slug>`: all twelve sector detail pages, including a full BFSI route alongside the existing representative `/__v9/bfsi` URL. Each retains its hero/market/source, top-weight opening, missed signals, questions, roles, bench, complete FAQs and closing copy.
- `/__v9/intelligence`: market findings, India demand, method and source sections plus the eight-function scarcity demonstration.
- `/__v9/industries/global-capability-centres`: private spelling alias to `global-capability-centers`. Static local preview uses Astro's generated redirect document; a hosted public HTTP 301 is not claimed.

Index lines, card bars, hero bars and comparisons use one imported sector dataset. The existing BFSI comparison also consumes that dataset. Marketing wording is normalized while technical keys and source URLs remain intact. Header/footer navigation and BFSI breadcrumbs now reach the new private previews.

Motion includes staggered arrivals, filled-ink reveals, hero field sweeps, chart drawing, miniature card-bar entrances, sector/function transitions and card depth. Autoplay runs only while visible, stops on interaction or hidden documents, and respects reduced motion. FAQs retain native fallback behavior. All chart values exist in server output; full index/function tables are available without JavaScript.

## Data and delivery boundary

Intelligence's sample flag remains true. Its label explicitly says “Illustrative · sample data”, and a visible note identifies missing measured cohort, dates and sample size. These fields are stored as null; the demonstration must not be relabelled as measured results. The supplied external market figures and links are preserved for private review, not independently fact-checked or approved for publication.

Quarterly subscription is visibly unavailable, as in the existing article preview. Email integration, provider delivery and publication of the market claims remain separate work. Public pages and the public GCC URL have not been migrated.

## Validation

The compiled preview build passed at build hash `ae3f0c19656f04c7c6019ee95f382b10ede8739c366cf8c45ebcbd14c2f3f7ce`. All three four-suite browser chains passed with the same source hash `e4700ad007bd5e06bee2bf9cb901a42653d1a4d92a7816797dca8dfd8e4b2ceb`, based on `590be3c` with a dirty working tree. The suites cover the new pages, existing editorial behavior, filled-ink motion and private navigation.

| Engine   | New-page checks | Responsive widths         | Additional coverage                            |
| -------- | --------------: | ------------------------- | ---------------------------------------------- |
| Chromium |              87 | 320, 390, 768, 1366, 1920 | No-JS, motion/manual takeover, keyboard, alias |
| Firefox  |              45 | 390, 1366                 | No-JS, motion/manual takeover, keyboard, alias |
| WebKit   |              45 | 390, 1366                 | No-JS, motion/manual takeover, keyboard, alias |

All 132 ordered sector comparisons and all eight function distributions were checked in each engine. Source h1/h2 headings and long paragraphs, sector-specific content counts, source popovers, native FAQs and contextual Contact destinations pass. Reduced-motion checks verify that active animations stop and the Intelligence hero field restores its original SVG values. Index card bars and complete tables remain visible without JavaScript.

Astro check reports zero errors and zero warnings (394 existing hints). Scoped ESLint and Prettier checks pass; all 124 migration unit tests pass. Production and preview static route/reference audits pass. A separate production build contains no private HTML; its 77 public HTML files are byte-identical to the final preview's public HTML. That production build predates the final private chart/motion refinements; route gating and public templates are unchanged. No hosted behavior is inferred from this comparison.

Full-page desktop comparisons were inspected for all fourteen content pages, with mobile layout review of the index, sector template and Intelligence. Candidate screenshots cover every page at the widths above. Reference captures expand all FAQ answers, while candidate captures retain the first answer open. The shared approved header, native disclosures, explicit selected chart values, no-JS tables and visible sample/delivery notes explain intentional differences; these are not a claim of pixel-identical output. A direct computed-style comparison confirmed the index card headings retain the source font, size and weight.

Deterministic gzip estimates are about 7.3–7.7 KB of JavaScript for the new pages; exact measurements are in the archived script-size report. These are local size estimates, not hosted latency or Web Vitals measurements.

The only source edit after the three browser chains was Prettier whitespace formatting of `src/data/v9/intelligence.json`. Parsed JSON was asserted equal before and after; the compiled artifact is unchanged. Its before/after hashes are recorded in `format-only.json.txt`. Documentation updates do not change the reviewed product.

Raw passing manifests and page records are retained in [the evidence folder](reviews/v9-sectors-2026-10-20/). Full screenshots remain under `artifacts/v9-sectors/`. Reproduce from a preview build with `BROWSER=chromium npm run test:migration:sectors`, and repeat for Firefox/WebKit.

Earlier diagnostic runs are not counted as passing evidence: development hot reloads interrupted two sweeps; a compiled-content test needed to treat `<br>` as a word boundary; native FAQ toggles and Firefox media-query updates required state-based waits; one Firefox process closed during an early run. Firefox diagnostics also exposed redundant reduced-motion SVG rewrites during lifecycle events, which were removed and covered by the final field-reset checks. One interim runner correctly rejected otherwise-passing suites because source changed during the run. Final browser manifests have no source-change rejection, skipped suite or failing check.

## Remaining acceptance

The subsequent [independent Claude visual and responsive review](reviews/v9-sectors-2026-10-20/claude/README.md) is complete. Claude accepted the bounded local scope after a tablet keyboard-tab scrolling correction. Its raw reports, provenance, finding dispositions and follow-up evidence are retained there. The validation above describes the original pre-review build; the correction and its validation are recorded with that follow-up.

Formal G2/G3 acceptance, hosted behavior, production data/content decisions and public route/SEO migration remain pending. The independent visual verdict does not promote the dirty workspace into the accepted integration history.
