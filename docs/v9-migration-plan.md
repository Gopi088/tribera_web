# Tribera v9 migration plan

Migrate the website to the design, content and interactions in `sample_data/tribera-web-handoff-v9`, preserving working submissions and existing URL access. Keep Astro's static build and Netlify hosting. Establish a shared v9 layout, prove it on representative pages, then migrate the remaining content and integrations in bounded changes.

This plan is ready to guide implementation. Proposed defaults below are recommendations where the session has not settled a product decision. Content awaiting confirmation can be built and reviewed privately while its publication remains pending.

The [parallel execution and gates policy](v9-execution-gates.md) defines worktree isolation, worker ownership, integration rules and the evidence required at each gate. Implement its bootstrap controls before broad parallel page migration. The policy is not yet an enforced CI configuration.

| Item                  | Baseline                                                                                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Plan date             | 18 October 2026                                                                                                                                            |
| Migration branch      | `feat/v9-migration`                                                                                                                                        |
| Checkpoint commit     | `b684330` on `test`                                                                                                                                        |
| Handoff               | v9, dated 17 October 2026; includes home v186                                                                                                              |
| Handoff inventory     | 119 files; 40 public pages, 404, internal START-HERE guide, 40 OG images, brand assets, photos, data, PDF and documentation                                |
| Current build         | 76 Astro pages plus the copied `/decapcms` HTML asset                                                                                                      |
| Review validation     | Current build and 49 handler tests passed; handoff loaded at 390px and 1366px in Chromium, with no page-level horizontal overflow or JavaScript exceptions |
| Scope of those checks | Not a full accessibility, interaction, delivery, external-source or cross-browser certification                                                            |

The [route map](v9-route-map.csv) contains 86 existing and proposed paths. It is a planning inventory, not a list of 86 indexable pages. Forty supplied public pages plus six additional careers pages produce 46 core content pages. Retained Functions pages, archives and utility routes are additional scope.

## Source precedence and working rules

1. Follow the user's decisions in this migration. Preserve the checkpoint and keep changes on the migration branch.
2. Use the rendered v9 pages for page composition, copy and interaction behavior. Use [START-HERE](../sample_data/tribera-web-handoff-v9/START-HERE.html) and the [README](../sample_data/tribera-web-handoff-v9/README.md) for shared intent.
3. Resolve conflicts between pages, JSON and documentation explicitly. The workbook describes v7 and is historical context, not the acceptance checklist. Older v58, v61 and v126 design assertions must not override the new design.
4. Keep the original handoff unchanged as a reference. Carry its claim comments into content provenance records so extraction does not lose pending confirmations.
5. Prefer shared components and structured data without flattening page-specific storytelling. Preserve the different scoring models used by home, candidates, sectors and careers.
6. Use local previews until a hosted preview or production release is requested. Repository access to the PDF and source material does not imply public website access.

## Proposed defaults and decisions

| Decision                   | Proposed treatment                                                                                                   | When it matters                                     |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Hosting                    | Keep Astro static output, Netlify functions and Resend                                                               | Foundation and forms                                |
| Canonical host             | Keep `https://www.tribera.ai`; normalize all handoff metadata to it                                                  | Metadata and redirects                              |
| Trailing slashes           | Set a consistent slashless policy; verify Netlify pretty-URL behavior against it                                     | Routing                                             |
| GCC slug                   | Adopt `/industries/global-capability-centers`; 301 the existing `centres` URL                                        | Sector rollout                                      |
| Functions section          | Retain its index and eight detail URLs; restyle using v9 components                                                  | Scope decision remains open; retain until resolved  |
| Blog category and tag URLs | Retain useful collection-driven archives with existing noindex policy; give any obsolete URL an explicit disposition | Blog migration                                      |
| Careers source             | Extend the existing `job` content collection to own both role content and scoring metadata                           | Data foundation                                     |
| Blog source                | Extend the existing `post` collection and use one article renderer                                                   | Data foundation                                     |
| CMS entry point            | Preserve `/decapcms` until actual editor use is established; update its schema if used                               | Content schema changes                              |
| Analytics and chat         | Inventory and preserve intended integrations; decide placement and tracking deliberately                             | Shared layout and hosted QA                         |
| Intelligence sample        | Allow private preview; require real data or an explicitly agreed alternate public treatment                          | Publication only                                    |
| Candidate and role forms   | Preserve the minimal v9 UI; adapt handlers to accept CV-first submissions without mandatory name/email               | Confirm operational contact workflow before release |
| Subscriptions              | Store separate blog and quarterly interests, with unsubscribe and consent state                                      | Provider choice needed before delivery testing      |

