# Homepage v126 update — 19 September 2026

Source: `sample_data/tribera-home-v126.html`. Homepage implementation: `src/components/home/v126/`, connected through `src/pages/index.astro`.

Each section was copied separately and submitted to the authenticated local Claude CLI for review. Review transcripts are retained, including initial findings and follow-ups. Earlier failure verdicts describe earlier snapshots; see the final corrected review for the current implementation. Claude’s final corrected review returned **PASS**, with no concrete runtime, accessibility, fidelity or integration defects.

| Change                         | Claude review                              |
| ------------------------------ | ------------------------------------------ |
| Hero and client strip          | [01](01-hero-claude.md)                    |
| Interactive proof lab          | [02 resolved](02-proof-claude-resolved.md) |
| Thesis                         | [03](03-thesis-claude.md)                  |
| Hiring funnel                  | [04](04-funnel-claude.md)                  |
| Operations                     | [05](05-operations-claude.md)              |
| Expert coverage                | [06](06-experts-claude.md)                 |
| Workflow                       | [07](07-workflow-claude.md)                |
| Savings                        | [08](08-savings-claude.md)                 |
| Ways of working                | [09](09-ways-claude.md)                    |
| Results                        | [10](10-results-claude.md)                 |
| Trust                          | [11](11-trust-claude.md)                   |
| Procurement                    | [12](12-procurement-claude.md)             |
| FAQ                            | [13](13-faq-claude.md)                     |
| Final call to action           | [14](14-start-claude.md)                   |
| Footer                         | [15](15-footer-claude.md)                  |
| Navigation                     | [16](16-header-claude.md)                  |
| Metadata                       | [17](17-metadata-claude.md)                |
| Full integration               | [18](18-final-integration-claude.md)       |
| Loading and keyboard follow-up | [19](19-loading-keyboard-claude.md)        |
| Final corrected implementation | [21](21-final-corrected.md)                |

## Integration fixes

Preserved sample section and navigation ordering. Namespaced styles and navigation class to prevent existing site CSS from changing the sample header. Kept existing inquiry forms and wired role/demo intent to them. Corrected footer links to existing careers and candidate privacy anchors; DPA requests go to Contact. Created the missing sample-referenced social image locally at 2400 × 1260.

Made the FAQ native details/summary for keyboard and no-JavaScript use. Added static diagram visibility and reduced-motion fallbacks. Kept lab scores, criteria and weights in one data source; normalized custom weights and debounced screen-reader score announcements. Corrected seeded funnel counts and prevented hover/autoplay from overriding keyboard focus. Mobile navigation uses inert while closed and supports Escape.

A homepage-only document class fixes the 16px root font before external CSS loads, including above 1536px; other routes retain their defaults. Existing shared layouts received only the required prop forwarding and early font override. Preexisting workspace changes were preserved.

## Validation

Browser coverage is in `tests/home-v126.test.mjs`: sample headings/order, unique IDs, widths 320/390/768/900/1280/1520, clipping, header palette, mobile navigation, four lab presets, evidence, custom weights, five funnel stages, FAQ keyboard behavior, role/demo form intent, no-JavaScript rendering, normal animations and keyboard focus ownership. `tests/home-refresh.test.mjs` checks cold, cached and delayed-CSS loading at 390/1440/1920px. Screenshots are under `artifacts/home-v126/`.

Final production verification:

- `npm run build`: passed, 76 pages built.
- `node tests/built-links.test.mjs`: passed, 77 HTML files and 6,553 internal links; article reading times, sitemap and robots checks passed.
- `TEST_BASE_URL=http://127.0.0.1:4335 node tests/home-v126.test.mjs`: passed at all six widths, both no-JavaScript widths, and normal motion including hover-exit focus preservation.
- `TEST_BASE_URL=http://127.0.0.1:4335 node tests/home-refresh.test.mjs`: all nine cold/cached/delayed-CSS cases passed.
- `npm run check:astro`: zero errors and warnings (147 hints).

