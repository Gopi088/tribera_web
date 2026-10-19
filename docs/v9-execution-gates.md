# Tribera v9 parallel execution and gates

Execute the [migration plan](v9-migration-plan.md) with isolated workstreams, one integration owner and evidence for every gate. Parallel work is safe when workers share stable contracts and have separate files. Shared layout, schema and routing changes must be coordinated before their consumers expand.

Tests reduce the chance of regressions; they cannot guarantee that no defect exists. The operating rule is that failures, missing coverage and untested environments remain visible and cannot be reported as a passed gate.

This document defines the execution policy. The gate runner and CI jobs are implemented; remote branch protection still needs configuration. This document alone does not enforce merge permissions.

## Team and isolation

Use at most four active agents: one coordinator and up to three workers. The coordinator owns contracts, integration, the route tracker and shared configuration. Workers own bounded implementation batches. At each integration gate, assign a worker who did not author the batch to review its behavior and evidence; that review occupies one of the three worker slots.

| Role                   | Ownership                                                                                                 | Boundary                                                                                                              |
| ---------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Coordinator            | Integration branch, content schemas, package/lock files, route rules, CI wiring and integration decisions | Accepts worker output only after gates; does not accept a worker's self-report as sufficient evidence                 |
| UI worker              | Assigned page family and its local components/scripts                                                     | Requests shared component changes instead of silently changing global CSS or sibling pages                            |
| Data or backend worker | Assigned collections, handlers or other explicitly allocated files                                        | Implements the agreed contract; schema/config changes go through coordinator                                          |
| Test or review worker  | Independent tests, journey review and evidence inspection                                                 | Runs behavior checks against the candidate artifact, and checks whether tests could pass while the behavior is broken |

Create a separate Git worktree and branch for each worker when implementation starts. Examples are `feat/v9-foundation`, `feat/v9-forms` and `feat/v9-tests`, based on the same recorded integration commit. Agents must be explicitly directed into their assigned worktree; they otherwise share the current workspace. Give each worktree its own build output, test output and server ports. Do not have workers build into a shared `dist` directory or update one shared index.

Only the coordinator integrates into `feat/v9-migration`. Workers return a commit, file list, test commands/results, evidence location, limitations and any contract changes. Bring worktrees up to the accepted foundation before beginning dependent pages. Do not copy an entire worker tree over the integration tree.

Claude review is required for the bootstrap and each subsequent migration batch, as requested by the site owner. Use an actual Claude session, independently of the implementing agents; another Codex agent's review does not satisfy this requirement. Give Claude the candidate revision, changed source, relevant handoff references, test evidence and screenshots. Save the scope, model/session provenance, report and finding dispositions under `docs/reviews/`. Fix confirmed blockers and obtain a Claude follow-up on the changed scope before accepting the batch. A failed or incomplete Claude run is pending review, never approval. Automated gates and hosted/content/visual acceptance remain separate requirements.

## Parallel waves

| Wave                 | Coordinator                                             | Worker 1                                             | Worker 2                                            | Worker 3                                         | Exit gate                        |
| -------------------- | ------------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------ | -------------------------------- |
| Bootstrap            | Finalize ownership and form/content/component contracts | Shared shell, assets and motion foundation           | Handler adapters and upload/PDF contracts           | Reproducible baseline, route and journey harness | Baseline and foundation gates    |
| Representative pages | Integrate foundation and review global behavior         | Home and candidates                                  | About, one sector and one article template          | Independent tests and review of completed slices | Representative-page gate         |
| Rollout batch A      | Protect shared contracts and integrate small batches    | Services, IaaS, case, Contact and sample UI          | Remaining sectors and Intelligence                  | Review plus hosted-form test preparation         | Per-batch integration gates      |
| Rollout batch B      | Integrate publication and routing rules                 | Careers collection and seven role pages              | Blog collection, index and ten articles             | Review, scheduled publishing and taxonomy tests  | Collection and integration gates |
| Completion           | Coordinate release candidate and content dispositions   | Legal, methodology, 404 and retained Functions pages | Remaining backend/provider work and SEO integration | Full independent browser/journey review          | Hosted and release gates         |