No answer to an open decision counts as approval. Engineering can proceed on the shared foundation and private previews while those decisions are resolved.

## Target architecture

Names below describe the intended implementation boundaries. Reuse an existing component where it can meet the v9 contract without inheriting legacy overrides.

| Area              | Planned files or location                                                                      | Responsibility                                                                                                   |
| ----------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Shared layout     | `src/layouts/V9Layout.astro`                                                                   | One document shell, metadata, fonts, navigation, footer and selected integrations                                |
| Design system     | `src/assets/styles/v9/`                                                                        | Tokens, base type, layout, components, motion and accessibility rules                                            |
| Shared UI         | `src/components/v9/`                                                                           | Header, footer, hero variants, source notes, FAQ, testimonials, client strip, author and CTA components          |
| Page interactions | `src/scripts/v9/`                                                                              | Scorers, CV explorer, timelines, service picker, scarcity lab, industry comparison, careers self-score and forms |
| Content models    | `src/content.config.ts`, `src/data/post/`, `src/data/jobs/`, new sector data under `src/data/` | Validated content and publication state                                                                          |
| Shared records    | `src/data/clients.ts`, new testimonial, source and case records                                | Repeated content with one authoritative definition                                                               |
| Route files       | Existing `src/pages/` routes and new standalone pages                                          | Thin composition layers; collection routes generate families                                                     |
| Delivery          | `netlify/functions/` and `_lib/`                                                               | Validated forms, uploads, notifications, PDF delivery and subscriptions                                          |
| Public assets     | `public/brand/`, `team/`, `office/`, `og/`, icons and fonts                                    | Browser-accessible approved assets                                                                               |
| Private sample    | A server-only asset directory bundled with the sample function                                 | Full PDF available to delivery code, absent from `dist`                                                          |
| Validation        | `tests/v9-*.test.mjs`, `scripts/test-v9-site.mjs`, existing handler tests                      | Content, route, interaction, responsive and delivery contracts                                                   |

The new layout should not import the old layout's accumulated navigation and typography overrides. During migration, unmigrated routes can retain their existing layout. Once all consumers have moved, remove unused CSS, scripts and components in a separate cleanup change.

Use normal document navigation with progressive cross-document view transitions. Do not introduce a client router solely for this port. Script initialization must tolerate back/forward navigation and avoid duplicated listeners, timers and observers.

### Content contracts

| Model         | Required information and invariants                                                                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sector        | Slug, title, hero, tagline, six named weights, misses, questions, role families, bench, market source and FAQs; weights total 100; preserve BFSI's additional rows                                                  |
| Role          | Status, dates, location, department, employment type, experience, positions, blurb, six named weights, ownership, skill explanations, requirements, optional requirements and application prompt; weights total 100 |
| Article       | Stable slug, title, description, author, original publication date, modification date, draft/release state, cover number/caption, margin notes, citations, tags, body and related-content rules                     |
| Testimonial   | Stable identifier, audience, quote, name and role; home uses all five supplied quotes and candidates uses the four candidate quotes                                                                                 |
| Source        | Stable identifier, title, publisher, date, URL and figure context; ordered references and source lists derive from the same record                                                                                  |
| Case          | Separate identifiers for the 126-profile/two-hire search, AI-security search and 327-profile/22-day search; repeated numbers and captions share a record                                                            |
| Scarcity data | Quarter, sample flag, function, six percentages, cohort size, collection period and method; percentages total 100 and real-data mode requires provenance                                                            |

Keep editorial date changes reviewable. For example, the current relationship article's publication date differs from the handoff. Preserve its original publication history unless the owner confirms a correction, and represent the rewrite through `dateModified`.

Generate careers pages, listing cards and the trusted server job catalog from the same approved source. Closed roles must stop accepting applications and lose active JobPosting markup. A build or deployment is required for static content changes; do not retain the handoff's unsupported promise that adding JSON creates a new role page without a rebuild.

## Implementation phases

### Phase 0 establishes the baseline

**Dependency:** checkpoint complete. **Deliverable:** repeatable route and visual references.