Targeted ESLint and Prettier checks cover changed implementation and test files. Repository-wide formatting also reports 26 preexisting review documents outside this update; those documents were left as found. Historical v58/v60/v61 design-specific browser fixtures were not treated as contracts for the new sample.

No commit, push or deployment was performed.

## Direct visual, typography and copy comparison

Compared the rendered sample and homepage at 390px and 1520px, with the same local font resource and reduced-motion setting. All 85 heading, paragraph, blockquote and caption blocks matched after ignoring whitespace before punctuation introduced around decorative SVGs. Matched blocks also had identical computed font family, size, weight, line height and color.

The comparison found a shared 15px reserved scrollbar gutter shifting desktop content 7.5px left. Removed it for the homepage only; [Claude review 22](22-visual-positioning.md) returned PASS. Build and cold/cached/delayed-CSS checks passed again. Desktop section heights through Ways match the sample. Hero text remains centered; its containing box differs because of the mobile overflow fix.

This is not a pixel-identical copy at every setting: mobile hero wraps within the screen instead of overflowing the sample container; native FAQ answers change the section height slightly; reduced-motion rendering hides duplicate testimonial cards, shortening that section. Normal motion keeps all six cards for the continuous marquee. Screenshots: `artifacts/home-v126/audit-site-390.png`, `audit-sample-390.png`, `audit-site-1520.png`, `audit-sample-1520.png`.

## Navbar correction after screenshot feedback

The user reported a dark, unreadable home navbar. Fresh local renders already used the isolated `v126-nav` class, but saved dark theme revealed another visual gap: the translucent navigation composited over the shared dark body because the sticky wrapper was transparent. Changed only `.v126-header` backing to white, retaining the sample’s translucent inner navigation. Dark-theme screenshots at 390px and 1920px now have white background pixels (255, 255, 255).

Expanded navbar palette checks to every viewport, added 1920px with dark color scheme, and asserted white wrapper backing and the absence of the legacy `.nav` class. Direct checks cover Astro 4321/4322, Netlify 8888 and built 4335. Captures: `artifacts/home-v126/nav-fixed-dark-390.png` and `nav-fixed-dark-1920.png`.

[Claude’s resolved navbar review](24-nav-dark-theme-resolved.md) returned **PASS**. Netlify browser suite passed all seven widths, no-JavaScript and normal-motion checks. Build passed (76 pages). Built-site saved-dark-theme checks passed at 390px and 1920px, including white mobile panel and dark link/brand text. The solid backing makes the original frosted transparency visually inactive; this is the readability tradeoff of keeping the header white across themes.

## Restore previous navbar elements and items

Following the user’s clarification, removed the v126 header import and header slot override from `src/pages/index.astro`. The homepage now renders PageLayout’s original `widgets/Header.astro` with its shared styles and scripts, preserving the exact logo, audience switch, Coverage industries/functions dropdown, Services, Intelligence, Blog, About, Contact, Careers, Log in, red role CTA, and mobile menu. Shared navbar source was not modified. The sample’s replacement header is no longer rendered. Earlier sample-header reviews and fixes are superseded by this restoration.

Regression coverage now checks the original item labels, audience switch, login target, white background, 12 industries / 8 functions on desktop and mobile, mobile menu and Escape. Desktop Coverage retains its original hover dropdown and linked `/industries` label. Captures: `artifacts/home-v126/original-nav-restored-390.png` and `original-nav-restored-1920.png`.

[Claude’s restoration review](26-original-navigation-restoration-scoped.md) returned **PASS** with no new restoration defects. [Review 25](25-original-navigation-restored.md) also records broader preexisting shared-shell findings; they were not changed during the requested restoration. Production browser suite passed all seven widths, no-JavaScript and normal-motion checks; nine loading checks passed, 76 pages built and 6,614 internal links resolved. The original header CTA successfully opens the existing inquiry form with its original client-normalized intent.
