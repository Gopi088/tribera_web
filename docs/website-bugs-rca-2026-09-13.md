# Website workbook: root-cause analysis and proposed fixes

## Scope and evidence

Source: `sample_data/Tribera-Website-Bugs-Reviewed (1).xlsx`, worksheet 1,
rows 2-47 (46 entries, including review/coverage notes). Row numbers below are
spreadsheet row numbers, not the previous 18-item checklist numbers.

Baseline: local `test` commit `f2636fd`. This is a recommendation-only audit;
no website source, deployment configuration or workbook cells were changed.
The workbook describes a deployed version; its Open statuses are not proof that
the same bug remains in this newer local commit. Production deployment settings,
business approvals and product data provenance were not available for verification.

Evidence collected:

- Read the actual XLSX cells, affected source/templates/data, existing tests and build output.
- Exercised candidates, intelligence, industries index and functions index at
  390 and 1520 pixels, with JavaScript enabled and disabled (16 combinations).
  JavaScript runs switched a brief or selector. No uncaught browser errors or
  horizontal overflow occurred in these sampled runs.
- Scanned built internal link targets across 12 industry, eight function, seven
  blog and seven career detail pages. Found 19 missing-target occurrences in blog
  pages; sampled three targets and confirmed local HTTP 404 responses.
- Prior homepage closure is documented in `home-bug-verification-2026-09-13.md`.
  Those 18 fixes were reviewed by Claude before commit `f2636fd`.

## Systemic causes

1. **Independent copies of shared facts.** About, Home, Contact, legal Markdown,
   blog Markdown and standalone Astro articles publish the same facts from
   different files. Updating one does not update the others.
2. **No publication approval model.** Client names, expert identities, numerical
   findings and guarantees are plain strings, without an approval/source/as-of
   record that the renderer can enforce. Hardcoding does not prove a claim false;
   it means the repository cannot establish its validity.
3. **Client-only initialisation of meaningful content.** Some chart templates
   ship zero values and rely on a browser script to replace them. The candidate
   demo already demonstrates a better server-rendered default.
4. **Different concepts presented as one rubric.** Role-specific criteria,
   illustrative comparison dimensions, weighted scores and hiring thresholds
   need explicit names rather than superficially identical scales.
5. **Tests cover interactions better than editorial invariants.** Existing
   interaction tests do not establish client permission, canonical addresses,
   legal suitability, statistical validity or links from copied article bodies.

These are architectural observations from the current code, not a claim about
which historical edit introduced each issue.

## Rows 2-19: homepage issues already resolved locally

Do not reapply the spreadsheet's literal replacements where a later reviewed
fix improved them. Preserve the correct funnel sequence, normalised percentages
and 32-hour estimate. Publish the tested commit through the normal release flow,
then verify the actual deployed version before closing the deployment tracker.

