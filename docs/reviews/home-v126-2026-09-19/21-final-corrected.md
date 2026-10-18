## Review — v126 home (header, funnel, lab, fonts, integration)

### Verified fixes

**1. Funnel roles/state (prior #2)** — `funnel.html` ships no `role`/`tabindex`/`aria-pressed`; `interactions.js` adds `tabindex="0"` + `role="button"` in the `steps.forEach` pass, and `setStage()` writes `aria-pressed` for every step. Order is correct: attributes are attached before the initial `setStage(1)` call, so no step is ever a `role="button"` without `aria-pressed`. Keyboard activation is handled explicitly (`Enter`/`Space` with `preventDefault`), which is required since `div[role=button]` does not synthesize `click`. ✔

**2. Hover/focus peek race (reviewed 19 follow-up)** — `unpeekIfUnfocused` is bound to both `step.mouseleave` and `grid.mouseleave`, and both `step.mouseenter` and `grid.mouseover` bail out while a `.fnl-step:focus` exists (`mouseenter` additionally allows the case where the hovered step _is_ the focused one). `blur` → unconditional `unpeek` is consistent, because focus moving between steps fires `blur` then `focus`, and the incoming `focus` re-peeks. No state where the caption and the `.co`/`.peek` classes disagree after pointer exit. ✔

**3. Nav CSS collision** — the home header rule set is now keyed on `header.v126-nav` / `.v126-nav .wrap` under `:is(.v126-home,.v126-footer,.v126-header)`; there is no bare `.nav` selector left to collide with the shared dark-mode `!important` rules. The wrapper `.v126-header{position:sticky;top:0;z-index:60}` with inner `header.v126-nav{position:relative}` is the correct sticky arrangement, and `PageLayout` is invoked with `mainClass="v126-route w-full"` so the default `overflow-x-clip` (which would break sticky) is not applied. ✔

**4. Mobile nav semantics** — `<nav class="nav-mobile" id="v126-menu" aria-label="Mobile primary">` is a distinct labelled landmark from `aria-label="Primary"`; `aria-controls` matches the panel id; `aria-expanded`/`aria-label` flip together; `inert` plus `.is-enhanced .nav-mobile{visibility:hidden}` gives belt-and-braces focus removal (and covers browsers where `.inert` is a no-op property). DOM order (burger → panel) means the natural tab path enters the panel, and Escape restores focus to the burger. `:not(.is-enhanced)` fallback renders the panel as a static list under 860px. ✔

**5. Lab/Proof integration** — `Proof.astro` escapes all interpolated strings, hard-fails the build on a missing placeholder, ships sliders `disabled` for the no-JS path, and `interactions.js` re-enables them before the first `paint()`. The `sr-only #labStatus` live region exists and is style-scoped by `.v126-home .sr-only`; `announce()` is debounced (400 ms) and cleared at the top of `paint()`, so slider drags produce one announcement rather than a flood. `JSON.stringify(...).replaceAll('<','\\u003c')` correctly neutralises `</script>` in the `application/json` payload, and `is:inline` keeps the block in place inside `.v126-home` for `root.querySelector('#labData')`. ✔

**6. Header scrollspy** — anchor order vs. document order is irrelevant here: each observer entry clears `active`/`aria-current` on _all_ links before setting the match, so exactly one link is current regardless of source order; `aria-current="location"` is a valid token. All four `.nav-links` hashes are non-empty, so `document.querySelector(link.hash)` cannot throw. Not a defect.

**7. Fonts / layout** — `SiteFonts` is imported and rendered by `Layout`, `/fonts/site-fonts.css` is a real prerendered endpoint, and every face named in the `document.fonts.load()` list resolves to an inlined critical face (Fraunces italic `400 900` covers the requested `italic 500`). No route conflict with `public/fonts/*.woff2`. ✔

**8. Legacy PageLayout scripts** — `initProofSection`, `initCandidateSection`, `initCustomerMarquee` all early-return on this route (the v126 `#proof` has none of `.count-number`/`#triberaBar`/`#proofCountersGrid`), and `initSamePageSectionLinks` cooperates with the header anchors: `scrollIntoView({block:'start'})` honours the `scroll-margin-top:74px` on `section[id]`, which clears the 62px sticky bar. No double-handling or offset bug. ✔

### Non-blocking observations (not defects; no change required)

- If the pointer happens to rest on `#fnlGrid` during the 4.6 s intro autoplay, a `setStage()` tick rewrites the caption without clearing `.peek`/`.co` (grid hover deliberately does not set `userTook`). Self-corrects on the next `mouseover`/`mouseleave`; transient and inherent to the sample's intro.
- Non-inlined faces (Figtree 400–700, Caveat) use `font-display:block`, so a slow connection can show up to ~3 s of blocked text for the below-fold signature. Deliberate per the comment, and the critical faces are inlined.

## Verdict: **PASS**

No concrete runtime, accessibility, fidelity, or integration defects found in the supplied source.
