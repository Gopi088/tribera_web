# Private v9 home migration

`Home.astro` composes ten semantic section components with the accepted `V9Layout`, header/footer, pinned font/icon assets and shared client strip. Its only route is `/__v9/home`, generated in development or with `V9_PREVIEW=1`, always noindex. Production `/` remains unchanged.

`handoff.css` preserves the ordered final cascade from handoff home v186, scoped below `.v9-home`; the document shell, navigation/footer rules and cross-document transition rules are omitted. Local font aliases and the page-owned ink filter are the only source-reference substitutions. `enhancements.css` documents progressive fallback/accessibility repairs. The large field SVGs are retained as inline vector markup, not rasterized or regenerated.

Section text and all ten h1/h2 headings match the handoff. The shortlist, nine skill rows/evidence tiles, eight hiring-bar candidates and 126 funnel cells are server-rendered rather than generated only after JavaScript starts. The shared model keeps the four presets, fixed interview scores, normalization, rounded 26/34 verdict boundaries and eight bar scores together. The client list and footer use the accepted shared components.

The page script is a new interaction module rather than an embedded copy of the handoff scripts. It handles presets, weights, evidence, the draggable/keyboard hiring bar, the 36-hour ruler, five keyboard-selectable interviewer fields, five funnel stages, native FAQ disclosures and pausable testimonials. Demo timers stop when the section is offscreen, the document is hidden, reduced motion is requested or the user takes control. Manual interaction never restarts automatic selection. Testimonial clones are hidden from assistive technology.

Intentional differences and repairs:

- Example shortlist names/reasons and the funnel arrangement are deterministic. Scores, totals, ordering and visible example labeling remain as supplied. Unused invented weekly-volume counters and visitor localStorage tracking are removed.
- Every FAQ and expert explanation is available without JavaScript; unavailable scoring controls are disabled. Native disclosure controls preserve FAQ use. The reference's no-JS empty scoring/shortlist/field widgets are populated server-side.
- An all-zero brief displays zero total weight and an explanatory note, rather than claiming its weights total 100%. Custom weights replace stale preset commentary.
- Hiring-bar Home/End keys select the minimum/maximum (24/42), following slider conventions; arrows adjust by one. Pointer capture supports touch dragging.
- Shared client-strip behavior replaces the reference's reduced-motion infinite-animation defect. Testimonials recalculate their drift distance when motion preferences change.
- The future sample-write-up destination temporarily points to `/contact?intent=sample-write-up` in this private preview. Shared preview route mappings are owned by the coordinator.
- The shortlist is static between visits; decorative pointer tilt, background parallax and random field shimmer are not ported. Main demos, finite section arrivals and the testimonial drift are preserved. Page content and core controls do not depend on decorative motion.

Verification:

```sh
node --test tests/v9-home-model.test.mjs
TEST_BASE_URL=http://127.0.0.1:4391 BROWSER=chromium node --test tests/v9-home.test.mjs
```

The browser test also supports Firefox and WebKit. It requires six responsive widths, all headings, server-rendered data counts, presets/evidence/zero-weight reset, keyboard bar and expert controls, funnel counts, native FAQ, cancellation of automatic demos, testimonial pause/motion changes and no-JavaScript phone fallback. Screenshots are written under `artifacts/v9-g2/home-<browser>/`. Root integration must validate cross-page links, production exclusion, full build/static checks and the exact combined artifact. No provider email action is performed by this page.

Worker spot comparisons against the rendered handoff (same pinned fonts, reduced motion) matched section heights for the 390px hero and the 1366px scorer, hiring bar and expert sections. These observations are not a certification of full-page pixel parity. Claim/content publication approval remains separate from this private implementation.
