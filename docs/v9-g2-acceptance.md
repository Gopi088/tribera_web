# G2 representative pages and G3 integration — 18 October 2026

Status: **accepted for the local G2 representative-page / per-batch G3 integration gate**, with actual Claude **ACCEPT** at `1cd2d48f5ce3b183c1c2164a5b7b3896abc596fc`. This is not full migration or deployment acceptance.

See the [verbatim final Claude report](reviews/v9-g2-2026-10-18/final-report.txt), [review provenance](reviews/v9-g2-2026-10-18/manifest.json) and [closure/dispositions](reviews/v9-g2-2026-10-18/dispositions.md).

Product build source: `f3e095d698ee4d94b334758f3d88a0872118de77`. The later candidate includes test-only cached-response, no-JavaScript readiness and deterministic font-fixture repairs; no product source or dependency change follows the build. The accepted starting point is `10d8b2c`.

Evidence revision: `1cd2d48f5ce3b183c1c2164a5b7b3896abc596fc`. Preview build hash: `4bd23eb34966f323f5604b2313e6f68dfcf6341bb82065919805f62f20e4dfc7`. Production build hash: `23f290309df91e97ddca173a2c77e7a77b46a6998cc7d25dd9250ce31783b554`. Lock hash: `56be5c8181c79995befb9b07957589898a1eabfd027f0c8a8e82c4c178c370fa`. These build hashes use the gate script’s sorted path/file-digest algorithm; inventory hashes in the byte comparison use its separately documented algorithm.

## Scope

Five complete private pages: `/__v9/home`, `/__v9/candidates`, `/__v9/about`, `/__v9/bfsi`, and `/__v9/article`. They compose native Astro components with the accepted shared shell, pinned fonts and icons. All retain source sections and editorial prose. Normal production routes still use their existing implementation.

Home includes shortlist/scoring/evidence, hiring bar, timeline, expert tabs, funnel, services, testimonials and FAQs. Candidates includes scoring, CV question tabs, team checks, illustrative privacy controls, timeline, upload, testimonials and FAQs. About retains the letter, chart, team distinctions, history, retention discussion and closing claims. BFSI includes roles, sources, comparison weights for eleven sectors and FAQs. The article retains its cover, body, notes, citations, author, related reading and sharing.

The candidate native GET form supplies a fresh timing token and normal multipart POST; successful HTML submissions redirect to a GET receipt so refresh cannot deliver again. Existing public form contracts remain compatible. Tests use mocked delivery. Article subscription is visibly unavailable until its real provider and consent flow exist.

## Verified local evidence

- Full repository checks: Astro 0 errors / 0 warnings / 147 hints, ESLint and formatting pass; subsequent test-only changes pass scoped checks.
- 110 unit tests pass, none skipped.
- All three complete page chains pass 11 suites each on the same clean revision and preview hash: 33 suite runs and 130 responsive/no-JavaScript page checks.
- All four foundation suites pass in Chromium, Firefox and WebKit, including 21 typography and 95 content reference comparisons per engine.
- Production and preview smoke gates pass in all three engines: 120 route/viewport checks. The fail-closed aggregate verifies all eight required static/browser reports at the same revision, lock hash and respective build hashes.
- Production:77 HTML pages,262 files; no private fixture or full sample PDF. All6770 internal links resolve.
- Preview:85 HTML pages,270 files, eight noindex private fixtures outside sitemap; static references and private-asset boundary pass.
- Byte comparison: all248 accepted G1 files, including77 HTML pages, are unchanged; none removed;14 new assets. This verifies existing static output, not hosted function/provider delivery.
- Full-page visual review covers five widths 390/768/1024/1366/1920 for every representative page. Four blocking mismatches were repaired: CV rows, candidate FAQ styling, About portrait crop/color, and article header container. Final screenshot follow-up confirms repairs.
- All127 source paragraphs of at least100 characters are retained (Home 29, Candidates 22, About 40, BFSI 20, Article 16); source heading coverage is nonempty and enforced separately.

## Deliberate differences and limits

