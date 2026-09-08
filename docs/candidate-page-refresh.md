# Candidate page refresh

## Shared shell

`/candidates` now uses `PageLayout`, like the hiring page. It no longer injects
the sample's complete document, global CSS, external font links or scripts.
`SharedNavFrame` owns the navigation rail, type metrics and audience selector.
The sample HTML remains unchanged in `sample_data`.

## Content decisions

- Retained the team-weighted scoring demo, using its original six scores and four briefs.
- Corrected the Consumer scale note from two-thirds to 60%; the score rail is 0-100.
- Removed percentile/ranking labels: the illustrative score does not establish rank in a population.
- Replaced the unverified 140-applications story with a clearly labelled CV/evidence example.
- Retained the two-sided profile/team preview with explicit example labels and keyboard tabs.
- Retained the interview explanation, privacy preferences, coverage and no-candidate-fee message.
- Replaced pretend privacy switches with guidance to discuss preferences with the team.
- Removed absolute privacy guarantees, guaranteed interview reuse, offer timelines and unsourced offer statistics.
- Retained the timeline as stages rather than promised dates; the hiring decision is still the employer's.
- Used the two full candidate testimonials already present on the hiring page, without shortening their wording.
- Merged the repeated closing audience pitch into the signup section and a hiring-page link.
- Replaced simulated CV processing with the existing email-to-profile route. The real upload remains at `/candidates/start`.

The profile form copy has also been reviewed: unsupported reply deadlines,
automatic anonymity and offer timelines have been removed. Direct visitors now
receive accurate instructions, carried email addresses can be corrected, and
visible labels and a privacy-policy link replace the old field-count claims.
The upload endpoint and backend are unchanged. Quantified service promises still
require product confirmation before publication.

## Candidate Design Alignment

- Kept split introductions for the score and CV comparison, with stacked
  introductions for the expert conversation, privacy, preview and journey.
- Used hiring-page serif editorial headings and one hand-drawn underline in the
  expert section, without its former divider lines.
- Matched the hiring trust-card measurements and workflow-card treatment.
  Journey arrows connect all four steps; the candidate's first and final moves
  have red top accents. Narrow screens use a single vertical sequence.
- Rebuilt the illustrative preview as a 900px-max white document with compact
  metadata, evidence and follow-up areas, and a two-column team brief.
  Hidden panels still contribute to sizing so keyboard tab switches stay stable.
- Preserved copy qualifications, calculations, form endpoints and the shared nav.

Claude's post-implementation visual review found no blockers and identified three
refinements: preview left alignment, removal of its redundant red rule, and matching
the final rendered hiring trust-card typography/padding rather than earlier CSS
declarations. All three were applied. The follow-up screenshot review confirmed
them resolved with no blocking visual defects.

## Regression Coverage

`tests/audience-nav.test.mjs` compares all navbar element rectangles and fonts on
real audience switches and the profile route, from 320px to 1920px.

`tests/candidates-layout.test.mjs` checks heading alignment, score calculations,
unchanged evidence, keyboard tabs, stable preview height, touch controls, responsive
overflow, no-JS output and the existing email handoff. It does not submit a profile.

`tests/candidate-start.test.mjs` checks direct entry, email correction, copy,
mobile overflow, file selection, and mocked failure/retry/success states. No real
profile is delivered.
