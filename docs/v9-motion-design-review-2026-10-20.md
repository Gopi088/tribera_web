# v9 motion and design review

Compared the ten implemented private v9 pages with `sample_data/tribera-web-handoff-v9`, including actual source markup, final CSS and active scripts. Existing audit notes from the interrupted session are in `artifacts/v9-motion-sweep/`. Statements in old component READMEs that animation was “intentionally omitted” were implementation notes, not user approval.

## Coverage and repairs

| Private page                   | Handoff                                      | Restored effects                                                                                                                                                                                      |
| ------------------------------ | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/__v9/home`                   | `index.html`                                 | Hero sweep/parallax, shortlist/stamp/ink arrivals, scorer preview and staging, easing hiring bar, expert-panel transition and strikethrough, funnel preview, 38-hour count, closing field and shimmer |
| `/__v9/candidates`             | `candidates.html`                            | Inline hero field, profile bars/stamp, scorer staging/depth, question transition, scroll cue, desktop testimonial drift and mobile swipe row, closing mark                                            |
| `/__v9/services`               | `services.html`                              | Hero field, arrivals, ink, recommendation previews with manual takeover, destination highlights, tile/stamp arrivals and 327 count                                                                    |
| `/__v9/interview-as-a-service` | `interview-as-a-service.html`                | Hero field positioning/sweep/parallax, arrivals, closing ink and FAQ motion                                                                                                                           |
| `/__v9/case-study`             | `case-study.html`                            | Hero field, arrivals, time-bar drawing, finite profile sequence, cell breathing and field depth                                                                                                       |
| `/__v9/about`                  | `about.html`                                 | Chart drawing, history count/timeline, portrait color arrival, underline, debate stamp, closing field                                                                                                 |
| `/__v9/bfsi`                   | `industries/banking-financial-services.html` | Hero field, comparison bars and cycling, card depth, question strikethroughs                                                                                                                          |
| `/__v9/article`                | `blog/seventeen-interviews-one-hire.html`    | Header arrivals, reading progress, citation previews, related/subscription arrivals                                                                                                                   |
| `/__v9/contact`                | `contact.html`                               | Hero sweep/parallax and measured positioning, section arrivals and FAQ motion                                                                                                                         |
| `/__v9/sample-write-up`        | `sample-write-up.html`                       | Four source arrivals, including the document preview                                                                                                                                                  |

Shared native disclosures now animate opening/closing in 320ms, handle interrupted toggles, and retain keyboard operation. Cross-document transitions live in the document foundation; the shared header has the source `site-nav` transition identity.

Filled red underlines use a shared clip-path reveal, including Candidates and Contact, where the imported initial clip previously hid them in normal motion. They remain visible without JavaScript. The sector page also uses this filled-ink reveal instead of a stroke animation on a filled path. Article reading progress sits below the actual shared header (63px on smaller screens, 77px on desktop).

The source entrance-target inventory is 54/49/55/18/33/56/45/14/26/4 respectively. The article maps five source header targets onto the shared article-header components and nine onto page-owned reveal targets. Generic source scripts for absent widgets are not missing features.

## Preserved behavior

- Complete server-rendered content and native disclosures without JavaScript.
- Reduced motion settles animation and stops automatic demonstrations.
- Decorative hero sweeps stop offscreen and in hidden documents; fine-pointer effects do not run on touch-only input.
- Manual input takes over demonstrations. Testimonial drift retains pause, hover/focus pause, inert duplicate cards and a static reduced-motion list.
- Signed form requests, validation, delivery handling and native fallback forms remain intact.
- Existing wider Home/header layout, removed trademark text and removed customer-strip button remain as previously accepted changes.

## Validation

Focused browser suites cover normal motion, hero lifecycle, automatic/manual selection, native keyboard disclosures, rapid toggle reversal, reduced motion, no-JavaScript content and responsive overflow:

```sh
V9_PREVIEW=1 npm run build
npm run preview -- --host 127.0.0.1 --port 4390
TEST_BASE_URL=http://127.0.0.1:4390 node --test tests/v9-home.test.mjs tests/v9-conversion-motion.test.mjs tests/v9-motion-details.test.mjs
TEST_BASE_URL=http://127.0.0.1:4390 node --test tests/v9-ink-motion.test.mjs
TEST_BASE_URL=http://127.0.0.1:4390 node tests/v9-editorial-motion.test.mjs
TEST_BASE_URL=http://127.0.0.1:4390 node tests/v9-pages.test.mjs
TEST_BASE_URL=http://127.0.0.1:4390 node tests/v9-a1-pages.test.mjs
TEST_BASE_URL=http://127.0.0.1:4390 node tests/v9-a2-pages.test.mjs
```

The three page suites compare source headings, loaded assets, responsive overflow, no-JavaScript/reduced-motion content, screenshots and transfer budgets. They require the compiled preview: Astro development HTML and its client runtime exceed the production transfer budgets.

Restoring the omitted behavior changes the JavaScript baseline. Compiled gzip measurements were Home 9,245 bytes, Candidates 8,046, About 7,129, BFSI/Article 7,213 each. Their former limits described the static implementation (8,000/7,000/4,500 bytes). Limits now allow 10,200/9,000/8,000 bytes respectively, with the three editorial routes sharing the last limit. HTML, CSS, font and image budgets are unchanged. Services, hiring detail, Contact and Sample remain within their existing JavaScript budgets. Measurements are recorded in `artifacts/v9-motion-sweep/script-sizes.json`.

## Results

- Preview build passed (89 generated pages). Astro check reported zero errors and zero warnings; scoped ESLint, Prettier and `git diff --check` passed.
- All 140 Chromium page checks passed: 70 representative-page checks, 42 hiring-page checks and 28 Contact/Sample checks, including widths from 320px to 2560px.
- Chromium passed Home/hero, conversion, hiring motion, editorial motion, filled-ink and shared foundation suites, plus existing candidate, editorial and hiring behavior suites.
- Firefox passed conversion and hiring-motion suites. WebKit passed conversion, hiring-motion and filled-ink suites. Timing-sensitive checks observe actual state changes rather than assuming a fixed delay after input or media emulation.
- Article header geometry and About portrait appearance passed at five widths. Desktop full-page source/migrated comparisons were visually inspected for all ten pages. The comparison sheets are under `artifacts/v9-motion-sweep/compare-*.png`; full-size responsive captures are under `artifacts/v9-{g2,a1,a2}/pages-chromium/`.
- Final compiled HTML and JavaScript measurements remain within the documented budgets for all ten pages.

## Remaining migration scope

This review covers every implemented private v9 page. It does not certify the legacy public routes as migrated. Intelligence, the industries index and eleven other sectors, careers, the blog index and nine other articles, the four legal pages, methodology and the error page still need their own v9 migration and comparison. No public route was switched or deployed.
