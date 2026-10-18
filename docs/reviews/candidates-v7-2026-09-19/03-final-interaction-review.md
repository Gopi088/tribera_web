This matches the expected flipped "The team asking" state, with navbar untouched. I have enough to assess.

**Review**

Implementation (`candidate-v7.ts:64-93`):
- Click and Arrow/Home/End keyboard selection correctly implemented, `preventDefault()` on handled keys, roving `tabindex` (selected=0, others=-1), `aria-selected` and `aria-hidden` toggled correctly — this is the standard ARIA APG manual-activation tabs pattern (tabs activate on Enter/Space via native button click, arrows just move focus+select here — combined behavior is fine given the visual "either side" affordance).
- `flipCard?.classList.toggle('is-b', index === 1)` and `profileCard?.classList.toggle('is-flipped', index === 1)` correctly drive the sample's existing CSS classes (`cand-team-1440.png` confirms the flipped face renders correctly).
- Initial `selectProfileSide(0)` call is gated on `profileTabs.length === 2`, consistent with the rest of the file's defensive querying style.
- Arrow keys wrap with modulo — correct for a 2-tab set (ArrowRight/Left both toggle between the two, matching Home/End behavior for n=2).

One minor gap: `event.key === 'ArrowDown'/'ArrowUp'` are treated as valid tab-navigation keys, but this is a horizontal tablist (`role="tablist"`, no `aria-orientation="vertical"`). ARIA APG says only Left/Right should apply for horizontal tabs; Up/Down are optional/discouraged since they can conflict with page scroll expectations. Not a bug, just slightly looser than spec — non-blocking.

Test coverage (`tests/candidates-layout.test.mjs:64-72`):
- Verifies initial `aria-selected` state, click-based switch, `aria-hidden` flip on both faces, `is-b` class toggle, and keyboard `Home` navigation including focus verification. This meaningfully covers the new behavior (click + keyboard + ARIA sync + CSS class), not just a smoke check.
- Gap: doesn't test `aria-selected="false"`/`tabIndex=-1` on the now-deselected tab, and doesn't test ArrowRight/ArrowLeft or `profileCard`'s `is-flipped` class directly — but `is-b` on `#flip` is a reasonable proxy since both classes toggle together in `selectProfileSide`. Acceptable coverage, not exhaustive.

Navbar/layout: `#nav` count checks, no horizontal overflow checks, and CV screenshot all confirm no navbar disturbance — consistent with prior PASS finding that this task doesn't touch `SharedNavFrame.astro`.

No concrete defects found that block merge.

**Verdict: PASS**
