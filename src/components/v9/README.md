# v9 foundation contract

`V9Layout` owns the document, local font declarations, skip link, header, main landmark and footer. It does not import the legacy layout or global stylesheet. All CSS classes and font-family names are prefixed with `v9` / `V9` to avoid accidental coupling. Production pages have not adopted this layout yet.

- Required layout props: `title`, `description`.
- Optional layout props: `audience` (`hiring` or `candidate`), `activeRoute`, `cta: { label, href }`, `canonicalPath`, `noindex`.
- `Hero` accepts `variant` (`product`, `editorial`, `compact`), `eyebrow`, `title`, `description`, optional `cta`; named `title` and `aside` slots preserve page-specific composition. The product scorecard remains page-owned.
- `FAQ` accepts `items: { question, answer }[]` and uses native disclosure semantics.
- `SourceNote` accepts `number`, `title`, `href`, optional `context`; native disclosure keeps the reference usable without JavaScript. Long source lists and viewport-edge positioning need representative-page validation.
- `ClientStrip` contains the 13 handoff clients. It starts static; enhancement activates animation only while visible and the document is active. Pause, focus, hover and reduced motion stop movement. Reduced motion and no-JavaScript modes wrap the complete list.
- Header links and footer destinations match v9. Three footer destinations belong to later migration batches. The private fixtures use explicit `footerLinkOverrides` to send these links to existing Services, About and Privacy pages until the new routes exist; production defaults retain the handoff destinations. Remove these preview overrides when the corresponding routes land.

The fixtures are at `/__v9/foundation` and `/__v9/candidate`, emitted only in development or builds with `V9_PREVIEW=1`. Astro ignores underscore directories, so their source is `src/pages/[preview]/[fixture].astro`. Both fixtures always use `noindex, nofollow` and omit canonical URLs. They are component demonstrations, not visual-parity evidence for complete pages.

Brand images and favicon are copied unchanged from the handoff into `public/brand/v9/`. Font files reuse the existing local assets. Exact Google Fonts face/optical-axis parity and font license provenance have **not** been independently verified; finish that review before G1 is declared passed. Remaining icon sizes, arrival choreography, testimonial and article-specific components are subsequent foundation/page work.

Build with `V9_PREVIEW=1 npm run build`, then run `BROWSER=chromium node --test tests/v9-foundation.test.mjs` to start and stop a preview automatically on port 4331. To test an already running preview containing the fixtures:

```sh
TEST_BASE_URL=http://127.0.0.1:4331 BROWSER=chromium node --test tests/v9-foundation.test.mjs
```

The same command supports `firefox` and `webkit`; missing browsers fail rather than skip. The tests require both fixture pages, cover five widths, keyboard menu controls, audience navigation, disclosures, reduced motion and no-JavaScript fallback. Full handoff screenshot comparison is still a separate gate.
