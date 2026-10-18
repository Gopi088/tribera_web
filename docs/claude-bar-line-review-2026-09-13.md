# Threshold Line Regression - Claude Review

## Verdict: fix and tests confirm; R19 may stay Verified (local) only with an amended record

**Root cause and fix — confirmed.** `Home.astro:1415` now reads `.v58-barcard.is-animated :where(.v58-bar-line, .v58-bar-checks path)`. The specificity arithmetic you gave holds:

- Old prep with `:is` = (0,3,1) — `:is()` takes its most specific argument, `.v58-bar-checks path` (0,1,1), on top of two classes.
- Completed line rule `.v58-barcard.drawn .v58-bar-line` = (0,3,0) → **loses**, so `stroke-dashoffset: 1` stuck; line invisible.
- Completed checks rule `.v58-barcard.drawn .v58-bar-checks path` = (0,3,1) → ties and wins on source order, so checks drew.

That asymmetry is exactly the reported symptom (checks visible, threshold line missing), and the observed `strokeDashoffset 1px` with `stroke rgb(19,19,19); opacity 1` rules out a colour/opacity cause. `:where` drops prep to (0,2,0), below both completed rules. Minimal and correct; nothing else in 1408–1447 depends on prep outranking `.drawn`.

**Fallbacks — structurally safe, not just asserted.** Prep lives inside `@media (prefers-reduced-motion: no-preference)` and requires `is-animated` (JS-applied), so reduced-motion and no-JS never enter the dashed state. Tests pin both anyway: `tests/home-handoff.test.mjs:12-16` (reduced motion, four widths) and `:125-129` (JS disabled).

**Regression guard — real.** `:110-116` asserts computed `strokeDashoffset === 0` on `.v58-bar-line` _and_ the check paths after `drawn`; pre-fix this would have read `1` for the line, so it genuinely fails on the old CSS. `:117-120` keeps the left-to-right stagger. `scripts/test-reviewed-site.mjs:24` runs `home-handoff` first and throws on non-zero exit, so it gates CI.

Two soft spots, neither blocking: the 2100 ms wait at `:109` clears the 1.89 s worst-case transition by only ~210 ms (mid-transition `getComputedStyle` returns an interpolated non-zero, so a slow machine could flake), and the assertion is computed-style, not pixels — `/tmp/handoff-bar-line-animated.png` is captured but never compared. The screenshot does show the fixed state: continuous threshold line with the "YOUR BAR" label, three red squares with checkmarks above it, five grey below.

I read `/tmp/tribera-bar-line-tests.log` (four widths + the animation/no-JS line, all passing) but did not run anything; that result is yours, as with the existing `claude_review` convention in `docs/excel-bug-status.json`.

**On R19.** Keep `Verified (local)` — the current tree satisfies the row's claim. But the row as written is now misleading history and should be amended, not left as-is: when it was first marked Verified, the animated end-state was _partly broken_ (the threshold line never drew), and `home-handoff` did not assert line offset, so "Verified" rested on a test gap rather than on coverage. Concretely, I'd extend `outcome` to note the `:is`→`:where` specificity regression found and fixed after the initial verification, and note that the evidence test was strengthened to assert zero dash-offset for the line in animated, reduced-motion and no-JS states. `next_action` should stay "not deployed" — nothing here changes that this is local-only.

No blocker.

## Tracker Update

R19 was amended to record the failed initial coverage, specificity fix, strengthened tests and local-only verification. The original issue description and previous status remain preserved in the workbook.