| Row | Root cause of reported symptom                                                 | Current resolution / proposed action                                                              | Verification                                                              |
| --- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| 2   | Hero tried to communicate several ideas through one long aside.                | Three short sentences explain sourcing/existing pipeline and evidence-backed shortlist. Retain.   | Hero copy/layout tests at mobile and desktop.                             |
| 3   | CTA used an unexplained metaphor before introducing the service.               | "See it live" replaces premature bar wording. Retain.                                             | Link is `#proof`; primary contact CTA unchanged.                          |
| 4   | Scroll cue repeated that premature metaphor.                                   | "It's live - see it yourself". Retain.                                                            | No bar wording in hero; cue destination exists.                           |
| 5   | Cue was a bottom-of-hero element immediately before logos.                     | Now grouped below the timing line inside hero copy. Retain.                                       | Geometry test requires at least 60px before logos; real hero screenshots. |
| 6   | Caption repeated the graphic's shared-standard explanation.                    | "Three clear it. Five don't." Retain.                                                             | Exact caption; three above/five below.                                    |
| 7   | Abstract payoff repeated the promise without a useful action.                  | "Three to interview. Evidence to decide." Retain instead of reverting to longer spreadsheet copy. | Copy assertion and mobile wrap.                                           |
| 8   | Lab led with implementation detail rather than the hiring benefit.             | Explains role-dependent fit and how to use priorities. Retain.                                    | Same evidence scores; brief changes affect weighted verdict only.         |
| 9   | Default note used abstract wording; reset could restore stale text.            | Initial and preset notes now identify strengths/gaps using existing scores. Retain.               | Switch away/back and compare default note; preserve score arithmetic.     |
| 10  | Footer separated user priorities from the assessment action, then used jargon. | "Tell us what matters most - and we adjust the assessment to match." Retain.                      | No mid-word re-weight break on mobile.                                    |
| 11  | Expert heading depended on unexplained "one bar".                              | Explicitly says interviewing to your requirements. Retain.                                        | Heading remains legible at small widths.                                  |
| 12  | Four group headings visually dominated a run-on sub-function list.             | Seventeen separate role entries, explicitly grouped by specialism. Retain.                        | Exact role inventory and accessible disclosures.                          |
| 13  | Introduction duplicated every stage and commercial caveat in a paragraph.      | Short context plus separate case clarification; diagram carries stages. Retain.                   | 126/40/14/5/2 and three-shortlist offer remain distinct.                  |
| 14  | Screening outcome and next-stage label were disconnected.                      | Explicit 126 CVs to 40 HR interviews. Retain.                                                     | Stage label and linked square/keyboard interaction tests.                 |
| 15  | Static pool count looked like the active-stage count.                          | "From 126 candidates sourced for this role" establishes the denominator. Retain.                  | Correct reading beside 40, 14, five and two.                              |
| 16  | Pronoun had no clear client antecedent.                                        | "The hiring team" used in stages, close and time estimate. Retain.                                | Search and rendered-copy checks.                                          |
| 17  | Natural wrapping split a sentence after "We".                                  | Explicit break between the two sentences. Retain.                                                 | Workflow geometry and heading break tests.                                |
| 18  | Accent index set contained four entries.                                       | Exactly three indices. Retain.                                                                    | DOM count plus visual inspection.                                         |
| 19  | Graphic draw/pop state was missing from the implementation.                    | Observer, drawn state and stagger restored. Retain.                                               | Executed animation/reduced-motion/no-JS tests, not still-image inference. |

Source: `src/components/home/v58/Home.astro`; acceptance coverage:
`tests/home-handoff.test.mjs`, `funnel-stages.test.mjs`, `hero-layout.test.mjs`,
`experts-layout.test.mjs`, `work-layout.test.mjs` and `home-audit.test.mjs`.

## R20 - Site-wide noindex

**Status:** intended for staging; production launch gate, not a confirmed production defect.

**RCA:** `src/components/common/Metadata.astro:78` forces noindex for local DEV,
non-production `CONTEXT`, or a Netlify `URL` containing `netlify.app`. Shared
metadata carries that decision to both standalone and regular pages. Config
defaults to indexable (`src/config.yaml:15`), with intentional per-route exceptions.
The hostname rule can also suppress indexing if a production build's URL is
still a Netlify subdomain. Actual production environment values were not inspected.

**Proposed fix:** preserve staging protection. Before launch, establish an explicit
production-indexing policy tied to the approved production host/context; add a
build matrix for local, preview, branch deploy, approved production and noindex
routes. Do not globally change every page to index. `public/robots.txt` and sitemap
generation already exist (`astro.config.ts:40`); the workbook's suggestion to add
them is stale. Sitemap availability should be tested against the build/preview,
not Astro dev, where `/sitemap-index.xml` was 404.

