# Post-migration Route Inventory

Production browser audit: 76 routes, 228 viewport records at 390/768/1520px. No page-level horizontal overflow, browser exceptions or navigation failures. Explicit /404.html is served with HTTP200 by the static preview.

H2 columns include both marketing and intentionally smaller article/document roles. Card, metadata and ordinary paragraphs are not blanket subtitle roles. Full per-element geometry and screenshots remain in `/tmp/tribera-heading-after/`. The final regression test additionally covers320px.

| Route                                                    | Headings at desktop | H1 px mobile / desktop | H2 px mobile / desktop | Viewports |
| -------------------------------------------------------- | ------------------: | ---------------------- | ---------------------- | --------- |
| /                                                        |                  33 | 32 / 53.12             | 28 / 36                | Pass      |
| /404.html                                                |                   1 | 32 / 53.12             | none / none            | Pass      |
| /about/                                                  |                  10 | 32 / 53.12             | 28 / 36                | Pass      |
| /blog/                                                   |                   3 | 32 / 53.12             | 28 / 36                | Pass      |
| /blog/designing-ai-for-high-stakes-technical-assessment/ |                   7 | 32 / 53.12             | 24, 28 / 32, 36        | Pass      |
| /blog/designing-for-trust-privacy-transparency-respect/  |                   8 | 32 / 53.12             | 24, 28 / 32, 36        | Pass      |
| /blog/hiring-is-not-a-transaction-its-a-relationship/    |                   6 | 32 / 53.12             | 24, 28 / 32, 36        | Pass      |
| /blog/rethinking-hiring-metrics-signal-efficiency/       |                   7 | 32 / 53.12             | 24, 28 / 32, 36        | Pass      |
| /blog/signal-vs-noise-technical-hiring/                  |                   5 | 32 / 53.12             | 24, 28 / 32, 36        | Pass      |
| /blog/when-job-hunting-feels-like-a-black-hole/          |                   6 | 32 / 53.12             | 24, 28 / 32, 36        | Pass      |
| /blog/why-tech-hiring-really-takes-so-long/              |                   6 | 32 / 53.12             | 24, 28 / 32, 36        | Pass      |
| /candidates/                                             |                  27 | 32 / 53.12             | 28 / 36                | Pass      |
| /candidates/start/                                       |                   2 | 32 / 53.12             | 28 / 36                | Pass      |
| /careers/                                                |                  13 | 32 / 53.12             | 28 / 36                | Pass      |
| /careers/ai-ml-engineer/                                 |                   4 | 32 / 53.12             | 28 / 36                | Pass      |
| /careers/backend-engineer/                               |                   4 | 32 / 53.12             | 28 / 36                | Pass      |
| /careers/growth-intern/                                  |                   4 | 32 / 53.12             | 28 / 36                | Pass      |
| /careers/senior-delivery-partner/                        |                   4 | 32 / 53.12             | 28 / 36                | Pass      |
| /careers/software-intern/                                |                   4 | 32 / 53.12             | 28 / 36                | Pass      |
| /careers/talent-advisor/                                 |                   4 | 32 / 53.12             | 28 / 36                | Pass      |
| /careers/talent-associate/                               |                   4 | 32 / 53.12             | 28 / 36                | Pass      |
| /category/ai-and-assessment/                             |                   2 | 32 / 53.12             | none / none            | Pass      |
| /category/candidate-experience/                          |                   3 | 32 / 53.12             | none / none            | Pass      |
| /category/hiring-philosophy/                             |                   2 | 32 / 53.12             | none / none            | Pass      |
| /category/hiring-strategy/                               |                   2 | 32 / 53.12             | none / none            | Pass      |
| /category/technical-hiring/                              |                   3 | 32 / 53.12             | none / none            | Pass      |
| /contact/                                                |                   6 | 32 / 53.12             | 28 / 36                | Pass      |
| /functions/                                              |                   4 | 32 / 53.12             | 28 / 36                | Pass      |
| /functions/data-analytics/                               |                   8 | 32 / 53.12             | 28 / 36                | Pass      |
| /functions/engineering-platform/                         |                   8 | 32 / 53.12             | 28 / 36                | Pass      |
| /functions/finance-risk/                                 |                   8 | 32 / 53.12             | 28 / 36                | Pass      |
| /functions/infrastructure-sre/                           |                   8 | 32 / 53.12             | 28 / 36                | Pass      |
| /functions/leadership/                                   |                   8 | 32 / 53.12             | 28 / 36                | Pass      |
| /functions/operations/                                   |                   8 | 32 / 53.12             | 28 / 36                | Pass      |
| /functions/product-design/                               |                   8 | 32 / 53.12             | 28 / 36                | Pass      |
| /functions/security/                                     |                   8 | 32 / 53.12             | 28 / 36                | Pass      |
| /industries/                                             |                   4 | 32 / 53.12             | 28 / 36                | Pass      |
| /industries/ai-data/                                     |                   8 | 32 / 53.12             | 28 / 36                | Pass      |
| /industries/banking-financial-services/                  |                   8 | 32 / 53.12             | 28 / 36                | Pass      |
| /industries/consumer-digital-commerce/                   |                   8 | 32 / 53.12             | 28 / 36                | Pass      |
| /industries/cybersecurity/                               |                   8 | 32 / 53.12             | 28 / 36                | Pass      |
| /industries/enterprise-technology/                       |                   8 | 32 / 53.12             | 28 / 36                | Pass      |
| /industries/global-capability-centres/                   |                   8 | 32 / 53.12             | 28 / 36                | Pass      |
| /industries/healthcare-life-sciences/                    |                   8 | 32 / 53.12             | 28 / 36                | Pass      |
| /industries/industrial-engineering/                      |                   8 | 32 / 53.12             | 28 / 36                | Pass      |
| /industries/manufacturing/                               |                   8 | 32 / 53.12             | 28 / 36                | Pass      |
| /industries/pharmaceutical/                              |                   8 | 32 / 53.12             | 28 / 36                | Pass      |
| /industries/private-equity-portfolio/                    |                   8 | 32 / 53.12             | 28 / 36                | Pass      |
| /industries/product-saas/                                |                   8 | 32 / 53.12             | 28 / 36                | Pass      |
| /intelligence/                                           |                   5 | 32 / 53.12             | 28 / 36                | Pass      |
| /privacy/                                                |                  16 | 32 / 53.12             | 24 / 32                | Pass      |
| /security/                                               |                   6 | 32 / 53.12             | 24 / 32                | Pass      |
| /services/                                               |                   3 | 32 / 53.12             | 28 / 36                | Pass      |
| /tag/ai-in-hiring/                                       |                   2 | 32 / 53.12             | none / none            | Pass      |
| /tag/candidate-experience/                               |                   3 | 32 / 53.12             | none / none            | Pass      |
| /tag/decision-infrastructure/                            |                   3 | 32 / 53.12             | none / none            | Pass      |
| /tag/empathy/                                            |                   2 | 32 / 53.12             | none / none            | Pass      |
| /tag/engineering/                                        |                   2 | 32 / 53.12             | none / none            | Pass      |
| /tag/hiring-insights/                                    |                   2 | 32 / 53.12             | none / none            | Pass      |
| /tag/hiring-metrics/                                     |                   2 | 32 / 53.12             | none / none            | Pass      |
| /tag/human-first-hiring/                                 |                   2 | 32 / 53.12             | none / none            | Pass      |
| /tag/job-search-tips/                                    |                   2 | 32 / 53.12             | none / none            | Pass      |
| /tag/platform-design/                                    |                   2 | 32 / 53.12             | none / none            | Pass      |
| /tag/privacy-by-design/                                  |                   2 | 32 / 53.12             | none / none            | Pass      |
| /tag/professional-respect/                               |                   2 | 32 / 53.12             | none / none            | Pass      |
| /tag/quality-of-hire/                                    |                   2 | 32 / 53.12             | none / none            | Pass      |
| /tag/recruitment/                                        |                   2 | 32 / 53.12             | none / none            | Pass      |
| /tag/signal-based-hiring/                                |                   3 | 32 / 53.12             | none / none            | Pass      |
| /tag/structured-evaluation/                              |                   3 | 32 / 53.12             | none / none            | Pass      |
| /tag/talent-acquisition/                                 |                   5 | 32 / 53.12             | none / none            | Pass      |
| /tag/technical-assessment/                               |                   2 | 32 / 53.12             | none / none            | Pass      |
| /tag/technical-hiring/                                   |                   3 | 32 / 53.12             | none / none            | Pass      |
| /tag/thought-leadership/                                 |                   2 | 32 / 53.12             | none / none            | Pass      |
| /tag/time-to-hire/                                       |                   2 | 32 / 53.12             | none / none            | Pass      |
| /tag/trust-in-hiring/                                    |                   2 | 32 / 53.12             | none / none            | Pass      |
| /terms/                                                  |                  15 | 32 / 53.12             | 24 / 32                | Pass      |
