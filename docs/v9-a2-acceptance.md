# A2 private Contact and sample requests — 19 October 2026

Status: **accepted for the bounded local A2 / per-batch G3 gate**, with actual Claude **ACCEPT**, no local blockers. This is bounded private-preview acceptance, not completion of the migration or release approval.

Accepted baseline: `449d693`. Frozen evidence revision: `8418069a807b6a85e500200aa9cfcd82883fa890`. Preview product build: `53dc282c625eac11a48f1a88a5135bc20be75060`; later changes are audit/tests only, with the diff preserved. Production built at the evidence revision. Preview hash: `730a13735e90e40f2332486233d6e51fdf2a28424aef4fdd44fed306d5c02abc`. Production hash: `c1a062e3d50d3754c493fc9e042e90af469108ed417784e718c3dc4ce641050d`. Dependency lock: `56be5c8181c79995befb9b07957589898a1eabfd027f0c8a8e82c4c178c370fa`.

## Behavior and scope

Complete private Contact and sample-request pages preserve source headings, copy, office photographs and sample page-one preview. Private navigation connects them; existing public pages and legacy form handlers remain unchanged. Contact sends only the active hiring/looking fields, includes validated service/sector context, and requires a validated CV for looking submissions. All recipients come from explicit server configuration. Missing configuration fails visibly.

Both flows support enhanced and native forms using request-time signed tokens, minimum timing and a two-hour expiry. Success requires actual handler completion. Ambiguous delivery freezes the original payload and token; retries reuse durable provider idempotency keys. Only definitive validation errors permit editing. Expiry/conflict stops retries and hides alternate submission links. Native success uses POST/Redirect/GET. Native upload retries require reselecting the same CV.

Sample delivery sends the private PDF to the requester, then a separate lead notification to the configured team address, without subscription. Every retry replays the requester step first, preventing changed lead details from creating an independent effect. Resend supplies durable idempotency; no process-local deduplication is assumed. Full PDF remains server-only; the exact source page-one JPEG is public.

## Completed local gates

Full repository checks pass: Astro zero errors/zero warnings (147 inherited hints), ESLint and formatting. All 124 unit tests pass, none skipped. All three engines pass four-suite A2 chains and four-suite A1 regression chains at the same clean revision, lock and preview hash. A2 has 52 responsive/no-JavaScript page states and 13 actual-handler journey scenarios per engine (39 total). A1 has 78 page states plus behavior and navigation checks. All ten long A2 source paragraphs and source h1/h2 headings are retained; sample source has only h1. Image loading, overflow, reduced motion and local resource ceilings pass.

Eight required static/browser reports pass the fail-closed aggregate. All-engine production/preview smoke covers 150 route/viewport checks. Preview contains 90 HTML pages including 13 private fixtures; production contains 77 HTML pages and no private fixtures. Full PDF exclusion passes. Exact byte comparison against accepted A1 production confirms 266 unchanged files, zero changed or missing, and eight added assets (two CSS, five JPEG, one JS). All 77 public HTML pages remain unchanged.

Official `@netlify/zip-it-and-ship-it@16.3.1` packaging includes the exact PDF (SHA256 `9f5bcd2c4417b805b4f2d136934800b4999a0c3a81c4cb2b7de6d7689da9507f`). The extracted compiled handler successfully reads and attaches it outside the checkout with two mocked provider calls. Executable backend, PDF and include configuration are unchanged from that bundle. This is a local packaging/runtime check, not a hosted delivery result.

Three isolated workers implemented Contact, sample and backend in parallel, with cross-reviews. Both full-height visual reviews accept five widths (390/768/1024/1366/1920). Final Contact reference captures settle original reveal states and decode images; both office photographs are visible. Minor photo framing/row spacing, extra native fallback/status space and the accepted shared footer spacing differ from the standalone handoff. No pixel-identity claim is made. Source asset equality is independently tested.

Existing G2 body/scorer/legacy behavior remains the accepted baseline. Affected navigation and public smoke were rerun; complete G2/foundation/legacy suites remain required in CI. No remote CI or branch-protection result is claimed.

## Failure dispositions

Peer review found Contact expiry unlocking and sample alternate-request ambiguity. The corrected flows retain terminal snapshots, hide the native alternate, and unlock only explicit validation errors; all-engine ambiguity/expiry journeys pass. Scoped intrinsic sizing fixes resolved real Contact and sample320px overflow without hiding document overflow. Final page states pass.

The static checker initially rejected implemented native GET endpoints; its exact allowlist now requires each handler to exist and still rejects unknown functions/fragments. A Playwright fieldset-disabled query did not reflect DOM state; the replacement verifies both fieldset.disabled and every inactive control, preserving payload isolation tests. Original source photos loaded but remained unrevealed; final capture explicitly completes source reveal classes and waits decode, followed by independent visual review. Source-heading logic now handles the source sample's legitimate lack of h2. Formatting corrections and an initial bundle-harness import typo were diagnostic repairs. An attempted `test:unit` command did not exist; the required `test:migration:unit` subsequently passed124 tests. Original failures remain archived; no required suite was skipped or timeout increased.

## Remaining boundaries

G4 full-route regression, G5 authorized hosted provider/scanner/test-inbox verification, G6 content/recipient/publication decisions and G7 production verification remain pending. Verify real provider configuration, recipient ownership, platform upload limits, attachment delivery and scanner readiness before release. The application10MiB limit does not certify host transport capacity. Provider/PDF configuration must stay stable during the retry window; changes fail closed. Source marketing/response-time/privacy/office claims still need publication approval. Local resource estimates are not hosted Web Vitals, and visual reviews are not exhaustive accessibility certification.

No push, deployment or live email occurred. Remaining conversion pages, sectors and Intelligence follow under the same gates. Review reports, raw evidence provenance and exact limitations accompany this record.

See the [verbatim final Claude review](reviews/v9-a2-2026-10-19/final-report.txt), [model/session provenance](reviews/v9-a2-2026-10-19/manifest.json), [evidence index](reviews/v9-a2-2026-10-19/evidence-index.json) and [dispositions](reviews/v9-a2-2026-10-19/dispositions.md). Raw JSON copies use `.json.txt` to preserve exact bytes. Full local artifacts are archived under `artifacts/v9-a2/`; preserved builds are `preview-dist` and `production-dist`. The acceptance commit changes documentation only after the frozen reviewed revision.
