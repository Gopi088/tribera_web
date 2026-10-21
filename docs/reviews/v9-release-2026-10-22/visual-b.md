# Packet B visual review (journal index, articles, topic pages): **REVISE**

The main reason is that "New Jersey" still appears in the footer on every page in this packet. The owner asked for it to be dropped. A few smaller migration defects also need fixing; they're listed below.

## Confirmed defects not on the scheduled list

1. **"New Jersey" is still in the footer.** Every route, both widths, footer bottom row.
   - **Evidence:** It reads clearly in `_category_ai-and-assessment-1366-full.png` and `_tag_ai-in-hiring-1366-full.png` ("PUNE · BENGALURU · NEW JERSEY" next to Back to top). In the 390 full pages of both topic pages it sits on its own line under the copyright.
   - It also shows in the full pages for `/blog`, rethinking, trust and seventeen.
   - **Source** (one Grep, only to confirm this isn't an old capture): `src/components/v9/Footer.astro:60`. The same text is in `contact/Questions.astro:54`, `contact/Offices.astro:21` and `about/AboutIntro.astro:32`. Those are packet C pages, so I'm only noting them here.

2. **The "Next" label runs into the sentence after it.** Shared "Two doors" block, both widths, on `/blog`, rethinking and trust.
   - **Evidence:** `rethinking-1366-section-6.png` reads "Next A 45-minute intake call…" and "Next Fifteen minutes to set up…". "Next" has the same weight, colour and size as the sentence, with no punctuation or gap. `rethinking-390-section-6.png` shows the same thing.
   - This may be the same pattern as the known About collision. It's in a different, shared component, though, so it needs its own fix.

3. **The "Latest" card on `/blog` joins two pieces of text with no punctuation.** Both widths.
   - **Evidence:** `_blog-1366-top.png` reads "…about signal efficiency Time-to-hire measures pace." There's no full stop between the subtitle and the excerpt.
   - The same card also has a small grey monospace line above the title ("Every interview we have run, and the few that changed a decision") that wraps to an orphaned "decision". It looks like a leftover field and fights with the title.

4. **The seventeen article's newsletter block contradicts itself.** Both widths.
   - **Evidence:** In `seventeen-1366-full.png` the dark block has a "Subscribe" button, and the small text under it appears to say "Newsletter subscriptions are not available yet."
   - **Limit:** No section crop covers this block, so I could only read it at full-page scale. Please re-crop it to confirm the wording.

5. **The seventeen article uses a different template from the other articles.**
   - **Evidence:** `seventeen-1366-top.png` / `390-top.png` show a backslash "\" before the kicker; every other v9 page uses "/". The hero is white with a black rule instead of the beige band. The related cards are dark stat cards, and the newsletter block is dark. The other articles end with the "Two doors" section; this one goes straight from newsletter to footer.
   - If this is deliberately the newer design, the other articles are now the inconsistent ones. Either way, it needs a decision.

6. **Topic pages show two filter rows that disagree with each other.** `/category/ai-and-assessment` and `/tag/ai-in-hiring`, both widths.
   - **Evidence (`_category…-1366-top.png`, `_tag…-1366-top.png`):** The hero has a full row of topic chips, and the list below has a second "All 1 / AI & Assessment 1" chip row.
   - The hero row includes "Talent Acquisition" and "Decision Infrastructure", which aren't among the `/blog` index filters.
   - On the tag page the tag shows up as an extra chip, "AI In Hiring" (capital "In"), that looks like a category. The second row there still says "AI & Assessment 1".
   - Both topic pages use the same generic subtitle.

## Optional polish (not blocking)

- **Big gap before the opening paragraph.** Article pages (rethinking, trust), both widths. There's roughly 150–200px of empty white between the hero and the lede (`rethinking-1366-top`, `trust-1366-section-2`, `trust-390-section-2`). This could be a reveal animation that hadn't fired when the screenshot was taken; worth checking that it's spacing and not hidden content.
- **Repeated sentence.** On rethinking, the hero subtitle and the lede both say "…the thing we had backwards for two years."
- **Small action links.** In the `/blog` list, "Read article →" is very small (about 12px), light and pushed to the far right (`_blog-1366-section-2.png`).
- **Filter chip counts.** Counts in the chips ("Hiring Strategy 1") have no visual separation from the label.
- **Related cards at 1366.** Three cards in a two-column grid leave one card on its own, and "Designing AI for high-\nstakes assessment" breaks at the hyphen (`rethinking-1366-section-4.png`).

## Scheduled items I saw (already on the next-step list)

- **New article missing from the index:** `/blog` lists 7 articles ("All 7") and "Seventeen interviews…" isn't one of them.
- **Related-card destinations:** The seventeen article's cards ("Every CV says AI now", "The hard hire in a capability centre…", "The quietest number…") don't match the article titles in the index.
- **Inconsistent newsletter labels:** "Notify me" on `/blog`, "Subscribe" on the rethinking article and on seventeen, and "Join the newsletter waitlist" in the `/blog` hero.

Business figures (200,000, 17.6, 36 hours and so on) are left as they are, as instructed.

## Images I inspected

- **`/blog`:** 390-top, 390-full, 1366-top, 1366-full, 390-section-1, 390-section-2, 1366-section-1, 1366-section-2, 1366-section-3
- **rethinking:** 390-top, 390-section-2, -3, -4, -6; 1366-top, 1366-section-2, -3, -4, -5, -6; 1366-full
- **trust:** 390-top, 390-full, 390-section-2, -3, -4; 1366-top, 1366-full, 1366-section-2, -5
- **seventeen:** 390-top, 390-full, 390-section-0, 1366-top, 1366-full, 1366-section-0
- **category:** 390-top, 390-full, 1366-top, 1366-full
- **tag:** 390-top, 390-full, 1366-top, 1366-full

## Coverage limits

- **Not opened:** `rethinking-390-full.png`, `rethinking-390-section-0/1/5`, `rethinking-1366-section-0/1`, `trust-*-section-0/1/6`, `trust-390-section-5`, `trust-1366-section-3/4`, `_blog-390-section-0/3/4`, `_blog-1366-section-0/4`, all topic-page section crops and `manifest.json`.
- **Charts:** None of the crops I opened show an article chart at readable size. The crops cut off at the top of each chart, so I checked chart legibility only at full-page scale.
- **Seventeen article:** Only crop section-0 exists, so the body, chart, related cards and newsletter block were reviewed at full-page scale only.
- **Interaction:** Nothing in the screenshots shows hover, focus, menu-open or error states.
- **Scope:** This is a visual review only. It makes no legal, business, performance, delivery or whole-release judgement, and I made no edits.
