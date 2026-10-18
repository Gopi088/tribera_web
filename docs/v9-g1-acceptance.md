# G1 private foundation acceptance — 18 October 2026

Candidate: `5baa47b4c8fed7f8a8f061ba096f01df366ae729`, based on accepted bootstrap `00ed84d`. The final production and preview builds were made from `5ac7306`; the subsequent commit changes only a browser assertion to allow WebKit's 1/64px layout rounding. Production pages still use their existing implementation. This batch prepares the shared components for representative-page migration.

## Changes

- Pinned the exact declared handoff font request, including Fraunces optical sizing, with official binaries, license text, metadata and integrity hashes. Added the complete supplied icon set. Historical remote font bytes remain unknowable; the declared request and downloaded response are now reproducible locally.
- Matched the final handoff cascade for product/editorial/compact hero typography and columns, navigation, article headers, bylines, source lists and testimonial cards. Preserved page-owned product illustrations and carousel composition for the representative-page batch.
- Added finite arrivals that never hide no-JavaScript content or replay, keyboard/Escape behavior, viewport-contained source disclosures and reduced-motion behavior. Kept foundation defaults below component-specific typography in the cascade.
- Added the private `/__v9/content` fixture alongside the existing two previews. All three are noindex and excluded from normal builds and sitemaps. Public endpoints and legacy layouts remain unchanged.
- Added an evidence-summary generator that fails on missing, inconsistent, dirty-tree or failed static/browser reports. The existing CI foundation command now also runs content behavior and both handoff comparison suites in every preview-browser job.

## Validation

| Evidence                                | Result                                                                                                                                                                                                                                                                            |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository checks                       | Astro: 0 errors, 0 warnings, 146 existing hints; ESLint and Prettier pass. Subsequent test/CSS changes pass scoped lint/format checks.                                                                                                                                            |
| Unit checks                             | 98 passed, 0 skipped.                                                                                                                                                                                                                                                             |
| Normal build and boundary/static audit  | 77 HTML pages; no private fixtures or supplied private sample document; route/reference audit passed.                                                                                                                                                                             |
| Preview build and boundary/static audit | 80 HTML pages, including three private fixtures; noindex and sitemap boundaries passed.                                                                                                                                                                                           |
| Production + preview browser gates      | Chromium, Firefox and WebKit; 90 route/viewport checks passed.                                                                                                                                                                                                                    |
| Shared behavior                         | All three engines pass nine shell widths, five editorial widths with/without JavaScript, keyboard/disclosure, overflow and reduced-motion checks.                                                                                                                                 |
| Handoff comparisons                     | Per engine: 21 hero cases and 95 article/author/source/testimonial cases pass. References use the same pinned fonts with handoff scripts removed. Screenshots cover 390px and 1366px.                                                                                             |
| Evidence aggregation                    | `gate-summary.json` verifies all eight explicitly required raw static/browser reports; it does not invent component, review or hosted acceptance.                                                                                                                                 |
| Existing production output              | All 77 baseline HTML files and 214 baseline files are byte-identical. No baseline file changed. One unused private-fixture CSS file was removed; it has no literal references across the baseline file inventory. The 34 additions are expected v9 assets and unused preview CSS. |

Raw evidence is under `artifacts/v9-g1/`. The authoritative final component logs are `candidate-5ac7306-chromium.log`, `candidate-5ac7306-firefox.log` and `webkit-isolated-components.log`; final comparison JSON is under `reference-{browser}` and `content-reference-{browser}`. Static/browser manifests are under `production/` and `preview/`. `required-evidence.json` names the complete eight-report set.

Reproduce aggregation from the recorded reports:

```sh
node scripts/v9-evidence.mjs --manifest artifacts/v9-g1/required-evidence.json --output artifacts/v9-g1/gate-summary.json
```

Production build hash: `82393189d9897b8f7e56fc3af7399606704a960d6a402057e4003dd5b604a22f`.
Preview build hash: `54e92662aba862e91e03e26f937dd37090b9f41e3dc8e63f9673959aa5b2874a`.

## Review and failed-run disposition

The independent implementation reviews caught duplicate editorial rules, compact-card alignment, default CSS specificity, metadata tracking, cover-mark geometry and source-heading cascade differences. These are fixed and covered by focused assertions. Claude's initial source review required the responsive Sources heading clamp; `5ac7306` supplies the exact clamp and all 95 content comparisons now pass in each browser.

Earlier failures remain available as historical evidence. They include the corrected style mismatches, a test that failed to restore the mobile viewport, Firefox's valid 304 response, WebKit's subpixel serialization, and a temporary Python server's cached redirect behavior. Final validation uses Astro preview. Two overlapping WebKit runs failed with detached/closed page errors; no product-code fix is attributed to that occurrence. The unchanged-code serial WebKit component chain and preview smoke passed, and production WebKit also passed. CI isolates engines/artifacts in separate jobs and runs each component chain serially.

The complete legacy journey/text suites had passed at the accepted bootstrap. They were not redundantly rerun locally for this batch because their public HTML and runtime assets are byte-identical; the CI workflow continues to require both suites. Byte identity does not certify hosted providers, scanners or redirects.

## Next boundary

Proceed to G2 representative pages in private previews: Home, Candidates, About, one sector and one article. Full-page composition, product animation/carousel behavior, forms and actual route adoption need their own checks and Claude review. The future footer destinations must exist before public adoption; preview overrides remain explicit. Publication scheduling, hosted forms/scanner/provider delivery, hosted redirects, performance, broad accessibility and release/rollback gates remain pending. Remote CI execution and branch-protection configuration are not claimed by this local acceptance record.

Claude final follow-up: **ACCEPT**, no remaining blockers for this scope. See [reports, scope and provenance](reviews/v9-g1-2026-10-18/manifest.json) and the [verbatim follow-up](reviews/v9-g1-2026-10-18/claude-followup.txt).
