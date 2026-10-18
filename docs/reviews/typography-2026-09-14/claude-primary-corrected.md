# Independent Claude Review

Follow-up critique based on verified facts supplied from the browser audit; no additional tool access in this pass.

## Correction to prior review

The earlier Claude review's claim of "no heading size drift" is wrong. There's real, measurable inconsistency:

- Most marketing section H2s: 48px desktop / 32px mobile
- Home peer sections: 48/30, except workflow/trust: 36/26.25
- Candidate page: 48/30, except conversation section: 26.25 mobile; hero subtitle-adjacent text at 27.3 mobile
- Root cause of the 32 vs 30 split: standalone pages use 16px root font, main-layout pages use 15px root — an inherited environment difference, not intentional design.
- Hero title desktop sizes are inconsistent (53.12 / 58 / 62) due to competing local font-size rules per page, not container width as previously assumed.

The earlier suggestion to narrow the Experts section heading should also be dropped — that section was deliberately set to full-width with the subtitle below per explicit user request. Recommending narrowing it would revert an intentional decision.

## Confirmed problems (not opinion)

1. Root font-size split (16 vs 15) creates an unintended 32/30 mobile H2 discrepancy across otherwise-identical section types.
2. Hero title desktop sizing has three divergent values (53.12/58/62) from duplicated/competing CSS rather than a deliberate scale.
3. Workflow/trust and conversation sections deviate from the 48/36-ish pattern with no evident semantic reason (36/26.25 vs 48/30).
4. CSS for these type rules is duplicated across components rather than centralized, which is why drift keeps happening and is hard to audit.

## Design preference (not a problem)

- Card titles ranging 16px UI to 28px serif are not a misuse of H3 — they serve distinct semantic roles (UI label vs. editorial card). Don't flatten these into one token without confirming intent per card type.
- Hero size differences may partly be intentional emphasis per page type (index/hero vs. career detail vs. About/Services/Contact/Intelligence) — this needs a design decision, not just a bug fix.

## Blanket 36px H2 conversion: for/against

**For:**

- Immediately removes the desktop 48-vs-36 and mobile 30/32-vs-26.25 inconsistency in one move.
- Simplifies maintenance — one token instead of per-section overrides.
- 36/28 preserves reasonable visual hierarchy against card titles (22-24) and article body (28-32).

**Against:**

- Loses the intentional weight difference between primary hero-adjacent sections and secondary sections — some sections may deserve the larger 48px treatment and blanket conversion erases that signal without design review.
- Without testing in-browser, dropping every H2 to 36 risks awkward proportion with existing hero (53-62) and lead text (16-19) — the whole scale should be reviewed together, not just H2 in isolation.
- Doesn't fix the underlying root cause (16 vs 15 root font-size split across layouts); if that's not fixed, a new form of drift will resurface at every other rem-based token.

## Bounded recommendation

- Fix the root font-size split first (standalone vs. main-layout) — this is the actual bug, and until it's fixed any new token will drift again on mobile.
- Adopt role-based tokens (primary section H2, secondary section H2, card title, article body, hero, subtitle) rather than one blanket H2 value — the workflow/trust and conversation sections may legitimately warrant a smaller "secondary" tier rather than being forced to match 36 or 48.
- Treat hero title unification (53.12/58/62) as a separate decision — resolve whether the three sizes are intentional per page type before consolidating.
- Do not narrow the Experts heading.
- Note: I have not run this in a browser — sizing recommendations above should be visually verified before implementation, this review is source/spec-based only.
