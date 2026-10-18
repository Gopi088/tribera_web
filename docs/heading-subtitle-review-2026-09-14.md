# Site-wide Heading and Subtitle Review

## Scope and Result

Review only. No website typography, copy, section order, navigation, or hero
height was changed in this audit.

All 76 public routes were measured individually on the current local site at
390px, 768px and 1520px: 228 viewport audits. The build directory supplied the
route inventory only; measurements and screenshots came from the current dev
server, not stale built HTML. The 404 document returned the expected 404 status;
all other routes returned 200. No browser exceptions or page-level horizontal
overflow were recorded. This does not imply every text element fits its own box.

The desktop inventory contains 445 semantic heading elements and 540 paragraph
candidates. The paragraph list deliberately includes some labels, card copy and
ordinary article paragraphs: these must not all be treated as subtitles.

- [Route-by-route and element-by-element inventory](reviews/typography-2026-09-14/inventory.md)
- Full measured styles and geometry: `/tmp/tribera-heading-review/manifest.json`
- Screenshots and readable heading crops: `/tmp/tribera-heading-review/`
- Reproduction: `node scripts/audit-heading-hierarchy.mjs`, then
  `node scripts/summarize-heading-audit.mjs`.

The answer is not a global `h2 { font-size: 36px }`. We need a small set of
role-based sizes, consistently applied, and explicit exceptions for article
subheads, card titles, interface labels and legal documents.

## Findings

### 1. Medium: peer sections use different scales, with an additional mobile root-size split

Home's primary sections, including Experts, render at 48px desktop / 30px mobile.
Workflow and Assurances render at 36px / 26.25px. These smaller values were
introduced during the flow trial; that explains their existence, but does not
establish a durable semantic distinction now that Workflow is standalone again.

Candidate's sections mostly use 48px / 30px, but Expert Conversation falls to
26.25px on mobile. Most standalone marketing pages render their nominally
identical H2 scale at 48px / 32px instead.

Source causes:

- `src/components/home/v58/Home.astro:2683` and the Workflow/Trust overrides near
  lines 2734 and 2800 duplicate/override the section scale.
- `src/components/candidates/Candidates.astro:569` defines the main H2 scale;
  `:1241` separately defines the conversation title.
- `src/components/v58/EditorialPage.astro:48` and
  `src/components/v58/EditorialHeading.astro:24` repeat that scale.
- `src/components/CustomStyles.astro:224` changes `html` to 15px below 640px on
  main-layout pages. Standalone pages retain a 16px root. Thus the same `2rem`
  floor becomes 30px on Home/About/Intelligence and 32px on Services/Contact/
  coverage/career/article pages. It is not an Intelligence-only H2 override bug.

Recommendation: define explicit visual roles and one source for their tokens.
Make peer marketing sections consistent. Do not change the global root size
without checking every rem-based dimension and the previously stabilized nav.
Either reconcile layout roots with regression coverage, or give the content
typography layer calibrated, consistent computed sizes without affecting shell
geometry. Merely copying another rem clamp does not solve the environment split.

### 2. Medium: mobile hierarchy is inverted or nearly flat on several page families

- Candidate H1 is 27.3px at 390px, while most section H2s are 30px.
  `Candidates.astro:1516` supplies a separate mobile hero clamp.
- All seven career-detail pages have 32px H1 and 32px H2 on mobile.
  `src/pages/careers/[slug].astro:11241` supplies the job-title clamp.
- Standalone articles and coverage pages have roughly 33.28px H1 and 32px H2 on
  mobile. At desktop, 53.12px H1 versus 48px H2 is also a very small step.
- The seven articles apply the marketing H2 scale to in-body subheads. For
  example, `why-tech-hiring-really-takes-so-long.astro:6355` defines a smaller
  21-28px article subhead, but the higher-specificity EditorialPage H2 rule wins.
  Its 1.08 leading also replaces the article rule's 1.2.

Three mobile article headings occupy approximately four lines at 32px/1.08:
the privacy/transparency heading in Designing for Trust, the asymmetry heading
in Hiring Is Not a Transaction, and the clarity-before-sourcing heading in
Signal Versus Noise. The problem is hierarchy and tight leading, not a rule that
every heading must be exactly two lines.

