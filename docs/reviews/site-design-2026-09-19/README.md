# Website design consistency review — 19 September 2026

Implementation follow-up: [individual fixes, reviews and final verification](FIXES.md). The findings below describe the original audit snapshot.

Claude’s complete route review rates the website **mostly consistent**. The current homepage and other pages share the main font families, red CTA treatment, dark surfaces and restored navigation. The follow-up findings below prioritize readability and comparable component roles, while retaining differences appropriate to marketing, articles, legal documents, forms and data-heavy pages.

This reviews the current local build, including the dirty working tree, rather than a deployed production site. No website styles or content were changed during this review.

## Coverage and evidence

- 76 public HTML routes at 390px, 1520px and 1920px: **228 rendered checks**.
- Claude inspected all 38 mobile/desktop contact sheets, covering every public route. A separate pass reviews readable mid-page crops, including homepage sections, articles, legal copy, forms, specialist pages and both footer implementations.
- Fonts loaded before capture. Every captured H1 uses Fraunces; every shared navbar has a white background. Inter Tight and JetBrains Mono remain the shared prose/UI and metadata families.
- No render failures, JavaScript errors, missing images or page-wide horizontal overflow. The apparent clipping candidates were intentional offscreen honeypots and visually hidden upload fields.
- `/decapcms` is an administration interface and is excluded from the public design pattern.

| Family                                                                                                                                           | Routes |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | -----: |
| Homepage, about, services, intelligence, contact, candidates, candidate start, careers index, blog index, industries index, functions index, 404 |     12 |
| Articles                                                                                                                                         |      7 |
| Career details                                                                                                                                   |      7 |
| Category/tag archives                                                                                                                            |     27 |
| Industry details                                                                                                                                 |     12 |
| Function details                                                                                                                                 |      8 |
| Legal documents                                                                                                                                  |      3 |
| **Total**                                                                                                                                        | **76** |

[Comparison gallery](/home/abhispra/mvp/website_latest/tribera/artifacts/site-design-review-2026-09-19/index.html) lets you view any captured route alongside the homepage. The detailed census, screenshots, section crops and source snapshot hashes are in `artifacts/site-design-review-2026-09-19/`.

Claude transcripts: [homepage baseline](01-homepage-visual-baseline.md), [entire public site](02-entire-site-visual-review.md), [context/mid-page review](03-context-and-midpage-review.md). These are retained as raw reviews; recommendations are checked against actual rendered styles and source before inclusion below.

## Confirmed findings and recommended corrections

| Priority | Finding                                                            | Evidence                                                                                                                                                                                                                                                                          | Context-sensitive correction                                                                                                                                                                                                                                                                         |
| -------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1       | Small muted text needs stronger contrast                           | Home eyebrow `#9a998f` on white: **2.87:1** at 11.2px. Inactive shared navbar switch: **2.81:1** at 12.5px. Home footer headings: approximately **4.12:1** at 9.6px; shared footer red headings: **3.55:1** at 12px; shared footer muted prose: **3.65:1** at 14.5px.             | Define accessible neutral/accent metadata colors for their actual backgrounds. Preserve the navbar items and switch; change the inactive text color. Choose readable footer labels rather than copying the home’s smallest, faintest text everywhere.                                                |
| P2       | Two different global footers                                       | Home has `tribera™`, 9.6px muted column labels, a different hiring link set, DPA request link and New Jersey in its city line. Shared footer has `tribera.`, 12px red labels and different copy/links. Both have the same dark background and approximately 14px link text.       | Use a single shared footer with consistent visual roles, branding, navigation and approved company copy. Keep the explicitly restored navbar unchanged. Relative home anchors must work from other routes as well.                                                                                   |
| P2       | Blog taxonomy title/lead spacing is missing                        | `/category/technical-hiring` and `/tag/technical-hiring`: rendered H1-to-intro gap **0px**. The intro already has `.hero__p` and the correct 18px font. The same TopicIndex template serves all 27 archives.                                                                      | Add the appropriate title-to-lead margin to TopicIndex. Reapplying the existing class will not fix the missing spacing.                                                                                                                                                                              |
| P2       | Active tags and category filters can have indistinguishable labels | `/tag/technical-hiring` contains “Technical Hiring” twice: `/category/technical-hiring` and `/tag/technical-hiring`, with only the latter active. Candidate Experience has the same issue. Other active tags append another chip and can wrap to a separate row.                  | Show the active tag distinctly, such as “Tag: Technical Hiring,” or separate category navigation and active-tag context. Preserve their different destinations and filtering semantics; activating a category chip in place of a tag would change behavior. Ordinary mobile wrapping is appropriate. |
| P2       | Specialist intro paragraphs override the shared reading measure    | Function and industry templates put the paragraph inside `.shead`, but add inline `max-width:none`. `/industries/ai-data` renders a 142-character paragraph across approximately 1144px; `/functions/engineering-platform` has the same override. Both templates serve 20 routes. | Restore a readable maximum width for intro prose by removing/overriding the paragraph’s inline exception. Preserve wide charts, comparison tables and heading layout. The paragraph is already inside `.shead`, so moving it into another wrapper is unnecessary.                                    |
| P3       | Taxonomy routes do not identify Blog as the active navbar section  | `#nav a[href="/blog"]` has no `aria-current` on category/tag routes; shared route matching only recognizes `/blog` and `/blog/*`. Confirmed on the full rendered DOM.                                                                                                             | Include `/category/*` and `/tag/*` in Blog active-state matching, keeping the previous navbar items and destinations.                                                                                                                                                                                |
| P3       | Neutral palette and container models differ                        | Home paper is `#f1eee7`; editorial paper is `#f4f3f0`. At 1520px the home’s 1160px outer wrap includes 72px side padding, leaving **1016px** inside; editorial wrappers use the working column differently.                                                                       | Agree on shared neutral and container roles. Retain narrower article/form measures and justified visual layouts. These differences are real, but are less urgent than readability and shared footer consistency.                                                                                     |