Page READMEs describe deterministic/manual examples, reduced-motion and no-JavaScript fallbacks, temporary working preview destinations, disabled subscription, and static About/BFSI illustrations. Home sample CTA says Request a sample because it reaches Contact. Shared client strips wrap under reduced motion. Content/publication decisions remain pending; the article dated 19 October remains private.

Visual review records minor residual differences rather than claiming pixel identity: phone CTA/FAQ spacing and tighter shared footer, a faint candidate phone-hero decoration, article eyebrow vertical spacing, and the BFSI open-FAQ indicator. No blocking clipping, missing sections or broken images remains in that review. This is not exhaustive accessibility certification.

Local resource budgets use gzip estimates for HTML/CSS/JS and raw bytes for already compressed fonts/images. They fail on absent coverage or exceeded category limits. Observed layout-shift sums and long tasks are diagnostic, not standardized CLS/INP or hosted performance measurements. Long tasks were sampled on a shared development machine; release performance remains a later gate.

## Failed-run disposition

Preserve raw failures. Built HTML minification removes whitespace around line breaks; heading parity now compares rendered text. No-JavaScript scrolling is driven from Node after browser RAF evaluation failed. Header current-page matching now normalizes trailing slashes. Navigation waits for a rendered heading after same-URL activation. Firefox 304 responses are valid cache revalidation and no longer treated as failed page loads.

A controlled Firefox probe demonstrated fonts reaching loaded while browser-scheduled polling stopped in a no-JavaScript context. The new Node-driven helper retains the 15-second deadline, captures pending font details and has delayed-font and never-ready regression tests. The original timeout lacked that snapshot, so its exact timing is not claimed proven. Generic native disclosure and image readiness now use the same bounded Node polling. The WebKit font regression initializes the font set before installing controlled CSS, holds real pinned font responses, then verifies both families load without errors; this controls a browser lifecycle difference without extending deadlines. WebKit also skipped lazy portrait activation during rapid 20 ms scroll visits. A diagnostic verified successful 200 responses when portraits stayed visible; the capture now exposes pending images with one shared 15-second deadline, then enforces completion and nonzero intrinsic width. The focused portrait appearance test likewise waits for native completion before its unchanged exact-byte, crop, color and dimension assertions. One source-reference navigation timed out at its unchanged 30-second threshold; its unchanged rerun passed and the failed run is preserved. A separate shared preview process exited 143 and caused connection-refused failures; subsequent gates own their servers and ports. No product fix is attributed to that process interruption. A later Chromium run reported ERR_NETWORK_CHANGED while WebKit reported an About navigation access-control error in the same minute. Both failed runs were preserved and their required chains rerun unchanged; temporal coincidence is not proof of a shared cause. WebKit later failed the existing G1 source-reference body-font loaded assertion; an unchanged isolated rerun passed all 95 comparisons, followed by a complete required foundation rerun. The original lacked a font-state snapshot, so its cause is not asserted. No font assertion or deadline was relaxed.

Claude's initial requests concerned missing pages during CI sequencing and candidate strip wording. All pages now exist and wording matches the source. PRG, scoring shares, no-JavaScript evidence, preview sharing, mobile tab visibility and contrast findings are fixed with focused checks. Earlier source-only ACCEPT was not treated as final acceptance. The final frozen review covers the completed evidence and later visual/harness corrections and returns ACCEPT with no blockers.

The full legacy journey/text census was not rerun locally because all accepted G1 production output is byte-identical; its prior accepted results remain the baseline and CI still requires those suites. Review reports, raw gate copies and provenance are committed under `docs/reviews/v9-g2-2026-10-18/`; full local artifacts are in `artifacts/v9-g2/`.

## Remaining boundary

G4 full-route regression, G5 authorized hosted validation, G6 content/release decisions and G7 production verification remain pending. Public aliases, scanner/provider/test-inbox delivery, subscription lifecycle, scheduled publishing, sample delivery and remaining page families are not certified by this batch. Local validation does not claim a remote CI run or branch-protection configuration. No push or deployment occurred.

Next: rollout batch A, services/conversion pages and remaining sectors/Intelligence, continuing the same G2/G3 and Claude review process.