Recommendation: make the hero, marketing section, article subsection and card
tiers explicit. Restore a smaller, looser article-body heading style instead of
shrinking all article H2s indiscriminately; related-content and closing-CTA
headings are separate modules. Keep the already smaller legal-document tier.

### 3. Medium: hero and case subtitles become unusually small on mobile

Home's hero and case-study lead, and Candidate's hero lead, render at 12.96px at
390px. Other section leads are 16px and closing CTA leads are 19px. These are
important explanatory paragraphs, not small labels.

Sources: `Home.astro:792` and `Candidates.astro:661` use
`clamp(0.864rem, 1.24vw, 1.024rem)`. Their low floor combines with the 15px root.
Shared EditorialPage subtitles instead use a 16px floor at `:198`.

Recommendation: a 16px mobile floor and roughly 18px desktop standard for true
subtitles, with 1.55-1.65 leading and a readable 55-65ch measure. Check resulting
hero content height against the customer-strip viewport requirement. Do not
apply this to mono kickers, metadata, chart labels, form labels or Services cards
merely because a class contains the word `lead`.

### 4. Medium: Services has conflicting heading/subtitle alignment rules

At 1520px, the Deliverables heading starts around x482.5, its subtitle around
x273, and the card grid around x173. Both report left text alignment, but their
containers have different origins. The heading text also extends outside its
540px box because of `text-wrap: nowrap`.

Source: `src/pages/services.astro:10791` centers `.shead` and its children, while
`EditorialPage.astro:204` applies left-aligned section rules. Local
`services.astro:10803` forces nowrap and only releases it below 559px.

Recommendation: use a single stacked, left-aligned heading/subtitle block for
Deliverables, aligned with its cards, and allow natural wrapping. Keep the
intentional centered closing CTA as an explicit exception. Do not describe the
cropped audit image as proof that text is clipped on the actual page: the
confirmed defect is box overflow and mismatched alignment, not page overflow.

### 5. Low/medium: hero sizes and subtitle variants are not governed by explicit roles

Desktop hero sizes are 53.12px on Home/Candidate/indexes/articles, 58px on career
details, and 62px on About/Contact/Services/Intelligence. The 62px Intelligence
hero spans four lines in its split layout. These values result from different
CSS rules, not different container widths changing a viewport-based font size.

For example, `about.astro:5855` and `contact.astro:407` define a 62px cap while
EditorialPage defines 53.12px. Career details have their own 58px cap. Some of
these may be reasonable design variants, but they should be explicit and tested,
not accidental cascade winners.

The `.trust__dek` subtitle is also outside EditorialPage's shared subtitle
selector: it renders at 20px on About, Contact, and all 20 coverage-detail pages,
beside 16.72px peer subtitles at 1520px. That can be intentional emphasis, but
currently the class name, not a declared role, decides it. Contact also uses two
nearby grey values for equivalent decks, a lower-priority token cleanup.

Recommendation: choose an explicit hero variant only when warranted; default
true subtitles to one role, with named emphasis variants if retained. Do not
solve long headlines by forcing nowrap or by narrowing the Experts title again.

### 6. Low: duplicated typography definitions make future drift likely

Home, Candidate, EditorialPage and EditorialHeading maintain parallel H1/H2
rules. Large standalone page style blocks also retain older heading rules, some
shadowed and some still winning. Centralizing numeric tokens without removing
or reconciling competing declarations would leave the same failure mode.

Recommendation: centralize content typography by role, migrate a template at a
time, then delete only declarations proven redundant. Do not remove large style
blocks wholesale. Heading tags express document structure; differing H3 sizes
for a scorecard, coverage group and process step are not inherently wrong.

## Proposed Scale for a Visual Trial

These are recommendations, not changes made or approved blanket requirements.

| Role                   |            Desktop target |                 Mobile target | Leading / treatment                                  |
| ---------------------- | ------------------------: | ----------------------------: | ---------------------------------------------------- |
| Marketing hero         |     about 52-56px default |                       32-36px | 1.08-1.15; explicit larger variant only if justified |
| Peer marketing section |                      36px |                          28px | about 1.15; natural wrapping                         |
| Article-body subhead   |                   28-32px |                       24-26px | about 1.2                                            |
| Legal-document subhead |   retain current 32px cap | retain current document scale | 1.2                                                  |
| Editorial card title   |                   22-24px |                       20-24px | 1.2-1.3; preserve a gap below its parent heading     |
| Process/UI label       | retain contextual 16-18px |     retain contextual 16-18px | sans/mono as appropriate                             |
| True section subtitle  |                about 18px |                 at least 16px | 1.55-1.65; readable measure                          |
| Supporting statement   |      retain current ~22px |           retain current 18px | current serif/underline treatment                    |