Sources: `src/components/home/v126/sample.css`, `src/components/home/v126/sections/footer.html`, `src/components/widgets/Footer.astro`, `src/components/standalone/SharedNavFrame.astro`, `src/components/standalone/StandaloneNavScripts.astro`, `src/components/blog/TopicIndex.astro`, `src/components/blog/HeroFilters.astro`, `src/components/v58/EditorialPage.astro`, `src/pages/functions/[slug].astro`, and `src/pages/industries/[slug].astro`.

## Type roles requiring a deliberate decision

The homepage uses Inter Tight 16.8px/600 for generic H3 feature headings, while many interior cards use Fraunces 18–22px/500. Claude identified this as a cross-page difference. It should be resolved by **component role**, rather than changing every H3 to one family: editorial/story card titles can retain display serif, while interactive evidence panels, compact UI titles and form sections can use the UI family. Candidate names, job titles and proof feature headings are not automatically interchangeable roles.

Neutral eyebrow treatments also differ in size, gray tone and presence of the red slash. A shared readable page-kicker role and a separate red accent-kicker role would clarify the pattern. Red CTA-adjacent kickers are an appropriate intentional difference; a slash need not be added to every piece of metadata.

## Differences to preserve

- Previous shared navbar items, wordmark, audience switch, Coverage dropdown, login, CTA and mobile menu, as explicitly requested.
- Homepage’s centered, more spacious hero and larger display scale: desktop H1 66.4px and H2 48px, compared with 53.12px/36px on interior marketing pages.
- Smaller article/legal subheadings, narrower reading columns and relaxed prose leading. Those pages should not inherit the homepage’s marketing spacing or interactive treatment.
- Form labels, helper text, disabled states and compact data/chart labels as separate roles from marketing headings. Readability still needs to hold.
- Specialist scorecards and dark article/career heroes, where they explain the content.
- Homepage lab, funnel and dot-field imagery as homepage-specific visual elements.
- Simple 404 structure. Having no H2 or using a quiet paper background is appropriate for an error page; neither requires adding marketing sections.
- Deliberately masked marquees. Reduced-motion screenshots stop the ticker and hide repeated testimonials; edge clipping in that state is not a defect.

## Review corrections and limits

The homepage baseline transcript inferred a side-by-side hero card and an 860px navbar breakpoint from dormant CSS. The live homepage is centered and the restored shared navbar changes at 1080px; existing browser checks cover 768px and 900px. Those baseline inferences were excluded.

An initial route-family classifier treated `/functions/security` as legal. It has been corrected to function detail: **8 function details and 3 legal pages**. No rendered measurements changed.

The complete-route review recommended adding `.hero__p` to archive intros and `.shead` to specialist intros. Actual source already has both; the confirmed fixes concern margin and inline maximum-width overrides respectively. Its tag/category de-duplication suggestion also needs to preserve the two distinct filter types.

This is Chromium visual/style evidence from default states at three widths, with reduced motion. It is not a comprehensive cross-browser, keyboard, interaction or accessibility certification. External requests were blocked and no forms were submitted. The contrast checks above cover specific observed small-text cases, not every foreground/background pair. Full-page screenshots that shrink to unreadable text were supplemented with readable section crops.

## Disposition of mid-page reviewer hypotheses

Claude independently confirmed the footer difference, small/faint meaningful labels, wider legal reading text and appropriate context-specific type/layout roles. It explicitly recommends retaining Fraunces statement headings alongside Inter Tight compact UI titles, rather than treating every H3 difference as a defect.

Live checks corrected its career-caption numbers: the sampled note is `#9c9c97` on **white**, not `#aaa9a2` on paper. It still fails normal-text contrast, but the suggested dark-token leak and a count of 35 affected routes were not established. Matching colors in dark charts can be appropriate.

Its animated/per-glyph footer-fill hypothesis was not supported: sampled footer labels are plain text with zero child elements, `animation:none`, uniform red color, normal background clipping and no gradient text fill. The confirmed footer issues concern contrast and the two component implementations.

Inactive-card readability, dark-form placeholders and field boundaries, the intelligence mobile count-label crop, and disabled CTA appearance remain reviewer recommendations or hypotheses needing interaction/state-specific confirmation. They are not declared site-wide visual failures from these static captures. The faded submit control is a legitimate disabled state; it is not evidence of broken font or brand CSS.
