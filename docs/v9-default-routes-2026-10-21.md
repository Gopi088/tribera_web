# Reviewed v9 pages are the default routes — 21 October 2026

The initial promotion put the reviewed components at 23 normal URLs: `/`, Candidates, Services, Interview as a Service, Case Study, About, Contact, Sample Write-up, Industries, Intelligence, the twelve sector detail pages, and `/blog/seventeen-interviews-one-hire`.

The subsequent public-content migration moved Careers and role details, Functions and function details, the blog index and older articles, category/tag lists, candidate signup and the 404 page to `V9Layout`. These pages use shared v9 content styles and retain their content, data and endpoint contracts. Historical pre-v9 source remains available but is no longer imported by these public routes. Browser evidence for this migration is recorded separately under `artifacts/v9-content/`.

Public route wrappers use the same components and assets as the reviewed previews. A context-aware link resolver sends public visitors to public URLs while keeping existing `/__v9/` review journeys isolated. Development and explicit preview builds still expose those review routes; a normal production build excludes them.

Public pages have index/follow metadata, canonical URLs and social metadata. The British-spelling GCC URL redirects to `/industries/global-capability-centers`; the alias is excluded from the sitemap. Netlify has an explicit 301 rule, while local static preview uses Astro's generated redirect document.

Intelligence remains explicitly illustrative sample data. Newsletter and quarterly subscriptions remain in preparation; their calls to action now lead to the existing notification waitlist. The promoted forms retain their reviewed v9 endpoint contracts. Hosted delivery, deployment and release/content gates are not certified by this local routing change.

Validation evidence is under `docs/reviews/v9-default-2026-10-21/` and screenshots under `artifacts/v9-default/`. Reproduce browser checks against a running production preview with `TEST_BASE_URL=http://127.0.0.1:4392 BROWSER=chromium npm run test:migration:public` (repeat with Firefox and WebKit).

Historical visual regression files still contain assertions for superseded v126/public designs. Required public regression now runs `scripts/test-v9-public.mjs` against the production artifact in Chromium, Firefox and WebKit; the replacement coverage is recorded in `tests/reviewed-suite-migration.json`. The initial validation evidence below predates that content migration and does not certify the later source or all CI jobs.

The later content corrections and release validation are recorded in [the 22 October release record](v9-release-readiness-2026-10-22.md).

## Completed checks

- Normal production build: 80 generated pages (82 HTML inventory entries including redirect documents), zero private preview fixtures.
- Static audit: all 77 baseline routes retained, 7,980 references checked, no missing references. Four planned future routes remain unimplemented, listed in the review dispositions.
- Browser checks: all 23 promoted routes at 390 and 1366px in Chromium, Firefox and WebKit (138 page/viewport records), plus alias, contextual navigation, tablet keyboard and no-JS checks.
- 124 migration unit tests passed. Astro check: zero errors/warnings. Scoped ESLint, Prettier and whitespace checks passed; Candidates received only whitespace formatting after the build.
- Actual Claude review: ACCEPT for local route promotion; report and follow-up dispositions are in the linked evidence folder.

The default development URL `http://localhost:4321/` was directly checked and serves the new homepage. Nothing was committed, pushed or deployed.