These are bounded assignments, not five teams running at once. Reassign a finished worker to the next independent batch when capacity allows. Do not let missing subscription credentials stop static page work, and do not treat that progress as evidence that subscription delivery works.

The dependency order is baseline/contracts, then shared foundation, then representative pages, then broader rollout, then the integrated release candidate. Backend work and test tooling can start alongside the foundation. Bulk page work starts after the foundation gate.

## Contracts fixed before delegation

- Component props and variants: audience, active route, CTA destination, hero type, FAQ and source references.
- CSS ownership and ordering: global tokens only in the shared foundation; page selectors stay local. Specify how legacy and v9 routes coexist.
- Scoring contracts: named skills, weights, normalization, thresholds, presets, reset behavior and evidence mapping for each model.
- Content models: role status, article dates, source metadata, shared case records and stable slugs.
- Form contracts: public method/path, fields, accepted encodings, validation, enhanced JSON responses, normal-POST result behavior and provider failure handling.
- Publishing contracts: canonical host, slug changes, preview indexing and which content is held from production.

Record changes to a shared contract in the batch description and update all affected consumers/tests. A worker must not quietly solve a mismatch by accepting less input validation or changing public copy.

## Gates and required evidence

| Gate                       | Required checks                                                                                                                                                                       | Blocking rule                                                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| G0 Baseline                | Checkpoint, complete route disposition, current build/static/handler results, representative legacy journeys and known failure inventory                                              | No migration batch starts with unknown baseline failures or unowned shared files                                                |
| G1 Foundation              | Fonts/assets, nav/footer, hero variants, responsive behavior, keyboard access, reduced motion and legacy-style isolation                                                              | No broad page rollout until shared behavior passes                                                                              |
| G2 Batch                   | Build/static checks, affected behavior tests, content parity and visual review for every changed page family                                                                          | Worker completion is insufficient without recorded passing evidence and an independent review                                   |
| G3 Integration             | Test the combined candidate commit after integration with current branch changes; run site-wide routes/links, handler tests and affected cross-page journeys                          | A passing worker branch cannot substitute for a passing integration candidate                                                   |
| G4 Full regression         | All mapped routes accounted for; full responsive sweep; key journeys in Chromium, WebKit and Firefox; no-JS, reduced motion, SEO/publication and public-asset-boundary checks         | Missing tests, skipped browsers, empty route sets and unresolved critical failures block release readiness                      |
| G5 Hosted behavior         | Authorized Netlify preview using the candidate version; public aliases, redirects, upload path, scanner, provider responses, actual test-inbox delivery, CSP and environment indexing | Mock provider tests cannot satisfy delivery; local Astro preview cannot satisfy host behavior                                   |
| G6 Content and release     | Required content dispositions, exact release candidate, rollback target and coordinated UI/function versions                                                                          | Held claims or legal/data items need an explicit publish/omit/retain-reviewed-content disposition; do not silently publish them |
| G7 Production verification | After authorized publication: critical routes, forms, canonical/indexing, redirect behavior, error monitoring and agreed rollback checks                                              | Production-only failures trigger the prepared rollback or an explicitly assessed repair                                         |

G2 and G3 run for every integration batch. G4 runs on the final candidate and after later changes that invalidate its evidence. G5 and G7 require the relevant environment and authorization; until run, their status is pending, not passed. G6 content confirmation is independent of technical validation.

Define gates as named executable checks before bulk migration. Use a result manifest with the commit SHA, clean-tree status, dependency lock hash, build identifier, command, expected/executed counts, exit status, browser/viewport, time and artifact path. Use explicit `passed`, `failed`, `not run` and `blocked` outcomes. Hosted results also record the deployment identifier and relevant configuration version without secrets. Screenshots, traces and logs belong to that manifest.

Keep the integration branch at its last accepted state while testing an integration candidate in a separate worktree. Promote the tested candidate without further source changes. If merge conflict resolution, a rebase or a fix changes the candidate, rerun the affected gates and refresh the recorded revision.

## Regression journeys

Each journey tests actual behavior and destination state, not just the presence of a button.

