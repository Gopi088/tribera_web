# V58 Website Migration Plan

## Objective

Adopt `sample_data/tribera-home-v58.html` as the new brand and homepage direction while preserving the production site's routes, search visibility, lead capture, candidate flows, analytics, security controls, and legal pages.

The reference is a design and content specification. It is not production source code and must not be copied wholesale into `src/pages/index.astro`.

## Scope

### In scope

- A V58 visual system for the entire marketing site.
- A componentized V58 homepage.
- A V58 header, footer, modal, and shared UI primitives.
- Migration of reusable templates and page families.
- Accessibility, responsive, performance, metadata, analytics, and conversion validation.

### Out of scope

- Replacing the hiring or candidate applications.
- Changing the data model or API contracts of Netlify functions.
- Changing routes, canonical URLs, sitemap behavior, or legal content without an explicit review.
- Introducing a separate design system only for the homepage.

## Principles

1. Preserve production behavior while presentation changes.
2. Migrate shared primitives before page-specific CSS.
3. Use V58 as a reference, not a source file to paste into Astro.
4. Keep page interactions isolated by component and useful without JavaScript.
5. Respect `prefers-reduced-motion`; animations support comprehension and never gate content.
6. Keep red for decisions, annotations, and selected states, not decoration.
7. Use self-hosted fonts and avoid runtime Google Font dependencies.

## Target Design System

### Typography

| Role               | Font           | Usage                                        |
| ------------------ | -------------- | -------------------------------------------- |
| Editorial display  | Fraunces       | H1/H2, claims, selected editorial moments    |
| Interface and body | Inter Tight    | Navigation, body copy, cards, forms, buttons |
| Evidence labels    | JetBrains Mono | Eyebrows, metrics, stages, tags, score data  |

Fraunces is already self-hosted in `public/fonts`. The legacy `Figtree` display token remains until each dependent template has moved to the new system.

### Surfaces and states

| Token role          | V58 treatment                          |
| ------------------- | -------------------------------------- |
| Base                | White                                  |
| Alternate section   | Warm paper `#F4F3F0`                   |
| Evidence / contrast | Charcoal `#121212`                     |
| Primary text        | Near black `#131313`                   |
| Secondary text      | Muted ink `#57565B`                    |
| Accent              | Red `#DA0007`                          |
| Positive decision   | Green `#3E9E63`                        |
| Borders             | Low-contrast warm or white alpha lines |

### Shared primitives

Build and document these before route migration:

- `SiteSection`: consistent wrap, gutter, vertical rhythm, and light/paper/dark variants.
- `Eyebrow`: mono label with optional red tick.
- `EditorialHeading`: responsive Fraunces heading levels.
- `Button` and `TextLink`: primary, secondary, dark-surface, and focus-visible states.
- `EvidenceCard`: border, radius, restrained shadow, and dark variant.
- `Tag` and `Chip`: mono metadata and coverage chips.
- `Metric`: tabular numerals, stage labels, and selected/positive states.
- `MotionReveal`: intersection reveal with a reduced-motion fallback.

## Content and Claims Gate

Before publishing V58 copy, create an approved claim register containing owner, source, scope, and review date for:

- "Three candidates" and the distinction from the five-candidate funnel example.
- First shortlist in 36 hours.
- 50 senior experts.
- 100+ signals / checks.
- 38 manager hours.
- Interview recording and consent language.
- DPDP alignment, export, and deletion language.
- All testimonial outcomes, roles, ratios, and company descriptions.

No claim should ship as a general promise if it is only an example, a target, or a historical result.

## Architecture

### Existing production shell to preserve

- `src/layouts/Layout.astro`: metadata, font preload, analytics and global document behavior.
- `src/layouts/PageLayout.astro`: shared header/footer, contact sales modal, CTA behavior.
- `src/components/widgets/Header.astro`: route state, audience switch, login, dropdowns, mobile nav, form tracking.
- `src/components/widgets/Footer.astro`: legal/navigation links.
- `src/components/ContactSalesModal.astro`: lead capture and form behavior.
- Netlify handlers, analytics, structured data, redirects, security headers, and sitemap configuration.

### New homepage component map

Create `src/components/home/v58/` with scoped styles and scripts:

| Component                | Responsibility                                                  |
| ------------------------ | --------------------------------------------------------------- |
| `Hero.astro`             | Promise, CTAs, proof card, cue                                  |
| `RubricLab.astro`        | Adjustable weights, score and verdict recalculation             |
| `Proof.astro`            | Explainability and evidence illustration                        |
| `Funnel.astro`           | 126-profile narrative with two-way hover/focus linking          |
| `ExpertBench.astro`      | Senior expert coverage and industries                           |
| `Workflow.astro`         | Ownership stages from intake to decision                        |
| `Savings.astro`          | Time, cost, and effort outcomes                                 |
| `EngagementModels.astro` | Recruitment and interview-as-a-service paths                    |
| `Coverage.astro`         | Function coverage chips                                         |
| `Testimonials.astro`     | Accessible static list plus optional paused marquee enhancement |
| `Trust.astro`            | AI and human decision controls                                  |
| `FinalCta.astro`         | Production form-intent CTA                                      |