- [ ] Confirm `b684330` remains available and implementation starts on `feat/v9-migration`.
- [ ] Reconcile [v9-route-map.csv](v9-route-map.csv) with source routes and the built site. Extend it with live indexed URLs when a Search Console export is available.
- [ ] Record existing heading anchors and inbound destinations as well as pathname redirects.
- [ ] Turn the review's temporary browser checks into reproducible repository tooling. Serve handoff references with appropriate route resolution for link tests.
- [ ] Capture reference screenshots with fonts loaded and below-fold reveals settled. Freeze demo randomness for comparisons and inspect normal motion separately.
- [ ] Record current build, handler and static-check results. Any pre-existing static-check failures need a disposition rather than silent suppression.

**Exit condition:** each existing URL has a proposed treatment, the reference can be reproduced, and tests distinguish legacy behavior from intentional v9 changes.

### Phase 1 builds the shared foundation

**Dependency:** Phase 0. **Deliverable:** shared components exercised in a private preview.

- [ ] Extract shared CSS and page-specific CSS with the original cascade intact. The real files contain additional blocks beyond the README's simplified description; do not assume one marker isolates every override.
- [ ] Implement Fraunces display/italic styles, Inter Tight body and JetBrains Mono data/UI. Check existing font files for the required weights and optical-size behavior before reusing them; self-host matching fonts and retain licenses.
- [ ] Add white, paper and charcoal grounds; ink and red tokens; focus, spacing and typography roles.
- [ ] Implement product, editorial and compact heroes, plus the separate article-header composition. Preserve matched product cards and responsive geometry.
- [ ] Build shared navigation with active-route state, candidate audience variation, route-specific CTAs, keyboard menu behavior and working anchors.
- [ ] Build the footer, source-note popovers, source list, FAQ, author block, client strip and testimonial component.
- [ ] Import the supplied logos and icons. Replace retyped wordmarks and obsolete favicon references, including the old purple pinned-tab colour.
- [ ] Update the client list to the handoff's 13 names, including its additions and removal of ArcelorMittal. Restrict the strip to home, candidates and services.
- [ ] Implement one motion policy: 0.18s presses, 0.32s hover, 0.7s arrival and the specified easing. Preserve `rv-done` behavior and stop off-screen/background activity.
- [ ] Fix the observed reduced-motion client-strip bug by disabling the infinite animation, not shortening its duration. All content must remain visible without motion.

**Exit condition:** navigation, type, assets and shared interactions work at phone, tablet and desktop widths; components do not leak styles into unmigrated routes.

### Phase 2 proves five representative pages

**Dependency:** Phase 1. **Deliverable:** home, candidates, About, one sector and one article matching the handoff.

| Page             | Work and acceptance checks                                                                                                                                                                                                                                        |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home             | Preserve shortlist card, Bharat scorer, transcript evidence, adjustable bar, 36-hour timeline, expert tabs, case funnel, services, testimonials and FAQ. Check weight arithmetic and verdict boundaries; manual interaction must cancel automatic demonstrations. |
| Candidates       | Preserve Meera scorer, CV questions, illustrative privacy switches, team checks, timeline and upload UI. Explain demonstrations through the supplied context; they must not imply they changed an actual candidate account.                                       |
| About            | Preserve letter expansion, sourced chart, portraits, history, retention debate and closing field. Keep Pranav's CSO title distinct from founder roles.                                                                                                            |
| BFSI sector      | Use the richest sector example to exercise four misses, eight role families, market citation, score weights and sector-specific FAQs.                                                                                                                             |
| Flagship article | Exercise numeral cover, drop cap, margin notes, wide quote, sources, author, sharing and related reading. Keep its public availability governed by its release date.                                                                                              |

- [ ] Compare screenshots against the handoff at 390, 768, 1024, 1366 and 1920px; also inspect 320/360px behavior and short laptop viewports.
- [ ] Review complete page content, not only the first screen. Verify meaningful content and links without JavaScript.
- [ ] Record deliberate changes such as the reduced-motion repair; do not let a reference defect become an acceptance requirement.
- [ ] Define v9 tests before retiring the corresponding legacy assertions.

**Exit condition:** all hero types and both audience journeys have been proven; remaining pages can use established components without another visual-system redesign.

### Phase 3 completes services and conversion pages

**Dependency:** Phase 2; form contracts below can be implemented alongside this phase. **Deliverable:** complete hiring and contact journeys.

