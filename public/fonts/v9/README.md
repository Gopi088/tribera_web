# Tribera v9 font provenance

These are unmodified WOFF2 files returned by the exact Google Fonts CSS request found in every handoff HTML page. The request, download URLs, SHA-256 digests, font versions, fontTools axis metadata, face mappings and retrieval time are in `manifest.json`. All 48 returned face/subset rules are retained in `src/assets/styles/v9/fonts.css`, using 19 distinct files (610,492 bytes). Browsers load only the subsets and weights used by the document.

The required faces are:

- Fraunces: normal 400/500/600; italic 400/500; optical-size axis 9–144.
- Inter Tight: normal 400/500/600.
- JetBrains Mono: normal 400/500.

The new CSS preserves the handoff's discrete weight declarations and Unicode ranges. The files themselves include variable axes; Fraunces includes both optical size and weight. Family aliases (`V9 Fraunces`, `V9 Inter Tight`, `V9 JetBrains Mono`) are CSS-only aliases; font binaries were not renamed internally, subsetted or otherwise modified. `font-optical-sizing: auto` remains the consumer's responsibility, as in the existing foundation heading rules.

The existing `public/fonts/fraunces-400/500/600.woff2` files are static and lack the optical-size axis. The existing italic Fraunces file is variable. The replacement removes that normal/italic inconsistency. Existing Inter Tight and JetBrains Mono files are static; the new files match the exact official handoff request.

Each family's SIL Open Font License 1.1 is included, downloaded from the Google Fonts repository at the immutable revision recorded in the manifest. Copyright and license text are preserved unchanged. The handoff references remote CSS rather than shipping original font binaries, so historical byte-for-byte identity to what its author saw is not provable. This package reproduces the declared request and its current official binary response, with local pinned files for subsequent reproducible builds.

`HeadAssets.astro` imports the font CSS and preloads the normal Latin 400 faces for Inter Tight and Fraunces. When integrating it, remove the old v9 `@font-face` declarations and old font preload links to prevent duplicate downloads and competing definitions.

Validation: `node --test tests/v9-assets.test.mjs` checks required weights/subsets, declared optical axes, hashes, WOFF2 signatures, licenses and all supplied icon assets. Font metadata was independently inspected with Python fontTools at download time. Visual comparison remains a separate browser gate.
