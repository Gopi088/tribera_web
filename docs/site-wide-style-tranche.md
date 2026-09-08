# Tranche: Site-Wide Hiring-Page Alignment

Status: site-wide implementation applied to all 76 public routes. Initial and
follow-up Claude visual/copy reports received for every route. Claude has closed
the confirmed cross-site findings; production release is not authorized.

## Execution Checkpoint

- Shared editorial boundary and shell applied across services, intelligence,
  coverage, company, careers, blog/taxonomy, legal/security and 404.
- All 76 routes retained. Latest desktop/mobile audit: 152 successful captures,
  no horizontal overflow or page errors, one main per route.
- All-route navigation comparison passes at 390, 1080 and 1520px. Hiring/candidate
  audience-switch regression also passed at nine widths.
- Route-by-route initial and follow-up Claude reports are archived under
  `docs/reviews/site-style/claude/`. Readable interaction/section crops supplement
  the full-page reviews; static review is not proof of backend behavior.
- Corrections and owner-evidence requirements are in
  `docs/reviews/site-style/correction-disposition.md`.
- The recovered repository-wide Astro check produced 1709 diagnostics after the
  default check exhausted memory. It is not a passing check; full lint/format
  stages were not reached. Build and targeted browser/handler checks are separate.
- No deployment or commit. Legacy content/CSS was not bulk-deleted.

The original batch order guided template migration. Independent route review packets
ran alongside later implementation rather than waiting for each whole batch to
finish. The final route ledger and correction follow-ups, not batch labels alone,
are the evidence of actual coverage.

## Objective

Apply the approved hiring page's design, color semantics, layout principles and
copy style to every public website route. Preserve each page's purpose and working
behavior. Require Claude visual AND copy review of every changed route, followed
by a cross-site consistency review. This is not a blanket CSS replacement.

## Authority

1. The current rendered `/` page is the primary reference, including its final
   computed styles. Earlier CSS declarations are not authoritative when overridden.
2. `src/components/home/v58/Home.astro`, shared V58 tokens and shared navigation
   are the implementation references. Capture dated desktop/mobile baselines first.
3. The current candidate page supplies approved adaptations: neutral sample scores,
   relative amber evidence, dynamic priority emphasis, stable preview tabs and
   mobile score feedback. Do not copy hiring verdict thresholds into other contexts.
4. Files in `sample_data/` are secondary references only. Do not restore obsolete
   claims, fake controls, layout drift or superseded copy to match a sample.

This tranche supersedes reference and sequencing guidance in
`v58-migration-plan.md` where it conflicts. It does not authorize commits,
deployment, branch changes, route removal or product-policy changes.

## Scope And Inventory

Use `site-style-route-audit.md` as the route-level completion ledger. Its initial
inventory comes from the current build output, not an assumption that every source
file produces a public route. Refresh and reconcile it after every build.

- Hiring, candidate, services, intelligence, about and contact pages.
- Industry and function listings and every generated detail route.
- Careers listing, every job detail and candidate profile submission page.
- Blog listing, all articles, category/tag listings and generated pagination.
- Privacy, terms, security and 404.
- Header, footer, dropdowns, audience selector, contact modal, forms and their
  loading/error/success states wherever rendered.

Archive source under `src/pages/_archive/` is not currently in the build inventory.
The Decap CMS admin page is a documented operational exclusion, not a marketing
redesign target. External login/application destinations remain unchanged. Any new
or unexpectedly generated route must be classified; it cannot silently disappear.

## Non-Negotiable Style Contract

### Layout And Type

- Fraunces for editorial headlines/subheads; Inter Tight for prose and UI;
  JetBrains Mono for concise labels and metrics. Preserve sans workflow titles.
- Shared content gutters and header geometry. No logo, menu, selector or CTA jumps
  between routes. Test actual navigation, not just isolated screenshots.
- Match rendered hiring hero proportions, heading scales, wraps and vertical
  spacing. No arbitrary fixed heights or punctuation stranded on a new line.
- Left-align section headings. Center only intentional heroes/final CTAs.
- Vary composition by content: editorial introduction, comparison, evidence
  document, workflow or proof panel. Do not repeat a split introduction everywhere.
- Shared two-column geometry for associated headers and content. Align major
  block headings, not unrelated rows or artificially equal outer card heights.
- Reuse measured card radius, border, shadow, padding and type. No card everywhere.
- Primary red pill CTA; quieter secondary link. Preserve visible keyboard focus.

### Color And Motion

- Use the hiring page's white, warm paper and charcoal surfaces, not new palettes.
  Plan section transitions deliberately; avoid accidental consecutive dark bands.
- Red means a primary action, selected emphasis, ownership or restrained annotation.
- Amber flags explicitly described weaker evidence; green/red verdict states need
  a real, supported decision rule. No invented success bands or pass/fail cutoffs.
- Match selected, hover and focus states, not just idle colors. Preserve score
  mappings and seeded animations; do not replace working behavior with decoration.
- Motion supports comprehension, has a reduced-motion alternative, and never hides
  essential content when JavaScript or animation is unavailable.

### Copy

- Lead with the audience's problem and useful outcome, then explain how it works.
- Keep context while removing repeated explanations, slogans and long subtext.
- Prefer concrete, plain language. Avoid internal terms such as "both rounds"
  without context, and distinguish employer, candidate and Tribera responsibilities.
