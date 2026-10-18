# Full Text Typography Review

## Findings

The previous centralization was incomplete for the user's intended scope. It
covered H1/H2 and recognized subtitles, not the full visible text system. The
remaining local values affect ordinary paragraphs, marketing cards, buttons,
form captions, helper text, data labels and footer text.

1. **Ordinary body copy is inconsistent.** Mobile compact card paragraphs are
   13.5px on Home/Candidate while comparable feature paragraphs remain16px.
   Desktop Home Ways is15.68px, assurance copy14.4px, expert summaries17px;
   Candidate Conversation is16px and Controls14.4px. Important explanatory
   paragraphs should not become compact merely because they sit in a card.
2. **Actions differ even within one page.** Mobile Home/Candidate hero primary
   text is11.76px, Candidate's form button14px, and Services/Contact primary
   buttons12.544px. Home secondary hero link is12px versus14px for its closing
   demo link. Source: Home.astro:818, Candidates.astro:701,
   EditorialPage.astro:295. The mobile root split still affects these rem values.
3. **Form captions and explanatory labels are very small.** Contact's actual
   `.cf__k` caption is9.5px, not the enclosing label's16px. Candidate's form label
   is14px. Contact inputs/placeholders are15.5px versus Candidate16px. Home's
   first-shortlist promise is8.88px mobile; brief-selection label8.7px and
   Importance9px. These are meaningful instructions/context, not decoration.
   Contact source: contact.astro:5243-5254.
4. **Marketing card tiers are not consistently expressed.** Home Ways titles
   are24px desktop versus Assurances17.6px. Candidate Comparison26px,
   Conversation24px, Controls17.6px. Some hierarchy can be intentional, but the
   role must be explicit rather than an unrelated local selector. Home's Trust
   title has two declarations, with the later1.1rem rule winning at:2006.
5. **Footer and quotations need role-based decisions, not blanket resizing.**
   Footer sizes are stable across checked routes: brand14.5px, column labels10px,
   location10.5px. Its small labels are a readability recommendation, not evidence
   of cross-page drift. Home/Candidate testimonials already match at fixed16px.
   Narrative pull quotes are intentionally larger and should remain separate.

## Recommended Next Pass

Define shared computed targets for the whole visible hierarchy, keeping the
existing root sizes, font families, colors, logo and navbar geometry intact.
Use the established content-token approach; copying the same rem values into
variables would preserve the15px/16px-root mismatch.

| Role                            | Proposed target / treatment                                              |
| ------------------------------- | ------------------------------------------------------------------------ |
| Ordinary explanatory paragraphs | 16px; existing18/16 section subtitle role retained                       |
| Genuinely compact helper text   | 14px, explicitly named role                                              |
| Marketing card headings         | 20-24px standard;18-20px only for an explicit subordinate tier           |
| Primary action text             | 16px design trial; recheck button widths/heights and hero fit            |
| Secondary actions               | 14px                                                                     |
| Form labels / inputs            | 14px /16px                                                               |
| Table/data text                 | 14px where readable row content, not display numerals                    |
| Small labels / badges           | 12px target; do not demote essential explanation to tiny metadata        |
| Testimonials                    | Keep fixed16px; narrative pull quotes stay separate                      |
| Footer                          | 12px small labels/location;14-15px compact prose                         |
| Navigation                      | Explicit compact navigation role; preserve current geometry until tested |

These are design proposals, not implemented changes or formal accessibility
compliance thresholds. Work in this order: ordinary body/card content; form
captions and helpers; actions; data labels/tables; footer/navigation last. Extend
regressions to actual visible text descendants, inputs/placeholders, links,
buttons, labels, quotes and footer, including long content and responsive states.
Check computed size/leading/weight, overflow, tap-target geometry, contrast and
load/navigation stability. Do not assert every H3 or every paragraph is one role.

## Evidence and Claude Review

This review made no application CSS or copy changes. Browser measurements came
from the running local development site on port8888, not the old public build.
Eight representative routes were measured at390/1520px: Home, Candidate, About,
Services, Contact, Talent Associate career detail, Engineering/Platform function
detail, and Why Tech Hiring Really Takes So Long. Shared nav/footer appear on
these routes. All16 route/viewport responses were200. Four main pages also have
fresh390/768/1520 heading/subtitle measurements and screenshots.

Artifacts: `/tmp/tribera-type-recheck/manifest.json`, `all-text.json`, screenshots
and review packets. The broad text extraction includes nested/repeated text;
semantic classification and actual descendant styles were checked manually.

Claude reviewed the representative screenshots, measurements and source excerpts,
then issued a [corrected full-text recommendation](reviews/typography-2026-09-14/claude-full-text-corrected.md).
Its initial recommendation to preserve the current rem values was rejected:
source equality is not computed-size equality across the two root contexts.
Other corrections: the visible Contact caption is9.5px; the proposed Benefits H3
edit targeted an unused selector (the actual nested titles are H4 at18.4px).
Do not adopt that dormant-rule edit as a visual fix.

The corrected raw report misnames the route scope as including Footer/global
instead of the function-detail route; the list above is authoritative. Its
measurements were supplied from our browser run, not independently browser-tested
by Claude. This is not exhaustive verification of all76 routes, all UI states,
alternate browsers or zoom settings. A full rollout still needs per-route checks.
