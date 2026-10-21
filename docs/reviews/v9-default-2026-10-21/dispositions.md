# Claude review dispositions

Claude accepted the bounded public-route promotion. Its raw JSON includes the actual session and model provenance.

- Inventory gap: all 77 baseline routes remain present. The four missing entries are planned future routes, not promoted pages: two new blog posts (`gcc-hiring-india-leadership-roles`, `hiring-ai-engineers-india`), `/dpa`, and `/how-we-work-with-numbers`. They are marked not started. Shared reviewed navigation uses the existing Privacy/About fallbacks. All 23 promoted routes were checked in each browser.
- Preview exclusion: `check-migration-build.mjs` inspected 274 production files and found zero preview fixtures. The default dev homepage returns index/follow; `/__v9/home` remains noindex/nofollow in development.
- Gray office image in screenshot: the image is lazy-loaded. Scrolling each Contact image into view and decoding it confirmed all four load with nonzero native width. The Bengaluru photo is 1080px wide. See `contact-images.json.txt` and `artifacts/v9-default/contact-office-loaded.png`. No asset is missing.
- Trailing-slash helper edge case: current private source links use slashless `home`, `bfsi` and `article` aliases, which resolve correctly. Supporting other input spellings remains a non-blocking hardening opportunity; no current navigation uses those spellings.

No deployment, provider delivery, or complete legacy CI acceptance is claimed. Intermediate failures caught a stale header preview link and a test assumption about trailing slashes in canonical URLs; the final build and checks reflect those corrections.
