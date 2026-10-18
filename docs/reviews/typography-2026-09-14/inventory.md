# Heading and Subtitle Inventory

Generated from the current local implementation, not the older production build. The build supplies only the route list.
Every route was measured at 390, 768 and 1520px. Values are CSS pixels; line counts are approximate line-box estimates.
This is the per-element evidence appendix, not an assertion that every paragraph candidate is a subtitle or every difference is a defect.
Visible semantic heading candidates exclude navigation/footer/dialogs. Subtitle candidates include adjacent body paragraphs, metadata and card copy; classify by role before editing.
Default page state only; clipped/collapsible descendants can still have DOM boxes. No form submissions or third-party requests were made.
Screenshots and detail crops: /tmp/tribera-heading-review. Independent review scope and corrections are documented in ../../heading-subtitle-review-2026-09-14.md.

| # | Route | Desktop H1 / H2 sizes | Mobile H1 / H2 sizes | Review disposition |
|---|---|---|---|---|
| 1 | / | H1 53.12; H2 48,36 | H1 31.2; H2 30,26.25 | Home: mixed 36/48px peer sections, 12.96px mobile hero/funnel leads; preserve widened experts heading, hero height and small closing statement. |
| 2 | /404.html | H1 53.12; H2 - | H1 31.2; H2 - | Error page: intentional single hero/title; no peer section headings to normalize. HTTP404 expected. |
| 3 | /about/ | H1 62; H2 48 | H1 36; H2 30 | About: 62px hero differs from 53.12px base; trust subtitle 20px differs from other 16.72px decks. Section H2s are internally consistent. |
| 4 | /blog/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Blog index: section H2 vs hero hierarchy needs the marketing-scale decision; featured/article card titles are distinct roles. |
| 5 | /blog/designing-ai-for-high-stakes-technical-assessment/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Article: restore article-body subhead tier and looser leading; distinguish body, related module, and closing CTA. |
| 6 | /blog/designing-for-trust-privacy-transparency-respect/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Article: restore article-body subhead tier and looser leading; distinguish body, related module, and closing CTA. |
| 7 | /blog/hiring-is-not-a-transaction-its-a-relationship/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Article: restore article-body subhead tier and looser leading; distinguish body, related module, and closing CTA. |
| 8 | /blog/rethinking-hiring-metrics-signal-efficiency/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Article: restore article-body subhead tier and looser leading; distinguish body, related module, and closing CTA. |
| 9 | /blog/signal-vs-noise-technical-hiring/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Article: restore article-body subhead tier and looser leading; distinguish body, related module, and closing CTA. |
| 10 | /blog/when-job-hunting-feels-like-a-black-hole/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Article: restore article-body subhead tier and looser leading; distinguish body, related module, and closing CTA. |
| 11 | /blog/why-tech-hiring-really-takes-so-long/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Article: restore article-body subhead tier and looser leading; distinguish body, related module, and closing CTA. |
| 12 | /candidates/ | H1 53.12; H2 48 | H1 27.3; H2 30,26.25 | Candidate: mobile hero 27.3px below most section H2s at 30px; conversation 26.25px; hero lead 12.96px; preserve card/section separation. |
| 13 | /candidates/start/ | H1 53.12; H2 48 | H1 31.2; H2 30 | Candidate form: section30 vs hero31.2 mobile; retain form heading/field label hierarchy and do not restyle form copy as subtitle. |
| 14 | /careers/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Careers index: 48px marketing section H2 vs 53.12px hero; mobile32 vs33.28. Retain 19px role-card titles as a different role. |
| 15 | /careers/ai-ml-engineer/ | H1 58; H2 48 | H1 32; H2 32 | Career detail: mobile H1 and H2 both 32px; restore role hierarchy through the shared template, retain scorecard labels. |
| 16 | /careers/backend-engineer/ | H1 58; H2 48 | H1 32; H2 32 | Career detail: mobile H1 and H2 both 32px; restore role hierarchy through the shared template, retain scorecard labels. |
| 17 | /careers/growth-intern/ | H1 58; H2 48 | H1 32; H2 32 | Career detail: mobile H1 and H2 both 32px; restore role hierarchy through the shared template, retain scorecard labels. |
| 18 | /careers/senior-delivery-partner/ | H1 58; H2 48 | H1 32; H2 32 | Career detail: mobile H1 and H2 both 32px; restore role hierarchy through the shared template, retain scorecard labels. |
| 19 | /careers/software-intern/ | H1 58; H2 48 | H1 32; H2 32 | Career detail: mobile H1 and H2 both 32px; restore role hierarchy through the shared template, retain scorecard labels. |
| 20 | /careers/talent-advisor/ | H1 58; H2 48 | H1 32; H2 32 | Career detail: mobile H1 and H2 both 32px; restore role hierarchy through the shared template, retain scorecard labels. |
| 21 | /careers/talent-associate/ | H1 58; H2 48 | H1 32; H2 32 | Career detail: mobile H1 and H2 both 32px; restore role hierarchy through the shared template, retain scorecard labels. |
| 22 | /category/ai-and-assessment/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 23 | /category/candidate-experience/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 24 | /category/hiring-philosophy/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 25 | /category/hiring-strategy/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 26 | /category/technical-hiring/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 27 | /contact/ | H1 62; H2 48 | H1 36; H2 32 | Contact: 62px hero and 20px FAQ subtitle are distinct local variants. Preserve form labels and named-person card typography. |
| 28 | /functions/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Function index: same near-equal hero/section hierarchy; preserve taxonomy/card labels. |
| 29 | /functions/data-analytics/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review. |
| 30 | /functions/engineering-platform/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review. |
| 31 | /functions/finance-risk/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review. |
| 32 | /functions/infrastructure-sre/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review. |
| 33 | /functions/leadership/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review. |
| 34 | /functions/operations/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review. |
| 35 | /functions/product-design/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review. |
| 36 | /functions/security/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review. |
| 37 | /industries/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Industry index: same near-equal hero/section hierarchy; preserve taxonomy/card labels. |
| 38 | /industries/ai-data/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review. |
| 39 | /industries/banking-financial-services/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review. |
| 40 | /industries/consumer-digital-commerce/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review. |
| 41 | /industries/cybersecurity/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review. |
| 42 | /industries/enterprise-technology/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review. |
| 43 | /industries/global-capability-centres/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review. |
| 44 | /industries/healthcare-life-sciences/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review. |
| 45 | /industries/industrial-engineering/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review. |
| 46 | /industries/manufacturing/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review. |
| 47 | /industries/pharmaceutical/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review. |
| 48 | /industries/private-equity-portfolio/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review. |
| 49 | /industries/product-saas/ | H1 53.12; H2 48 | H1 33.28; H2 32 | Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review. |
| 50 | /intelligence/ | H1 62; H2 48 | H1 36; H2 30 | Intelligence: 62px four-line desktop hero; root-size drift accounts for 30px mobile H2. Review hierarchy/measure, not an invented local H2 override. |
| 51 | /privacy/ | H1 53.12; H2 32 | H1 31.2; H2 22.5 | Legal document: retain smaller document subheads; do not apply marketing H2 globally. |
| 52 | /security/ | H1 53.12; H2 32 | H1 31.2; H2 22.5 | Legal document: retain smaller document subheads; do not apply marketing H2 globally. |
| 53 | /services/ | H1 62; H2 48 | H1 36; H2 32 | Services: deliverables heading and subtitle have different left edges and conflicting centering/nowrap rules. Card .lead paragraphs are not section subtitles. |
| 54 | /tag/ai-in-hiring/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 55 | /tag/candidate-experience/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 56 | /tag/decision-infrastructure/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 57 | /tag/empathy/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 58 | /tag/engineering/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 59 | /tag/hiring-insights/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 60 | /tag/hiring-metrics/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 61 | /tag/human-first-hiring/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 62 | /tag/job-search-tips/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 63 | /tag/platform-design/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 64 | /tag/privacy-by-design/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 65 | /tag/professional-respect/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 66 | /tag/quality-of-hire/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 67 | /tag/recruitment/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 68 | /tag/signal-based-hiring/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 69 | /tag/structured-evaluation/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 70 | /tag/talent-acquisition/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 71 | /tag/technical-assessment/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 72 | /tag/technical-hiring/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 73 | /tag/thought-leadership/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 74 | /tag/time-to-hire/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 75 | /tag/trust-in-hiring/ | H1 53.12; H2 - | H1 31.2; H2 - | Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here. |
| 76 | /terms/ | H1 53.12; H2 32 | H1 31.2; H2 22.5 | Legal document: retain smaller document subheads; do not apply marketing H2 globally. |

## 1. /

