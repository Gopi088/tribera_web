**Verdict: REVISE.** Two defects affect users directly: a heading that can't be seen on 8 pages, and a candidate signup form that can't be submitted without JavaScript. There are also several medium dialog, CSS and contract issues. I worked only from the code and ran nothing.

## Findings (most severe first)

**1. High: closing heading is white text on a light background on all 8 `/functions/[slug]` pages.**

- `src/pages/functions/[slug].astro:263` sets `color:#fff` on the `#contact` h2 in `section.fn`.
- `content-pages.css:31-33` gives `.fn` the light `var(--paper)` background (`#f1eee7`).
- Trigger: open `/functions/engineering-platform` and scroll to "Tell us the role. Three names in 36 hours." The heading is effectively invisible.
- No test checks contrast.

**2. High: `/candidates/start` can't be submitted without JavaScript, and there's no fallback.**

- `start.astro:93` renders the submit button `disabled`, and only JS enables it (line 204). There's no `<noscript>` notice, unlike the careers page.
- Even with the button enabled, a native POST would send an empty `form_loaded_at`. The handler would reject it ("Invalid form submission", `form-utils.mjs:130`) and the user would see raw JSON.
- The no-JS test (`v9-content-pages.test.mjs:142-160`) only checks that the h1 is visible and the text is longer than 150 characters, so it passes anyway.
- Fix: add a mailto/noscript fallback like careers, or a native-submit path that the handler supports.

**3. Medium: the careers dialog's success timer is never cancelled.**

- `careers/[slug].astro:377-386` schedules a 3.2 s reset and `closeModal()`. `openModal()` (303-311) doesn't clear it.
- Trigger: submit successfully, close the dialog (×/Esc), then click Apply again within 3.2 s. The reopened dialog closes itself and any typed input is cleared.
- Fix: store the timeout ID and clear it in `openModal` and in the `close` handler.

**4. Medium: duplicate `description` attribute on the layout.**

- `careers/[slug].astro:22-23` and `functions/[slug].astro:17-18`.
- This is probably a TS17001 error under `astro check`, which runs in the CI `check` job. Confirm with `npm run check:astro`; either way, delete one copy.

**5. Medium: card contents run together on `/functions` and `/blog`.**

- `.ind__x`, `.ind__w`, `.feat__cap`, `.feat__sub` and `.feat__x` are `<span>`s. `content-pages.css:209-232` gives them `margin-top` but no `display:block`, so the margin does nothing and the text flows together. Examples:
  - "…not what the CV says they built.Weighted heaviestCore depth…" (`functions/index.astro:138-140`).
  - The featured sub-title running into the excerpt (`blog/index.astro:46-50`).
- The retained `.isp` sparkline SVGs (`functions/index.astro:116` and following) have no width/height or CSS rule. They will likely stretch to the full card width instead of their 66×26 size.
- The visual packet should confirm this.

**6. Medium-low: the careers and candidate clients ignore the server's error messages.**

- `careers/[slug].astro:387-389` and `start.astro:231-234` always show the generic "Something went wrong… try again". The handler returns specific messages: file too large or wrong type (10 MB limit, `form-utils.mjs:6`), "form has expired" after 2 h, "take a moment".
- There's no client-side size check either. So a user with an 11 MB CV, or a tab left open more than 2 h on `/candidates/start`, retries the same failing request forever.
- Fix: show `result.message` when the response is a 4xx JSON.

**7. Low: accessibility gaps in the careers upload controls.**

- The hidden `#careersResumeInput` (`careers/[slug].astro:257`, class `.apm__hp`, opacity 0, 1 px) can still be reached with Tab, so keyboard users land on an invisible control. Add `tabindex="-1"`, since the visible button triggers it.
- `#careersFileName` (line 264) isn't a live region, so screen readers don't announce the chosen file.
- Restoring the submit button with `textContent` deletes its markup: the `.apply__ar` arrow span (366/382/392) and the SVG icon in `start.astro` (217/236) disappear after the first attempt.

**8. Low: careers pages without JS.** The "Apply for this role" button (`careers/[slug].astro:187`) still shows and does nothing. The `<noscript>` mailto text (277-283) sits below the last section, far from the button.

**9. Low: share links.**

- Without JS, the LinkedIn and Copy links are `href="#"` (`rethinking-…astro:247-248`).
- `aria-label="Copy link"` overrides the "Link copied" text that `content-pages.ts:35` sets, so screen readers never hear the confirmation.

**10. Low (latent): pagination is unstyled.** `Pagination.astro:17-37` uses only Tailwind classes, but V9Layout and HeadAssets load no Tailwind CSS. No category or tag has more than 6 posts today (`postsPerPage: 6`), so it isn't visible yet.

**11. Low (latent): the `[...blog]` template now builds no pages.** All 7 permalinks are in `STANDALONE_BLOG_PERMALINKS`. So its new robots/canonical/OG mapping (`[...blog]/index.astro:19-26`) never runs and isn't tested. A future markdown-only post would ship through untested code.

## Test and CI coverage

- **What the replacement suite still checks:** shell and fonts, one h1, overflow at 390 and 1366 px, canonical, the careers and blog filters, the chart, the dialog opening and Esc, mocked 503 → retry → success, and a mocked candidate success. Handler contracts stay covered by the unit tests in `tests/netlify-functions.test.mjs`. The old assertions weren't simply switched off.
- **Gaps:**
  - The request payload is never asserted (`form_loaded_at` filled in, `resume` and `job_slug` present).
  - Close and reopen after success, and the 3.2 s timer, aren't tested.
  - Focus return to the opener and `body.style.overflow` restoration aren't tested.
  - No-JS checks don't test whether forms can actually be used.
  - Nothing checks contrast or layout inside cards.
  - The blog test never resets the filter to "All" or hits the empty state.
- `newsletter-journey` runs only on Chromium. I couldn't compare against the previous workflow, so I can't confirm nothing else was dropped.

## Nonblocking suggestions

- The "7" roles / "3" teams counts (`careers.astro:29,78-80`) carry `data-*` hooks but nothing updates them. "Three of the seven" (229) is hard-coded too. `#rnone` is never toggled.
- "Feb 15, 2026" is hard-coded in `blog/index.astro:45` and `rethinking-…astro:24` instead of using `post.publishDate`.
- The OG image is the original, unresized PNG with no width/height meta.
- Internal links mix trailing-slash styles (`/careers/x/` vs `/functions/x`).
- On topic pages, the "N articles" label counts only the current page.
- Category and tag page titles have no "— tribera" suffix.
- The `→` in `.ind__ar` and `.rc__ar` is announced as part of link names on functions cards. Careers marks it `aria-hidden`; functions doesn't.
- The blog newsletter form's no-JS POST would also fail, with an empty `form_loaded_at`. This appears to predate the migration.

## Limitations

- This was a static read only. I ran no build, `astro check`, tests or browser, so findings 4 and 5 are inferred from the code.
- I inspected no screenshots.
- I read only one of the seven standalone article pages fully.
- I didn't review the copy and business-claim items you've scheduled for step 2.
- This isn't a claim about hosted delivery, CI acceptance, or legal or business approval.
