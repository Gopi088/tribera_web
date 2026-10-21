# Shared navigation and legal-page presentation — 21 October 2026

All 81 public content pages now render exactly one v9 header and footer. The legacy widget entry points delegate to the shared v9 components, using scoped font/spacing compatibility rules so page-local resets and 20px legacy root typography do not change the shared navigation. The CMS administration app and generated redirect document are intentionally outside the marketing shell inventory.

Privacy, Security and Terms now use the v9 layout. They show an explicit page-updated date of 21 October 2026 separately from their original content revision dates. The policy bodies were compared against the original checked-in Markdown, ignoring whitespace and the moved date line, and are unchanged. No legal review or new effective date is claimed. Draft legal handoff text was not promoted.

The Data processing footer link now reaches `/dpa`, a purpose-specific request/contact page with links to Privacy, Security and Terms. It no longer mislabels Privacy as a DPA, and does not pretend to be a signed agreement or publish unverified processing commitments. All four legal pages retain noindex/follow; the sitemap excludes them. The old content pages keep their existing body implementations and use the common navigation/footer.

## Validation

- Production build passed; local optimized server on port 4321 serves the rebuilt pages.
- Static audit: 83 HTML inventory entries, all 77 baseline routes retained, 5,296 references, zero missing targets.
- Shared shell inventory: exactly one new header and footer and zero old shell elements across 81 public content pages.
- Chromium: 39 route/viewport checks at 390, 1366, 1920px. Firefox and WebKit: 26 each at 390 and 1366px. All 91 checks passed, including measured shared styles, mobile open/Escape, viewport overflow, date rendering and data-processing destination.
- Astro check: zero errors and warnings. Scoped ESLint, Prettier, migration boundary tests and git whitespace checks passed.
- Representative header/footer screenshots and legal pages were inspected locally; screenshots are under `artifacts/shared-chrome/`.

Reproduce with `BROWSER=chromium npm run test:shared-chrome` against the running built preview (repeat with Firefox/WebKit). Raw reports are retained here. No deployment or full legacy-CI acceptance is claimed.

The independent Claude review returned ACCEPT for the bounded presentation/navigation scope; raw model/session provenance and the report are retained in `claude.json` and `claude.md`. Two wording corrections to that report: `publicLinks` resolves preview-map values through `v9Href(..., '/')`, so public pages link to normal routes, not `/__v9/`; noindex/follow legal pages are public pages, not private previews. The built-link audit and browser results confirm the actual routing. These corrections do not change the reported visual/date verdict.