- Keep example, historical result, target and general promise distinct.
- No invented statistics, guaranteed response/offer timelines, absolute anonymity,
  compliance claims or unverified customer outcomes. Maintain an evidence/owner
  ledger for disputed claims rather than quietly strengthening them.
- Preserve testimonial wording and attribution. Do not homogenize long-form articles
  into landing-page copy or alter their substantive argument without review.
- Legal pages receive presentation and readability review; substantive legal or
  privacy-policy changes require owner approval, not Claude's design sign-off.
- Preserve candidate-facing nuance and neutral examples. Avoid "your score" for
  another person's sample and never expose fake functional controls.

## Sequential Batches

Complete implementation, testing, Claude review and corrections for one batch
before starting the next. Record partial work honestly; a build pass is not review.

| Batch | Work                                                                                                                                   | Exit condition                                                                        |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 0     | Capture current reference, route inventory, before screenshots, rendered style measurements, copy and existing test failures           | Baseline and claim/review ledgers recorded                                            |
| 1     | Extract/reuse shared shell, section, typography, buttons, cards, labels and semantic states; remove per-route collisions incrementally | Hiring/candidate baselines unchanged; nav stable across pilot routes                  |
| 2     | Services and intelligence                                                                                                              | Both pages match the contract without losing service distinctions or interactions     |
| 3     | Industry/function listings and detail templates                                                                                        | Every generated detail reviewed, including long-copy and sparse-content variants      |
| 4     | Candidate landing/start, careers listing and job details                                                                               | Whole journey consistent; mocked upload/submission/retry/success tested               |
| 5     | About and contact, including shared modal states                                                                                       | Factual company narrative retained; every CTA intent and contact flow works           |
| 6     | Blog listing, articles, category/tag/pagination templates                                                                              | Every rendered route checked; editorial typography/readability and metadata preserved |
| 7     | Legal/security/404                                                                                                                     | Presentation aligned; legal substance unchanged or explicitly approved                |
| 8     | Full-site regression and final Claude visual + copy review                                                                             | All in-scope routes signed off; no unresolved blocking findings                       |

Shared-component changes in any batch trigger reference-page and previously
completed route regression checks. Already improved candidate sections are not
assumed complete for this tranche; verify them against the extracted shared system.

## Claude Review Protocol

For each batch, create `docs/reviews/site-style/batch-N.md` when review begins.
Include the exact source revision/diff context, screenshot paths, route list,
viewport/state coverage, copy before/after, and claim questions. Do not label a
review complete before actually invoking Claude and receiving its result.

1. Capture rendered after screenshots for EVERY changed route at 390px and 1520px.
   Include full-page rhythm and readable section crops; show relevant expanded,
   selected, mobile-nav and form states. Source inspection alone is not visual review.
2. Give Claude the hiring reference screenshots alongside each route's before/after
   evidence. Split large batches into bounded review packets; record which routes
   each packet covers. A representative template review cannot clear all its slugs.
3. Ask separately for visual findings and copy findings, each with severity, route,
   section, rationale and a specific correction. Ask for comparison, not reassurance.
4. Implement valid findings, test again, recapture affected states and obtain a
   follow-up review. Record rejected suggestions with a concrete reason. Claude
   cannot approve unsupported product/legal claims or silently change requirements.
5. Mark a route reviewed only when both visual and copy results are recorded.
   Track unresolved findings as blocking, owner approval required, or optional.
6. Final review checks cross-route navigation, palette, type, spacing, CTA wording,
   claims and audience transitions. If Claude is unavailable, mark review pending;
   do not substitute an unlabelled self-review or claim sign-off.

## Engineering Gates

- Preserve routes, anchor destinations, metadata, canonicals, structured data,
  sitemap/robots, redirects, analytics and form-intent attributes.
- Preserve form contracts, upload validation, anti-abuse and security controls.
  Test with intercepted/mock requests; never send test leads to live recipients.
- Do not globally override legacy selectors. Migrate standalone templates to scoped
  components/shared shell in small steps; delete duplication only after parity checks.
- Test 320, 390, 768, 1000, 1520 and 1920px. Check actual column alignment, overflow,
  heading wrapping, keyboard order, contrast, 44px touch targets and reduced motion.
- Check one main/H1, logical heading hierarchy, tab semantics, live status messages,
  all CTA destinations and no console errors. Keep useful no-JavaScript content.
- Run existing targeted layout tests, `npm run test:handlers`, `npm run check`,
  `npm run build` and `git diff --check`. Record pre-existing failures separately;
  do not blanket-format unrelated files or claim a failed suite passed.
- Use `scripts/visual-sweep.mjs` where suitable, extending coverage after inspecting
  its current behavior. Check performance/font loading and avoid duplicated scripts.

## Definition Of Done

Every public route is accounted for, implemented and functionally verified; Claude
has reviewed both visuals and copy for each changed route and all corrective work;
the final cross-site review is recorded; unsupported claims are absent or approved
by an accountable owner; hiring/candidate behavior has not regressed; and the
engineering gates pass or explicitly documented pre-existing failures remain.

Deployment remains a separate action. Do not describe this tranche as deployed
merely because a local build and review pass.