Home: mixed 36/48px peer sections, 12.96px mobile hero/funnel leads; preserve widened experts heading, hero height and small closing statement.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Three candidates.Every one worth the interview. (#top #v58-home-title) | 31.2 / 33.696px / 3 | 34.41 / 37.1589px / 3 | 53.12 / 57.3696px / 2 | Fraunces, Georgia, serif / 500 / center |
| H2 We don't send you people. We send you the three. (#what h2) | 30 / 32.4px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / start |
| H2 Move the bar. Watch the verdict move. (#proof h2) | 30 / 32.4px / 2 | 32 / 34.56px / 3 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / start |
| H3 Your priorities (#proof h3.v58-priorities-title) | 10 / 15px / 1 | 10 / 15px / 1 | 10 / 15px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 500 / start |
| H3 Every score points to the exact line behind it. (#proof h3) | 16 / 23.2px / 1 | 16 / 23.2px / 2 | 16 / 23.2px / 1 | "Inter Tight", -apple-system, sans-serif / 600 / start |
| H3 We name what we didn't test. (#proof h3) | 16 / 23.2px / 1 | 16 / 23.2px / 1 | 16 / 23.2px / 1 | "Inter Tight", -apple-system, sans-serif / 600 / start |
| H3 Resume claims checked against the evidence. (#proof h3) | 16 / 23.2px / 1 | 16 / 23.2px / 2 | 16 / 23.2px / 1 | "Inter Tight", -apple-system, sans-serif / 600 / start |
| H2 You set the bar.We do the work to it. (#work h2) | 26.25 / 28.35px / 2 | 28 / 30.24px / 2 | 36 / 38.88px / 2 | Fraunces, Georgia, serif / 500 / start |
| H3 Set the bar (article h3) | 16 / 20.8px / 1 | 16 / 20.8px / 1 | 16 / 20.8px / 1 | "Inter Tight", -apple-system, sans-serif / 600 / start |
| H3 Find & check (article h3) | 16 / 20.8px / 1 | 16 / 20.8px / 1 | 16 / 20.8px / 1 | "Inter Tight", -apple-system, sans-serif / 600 / start |
| H3 Interview (article h3) | 16 / 20.8px / 1 | 16 / 20.8px / 1 | 16 / 20.8px / 1 | "Inter Tight", -apple-system, sans-serif / 600 / start |
| H3 Share the shortlist (article h3) | 16 / 20.8px / 1 | 16 / 20.8px / 1 | 16 / 20.8px / 1 | "Inter Tight", -apple-system, sans-serif / 600 / start |
| H3 Decide (article h3) | 16 / 20.8px / 1 | 16 / 20.8px / 1 | 16 / 20.8px / 1 | "Inter Tight", -apple-system, sans-serif / 600 / start |
| H2 Senior experts who've done the job — held to one bar: the one you set. (#experts h2) | 30 / 32.4px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / start |
| H3 Engineering & infrastructure (#experts h3) | 24 / 28.8px / 1 | 24 / 28.8px / 2 | 28 / 33.6px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Finance & risk (#experts h3) | 24 / 28.8px / 1 | 24 / 28.8px / 1 | 28 / 33.6px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Operations (#experts h3) | 24 / 28.8px / 1 | 24 / 28.8px / 1 | 28 / 33.6px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Product & leadership (#experts h3) | 24 / 28.8px / 1 | 24 / 28.8px / 1 | 28 / 33.6px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 Nobody shows you the funnel. (#funnel h2) | 30 / 32.4px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Less screening for your team. (#funnel #v58-benefits-title) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 24 / 28.8px / 1 | Fraunces, Georgia, serif / 500 / start |
| H4 Interviews that count (article h4) | 17.25 / 22.425px / 1 | 18.4 / 23.92px / 1 | 18.4 / 23.92px / 1 | Fraunces, Georgia, serif / 500 / start |
| H4 Less duplicated work (article h4) | 17.25 / 22.425px / 1 | 18.4 / 23.92px / 1 | 18.4 / 23.92px / 1 | Fraunces, Georgia, serif / 500 / start |
| H4 We handle the follow-through (article h4) | 17.25 / 22.425px / 1 | 18.4 / 23.92px / 2 | 18.4 / 23.92px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 Either way, three worth the interview. (#ways h2) | 30 / 32.4px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 We find them (article h3) | 22.5 / 30.375px / 1 | 24 / 38.4px / 1 | 24 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 You've sourced them (article h3) | 22.5 / 30.375px / 1 | 24 / 38.4px / 1 | 24 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 Clear criteria. Clear responsibilities. (#trust h2) | 26.25 / 28.35px / 2 | 28 / 30.24px / 1 | 36 / 38.88px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 A human-reviewed shortlist. (article h3) | 16.5 / 22.275px / 1 | 17.6 / 28.16px / 1 | 17.6 / 28.16px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Evidence alongside the score. (article h3) | 16.5 / 22.275px / 1 | 17.6 / 28.16px / 1 | 17.6 / 28.16px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Criteria agreed for the role. (article h3) | 16.5 / 22.275px / 1 | 17.6 / 28.16px / 1 | 17.6 / 28.16px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Clear data-handling terms. (article h3) | 16.5 / 22.275px / 1 | 17.6 / 28.16px / 1 | 17.6 / 28.16px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 What teams and candidates say. (#results #v58-results-title) | 30 / 32.4px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / start |
| H2 Give us the role you're stuck on. (#start h2) | 30 / 32.4px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P \ A shortlist worth your time (#top p.v58-kicker) | 8.4 / 13.44px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / center |
| P Every role has a bar — what “good” looks like for it. We find the candidates (or interview yours), hold each to that bar, and send you the three who clear it, each with the proof. (#top p.v58-lead) | 12.96 / 19.44px / 3 | 13.82 / 20.736px / 3 | 16.38 / 24.576px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P First shortlist in 36 hours (#top p.v58-micro) | 8.88 / 14.208px / 1 | 9.47 / 15.1552px / 1 | 9.47 / 15.1552px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / center |
| P We source and assess candidates, or assess the pipeline you already have. Every interview follows your hiring manager's bar. Our recruitment shortlist brings you three worth meeting, each with the proof behind the score. Your team stops screening and starts choosing. (#what p.v58-thesis__body) | 15.3 / 24.48px / 6 | 16.32 / 26.112px / 3 | 18.56 / 29.696px / 5 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P One real candidate, scored on nine things — and his scores never move. What you set is how much each one counts. Weight it one way and he clears your bar; weight it another and he doesn't. (#proof p.v58-lead) | 16 / 24.8px / 5 | 16 / 24.8px / 3 | 16.72 / 25.916px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Set your priorities and the verdict follows — same person, a different bar. (#proof p.v58-lead.v58-proof-intro__action) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Evidence you can review. (#proof p) | 14.4 / 21.6px / 1 | 14.4 / 21.6px / 1 | 14.4 / 21.6px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P So your own round knows exactly where to look. (#proof p) | 14.4 / 21.6px / 1 | 14.4 / 21.6px / 2 | 14.4 / 21.6px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Experience, skills and the work behind each claim. (#proof p) | 14.4 / 21.6px / 1 | 14.4 / 21.6px / 2 | 14.4 / 21.6px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P One call defines what good looks like. We handle assessment; your team makes the hiring decision. (#work p.v58-lead) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Your hiring manager. One call per role. (article p) | 14 / 20.3px / 1 | 14 / 20.3px / 1 | 14 / 20.3px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P We source candidates, or start with your pipeline. Then we check the experience behind their claims. (article p) | 14 / 20.3px / 3 | 14 / 20.3px / 2 | 14 / 20.3px / 5 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P A senior advisor who has held the role. Scored to your bar. (article p) | 14 / 20.3px / 2 | 14 / 20.3px / 1 | 14 / 20.3px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Recruitment: three with the proof. Your pipeline: one ranked list. (article p) | 14 / 20.3px / 2 | 14 / 20.3px / 1 | 14 / 20.3px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Your team interviews the shortlist. The hire is your call. (article p) | 14 / 20.3px / 2 | 14 / 20.3px / 1 | 14 / 20.3px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P An expert matched to your role probes practical depth, with questions shaped by your brief and the candidate's experience. (#experts p.v58-lead) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P System design and scale, pipelines and modelling, incidents and reliability, threat models and response, model design and evaluation, routing and fabric. (#experts p.v58-coverage__focus) | 17 / 28.05px / 4 | 17 / 28.05px / 4 | 17 / 28.05px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Controls and transformation, audits and exposure, risk and the trade lifecycle. (#experts p.v58-coverage__focus) | 17 / 28.05px / 2 | 17 / 28.05px / 2 | 17 / 28.05px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Planning and cost in supply chain and manufacturing. (#experts p.v58-coverage__focus) | 17 / 28.05px / 2 | 17 / 28.05px / 2 | 17 / 28.05px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Product judgment, design craft and technology leadership. (#experts p.v58-coverage__focus) | 17 / 28.05px / 2 | 17 / 28.05px / 2 | 17 / 28.05px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P A backend role in Bengaluru, open nine months without a hire. We took the same requirement back to market. (#funnel p.v58-lead) | 12.96 / 19.44px / 2 | 13.82 / 20.736px / 2 | 16.38 / 24.576px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Your managers meet candidates who have already cleared the agreed bar. (article p) | 13.5 / 20.25px / 2 | 14.4 / 21.6px / 3 | 14.4 / 21.6px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Screening and assessment happen before your team spends interview time. (article p) | 13.5 / 20.25px / 2 | 14.4 / 21.6px / 3 | 14.4 / 21.6px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P We manage sourcing, checking and assessment coordination. (article p) | 13.5 / 20.25px / 2 | 14.4 / 21.6px / 2 | 14.4 / 21.6px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Give us a role, or a whole function. We source the market, vet every candidate, and interview against your bar — then submit only who clears it. (article p) | 14.7 / 22.05px / 4 | 15.68 / 23.52px / 2 | 15.68 / 23.52px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Bring your own pipeline — your team, your agencies, your boards. We interview and score every candidate against your bar, and hand back one ranked list. (article p) | 14.7 / 22.05px / 4 | 15.68 / 23.52px / 2 | 15.68 / 23.52px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P \ Before we start (#trust p.v58-kicker) | 8.4 / 13.44px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P Our team reviews interview evidence against the agreed role requirements before sending candidates to you. (article p) | 13.5 / 20.25px / 3 | 14.4 / 21.6px / 3 | 14.4 / 21.6px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Interview answers support the assessment, with areas for your team to probe in its own conversations. (article p) | 13.5 / 20.25px / 3 | 14.4 / 21.6px / 3 | 14.4 / 21.6px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Your hiring manager sets the skills and experience the assessment should focus on. (article p) | 13.5 / 20.25px / 2 | 14.4 / 21.6px / 2 | 14.4 / 21.6px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Discuss recording, access, retention and deletion requirements with us before the engagement. (article p) | 13.5 / 20.25px / 2 | 14.4 / 21.6px / 3 | 14.4 / 21.6px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P \ In their words (#results p.v58-kicker) | 8.4 / 13.44px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P Bring one live role and the hiring manager who owns it. We agree the bar and get to work. Your first shortlist arrives within 36 hours. (#start p.v58-lead) | 19 / 30.4px / 4 | 19 / 30.4px / 3 | 19 / 30.4px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 2. /404.html

Error page: intentional single hero/title; no peer section headings to normalize. HTTP404 expected.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 This page isn't here.Let's find your next step. (section.v58-section.v58-section--paper #missing-title) | 31.2 / 33.696px / 3 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Looking for help with a role, or your next opportunity? Start here. (section.v58-section.v58-section--paper p) | 18 / 27.9px / 2 | 18 / 27.9px / 2 | 18 / 27.9px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 3. /about/

About: 62px hero differs from 53.12px base; trust subtitle 20px differs from other 16.72px decks. Section H2s are internally consistent.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 This industry gave us everything. (#top h1.h1.in) | 36 / 38.88px / 2 | 36 / 38.88px / 2 | 62 / 66.96px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 The question nobody had a column for. (#story h2.h2.in) | 30 / 32.4px / 2 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 More reach.Less signal. (#whynow h2.h2.in) | 30 / 32.4px / 2 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Built by people who were in the room. (#team h2.h2) | 30 / 32.4px / 2 | not present | not present | Fraunces, Georgia, serif / 500 / left |
| H2 We spent a year not launching. (#year h2.h2) | 30 / 32.4px / 2 | 32 / 34.56px / 2 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Four things, and we argue about the rest. (#believe h2.h2.in) | 30 / 32.4px / 2 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Tribe, and era. (#name h2.h2) | 30 / 32.4px / 1 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 The plain facts. (#facts h2.h2.in) | 30 / 32.4px / 1 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Four things we are trying to make true in five years. (#ahead h2.h2.in) | 30 / 32.4px / 3 | 32 / 34.56px / 3 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Two doors. Same room. (#contact h2.h2.in) | 30 / 32.4px / 2 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / start |
| H2 Built by people who were in the room. (#team h2.h2.in) | not present | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Two doors. Same room. (#contact h2.h2) | not present | 32 / 34.56px / 2 | not present | Fraunces, Georgia, serif / 500 / start |
| H2 We spent a year not launching. (#year h2.h2.in) | not present | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Tribe, and era. (#name h2.h2.in) | not present | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P About tribera (#top p.eyebrow.eyebrow--red.in) | 12 / 19.2px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P Twenty years each. Sixty between us: the mandates, the misses, the hires that worked and the ones that quietly didn’t. tribera is how we give some of it back. (#top p.hero__p.in) | 16 / 24.8px / 4 | 16 / 24.8px / 3 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P It’s also why we spent a year reading two hundred thousand interviews before letting anyone outside the three of us use it. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P June 2024 → May 2025 · twelve months (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P Akshata spent years watching capable teams run sensible processes and still get it wrong. Not on credentials, those were nearly always fine. (#story p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Reaching a candidate has become easier. Deciding who will belong has not. Those two things are connected, and the industry has not yet said so out loud. (#whynow p.fn__dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Not observers of this industry. We ran the searches, made the calls, and carried the ones that went wrong. (#team p.dek) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The obvious move was to ship something small and learn in public. We did the opposite, because the thing being tested was whether a stranger’s judgment could be trusted with someone’s career, and you can’t iterate your way through that in front of real candidates. (#year p.fn__dek) | 16 / 24.8px / 6 | 16 / 24.8px / 4 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P These are not values on a wall. Each one cost us something to hold: a shortcut we could have taken, a number that would have looked better. (#believe p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tribe is the group you are actually part of. Era is the stretch of time you spend building something in it. Belong, then build, then become. The order is the argument. (#name p.trust__dek) | 16 / 25.6px / 4 | 16 / 25.6px / 3 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Everything above is a story. This is the part you can check. (#facts p.dek.in) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Not a roadmap. Four claims we want others to be able to make about us, and hold us to. (#ahead p.fn__dek.in) | 16 / 24.8px / 2 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P You’re hiring, or you’re looking. The whole job is putting the two who should be in a conversation into one. (#contact p.dek.in) | 16 / 24.8px / 3 | not present | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Not observers of this industry. We ran the searches, made the calls, and carried the ones that went wrong. (#team p.dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P You’re hiring, or you’re looking. The whole job is putting the two who should be in a conversation into one. (#contact p.dek) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P The obvious move was to ship something small and learn in public. We did the opposite, because the thing being tested was whether a stranger’s judgment could be trusted with someone’s career, and you can’t iterate your way through that in front of real candidates. (#year p.fn__dek.in) | not present | not present | 16.72 / 25.916px / 4 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tribe is the group you are actually part of. Era is the stretch of time you spend building something in it. Belong, then build, then become. The order is the argument. (#name p.trust__dek.in) | not present | not present | 20 / 32px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / left |


## 4. /blog/

Blog index: section H2 vs hero hierarchy needs the marketing-scale decision; featured/article card titles are distinct roles.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Notes from the work.Not another hiring playbook. (#top h1.h1.in) | 33.28 / 35.9424px / 3 | 34.41 / 37.1589px / 3 | 53.12 / 57.3696px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 We publish when we have something to say. (#all h2.h2.in) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Two doors. Same room. (#contact h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 2 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Two doors. Same room. (#contact h2.h2) | not present | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Field notes (#top p.eyebrow.in) | 12 / 19.2px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P We score every interview we run and keep the record for a defined period. These are the patterns that turned up often enough to be worth writing about: on hiring, on the people being hired, and on what a machine can and can’t read. (#top p.hero__p.in) | 16 / 24.8px / 6 | 16 / 24.8px / 4 | 16.72 / 25.916px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P No thought leadership. Things we got wrong, numbers we can show, and the occasional argument. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Latest (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P Not a content calendar.Most of these came out of a mandate that taught us something we didn’t already know. (#all p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Reading is one thing.If you have a role you’re stuck on, or you’re the one being interviewed, both of those start the same way. (#contact p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 4 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Reading is one thing.If you have a role you’re stuck on, or you’re the one being interviewed, both of those start the same way. (#contact p.dek) | not present | not present | 16.72 / 25.916px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / left |


## 5. /blog/designing-ai-for-high-stakes-technical-assessment/

Article: restore article-body subhead tier and looser leading; distinguish body, related module, and closing CTA.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Designing AI for high-stakes assessment (#top h1) | 33.28 / 35.9424px / 3 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 2 | Fraunces, Georgia, serif / 500 / start |
| H2 Three things we let the engine do (article.art h2) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / start |
| H2 One thing we will not let it do (article.art h2) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / start |
| H2 What we got wrong first (article.art h2) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / start |
| H2 Explainability is not a feature (article.art h2) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / start |
| H2 Three more that came out of real mandates. (#related h2.h2) | 32 / 34.56px / 2 | not present | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Two doors. Same room. (#contact h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |
| H2 Three more that came out of real mandates. (#related h2.h2.in) | not present | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P A model can read a transcript. It cannot tell you whether the person meant it. (#top p.ahead__sub) | 17 / 24.65px / 2 | 17 / 24.65px / 2 | 22 / 31.9px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Read the profile. A hundred-plus signals before anyone picks up a phone — what a CV describes versus what it implies, tenure patterns, the difference between a title and a scope. This is pattern work at volume and a machine is simply better at it. (article.art p) | 16.5 / 28.38px / 6 | 16.5 / 28.38px / 3 | 17.48 / 30.0656px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P It cannot reject anyone. Not as a policy we might revisit — as a property of how the thing is built. The engine surfaces and explains; a person reads the transcript and writes the verdict; you make the call. There is no path through the system where a candidate is removed without a human having read why. (article.art p) | 16.5 / 28.38px / 7 | 16.5 / 28.38px / 4 | 17.48 / 30.0656px / 4 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Our earliest version scored candidates against a general bar — a good backend engineer, in the abstract. It worked, in the sense that the rankings were sensible and defensible. (article.art p) | 16.5 / 28.38px / 4 | 16.5 / 28.38px / 3 | 17.48 / 30.0656px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Every score carries the rubric, the evidence and the transcript line it came from. Partly because a hiring manager who cannot see the reasoning will not trust the number, and partly because a candidate who is ranked third deserves to know on what basis. (article.art p) | 16.5 / 28.38px / 6 | 16.5 / 28.38px / 3 | 17.48 / 30.0656px / 4 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Or go back to everything we’ve published. (#related p.dek) | 16 / 24.8px / 1 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P If you have a role you’re stuck on, or you’re the one being interviewed, both of those start the same way. (#contact p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Or go back to everything we’ve published. (#related p.dek.in) | not present | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |


## 6. /blog/designing-for-trust-privacy-transparency-respect/

Article: restore article-body subhead tier and looser leading; distinguish body, related module, and closing CTA.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Designing for trust (#top h1) | 33.28 / 35.9424px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 What quietly has to mean (article.art h2) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / start |
| H2 The thing we had backwards (article.art h2) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / start |
| H2 Privacy without transparency is just a black box (article.art h2) | 32 / 34.56px / 4 | 32 / 34.56px / 3 | 48 / 51.84px / 4 | Fraunces, Georgia, serif / 500 / start |
| H2 We check the company too (article.art h2) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / start |
| H2 Why any of this is worth the engineering (article.art h2) | 32 / 34.56px / 3 | 32 / 34.56px / 3 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / start |
| H2 Three more that came out of real mandates. (#related h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Two doors. Same room. (#contact h2.h2) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |
| H2 Three more that came out of real mandates. (#related h2.h2) | not present | 32 / 34.56px / 2 | not present | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Most people looking for a job already have one. Everything we built follows from that, including the thing we got wrong for a year. (#top p.ahead__sub) | 17 / 24.65px / 3 | 17 / 24.65px / 3 | 22 / 31.9px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Not searchable. Your profile does not appear in a directory, a feed, or a recruiter’s saved search. There is no version of this where someone stumbles across you. (article.art p) | 16.5 / 28.38px / 4 | 16.5 / 28.38px / 2 | 17.48 / 30.0656px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P We built the privacy controls first and made them opt-in. Sensible-looking: give people the switches, let them decide. A settings page with four toggles, all off by default, clearly explained. (article.art p) | 16.5 / 28.38px / 5 | 16.5 / 28.38px / 3 | 17.48 / 30.0656px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P The other half of trust is harder, and most platforms skip it: if we are going to score you, you have to be able to see the score. (article.art p) | 16.5 / 28.38px / 3 | 16.5 / 28.38px / 2 | 17.48 / 30.0656px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Every job board asks a candidate to prove themselves to a company that has proved nothing to anyone. Before a request reaches you, the team on the other end has to clear its own checks: is the headcount actually funded, how many rounds, how fast do they decide, how long has the manager been in post, and did the last few people they hired stay. (article.art p) | 16.5 / 28.38px / 8 | 16.5 / 28.38px / 5 | 17.48 / 30.0656px / 5 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Because the cost of getting it wrong is not ours. A candidate whose employer finds out they were looking does not lose a feature. They lose standing, a project, sometimes a job — and they lose it because of a system they trusted for about a week. (article.art p) | 16.5 / 28.38px / 6 | 16.5 / 28.38px / 3 | 17.48 / 30.0656px / 4 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Or go back to everything we’ve published. (#related p.dek.in) | 16 / 24.8px / 1 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P If you have a role you’re stuck on, or you’re the one being interviewed, both of those start the same way. (#contact p.dek) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Or go back to everything we’ve published. (#related p.dek) | not present | 16 / 24.8px / 1 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |


## 7. /blog/hiring-is-not-a-transaction-its-a-relationship/

Article: restore article-body subhead tier and looser leading; distinguish body, related module, and closing CTA.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Hiring is not a transaction (#top h1) | 33.28 / 35.9424px / 2 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 The asymmetry is not just unfair — it is inaccurate (article.art h2) | 32 / 34.56px / 4 | 32 / 34.56px / 3 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / start |
| H2 So we check the company too (article.art h2) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / start |
| H2 What this changes on the buying side (article.art h2) | 32 / 34.56px / 3 | 32 / 34.56px / 3 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / start |
| H2 Three more that came out of real mandates. (#related h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Two doors. Same room. (#contact h2.h2) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Both sides are choosing. Only one side usually behaves as though that’s true. (#top p.ahead__sub) | 17 / 24.65px / 2 | 17 / 24.65px / 2 | 22 / 31.9px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P If you only assess one side, you can only predict one side. Everything that actually determines whether someone stays sits on the other one: how that manager makes decisions, what the team rewards, whether the work in the job description is the work anyone does. (article.art p) | 16.5 / 28.38px / 7 | 16.5 / 28.38px / 4 | 17.48 / 30.0656px / 4 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Before a request reaches a candidate, the team on the other end clears its own set of checks. Is the headcount funded. How many rounds, actually. How fast do they decide after the final interview. How long has the manager been in post. Did the last few people hired through us stay. (article.art p) | 16.5 / 28.38px / 7 | 16.5 / 28.38px / 4 | 17.48 / 30.0656px / 4 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P It sounds like a candidate feature and it is mostly a client one. Teams that clear the checks get better response rates, because the people we approach have been told something true about them. Teams that do not clear get told which check failed, which is occasionally an unwelcome conversation and has more than once changed something before the search even started. (article.art p) | 16.5 / 28.38px / 9 | 16.5 / 28.38px / 5 | 17.48 / 30.0656px / 5 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Or go back to everything we’ve published. (#related p.dek.in) | 16 / 24.8px / 1 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P If you have a role you’re stuck on, or you’re the one being interviewed, both of those start the same way. (#contact p.dek) | 16 / 24.8px / 3 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P If you have a role you’re stuck on, or you’re the one being interviewed, both of those start the same way. (#contact p.dek.in) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 8. /blog/rethinking-hiring-metrics-signal-efficiency/

Article: restore article-body subhead tier and looser leading; distinguish body, related module, and closing CTA.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Rethinking hiring metrics (#top h1) | 33.28 / 35.9424px / 2 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 The quietest number on the dashboard (article.art h2) | 32 / 34.56px / 3 | 32 / 34.56px / 3 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / start |
| H2 What we had backwards (article.art h2) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / start |
| H2 Where three comes from (article.art h2) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / start |
| H2 What to do with it on Monday (article.art h2) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / start |
| H2 Three more that came out of real mandates. (#related h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 2 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Two doors. Same room. (#contact h2.h2) | 32 / 34.56px / 2 | not present | not present | Fraunces, Georgia, serif / 500 / center |
| H2 Two doors. Same room. (#contact h2.h2.in) | not present | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |
| H2 Three more that came out of real mandates. (#related h2.h2) | not present | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P What 200,000 interviews taught us about signal efficiency. And the thing we had backwards for two years. (#top p.ahead__sub) | 17 / 24.65px / 3 | 17 / 24.65px / 2 | 22 / 31.9px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Interview-to-hire ratio counts how many people your team had to meet before one of them was right. It is usually buried three tabs deep in an ATS report, and it is the most honest figure in there, because it is the only one that cannot be improved by working harder. (article.art p) | 16.5 / 28.38px / 7 | 16.5 / 28.38px / 4 | 17.48 / 30.0656px / 4 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P For the first two years we read a poor ratio as a candidate-quality problem. If a team was meeting nine people to hire one, the obvious reading was that six of those nine should never have been on the list, and the fix was better screening. (article.art p) | 16.5 / 28.38px / 6 | 16.5 / 28.38px / 3 | 17.48 / 30.0656px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Across the searches we run, three interviews per hire is roughly where a calibrated process settles. Not because three is a magic number, but because that is what happens when the bar is fixed in advance and everyone in the loop is reading the same one. (article.art p) | 16.5 / 28.38px / 6 | 16.5 / 28.38px / 3 | 17.48 / 30.0656px / 4 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Three things, in the order of how little they cost. (article.art p) | 16.5 / 28.38px / 2 | 16.5 / 28.38px / 1 | 17.48 / 30.0656px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Or go back to everything we’ve published. (#related p.dek.in) | 16 / 24.8px / 1 | 16 / 24.8px / 1 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P If you have a role you’re stuck on, or you’re the one being interviewed, both of those start the same way. (#contact p.dek) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P If you have a role you’re stuck on, or you’re the one being interviewed, both of those start the same way. (#contact p.dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Or go back to everything we’ve published. (#related p.dek) | not present | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |


## 9. /blog/signal-vs-noise-technical-hiring/

Article: restore article-body subhead tier and looser leading; distinguish body, related module, and closing CTA.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Signal versus noise (#top h1) | 33.28 / 35.9424px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 Noise is expensive at the wrong end (article.art h2) | 32 / 34.56px / 3 | 32 / 34.56px / 3 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / start |
| H2 Clarity has to happen before sourcing, not after (article.art h2) | 32 / 34.56px / 4 | 32 / 34.56px / 3 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / start |
| H2 Three more that came out of real mandates. (#related h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Two doors. Same room. (#contact h2.h2) | 32 / 34.56px / 2 | not present | not present | Fraunces, Georgia, serif / 500 / center |
| H2 Two doors. Same room. (#contact h2.h2.in) | not present | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Why clarity drives speed, and why most teams have it backwards. (#top p.ahead__sub) | 17 / 24.65px / 2 | 17 / 24.65px / 2 | 22 / 31.9px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P A weak candidate at the top of a funnel costs four minutes. The same candidate at round two costs four people an hour each, plus the scheduling, plus the slow erosion of your hiring managers' willingness to take the pipeline seriously. (article.art p) | 16.5 / 28.38px / 6 | 16.5 / 28.38px / 3 | 17.48 / 30.0656px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P The fix is unglamorous. Write down what good looks like, four or five dimensions, weighted, agreed with the hiring manager, before the first CV arrives. A bar written after the first CV is a description of that CV. (article.art p) | 16.5 / 28.38px / 5 | 16.5 / 28.38px / 3 | 17.48 / 30.0656px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Or go back to everything we’ve published. (#related p.dek.in) | 16 / 24.8px / 1 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P If you have a role you’re stuck on, or you’re the one being interviewed, both of those start the same way. (#contact p.dek) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P If you have a role you’re stuck on, or you’re the one being interviewed, both of those start the same way. (#contact p.dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 10. /blog/when-job-hunting-feels-like-a-black-hole/

Article: restore article-body subhead tier and looser leading; distinguish body, related module, and closing CTA.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 When job hunting feels like a black hole (#top h1) | 33.28 / 35.9424px / 2 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 2 | Fraunces, Georgia, serif / 500 / start |
| H2 What silence actually costs (article.art h2) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / start |
| H2 What we would actually suggest (article.art h2) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / start |
| H2 The thing we owe you (article.art h2) | 32 / 34.56px / 2 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / start |
| H2 Three more that came out of real mandates. (#related h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Two doors. Same room. (#contact h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |
| H2 Two doors. Same room. (#contact h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / center |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Silence is not rejection, but it costs the same. (#top p.ahead__sub) | 17 / 24.65px / 1 | 17 / 24.65px / 1 | 22 / 31.9px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P It is not the rejection. People handle rejection. What silence does is remove your ability to tell a good decision from a bad one. So every subsequent choice gets made in the dark, and confidence erodes in a way that shows up in interviews weeks later. (article.art p) | 16.5 / 28.38px / 6 | 16.5 / 28.38px / 3 | 17.48 / 30.0656px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Stop optimising for volume. A hundred and forty applications is not forty times better than three well-chosen ones; it is mostly forty times more silence. The response rate on cold applications is what it is, and no amount of tailoring moves it much. (article.art p) | 16.5 / 28.38px / 6 | 16.5 / 28.38px / 3 | 17.48 / 30.0656px / 4 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P If you talk to us and we cannot help, we will say so and tell you why. Not as a courtesy. Because the alternative is adding to the pile of unanswered things, and the pile is the problem. (article.art p) | 16.5 / 28.38px / 5 | 16.5 / 28.38px / 3 | 17.48 / 30.0656px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Or go back to everything we’ve published. (#related p.dek) | 16 / 24.8px / 1 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P If you have a role you’re stuck on, or you’re the one being interviewed, both of those start the same way. (#contact p.dek.in) | 16 / 24.8px / 3 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Or go back to everything we’ve published. (#related p.dek.in) | not present | 16 / 24.8px / 1 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P If you have a role you’re stuck on, or you’re the one being interviewed, both of those start the same way. (#contact p.dek) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 11. /blog/why-tech-hiring-really-takes-so-long/

Article: restore article-body subhead tier and looser leading; distinguish body, related module, and closing CTA.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Why tech hiring really takes so long (#top h1) | 33.28 / 35.9424px / 2 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 2 | Fraunces, Georgia, serif / 500 / start |
| H2 Where the months actually went (article.art h2) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / start |
| H2 What actually changed (article.art h2) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / start |
| H2 The uncomfortable part (article.art h2) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / start |
| H2 Three more that came out of real mandates. (#related h2.h2) | 32 / 34.56px / 2 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Two doors. Same room. (#contact h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Everyone blames the talent shortage. The delay is almost always earlier than that. (#top p.ahead__sub) | 17 / 24.65px / 2 | 17 / 24.65px / 2 | 22 / 31.9px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Reconstructing it afterwards, the delay broke down roughly like this. Six weeks establishing that the job description described a role nobody had written down properly. Seven weeks of interviews where three panellists were each testing for something slightly different. Three weeks of a candidate everyone liked and nobody would commit to, because no one could say what they were comparing him against. (article.art p) | 16.5 / 28.38px / 10 | 16.5 / 28.38px / 5 | 17.48 / 30.0656px / 5 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Forty-five minutes with the hiring manager, alone, asking what the person would own in month one and what would have to go wrong for it to be a bad hire. Six dimensions, weighted, written down and agreed. Then the same rubric applied to everyone, including the eleven profiles already in the pipeline that had been passed over. (article.art p) | 16.5 / 28.38px / 8 | 16.5 / 28.38px / 4 | 17.48 / 30.0656px / 5 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Nobody had done anything wrong. The recruiter sourced well. The panel interviewed properly. The hiring manager was engaged and available. Every individual step was competent, and the process still took five months, because the thing being decided had never been stated. (article.art p) | 16.5 / 28.38px / 7 | 16.5 / 28.38px / 4 | 17.48 / 30.0656px / 4 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Or go back to everything we’ve published. (#related p.dek) | 16 / 24.8px / 1 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P If you have a role you’re stuck on, or you’re the one being interviewed, both of those start the same way. (#contact p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 12. /candidates/

Candidate: mobile hero 27.3px below most section H2s at 30px; conversation 26.25px; hero lead 12.96px; preserve card/section separation.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Interview once.Be seen for your work. (#top h1) | 27.3 / 29.484px / 2 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 2 | Fraunces, Georgia, serif / 500 / center |
| H2 Same person.Different team.Different score. (#score #score-title) | 30 / 32.4px / 3 | 32 / 34.56px / 3 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / start |
| H3 Anirudh Mehta (article.c-scorecard h3) | 24 / 28.8px / 1 | 24 / 28.8px / 1 | 22 / 26.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 The same experience.A different picture. (#tally h2) | 30 / 32.4px / 2 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / start |
| H3 Built a payments service. (article h3) | 26 / 31.2px / 2 | 26 / 31.2px / 2 | 26 / 31.2px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Why that design? What did it cost? (article.c-comparison__evidence h3) | 26 / 31.2px / 2 | 26 / 31.2px / 2 | 26 / 31.2px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 See what the team sees. (#proof h2) | 30 / 32.4px / 1 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Senior backend engineer (#profile-panel h3) | 28 / 33.6px / 2 | 28 / 33.6px / 1 | 28 / 33.6px / 1 | Fraunces, Georgia, serif / 500 / start |
| H4 Designed for retries, without duplicate payments. (#profile-panel h4) | 18.75 / 24.375px / 3 | 20 / 26px / 3 | 20 / 26px / 2 | Fraunces, Georgia, serif / 500 / start |
| H4 How did you bring the team with you? (#profile-panel h4) | 18.75 / 24.375px / 2 | 20 / 26px / 2 | 20 / 26px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 One conversation.Less starting over. (#thirty h2) | 26.25 / 28.35px / 2 | 29.95 / 32.3482px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / start |
| H3 Someone who knows where to go deeper. (article h3) | 18.75 / 24.375px / 2 | 20 / 26px / 2 | 24 / 31.2px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 A starting point for the next conversation. (article h3) | 18.75 / 24.375px / 2 | 20 / 26px / 2 | 24 / 31.2px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 Looking for a move.Keeping it discreet. (#controls h2) | 30 / 32.4px / 2 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / start |
| H3 Who can see your profile. (article h3) | 16.5 / 26.4px / 1 | 17.6 / 28.16px / 1 | 17.6 / 28.16px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Which conversations you want. (article h3) | 16.5 / 26.4px / 1 | 17.6 / 28.16px / 1 | 17.6 / 28.16px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 When your plans change. (article h3) | 16.5 / 26.4px / 1 | 17.6 / 28.16px / 1 | 17.6 / 28.16px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 How your data is handled. (article h3) | 16.5 / 26.4px / 1 | 17.6 / 28.16px / 1 | 17.6 / 28.16px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 No candidate fee. (#controls h3) | 16.5 / 26.4px / 1 | 17.6 / 28.16px / 1 | 17.6 / 28.16px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Across functions. (#controls h3) | 16.5 / 26.4px / 1 | 17.6 / 28.16px / 1 | 17.6 / 28.16px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 A clear next step.At every stage. (#when h2) | 30 / 32.4px / 2 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / start |
| H3 Share your profile (#when h3) | 16 / 20.8px / 1 | 16 / 20.8px / 1 | 16 / 20.8px / 1 | "Inter Tight", -apple-system, sans-serif / 600 / start |
| H3 Speak with an expert (#when h3) | 16 / 20.8px / 1 | 16 / 20.8px / 1 | 16 / 20.8px / 1 | "Inter Tight", -apple-system, sans-serif / 600 / start |
| H3 Explore relevant roles (#when h3) | 16 / 20.8px / 1 | 16 / 20.8px / 1 | 16 / 20.8px / 1 | "Inter Tight", -apple-system, sans-serif / 600 / start |
| H3 Choose your next move (#when h3) | 16 / 20.8px / 1 | 16 / 20.8px / 1 | 16 / 20.8px / 1 | "Inter Tight", -apple-system, sans-serif / 600 / start |
| H2 What candidates say. (#voices h2) | 30 / 32.4px / 1 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 Give the right teamsmore reasons to meet you. (#apply h2) | 30 / 32.4px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / center |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P \ Be seen for what you can do (#top p.c-eyebrow) | 8.4 / 12.6px / 1 | 8.96 / 13.44px / 1 | 8.96 / 13.44px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / center |
| P You know what it is like to send a CV and hear nothing back. One conversation with an expert brings your work into focus. We take that evidence to relevant teams, so they have more to go on before they meet you. (#top p.c-lead) | 12.96 / 19.44px / 4 | 13.82 / 20.736px / 4 | 16.38 / 24.576px / 4 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Less ground to cover again. More of your work understood. (#top p.c-micro) | 8.88 / 14.208px / 1 | 9.47 / 15.1552px / 1 | 9.47 / 15.1552px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / center |
| P These six scores come from Anirudh's sample interview. They stay the same, but what each team needs is different. Choose a team to see how that changes his overall score. (#score p.c-lead) | 16 / 24.8px / 4 | 16 / 24.8px / 3 | 16.72 / 25.916px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Senior backend · 6 years (article.c-scorecard p) | 13 / 19.5px / 1 | 13 / 19.5px / 1 | 13 / 19.5px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Your ability did not begin with this interview. What changes is what a team can see: the decisions you made, the alternatives you rejected and what you learned when things went wrong. (#tally p.c-lead) | 16 / 24.8px / 5 | 16 / 24.8px / 3 | 16.72 / 25.916px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P The project and the stack. A useful starting point, but your contribution is still hard to see. (article p) | 16 / 25.6px / 3 | 16 / 25.6px / 3 | 16 / 25.6px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P The trade-off you rejected, why you rejected it, and what happened six months later. Now the team can see the judgment behind the job title. (article.c-comparison__evidence p) | 16 / 25.6px / 4 | 16 / 25.6px / 4 | 16 / 25.6px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Your interview gives the team more than a CV to read before they call. You need a clear picture of them, too. Explore both sides in this example: your experience, and the opportunity you are considering. (#proof p.c-lead) | 16 / 24.8px / 5 | 16 / 24.8px / 3 | 16.72 / 25.916px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P 6 years · Python, AWS, Kubernetes (#profile-panel p) | 15 / 23.25px / 1 | 15 / 23.25px / 1 | 15 / 23.25px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Explained the failure mode, why an idempotency key was needed, and how the team checked the change in production. (#profile-panel p) | 15 / 23.25px / 4 | 15 / 23.25px / 4 | 15 / 23.25px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P The technical reasoning is clear. A worked example of resolving a design disagreement would add the collaboration behind it. (#profile-panel p) | 15 / 23.25px / 4 | 15 / 23.25px / 4 | 15 / 23.25px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Tell someone who knows the work how you actually did it. The evidence carries forward to relevant teams, so each introduction can build on what you have already explained. (#thirty p.c-lead) | 16 / 24.8px / 4 | 16 / 24.8px / 3 | 16.72 / 25.916px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P An expert in your field explores your decisions and trade-offs, with questions shaped by the work you have done. (article p) | 16 / 25.6px / 3 | 16 / 25.6px / 3 | 16 / 25.6px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Teams can build on your evidence rather than just your CV. They may still ask follow-up questions and run their own interviews. (article p) | 16 / 25.6px / 3 | 16 / 25.6px / 3 | 16 / 25.6px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Exploring your next role does not mean announcing your search. Tell us which companies should be excluded and discuss how your profile will be shared before an introduction. (#controls p.c-lead) | 16 / 24.8px / 5 | 16 / 24.8px / 3 | 16.72 / 25.916px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Let us know if your current employer or other companies should be excluded from introductions. (article p) | 13.5 / 20.25px / 2 | 14.4 / 21.6px / 3 | 14.4 / 21.6px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Share your priorities for the role, location and team. You decide which opportunities to explore. (article p) | 13.5 / 20.25px / 2 | 14.4 / 21.6px / 3 | 14.4 / 21.6px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Tell us if you want to pause your search or update your preferences. (article p) | 13.5 / 20.25px / 2 | 14.4 / 21.6px / 2 | 14.4 / 21.6px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Review our privacy policy and ask about access, recording, retention or deletion before you proceed. (article p) | 13.5 / 20.25px / 3 | 14.4 / 21.6px / 3 | 14.4 / 21.6px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Companies pay for our services. You do not pay us to be considered for a role. (#controls p) | 13.5 / 20.25px / 2 | 14.4 / 21.6px / 2 | 14.4 / 21.6px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Engineering, data, infrastructure, finance, operations and leadership. We confirm whether we cover your area. (#controls p) | 13.5 / 20.25px / 2 | 14.4 / 21.6px / 3 | 14.4 / 21.6px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Start with your profile. We review where we can help and explain the next step. Timing depends on your experience and the roles available. (#when p.c-lead) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Your CV, experience and the kind of work you want next. (#when p) | 14 / 20.3px / 2 | 14 / 20.3px / 1 | 14 / 20.3px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P A conversation about your work, decisions and the problems you have solved. (#when p) | 14 / 20.3px / 2 | 14 / 20.3px / 1 | 14 / 20.3px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P We review your experience against what each hiring team needs. (#when p) | 14 / 20.3px / 2 | 14 / 20.3px / 1 | 14 / 20.3px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Meet the team, ask your questions and decide whether the role fits. (#when p) | 14 / 20.3px / 2 | 14 / 20.3px / 1 | 14 / 20.3px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Share your CV and the work you want next. An expert conversation can turn that experience into evidence for relevant teams, so your next introduction starts with what you can do. (#apply p.c-lead) | 19 / 30.4px / 5 | 19 / 30.4px / 4 | 19 / 30.4px / 4 | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 13. /candidates/start/

Candidate form: section30 vs hero31.2 mobile; retain form heading/field label hierarchy and do not restyle form copy as subtitle.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Give the right teams more to go on. (#top h1.h1.in) | 31.2 / 33.696px / 2 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 From your CV to a conversation. (#next h2.h2.in) | 30 / 32.4px / 2 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Start with your experience (#top p.eyebrow.in) | 8.4 / 13.44px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P Share your CV so we can understand your experience. If there is a relevant opportunity, an expert conversation can bring the work behind it into focus. (#top p.hero__p.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P More than a job title. Your decisions, your contribution, and the work you want next. (#top p.hero__p.in) | 16 / 24.8px / 2 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P We start by reviewing your experience. Further steps depend on relevant opportunities and your interest, not a fixed timeline. (#next p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |


## 14. /careers/

Careers index: 48px marketing section H2 vs 53.12px hero; mobile32 vs33.28. Retain 19px role-card titles as a different role.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 We publish the barwe hire you against. (#top h1.h1.in) | 33.28 / 35.9424px / 2 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 7, across 3 teams. (#roles h2.h2.in) | 32 / 34.56px / 1 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H3 Backend Engineer (#roles h3.rc__t) | 16.5 / 19.8px / 1 | 16.5 / 19.8px / 1 | 19 / 22.8px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 AI/ML Engineer (#roles h3.rc__t) | 16.5 / 19.8px / 1 | 16.5 / 19.8px / 1 | 19 / 22.8px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Software Intern (#roles h3.rc__t) | 16.5 / 19.8px / 1 | 16.5 / 19.8px / 1 | 19 / 22.8px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Talent Advisor (#roles h3.rc__t) | 16.5 / 19.8px / 1 | 16.5 / 19.8px / 1 | 19 / 22.8px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Senior Delivery Partner (#roles h3.rc__t) | 16.5 / 19.8px / 1 | 16.5 / 19.8px / 1 | 19 / 22.8px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Talent Associate (#roles h3.rc__t) | 16.5 / 19.8px / 1 | 16.5 / 19.8px / 1 | 19 / 22.8px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Growth Intern (#roles h3.rc__t) | 16.5 / 19.8px / 1 | 16.5 / 19.8px / 1 | 19 / 22.8px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 You will know everyone here by Friday. (#what h2.h2) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 The same process we sell. (#how h2.h2) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Write anyway, but write specifically. (#fit h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Someone will write back. (#contact h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 The same process we sell. (#how h2.h2.in) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Someone will write back. (#contact h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 You will know everyone here by Friday. (#what h2.h2.in) | not present | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Careers (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P We spend our days telling other companies that a hiring bar should be written down before anyone is interviewed. It would be strange not to do it to ourselves. (#top p.hero__p.in) | 16 / 24.8px / 4 | 16 / 24.8px / 3 | 16.72 / 25.916px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P 7 roles, all onsite in Bengaluru. The scorecard for each one is on this page, before you apply. (#top p.hero__p.in) | 16 / 24.8px / 2 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The scorecard for this role (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P Pune and Bengaluru, with people in both. The roles open right now are in the Bengaluru office, in Indiranagar, where somebody makes filter coffee at about four. (#roles p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Small enough that there is no layer between you and the people who decide things. That is the best part of the job and occasionally the hardest. (#what p.dek.in) | 16 / 24.8px / 4 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P If we ran a worse process for ourselves than the one we ask clients to pay for, you would be right to notice. (#how p.dek) | 16 / 24.8px / 3 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P A note that says you are interested in opportunities is hard to act on. Tell us what you would want to own here and why you think you would be good at it. Four sentences is plenty. (#fit p.trust__dek.in) | 16 / 25.6px / 5 | 16 / 25.6px / 2 | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P That is the whole promise of this page, and it is the one thing we would be most embarrassed to get wrong. Silence isn’t a process. (#contact p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Small enough that there is no layer between you and the people who decide things. That is the best part of the job and occasionally the hardest. (#what p.dek) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P If we ran a worse process for ourselves than the one we ask clients to pay for, you would be right to notice. (#how p.dek.in) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |


## 15. /careers/ai-ml-engineer/

Career detail: mobile H1 and H2 both 32px; restore role hierarchy through the shared template, retain scorecard labels.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 AI/ML Engineer (#top h1) | 32 / 33.92px / 1 | 38.4 / 40.704px / 1 | 58 / 61.48px / 1 | Fraunces, Georgia, serif / 800 / start |
| H2 Six dimensions, and what each means here. (#scored h2.h2.in) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Two weeks, four steps, no surprises. (#process h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Someone will write back. (#contact h2.h2) | 32 / 34.56px / 2 | not present | not present | Fraunces, Georgia, serif / 500 / center |
| H2 Someone will write back. (#contact h2.h2.in) | not present | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Practical AI systems that make hiring decisions clearer, more structured, and easier to trust. (#top p.jd__lead) | 17 / 24.65px / 3 | 17 / 24.65px / 2 | 22 / 31.9px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Weighted for this role, agreed before anyone interviews. The line under each one is roughly the question you will get. (#scored p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The same process we ask clients to pay for. If we ran a worse one for ourselves you would be right to notice. (#process p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P That is the whole promise of this page, and it is the one thing we would be most embarrassed to get wrong. Silence isn’t a process. (#contact p.dek) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P That is the whole promise of this page, and it is the one thing we would be most embarrassed to get wrong. Silence isn’t a process. (#contact p.dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 16. /careers/backend-engineer/

Career detail: mobile H1 and H2 both 32px; restore role hierarchy through the shared template, retain scorecard labels.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Backend Engineer (#top h1) | 32 / 33.92px / 1 | 38.4 / 40.704px / 1 | 58 / 61.48px / 1 | Fraunces, Georgia, serif / 800 / start |
| H2 Six dimensions, and what each means here. (#scored h2.h2.in) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Two weeks, four steps, no surprises. (#process h2.h2) | 32 / 34.56px / 2 | not present | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Someone will write back. (#contact h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |
| H2 Two weeks, four steps, no surprises. (#process h2.h2.in) | not present | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Great hiring products feel simple on the surface. That simplicity is earned in the backend. (#top p.jd__lead) | 17 / 24.65px / 3 | 17 / 24.65px / 2 | 22 / 31.9px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Weighted for this role, agreed before anyone interviews. The line under each one is roughly the question you will get. (#scored p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The same process we ask clients to pay for. If we ran a worse one for ourselves you would be right to notice. (#process p.dek) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P That is the whole promise of this page, and it is the one thing we would be most embarrassed to get wrong. Silence isn’t a process. (#contact p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P The same process we ask clients to pay for. If we ran a worse one for ourselves you would be right to notice. (#process p.dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |


## 17. /careers/growth-intern/

Career detail: mobile H1 and H2 both 32px; restore role hierarchy through the shared template, retain scorecard labels.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Growth Intern (#top h1) | 32 / 33.92px / 1 | 38.4 / 40.704px / 1 | 58 / 61.48px / 1 | Fraunces, Georgia, serif / 800 / start |
| H2 Six dimensions, and what each means here. (#scored h2.h2.in) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Two weeks, four steps, no surprises. (#process h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Someone will write back. (#contact h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Not every conversation closes a deal. The best ones open a door. That is the whole job, and it matters. (#top p.jd__lead) | 17 / 24.65px / 3 | 17 / 24.65px / 2 | 22 / 31.9px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Weighted for this role, agreed before anyone interviews. The line under each one is roughly the question you will get. (#scored p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The same process we ask clients to pay for. If we ran a worse one for ourselves you would be right to notice. (#process p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P That is the whole promise of this page, and it is the one thing we would be most embarrassed to get wrong. Silence isn’t a process. (#contact p.dek) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P That is the whole promise of this page, and it is the one thing we would be most embarrassed to get wrong. Silence isn’t a process. (#contact p.dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 18. /careers/senior-delivery-partner/

Career detail: mobile H1 and H2 both 32px; restore role hierarchy through the shared template, retain scorecard labels.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Senior Delivery Partner (#top h1) | 32 / 33.92px / 2 | 38.4 / 40.704px / 1 | 58 / 61.48px / 2 | Fraunces, Georgia, serif / 800 / start |
| H2 Six dimensions, and what each means here. (#scored h2.h2.in) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Two weeks, four steps, no surprises. (#process h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Someone will write back. (#contact h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |
| H2 Two weeks, four steps, no surprises. (#process h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Activity is easy to measure. Outcomes are harder. We are accountable for who joins, not for how many profiles were shared. (#top p.jd__lead) | 17 / 24.65px / 3 | 17 / 24.65px / 3 | 22 / 31.9px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Weighted for this role, agreed before anyone interviews. The line under each one is roughly the question you will get. (#scored p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The same process we ask clients to pay for. If we ran a worse one for ourselves you would be right to notice. (#process p.dek.in) | 16 / 24.8px / 3 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P That is the whole promise of this page, and it is the one thing we would be most embarrassed to get wrong. Silence isn’t a process. (#contact p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P The same process we ask clients to pay for. If we ran a worse one for ourselves you would be right to notice. (#process p.dek) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |


## 19. /careers/software-intern/

Career detail: mobile H1 and H2 both 32px; restore role hierarchy through the shared template, retain scorecard labels.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Software Intern (#top h1) | 32 / 33.92px / 1 | 38.4 / 40.704px / 1 | 58 / 61.48px / 1 | Fraunces, Georgia, serif / 800 / start |
| H2 Six dimensions, and what each means here. (#scored h2.h2.in) | 32 / 34.56px / 3 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Two weeks, four steps, no surprises. (#process h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Someone will write back. (#contact h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |
| H2 Six dimensions, and what each means here. (#scored h2.h2) | not present | 32 / 34.56px / 2 | not present | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P This is not a shadowing internship. You will do real work, ship real output, and learn in context. (#top p.jd__lead) | 17 / 24.65px / 3 | 17 / 24.65px / 2 | 22 / 31.9px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Weighted for this role, agreed before anyone interviews. The line under each one is roughly the question you will get. (#scored p.dek.in) | 16 / 24.8px / 3 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The same process we ask clients to pay for. If we ran a worse one for ourselves you would be right to notice. (#process p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P That is the whole promise of this page, and it is the one thing we would be most embarrassed to get wrong. Silence isn’t a process. (#contact p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Weighted for this role, agreed before anyone interviews. The line under each one is roughly the question you will get. (#scored p.dek) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |


## 20. /careers/talent-advisor/

Career detail: mobile H1 and H2 both 32px; restore role hierarchy through the shared template, retain scorecard labels.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Talent Advisor (#top h1) | 32 / 33.92px / 1 | 38.4 / 40.704px / 1 | 58 / 61.48px / 1 | Fraunces, Georgia, serif / 800 / start |
| H2 Six dimensions, and what each means here. (#scored h2.h2.in) | 32 / 34.56px / 3 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Two weeks, four steps, no surprises. (#process h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Someone will write back. (#contact h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |
| H2 Six dimensions, and what each means here. (#scored h2.h2) | not present | 32 / 34.56px / 2 | not present | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P The resume tells you what someone did. It rarely tells you what they can do. We are building the team that knows the difference. (#top p.jd__lead) | 17 / 24.65px / 3 | 17 / 24.65px / 3 | 22 / 31.9px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Weighted for this role, agreed before anyone interviews. The line under each one is roughly the question you will get. (#scored p.dek.in) | 16 / 24.8px / 3 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The same process we ask clients to pay for. If we ran a worse one for ourselves you would be right to notice. (#process p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P That is the whole promise of this page, and it is the one thing we would be most embarrassed to get wrong. Silence isn’t a process. (#contact p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Weighted for this role, agreed before anyone interviews. The line under each one is roughly the question you will get. (#scored p.dek) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |


## 21. /careers/talent-associate/

Career detail: mobile H1 and H2 both 32px; restore role hierarchy through the shared template, retain scorecard labels.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Talent Associate (#top h1) | 32 / 33.92px / 1 | 38.4 / 40.704px / 1 | 58 / 61.48px / 1 | Fraunces, Georgia, serif / 800 / start |
| H2 Six dimensions, and what each means here. (#scored h2.h2.in) | 32 / 34.56px / 3 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Two weeks, four steps, no surprises. (#process h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Someone will write back. (#contact h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |
| H2 Six dimensions, and what each means here. (#scored h2.h2) | not present | 32 / 34.56px / 2 | not present | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Every expert was once a beginner who refused to stay one. You will not file resumes. You will learn to read people. (#top p.jd__lead) | 17 / 24.65px / 3 | 17 / 24.65px / 2 | 22 / 31.9px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Weighted for this role, agreed before anyone interviews. The line under each one is roughly the question you will get. (#scored p.dek.in) | 16 / 24.8px / 3 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The same process we ask clients to pay for. If we ran a worse one for ourselves you would be right to notice. (#process p.dek) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P That is the whole promise of this page, and it is the one thing we would be most embarrassed to get wrong. Silence isn’t a process. (#contact p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Weighted for this role, agreed before anyone interviews. The line under each one is roughly the question you will get. (#scored p.dek) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The same process we ask clients to pay for. If we ran a worse one for ourselves you would be right to notice. (#process p.dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |


## 22. /category/ai-and-assessment/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 AI & Assessment (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Designing AI for High-Stakes Technical Assessment (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 2 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P What an assessment engine should do, where human judgment belongs, and why a score needs evidence you can question. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 3 | 15 / 25.8px / 2 | 15 / 25.8px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 23. /category/candidate-experience/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Candidate Experience (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Designing for Trust: Privacy, Transparency, and Professional Respect (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 4 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |
| H3 When Job Hunting Feels Like a Black Hole: How to Take Back Control (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 3 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Trust is built into Tribera’s architecture. Here’s how we protect professional privacy while enabling structured, transparent hiring conversations. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 4 | 15 / 25.8px / 4 | 15 / 25.8px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Job hunting shouldn’t feel like an endless loop of waiting and silence. Backed by research from McKinsey, Deloitte, and PwC, here’s how candidates can reclaim their time, protect their energy, and land interviews smarter. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 6 | 15 / 25.8px / 6 | 15 / 25.8px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 24. /category/hiring-philosophy/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Hiring Philosophy (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Hiring Is Not a Transaction — It’s a Relationship (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 2 | 24 / 27.6px / 1 | 24 / 27.6px / 1 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P When hiring becomes transactional, we lose trust. At Tribera, we build belonging, empathy and clarity into every process. It’s not about closing roles — it’s about opening relationships. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 5 | 15 / 25.8px / 3 | 15 / 25.8px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 25. /category/hiring-strategy/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Hiring Strategy (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Rethinking hiring metrics: What 200,000 interviews taught us about signal efficiency (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 4 | 24 / 27.6px / 2 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Time-to-hire measures pace. Interview-to-hire ratios reveal alignment. Insights from 200,000 structured interviews across domains. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 4 | 15 / 25.8px / 2 | 15 / 25.8px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 26. /category/technical-hiring/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Technical Hiring (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Signal vs Noise in Technical Hiring – Why Clarity Drives Speed (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 3 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |
| H3 Why Tech Hiring Really Takes So Long — And What We Learned From It (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 4 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Most hiring teams waste time evaluating candidates who should never have been in the process. Focusing on signal, structure and context helps companies hire faster — and better. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 5 | 15 / 25.8px / 5 | 15 / 25.8px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Most organisations believe engineering hiring is slow due to talent shortages — but this story reveals how clarity and signal turn a 327-profile search into a 22-day success. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 4 | 15 / 25.8px / 5 | 15 / 25.8px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 27. /contact/

Contact: 62px hero and 20px FAQ subtitle are distinct local variants. Preserve form labels and named-person card typography.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Tell us what you’restuck on. (#top h1.h1.in) | 36 / 38.88px / 2 | 36 / 38.88px / 2 | 62 / 66.96px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Which side of it are you on? (#write h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 No black boxes here either. (#after h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Two rooms, both real. (#offices h2.h2) | 32 / 34.56px / 1 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Six things people ask first. (#questions h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Someone will write back. (#contact h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Contact (#top p.eyebrow.eyebrow--red.in) | 12 / 19.2px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P Not a form that goes into a queue. A named person reads it, including the answer that we’re not the right people for it. The response times are below, with the people who answer. (#top p.hero__p.in) | 16 / 24.8px / 4 | 16 / 24.8px / 3 | 16.72 / 25.916px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P If you’d rather just see how one role ran before you write anything, that’s on the homepage and nobody will chase you for it. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Who actually replies (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P The questions change depending on your answer, because what we need to know about a role is nothing like what we need to know about a person. (#write p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The same rule we apply to candidates applies to anyone who writes to us. You will hear back either way, and quickly enough to be useful. (#after p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Eragina Digital Solutions Private Limited. If you would rather come and sit down, that is usually the better version anyway. (#offices p.dek) | 16 / 24.8px / 3 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so you don’t have to spend an email on them. We explain the commercial shape before either side commits to a search. (#questions p.trust__dek.in) | 16 / 25.6px / 3 | 16 / 25.6px / 2 | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P That is the whole promise of this page, and it is the one thing we would be most embarrassed to get wrong. Silence isn’t a process. (#contact p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 4 | 16.72 / 25.916px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Eragina Digital Solutions Private Limited. If you would rather come and sit down, that is usually the better version anyway. (#offices p.dek.in) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |


## 28. /functions/

Function index: same near-equal hero/section hierarchy; preserve taxonomy/card labels.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Different functions.Different priorities. (#top h1.h1.in) | 33.28 / 35.9424px / 2 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Eight functions, eight different bars. (#all h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 The method is the same in all eight. (#same h2.h2) | 32 / 34.56px / 2 | not present | not present | Fraunces, Georgia, serif / 500 / left |
| H2 We cover more than we list, but not everything. (#contact h2.h2.in) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 The method is the same in all eight. (#same h2.h2.in) | not present | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Functions (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P A data lead and a head of infrastructure need different strengths.The method is identical everywhere.The weighting is not. (#top p.hero__p.in) | 16 / 24.8px / 4 | 16 / 24.8px / 3 | 16.72 / 25.916px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Our first question is never the job description.It’s what your function punishes when you get it wrong. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P One title, any two functions (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P The six bars on each card illustrate that function’s priorities: the tall red one is what it punishes hardest when someone gets it wrong.Scan them and the clusters show up on their own. (#all p.dek.in) | 16 / 24.8px / 6 | 16 / 24.8px / 3 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Function context changes the weighting, the questions and who does the interviewing. It never changes how the decision gets made, or who makes it. (#same p.fn__dek) | 16 / 24.8px / 4 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the function and the mandate. If it isn’t our ground we will say so on the first call, which is cheaper for both of us than finding out in week three. (#contact p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Function context changes the weighting, the questions and who does the interviewing. It never changes how the decision gets made, or who makes it. (#same p.fn__dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |


## 29. /functions/data-analytics/

Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 We hire on who actually moved a business number. (#top h1.h1.in) | 33.28 / 35.9424px / 3 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Things a CV cannot tell you. (#misses h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2.in) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Different levels. Your hiring bar. (#roles h2.h2) | 32 / 34.56px / 2 | not present | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three things teams ask first. (#faq h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2) | 32 / 34.56px / 2 | not present | not present | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Different levels. Your hiring bar. (#roles h2.h2.in) | not present | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2.in) | not present | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Data & analytics (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P A dashboard shows the number. It never shows who decided from it, or what happened after the decision. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Your hiring manager sets the bar. An expert in the field assesses the evidence before we send your team the shortlist. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Example priorities for this function (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P A CV lists experience. An expert conversation explores the decisions, trade-offs and outcomes behind it. (#misses p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P These examples show what we explore. The actual questions follow the candidate's experience and the requirements of your role. (#asks p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P We agree the requirements with your hiring manager. Your team interviews the shortlist and makes the hiring decision. (#roles p.dek) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek.in) | 16 / 25.6px / 4 | 16 / 25.6px / 2 | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek) | 16 / 24.8px / 2 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P We agree the requirements with your hiring manager. Your team interviews the shortlist and makes the hiring decision. (#roles p.dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek.in) | not present | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 30. /functions/engineering-platform/

Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 We hire on what shipped, and what broke. (#top h1.h1.in) | 33.28 / 35.9424px / 3 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Things a CV cannot tell you. (#misses h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2.in) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Different levels. Your hiring bar. (#roles h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three things teams ask first. (#faq h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Engineering & platform (#top p.eyebrow.eyebrow--red.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P Anyone on a delivery team appears on the delivery. The person who made the call and the person who attended the meeting write the same bullet point. (#top p.hero__p.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Your hiring manager sets the bar. An expert in the field assesses the evidence before we send your team the shortlist. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Example priorities for this function (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P A CV lists experience. An expert conversation explores the decisions, trade-offs and outcomes behind it. (#misses p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P These examples show what we explore. The actual questions follow the candidate's experience and the requirements of your role. (#asks p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P We agree the requirements with your hiring manager. Your team interviews the shortlist and makes the hiring decision. (#roles p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek.in) | 16 / 25.6px / 4 | 16 / 25.6px / 2 | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek.in) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek.in) | 16 / 24.8px / 3 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 31. /functions/finance-risk/

Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 We hire on the no they said, and the day after. (#top h1.h1.in) | 33.28 / 35.9424px / 3 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Things a CV cannot tell you. (#misses h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2.in) | 32 / 34.56px / 3 | not present | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Different levels. Your hiring bar. (#roles h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three things teams ask first. (#faq h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2) | not present | 32 / 34.56px / 2 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2.in) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Three things teams ask first. (#faq h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2) | not present | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Finance & risk (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P A finance CV is a list of responsibilities. It does not say when they said no and what it cost. (#top p.hero__p.in) | 16 / 24.8px / 2 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Your hiring manager sets the bar. An expert in the field assesses the evidence before we send your team the shortlist. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Example priorities for this function (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P A CV lists experience. An expert conversation explores the decisions, trade-offs and outcomes behind it. (#misses p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P These examples show what we explore. The actual questions follow the candidate's experience and the requirements of your role. (#asks p.dek.in) | 16 / 24.8px / 3 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P We agree the requirements with your hiring manager. Your team interviews the shortlist and makes the hiring decision. (#roles p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek) | 16 / 25.6px / 4 | not present | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek.in) | 16 / 24.8px / 2 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P These examples show what we explore. The actual questions follow the candidate's experience and the requirements of your role. (#asks p.dek) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek.in) | not present | 16 / 25.6px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek) | not present | 16 / 24.8px / 1 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek) | not present | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 32. /functions/infrastructure-sre/

Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 We hire on the incidents they ran, not the certification. (#top h1.h1.in) | 33.28 / 35.9424px / 3 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Things a CV cannot tell you. (#misses h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2.in) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Different levels. Your hiring bar. (#roles h2.h2) | 32 / 34.56px / 2 | not present | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three things teams ask first. (#faq h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Different levels. Your hiring bar. (#roles h2.h2.in) | not present | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 We hire like you think. (#why h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2.in) | not present | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Infrastructure & SRE (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P An SRE CV is a list of systems and a claim of '99.9%'. The interesting part is the hour everything broke and what they watched. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Your hiring manager sets the bar. An expert in the field assesses the evidence before we send your team the shortlist. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Example priorities for this function (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P A CV lists experience. An expert conversation explores the decisions, trade-offs and outcomes behind it. (#misses p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P These examples show what we explore. The actual questions follow the candidate's experience and the requirements of your role. (#asks p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P We agree the requirements with your hiring manager. Your team interviews the shortlist and makes the hiring decision. (#roles p.dek) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek.in) | 16 / 25.6px / 4 | 16 / 25.6px / 2 | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek.in) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P We agree the requirements with your hiring manager. Your team interviews the shortlist and makes the hiring decision. (#roles p.dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek.in) | not present | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 33. /functions/leadership/

Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 We hire on the decision with no cover. (#top h1.h1.in) | 33.28 / 35.9424px / 3 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Things a CV cannot tell you. (#misses h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2) | 32 / 34.56px / 3 | not present | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Different levels. Your hiring bar. (#roles h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three things teams ask first. (#faq h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2.in) | not present | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Different levels. Your hiring bar. (#roles h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2.in) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 We hire like you think. (#why h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2) | not present | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Leadership (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P A title describes a role. A leader is the person who took the decision nobody else could take — and lived with the outcome. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Your hiring manager sets the bar. An expert in the field assesses the evidence before we send your team the shortlist. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Example priorities for this function (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P A CV lists experience. An expert conversation explores the decisions, trade-offs and outcomes behind it. (#misses p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P These examples show what we explore. The actual questions follow the candidate's experience and the requirements of your role. (#asks p.dek) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P We agree the requirements with your hiring manager. Your team interviews the shortlist and makes the hiring decision. (#roles p.dek.in) | 16 / 24.8px / 3 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek) | 16 / 25.6px / 4 | not present | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek.in) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek.in) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P These examples show what we explore. The actual questions follow the candidate's experience and the requirements of your role. (#asks p.dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P We agree the requirements with your hiring manager. Your team interviews the shortlist and makes the hiring decision. (#roles p.dek) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek.in) | not present | 16 / 25.6px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 34. /functions/operations/

Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 We hire on the recovery, not the plan. (#top h1.h1.in) | 33.28 / 35.9424px / 2 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Things a CV cannot tell you. (#misses h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2.in) | 32 / 34.56px / 3 | not present | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Different levels. Your hiring bar. (#roles h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Three things teams ask first. (#faq h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2) | 32 / 34.56px / 2 | not present | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2) | not present | 32 / 34.56px / 2 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Three things teams ask first. (#faq h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 We hire like you think. (#why h2.h2.in) | not present | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2) | not present | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2) | not present | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Operations (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P Anyone can run the operation that runs to plan. The interesting ones are the decisions made before anyone knew it was broken. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Your hiring manager sets the bar. An expert in the field assesses the evidence before we send your team the shortlist. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Example priorities for this function (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P A CV lists experience. An expert conversation explores the decisions, trade-offs and outcomes behind it. (#misses p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P These examples show what we explore. The actual questions follow the candidate's experience and the requirements of your role. (#asks p.dek.in) | 16 / 24.8px / 3 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P We agree the requirements with your hiring manager. Your team interviews the shortlist and makes the hiring decision. (#roles p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek.in) | 16 / 25.6px / 4 | 16 / 25.6px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek.in) | 16 / 24.8px / 2 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek) | 16 / 24.8px / 3 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P These examples show what we explore. The actual questions follow the candidate's experience and the requirements of your role. (#asks p.dek) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek) | not present | 16 / 24.8px / 1 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek.in) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek) | not present | not present | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |


## 35. /functions/product-design/

Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 We hire on what they refused to build. (#top h1.h1.in) | 33.28 / 35.9424px / 2 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Things a CV cannot tell you. (#misses h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2.in) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Different levels. Your hiring bar. (#roles h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Three things teams ask first. (#faq h2.h2) | 32 / 34.56px / 2 | not present | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Different levels. Your hiring bar. (#roles h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Three things teams ask first. (#faq h2.h2.in) | not present | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2) | not present | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Product & design (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P Taste is easy to recognise and hard to audit. We audit it the only way that works — on what they chose, and what they argued to protect. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Your hiring manager sets the bar. An expert in the field assesses the evidence before we send your team the shortlist. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Example priorities for this function (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P A CV lists experience. An expert conversation explores the decisions, trade-offs and outcomes behind it. (#misses p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P These examples show what we explore. The actual questions follow the candidate's experience and the requirements of your role. (#asks p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P We agree the requirements with your hiring manager. Your team interviews the shortlist and makes the hiring decision. (#roles p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek.in) | 16 / 25.6px / 4 | 16 / 25.6px / 2 | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek) | 16 / 24.8px / 2 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek.in) | 16 / 24.8px / 3 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek.in) | not present | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 36. /functions/security/

Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 We hire on what they did in the first twenty minutes. (#top h1.h1.in) | 33.28 / 35.9424px / 3 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Things a CV cannot tell you. (#misses h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2.in) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Different levels. Your hiring bar. (#roles h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three things teams ask first. (#faq h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2) | 32 / 34.56px / 2 | not present | not present | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2) | 32 / 34.56px / 2 | not present | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2.in) | not present | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2.in) | not present | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Three things teams ask first. (#faq h2.h2) | not present | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Security (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P Certificates are a floor. What matters is what they did in the first twenty minutes. (#top p.hero__p.in) | 16 / 24.8px / 2 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Your hiring manager sets the bar. An expert in the field assesses the evidence before we send your team the shortlist. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Example priorities for this function (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P A CV lists experience. An expert conversation explores the decisions, trade-offs and outcomes behind it. (#misses p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P These examples show what we explore. The actual questions follow the candidate's experience and the requirements of your role. (#asks p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P We agree the requirements with your hiring manager. Your team interviews the shortlist and makes the hiring decision. (#roles p.dek) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek.in) | 16 / 25.6px / 4 | not present | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek.in) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P We agree the requirements with your hiring manager. Your team interviews the shortlist and makes the hiring decision. (#roles p.dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek) | not present | 16 / 25.6px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 37. /industries/

Industry index: same near-equal hero/section hierarchy; preserve taxonomy/card labels.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 The sector changeswhat the role demands. (#top h1.h1.in) | 33.28 / 35.9424px / 3 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Twelve sectors, twelve different bars. (#all h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 The method is the same in all twelve. (#same h2.h2) | 32 / 34.56px / 2 | not present | not present | Fraunces, Georgia, serif / 500 / left |
| H2 We cover more than we list, but not everything. (#contact h2.h2.in) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |
| H2 The method is the same in all twelve. (#same h2.h2.in) | not present | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Industries (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P Two engineers share a title, nothing else.The method is identical everywhere.The weighting is not. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 3 | 16.72 / 25.916px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P We start with what your sector demands, and what happens when a hire gets it wrong. (#top p.hero__p.in) | 16 / 24.8px / 2 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P One title, any two sectors (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P The six bars on each card illustrate that sector’s priorities: the tall red one is what it punishes hardest when someone gets it wrong.Scan them and the clusters show up on their own. (#all p.dek.in) | 16 / 24.8px / 5 | 16 / 24.8px / 3 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Sector context changes the weighting, the questions and who does the interviewing. It never changes how the decision gets made, or who makes it. (#same p.fn__dek) | 16 / 24.8px / 4 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the sector and the mandate. If it isn’t our ground we will say so on the first call, which is cheaper for both of us than finding out in week three. (#contact p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Sector context changes the weighting, the questions and who does the interviewing. It never changes how the decision gets made, or who makes it. (#same p.fn__dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |


## 38. /industries/ai-data/

Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 We hire on whether they measured it after it shipped. (#top h1.h1.in) | 33.28 / 35.9424px / 3 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Things a CV cannot tell you. (#misses h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2.in) | 32 / 34.56px / 3 | not present | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 What teams ask first. (#faq h2.h2) | 32 / 34.56px / 1 | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2) | 32 / 34.56px / 2 | not present | not present | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2) | not present | 32 / 34.56px / 2 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2.in) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 What teams ask first. (#faq h2.h2.in) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2.in) | not present | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P AI & data (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P Building the model is the easy half. The people worth hiring are the ones who watched it afterwards. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Your hiring manager sets the bar. An expert in the field assesses the evidence before we send your team the shortlist. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Example priorities for this sector (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P None of these are exotic. They are simply invisible to anyone assessing from outside the sector, which is most of the people doing the assessing. (#misses p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Questions are shaped by the role and the candidate’s experience, so these are shapes rather than a script. The second column is the part a generic interviewer cannot supply. (#asks p.dek.in) | 16 / 24.8px / 4 | not present | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek) | 16 / 24.8px / 2 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek.in) | 16 / 25.6px / 4 | not present | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek) | 16 / 24.8px / 2 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Questions are shaped by the role and the candidate’s experience, so these are shapes rather than a script. The second column is the part a generic interviewer cannot supply. (#asks p.dek) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek.in) | not present | 16 / 24.8px / 1 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek) | not present | 16 / 25.6px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek.in) | not present | 16 / 24.8px / 1 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 39. /industries/banking-financial-services/

Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Where the wronghire costs morethan a quarter. (#top h1.h1.in) | 33.28 / 35.9424px / 3 | 34.41 / 37.1589px / 3 | 53.12 / 57.3696px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Four things a CV cannot tell you. (#misses h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2.in) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 What teams ask first. (#faq h2.h2) | 32 / 34.56px / 1 | not present | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2.in) | 32 / 34.56px / 2 | not present | not present | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 What teams ask first. (#faq h2.h2.in) | not present | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2) | not present | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2) | not present | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Banking & financial services (#top p.eyebrow.eyebrow--red.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P Your hiring manager sets the bar. An expert in the field assesses the evidence before we send your team the shortlist. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P In this sector the bar leans hard in one direction, and it is not the one most tech interviews test. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Example priorities for this sector (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P None of these are exotic. They are simply invisible to anyone assessing from outside the sector, which is most of the people doing the assessing. (#misses p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Questions are shaped by the role and the candidate’s experience, so these are shapes rather than a script. The second column is the part a generic interviewer cannot supply. (#asks p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek.in) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek.in) | 16 / 25.6px / 4 | 16 / 25.6px / 2 | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek) | 16 / 24.8px / 2 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek.in) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek.in) | not present | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek) | not present | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |


## 40. /industries/consumer-digital-commerce/

Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 We hire on taste, and whether they can defend it. (#top h1.h1.in) | 33.28 / 35.9424px / 3 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Things a CV cannot tell you. (#misses h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2.in) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2.in) | 32 / 34.56px / 2 | not present | not present | Fraunces, Georgia, serif / 500 / left |
| H2 What teams ask first. (#faq h2.h2.in) | 32 / 34.56px / 1 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2) | not present | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2) | not present | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Consumer & digital commerce (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P Where speed, judgment and commercial instinct all have to survive in the same person. (#top p.hero__p.in) | 16 / 24.8px / 2 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Your hiring manager sets the bar. An expert in the field assesses the evidence before we send your team the shortlist. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Example priorities for this sector (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P None of these are exotic. They are simply invisible to anyone assessing from outside the sector, which is most of the people doing the assessing. (#misses p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Questions are shaped by the role and the candidate’s experience, so these are shapes rather than a script. The second column is the part a generic interviewer cannot supply. (#asks p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek.in) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek.in) | 16 / 25.6px / 4 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek.in) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek) | not present | 16 / 25.6px / 2 | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek) | not present | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 41. /industries/cybersecurity/

Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 We hire on what they did in the first twenty minutes. (#top h1.h1.in) | 33.28 / 35.9424px / 3 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Things a CV cannot tell you. (#misses h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2.in) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2) | 32 / 34.56px / 2 | not present | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 What teams ask first. (#faq h2.h2) | 32 / 34.56px / 1 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2.in) | not present | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2.in) | not present | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Cybersecurity (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P Certificates are a floor. What matters is what they did in the first twenty minutes. (#top p.hero__p.in) | 16 / 24.8px / 2 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Your hiring manager sets the bar. An expert in the field assesses the evidence before we send your team the shortlist. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Example priorities for this sector (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P None of these are exotic. They are simply invisible to anyone assessing from outside the sector, which is most of the people doing the assessing. (#misses p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Questions are shaped by the role and the candidate’s experience, so these are shapes rather than a script. The second column is the part a generic interviewer cannot supply. (#asks p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek) | 16 / 24.8px / 2 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek.in) | 16 / 25.6px / 4 | 16 / 25.6px / 2 | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek.in) | 16 / 24.8px / 3 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek.in) | not present | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 42. /industries/enterprise-technology/

Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 We hire on what shipped, not what was described. (#top h1.h1.in) | 33.28 / 35.9424px / 3 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Things a CV cannot tell you. (#misses h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2.in) | 32 / 34.56px / 3 | not present | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 What teams ask first. (#faq h2.h2.in) | 32 / 34.56px / 1 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2) | not present | 32 / 34.56px / 2 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2) | not present | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2) | not present | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Enterprise technology (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P Engineering and product people who have actually put something into production and lived with it afterwards. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Your hiring manager sets the bar. An expert in the field assesses the evidence before we send your team the shortlist. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Example priorities for this sector (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P None of these are exotic. They are simply invisible to anyone assessing from outside the sector, which is most of the people doing the assessing. (#misses p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Questions are shaped by the role and the candidate’s experience, so these are shapes rather than a script. The second column is the part a generic interviewer cannot supply. (#asks p.dek.in) | 16 / 24.8px / 4 | not present | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek.in) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek) | 16 / 25.6px / 4 | 16 / 25.6px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek.in) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Questions are shaped by the role and the candidate’s experience, so these are shapes rather than a script. The second column is the part a generic interviewer cannot supply. (#asks p.dek) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek) | not present | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek.in) | not present | not present | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek) | not present | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 43. /industries/global-capability-centres/

Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 We hire on who actually owned the decision. (#top h1.h1.in) | 33.28 / 35.9424px / 3 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Things a CV cannot tell you. (#misses h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2.in) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 What teams ask first. (#faq h2.h2.in) | 32 / 34.56px / 1 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2) | not present | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 We hire like you think. (#why h2.h2.in) | not present | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Global capability centres (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P Built for GCCs scaling in India, where the difference between a delivery centre and a capability centre is decision rights. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Your hiring manager sets the bar. An expert in the field assesses the evidence before we send your team the shortlist. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Example priorities for this sector (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P None of these are exotic. They are simply invisible to anyone assessing from outside the sector, which is most of the people doing the assessing. (#misses p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Questions are shaped by the role and the candidate’s experience, so these are shapes rather than a script. The second column is the part a generic interviewer cannot supply. (#asks p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek.in) | 16 / 24.8px / 2 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek.in) | 16 / 25.6px / 4 | 16 / 25.6px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek.in) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek) | not present | 16 / 24.8px / 1 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek) | not present | not present | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |


## 44. /industries/healthcare-life-sciences/

Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 We hire on judgment when the guidance runs out. (#top h1.h1.in) | 33.28 / 35.9424px / 3 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Things a CV cannot tell you. (#misses h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2.in) | 32 / 34.56px / 3 | not present | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 What teams ask first. (#faq h2.h2) | 32 / 34.56px / 1 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2) | not present | 32 / 34.56px / 2 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2.in) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2.in) | not present | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Healthcare & life sciences (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P Clinical, regulatory and commercial, and the ability to hold all three when they disagree. (#top p.hero__p.in) | 16 / 24.8px / 2 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Your hiring manager sets the bar. An expert in the field assesses the evidence before we send your team the shortlist. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Example priorities for this sector (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P None of these are exotic. They are simply invisible to anyone assessing from outside the sector, which is most of the people doing the assessing. (#misses p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Questions are shaped by the role and the candidate’s experience, so these are shapes rather than a script. The second column is the part a generic interviewer cannot supply. (#asks p.dek.in) | 16 / 24.8px / 4 | not present | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek) | 16 / 24.8px / 2 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek.in) | 16 / 25.6px / 4 | 16 / 25.6px / 2 | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Questions are shaped by the role and the candidate’s experience, so these are shapes rather than a script. The second column is the part a generic interviewer cannot supply. (#asks p.dek) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek.in) | not present | 16 / 24.8px / 1 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 45. /industries/industrial-engineering/

Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 We hire on the project that overran, and why. (#top h1.h1.in) | 33.28 / 35.9424px / 3 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Things a CV cannot tell you. (#misses h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2.in) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 What teams ask first. (#faq h2.h2.in) | 32 / 34.56px / 1 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2) | not present | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Industrial & engineering (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P Technical depth for work that gets built once and has to be right. (#top p.hero__p.in) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Your hiring manager sets the bar. An expert in the field assesses the evidence before we send your team the shortlist. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Example priorities for this sector (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P None of these are exotic. They are simply invisible to anyone assessing from outside the sector, which is most of the people doing the assessing. (#misses p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Questions are shaped by the role and the candidate’s experience, so these are shapes rather than a script. The second column is the part a generic interviewer cannot supply. (#asks p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek.in) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek.in) | 16 / 25.6px / 4 | not present | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek.in) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek) | not present | 16 / 25.6px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek) | not present | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek) | not present | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 46. /industries/manufacturing/

Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 We hire on time on the floor, not time in the plan. (#top h1.h1.in) | 33.28 / 35.9424px / 3 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Things a CV cannot tell you. (#misses h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2) | 32 / 34.56px / 3 | not present | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 What teams ask first. (#faq h2.h2.in) | 32 / 34.56px / 1 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2.in) | not present | 32 / 34.56px / 2 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2.in) | not present | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 What teams ask first. (#faq h2.h2) | not present | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Manufacturing (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P Operations, engineering and quality leaders who have run plants rather than reported on them. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Your hiring manager sets the bar. An expert in the field assesses the evidence before we send your team the shortlist. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Example priorities for this sector (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P None of these are exotic. They are simply invisible to anyone assessing from outside the sector, which is most of the people doing the assessing. (#misses p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Questions are shaped by the role and the candidate’s experience, so these are shapes rather than a script. The second column is the part a generic interviewer cannot supply. (#asks p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek.in) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek.in) | 16 / 25.6px / 4 | not present | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek.in) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek) | not present | 16 / 25.6px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Questions are shaped by the role and the candidate’s experience, so these are shapes rather than a script. The second column is the part a generic interviewer cannot supply. (#asks p.dek) | not present | not present | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek) | not present | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |


## 47. /industries/pharmaceutical/

Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 We hire on what they did while the data was still ambiguous. (#top h1.h1.in) | 33.28 / 35.9424px / 3 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Things a CV cannot tell you. (#misses h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2.in) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 What teams ask first. (#faq h2.h2.in) | 32 / 34.56px / 1 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 We hire like you think. (#why h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2) | not present | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2) | not present | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Pharmaceutical (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P Precision is the whole job, and precision under uncertainty is the part that cannot be taught quickly. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Your hiring manager sets the bar. An expert in the field assesses the evidence before we send your team the shortlist. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Example priorities for this sector (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P None of these are exotic. They are simply invisible to anyone assessing from outside the sector, which is most of the people doing the assessing. (#misses p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Questions are shaped by the role and the candidate’s experience, so these are shapes rather than a script. The second column is the part a generic interviewer cannot supply. (#asks p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek.in) | 16 / 24.8px / 2 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek.in) | 16 / 25.6px / 4 | 16 / 25.6px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek.in) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek) | not present | 16 / 24.8px / 1 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek) | not present | not present | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek) | not present | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 48. /industries/private-equity-portfolio/

Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 We hire on decision speed under a value-creation clock. (#top h1.h1.in) | 33.28 / 35.9424px / 3 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Things a CV cannot tell you. (#misses h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2.in) | 32 / 34.56px / 3 | not present | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 What teams ask first. (#faq h2.h2.in) | 32 / 34.56px / 1 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2) | 32 / 34.56px / 2 | not present | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2) | not present | 32 / 34.56px / 2 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 We hire like you think. (#why h2.h2.in) | not present | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2) | not present | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2.in) | not present | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 What teams ask first. (#faq h2.h2) | not present | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Private equity portfolio (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P Value-creation timelines are real and short. Hiring has to move faster than they do. (#top p.hero__p.in) | 16 / 24.8px / 2 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Your hiring manager sets the bar. An expert in the field assesses the evidence before we send your team the shortlist. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Example priorities for this sector (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P None of these are exotic. They are simply invisible to anyone assessing from outside the sector, which is most of the people doing the assessing. (#misses p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Questions are shaped by the role and the candidate’s experience, so these are shapes rather than a script. The second column is the part a generic interviewer cannot supply. (#asks p.dek.in) | 16 / 24.8px / 4 | not present | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek.in) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek.in) | 16 / 25.6px / 4 | not present | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek.in) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Questions are shaped by the role and the candidate’s experience, so these are shapes rather than a script. The second column is the part a generic interviewer cannot supply. (#asks p.dek) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek) | not present | 16 / 25.6px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek) | not present | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek) | not present | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |


## 49. /industries/product-saas/

Coverage detail: primary H2 nearly equals H1 on mobile; long heading measures and 20px trust subtitle need shared role review.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Hire product thinkers, not just product managers. (#top h1.h1.in) | 33.28 / 35.9424px / 3 | 34.41 / 37.1589px / 2 | 53.12 / 57.3696px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Things a CV cannot tell you. (#misses h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Three questions, and what a thin answer sounds like. (#asks h2.h2.in) | 32 / 34.56px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2.in) | 32 / 34.56px / 2 | not present | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Operators, not recruiters. (#who h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 What teams ask first. (#faq h2.h2.in) | 32 / 34.56px / 1 | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us the role. Three names in 36 hours. (#contact h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |
| H2 We hire like you think. (#why h2.h2.in) | 32 / 34.56px / 2 | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Every level, one guarantee. (#roles h2.h2) | not present | 32 / 34.56px / 1 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 We hire like you think. (#why h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |
| H2 What teams ask first. (#faq h2.h2) | not present | not present | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Product & SaaS (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P The difference shows in what they killed, what they refused, and what they were wrong about. (#top p.hero__p.in) | 16 / 24.8px / 2 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Your hiring manager sets the bar. An expert in the field assesses the evidence before we send your team the shortlist. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Example priorities for this sector (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P None of these are exotic. They are simply invisible to anyone assessing from outside the sector, which is most of the people doing the assessing. (#misses p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Questions are shaped by the role and the candidate’s experience, so these are shapes rather than a script. The second column is the part a generic interviewer cannot supply. (#asks p.dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek.in) | 16 / 24.8px / 2 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P The distinction this whole page rests on. Every interview here is run by someone who has held the job, and they only interview on ground they have actually worked. (#who p.trust__dek.in) | 16 / 25.6px / 4 | 16 / 25.6px / 2 | 20 / 32px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek.in) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Tell us the role and what matters most. We confirm expert coverage, timing and the terms of the engagement before work begins. (#contact p.fn__dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Our process is shaped by the mandates we run and the people we hire. Every step is designed to find the right person, not just any person. (#why p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Interview three, hire one; if none of the three fit, we restart at no cost. (#roles p.dek) | not present | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Answered here so the first call can be about your role rather than about us. (#faq p.dek) | not present | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |


## 50. /intelligence/

Intelligence: 62px four-line desktop hero; root-size drift accounts for 30px mobile H2. Review hierarchy/measure, not an invented local H2 override.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 We score every interview.So we can tell you what is scarce. (#top h1.h1.in) | 36 / 38.88px / 4 | 36 / 38.88px / 3 | 62 / 66.96px / 4 | Fraunces, Georgia, serif / 500 / left |
| H2 Four things the scores say that CVs do not. (#fail h2.h2.in) | 30 / 32.4px / 2 | 32 / 34.56px / 2 | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Who is actually available, and whether they are any good. (#avail h2.h2.in) | 30 / 32.4px / 3 | 32 / 34.56px / 2 | 48 / 51.84px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 The method, so you can argue with it. (#method h2.h2.in) | 30 / 32.4px / 2 | not present | 48 / 51.84px / 2 | Fraunces, Georgia, serif / 500 / left |
| H2 Updated every quarter. Yours either way. (#contact h2.h2.in) | 30 / 32.4px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |
| H2 The method, so you can argue with it. (#method h2.h2) | not present | 32 / 34.56px / 1 | not present | Fraunces, Georgia, serif / 500 / left |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Talent intelligence (#top p.eyebrow.eyebrow--red.in) | 8.4 / 13.44px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P Most market reports count salaries and headcount. We can tell you which signal is hardest to find in a given pool, because every interview we run is scored against a written rubric and kept. (#top p.hero__p.in) | 16 / 24.8px / 5 | 16 / 24.8px / 3 | 16.72 / 25.916px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Free, updated quarterly, and useful whether or not you ever brief us. (#top p.hero__p.in) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P What is scarce, by function (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P Each of these came out of running the same rubric across thousands of interviews. None of them are visible from a single search. (#fail p.dek.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Everyone publishes notice-period counts. The second number is the one that matters: what share of that band clears a real bar. (#avail p.dek) | 16 / 24.8px / 3 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Understand the sample before using the numbers. Here is what the assessment records, and where its limits are. (#method p.fn__dek.in) | 16 / 24.8px / 3 | not present | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P We publish this because it is the by-product of doing the work properly. If it is useful and you never brief us, that is still a reasonable outcome. (#contact p.dek) | 16 / 24.8px / 4 | not present | not present | "Inter Tight", -apple-system, sans-serif / 400 / center |
| P Everyone publishes notice-period counts. The second number is the one that matters: what share of that band clears a real bar. (#avail p.dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Understand the sample before using the numbers. Here is what the assessment records, and where its limits are. (#method p.fn__dek) | not present | 16 / 24.8px / 2 | not present | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P We publish this because it is the by-product of doing the work properly. If it is useful and you never brief us, that is still a reasonable outcome. (#contact p.dek.in) | not present | 16 / 24.8px / 2 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 51. /privacy/

Legal document: retain smaller document subheads; do not apply marketing H2 globally.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Privacy Policy (section.legal-document h1.v58-heading.v58-heading--h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 Interpretation and Definitions (section.legal-document #interpretation-and-definitions) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Definitions (section.legal-document #definitions) | 18.75 / 24.375px / 1 | 20 / 26px / 1 | 20 / 26px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 1. Information We Collect (section.legal-document #1-information-we-collect) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Personal Data (section.legal-document #personal-data) | 18.75 / 24.375px / 1 | 20 / 26px / 1 | 20 / 26px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Automatically Collected Data (section.legal-document #automatically-collected-data) | 18.75 / 24.375px / 1 | 20 / 26px / 1 | 20 / 26px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 2. Cookies and Tracking Technologies (section.legal-document #2-cookies-and-tracking-technologies) | 22.5 / 27px / 2 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 3. How We Use Your Data (section.legal-document #3-how-we-use-your-data) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 4. Data Sharing (section.legal-document #4-data-sharing) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 5. Data Retention (section.legal-document #5-data-retention) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 6. Data Security (section.legal-document #6-data-security) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 7. Your Rights (section.legal-document #7-your-rights) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 8. Third-Party Links (section.legal-document #8-third-party-links) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 9. Children’s Privacy (section.legal-document #9-childrens-privacy) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 10. Changes to This Policy (section.legal-document #10-changes-to-this-policy) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 11. Contact Us (section.legal-document #11-contact-us) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P We may collect the following personal information: (section.legal-document p) | 16 / 28px / 2 | 16 / 28px / 1 | 16 / 28px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P We collect Usage Data including: (section.legal-document p) | 16 / 28px / 1 | 16 / 28px / 1 | 16 / 28px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P We use cookies and related tracking technologies to improve user experience. These may include: (section.legal-document p) | 16 / 28px / 3 | 16 / 28px / 2 | 16 / 28px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P We may use your information to: (section.legal-document p) | 16 / 28px / 1 | 16 / 28px / 1 | 16 / 28px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P We may share your data under the following circumstances: (section.legal-document p) | 16 / 28px / 2 | 16 / 28px / 1 | 16 / 28px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P We retain your data only for as long as necessary: (section.legal-document p) | 16 / 28px / 2 | 16 / 28px / 1 | 16 / 28px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P We use appropriate security measures to protect your information. However, no system can be guaranteed 100% secure. We encourage you to use strong passwords and limit access to your device. (section.legal-document p) | 16 / 28px / 5 | 16 / 28px / 3 | 16 / 28px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Depending on your jurisdiction, you may have the right to: (section.legal-document p) | 16 / 28px / 2 | 16 / 28px / 1 | 16 / 28px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Our site may contain links to external websites. We are not responsible for their content or privacy practices. Please review their policies before submitting personal data. (section.legal-document p) | 16 / 28px / 4 | 16 / 28px / 2 | 16 / 28px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Our Service is not intended for users under the age of 18. We do not knowingly collect data from minors. If you believe a minor has submitted data to us, contact us immediately. (section.legal-document p) | 16 / 28px / 4 | 16 / 28px / 2 | 16 / 28px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised “Last updated” date. (section.legal-document p) | 16 / 28px / 3 | 16 / 28px / 2 | 16 / 28px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P For questions, requests, or concerns regarding this Privacy Policy: (section.legal-document p) | 16 / 28px / 2 | 16 / 28px / 1 | 16 / 28px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 52. /security/

Legal document: retain smaller document subheads; do not apply marketing H2 globally.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Security (section.legal-document h1.v58-heading.v58-heading--h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 Reporting a Security Issue (section.legal-document #reporting-a-security-issue) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 What to Expect (section.legal-document #what-to-expect) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 Scope and Boundaries (section.legal-document #scope-and-boundaries) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 Bug Bounty (section.legal-document #bug-bounty) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 Legal (section.legal-document #legal) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P If you believe you have found a security issue on tribera.ai, email us at security@tribera.ai. (section.legal-document p) | 16 / 28px / 2 | 16 / 28px / 1 | 16 / 28px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Please do not: (section.legal-document p) | 16 / 28px / 1 | 16 / 28px / 1 | 16 / 28px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P We do not currently run a public bug bounty program. If you send us a report, please do so with the understanding that there is no promise of payment or reward. (section.legal-document p) | 16 / 28px / 4 | 16 / 28px / 2 | 16 / 28px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P This page is meant to provide a clear path for good-faith security reporting. It does not grant permission to test beyond what is allowed by law or our Terms. (section.legal-document p) | 16 / 28px / 4 | 16 / 28px / 2 | 16 / 28px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 53. /services/

Services: deliverables heading and subtitle have different left edges and conflicting centering/nowrap rules. Card .lead paragraphs are not section subtitles.

Root sizes (mobile/tablet/desktop): 16px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Hire the people,or hand us the work. (#top h1.h1.in) | 36 / 38.88px / 3 | 36 / 38.88px / 2 | 62 / 66.96px / 3 | Fraunces, Georgia, serif / 500 / left |
| H2 Start where hiring gets stuck. (#deliverables h2.h2.in) | 32 / 34.56px / 2 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / left |
| H2 Tell us what is broken, not what you want to buy. (#contact h2.h2.in) | 32 / 34.56px / 3 | 32 / 34.56px / 1 | 48 / 51.84px / 1 | Fraunces, Georgia, serif / 500 / center |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Services (#top p.eyebrow.in) | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | 8.96 / 14.336px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / left |
| P Find the people you need, get an expert assessment of your candidates, or bring in a team to do the work while you hire. (#top p.hero__p.in) | 16 / 24.8px / 3 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Start with the problem. We agree the scope, outputs, timing and price before work begins. (#top p.hero__p.in) | 16 / 24.8px / 2 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Start with what is actually wrong (#top p.feat__k) | 10 / 16px / 1 | 10 / 16px / 1 | 10 / 16px / 1 | "JetBrains Mono", ui-monospace, Menlo, monospace / 400 / start |
| P Agree the role, revisit your pipeline, or find someone new. These four services are the starting points. Specialist engagements follow below. (#deliverables p.fn__dek.in) | 16 / 24.8px / 4 | 16 / 24.8px / 2 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / left |
| P Role scorecard (#deliverables p.lead__n) | 24 / 30px / 1 | 24 / 30px / 1 | 24 / 30px / 1 | Fraunces, Georgia, serif / 500 / start |
| P You give us 45 minutes with the hiring manager. (#deliverables p.lead__give) | 14.4 / 21.6px / 2 | 14.4 / 21.6px / 1 | 14.4 / 21.6px / 1 | "Inter Tight", -apple-system, sans-serif / 600 / start |
| P A scorecard everyone agrees on, plus the interview guide. (#deliverables p.lead__get) | 14.4 / 21.6px / 2 | 14.4 / 21.6px / 1 | 14.4 / 21.6px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Most stuck searches are stuck here, and two days is all it takes to find out. (#deliverables p.lead__why) | 14.4 / 21.6px / 2 | 14.4 / 21.6px / 1 | 14.4 / 21.6px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Pipeline review (#deliverables p.lead__n) | 24 / 30px / 1 | 24 / 30px / 1 | 24 / 30px / 1 | Fraunces, Georgia, serif / 500 / start |
| P You give us the CVs you already rejected. (#deliverables p.lead__give) | 14.4 / 21.6px / 1 | 14.4 / 21.6px / 1 | 14.4 / 21.6px / 1 | "Inter Tight", -apple-system, sans-serif / 600 / start |
| P A ranked shortlist, and whether you missed someone. (#deliverables p.lead__get) | 14.4 / 21.6px / 2 | 14.4 / 21.6px / 1 | 14.4 / 21.6px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Roughly a third of the time, the hire is already sitting in the pile you rejected. (#deliverables p.lead__why) | 14.4 / 21.6px / 2 | 14.4 / 21.6px / 1 | 14.4 / 21.6px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Permanent hire (#deliverables p.lead__n) | 24 / 30px / 1 | 24 / 30px / 1 | 24 / 30px / 1 | Fraunces, Georgia, serif / 500 / start |
| P You give us a role. (#deliverables p.lead__give) | 14.4 / 21.6px / 1 | 14.4 / 21.6px / 1 | 14.4 / 21.6px / 1 | "Inter Tight", -apple-system, sans-serif / 600 / start |
| P Three people to interview. They join your payroll. (#deliverables p.lead__get) | 14.4 / 21.6px / 2 | 14.4 / 21.6px / 1 | 14.4 / 21.6px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P For a role or two. Hiring more regularly? We will discuss whether an ongoing engagement fits better. (#deliverables p.lead__why) | 14.4 / 21.6px / 3 | 14.4 / 21.6px / 2 | 14.4 / 21.6px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Contract hire (#deliverables p.lead__n) | 24 / 30px / 1 | 24 / 30px / 1 | 24 / 30px / 1 | Fraunces, Georgia, serif / 500 / start |
| P You give us a skill gap and a duration. (#deliverables p.lead__give) | 14.4 / 21.6px / 1 | 14.4 / 21.6px / 1 | 14.4 / 21.6px / 1 | "Inter Tight", -apple-system, sans-serif / 600 / start |
| P We find them, we employ them, they work in your team. (#deliverables p.lead__get) | 14.4 / 21.6px / 2 | 14.4 / 21.6px / 1 | 14.4 / 21.6px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P We do the finding — this is not payrolling someone you sourced. Same scorecard and same expert interview as a permanent hire; the only thing that changes is whose books they sit on. (#deliverables p.lead__why) | 14.4 / 21.6px / 5 | 14.4 / 21.6px / 2 | 14.4 / 21.6px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P A confidential retained search for a leadership seat, with a shortlist and the reasoning you can take to a board. (#deliverables p.oc__lead) | 14 / 21.7px / 3 | 14 / 21.7px / 1 | 14 / 21.7px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P We run your hiring function end to end: our recruiters and senior experts, your scorecards, your payroll at the end of it. (#deliverables p.oc__lead) | 14 / 21.7px / 3 | 14 / 21.7px / 2 | 14 / 21.7px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P A team assembled from our bench, a defined scope, and a delivery date. We run it; you review it. (#deliverables p.oc__lead) | 14 / 21.7px / 2 | 14 / 21.7px / 1 | 14 / 21.7px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P A team in India that becomes yours. We hire it against your scorecard, run it while it matures, and transfer it to your entity on a date agreed in the contract. (#deliverables p.oc__lead) | 14 / 21.7px / 3 | 14 / 21.7px / 2 | 14 / 21.7px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Candidates you already have — a shortlist of three, or the whole pool arriving from vendors, referrals and your own sourcing. Every one interviewed by a senior expert and scored against the same bar. (#deliverables p.oc__lead) | 14 / 21.7px / 4 | 14 / 21.7px / 2 | 14 / 21.7px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Your existing team, assessed against the standard you would hire to today. (#deliverables p.oc__lead) | 14 / 21.7px / 2 | 14 / 21.7px / 1 | 14 / 21.7px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Scorecards for every level in a role family, plus a calibration workshop for your interview panel. (#deliverables p.oc__lead) | 14 / 21.7px / 2 | 14 / 21.7px / 1 | 14 / 21.7px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P A written analysis of what your hiring process has been systematically missing, with the evidence behind it. (#deliverables p.oc__lead) | 14 / 21.7px / 3 | 14 / 21.7px / 1 | 14 / 21.7px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P The first call is forty-five minutes and diagnostic.If the answer is that you need none of this, we will say so; that has happened, and it is a better outcome than a wasted quarter. (#contact p.dek.in) | 16 / 24.8px / 5 | 16 / 24.8px / 3 | 16.72 / 25.916px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / center |


## 54. /tag/ai-in-hiring/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 AI In Hiring (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Designing AI for High-Stakes Technical Assessment (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 2 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P What an assessment engine should do, where human judgment belongs, and why a score needs evidence you can question. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 3 | 15 / 25.8px / 2 | 15 / 25.8px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 55. /tag/candidate-experience/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Candidate Experience (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Designing for Trust: Privacy, Transparency, and Professional Respect (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 4 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |
| H3 When Job Hunting Feels Like a Black Hole: How to Take Back Control (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 3 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Trust is built into Tribera’s architecture. Here’s how we protect professional privacy while enabling structured, transparent hiring conversations. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 4 | 15 / 25.8px / 4 | 15 / 25.8px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Job hunting shouldn’t feel like an endless loop of waiting and silence. Backed by research from McKinsey, Deloitte, and PwC, here’s how candidates can reclaim their time, protect their energy, and land interviews smarter. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 6 | 15 / 25.8px / 6 | 15 / 25.8px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 56. /tag/decision-infrastructure/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Decision Infrastructure (#top h1) | 31.2 / 33.696px / 2 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Rethinking hiring metrics: What 200,000 interviews taught us about signal efficiency (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 4 | 24 / 27.6px / 4 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |
| H3 Designing AI for High-Stakes Technical Assessment (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 3 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Time-to-hire measures pace. Interview-to-hire ratios reveal alignment. Insights from 200,000 structured interviews across domains. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 4 | 15 / 25.8px / 4 | 15 / 25.8px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P What an assessment engine should do, where human judgment belongs, and why a score needs evidence you can question. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 3 | 15 / 25.8px / 3 | 15 / 25.8px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 57. /tag/empathy/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Empathy (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Hiring Is Not a Transaction — It’s a Relationship (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 2 | 24 / 27.6px / 1 | 24 / 27.6px / 1 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P When hiring becomes transactional, we lose trust. At Tribera, we build belonging, empathy and clarity into every process. It’s not about closing roles — it’s about opening relationships. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 5 | 15 / 25.8px / 3 | 15 / 25.8px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 58. /tag/engineering/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Engineering (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Designing AI for High-Stakes Technical Assessment (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 2 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P What an assessment engine should do, where human judgment belongs, and why a score needs evidence you can question. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 3 | 15 / 25.8px / 2 | 15 / 25.8px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 59. /tag/hiring-insights/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Hiring Insights (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 When Job Hunting Feels Like a Black Hole: How to Take Back Control (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 2 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Job hunting shouldn’t feel like an endless loop of waiting and silence. Backed by research from McKinsey, Deloitte, and PwC, here’s how candidates can reclaim their time, protect their energy, and land interviews smarter. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 6 | 15 / 25.8px / 3 | 15 / 25.8px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 60. /tag/hiring-metrics/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Hiring Metrics (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Rethinking hiring metrics: What 200,000 interviews taught us about signal efficiency (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 4 | 24 / 27.6px / 2 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Time-to-hire measures pace. Interview-to-hire ratios reveal alignment. Insights from 200,000 structured interviews across domains. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 4 | 15 / 25.8px / 2 | 15 / 25.8px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 61. /tag/human-first-hiring/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Human First Hiring (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Hiring Is Not a Transaction — It’s a Relationship (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 2 | 24 / 27.6px / 1 | 24 / 27.6px / 1 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P When hiring becomes transactional, we lose trust. At Tribera, we build belonging, empathy and clarity into every process. It’s not about closing roles — it’s about opening relationships. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 5 | 15 / 25.8px / 3 | 15 / 25.8px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 62. /tag/job-search-tips/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Job Search Tips (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 When Job Hunting Feels Like a Black Hole: How to Take Back Control (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 2 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Job hunting shouldn’t feel like an endless loop of waiting and silence. Backed by research from McKinsey, Deloitte, and PwC, here’s how candidates can reclaim their time, protect their energy, and land interviews smarter. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 6 | 15 / 25.8px / 3 | 15 / 25.8px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 63. /tag/platform-design/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Platform Design (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Designing for Trust: Privacy, Transparency, and Professional Respect (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 2 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Trust is built into Tribera’s architecture. Here’s how we protect professional privacy while enabling structured, transparent hiring conversations. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 4 | 15 / 25.8px / 2 | 15 / 25.8px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 64. /tag/privacy-by-design/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Privacy By Design (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Designing for Trust: Privacy, Transparency, and Professional Respect (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 2 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Trust is built into Tribera’s architecture. Here’s how we protect professional privacy while enabling structured, transparent hiring conversations. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 4 | 15 / 25.8px / 2 | 15 / 25.8px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 65. /tag/professional-respect/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Professional Respect (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Designing for Trust: Privacy, Transparency, and Professional Respect (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 2 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Trust is built into Tribera’s architecture. Here’s how we protect professional privacy while enabling structured, transparent hiring conversations. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 4 | 15 / 25.8px / 2 | 15 / 25.8px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 66. /tag/quality-of-hire/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Quality Of Hire (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Rethinking hiring metrics: What 200,000 interviews taught us about signal efficiency (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 4 | 24 / 27.6px / 2 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Time-to-hire measures pace. Interview-to-hire ratios reveal alignment. Insights from 200,000 structured interviews across domains. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 4 | 15 / 25.8px / 2 | 15 / 25.8px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 67. /tag/recruitment/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Recruitment (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Signal vs Noise in Technical Hiring – Why Clarity Drives Speed (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 2 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Most hiring teams waste time evaluating candidates who should never have been in the process. Focusing on signal, structure and context helps companies hire faster — and better. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 5 | 15 / 25.8px / 3 | 15 / 25.8px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 68. /tag/signal-based-hiring/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Signal Based Hiring (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Signal vs Noise in Technical Hiring – Why Clarity Drives Speed (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 3 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |
| H3 Why Tech Hiring Really Takes So Long — And What We Learned From It (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 4 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Most hiring teams waste time evaluating candidates who should never have been in the process. Focusing on signal, structure and context helps companies hire faster — and better. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 5 | 15 / 25.8px / 5 | 15 / 25.8px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Most organisations believe engineering hiring is slow due to talent shortages — but this story reveals how clarity and signal turn a 327-profile search into a 22-day success. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 4 | 15 / 25.8px / 5 | 15 / 25.8px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 69. /tag/structured-evaluation/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Structured Evaluation (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Rethinking hiring metrics: What 200,000 interviews taught us about signal efficiency (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 4 | 24 / 27.6px / 4 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |
| H3 Designing AI for High-Stakes Technical Assessment (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 3 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Time-to-hire measures pace. Interview-to-hire ratios reveal alignment. Insights from 200,000 structured interviews across domains. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 4 | 15 / 25.8px / 4 | 15 / 25.8px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P What an assessment engine should do, where human judgment belongs, and why a score needs evidence you can question. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 3 | 15 / 25.8px / 3 | 15 / 25.8px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 70. /tag/talent-acquisition/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Talent Acquisition (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Rethinking hiring metrics: What 200,000 interviews taught us about signal efficiency (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 4 | 24 / 27.6px / 4 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |
| H3 Signal vs Noise in Technical Hiring – Why Clarity Drives Speed (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 3 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |
| H3 Why Tech Hiring Really Takes So Long — And What We Learned From It (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 4 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |
| H3 Hiring Is Not a Transaction — It’s a Relationship (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 2 | 24 / 27.6px / 3 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Time-to-hire measures pace. Interview-to-hire ratios reveal alignment. Insights from 200,000 structured interviews across domains. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 4 | 15 / 25.8px / 4 | 15 / 25.8px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Most hiring teams waste time evaluating candidates who should never have been in the process. Focusing on signal, structure and context helps companies hire faster — and better. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 5 | 15 / 25.8px / 5 | 15 / 25.8px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Most organisations believe engineering hiring is slow due to talent shortages — but this story reveals how clarity and signal turn a 327-profile search into a 22-day success. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 4 | 15 / 25.8px / 5 | 15 / 25.8px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P When hiring becomes transactional, we lose trust. At Tribera, we build belonging, empathy and clarity into every process. It’s not about closing roles — it’s about opening relationships. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 5 | 15 / 25.8px / 5 | 15 / 25.8px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 71. /tag/technical-assessment/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Technical Assessment (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Designing AI for High-Stakes Technical Assessment (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 2 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P What an assessment engine should do, where human judgment belongs, and why a score needs evidence you can question. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 3 | 15 / 25.8px / 2 | 15 / 25.8px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 72. /tag/technical-hiring/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Technical Hiring (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Signal vs Noise in Technical Hiring – Why Clarity Drives Speed (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 3 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |
| H3 Why Tech Hiring Really Takes So Long — And What We Learned From It (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 4 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Most hiring teams waste time evaluating candidates who should never have been in the process. Focusing on signal, structure and context helps companies hire faster — and better. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 5 | 15 / 25.8px / 5 | 15 / 25.8px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Most organisations believe engineering hiring is slow due to talent shortages — but this story reveals how clarity and signal turn a 327-profile search into a 22-day success. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 4 | 15 / 25.8px / 5 | 15 / 25.8px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 73. /tag/thought-leadership/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Thought Leadership (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Hiring Is Not a Transaction — It’s a Relationship (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 2 | 24 / 27.6px / 1 | 24 / 27.6px / 1 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P When hiring becomes transactional, we lose trust. At Tribera, we build belonging, empathy and clarity into every process. It’s not about closing roles — it’s about opening relationships. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 5 | 15 / 25.8px / 3 | 15 / 25.8px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 74. /tag/time-to-hire/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Time To Hire (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Why Tech Hiring Really Takes So Long — And What We Learned From It (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 2 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Most organisations believe engineering hiring is slow due to talent shortages — but this story reveals how clarity and signal turn a 327-profile search into a 22-day success. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 4 | 15 / 25.8px / 3 | 15 / 25.8px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 75. /tag/trust-in-hiring/

Topic listing: preserve hero/card distinction. H3 article cards are not section H2s; no blanket section-size fix here.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Trust In Hiring (#top h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Designing for Trust: Privacy, Transparency, and Professional Respect (section.band h3.blog-display.text-[1.5rem].font-[500].leading-[1.15].tracking-[-0.01em].text-black) | 22.5 / 25.875px / 3 | 24 / 27.6px / 2 | 24 / 27.6px / 2 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P Notes on hiring, assessment and the candidate experience. (#top p.hero__p) | 16 / 24.8px / 2 | 16 / 24.8px / 1 | 16.72 / 25.916px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Trust is built into Tribera’s architecture. Here’s how we protect professional privacy while enabling structured, transparent hiring conversations. (section.band p.blog-body.mt-3.text-[15px].leading-[1.72].text-black/58) | 15 / 25.8px / 4 | 15 / 25.8px / 2 | 15 / 25.8px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |


## 76. /terms/

Legal document: retain smaller document subheads; do not apply marketing H2 globally.

Root sizes (mobile/tablet/desktop): 15px / 16px / 16px.

### Heading Elements

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| H1 Terms and Conditions (section.legal-document h1.v58-heading.v58-heading--h1) | 31.2 / 33.696px / 1 | 34.41 / 37.1589px / 1 | 53.12 / 57.3696px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 Interpretation and Definitions (section.legal-document #interpretation-and-definitions) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Definitions (section.legal-document #definitions) | 18.75 / 24.375px / 1 | 20 / 26px / 1 | 20 / 26px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 Acknowledgment (section.legal-document #acknowledgment) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 Links to Other Websites (section.legal-document #links-to-other-websites) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 Termination (section.legal-document #termination) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 Limitation of Liability (section.legal-document #limitation-of-liability) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 AS IS and AS AVAILABLE Disclaimer (section.legal-document #as-is-and-as-available-disclaimer) | 22.5 / 27px / 2 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 Governing Law (section.legal-document #governing-law) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 Dispute Resolution (section.legal-document #dispute-resolution) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 Severability and Waiver (section.legal-document #severability-and-waiver) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Severability (section.legal-document #severability) | 18.75 / 24.375px / 1 | 20 / 26px / 1 | 20 / 26px / 1 | Fraunces, Georgia, serif / 500 / start |
| H3 Waiver (section.legal-document #waiver) | 18.75 / 24.375px / 1 | 20 / 26px / 1 | 20 / 26px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 Changes to These Terms (section.legal-document #changes-to-these-terms) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |
| H2 Contact Us (section.legal-document #contact-us) | 22.5 / 27px / 1 | 24 / 28.8px / 1 | 32 / 38.4px / 1 | Fraunces, Georgia, serif / 500 / start |

### Subtitle Candidates

| Text / context | 390px size / leading / lines | 768px size / leading / lines | 1520px size / leading / lines | Desktop font / weight / alignment |
|---|---|---|---|---|
| P For the purposes of these Terms and Conditions: (section.legal-document p) | 16 / 28px / 2 | 16 / 28px / 1 | 16 / 28px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P These Terms govern the relationship between You and tribera. By using our Website or Services, you agree to these Terms. If you do not agree, please do not use the platform. (section.legal-document p) | 16 / 28px / 4 | 16 / 28px / 2 | 16 / 28px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Our Service may contain links to third-party sites or services. tribera does not control or endorse the content, terms, or policies of those sites and is not responsible for any damages arising from your use of them. (section.legal-document p) | 16 / 28px / 5 | 16 / 28px / 3 | 16 / 28px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P We reserve the right to suspend or terminate your access to the Service at any time, without notice, if you violate these Terms or engage in conduct harmful to the platform or other users. (section.legal-document p) | 16 / 28px / 4 | 16 / 28px / 2 | 16 / 28px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P To the fullest extent permitted by applicable law, tribera and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages - including loss of profits, data, or goodwill - arising out of or in connection with your use of the Service. (section.legal-document p) | 16 / 28px / 6 | 16 / 28px / 3 | 16 / 28px / 3 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P The Service is provided on an “AS IS” and “AS AVAILABLE” basis. We do not make any warranties or representations, express or implied, regarding the reliability, availability, or accuracy of the Service. (section.legal-document p) | 16 / 28px / 5 | 16 / 28px / 3 | 16 / 28px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P These Terms shall be governed by the laws of India. Disputes arising out of these Terms shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka. (section.legal-document p) | 16 / 28px / 4 | 16 / 28px / 2 | 16 / 28px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P If you have any concern or complaint, you agree to first attempt to resolve it by contacting legal@tribera.ai. We aim to resolve issues fairly and promptly in compliance with Indian consumer and data protection laws. (section.legal-document p) | 16 / 28px / 5 | 16 / 28px / 3 | 16 / 28px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P If any provision of these Terms is held to be unenforceable, the remaining provisions shall remain in full force and effect. (section.legal-document p) | 16 / 28px / 3 | 16 / 28px / 2 | 16 / 28px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P Failure to enforce any right under these Terms does not constitute a waiver of that right or any future rights. (section.legal-document p) | 16 / 28px / 3 | 16 / 28px / 2 | 16 / 28px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P We may update these Terms from time to time. Changes will be posted on this page and take effect upon posting. Continued use of the Service means you accept the updated Terms. (section.legal-document p) | 16 / 28px / 4 | 16 / 28px / 2 | 16 / 28px / 2 | "Inter Tight", -apple-system, sans-serif / 400 / start |
| P For any questions regarding these Terms and Conditions, please contact: (section.legal-document p) | 16 / 28px / 2 | 16 / 28px / 1 | 16 / 28px / 1 | "Inter Tight", -apple-system, sans-serif / 400 / start |

