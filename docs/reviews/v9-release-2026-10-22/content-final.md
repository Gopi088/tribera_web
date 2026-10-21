**Verdict: ACCEPT** for stage 2 (local content and visuals). This is based on a read-only review: I read the source and opened the 11 PNGs. I didn't run anything, and CI and hosted delivery are still later stages.

## The prior blocker (desktop About "belong / here?")

- **Source:** In `src/components/v9/editorial/about/AboutIntro.astro:24`, the underlined "belong" now sits inside `.ab-word-pair` with "here?". `src/assets/styles/v9/editorial/about.css:1661-1664` sets that pair to `inline-block` and `white-space: nowrap`.
- **1366 image:** "Who will actually" is on line 1 and "belong here?" is on line 2. The pair stays together and the red underline sits under "belong" only. Fixed.
- **390 image:** The heading fits on one line with the underline in the right place. No regression.

## Other changes, checked in source and images

- **Dates:** Every date formatter in `src` now uses `'en-GB'` with `timeZone: 'UTC'`: the blog listing, `FieldNotesList`, all seven archive pages, `ArticleRelated`, `MarkdownLayout` and `ArticleHero`. In the images, the listing card shows "19 Oct 2026", the hero shows "19 OCT 2026" and the related cards show "24 JAN 2026" and "18 AUG 2025". They agree with each other.
- **ArticleHero** (`ArticleHero.astro:5-26`): Title, excerpt, category, author, date and reading time all come from the collection entry. The cover label says "Field note". The 1366 and 390 hero images match the listing card's title, excerpt and category.
- **Related heading:** The 390 section-6 image shows "More from our field notes."
- **Notification CTAs:** On the article at 1366 (section 7) the dark band's CTA is spaced well below the prep note. On Intelligence at 390 (section 9) the red CTA sits clear of the note and the "Ask about your function" link.
- **Intelligence at 390 (section 2):** The stat cards and footnote markers render cleanly with no overflow.
- **Candidates at 390 (section 8):** The FAQ renders cleanly. This image doesn't show the Example-controls mono label, the scarcity pill or the panel header, so I couldn't confirm those visually.

## Limitations

- I saw only these 11 captures. I couldn't check the claimed 10-route-width overflow sweep, the build hash or the Chromium suite pass.
- Business claims are kept as-is on the owner's instruction. I haven't verified any of them independently, including "Sixty years", 319/17.6 and "Founded June 2024".

## Optional polish (doesn't block)

- `src/pages/[preview]/content.astro:25` still says `issue: 'No. 10'`. It only builds in dev or with `V9_PREVIEW=1`, so it doesn't ship. It's worth aligning to "Field note" so the preview doesn't drift from the real page.
- `src/components/home/v126/sections/footer.html:51` still has "New Jersey". Nothing under `src/pages` references it, so it looks unused, but it could be cleaned up or deleted so it doesn't come back.
- At 1366 the listing card's category reads "Hiring Strategy" but the article eyebrow reads "HIRING STRATEGY". That's just case styling, but check that the source category isn't stored with two different capitalisations.
- `ArticleHero.astro:5` uses a non-null `!` lookup by permalink, so the build fails loudly if that slug is ever renamed. That's acceptable; just be aware of it.
