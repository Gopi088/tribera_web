**Verdict: REVISE.** Five defects are visible in the screenshots. Two of them make charts or text wrong or unreadable on every function detail page.

## Findings, most severe first

**1. High: all six bars on function detail pages are drawn full width.** This affects `/functions/engineering-platform` and `/functions/finance-risk` at both 390 and 1366, in the hero "Example priorities for this function" card.

- Engineering: 26/22/10/18/10/14% all show as complete red bars.
- Finance: 22/12/26/14/18/8% likewise.
- So the chart contradicts its own printed values. Codex's observation is confirmed.
- Cause: `src/pages/functions/[slug].astro:48` sets `--w:${b.v}%`, but `b.v` already ends in `%` (`src/data/function-pages.ts:64`, `v: '26%'`). The result, `26%%`, is invalid, so the bar falls back to auto width, which is full width. The data already has a separate `w` field.
- This is probably the same on all eight function detail routes, but I only saw these two.

**2. High: the closing heading on function detail pages is nearly invisible.** "Tell us the role. Three names in 36 hours." is white on the beige band at 1366 (about y≈6090 in `engineering-platform-1366-full`, and similarly in finance-risk). It looks the same at 390 in the full-page images.

- Cause: line 263 hardcodes `color:#fff`, but `.fn` sections get the beige background (`content-pages.css:31`). The heading was written for a dark band that isn't there.
- Caveat: no crop of this section exists, so I judged it from the downscaled full pages plus the source.

**3. Medium: "Weighted heaviest" runs into the card text on the `/functions` hub.** This shows on all eight function cards at 1366 (section-2 crop) and 390 (section-2 crop).

- The italic label and the value butt straight against the description with no space or break, e.g. "…says they built.*Weighted heaviest*Core depth, and what it cost to ship".
- At 390 it wraps into a ragged run of mixed fonts.
- Source: `functions/index.astro:140` and the lines after it.

**4. Medium: "Communication" breaks mid-word on careers detail scorecards at 390.** It splits as "Communicatio / n" in the hero scorecard of `/careers/backend-engineer` and `/careers/ai-ml-engineer`. "Commercial sense" and "Stakeholder handling" wrap to two lines, which is acceptable.

- The `/careers` hub scorecard at 390 does **not** break, because it has one less card of padding.
- Cause: the page-wide `overflow-wrap: anywhere` (`content-pages.css:16`) combined with the narrow label column (`minmax(80px,1fr)`, line 287) inside the nested card.

**5. Medium: the same weights are drawn on different scales.**

- On the `/careers` hub, Backend Judgment 26% fills about 26% of its track.
- On `/careers/backend-engineer`, in the hero and in the "What we score" cards, it fills about 87%, because bars are scaled to the largest value (`pct(d.w)`).
- Each chart is consistent with itself, but someone moving from the hub to a role page sees the same numbers drawn very differently.

**6. Low-medium: the bottom of the careers apply dialog is cut off at 390.** In `careers-dialog-390.png`, the "Submit Application" button is clipped by the dialog's bottom edge, with nothing showing that the dialog scrolls. The pale coral button looks like an intentional disabled state.

## Polish (not blocking)

- `/careers` at 1366: the "Pune and Bengaluru… filter coffee" line appears twice, as the Open roles intro and again below the culture cards (`careers.astro:84` and `:180`).
- `/functions` "The method is the same in all eight" at 1366 and 390: the tiny grey labels after the step headings ("engine", "expert", "engine", "yours") look stray and unstyled.
- `/candidates/start`: the file picker is the browser's default "Choose File / No file chosen", which looks out of place in the styled form at both widths. At 1366, step 04 sits alone on a second row of the 3-column grid, and there is a large gap between "← Back to how it works" and the eyebrow.
- Engineering-platform "Operators" section: the copy reads oddly ("They do it, is the point"). That's an editorial call I'm only mentioning; I'm not asking for a rewrite.
- 404: clean at both widths, with clear buttons and a tidy footer transition. No issues.
- Elsewhere, hierarchy, button clarity and footer transitions look consistent. The hub function comparison and its notes ("10% to 18%, 8 points") match the drawn bars.

## Images opened

I opened all 43 listed images:

- **Careers hub:** `_careers` 390/1366 full and top.
- **Careers backend-engineer:** 390/1366 full, top, section-2 and section-5.
- **Careers ai-ml-engineer:** 390/1366 full and top.
- **Functions hub:** `_functions` 390/1366 full, top and section-2.
- **Engineering-platform:** 390/1366 full, top, section-2 and section-5.
- **Finance-risk:** 390/1366 full and top.
- **Candidate signup:** `_candidates_start` 390/1366 full and top.
- **404:** `_404` 390/1366 full and top.
- **Dialog:** `careers-dialog-390`.

## What I couldn't inspect closely

- **390 full pages:** very tall pages (about 6,800–10,175px) shown at roughly 77–115px wide. Mid- and lower-page text on those was checked for structure only, except where a crop exists.
- **Sections with no crop:**
  - the careers hub roles grid, culture and process sections at 390
  - ai-ml-engineer below the hero
  - finance-risk below the hero
  - the function detail "Three questions", "Roles" and FAQ sections at 390
- **States not captured:** the closing CTA band (finding 2) has no legible crop. I saw no other dialog states, no open FAQ items, and no filtered careers tabs.

These findings come only from static screenshots of build 56cd722…; they say nothing about how the hosted site behaves and are not an accessibility audit. I didn't use the sibling code-review.md, because no `.md` exists under `artifacts/v9-release-2026-10-22/`. Business claims, including New Jersey, were not assessed.