| Journey                    | Assertions                                                                                                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Hiring enquiry             | Home/service/sector CTA reaches Contact; query context survives; active hiring fields validate; notification reaches configured test inbox                                                       |
| Candidate submission       | CV selection and drag/drop, intent and optional phone work; valid upload succeeds; invalid/oversized files fail clearly; GET navigation and POST handling at `/candidates/start` do not conflict |
| Career application         | Listing/filter links resolve for all seven roles; self-score works; trusted open-role identity reaches the handler; closed/unknown role submission fails                                         |
| Sample request             | Preview exposes only page one; valid request delivers full PDF once; provider failure is visible; duplicate submit does not send duplicates; full PDF is absent from public output               |
| Subscriptions              | Blog and quarterly interests persist correctly; duplicate subscription preserves preferences; confirmation and unsubscribe paths work                                                            |
| Scoring demonstrations     | Presets/weights/reset/keyboard interactions work; values and verdict boundaries are correct; evidence changes with the selected skill; user input stops autoplay                                 |
| Navigation and reading     | Mobile menu, audience switch, in-page links, FAQ, notes and related articles work; source popovers are usable by keyboard; back/forward navigation does not duplicate handlers                   |
| Accessibility and fallback | Reduced motion stops continuous animation; testimonial Pause and focus behavior work; primary content and normal submissions remain usable without JS                                            |
| Publication and discovery  | Before/on/after-date tests control direct article URLs and all discovery surfaces; sitemap excludes held content; old GCC URL redirects once to the new canonical route                          |

Test negative paths deliberately: a server 500, scanner rejection, stale form, blocked upload, missing asset and a future article must each produce the expected outcome. A test suite that only exercises success will miss several likely migration failures.

## CI changes required first

At the planning baseline, `.github/workflows/actions.yaml` ran only on pushes and PRs targeting `main`, ran Chromium only, and omitted explicit handler tests. The bootstrap implementation below addresses these workflow gaps.

Before relying on CI for the migration:

1. Cover migration integration and worker PRs with appropriate triggers. Establish a local equivalent for unpublished worktrees.
2. Add explicit handler, data-contract and publication tests. Do not assume the presence of a test file means CI executes it.
3. Build once per candidate and give test jobs the same build artifact. Run static checks, handlers and independent browser shards concurrently where they do not share mutable state.
4. Add named Chromium, WebKit and Firefox results, plus an aggregate gate that fails on any required failed, cancelled or skipped job. A missing browser download is a pending/failed environment, not a pass.
5. Maintain a version-aware coverage map during rollout: retain applicable legacy checks for unmigrated routes and replace obsolete design assertions for migrated ones. The current built-link test rejects Heineken even though v9 includes it; resolve the expectation deliberately rather than deleting link coverage.
6. Extend link checks to rendered/generated links, fragments, redirects and public form actions. The existing static checker explicitly excludes fragments and external URLs and does not validate endpoint behavior. Classify both canonical hostnames as internal: absolute links to `tribera.ai` or `www.tribera.ai` must not escape checks merely because the preview uses localhost.
7. Validate coverage counts against the route map and journey inventory. Tests must fail if expected routes/elements are absent instead of succeeding on an empty selector loop.
8. Upload failure logs, screenshots and traces. Keep a mapping of each retired legacy assertion to its replacement or explicit obsolescence reason.
9. Configure required status checks on the remote integration/release branches when remote configuration is authorized and available. Workflow YAML alone does not prevent merging a red PR.

Do not use `continue-on-error`, broad skips or automatic snapshot acceptance to make the migration appear green. Limited retries may diagnose transient failures, but a retry-dependent pass stays marked flaky until understood. New visual baselines need review against the handoff and accepted changes, not just acceptance of the latest output.

## Evidence and stopping rules

Track technical implementation, content readiness and environment readiness separately. A route can be implemented and visually validated while its content or delivery gate is still pending.

During rollout, preserve compatibility with current form fields until their UI consumers migrate. A new handler must not break an unmigrated page, and a new page must not depend on a handler that is absent from the candidate deployment. Rollback must restore a compatible UI/function pair.

Evidence is valid for the recorded candidate and configuration. A shared CSS or header change invalidates visual/interaction checks across all consumers; a schema change invalidates the affected collections; a route or handler change invalidates related end-to-end and hosted checks. A documentation-only edit does not require rebuilding the site.