**Accept:** production marketing HTML and response headers permit indexing;
staging remains noindex; canonicals and sitemap point at the approved host;
privacy/terms and taxonomy exceptions remain deliberate. Deployment owner approval.
Google documents that robots.txt blocking can prevent a crawler seeing noindex:
[Google indexing guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

## R21 - Unapproved client names on About

**Status:** confirmed; high-priority publication correction.

**RCA:** About's independent literal client strip
(`src/pages/about.astro:5170`) still includes all ten cut names; Home has a
separate approved list. There is no shared allowlist or build assertion.

**Proposed fix:** use one approved-client data source for both sections. Limit it
to the workbook's eleven approved names; remove cut names from visible markup,
metadata and any duplicate client-list renderers. Preserve ordering appropriate
to each layout. Do not infer permission from a testimonial or historical sample.

Separate implementation steps: when implementation is authorised, removal of the
ten explicitly cut names can proceed without inventing new claims. Before adding
the six names not currently on About, confirm that the workbook's approved list
also authorises that publication context. The Home array demonstrates current
usage, not independent proof of permission. Centralisation must not bypass this gate.

Exact reconciliation: About currently has 15 names: five approved plus ten cut.
The approved list is 11 names, not 11 names already present on About.
Home's separate source is `src/components/home/v58/Home.astro:76` (`heroClients`).

- Remove: Heineken, ICICI Bank, ICICI Securities, PayU, DSP Mutual Fund,
  Utkarsh Bank, Aeries, SplashBI, Aegon Life and Enpro.
- Retain from current About: Flipkart, Myntra, Mizuho, Publicis Sapient and Capco.
- Approved names missing from About: Deloitte, ArcelorMittal, Motherson,
  Publicis Resources, Evident Microscopy and Antz.
- Final shared allowlist: Mizuho, Capco, Deloitte, ArcelorMittal, Flipkart,
  Myntra, Motherson, Publicis Sapient, Publicis Resources, Evident Microscopy, Antz.

**Accept:** generated public pages contain no cut client names as client claims;
both strips use the same allowlist. Business owner confirms publication permission.

## R22 - Fixed expert headcount

**Status:** confirmed inconsistency; actual count unverified.

**RCA:** About hardcodes "Fifty" in narrative (`4425`), a 50+ statistic (`5159`)
and "bench is fifty" (`5211`). Homepage copy deliberately avoids a fixed count.
There is no count source, freshness date or shared approved wording.

**Proposed fix:** prefer non-numeric wording, such as "Senior experts matched to
the role", and rework the numeric statistic tile rather than leaving an empty
number. Retain a number only if the business can substantiate a dated definition
of active/available experts. Do not replace all occurrences of 50+ globally:
profiles, signals and annual hiring volumes are different facts.

**Accept:** no contradictory headcount claims in public HTML; approved definition
and evidence required for any remaining numeric claim.

## R23 - Free-restart guarantee

**Status:** text confirmed on shared industry template; entitlement unverified.

**RCA:** `src/pages/industries/[slug].astro:6752` contains unconditional commercial
language shared by all 12 pages, outside any approved service-policy model.

**Proposed fix:** do not invent or silently broaden the guarantee. Business owner
must confirm scope, eligibility, time window, exclusions and contract precedence.
Until approved, proposed public copy is "If the shortlist misses the brief, we
review the feedback with your team and agree the next step." If the guarantee
is genuine, publish a shared policy summary consistently on relevant hiring pages.
Do not copy it to candidate pages, which address a different customer/contract.

**Accept:** no unsupported no-cost or guaranteed-hire language in generated pages;
approved policy and contract agree. Commercial/legal sign-off required.

## R24 - Interview-method disclosure

**Status:** confirmed copy-policy inconsistency, not a demonstrated security breach.

**RCA:** literal "Every question comes off the candidate's own CV" survives in
`src/pages/industries/[slug].astro:6702` and
`src/pages/blog/designing-ai-for-high-stakes-technical-assessment.astro:7004`; more recent candidate
copy uses experience-led phrasing. No shared vocabulary/disclosure policy.

**Proposed fix:** "Questions are shaped by the role and the candidate's
experience." Apply to the industry template and article, then search variants
including curly apostrophes. This describes the benefit without claiming every
question has one exclusive source. Product owner approves the actual method.

**Accept:** no absolute every-question-from-CV claim unless explicitly approved;
candidate and hiring pages remain compatible, not necessarily word-for-word equal.

## R25 - Two demos, different scales

**Status:** deliberate models, insufficient cross-page explanation; not an arithmetic defect.

**RCA:** Home has nine role-specific scores out of five and a weighted result out
of 50 with decision bands. `src/components/candidates/model.ts` and
`Candidates.astro:86` have six example scores out of 100, a weighted result out
of 100 and an explicit not-a-ranking label. They are independent datasets, not
two displays of the same candidate. Matching numbers would manufacture equivalence.

**Proposed fix:** preserve both models and add concise purpose labels: hiring
assessment example versus candidate team-fit example. Explicitly state that
criteria/weighting are role-specific and example scores are not comparable across
roles. Share visual primitives for score cards, labels, spacing and focus states,
not thresholds or business formulas. Obtain product confirmation of the canonical
rubric framing in R44 before promising any universal criterion count.

**Accept:** each demo explains its unit and purpose; existing calculations remain
unchanged; do not add hiring rejection bands to the candidate demo for symmetry.

## R26 - Candidate JavaScript fallback

**Status:** not reproduced as a defect; close verification item locally.

**RCA:** a source/SSR inspection sees `<noscript>` content even when a JS-enabled
browser does not render it (`Candidates.astro:176`). Initial score and weights
are server-rendered, not a broken hydration placeholder.

**Evidence:** at both tested widths, JS changes score 91.1 to 90.2 after switching
brief. With JS disabled, 91.1 and the explanatory fallback remain. No errors or
horizontal overflow. Raw `noscript.innerText` in JS mode may contain markup;
that is not evidence the fallback is visible.

**Proposed fix:** retain implementation; add/retain an explicit visibility and
all-brief regression test, including keyboard navigation and blocked-script mode.

## R27 - Services / founder title

**Status:** workbook says reviewed OK; title consistency confirmed locally.

**RCA:** no mismatch found: Services `src/pages/services.astro:11198` and About
`src/pages/about.astro:4497` both use Chief Success Officer. Off-site collateral
was not reviewed.

**Proposed fix:** none to current title. If consolidating shared business facts,
include founders and approved titles. Do not treat an OK row as a defect.

## R28 - Named expert biographies

**Status:** specific public assertions confirmed; authenticity/consent unknown.

**RCA:** `src/data/function-pages.ts:140` stores names, tenure and performance
claims as strings; `src/pages/functions/[slug].astro:6784` renders them as factual
bench descriptions. The type has no evidence or publication-approval fields.
The strongest named examples are in Engineering; other functions use generic
descriptions, so do not assume every function has named individuals.

**Proposed fix:** obtain identity, accuracy and publication-consent confirmation.
Until verified, replace named biographies with truthful generic expertise
descriptions. Do not merely label invented individuals as a real bench; if an
illustrative persona is genuinely needed, label the entire block as illustrative.
Handle guarantee consistency through R23, not through an unconditional addition
to every function page.

**Accept:** no identifiable expert or quantified achievement without approval;
all eight function pages swept. Content owner and relevant experts approve.

## R29 - Registered address and footer city

**Status:** confirmed conflicting facts; correct address cannot be inferred.

**RCA:** Contact `6464`, Privacy `131`, Terms `94` and shared Footer `54` publish
different independent strings. Two matching legal pages do not establish that
#507 is correct; nor does a workbook note establish #505. Footer "Bengaluru"
is unlabeled, so it is unclear whether it means office, origin or legal location.

Also verify About's explicit three-office claim (Pune, Bengaluru, New Jersey)
at `src/pages/about.astro:5155`, alongside Careers' two-city team description
at `src/pages/careers.astro:11197` and Contact's two-office inventory at
`src/pages/contact.astro:6461` (Pune head office and Bengaluru regional office).
This is an additional scope/approval question:
neither omitting New Jersey in recruiting copy nor listing it on About proves
which office inventory is correct. Do not deterministically change three to two.

**Proposed fix:** obtain the authoritative registered-office record from the
company owner. Model registered office separately from operating offices; expose
one shared verified legal address in legal/contact contexts, and label each
operating city accurately. Do not mechanically make every mention of a city
identical: a Bengaluru operating office can coexist with a Pune registered office.

**Accept:** exact unit/street/PIN validated, legal identity consistent, no ambiguous
footer location; company/legal approval before publishing factual changes.

## R30 - Number-format inconsistency

**Status:** confirmed; not just a typography setting.

**RCA:** Markdown `src/data/post/high-impact-hiring.md:2` uses 2,00,000; the
standalone article and featured card use 200,000. `src/pages/blog/index.astro:12`
fetches Markdown posts for `FieldNotesList`, while the article route has its own
independently edited body. Both content paths are active.

Routing qualification: `src/data/post/high-impact-hiring.md:6` names the same
permalink as the standalone Astro article. However,
`src/pages/[...blog]/index.astro:19` explicitly filters
`STANDALONE_BLOG_PERMALINKS` from `src/data/standalone-blog.ts`. There is no
demonstrated duplicate-generated-route collision. The standalone Astro body is
the served article; Markdown still supplies index title/excerpt and taxonomy.
The format clash also appears within the index itself: featured card versus
Markdown-derived list. Preserve that explicit route ownership during migration.

**Proposed fix:** adopt international grouping for this site. Amend the live
Markdown-derived title/excerpt metadata, the featured card, and the served Astro
article prose, then consolidate under R42. Do not schedule changes to an unserved
Markdown body as though it were the published article. Audit secondary consumers
(feeds, related posts and excerpt generation) before deciding whether retained
Markdown prose also needs maintenance. Use a
shared formatter for numeric data but editorial review for prose. Keep existing
slugs stable or add deliberate redirects; do not break article links.

**Accept:** title/card/body/metadata agree; search rendered pages for both formats.
Formatting agreement does not itself verify the 200,000 claim's provenance.

## R31 - Careers locations

**Status:** card-label inconsistency confirmed; claimed city contradiction not reproduced.

**RCA:** `src/data/careers.ts` mixes city-only and neighbourhood labels. Careers
`11197` already explicitly says the team is in two cities but current openings
are in the Bengaluru office. These facts are compatible.

Specific examples: `careers.ts:35` is city-only; Talent Advisor at `162`, Senior
Delivery Partner at `204` and the role at `246` use "Indiranagar, Bengaluru".
`mode` is already separate from `loc`; do not duplicate it in a new field.
The additional New Jersey office claim is covered by R29 and needs confirmation.

**Proposed fix:** separate city and neighbourhood within the location data, retaining the existing work-mode field;
show one short card format and detailed role-page location. Keep the accurate
two-office/current-openings distinction. Confirm actual onsite/hybrid policy
with recruiting rather than infer it from the common template.

**Accept:** all seven cards and detail pages agree for each job; no artificial
claim that the company has only one office.

## R32 - Coverage checkpoint

**Status:** review bookkeeping, superseded by later workbook rows.
**Proposed action:** consolidate into a route inventory with reviewed date and
test depth. Do not create a UI change or close legal/claims risks merely because
the route was opened. See completeness findings after R47.

## R33 - Intelligence statistics

**Status:** claims and provenance gap confirmed; truth not ascertainable from repo.

**RCA:** `src/pages/intelligence.astro:11063` and `11112` hardcode findings and
availability counts as facts. Script dataset `13133` embeds function sample sizes
and percentages. A method section exists, but there is no supplied auditable
dataset tying each claim to dates, cohort, denominator and calculation.

Include the surrounding observed-data and causal language in the claim inventory:
"thousands of interviews" at `11056`, "predicts leaving" at `11073`, cohort
descriptions, availability commentary, sample-size notes and the method section.
Removing a headline number while leaving these assertions would not resolve it.

**Proposed fix:** create a claims register with source query/export, cohort,
measurement date, owner, limitations and approval. Until substantiated, withhold
empirical claims or turn the whole demonstration into clearly labeled illustrative
data, removing factual-result wording and causal claims. Do not just add a tiny
illustrative footnote beneath statements about observed outcomes. A real dataset
would still need statistical review before claiming prediction or causation.
Fix the chart's SSR behaviour through R40, independently of data truth.

**Accept:** every displayed statistic traceable to evidence or explicitly
illustrative in its immediate context; business/data owner signs off. This is a
launch gate, not a request to fabricate replacement numbers.

## R34 - Privacy policy

**Status:** content coverage gap confirmed; legal compliance is not determined here.

**RCA:** `src/pages/privacy.md:31` lists website/account and resume/submission data but not
interview recordings, transcripts and assessment scores. Retention (`88`) is
generic; actual data flows, roles, vendors and deletion practices are not mapped.
An old date or absence of an Act's name alone does not prove noncompliance.

**Proposed fix:** first document actual product/website data categories, purposes,
controller/processor roles, recipients, consent and withdrawal, retention triggers,
deletion, grievance route and international transfers. Counsel then revises the
policy and related collection notices to match those practices and applicable
law. Resolve R29 first; update the publication date only when the policy actually
changes. Do not promise unimplemented retention/deletion behaviour.

**Accept:** approved policy maps to verified operational practices and applicable
commencement dates, with a working contact route. This is not legal advice or a
compliance certification. Counsel should consult the final Rules and enforcement
timeline, not the January 2025 draft:
[MeitY final Rules and notifications](https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa?pageTitle=Digit).

## R35 - Coverage checkpoint

**Status:** bookkeeping, not a new bug. **Action:** merge with R32/R38/R41/R43/R45/R47
into one inventory; retain individual open findings and approval gates.

## R36 - Security page enhancement

**Status:** enhancement, not a broken responsible-disclosure page.

**RCA:** `src/pages/security.md` is scoped to vulnerability reporting. The workbook
asks for a different asset: procurement-facing security assurance.

**Proposed fix:** retain disclosure instructions; optionally add a separate trust
page with verified controls and links to relevant policies. Security/engineering
must approve encryption, access, retention and certification claims. Do not
publish certifications or assurances based on visual examples or aspirations.

**Accept:** distinct reporting and assurance purposes; only evidenced controls.

## R37 - Terms liability, date and jurisdiction

**Status:** text verified; commercial/legal suitability requires counsel.

**RCA:** `src/pages/terms.md:53` uses "amount you paid (if any) or INR 8,000"
without clear scope relative to negotiated B2B contracts. It shares the old policy
date and address. Bengaluru jurisdiction at `65` does not automatically become
wrong because the registered office is Pune.

**Proposed fix:** counsel distinguishes website-use terms from signed engagement
terms, reviews cap basis/exceptions/precedence, and confirms intended jurisdiction.
Do not substitute a guessed cap or automatically change the court city. Apply
the verified legal address from R29 and date only a substantive approved revision.

**Accept:** legal approval and contract consistency, not just string uniformity.

## R38 - Unique-pages coverage checkpoint

**Status:** bookkeeping. **Action:** carry forward route coverage, not the claim
that template duplicates are automatically safe. Shared and per-page data can
introduce different factual errors; see R28 and additional link findings.

## R39 - Functions self-link and duplicated heading

**Status:** confirmed, deterministic navigation defect.

**RCA:** Functions index copied the industries index's cross-navigation CTA:
`src/pages/functions/index.astro:6629` points to its own route. Both templates
also keep the same H1; the functions introduction incorrectly says a data lead
and head of infrastructure share a title (`6264`). These are copied framing, not
router failures.

**Proposed fix:** Functions CTA becomes "Browse by sector" to `/industries`.
Keep Industries CTA to `/functions`. Differentiate headings, e.g. "The sector
changes what the role demands" and "Different functions. Different priorities."
Correct the shared-title statement rather than merely renaming the H1.

**Accept:** the two browse CTAs lead across indexes; no self-loop; unique, accurate
headings and introductory claims. Add an href assertion, not a screenshot alone.

## R40 - Zero-state widgets

**Status:** JS-enabled operation passes sampled checks; no-JS defect reproduced
on Intelligence and both coverage indexes, not Candidates.

**RCA:** Intelligence `11017` and both indexes (`industries:6324`, functions:6317)
emit literal zeros and empty bars. Intelligence and industries define their initial
datasets inline in browser scripts (`intelligence:13133`, industries:6753).
Functions already imports `src/data/function-pages.ts` in its browser script at
`functions/index.astro:6638`; that existing module can also be used by Astro.
All three templates depend on `paint()` after JS starts instead of rendering
initial values server-side. This fails progressive enhancement and makes SSR misleading.

**Proposed fix:** extract Intelligence/industries data and pure calculations into
modules usable by Astro and browser code. Reuse the existing functions data module;
do not create a second copy. Server-render a truthful initial selection,
labels, explanatory note and bar values. Enhance selectors after successful
initialisation; show an explicit no-JS note and do not leave apparently usable
controls with no action. Use candidate implementation as the structural pattern,
not as the source of values. Preserve each chart's units: the intelligence bars
are assessment-gap shares, not pass rates; functions/industries are comparisons.
R33 provenance approval remains necessary even if rendering is fixed.

**Accept:** correct nonzero default with JS off or script blocked, meaningful
selector changes with JS on, keyboard/mobile tests, safe repeated initialisation,
and consistent visible values/bar geometry. No uncaught errors in slow-load tests.

## R41 - Remaining-pages coverage checkpoint

**Status:** bookkeeping. **Action:** complete route-specific review including
article links and career text, not just template rendering. App login remains
outside this marketing-site audit. Built inventory has 34 detail pages, not a
reason to assume their content is low-risk.

## R42 - Article read-time mismatch

**Status:** confirmed; shared cause with R30 and missing taxonomy routes.

**RCA:** featured card hardcodes 8 minutes (`blog/index.astro:12525`); article
hardcodes 4 (`blog/rethinking-hiring-metrics-signal-efficiency.astro:6293`).
Markdown also carries `readingTime: '8 min'` (`high-impact-hiring.md:17`). Utilities
support a shared value but the standalone route bypasses that renderer. Changing
one number does not prevent recurrence.

The dynamic route explicitly excludes standalone permalinks (see R30); the
served body is the Astro article, not the Markdown body. Compute from that
displayed body until an intentional migration changes the source of truth.

**Proposed fix:** choose one authoritative article content/metadata record and
derive a read time from the actual displayed article body with a documented
calculation or editorial override. Feed featured card, list and article header
from that value. Reconcile all seven article sources and preserve current URLs.
Do not migrate rich article markup wholesale without a visual/content comparison.

**Accept:** all seven articles agree with their index representation and schema;
read-time change follows content change automatically. Neither 4 nor 8 is assumed
correct without computing from the displayed article.

## R43 - Article-skim checkpoint

**Status:** bookkeeping. **Action:** do not accept the workbook's low-risk inference
as evidence. The local link sweep found real missing routes; editorial/claim review
must still cover the individual articles. See additional finding A1.

## R44 - Rubric dimension count

**Status:** confirmed framing inconsistency; different example counts are not
inherently contradictory.

**RCA:** `src/pages/blog/designing-ai-for-high-stakes-technical-assessment.astro:7050`
states eleven, `src/pages/services.astro:11111` says six to
eleven, Home models nine, candidate demo six, and industry/function data repeatedly
says the same six dimensions everywhere. No explicit distinction between summary
comparison axes and a role's interview criteria.

**Proposed fix:** product owner defines the canonical model. Recommended public
framing: "Criteria and weighting are agreed for the role." If six-to-eleven is
verified policy, state it where needed; otherwise avoid inventing a fixed range.
Label six-axis comparison charts as illustrative summaries, nine-criterion Home
as that role's example, and the six-score candidate demo as a separate example.
Revise the blog's universal eleven claim and any universal six claims. Do not
change numerical models simply to make marketing copy look consistent.

**Accept:** readers can distinguish example counts from the product rule; full
search across Services, blog, templates and data; existing model tests unchanged.

## R45 - Dimension-count review checkpoint

**Status:** bookkeeping plus reference to R44. **Action:** one cross-site rubric
policy task, not a duplicate bug or a second implementation.

## R46 - Careers dimension order

**Status:** optional consistency improvement; not a scoring defect.

**RCA:** `src/data/careers.ts:1` provides canonical dimension order; detail template
`src/pages/careers/[slug].astro:16` deliberately sorts dimension/weight pairs
descending to emphasise the largest weight. Index uses the canonical order.
Labels stay paired with their weights, so there is no numerical corruption.

**Proposed fix:** use canonical order on both surfaces and keep a separate
highest-weight summary; alternatively explicitly label the detail chart as
sorted by importance. Prefer canonical order for easier comparison.

Implementation safeguard: `mx = rows[0].w` and `top = rows[0].n` currently rely
on the descending sort. If displaying canonical order, calculate the maximum
independently (`Math.max(...role.w)`) and derive the leading label from the
matching dimension; define stable tie handling. Do not simply remove `.sort()`:
Backend Craft 30 divided by the first canonical weight 26 would render at 115%.

**Accept:** all seven roles retain their exact label/weight mappings and total;
each scaled bar is within 0-100%, largest bar is 100%, and highest-weight
summary remains accurate (including ties), on both index and detail surfaces;
ordering is consistent or explicitly explained. Do not infer form submission
success from the workbook: no applications were submitted in this audit.

## R47 - Final coverage checkpoint

**Status:** bookkeeping; not sufficient evidence of launch readiness.

**Action:** replace evolving notes with a stable inventory recording code audit,
render/interaction test, content approval and deployment verification separately.
The 34 detail routes exist in the build. Local link-target existence was swept;
that does not prove every claim correct, every fragment valid or every external
link/application endpoint functional. Do not close the remaining reviews as
trivial just because one sampled template looked good.

## Additional finding A1 - Broken blog taxonomy links

**Status:** confirmed by build sweep; three representative targets also return
HTTP 404 locally. Nineteen occurrences across six of seven articles.

**RCA:** copied standalone article tag/category anchors use slugs that are not
generated from the Markdown collection driving taxonomy routes. This is another
consequence of the two content sources in R30/R42.

**Proposed fix:** derive article taxonomy links from the authoritative post
record and shared permalink helper. Generate a route only if it has meaningful
content; otherwise render a non-link label. Do not create empty taxonomy pages
merely to suppress 404 tests. Add a build-output link-target check.

**Accept:** zero unresolved same-site page-path targets in the built article
subset, with deliberate redirects explicitly resolved; no empty routes created
just to pass. Run the check after build in CI. Validate fragments separately and
keep external-link checks separate from deterministic local-route checks. Preserve
the existing standalone permalink exclusion while reconciling content metadata.

Missing paths include `/tag/briefing`, `/tag/pipeline`, `/tag/decision-speed`,
`/tag/job-search`, `/tag/rejection`, `/tag/signal`, `/category/ai-assessment`,
`/tag/assessment-design`, `/tag/human-in-the-loop`, `/tag/explainability`,
`/tag/model-limits`, `/tag/hiring-philosophy`, `/tag/mutual-fit`, `/tag/belonging`,
`/tag/screening`, `/tag/pipeline-quality`, `/tag/interview-load`, `/tag/default-states`.
`/tag/signal` occurs twice. No missing local path targets were found in the
industry/function/career detail subset by this scan; fragment/external validation
is separate and remains outside that result.

## Proposed execution order

1. R21: remove cut client claims; centralise the approved list, with confirmation
   before adding names not previously published on About.
2. R29, R23, R28, R33: obtain authoritative address, commercial policy,
   expert approvals and statistics provenance; withhold unapproved public claims.
3. R34/R37: counsel reviews Privacy and Terms using the verified business facts.
4. R20: production/staging indexing matrix and launch verification; preserve preview noindex.
5. R39: cross-navigation and inaccurate copied framing.
6. R40/R26: SSR defaults and exhaustive widget regressions; keep working candidate fallback.
7. R30/R42/A1: one blog record per article, number format, read times and taxonomy links.
8. R22/R24/R25/R44: approved headcount/method/rubric vocabulary and distinct demo purposes.
9. R31/R46: job location fields and scorecard order.
10. R27/R36 and coverage notes: retain correct content, schedule trust enhancement,
    complete per-route evidence/approval inventory and deploy smoke tests.

Rows needing owner/counsel input must not be marked fixed by implementing a guess.
Independent deterministic fixes can proceed while those decisions are collected.

## Claude review

Claude reviewed the RCA against repository source, requested revisions, then
returned **APPROVE**, subject to three scope clarifications. All three are now
incorporated: Contact's office inventory in R29, removal versus new publication
in R21, and published metadata/body scope in R30.

The first pass also strengthened the career-chart maximum/tie safeguards,
reuse of existing functions data, claim inventory, citation paths and CI acceptance
criteria. Source checks corrected two reviewer assumptions: the client-list sets
reconcile, and the dynamic blog route explicitly excludes standalone permalinks.

Review limits: Claude read source and the report. Workbook extraction, browser
probes and build link scanning were executed by Codex, not independently repeated
by Claude. Neither reviewer inspected production deployment settings or verified
external business/legal facts. Approval is for recommendations, not for the
implementation or for the truth of unverified public claims.

Website changes are intentionally not implemented as part of this request.