Each component owns its DOM selectors. No page-wide script may query generic selectors such as `.card`, `.nav`, or `.btn`.

## Implementation Phases

### Phase 0: Freeze inputs

- Approve the claim register and final V58 copy.
- Confirm which V58 sections are mandatory for launch.
- Map every reference CTA to a live route or a current form intent.
- Confirm mobile behavior for all interactive illustrations.

**Exit criteria:** approved content sheet and section inventory.

### Phase 1: Theme foundation

- Add V58 semantic tokens beside legacy tokens.
- Register/preload self-hosted Fraunces and verify font metrics.
- Build the shared primitives and a style-gallery route or development fixture.
- Define accessible focus, contrast, hover, active, and reduced-motion states.

**Exit criteria:** shared components pass desktop/mobile visual review and do not alter unmigrated routes.

### Phase 2: Shell migration

- Rebuild the header in the V58 visual language.
- Preserve all existing header navigation and audience-switch behavior.
- Rebuild footer and contact modal using the same visual primitives.
- Retest modal form submission, close/focus behavior, dropdowns, and mobile navigation.

**Exit criteria:** every existing route has a working shell and no legacy/V58 token collision.

### Phase 3: Homepage rebuild

Implement sections in this order:

1. Hero and CTA integration.
2. Rubric lab and proof explanation.
3. Funnel.
4. Expert bench and workflow.
5. Savings, engagement models, and coverage.
6. Testimonials, trust, and final CTA.

For each interactive section:

- Render a complete static state in HTML.
- Add JavaScript as progressive enhancement.
- Use actual `button` or form controls for state changes.
- Keep hover and keyboard focus equivalent.
- Include touch behavior or avoid hover-only information.
- Respect reduced motion and avoid auto-motion that obscures the default story.

**Exit criteria:** visual comparison at 1440px, 1024px, 768px, 390px, and 320px; working CTAs; no console errors.

### Phase 4: Reusable page-template migration

Migrate in dependency order:

1. Industry/function templates.
2. Services and intelligence.
3. Candidates and careers.
4. About and contact.
5. Blog listing, article template, tags, categories, and 404.

Do not rewrite page information architecture merely to make layouts look similar. Apply V58 typography, surfaces, rhythm, cards, controls, and imagery while preserving page purpose.

**Exit criteria:** no route renders legacy typography or incompatible surface/color combinations unless explicitly retained.

### Phase 5: Quality gate

- `npm run check`
- `npm run test:handlers`
- `npm run build`
- `git diff --check`
- Desktop and mobile screenshot sweep.
- Keyboard-only and screen-reader spot checks for all navigation and interactive controls.
- Contrast audit for text, focus rings, tags, and dark surfaces.
- Verify no visual is dependent on hover alone.
- Verify analytics, form-intent attributes, structured data, metadata, canonicals, sitemap, robots, Netlify redirects, and headers.

**Exit criteria:** all checks pass and the launch review signs off on content claims and screenshots.

## Accessibility Requirements

- One H1 per route and a logical heading order.
- Visible focus rings that meet contrast requirements on all surfaces.
- Native controls for sliders, tabs, and stage selection where possible.
- Selected state exposed with `aria-pressed`, `aria-selected`, or `aria-current` as appropriate.
- Motion is disabled or simplified under `prefers-reduced-motion`.
- Marquees pause on hover and focus and provide the same content in accessible reading order.
- Illustrations have useful text alternatives or are marked decorative.

## Performance Requirements

- No Google Fonts in production.
- Font preloads limited to weights used above the fold.
- Component scripts must be deferred and scoped.
- Avoid duplicate content for visual looping unless accessibility behavior is controlled.
- Avoid large inline SVG/DOM grids above the fold unless they are necessary to the core message.
- Measure Lighthouse and real-device performance before release; prevent a homepage interaction from blocking first contentful paint or CTA availability.

## Rollout and Rollback

1. Work only on the `test` branch until review approval.
2. Create checkpoint commits at the end of Phases 1, 2, 3, and 5.
3. Use a preview deployment for each checkpoint.
4. Keep the last approved production commit tagged or recorded before deployment.
5. If a release fails conversion, rendering, or form validation, redeploy the prior approved commit. Do not attempt emergency CSS overrides on production.

## Definition of Done

The migration is complete when the V58 homepage and all public routes use the new system consistently; production routes, forms, metadata, analytics, and legal links work; claim owners have approved public statements; and the quality gate passes on desktop and mobile.