Stop integration for a broken route, failed primary CTA, incorrect scoring, rejected valid submission, private-asset exposure, missing required browser coverage or an unexplained test failure. Fix the defect and add or strengthen the test that exposed it before proceeding. Cosmetic differences can be recorded for review, but cannot be silently called visual parity.

The coordinator's update after each batch should state the candidate revision, completed routes, gates passed, gates pending, observed regressions, evidence location and next assignment. Do not report a percentage complete based solely on edited files.

Begin implementation with the bootstrap wave: coordinator freezes the contracts, one worker builds the foundation, one handles backend contracts, and one builds independent validation. This makes parallelism useful immediately while keeping the shared dependencies controlled.

## Bootstrap implementation — 18 October 2026

The workflow now covers migration branches and runs separate checks, handler/gate unit tests, production and preview builds, six browser shards (three engines × two artifacts), and the legacy regression runner. `migration-required` rejects any required job that failed, was cancelled, or was skipped. Remote branch protection still needs to require this status; local YAML cannot enforce merge permissions.

Reproduce the controls locally in this order:

```sh
npm run check
npm run test:migration:unit
npm run build
node scripts/check-migration-build.mjs
npm run test:migration:static
V9_BROWSER=chromium npm run test:migration:browser
V9_BROWSER=firefox npm run test:migration:browser
V9_BROWSER=webkit npm run test:migration:browser
node scripts/test-reviewed-site.mjs
V9_PREVIEW=1 npm run build
node scripts/check-migration-build.mjs --preview
V9_EVIDENCE=artifacts/v9-gates/preview npm run test:migration:static
V9_REQUIRE_FOUNDATION=1 V9_BROWSER=chromium npm run test:migration:browser
BROWSER=chromium npm run test:migration:foundation
```

Repeat the final two commands for Firefox and WebKit. Install each engine using `npx playwright install --with-deps <engine>` first. Concurrent local browser shards need distinct `TEST_PORT` values and evidence directories; CI isolates them by job. Preserve production evidence before the preview build replaces `dist`. The browser audit stores revision, dependency/build hashes, execution counts, errors, screenshots and traces under `artifacts/v9-gates`; a missing browser or empty expected coverage fails.

The v9 CV adapters have dedicated function names (`candidate-profile-v9`, `careers-apply-v9`) and preserve the existing endpoints. They support the CV-first field contracts while retaining origin, timing, rate, honeypot, signature and scanner checks. Career identity must match an open role in the trusted catalog. They reject unexpected/additional files and support HTML responses for native submission. Provider delivery is mocked in local tests. Public aliases, UI wiring, fresh timing tokens without JavaScript and hosted delivery remain pending; an HTML response alone does not complete no-JavaScript submission support.

The foundation is exercised only in `/__v9/foundation` and `/__v9/candidate`, enabled with `V9_PREVIEW=1`. Production build checks reject these routes, preview sitemap entries, internal documentation paths and the supplied full sample PDF (including renamed identical bytes or full base64 embedding). This guard is not a general detector for transformed copies of private documents. Fixtures use explicit valid footer destinations for pages not yet migrated; shared v9 defaults remain subject to later route acceptance.

These controls establish the bootstrap, not G1–G7 acceptance. Full handoff visual comparisons, font provenance/parity, remaining foundation components, all route/content migrations, publication scheduling, endpoint aliases, sample delivery, hosted redirects and scanner/provider checks still require their named gates. Do not begin broad page migration merely because the bootstrap tests pass.

### Baseline reconciliation

Bootstrap validation found two existing behavior defects and repaired them: dynamically generated header links used a missing `#contact` target (now `/contact`, retaining modal behavior), and candidate score presets looked enabled without JavaScript (now disabled until initialization completes). Focused tests cover fallback destinations, modal opening/Escape/focus restoration, static disabled controls and enhanced score calculation.

The former regression runner also targeted superseded v58/v60/v61 homepage markup. `tests/reviewed-suite-migration.json` maps each retired assertion to current coverage or its obsolete design requirement. The current v126 suite and candidate/contact/newsletter journeys are explicitly required. CI runs the journey and text groups separately; `LEGACY_SUITE_GROUP=all` remains the default local runner.