- [ ] Port Services with all twelve offerings, nine problem choices, four primary tickets, pricing comparison, founder narrative and FAQs.
- [ ] Add `/interview-as-a-service`, preserving per-interview plus success-fee wording and the distinct 48-hour batch promise.
- [ ] Add `/case-study`, preserving timelines, 327-profile display, re-read sequence and links to the corresponding service and article. Share its numbers with those pages.
- [ ] Port Contact with hiring/looking modes, contextual `sector`/`service`, correctly disabled inactive fields, responsible-person copy and office assets.
- [ ] Add `/sample-write-up` with the first-page preview and email form. Confirm the public preview does not embed or link the complete two-page PDF.
- [ ] Replace legacy modal dependencies where CTAs now navigate to Contact. Preserve any retained demo flow until its replacement works.
- [ ] Exercise all service-to-contact links, sample-request links and return journeys.

**Exit condition:** each CTA reaches its intended page or form, context survives navigation, and private end-to-end tests cover success and failure states.

### Phase 4 migrates sectors and Intelligence

**Dependency:** sector template and shared sources complete. **Deliverable:** thirteen industry routes and the Intelligence page.

- [ ] Import all twelve sectors from `data/sectors.json`, including fields already present there rather than reconstructing them from comments about missing generator scripts.
- [ ] Build the industry comparison chart, accessible sector selection and cards from the same weights used on detail pages.
- [ ] Preserve each sector's hero, market figure, top-weight opening, missed signals, questions, roles, interviewer bench and FAQ variation.
- [ ] Normalize prohibited marketing wording where the supplied JSON still says dimensions, rubric or mandates; preserve URLs and technical uses where meaningful.
- [ ] Implement the GCC slug redirect and update internal links, source records and OG metadata together.
- [ ] Port Intelligence's market sections, method and eight-function scarcity lab. Keep demo and measured values explicitly separate.
- [ ] Add cohort/date/method fields before switching sample mode off. A missing real dataset must not silently become an unlabelled production chart.

**Exit condition:** all weights and chart labels agree, every source note opens correctly, and public data readiness is recorded separately from page completion.

### Phase 5 consolidates careers and blog content

**Dependency:** schemas and representative pages complete. **Deliverable:** seven role pages and ten article pages with unified publishing behavior.

| Family                  | Migration work                                                                                                                                                                                                         |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Careers                 | Merge existing Markdown role metadata and `careers.ts` details into the extended job collection; resolve differences against handoff summaries.                                                                        |
| Role pages              | Adapt Backend Engineer, AI/ML Engineer, Software Intern, Talent Advisor, Senior Delivery Partner, Talent Associate and Growth Intern to one template, retaining role-specific prompts and requirements.                |
| Careers index           | Render cards in HTML, add department filtering and self-scoring, and use responsive office images. Eliminate the missing `/careers.json` fetch.                                                                        |
| Existing articles       | Migrate all seven full article rewrites while preserving stable public slugs and reviewing original dates.                                                                                                             |
| New articles            | Add GCC leadership, AI engineers in India and Seventeen interviews for one hire. Their supplied dates are 9 June, 27 August and 19 October 2026.                                                                       |
| Blog index              | Render lead story, two features, remaining list, cover numerals and article count from the published collection.                                                                                                       |
| Publishing              | Apply one publication predicate to generated routes, index, related articles, archives, sitemap and any active feed. Define date-only releases in Asia/Kolkata and ensure a build runs when a future post becomes due. |
| Legacy rendering        | Replace duplicated standalone article bodies and catch-all exclusions after route parity is proven. One URL must have one renderer and one content source.                                                             |
| Additional share assets | Create approved matching share images for the six roles absent from the handoff; use a deliberate fallback until those assets exist.                                                                                   |

As of the plan date, the flagship post is future-dated. Recalculate eligibility at the actual build/release time rather than permanently withholding it. Do not reset its publication date merely because implementation finishes later.

**Exit condition:** all role links resolve, closed/draft roles behave correctly, published articles appear consistently, and the same record supplies body, index card and metadata.

### Phase 6 completes trust pages and retained routes

**Dependency:** shared compact/editorial layouts and content sources complete. **Deliverable:** all remaining routes have a tested disposition.

