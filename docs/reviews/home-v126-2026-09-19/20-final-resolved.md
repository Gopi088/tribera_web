## Verdict: FAIL — one concrete, blocking runtime defect

### Bug 1 (blocker) — `unpeekIfUnfocused` is declared inside `setStage`, but referenced at IIFE scope → `ReferenceError` on load

`src/components/home/v126/interactions.js`, funnel block:

```js
function setStage(n) {
  ...
  fF.innerHTML = REST[n];
  function unpeekIfUnfocused() {          // <-- scoped to setStage only
    if (!root.querySelector('.fnl-step:focus')) unpeek();
  }
  steps.forEach(...);
}
...
steps.forEach(function (st) {
  ...
  st.addEventListener('mouseleave', unpeekIfUnfocused);   // ReferenceError
  ...
});
grid.addEventListener('mouseleave', unpeekIfUnfocused);   // never reached
```

Function declarations hoist only within their enclosing function body. At the two call sites the identifier is unresolved, so the first `steps.forEach` iteration throws `ReferenceError: unpeekIfUnfocused is not defined`. This is uncaught and propagates out of the whole outer IIFE.

**Observed runtime consequences (all current, not hypothetical):**

1. **Funnel is broken.** Only step 1 receives `tabindex="0"`/`role="button"`/`mouseenter`; steps 2–5 get none. Since prior review #2 removed the static `role`/`tabindex`/`aria-pressed`, steps 2–5 are now **not keyboard focusable and expose no role at all** — a regression of the very fix being claimed. `aria-pressed` is never set on any step (`setStage(1)` at the bottom never runs), so the accessible state is absent. The `grid` hover-peek listener, the scroll-triggered count-up and the 2→3→4→5→1 auto-play IntersectionObserver are never registered.
2. **Proof/lab section is dead.** Execution never reaches the lab IIFE, so `rows.querySelectorAll('input').forEach(i => i.disabled = false)` never runs: every weight slider stays `disabled` (server-rendered that way in `Proof.astro`), presets don't bind, and `#labStatus` stays at the hardcoded "Select, 39.00 out of 50" forever. The interactive centerpiece is inert.
3. **`.cu` counters, `.hd-*` draw-in, and `#obCap` hover captions never bind.**
4. **`root.classList.add('is-enhanced')` never executes**, so `.v126-home` permanently keeps the `:not(.is-enhanced)` no-JS fallback CSS. That happens to keep content visible (good), but it also means the page is _silently_ stuck in fallback while the funnel/lab are half-initialized — the failure is invisible in a smoke test and only shows as non-interactive controls.

Note the header script is a separate `<script>` in `Header.astro`, so nav/burger/active-link still work; the failure is confined to `interactions.js` (i.e. everything under `.v126-home`).

**Fix:** hoist the helper to the funnel IIFE scope, next to `peek`/`unpeek`:

```js
function unpeek() { ... }
function unpeekIfUnfocused() {
  if (!root.querySelector('.fnl-step:focus')) unpeek();
}
```

and delete the nested copy inside `setStage`.

### Items verified as resolved (no action)

- Nav class collision: `header.v126-nav` scoped, no bare `.nav` rules — OK.
- Mobile panel is a real `<nav aria-label="Mobile primary">`, `inert` toggled with `aria-expanded`/`aria-label`, Escape returns focus to the burger, `.is-enhanced` gates the `visibility:hidden` so the no-JS panel stays reachable — OK.
- Anchor targets for all four `.nav-links` hashes exist; `#experts` correctly lives only in the mobile list. Link ordering per authorized sample — not flagged.
- `SiteFonts` import/render and the prerendered `/fonts/site-fonts.css` endpoint (base64 for critical faces, URL for Figtree 400–700 and Caveat) — OK.
- `Proof.astro` escaping, placeholder assertions, scoped `.sr-only` `#labStatus`, and `\u003c`-escaped JSON island — OK.

Re-review after Bug 1 is fixed; nothing else blocks.