Current-version typography expectations were checked against the existing home v126 and candidate v7 source designs and the checkpoint industries page, with independent screenshot review. Reviewed prose sizes are keyed by exact route, viewport, selector and context in `tests/fixtures/reviewed-prose-contexts.json`; unrelated contexts retain their previous rules. Neither a baseline update nor readable screenshots certify full accessibility. Candidate secondary text contrast remains a later accessibility review item.

An initial Functions comparison test observed disabled controls with JavaScript enabled. This did not reproduce in six focused sequence runs or the corrected full suite. The test now waits at most five seconds for the component's explicit ready state and both enabled controls, and includes script/request/page-error diagnostics on failure. It continues to require disabled controls with scripts disabled or blocked. No Functions product-source fix is claimed. Initial WebKit timeouts occurred under exhausted local memory; unchanged-timeout runs passed after reducing concurrency, including the combined preview artifact.

### Verified bootstrap result

The combined bootstrap passed the required local checks on 18 October 2026:

| Check                                               | Result                                                                                             |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Repository checks                                   | Astro: 0 errors, 0 warnings; ESLint and formatting passed                                          |
| Handler and gate unit tests                         | 84 passed, 0 failed/skipped                                                                        |
| Production and preview boundaries/static references | Passed; production has no fixtures; preview has two noindex fixtures outside sitemap               |
| Browser smoke                                       | Chromium, Firefox and WebKit on both artifacts: 90 route/viewport checks passed                    |
| Foundation interactions                             | All three engines passed, including reduced motion and no-JavaScript fallback                      |
| Legacy journeys                                     | All 11 suites passed                                                                               |
| Typography and full-text sizing                     | 304 route/viewport checks and 12,820 size checks passed                                            |
| Default text census and contract                    | 304 records; 18,556 contexts; all nine contract mutation cases passed                              |
| Interaction-state census                            | 152 records, 709 UI states, no capture errors or failed controls; 15,523 prose observations passed |

Local evidence is in `artifacts/v9-bootstrap/bootstrap-status.json`, `baseline-result.json`, browser manifests/traces/screenshots and the associated logs. Production artifact source revision is `1952844`; subsequent bootstrap changes reconcile tests, CI and documentation without changing the built product. `tests/fixtures/text-inventory-review.json` records the verified production build hash and independently reviewed baseline provenance. Initial failures and their dispositions remain in the evidence.

This accepts the bootstrap controls, not the full website migration or G1–G7 release gates. Remote CI/required branch protection, hosted form/provider/scanner delivery, no-JavaScript upload timing, full visual parity, font/asset provenance, content approval and accessibility remain pending. In addition to faint candidate secondary text, the existing About `.step` opacity of `0.4` needs review during that page's accessibility migration. The next wave must finish foundation acceptance before parallel production-page batches begin.

### Claude review closure

Actual Claude Code reviews of `cabcd11` covered backend/CI contracts and foundation/baseline evidence separately; both returned **ACCEPT WITH FOLLOW-UPS**. The follow-up at `339264f` returned **ACCEPT**, with no bootstrap blockers, after the inherited-key defect in the legacy career lookup was fixed and foundation screenshot capture made reproducible using reduced motion. The expanded unit suite passed 87 tests; all three preview browser gates passed 16 checks each. Reports, model/session provenance and dispositions are saved in `docs/reviews/v9-bootstrap-2026-10-18/`.

The remaining summary-generator improvement is non-blocking: bootstrap summary files are convenience records, not independently executable gates. Continue to use raw gate JSON, command logs and required CI results as the authority, and add reproducible summary generation before later batches rely on summaries alone. Existing G1–G7 acceptance requirements remain unchanged.

## G1 private foundation acceptance — 18 October 2026

The shared foundation batch is accepted at `5baa47b`, with an actual Claude follow-up verdict of **ACCEPT**. See the [acceptance record](v9-g1-acceptance.md) for changes, exact validation, artifact hashes, failed-run dispositions and remaining boundaries. All 77 existing HTML pages and 214 baseline files remain byte-identical; no production page adopts the new layout yet.

