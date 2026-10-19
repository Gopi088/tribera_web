# Private Services migration

`ServicesPage.astro` composes nine native Astro sections under the accepted `V9Layout`. `/__v9/services` is generated only in development or with `V9_PREVIEW=1`, always noindex; public Services remains unchanged.

`handoff.css` retains the ordered final Services handoff cascade for selectors used by this page, scoped with `:where(.v9-services)`. The shared shell and client strip use accepted components. Fonts use the pinned v9 families; the original vector fields remain inline SVG. The founder portrait is extracted byte-for-byte from the source JPEG. The source ink filter has a page-specific ID.

All twelve offerings, four primary tickets, nine problem recommendations, pricing explanations, founder narrative and five FAQ answers are server-rendered. The eight extended services and five questions use native details/summary; the FAQ starts with the first item open and uses an exclusive native group. Without JavaScript every recommendation remains readable and every disclosure works. Enhancement makes the nine problem choices into tabs with arrow/Home/End keyboard selection and horizontally visible focus on narrow screens. Recommendation and pricing links open the target service before normal fragment navigation; direct fragment visits also open it.

Intentional changes:

- Recommendations are manual rather than automatically advancing while someone is reading. Decorative arrival/count/stamp animations are completed immediately; reduced motion disables page animation and transitions. No essential information depends on animation or JavaScript.
- The sample write-up CTA says “request a sample write-up” and links to `/contact?intent=sample-write-up`. Other contact links retain the supplied service query. The legacy contact form does not yet capture the complete handoff context; that is a later migration batch.
- Case-study and Home links use private preview routes. Header/footer mappings are owned by the integration coordinator.
- Native disclosure semantics replace script-only buttons and hidden answers. Focus outlines include summaries. All recommendations are exposed as a readable sequence without JavaScript rather than an empty result panel.

Worker checks: all ten Astro components compile with zero compiler diagnostics; scoped ESLint and Prettier pass. A Chromium development spot check covers 390, 768, 1024, 1366 and 1920px widths. Compiled integration, production exclusion, cross-browser functional/visual checks and actual Claude review are coordinator gates and remain required before acceptance. No delivery handler or external submission is added here.

## A2 private journey integration

Private Contact CTAs now use `/__v9/contact` and preserve service/sector parameters; sample CTAs use `/__v9/sample-write-up`. A2 handlers validate the active form mode and include bounded context in mocked delivery tests. Original A1 fallback notes above describe the prior checkpoint. Hosted recipients, provider/scanner behavior and actual inbox delivery remain later acceptance gates.
