# v9 foundation contract

`V9Layout` owns the document, local font declarations, skip link, header, main landmark and footer. It does not import the legacy layout or global stylesheet. Font-family aliases and component scopes isolate v9 from historical styles. All 81 public HTML pages now use this layout.

- Required layout props: `title`, `description`.
- Optional layout props: `audience` (`hiring` or `candidate`), `activeRoute`, `cta: { label, href }`, `canonicalPath`, `noindex`, `footerLinkOverrides`.
- `Hero` accepts `variant` (`product`, `editorial`, `compact`), `eyebrow`, `title`, `description`, optional `cta`; named `title` and `aside` slots preserve page-specific composition. The product scorecard remains page-owned.
- `FAQ` accepts `items: { question, answer }[]` and uses native disclosure semantics.
- `SourceNote` accepts `number`, `title`, `href`, optional `context`; native disclosure keeps the reference usable without JavaScript. Enhancement keeps open notes inside the viewport and supports Escape; no-JavaScript disclosures stay in document flow. `SourceList` handles longer lists.
- `ClientStrip` contains the 13 handoff clients. It starts static; enhancement activates animation only while visible and the document is active. Focus, hover and reduced motion stop movement. Reduced motion and no-JavaScript modes wrap the complete list.
- Header and footer links resolve through the page context: public visitors stay on public routes and private review journeys stay under `/__v9/`. Optional unpublished destinations have no public navigation entry. The misleading “Our numbers” link was removed; office labels list Pune and Bengaluru.

The fixtures are at `/__v9/foundation`, `/__v9/candidate` and `/__v9/content`, emitted only in development or builds with `V9_PREVIEW=1`. Astro ignores underscore directories, so their source is `src/pages/[preview]/[fixture].astro`. All fixtures always use `noindex, nofollow` and omit canonical URLs. They are component demonstrations, not visual-parity evidence for complete pages.

Brand images and the complete supplied icon set live in `public/brand/v9/`. `HeadAssets` imports pinned self-hosted font faces, icon links and preloads. See [font provenance](../../../public/fonts/v9/README.md) for the exact handoff request, optical axes, licenses, hashes and the limitation on historical remote font identity.

`ArticleHeader` provides the separate article heading/cover composition. `AuthorBlock` accepts image, name, role, machine-readable date, displayed date and reading time. `SourceList` accepts stable source IDs, titles, links and optional context/methodology links. `Testimonial` accepts side, quote, name and role. Cards are deliberately static: all quotes stay readable without autoplay or JavaScript. The page-specific product visualization remains outside the shared shell.

Hero typography and column geometry follow the final handoff cascade. Editorial titles precede the ruled supporting row; compact supporting cards align below the eyebrow. Finite arrivals apply only after enhancement, mark `rv-done`, never replay and finish when the document becomes hidden or reduced motion is requested. Default CSS has low specificity so component spacing and typography survive import ordering.

Build with `V9_PREVIEW=1 npm run build`, then run `BROWSER=chromium node --test tests/v9-foundation.test.mjs` to start and stop a preview automatically on ports 4331/4332/4333 for Chromium/Firefox/WebKit. To test an already running preview containing the fixtures:

```sh
TEST_BASE_URL=http://127.0.0.1:4331 BROWSER=chromium node --test tests/v9-foundation.test.mjs
```

The same command supports `firefox` and `webkit`; missing browsers fail rather than skip. The tests require both fixture pages, cover nine widths around responsive boundaries, keyboard menu controls, audience navigation, disclosures, reduced motion and no-JavaScript fallback. Full handoff screenshot comparison is still a separate gate.

`npm run test:migration:foundation` runs shell interactions, editorial content checks and final-cascade reference comparisons. Reference fixtures remove handoff scripts and load the same pinned local fonts; external font requests are blocked. They compare reusable component properties and save screenshots, not certify complete-page visual parity. Representative-page, motion and public-route suites provide separate coverage. See `docs/v9-release-readiness-2026-10-22.md` for current review and release boundaries.