The foundation command now includes article/source/testimonial behavior and final-cascade comparisons. The new `scripts/v9-evidence.mjs` generates a fail-closed aggregate from an explicitly required set of raw static/browser reports; this resolves the bootstrap's manually assembled-summary follow-up for subsequent batches. It does not substitute for component, Claude, hosted or release gates.

Next: G2 representative pages in private previews. Keep full-page parity, page-owned product/carousel behavior, forms, future footer destinations and hosted validation gated. Local acceptance does not assert that remote CI or branch protection has run.

## G2 representative-page / G3 batch acceptance — 18 October 2026

The private Home, Candidates, About, BFSI and representative article batch is accepted at `1cd2d48`, with actual Claude **ACCEPT**. The [acceptance record](v9-g2-acceptance.md) documents scope, exact provenance, failures and remaining boundaries. All 248 G1 output files, including 77 public HTML pages, remain byte-identical; 14 assets are added. No public route adopts these pages yet.

Validation passed: 110 unit tests; all three 11-suite page chains (130 page checks); four foundation suites per engine; 120 production/preview smoke checks; and eight hash/revision-bound static/browser reports. Full product checks/builds are from `f3e095d`; later changes are test/scripts only and separately checked. All final required evidence is bound to the same clean `1cd2d48` revision. Claude reviewed the complete evidence and later capture repairs. Reports and precise provenance are in `docs/reviews/v9-g2-2026-10-18/`.

Run independent Chromium/Firefox work in parallel on separate preview ports; keep heavy WebKit validation serial on this machine. A completed passing suite chain may be retained while another independent gate reruns only when commit, clean tree, dependency lock and build hashes remain identical. Preserve failures and explain the rerun; never substitute a partial or stale chain.

Next: services/conversion pages and remaining sector/Intelligence pages, under the same G2/G3 and Claude-review process. G4 full-route regression, G5 hosted validation, G6 content/release decisions and G7 production verification remain pending. No push, deployment, remote CI or branch-protection result is claimed.

## A1 private hiring pages / G3 batch acceptance — 19 October 2026

Services, Interview as a Service and Case Study are accepted locally at `6ce90ca`, with actual Claude **ACCEPT**, no blockers. See the [acceptance record](v9-a1-acceptance.md) and [verbatim Claude review](reviews/v9-a1-2026-10-19/final-report.txt). All 262 accepted G2 files, including 77 public HTML pages, remain byte-identical; four assets are added.

All three four-suite page chains pass at the same clean revision and preview hash: 78 responsive/no-JavaScript page states plus behavior and navigation coverage. Full checks, 110 unit tests, 138 production/preview smoke checks and the eight-report evidence aggregate pass. All 34 long source paragraphs and source h1/h2 headings are retained. Final visual follow-ups close the founder image and native FAQ-spacing findings.

The later documentation commit preserves review and raw evidence; it does not change the reviewed product. Public routes remain unchanged. Contact context capture, sample delivery, remaining conversion/sector/Intelligence pages and G4–G7 remain pending. Next batch: Contact and sample-request flows. No push, deployment or remote CI result is claimed.

## A2 private Contact and sample requests / G3 batch acceptance — 19 October 2026

Contact and sample-request flows are accepted locally at `8418069`, with actual Claude **ACCEPT**, no local blockers. See the [acceptance record](v9-a2-acceptance.md) and [verbatim final review](reviews/v9-a2-2026-10-19/final-report.txt). All 266 accepted A1 output files, including 77 public HTML pages, remain byte-identical; eight assets are added.

Full checks and 124 unit tests pass. All three engines pass four-suite A2 and A1 chains: 52 new-page states, 78 prior-page states, 39 actual-handler form scenarios, and affected navigation. All 150 production/preview smoke checks and the eight-report revision/hash-bound aggregate pass. Five-width visual reviews and official function-bundle/private-PDF runtime verification pass locally with mocked transport.

The acceptance commit preserves documentation/evidence only. New pages remain private. Live provider/scanner/recipient/platform validation, public aliases, remaining conversion/sector/Intelligence pages and G4–G7 remain pending. No push, deployment or live email occurred. Continue the next bounded page-family batch with independent reviews and actual Claude acceptance.
