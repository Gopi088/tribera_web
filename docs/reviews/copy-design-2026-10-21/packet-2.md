## Coverage

| Route                                  | Reviewed                                               | Notes                                   |
| -------------------------------------- | ------------------------------------------------------ | --------------------------------------- |
| /about                                 | Desktop+mobile top crops, mobile full page, copy.json  | New unified editorial design throughout |
| /case-study                            | Desktop+mobile top crops, desktop full page, copy.json | New unified editorial design throughout |
| /industries                            | Desktop+mobile top crops, desktop full page, copy.json | New unified editorial design throughout |
| /industries/banking-financial-services | Desktop+mobile top crops, copy.json                    | New unified editorial design throughout |
| /industries/ai-data                    | Desktop+mobile top crops, copy.json                    | New unified editorial design throughout |
| /intelligence                          | Desktop+mobile top crops, desktop full page, copy.json | New unified editorial design throughout |

No legacy-styled body sections were observed in this packet — all six routes already use the Fraunces/Inter Tight editorial system (warm paper, charcoal, restrained red CTAs) consistently. Only this packet was reviewed; other site routes are not covered by this assessment.

## Findings

**P1 — /about, mobile hero (390px): broken text, "belonghere?"**
Observed: mobile top crop renders `Who will actually belonghere?` — the underlined link word "belong" runs directly into "here?" with no space, both on the same visual line where desktop shows them on separate lines with proper spacing. Desktop copy.json confirms intended text is "Who will actually **belong** here?". This sits in the first screen a mobile visitor sees on /about.
Why it matters: it's a legibility defect in the hero of a page meant to build founder credibility — reads as unpolished/broken on first impression.
Fix: insert an explicit space (or non-breaking space) between the styled "belong" span and the following "here?" text node so wrapping doesn't collapse the gap.

**P1 — /intelligence, newsletter module: disabled CTA looks fully live**
Observed: a red "Get the quarterly note" button sits next to an active-looking email input; directly beneath it, small print reads "Quarterly email subscriptions are not available yet." The button itself carries no disabled/greyed treatment.
Why it matters: per the review brief this is intentionally unavailable, but nothing in the button's visual state communicates that before a user types an email and clicks — real conversion friction and a minor trust hit if the click goes nowhere.
Fix: either visually de-emphasize the button (outline/secondary style, "Coming soon" label on the button itself) or lead with the disclaimer and demote the form, pointing primary attention to the working alternative "Ask about your function ›" link that's already present.

**P1 — /about: internal claims presented with no citation alongside sourced market stats**
Observed: market numbers ("319 applications," "17.6 interviews") carry visible Ashby/Bain citations throughout /about and /intelligence. But adjacent internal claims — "200,000 interviews read, scored and argued about," "more than fifty" interviewers, and the four "WHERE THIS GOES" scoreboard lines ("Today: true for every interview," "Today, on technical roles: under two a month") — appear with the same typographic authority but no source or methodology link.
Why it matters: mixing cited and uncited claims at equal visual weight risks the uncited ones being read as equally verified, which is a credibility risk once a reader starts checking.
Fix: this review does not verify or propose replacement figures — flagging for the owner to either link these to a methodology/evidence note (similar to "How we know ›" on /intelligence) or mark them explicitly as self-reported internal metrics.

**P2 — /industries/banking-financial-services & /industries/ai-data, mobile breadcrumb wrap**
Observed: mobile breadcrumb renders as two uneven lines — `INDUSTRIES · BANKING & FINANCIAL` then `SERVICES` crammed against the H1 "Where the wrong hire costs more than a quarter." The same pattern is visible on /industries/ai-data's breadcrumb.
Why it matters: this is a repeating pattern across all twelve industry sub-pages (confirmed on 2 of them), not a one-off — it crowds the hero on every sector page at mobile width.
Fix: truncate to just the sector name on mobile (e.g. "BANKING & FINANCIAL SERVICES" without the "INDUSTRIES ·" prefix, since the back-link function is redundant with the breadcrumb above the fold) or force a line-break before the sector name instead of mid-word.

**P2 — /intelligence: "illustrative" framing is weaker than the number it's attached to**
Observed: the sample chart's bold claim — "Hardest to find: systems design. It held back 28% of the people who didn't clear." — is set in full headline weight, while its "ILLUSTRATIVE · SAMPLE DATA" qualifier is a small badge above it and a caption below ("No measured cohort... available for this demonstration").
Why it matters: per the brief this is explicitly illustrative, which is reasonable — but the finding here is a UX gap: a specific percentage this prominent is exactly the kind of claim that gets isolated/screenshotted without its context, since the sample label doesn't travel with the number itself.
Fix: inline a short qualifier directly on or beside the "28%" figure (e.g. "28%*" with "*sample figure" adjacent), not only in surrounding chrome.

**P2 — /about: "See how a search runs ›" gives no signal it leaves the page**
Observed: CTA sits inline with "Read Akshata's letter" (which jumps to `#letter`, same page) but actually links to `/#proof` — a different page entirely.
Why it matters: paired next to an on-page anchor link with identical visual styling, a reader has no cue that one stays on /about and the other navigates to the homepage — minor but avoidable friction in a page built around a single reading flow.
Fix: no code change needed necessarily, but consider distinguishing destination (e.g. "See how a search runs, on the homepage ›") or routing it to a same-page section if one exists.

**P3 — /about, Abhishek bio: unexplained internal jargon**
Observed: "He architected Tribera's scoring engine: what a CV hides, join probability, offer behaviour and retention." "Join probability" and "offer behaviour" are internal/product terms used without definition, unlike the rest of the page's plain-language voice.
Why it matters: minor inconsistency in an otherwise carefully demystified, jargon-free tone (the page goes out of its way to explain "judgment" vs "sourcing" elsewhere).
Fix: light rewrite, e.g. "what a CV hides, whether a candidate will actually accept, how they behave through an offer, and whether they stay" — or leave as a stylistic flourish if intentional, since the rest of the paragraph is plain.

**P3 — /case-study: dense "Before/After" scale diagram labels at desktop**
Observed: the "Five months, drawn to scale" bar on a near-black background packs four segment labels ("Six weeks," "Seven weeks," "Three weeks," "The rest") plus a floating "Month two" callout into a single thin bar; legible at 1366px but tight.
Why it matters: this is the page's primary proof visual; cramped labels on a dark background are the first place legibility degrades as viewport narrows further (not tested below 390px in this packet).
Fix: no change needed at tested widths — flagging as worth a spot-check between 390–768px, which wasn't in the supplied artifact set.
