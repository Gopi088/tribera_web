## Step 15 — Footer: PASS (markup fidelity), with 2 actionable issues outside the markup itself

### Markup fidelity — clean

Structure, class names, order, copy, `aria-label`s on the four `<nav>` landmarks, `ft-bbb`/`ft-tribe`/`ft-social`, and the `ft-bar` block are byte-for-byte equivalent to the sample. All deltas are the sanctioned link fixes and are internally coherent:

- `brand` `#top` → `/`
- `/roles` → `/careers#roles`
- `/candidates#privacy` → `/candidates#controls`
- `/dpa` "Data processing" → `/contact` "Request a DPA" (label changed to match the new destination — correct, not a copy regression)

`.ft-up` keeping `href="#top"` is fine even with no `id="top"`: the HTML fragment-navigation spec treats `top` as scroll-to-document-start.

CSS wiring is correct: rules are written as `:is(…, .v126-footer, …) .ft{…}`, and `<footer class="ft">` is a descendant of the `.v126-footer` wrapper, so `.ft*`, `.wrap`, the reset, and all `--*` tokens (`--charcoal`, `--line-d`, `--pw`, `--pw2`, `--ink-3`, `--mono`, `--display`) resolve. No `.ft` rule depends on a token defined outside the namespaced block.

### Issue 1 (medium, fix) — focus ring is silently removed

The parent page's global block does:

```css
:focus-visible {
  outline: 2px solid var(--v58-red);
  outline-offset: 3px;
}
```

`--v58-red` is not defined by the v126 token block (which defines `--red`), and nothing in the supplied CSS defines it. If it is undefined at runtime, the declaration is invalid at computed-value time and `outline` resolves to `unset` → `outline-style: none`, i.e. **focus indication is stripped, including the UA default**, for the ~20 links in this footer and for the rest of the page. Same class of bug for `body { font-family: var(--v58-ui) }` (footer is unaffected there, since `.v126-footer` sets `font-family: var(--body)`, but the rest of the page silently falls back to UA font).

Fix: use the v126 token with a literal fallback, e.g. `outline: 2px solid var(--red, #DA0007)` and `font-family: var(--body, system-ui, sans-serif)`.

### Issue 2 (minor, namespacing side effect) — smooth scroll no longer applies

`scroll-behavior:smooth` was moved onto `:is(.v126-home, .v126-footer, .v126-header)`. `scroll-behavior` is not inherited and applies only to the element's own scrolling box; these wrappers are not scroll containers, so the property is inert. The footer's in-page links (`#proof`, `#funnel`, `#results`, `#ways`, `#experts`) and "Back to top" now hard-jump instead of smoothly scrolling as in the sample.

Fix: keep it on the document root, guarded, e.g. `html:has(.v126-home){scroll-behavior:smooth}` (or set it in the homepage-scoped JS/root class) plus the existing `prefers-reduced-motion` reset. The `-webkit-text-size-adjust:100%` relocation is fine by contrast — that property _is_ inherited.

### Note (non-blocking, inherited from sample)

`--pw2` = `rgba(255,255,255,.42)` on `#121212` computes to roughly 3.8:1, used for `.ft-line` (14.4px) and `.ft-ttl`. Below WCAG AA for body text. This is faithful to the sample, so it is not a migration defect — flagging only so it can be raised as a design decision rather than rediscovered later.
