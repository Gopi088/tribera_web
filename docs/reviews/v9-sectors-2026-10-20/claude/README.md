# Independent Claude visual and responsive review

Actual Claude Code 2.1.283 sessions using `claude-sonnet-5` reviewed the fourteen new private Industries and Intelligence pages on 20 October 2026. Exact prompts, raw JSON responses, model/session provenance, and readable reports are retained here. This is a bounded local review; no public release or G2/G3 integration acceptance is implied.

## Outcome

**ACCEPT for the reviewed visual/responsive scope**, combining the eight initial packets, enlarged-image follow-up, and the final tablet-tab correction review. See [the final finding disposition](tab-fix-followup.md) and [the enlarged-image review](detail-followup.md).

- Desktop: all fourteen candidates compared with original handoff captures at 1366px.
- Responsive: every route inspected at 320, 390, 768, 1366 and 1920px in Chromium; additional Firefox/WebKit captures inspected at 390px.
- Detail: full-resolution top/middle/bottom crops for the index, Healthcare sector template and Intelligence at 320, 768 and 1366px; additional FAQ and Private Equity comparison crops.
- Motion: Claude audited archived three-engine regression results. It did not personally observe live animation; screenshots cannot establish animation quality or timing.

Initial screenshot review used build `ae3f0c19656f04c7c6019ee95f382b10ede8739c366cf8c45ebcbd14c2f3f7ce`. The tablet scrolling correction was rebuilt as `a9e56a4619fefedc1548afde3c9e6ff19e9db017f16ce241890d14cfe26c6641`, then inspected in the final follow-up. The correction changes selection scrolling, not the default page layout.

## Findings and dispositions

| Finding                                                     | Resolution                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Intelligence tablet function row could hide later functions | Confirmed native horizontal scrolling is intentional, but keyboard selection of the fifth tab exposed a real scroll-snap issue. Changed scrolling to align the selected tab's left edge. All eight tabs are fully visible when selected, with matching chart content, in Chromium/Firefox/WebKit at 768px. Added regression assertions for both chart families. Claude accepted the fix. |
| Alleged closed first FAQ on smaller screens                 | Retracted by Claude after enlarged crops and 28 direct DOM checks showed the first answer open and visibly sized in every case. No product change.                                                                                                                                                                                                                                       |
| Private Equity comparison pill arrangement                  | Enlarged source/candidate crops matched. Normalized label wording is intentional. No product change.                                                                                                                                                                                                                                                                                     |
| GCC alias wording in an intermediate report                 | Corrected: `centers` is the canonical private route; `centres` is the spelling alias.                                                                                                                                                                                                                                                                                                    |
| Minor full-page height differences                          | No clipping or missing content found. Exact cause was not established; speculative font explanations in intermediate reports are not verified facts.                                                                                                                                                                                                                                     |

The suite's navigation assertion now accepts HTTP 304 cache revalidation as well as 200; rendered content and state assertions remain required. Interrupted diagnostic runs, including a stopped preview server, a parallel WebKit navigation timeout, the original 304 assertion and an initially closed-page test fixture, are not passing evidence. They are retained under `diagnostics/`. The tablet regression now uses its own browser page; the final runs execute browsers sequentially.

The existing sample-data and unavailable-signup labels remain intentional. Production data, hosted delivery, public routes and SEO promotion remain pending. Source is still a dirty local workspace based on `590be3c`; nothing was committed or deployed.

## Final regression evidence

All four suites passed in each of Chromium, Firefox and WebKit after the fix: new pages, existing editorial behavior, ink motion and private navigation. New-page records total **183** (89 Chromium, 47 Firefox, 47 WebKit), including the added tablet keyboard checks. All three runs share build hash `a9e56a4619fefedc1548afde3c9e6ff19e9db017f16ce241890d14cfe26c6641` and source hash `dba57c0498f566e84e69311456f020491df3d70ed2a7522f98d1bada9fc3054d`. Raw manifests, page records and logs are the `final-*` files alongside this report. The preview build, scoped ESLint/Prettier checks and whitespace check also passed. Earlier failed/interrupted attempts are retained as diagnostics, not counted as passes.
