# Tribera v9 parallel execution and gates

Execute the [migration plan](v9-migration-plan.md) with isolated workstreams, one integration owner and evidence for every gate. Parallel work is safe when workers share stable contracts and have separate files. Shared layout, schema and routing changes must be coordinated before their consumers expand.

Tests reduce the chance of regressions; they cannot guarantee that no defect exists. The operating rule is that failures, missing coverage and untested environments remain visible and cannot be reported as a passed gate.

This document defines the execution policy. The new gate runner, CI jobs and repository branch protections still need implementation or configuration. Creating this document does not enforce them.

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

The current workflow in `.github/workflows/actions.yaml` runs on pushes to `main` and PRs targeting `main`. A direct push to `feat/v9-migration`, or a PR targeting it, does not currently trigger that workflow. It runs Chromium only and does not explicitly run `npm run test:handlers`.

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
