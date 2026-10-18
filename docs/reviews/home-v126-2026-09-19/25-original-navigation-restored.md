# Review — v126 home route + shared shell

Scope: `src/pages/index.astro`, `src/layouts/PageLayout.astro`, `src/components/widgets/Header.astro`, `SharedNavFrame.astro`, `StandaloneNavScripts.astro`, `tests/home-v126.test.mjs`. (`Home.astro`, `Footer.astro`, `ContactSalesModal.astro`, `Layout.astro` were not supplied; findings below are all provable from the supplied files.)

## Verdict: **FAIL** — 7 concrete bugs, 3 of them blocking.

---

### 1. BLOCKING — Desktop "Coverage" dropdown is unreachable by keyboard

`StandaloneNavScripts.astro`, dropdown wiring.

The panel is opened only by `dropdown.addEventListener('mouseenter', …)`. The click handler starts with `if (toggle.tagName === 'A') return;` — and `.dd__t` **is** an `<a href="/industries">` (Header.astro). There is a `focusout` handler that closes the dropdown, but **no `focusin`/`focus` handler that opens it**. A keyboard user tabbing to "Coverage" never gets the panel, so 12 industry + 8 function links are unreachable (or, if the panel is hidden with `opacity`, focusable-but-invisible — equally a failure).

The test misses this because Playwright's `.click()` dispatches `mouseenter` first, so hover opens it.

Fix: `dropdown.addEventListener('focusin', () => { closeDropdowns(dropdown); dropdown.classList.add('open'); toggle.setAttribute('aria-expanded','true'); })`, and render `aria-expanded="false"` + `aria-haspopup="true"` in Header.astro so the state exists before JS.

### 2. BLOCKING — Header CTA is rewritten to a dead in-page anchor with the wrong intent

`StandaloneNavScripts.astro`:

```js
document.querySelectorAll('.nav__cta, .navp__cta .btn').forEach((link) => {
  link.href = '#contact';
  link.dataset.formIntent = 'demo'; // SSR rendered 'role'
});
```

On `/` there is no `id="contact"` — the page's sections are `proof … start` (see `order` in the test) and the in-page CTA in `#start` points to `/contact`. Also `initSamePageSectionLinks` explicitly skips `[data-form-intent]` links, so no smooth-scroll fallback applies. Result with JS enabled: the primary header CTA either jumps to top/nowhere, or (if a global `[data-form-intent]` delegate intercepts it) opens the form with `intent=demo` while the server markup, the no-JS path, and `#start` all say `role`. Either way the header CTA behaves differently from every other CTA on the page.

Fix: delete the rewrite block; keep the server-rendered `href="/contact"` / `data-form-intent="role"`. Add a test assertion for `#nav .nav__cta` href + intent (currently untested).

### 3. BLOCKING — Demo modal breaks after any client-side navigation

`PageLayout.astro`, `initCTAAndModal`.

`window.__triberaCTAAndModalInit` short-circuits the whole function, but `modal`, `form`, `submitBtn`, `successMsg`, `errorMsg` are captured on first run. It is bound to `astro:page-load`; on the second page those cached nodes are detached, so the `submit` listener no longer exists on the live form (native POST + navigation instead of the AJAX path) and `closeModal()` mutates a detached node. Every sibling initializer in this file re-runs correctly (`initCustomerMarquee` guards per element, `initCandidateSection`/`initProofSection` re-query and clean up) — this one is the outlier.

Fix: keep the `__triberaCTAAndModalInit` guard only around the document-level delegated `click`/`keydown` listeners; re-query elements and re-bind the form listener on every `astro:page-load`.

---

### 4. Reduced motion ignored by the anchor scroller

`PageLayout.astro`, `initSamePageSectionLinks`: `nudgeToSection()` fires two `behavior:'smooth'` scrolls 120 ms apart and `target.scrollIntoView({behavior:'smooth'})` runs unconditionally. Neither consults `prefers-reduced-motion` (the marquee code in the same file does — inconsistent). Use `behavior: reduceMotion ? 'auto' : 'smooth'` and skip the nudge entirely under reduced motion.

