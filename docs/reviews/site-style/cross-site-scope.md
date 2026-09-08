# Final Cross-Site Visual And Copy Review

Read-only critical review. Do not edit. Use the actual readable screenshots, not
prior verdicts, to judge final consistency. Separate confirmed issues, resolution
limits and owner evidence. Do not call this production approval.

Read `docs/reviews/site-style/correction-disposition.md` and
`/tmp/tribera-site-style/final-states/manifest.json`.
Read all sixteen section images named by that manifest (eight sections at 390 and
1520). They compare hiring workflow, candidate scores, services cards, intelligence
hero, careers cards, contact form, topic cards and a function hero. The hiring page
is the visual authority, adapted to the purpose of each page, not identical layouts.

Also read these files under `/tmp/tribera-site-style/final-states/`:

- `hiring-work-nav-390.png`, `career-roles-nav-390.png`, `contact-nav-390.png`, `topic-nav-390.png`
- `hiring-work-nav-1520.png`, `career-roles-nav-1520.png`, `contact-nav-1520.png`, `topic-nav-1520.png`
- `candidate-enabled-390.png`, `candidate-enabled-1520.png`
- `faq-expanded-390.png`, `faq-expanded-1520.png`
- `service-expanded-390.png`, `service-expanded-1520.png`

Check typography (Fraunces headlines, Inter Tight body, mono labels), readable
contrast, restrained red, equal card rows, two-column alignment, stable shell,
CTA hierarchy and natural mobile flow. A neutral candidate sample must NOT inherit
the hiring demo's pass/fail verdict colors. Form screenshots are test states, not
real submissions; the disabled pre-upload button is intentional.

Read the current copy files under `/tmp/tribera-site-style/site-wide/`:
`careers-copy.txt`, `contact-copy.txt`, `functions__finance-risk-copy.txt`,
`functions__infrastructure-sre-copy.txt`, `functions__security-copy.txt`,
`functions__leadership-copy.txt`, `functions__operations-copy.txt`.
The FAQ corrections may be newer than the section images (the images do not show
those corrected FAQ paragraphs). Verify the previously corrupted sentences are
clear and coherent, including content inside collapsed details.

For navbar geometry, check `src/components/standalone/SharedNavFrame.astro` too:
after these screenshots, mobile menu margin was explicitly reset to zero to remove
a 3.75px legacy offset. It affects only navigation. Automated all-route comparison
is being repeated independently; screenshots alone cannot establish every route.

Return: overall cross-site visual/copy verdict; remaining concrete issues by
severity with exact route/component; what was checked and any limits. Do not
repeat speculative defects as confirmed or approve business facts from screenshots.
