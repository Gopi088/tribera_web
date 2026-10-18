## Review — v126 root-font + funnel focus fixes

### 1. Root font size before first paint — ✅ correct

`Layout.astro` keeps `2xl:text-[20px]` on `<html>` and adds an inline head block:

- `html { 16px }` + `@media (min-width:1536px) { html { 20px } }` reproduces the existing default for every route.
- `html.v126-document { 16px }` has specificity `(0,1,1)` vs. the Tailwind utility's `(0,1,0)` and vs. the media-query `html` rule's `(0,0,1)` (media queries add no specificity), so it wins regardless of source order, and it is unlayered so it also beats a `@layer utilities` build of Tailwind. Because it is `is:inline` in `<head>`, it applies before any external sheet resolves — consistent with the passing delayed-CSS/cold-refresh checks.
- Only `/` sets `htmlClass="v126-document"`; `PageLayout` forwards it and its default `mainClass` is unchanged. Other routes retain 20px at 1536px. Claim verified.

### 2. Funnel hover-vs-focus — ❌ current bug (asymmetric guard)

`mouseenter` and the grid `mouseover` are both guarded by `root.querySelector('.fnl-step:focus')`, but **the two teardown paths are not**:

```js
st.addEventListener('mouseleave', unpeek);
grid.addEventListener('mouseleave', unpeek);
```

Given `unpeek` is used unconditionally as the `blur` handler, it is not focus-aware, so:

**Repro A (the exact scenario the fix targets):** Tab to stage 2 → `focus` runs `setStage(2); peek(2,'reached')`. Pointer happens to rest over stage 2; smooth scroll (`:root:has(.v126-home){scroll-behavior:smooth}`) moves the element out from under the stationary pointer → `mouseleave` fires → `unpeek()` wipes the peek state of the still-focused stage. The mouseenter guard never gets a chance to re-establish it because the pointer never re-enters. Keyboard users lose the stage's "reached" visual while the element still has `:focus`.

**Repro B (no scrolling needed):** Focus stage 2 by keyboard, then move the mouse over stage 4 (enter is correctly suppressed) and off again → `mouseleave` → `unpeek()` clears stage 2's peek. Same on leaving the grid entirely.

Net effect: the guard makes hover unable to _set_ the stage while focus is held, but hover can still _clear_ the focused stage's peek — keyboard focus does not actually "own the stage".

**Fix** (same predicate, both paths):

```js
function unpeekIfUnfocused() {
  if (root.querySelector('.fnl-step:focus')) return;
  unpeek();
}
st.addEventListener('mouseleave', unpeekIfUnfocused);
grid.addEventListener('mouseleave', unpeekIfUnfocused);
```

`blur` must keep calling `unpeek` directly (at `blur` time `activeElement` is `<body>`, so the predicate would be false anyway, but keep it explicit for the tab-to-next-step ordering).

### Minor (non-blocking)

- Steps get `role="button"` + `tabindex="0"` only from JS, and nothing here exposes selected state (`aria-pressed` / `aria-current`) — if `setStage` doesn't set it, the active stage is visual-only for AT. Worth confirming in `setStage`.
- `PageLayout.astro` destructures `htmlClass` without an `export interface Props`, so it is untyped (`any`) while `Layout` is typed — a misspelled prop would fail silently.
- Homepage drops `overflow-x-clip` from the default `mainClass`; your 320–1520px suite covers this, just noting the deliberate divergence.
- Two separate `.v126-header { ... }` blocks (sticky/z-index and `background: transparent`) — harmless, worth merging.

### Verdict

**FAIL** — item 1 passes; item 2 is incompletely implemented. Guard the `mouseleave` handlers (step + grid) with the same focus predicate, then this is a PASS.