- [ ] Port Privacy, Terms and Security; add DPA and How we work with numbers. Keep their reviewed text and publication status explicit.
- [ ] Add the v9 404 with working recovery links and verify the host returns status 404 for unknown URLs.
- [ ] If the proposed retention stands, restyle `/functions` and its eight detail pages using v9 components. Preserve useful function-specific content and map their CTAs into Contact.
- [ ] Bring retained category/tag archives into the shared layout and keep them noindex. Remove empty generated archives only with an explicit URL treatment.
- [ ] Resolve `/candidates/start` GET behavior together with its POST contract. A broad redirect must not consume CV submissions.
- [ ] Audit `/decapcms` and its configuration before changing or removing it. Keep it out of search and out of marketing navigation.

**Exit condition:** every row in the route map is implemented or explicitly held; no legacy page is stranded on an obsolete shell without a recorded reason.

### Phase 7 validates integrations and release behavior

**Dependency:** page families and form implementations complete. **Deliverable:** a release candidate with evidence.

- [ ] Generate metadata and JSON-LD from canonical content. Preserve locale `en_IN`, share images, author identity, FAQ parity and accurate job status/dates.
- [ ] Generate the sitemap from actual public routes. Exclude draft/future content, admin, aliases, archives marked noindex and form endpoints. Revisit the existing special-case exclusions for legal pages.
- [ ] Merge redirect and security-header intent into Netlify configuration. Check forced redirects, static-route precedence, method handling, host normalization and trailing slashes on the real host.
- [ ] Preserve Search Console verification. Review analytics and chat against the active layout, CSP, privacy copy and consent behavior; remove obsolete integrations only deliberately.
- [ ] Confirm docs, original handoff HTML, internal records and the full sample PDF are absent from the public build. Verify private PDF function bundling separately.
- [ ] Run the acceptance matrix below and capture final screenshots and remaining dispositions.
- [ ] Remove unused legacy components and scripts after checking imports and route consumers. Update CI to run v9 coverage instead of superseded design assertions.

**Exit condition:** the release checklist has no unexplained failures and every publication dependency has a concrete disposition.

## Form implementation contracts

Retain the current validation and delivery helpers where compatible. The existing handlers expect multipart bodies and timing/honeypot fields absent from most handoff forms; field renaming alone is insufficient.

