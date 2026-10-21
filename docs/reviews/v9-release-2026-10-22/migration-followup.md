**Verdict: ACCEPT** for the stage-1 migration code and presentation scope. All ten fixes hold up in the source and, where you supplied a capture, in the PNG. The remaining findings are low severity or cosmetic. This verdict depends on the WebKit run passing, which I haven't seen.

I opened all 14 PNGs and read the 11 source files you listed, plus `HeroFilters.astro` and the relevant parts of `functions/index.astro`, `function-pages.ts` and `BfsiComparison.astro`. I ran nothing.

## Fix verification

| #   | Result         | Evidence                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | ✅             | There's one `description` prop each in `careers/[slug].astro:21` and `functions/[slug].astro:17`.                                                                                                                                                                                                                                                                                                                                                    |
| 2   | ✅             | The `#fff` is gone (`functions/[slug].astro:262`). Both `function-closing-*.png` show a dark heading on paper. The test enforces contrast ≥ 3 on all 8 routes.                                                                                                                                                                                                                                                                                       |
| 3   | ✅             | Careers bars use `--w:${w}%` and functions bars use `--w:${b.v}` (the label itself, e.g. "26%"). Fill widths in all four top captures match their labels. At ≤600px the label gets its own row (`content-pages.css:845-851`), and the 390 captures show whole labels above the bars. The test asserts a drawn/labelled difference under 0.015 for all 6 bars on 16 routes at 2 widths.                                                               |
| 4   | ✅             | `content-pages.css:755-767` makes the spans block-level and sizes `.isp` to 66×26. The `function-card-*` captures show a small sparkline and separate lines. `.ind__ar` is now `aria-hidden`.                                                                                                                                                                                                                                                        |
| 5   | ✅             | `applications.ts` is shared. There's no timer. `cancel()` bumps `generation` and aborts the request, and every late result is guarded by `current === generation` (lines 97, 103, 106). `close` restores overflow and returns focus to the opener. Reopening resets only if `completed` is set. `careers-dialog-390.png` shows the fields scrolling with the actions pinned below a divider.                                                         |
| 6   | ✅             | There's a client check for extension and size (`MAX_RESUME_BYTES`). Server messages are shown only for 4xx JSON; anything else shows the generic error. The button's child nodes are cloned and restored, and the test checks `.apply__ar` and `svg` survive. `new FormData(form)` (line 80) runs before `file.disabled = true` (line 81). The hidden input has `tabindex="-1"` and an `aria-label`, and `#careersFileName` is `aria-live="polite"`. |
| 7   | ✅             | `start.astro:43-49` has a `<noscript>` mailto above the form, visible in `candidate-email-fallback-390.png`. The careers Apply control is a real `mailto:` anchor with `data-open-careers-apply` (`careers/[slug].astro:185-188`).                                                                                                                                                                                                                   |
| 8   | ✅             | All 7 standalone articles render `shareUrl` on the server for both LinkedIn and Permalink. The copy feedback goes to a separate `role="status"` span, and the link's `aria-label` no longer overrides it.                                                                                                                                                                                                                                            |
| 9   | ✅ (code only) | Pagination uses `.v9-pagination` and `.btn--ghost`, with no Tailwind. `TopicIndex` passes `showFilters={false}`. The category-390 and tag-1366 captures show one pill row and no `.fbar`.                                                                                                                                                                                                                                                            |
| 10  | ✅             | `banking-…-390-top.png` shows "INDUSTRIES" on line one and "· BANKING & FINANCIAL SERVICES" on a deliberate second line.                                                                                                                                                                                                                                                                                                                             |

## Remaining findings (none blocking)

1. **Low: the chosen filename can't be seen in the careers dialog.** `#careersFileName` sits at the bottom of the scrolling `.apm__fields`, below the textarea. The upload trigger is in the pinned action bar.
   - Trigger: at 390×900, open Apply, then use "Upload Resume \*" without scrolling the fields. Nothing changes on screen except Submit becoming enabled.
   - Screen readers do hear the name.
   - Fix: move the filename into `.apm__actions`, or show it on the upload button.
2. **Low: closing during an in-flight submit is silent and can create duplicates.** Aborting doesn't stop a request the server has already received. The user reopens to their preserved values with no notice and may resubmit. This is inherent to cancel-on-close; a short "submission cancelled, it may already have arrived" note would cover it.
3. **Low (UX): the top "Apply for this role" button (`careers/[slug].astro:39`) is `href="#apply"`.** It scrolls down to a second Apply button instead of opening the dialog. Adding `data-open-careers-apply` to it would keep `#apply` as the no-JS fallback.
4. **Cosmetic:**
   - The careers scorecard is a card inside a card (`.jd__card` around `.cmpw`); the functions version is single-framed (careers-1366 versus functions-1366).
   - On the function card, `.ind__w` has no `margin-top`, so "Weighted heaviest" sits right against the body text (`function-card-*`).
   - On the blog's featured card, the mono `.feat__cap` sits tight under the date row and above the title (`_blog-1366-top.png`).
   - Tag titles render as "AI **In** Hiring" because `displayTitle` capitalises every word.
   - In the dialog, `scrollbar-gutter: stable` makes the fields narrower than the action buttons.
5. **Low (no-JS): the candidate form still renders in full with a disabled Submit under no-JS.** The mailto line is close by, but a user can fill the whole form before realising it can't be sent.

Carried over from the original report and not in this fix list:

- the hard-coded "Feb 15, 2026"
- the counts in `careers.astro`
- the page-local "N articles" count
- the latent `[...blog]` path, which you've said isn't tested

## Test-evidence gaps (from reading `tests/v9-release-regressions.test.mjs`)

- **Not tested:**
  - Closing without completing and keeping the values. The only Escape happens before any input.
  - Abort and late-result handling. No route is delayed.
  - Focus return after closing from the success state.
  - The dialog at a short viewport. Action visibility is checked only at 390×900.
  - The dialog at 1366.
  - Mobile label placement. The bar test checks only the fill ratio.
  - Pagination rendering. No topic has more than 6 posts.
- **Weak:** the no-JS check only proves a mailto link is visible.
- The suite is wired into `test-v9-public.mjs` and CI at `actions.yaml:209`, but I can only confirm the wiring, not a run.

## Deferred to stage 2 (not stage-1 findings)

- "Join the newsletter waitlist" wording (`_blog-1366-top.png`)
- New Jersey mentions
- About word spacing
- The repeated Careers sentence
- Method-link wording
- Article discovery and related destinations

The business claims ("Three names in 36 hours", "3 lakh", "200,000 interviews", the weights) are kept as is at your direction. I haven't checked them.

## Coverage limits

- **Not executed:** no build, `astro check`, tests or browser run. The Chromium/Firefox passes and the pending WebKit run are your reports.
- **Captures only:** Pagination, the success state, error states, the 1366 dialog and Firefox/WebKit rendering weren't in the captures.
- **Not checked:** the hero chart on the banking page uses its own scale (`BfsiComparison`/`BfsiIntro`) and wasn't part of fix 3. I didn't verify it against 0–100.
- **Partly read:** I read the share-link markup on all 7 articles and the full body of none. I didn't do a design review of the illustrated flagship article.
- **Out of scope:** this isn't a CI, hosted-delivery, legal or business-claim certification.