### 5. Dead 88 px header offset — anchored sections land under the sticky header

Same function:

```js
const scrollMarginTop = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop);
const offset = Number.isFinite(scrollMarginTop) ? scrollMarginTop : 88;
```

`getComputedStyle` always resolves `scroll-margin-top` to a px value (`"0px"` by default), so `Number.isFinite(0) === true` and the offset is `0`. The 88 px fallback can never be reached, and any target without an explicit `scroll-margin-top` is scrolled flush to the viewport top — under the 64 px header (`.nav__in { height: 64px }`, plus the `stuck` class and `navPanel.style.top = nav.offsetHeight` which imply fixed positioning).
Fix: `const offset = Number.isFinite(x) && x > 0 ? x : 88;`

### 6. Contrast failure on the audience switcher

`SharedNavFrame.astro`: `#nav .nav__sw a { color: #8d8c83 }` on `background: #eceae4` at `font-size: 12.5px; font-weight: 500`. Measured ratio ≈ **2.8:1**, below the 4.5:1 required by WCAG 1.4.3 for normal text. The inactive tab ("I'm looking" on `/`) is a primary audience-routing control. Darken to ~`#6a695f` (≈4.6:1) or ≥`#5f5e55`.

### 7. Success timer is never cancelled

`PageLayout.astro` submit handler: the `setTimeout(… 3000)` that hides the success message and calls `closeModal()` is not stored or cleared. Submit → reopen the modal within 3 s → the stale timer force-closes it mid-edit. Store the id and `clearTimeout` it in `closeModal()` and on open.

---

### Non-blocking, but fix while you're in here

- **Modal focus management is absent.** The open branch only toggles classes and `body.overflow-hidden`: focus is not moved into the dialog, is not returned to `#openDemoBtn` on close, and background content is not inert. Escape works, but SR/keyboard users are stranded behind the overlay.
- **`role="menu"` on `.dd__p`** (Header.astro) owns `<p class="dd__k">` headings, plain `<a>` elements and a prose footer, with no `menuitem` roles and no arrow-key model. Drop `role="menu"` and treat it as a disclosure — that is what the code actually implements.
- **`markPage('.navp__t', …)`** puts `aria-current="page"` on a disclosure `<button>` that doesn't navigate (invalid usage), and duplicates the correct `aria-current` already server-rendered on `.navp__coverage-link`. Same for `markPage('.dd__t', …)`. Also `aria-label="Expand Coverage"` never flips to "Collapse".
- **Proof counters can only ever count up once.** `resetCounters()` writes the _final_ value, and `animateCounters()` seeds `current` from `textContent`; on re-entry `current === target`, so the increment loop exits on the first frame. Reset should write `0` (or the animation start value). Currently masked only because `initProofSection` early-returns when `.count-number` / `#triberaBar` / `#proofCountersGrid` are absent — but `#proof` does exist on this route, so this is live if v126 ever uses those hooks.
- **Nav inventory is duplicated in two places** — Header.astro markup and the `primaryLinks`/`industries`/`functions` arrays in StandaloneNavScripts — and the script removes and rebuilds the SSR links on every load for no functional gain (and discards the SSR `aria-current` it then re-derives). `PageLayout` also still spreads `{...headerData}` and `showToggleTheme` into a `Header.astro` that destructures no props at all: dead integration.
- **Route-specific JS in the shared layout.** `#platform-overview`, `#proof`, `#demoModal` and marquee initializers are inline in `PageLayout` and ship to every route that uses it. Move to the owning components.

### Test gaps worth closing

No assertion on `#nav .nav__cta` href/intent (#2), no keyboard-only path for the desktop dropdown (#1 — use `page.keyboard.press('Tab')` + `.dd__p` visibility rather than `.click()`), and no post-`astro:page-load` modal check (#3).