| Public POST route         | Input                                                                                              | Implementation and delivery                                                                                                                                                                                                                   |
| ------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/candidates/start`       | `cv`, `intent`, optional `phone`                                                                   | Adapt candidate-profile delivery for CV-first input. Do not require or fabricate name/email, and do not assume a CV parser exists. Route to the candidate team; confirm how the recruiter contacts applicants whose CV has no usable details. |
| `/contact/send`           | Active side, name/email, hiring role/company/message or candidate CV/note, optional sector/service | Validate the active mode only. Resolve recipients server-side; hiring goes to the confirmed Abhishek destination and looking to the confirmed Akshata destination.                                                                            |
| `/careers/:slug/apply`    | `cv`, required `paragraph`, optional `phone`                                                       | Resolve an open role from a trusted catalog. Map the paragraph into notification content; reject unknown/closed roles and ignore spoofed role titles.                                                                                         |
| `/sample/request`         | Name, email, company, website honeypot                                                             | Send the private PDF, record the lead without automatically subscribing it to marketing, and handle partial delivery failures without duplicate emails.                                                                                       |
| `/intelligence/subscribe` | Email and quarterly interest                                                                       | Persist subscriber state and confirmation/unsubscribe behavior with the chosen provider.                                                                                                                                                      |
| `/subscribe`              | Email and blog interest                                                                            | Use the same provider with a distinct interest; deduplicate subscriptions without overwriting preferences.                                                                                                                                    |

The role route is one endpoint family instantiated for seven roles. Contact has two variants, so six endpoint families produce more than six user journeys.

- Enhanced requests receive the existing JSON success/error shape; success requires the requested operation to succeed. Ordinary POSTs receive a usable HTML result or a 303 result-page redirect. Document that progressive-enhancement difference from the handoff's blanket HTTP 200 instruction.
- Support multipart uploads and the URL-encoded non-upload fallback forms. Keep native required-field validation, accessible error summaries, loading states and retry behavior.
- Preserve origin checks, rate limits, text-length limits, HTML escaping, trusted role lookup, file signature checks and production scanning. Explicitly reconcile honeypot behavior instead of accidentally changing it during field mapping.
- Rework timing protection so a no-JavaScript submission can still succeed; do not require a client-created timestamp on the only supported path. Test that bot defenses still apply to both modes.
- Validate the advertised PDF/DOC/DOCX formats and 10 MB limit through the actual Netlify request path, scanner and mail provider. If an infrastructure limit prevents that promise, resolve upload transport or the advertised limit before launch.
- Provide method-aware handling for `/candidates/start`: retaining its GET page or redirect must not redirect POST bodies. Test public aliases through Netlify, not only direct function URLs.
- Add duplicate-submit protection to the sample-delivery flow and retryable provider failures. Do not show a success message for a missing handler or failed provider response.
- Test delivery with an agreed test inbox before using real recipient workflows. Confirm production environment configuration without storing credentials in the repository.

## Assets and performance

Move referenced images to files instead of retaining base64 copies on each page. Use the supplied 112px portraits for small bylines, larger portraits for About, and office `srcset` variants with explicit dimensions. Lazy-load below-fold imagery while keeping hero assets immediately available.

Use the 40 supplied OG images at their verified dimensions. Keep the logos' intrinsic aspect ratios; their source widths differ. Install the manifest and ICO/SVG/apple/maskable icons through one shared head component. Preserve meaningful alt text and decorative-image treatment.

Measure compressed HTML, CSS, JavaScript, image transfer, layout shift and page responsiveness on representative pages. Establish budgets from those measurements during Phase 2 and enforce them in Phase 7. Shared CSS must be emitted once; unrelated scorer, candidate-clock or form scripts must not ship on legal pages. Self-hosted fonts should load only the faces needed for the route rather than all historical brand families.

## Content decisions required before publication

The following items come from the handoff comments and review findings. They do not block layout implementation. Confirm owners with the site owner where the handoff does not name one.

| Item                    | Needed outcome                                                                                                                                      | Affected content                             |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| 22-day search           | Confirm 5 months, 327 profiles, 11 re-read, 2 reconsidered, 1 hired and client permission for the anonymised story; Akshata is named in the handoff | Services, case study and matching article    |
| Other proof             | Confirm 126-to-2 case, AI-security case, time-saved calculation, around-three interviews-per-hire claim and cohort/method details                   | Home, articles and methodology               |
| Company history         | Confirm 200,000 interviews and experience claims; preserve confirmed founder/CSO distinctions                                                       | About, blog index and bios                   |
| Experts and clients     | Confirm bench experience, displayed client list and applicable permission records                                                                   | Home, sectors and strips                     |
| Scarcity lab            | Supply real data with cohort/period/method, or explicitly agree a different public treatment                                                        | Intelligence                                 |
| Careers                 | Confirm which roles are actually open, dates, location and application workflow                                                                     | Careers listing, detail pages and JobPosting |
| Legal and operations    | Review policy, DPA, jurisdiction, liability, storage, retention, recording consent, analytics and security statements against actual operations     | Legal pages and related assurances           |
| Contact details         | Resolve Pune address consistency and New Jersey's missing address; confirm privacy/security and form recipient mailboxes                            | Contact, footer and Organization markup      |
| Office photography      | Confirm rights to Bengaluru photographs or supply replacements                                                                                      | Careers and Contact                          |
| Numbers standards       | Akshata's sign-off on the eight public commitments and attributed closing line                                                                      | Methodology and source lists                 |
| External figures        | Check cited source passages, dates, units and forecasts; prefer original research where supplied links go to secondary reporting                    | Intelligence, sectors and articles           |
| Subscription operations | Confirm provider, frequency, consent and unsubscribe process                                                                                        | Blog and quarterly forms                     |

Use one shared claims record for repeated figures. In particular, do not mix the homepage's 126-profile search with the separate 327-profile case. Legal text remains a content review task; this migration plan does not certify compliance.

## Acceptance matrix

| Area                    | Required evidence                                                                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Build and static checks | `npm run build`, `npm run check:astro`, `npm run check:eslint`, `npm run check:prettier`; triage baseline failures explicitly                                                |
| Handler regression      | Existing 49 tests remain meaningful; extend `npm run test:handlers` for new fields, modes, subscriptions, sample delivery and failures                                       |
| Routes                  | All mapped destinations, legacy redirects, anchors and generated links work; no redirect loops; unknown URLs return 404                                                      |
| Responsive              | All public routes at 390, 768, 1024, 1366 and 1920px; representative families at 320/360, 600, 830, 1600 and 2560px plus short landscape viewports                           |
| Visual                  | Loaded-font screenshots and full-page comparisons; validate text wrapping, card geometry, image cropping and no clipped content, not only document scroll width              |
| Browser coverage        | Chromium full sweep; WebKit and Firefox representative families and key interactions; real iPhone/Safari checks before release                                               |
| Accessibility           | Keyboard-only journeys, focus visibility/order, labels, accordion state, menu behavior, source popovers, form errors and contrast; automated checks supplement manual review |
| Motion                  | Reduced motion stops infinite animations and autoplay; hover/focus/Pause/off-screen behavior works; manual input cancels demonstrations; static content remains visible      |
| Scoring                 | Weights total correctly, reset and presets work, verdicts change at documented boundaries, evidence matches the selected skill, and all input methods work                   |
| Content                 | Every page has the intended sections; source lists match references; testimonials/client names/cases agree; no unapproved factual substitutions                              |
| Publishing              | Frozen-time tests before/on/after publication; drafts absent from production artifacts and discovery surfaces; closed jobs cannot accept applications                        |
| SEO                     | One h1, correct title/description/canonical, resolvable OG image, valid JSON-LD, sitemap exclusions and production indexing; previews remain noindex                         |
| Forms                   | Success, validation, missing files, invalid signatures, over-limit payloads, scanning failure, provider failure, duplicate submit, no-JS fallback and recipient routing      |
| Hosted behavior         | Netlify aliases, upload limits, real delivery, CSP, cache headers, host/slash redirects and environment-specific indexing                                                    |
| Public asset boundary   | Full sample PDF, docs, source handoff and internal content absent from `dist`; function can still read its bundled PDF                                                       |

Introduce focused v9 suites for routes, shared shell, home/candidates interactions, collections, forms and SEO/publication. Update `.github/workflows/actions.yaml` and `scripts/test-reviewed-site.mjs` together. Retire tests that assert old copy or old class names only after equivalent behavior has v9 coverage. Keep the existing file-validation and delivery regression tests.

Re-run checks when a new change or failure justifies them. A local Astro preview cannot prove Netlify redirects, hosted uploads or outbound email delivery.

## Change sequence and completion tracking

Use bounded commits or PRs so a reviewer can inspect one coherent result. These are planned units, not authorization to push or deploy.

| Unit | Result                                                           | Depends on                                         |
| ---- | ---------------------------------------------------------------- | -------------------------------------------------- |
| 1    | Route inventory and reproducible reference tests                 | Checkpoint                                         |
| 2    | v9 assets, fonts, layout and shared components                   | 1                                                  |
| 3    | Home and candidates with interaction tests                       | 2                                                  |
| 4    | About, sector template and article template                      | 2; review alongside 3                              |
| 5    | Form adapters, private PDF delivery and subscription integration | Defined contracts; can proceed alongside templates |
| 6    | Services, IaaS, case study, Contact and sample page              | 3, 4, 5                                            |
| 7    | All sectors and Intelligence                                     | 4, 5                                               |
| 8    | Careers and complete blog collection                             | 4, 5                                               |
| 9    | Legal, methodology, 404 and retained routes                      | 2, 8; content review for publication               |
| 10   | SEO, hosted validation, CI updates and legacy cleanup            | All affected units                                 |

Update the CSV status as each route moves from `not started` to `implemented`, `validated` and `release ready`, or `held for content`. Keep its release condition populated until resolved. Do not mark a page release ready based only on a screenshot.

The first implementation milestone is the shared v9 shell plus home and candidates, followed by the representative editorial, sector and article pages. Bulk migration begins once those establish the reusable system.

## Release and rollback

Prepare a release candidate with the final route map, screenshots, test results, unresolved content dispositions and exact configuration requirements. If content remains unapproved, decide its public treatment before generating the production sitemap or linking to it.

When a preview deployment is authorized, keep it noindex and verify the actual Netlify form aliases and delivery path. When production publication is authorized, verify canonical host, indexing, redirects, 404 handling, key journeys and sample delivery immediately after release.

Record the previously deployed Netlify release and keep it available for rollback. The repository checkpoint `b684330` is the code baseline; it is not evidence that this exact commit was previously deployed. Coordinate any rollback of page UI with function contracts so restored forms still submit correctly. Do not destroy subscription records, lead records or submitted files as part of a code rollback.

Migration is complete when all agreed routes and interactions are validated, required content decisions are resolved, production behavior is verified after an authorized release, and the new site has no active dependency on superseded rendering paths.
