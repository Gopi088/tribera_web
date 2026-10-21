# Copy, design and visual review — 21 October 2026

Scope: current optimized local build at http://localhost:4321. This is a review, not a policy approval or an implementation pass. No product source was changed for this review.

## Evidence and coverage

- Fresh Chromium full-page and first-viewport screenshots at 1366 and 390 CSS pixels for 24 representative public routes; extracted visible text and main-content links accompany each route.
- Routes cover the main conversion journeys, About, the case study, Industries and two sector examples, Intelligence, Blog and two articles, Careers and a job, Functions and a function, candidate signup, and all four legal/data pages.
- All 48 captures returned HTTP 200 and had no document-level horizontal overflow. This does not prove every element is readable or every interaction works.
- Eight key routes also received 320/768/1920px captures and overflow checks (24 additional checks, all without document-level overflow).
- Claude CLI was invoked with read-only access in three review packets. Prompts and raw JSON responses are preserved here. Screenshots and copy are in `artifacts/copy-design-2026-10-21/`.
- This is representative visual coverage, not a visual audit of all 81 public content pages. Screenshots do not validate form delivery, animation timing, business claims, legal sufficiency, or external research figures.
- Legal page presentation dates and underlying policy revision dates are intentionally distinct. Existing legal substance has not been rewritten or re-approved.

See `findings.md` for the consolidated findings, source validation and recommended order of work. Raw Claude observations are advisory; the consolidated report distinguishes confirmed issues from suggestions and claims requiring owner evidence.
