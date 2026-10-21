# Local navigation performance — 21 October 2026

The user reported slow page-to-page navigation on the local development server. Warm HTTP responses were quick (~8–16ms on sampled routes); browser tests exposed development resource overhead. The development route loaded 23–27 resources versus 12–14 on the built site. This identifies a contributor, not proof of every delay seen in the user's browser.

The local server at http://localhost:4321 now serves a fresh optimized production build using Astro preview. No page design or animation code changed. `npm run serve:local` reproduces this build-and-serve workflow. Editing still uses the separate development command; a built preview requires rebuilding after source edits.

## Measurements

Chromium, 1366×900, simulated 100ms latency and 10Mbps download, same sequence of header-link navigation: Services, Intelligence, About, Candidates, About. Each server got a fresh browser context; assets could cache within its navigation sequence. Raw navigation/resource entries are retained.

- Development median navigation `loadEventEnd`: 1271ms.
- Separate optimized-preview comparison median: 674ms.
- Follow-up at the original port after switching: 858ms, approximately 32% lower than the development median.
- Typical resource requests: 25 → 14.

These are single local sequences with synthetic network conditions, not field Web Vitals or a guarantee for every page. CPU/run-to-run variance is visible (including the Candidates sample). No changes to production hosting or cache headers were made.

## Validation

The fresh normal build passed, every header navigation in the follow-up sequence completed, and the migration build-boundary check passed (274 files, zero private fixtures). README/package formatting and git whitespace checks passed. The existing dev process was stopped and the optimized preview remains running on port 4321. No deployment occurred.
