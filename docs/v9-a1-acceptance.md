# A1 private hiring pages / G3 integration — 19 October 2026

Status: **accepted for the bounded local A1 / per-batch G3 gate**, with actual Claude **ACCEPT**. This is a bounded private-preview batch, not full migration or deployment acceptance.

Starting checkpoint: `f8fc8cc`. Evidence revision: `6ce90cad47644a8cc87bfb5ef4624cfb009611d9`. Product source: `b2d5100`; subsequent commits change navigation tests only. Preview was built at `7a18e7d`, with identical product source; production was built at the evidence revision. Full checks and 110 unit tests pass at the evidence revision. Preview hash: `faf625301153f5a9aa755bc3de3013bd3099d1c7c22752dcea4da064fcc3de05`. Production hash: `c00e646d607b92f28d379ec110fb9855a07f41b7353c6e8f6737700ba2fb34f2`. Lock hash: `56be5c8181c79995befb9b07957589898a1eabfd027f0c8a8e82c4c178c370fa`.

## Scope and local evidence

Three complete private pages: Services, Interview as a Service and Case Study. Services retains twelve offerings, nine problem choices, four primary tickets, eight extended disclosures and five FAQs. IaaS retains its six FAQs, 48-hour batch promise and per-interview plus success-fee model. Case Study retains 327 profiles, eleven re-read, two returned, one hire in 22 days; Home's separate 126-profile/two-hire case remains distinct.

All three engines pass four-suite A1 chains, including responsive/content checks, JS/no-JS interactions, enquiry navigation and existing preview navigation. Chromium covers 42 page states; Firefox and WebKit 18 each: 78 total. All 34 long source paragraphs and source h1/h2 headings are retained. Image completion, typography, overflow, reduced motion and resource ceilings are enforced. Local compressed-byte estimates and diagnostic timings are not hosted performance/INP measurements.

Eight required static/browser reports pass the revision/hash-bound aggregate. Production and preview smoke run in all three engines, 138 route/viewport checks total. Production has 77 HTML pages and no private fixture; preview has 88 HTML pages and 11 noindex fixtures outside the sitemap. Full private sample PDF remains excluded. Production byte comparison: `262` accepted G2 files unchanged, `0` changed, `0` missing, `4` added; all 77 public HTML pages unchanged. Static-byte equality does not certify provider delivery.

Two isolated workers implemented the pages and cross-reviewed each other's work. Full-height visual review covers 390/768/1024/1366/1920 for all three pages. Final product capture follow-up confirmed founder image presence and corrected native IaaS FAQ spacing. Reports record minor decorative/spacing differences, shared client-strip wrapping/tighter footer, and the intentional manual case controls. This is not pixel identity or exhaustive accessibility certification.

Existing G2 body/scorer/form logic and shared styles are unchanged. Affected existing preview navigation and public smoke were rerun locally; accepted foundation/full G2/legacy journey results remain the baseline. CI continues to require those complete suites plus the new A1 chain. No remote CI or branch-protection result is claimed.

## Deliberate boundaries and failure dispositions

Native disclosures and readable server-rendered recommendations/results work without scripts; enhanced pickers and case stages are manual with keyboard controls. Only actual Services marks Services current. The source IaaS parent underline is deliberately absent to avoid marking a different destination aria-current=page.

Contact remains legacy. Queries survive navigation but new service/intent notification capture is not certified. Case booking follows Services#sv-scorecard and then its enquiry CTA. Sample CTAs honestly request a sample through Contact; no download or delivery is simulated. Publication claims still need content approval.

Preserved failures were resolved without relaxed assertions: diagnostic extraction included JSON-LD as ignored .js source (renamed .js.txt); four Services components needed formatting; the initial picker test compared labels to a different source sentence (now checks actual source button labels plus recommendation model); a real Services aria-current mismatch was repaired; Case navigation test incorrectly required direct Contact links (now exercises its source-defined intermediate journey). A later full check linted minified copied build evidence; moving that copy outside the checkout restored the unchanged check. No product repair is attributed to these test/evidence setup corrections. Global cross-document transition rules were removed after peer review. Claude's source-review portrait provenance follow-up is now covered by exact original JPEG byte equality.

See the [verbatim final Claude review](reviews/v9-a1-2026-10-19/final-report.txt), [review provenance](reviews/v9-a1-2026-10-19/manifest.json), [raw evidence index](reviews/v9-a1-2026-10-19/evidence-index.json) and [dispositions](reviews/v9-a1-2026-10-19/dispositions.md). Raw JSON copies use `.json.txt` to preserve exact bytes through formatting. Full artifacts are under `artifacts/v9-a1/`.

## Remaining gates

G4 full-route regression, G5 authorized hosted validation, G6 content/release decisions and G7 production verification remain pending. Contact/context capture, sample delivery, remaining conversion pages, sectors, Intelligence, provider/scanner validation and subscription are not completed here. No push or deployment occurred. Next bounded batch: Contact and sample-request flows under the same gates and actual Claude review.