A 36/28 section trial is reasonable given the user's preference for less dominant
titles, but Claude correctly cautions against replacing every H2 with that value.
Document headings, interface headings and editorial cards are not peer marketing
sections. Review the hero/card/subtitle proportions together before rollout.

## Page-by-page Coverage and Order of Work

The inventory lists every route separately, with each heading and subtitle
candidate at all three widths. Shared-template conclusions were checked against
the measurements for every generated sibling, not assumed from a single sample.

1. Home: peer heading scale, small hero/case leads. Keep Experts wide with its
   subtitle below; preserve the small supporting statement and hero strip height.
2. Candidate: restore H1/H2/card hierarchy and hero lead readability; resolve the
   conversation-only mobile size. Preserve demo interactions.
3. About: decide hero variant and trust subtitle role; keep the approved layouts.
4. Services: correct Deliverables alignment/nowrap before any size comparison.
5. Intelligence: review long hero measure and root-driven mobile scale.
6. Contact: hero/subtitle roles; keep form labels and centered CTA exceptions.
7. Careers index and all seven job pages: distinguish job title, section title,
   role cards and scorecard labels; fix mobile H1/H2 parity.
8. Industry and function indexes plus all 20 detail routes: shared section and
   subtitle roles, recheck each route's longest copy after changing the template.
9. Blog index and all seven articles: separate article-body headings from module
   headings; preserve featured-card and normal-card distinctions.
10. All five category and 22 tag pages: preserve hero/card structure; they have no
    peer marketing H2s to reduce. A separate semantic enhancement could use H2
    article-card headings rather than jumping H1 to H3, without changing size.
11. Candidate start, Privacy, Terms, Security and 404: preserve form/document/error
    roles; include them in shared-token regression checks, not a blanket resize.

## Claude Review and Corrections

Claude independently reviewed representative primary pages, articles, and eight
additional page/template examples using the audit data and screenshots/crops.
It did not run browser checks and did not independently inspect all 76 siblings.

Raw reports are preserved alongside corrected responses. This report, not every
raw suggestion, is the final engineering synthesis:

- The first primary report missed the Home 36px overrides, the current full-width
  Experts rule, and the small mobile leads. These assertions were rejected and
  corrected. Its suggestion to narrow Experts would reverse the user's request.
- About's 62px title is caused by a local font-size rule, not container width.
- The article report initially misattributed 30px vs 32px to a shadowed rule;
  the corrected report recognizes the root-size difference and recommends an
  article-specific hierarchy.
- The template report's Intelligence-only override diagnosis is rejected: the
  actual source is the same 15px mobile root used by other main-layout pages.
- The template report's blanket Services pass is superseded by the measured
  x-offsets and the source-confirmed nowrap/centering conflict.
- The template report incorrectly calls all trust decks 16.72px and the job hero
  strictly larger at every size; the measurements show 20px trust decks and
  equal 32px mobile job H1/H2. No such raw claims are used as final findings.
- Do not change semantic heading levels just to match font sizes. H3 serving
  different component roles is not, by itself, a screen-reader defect.

## Verification Limits

Desktop/mobile full-page captures plus desktop detail crops support visual
review; tablet has computed measurements. Some full-page images are too tall to
read at once, so the per-element records and targeted crops are essential.
Heading line counts are approximate. The Home hero's text/decorative overflow
inside its own H1 box is not page overflow and is not a new clipping finding.

Default-page content was audited without submitting forms or changing the site.
This is not an exhaustive modal, hover, animation, zoom, alternate-browser or
open-accordion audit. Hidden dialog headings and shared nav/footer are outside
this content-typography scope. Legal/factual claims and prior release gates are
unchanged. No production build or full functional suite was rerun for this
read-only review; the audit itself completed successfully on all 228 pages.
