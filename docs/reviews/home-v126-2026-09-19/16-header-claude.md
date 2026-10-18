## Step 16 — Header: ISSUES

**Blocking**

1. **`.v126-header header.nav { position: static; }` breaks the mobile menu positioning.**
   The sample sets `header.nav{position:sticky;top:0}`, and `.nav-mobile` relies on it: `position:absolute;top:100%;left:0;right:0`. With the header forced to `static`, `.nav-mobile` has no positioned ancestor (`.v126-header` is also unpositioned), so its containing block becomes the initial containing block — `top:100%` resolves to one viewport height from the top of the page, not the bottom of the header. On ≤860px the open menu will render detached/offscreen-ish rather than under the bar.
   Fix: restore `position:sticky;top:0` on `.v126-header header.nav`, or, if static is deliberate (to avoid two sticky bars with the shared nav), add `position:relative` to `.v126-header header.nav` so the dropdown anchors correctly.

**Minor / non-blocking**

2. Collapsed mobile menu stays in the a11y and focus order. At ≤860px `.nav-mobile` is `display:flex` with `opacity:0;pointer-events:none` when closed, so its 5 links and CTA remain keyboard-focusable and exposed to AT while `aria-expanded="false"`. Since you are already adding `aria-controls`/`aria-expanded`, consider adding `visibility:hidden` (transitioned) or toggling `inert`/`hidden` in `setOpen` so the announced state matches reality.
3. With `position:static`, the `scrolled` scroll listener only toggles a background/shadow on a non-fixed bar — dead weight; remove it or keep it alongside the sticky fix in (1).
4. Scroll-spy: the `IntersectionObserver` callback loops all entries and re-applies `active` per intersecting entry, so with two sections simultaneously intersecting the last entry in the batch wins and can flicker. Picking the topmost intersecting target once per callback would be steadier. Cosmetic only.

**Verified fine**

- Markup matches sample; `href="#top"` → `/` is an allowed placeholder-link fix; `type="button"`, `aria-controls="v126-menu"`, `id="v126-menu"` are additive and correct.
- No-JS fallback is sound: `is-enhanced` is added only when `nav && burger` exist, and `.v126-header:not(.is-enhanced)` renders the mobile list statically while hiding the burger.
- Burger label swap, outside-click close, Escape + focus return, and link-click close are all correct and scoped to `.v126-header`.
- Namespacing under `:is(.v126-home,.v126-footer,.v126-header)` matches the sample selectors; desktop `.nav-mobile{display:none}` base rule is intact.
