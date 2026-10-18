# Claude Final Polish Review

Source/test review only; the final production rerun was still underway when this verdict was requested. The earlier broad follow-up approval is in claude-v60-followup-review-2026-09-14.md.

## Verdict

**ACCEPT** — all six polish notes have appropriate fixes at the offsets inspected. No blockers.

**What I confirmed**

1. **Dangling label** (`Home.astro:320-338`): the `<label data-row>` now wraps its `input[type=range]`, so it's an associated control, not a dangling label. `aria-label={Importance of ${label}}` keeps the name clean despite the `<b data-share>` percentage inside.
2. **Misleading static instruction** (`310-314`): the no-JS state is now two separate paragraphs — a `[data-lab-unavailable]` disclosure ("Static example shown…") plus a descriptive, non-imperative `#weight-instruction` ("Importance shows how much each skill counts in this example"). Nothing tells a user to move disabled sliders.
3. **Instruction only after successful upgrade** (`2949-2958`): `update(false)` runs first; only then is the text swapped to "Adjust the sliders…", controls un-disabled, and the unavailable notice hidden. Order is correct — no window where the imperative text shows over disabled controls.
4. **Repeat guards** (`v60-copy.test.mjs:45-52`): `doesNotMatch(/We confirm interviewer coverage/)`, `coverage__focus count === 4`, 17 roles with `new Set(roles).size === 17`, and `#experts ul count === 0`. Duplication is now asserted, not assumed.
5. **Underline overrun** (`1330-1332`): `width: calc(100% - 0.25em)` on `.v58-thesis__claim .v58-hd-underline`. Note this override is scoped to `.v58-thesis__claim` only — if the payoff line uses a different class, it is unfixed; I did not widen the read to check.
6. **Clarifier spacing** (`1687-1691`): `.v58-experts__confirmation { margin: 0 0 24px }` separates it from the coverage list.
7. **Accessible-name evidence** (`client-publication.test.mjs:52-61`): `ariaSnapshot()` with exactly-once-per-name assertion plus the 11/11 visible/`aria-hidden` split is real evidence, not an inference.

`reviewed-bugs.test.mjs:129-134` correctly branches the expected instruction text by mode.

Not claimed: production rebuild and the 8-suite rerun are still pending per your note.

## Targeted Clarification

The first response misread the dangling prose reference as an HTML form-label question. The following clarification checks the actual text and payoff class. Note: the full role inventory is in #cover; the immediate expert list contains specialisms and focus descriptions, not a repeated role inventory.

**1. Dangling reference — yes, resolved.** Line 477 now reads "Four groups, spanning the roles listed below." It points at the list rendered immediately beneath it (line 478's `v58-coverage` listitems) rather than naming a "Coverage" heading that never existed. The nearby text at line 476 is a descriptive label ("Interview expertise, grouped by specialism"), not a section-name reference either. No remaining pointer to a nonexistent heading.

**2. Payoff class — confirmed.** Line 160 opens `<p class="v58-thesis__claim">`, containing the "Three worth meeting" payoff with the `v58-hd-underline` SVG. So it matches the selector the scoped underline fix targets.

