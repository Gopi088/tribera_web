# Size-Only Typography Rollout

## Follow-Up: Missed Services Letter

The user's screenshot exposed a coverage gap: the Services letter uses
`.ltr__body`, not the `.ltr__col` selector migrated initially. Its paragraphs
still measured 18.24px at 1520px viewport width, larger than the 17px bold serif
introduction. Added its ordinary paragraphs to the 16px shared body role,
retaining the introduction, 600-weight inline emphasis and existing colors.

The original role tests validated selectors already declared in CSS, so they
could not discover this omission. `tests/services-letter-typography.test.mjs`
now independently targets the rendered section and checks its three paragraphs,
emphasis, introduction styling and overflow at five widths. The earlier pass
counts below are evidence of declared-role consistency, not exhaustive coverage
of all site text. The prior completion claim was too broad.

## Treatment

Shared sizes now cover marketing cards, ordinary copy, helpers, content actions,
form captions/inputs, small labels and footer labels in Home, Candidate and the
shared editorial templates (including journal cards and topic listings).
The rules live in `src/assets/styles/content-typography.css`; local Candidate
preview/control rules and Home testimonial metadata consume the same tokens where
Astro's scoped selectors would otherwise override them.

Only size changes: existing family, weight, italics, lighter colors and red
emphasis remain. Marketing card titles use 20-22px, compact titles 18px, body
16px, helpers/actions 14px and small labels 12px. Supporting Home statements
use 18-22px. This reduces oversized text, but also brings previously sub-10px
instructions up to a readable size. It is not a blanket reduction.

Examples at desktop: Ways titles 24 to 22px; Candidate comparison titles 26 to
22px; funnel closing statement 32 to 22px (red italic words retained); About
story paragraphs 20 to 16px. Primary headings/subtitles, navigation, root sizes,
large score numerals, compact chart data and narrative pull quotes keep their
separate established roles. There are intentionally different sizes by role.

## Verification

`scripts/check-text-style-preservation.mjs` captures before/after rendered text
on eight representative routes at 390/1520px and compares text, font family,
weight, style and color (including inline bold/italic elements). Production
comparison passed with no differences. Evidence is in `/tmp/tribera-text-sizing`.

`tests/full-text-sizing.test.mjs` verifies actual shared-role sizes and page
overflow on every built public HTML route at 320/390/768/1520px. It is registered
in `scripts/test-reviewed-site.mjs`. The Candidate layout test now checks the
shared compact-title token instead of expecting the removed root-relative size.
Final production run: 7,460 full-text size checks passed across 76 routes at four
widths, alongside all 304 existing heading/subtitle route/viewport checks.

Hero viewport/no-JS, Home handoff, Candidate layout/demo/profile handoff, Home
cold/cached/delayed-style refresh and navbar delayed/failed-font checks passed.
Astro check: 0 errors, 0 warnings, 144 hints. Production build passed (76 pages).

## Review Scope

[Claude's final review](reviews/typography-2026-09-14/claude-size-only-final.md)
found no blockers in the inspected CSS and screenshots. Earlier review included
five desktop sections; final inspection included a mobile journal listing and
two desktop sections. Its report is not an independent 76-page visual approval.
Browser checks cover all built routes for the declared roles, not every hover
state, every arbitrary text selector, other browsers or a contrast-compliance
audit. Colors were deliberately not altered. No commit, merge or deployment.

Claude's journal-selector reuse concern was checked in source: `post__t` and
`post__x` are the journal list components. The `h3.blog-display` selector excludes
the separately styled article H1 and metadata that also use `blog-display`.

## Independent Follow-Up

The subsequent [independent typography audit](independent-typography-audit-2026-09-14.md)
found additional missed selectors, corrected them and added DOM-discovered,
page-specific regression coverage. That report supersedes the coverage counts
above; the earlier role-selector checks alone were not a complete text inventory.
