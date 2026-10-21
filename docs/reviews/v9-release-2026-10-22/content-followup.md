**Verdict: REVISE.** One fix doesn't hold up in the screenshots: the About spacing. Everything else in scope checks out at both widths.

## Finding to fix

**1. About hero, side quote, 1366: "belong" and "here?" still split onto two lines.** In `about-quote-1366.png`, "Who will actually belong" ends the first line and the second line starts " here?" with a visible leading space, so the fix made the gap show at the start of the line instead. At 390 it reads fine on one line.

- **Cause:** on About, the decorated-word style (`.hx .hd-word`) displays the word as an inline block (`src/assets/styles/v9/editorial/about.css:595-598`). Browsers can still break the line right after an inline block, even when a nonbreaking space follows, so the nonbreaking space at `src/components/v9/editorial/about/AboutIntro.astro:28` doesn't stop the break.
- **Fix:** wrap `<span class="hd-word">belong…</span>&nbsp;here?` in a no-wrap span (for example `<span style="white-space:nowrap">`). Then recapture at 1366 and 390.
- **Same pattern elsewhere:** Contact, BFSI, Industries, Services, Interview-as-a-service and Case study also display decorated words as inline blocks. I only verified About in this packet.

## Verified

- **New Jersey / Address to follow / Our numbers:** none of these appear anywhere in `dist/`. In active sources, the Footer (`Footer.astro:59`), About (`AboutIntro.astro:32`) and the Contact FAQ (`Questions.astro:54`) all say Pune and Bengaluru. The only remaining source mention is `src/components/home/v126/sections/footer.html:51`, which nothing imports (see polish).
- **Contact:** the heading says "Two offices." `office-cards-1366.png` shows Pune, Bengaluru, and Press and partners in three equal columns. At 390 they stack cleanly.
- **New article:**
  - It's in the post collection (`publishDate: 2026-10-19`) and the standalone routing registry.
  - The /blog Latest card shows it at both widths.
  - It appears on the Hiring Strategy category page and the hiring-metrics, structured-evaluation and quality-of-hire tag pages, plus the sitemap.
  - The date (19 Oct 2026) and "4 min read" match across the blog card and the article header. Reading time comes from `standaloneReadingTime`.
- **Related cards:** all three are published posts, filtered against `fetchPosts()`. Category, excerpt, date and reading time are real, and the dates in the built HTML match the source files.
- **Flagship article and Intelligence notifications:** both now link to `/blog#sub`, with no email inputs. The "in preparation / not available yet" note reads well at both widths.
- **Waitlist forms:**
  - All 7 forms (blog plus 6 archive articles) ship with the button disabled and labelled "Notify me".
  - All load `/scripts/newsletter-signup.js`, which enables the button once it runs.
  - Each has a no-JS `mailto:` alternative.
  - The success text is "We will let you know when the newsletter is ready", so no delivery is claimed.
- **ScarcityLab:** the page text (`ScarcityLab.astro:32`) and the interactive version (`sector-charts.ts:58`) both say "In this example". The values are unchanged and it renders correctly at 390.
- **Candidates:** "Demo only…" and "Example controls" appear above the switches (`example-controls-390.png`).
- **Careers:** the filter-coffee sentence appears exactly once in the built page.
- **RPO:** spelled out in the home FAQ answer, "Recruitment process outsourcing (RPO)".
- **Legal pages:** the policy revision date (27 July 2025) shows first and in bold. The presentation date (21 October 2026) is a separate, quieter line. Both use UTC formatting in `MarkdownLayout.astro`. Policy dates are unchanged in the frontmatter.
- **Flagship vs. archive layout:** the illustrated hero versus the plain archive layout reads as intentional. Fonts, colours and header/footer are consistent, and I found no defects.

## Optional polish (not blocking)

1. **Dates are formatted in two ways:**
   - **Time zone:** four places still format dates in the build machine's local time instead of UTC: `blog/index.astro:48`, `FieldNotesList.astro:40`, `ArticleRelated.astro:27` and `[...blog]/index.astro:35`. They're correct when the build runs on UTC, but add `timeZone: 'UTC'` to match the fix you already made.
   - **Style:** the article hero shows "Oct 19, 2026" (US style) while the blog card and related cards show "19 Oct 2026" (UK style). The archive list (`FieldNotesList.astro`) also uses US style.
2. **Flagship cover says "No. 10"** (`ArticleHero.astro:11`), but only 8 posts are published.
3. **"Three more from real searches."** The "Designing AI for high-stakes assessment" card isn't a search story. "Keep reading" or "Three more" would be accurate.
4. **Notification notes sit right on top of their buttons:** about 5px apart on the flagship at 1366, slightly more on Intelligence. A small gap would help.
5. **"Example controls" label** is plain white body text tucked under the demo note, so it looks like a stray line. A small mono label style just above the switches would fit better.
6. **Privacy policy text vs. label:** the unchanged policy text refers to a revised "Last updated" date, but the label now says "Content last revised". You could change the label wording instead of the policy.
7. **Stale or dead files:**
   - `src/components/v9/editorial/README.md:17` still describes a disabled Subscribe control.
   - The unused `src/components/home/v126/sections/footer.html` still contains New Jersey; consider deleting it.
8. **ScarcityLab tag** "ILLUSTRATIVE · SAMPLE DATA" wraps awkwardly onto two lines at 390.

## Images opened

All 20 under `content-fixed/`:

- `_blog` at 390 and 1366
- `_blog_seventeen-interviews-one-hire` at 390 and 1366
- `about-quote`, `office-cards`, `published-related`, `article-notification` and `intelligence-notification`, each at 390 and 1366
- `scarcity-example-390` and `example-controls-390`
- `_privacy` at 390 and 1366
- `_careers` full page at 390 and 1366

## Limitations

- I used static screenshots plus a source and `dist/` read-through. I ran nothing, so the JS enable/submit behaviour and the three-browser results are your evidence, not mine.
- I used the full Careers pages for structure only. At 390 the scaled image is too small to judge the filter-chip styling.
- I didn't review the business claims or the legal text itself, as you asked. The Privacy body still lists "United States (for international operations)", and I left that alone because policy text is to stay unchanged.
- CI and hosted delivery haven't been done and aren't claimed.
