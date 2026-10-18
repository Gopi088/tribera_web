## Review — restoration delta (`src/pages/index.astro` header slot removal)

### Scope check

The delta is exactly: drop `import Header from '~/components/home/v126/Header.astro'` and the `<Header slot="header" />` override. `Home` and `Footer` from `home/v126` remain, so updated home sections + updated footer stay while `PageLayout`'s default `<slot name="header">` fallback renders `widgets/Header` with `headerData`, `isSticky`, `showToggleTheme` — the same header the original tracked index resolved to. That matches the user request.

### Runtime / integration

- Slot fallback semantics are correct: with no `slot="header"` child supplied, Astro renders the default content, so exactly one `<nav id="nav">` exists and zero `.v126-header`. No duplicate `#nav`, `#navp`, `#navp-cov` IDs are introduced.
- `<Footer slot="footer" />` still overrides `widgets/Footer`, so `footerData` is intentionally unused on this route — no error, just the default being suppressed as designed.
- `StandaloneNavScripts` / `SharedNavFrame` are rendered by the shared `Header` itself, so removing the v126 header cannot orphan nav behavior. No `ClientRouter`, so no re-init/duplicate-listener hazard.
- Header CTA (`/contact`, `data-form-intent="role"`, `data-form-source="header"`) is original behavior and is intercepted by the global form delegate — preserved as requested, not a dead link.

### Test fidelity

Assertions line up with the supplied markup:

- `#nav .nav__links > .nav__l` correctly uses direct-child combination, which excludes the `Coverage` anchor nested in `.dd` → the six-item array is exact.
- `#nav .dd__t` `textContent` is `'Coverage'` (the trailing `<i></i>` contributes no text) — matches.
- `#nav .nav__sw a` is class-scoped so it does not collide with `.navp__sw` anchors — two items, correct.
- Column counts match the markup exactly: Industries 12, Functions 8, in both `.dd__c` and `.navp__c`.
- Desktop path uses `hover()` + `waitFor({ state: 'visible' })` rather than clicking the `/industries` label — correct, since clicking would navigate away and make the subsequent `.dd__c` counts flaky/false-negative.
- Mobile path exercises real ARIA state (`burger[aria-expanded]`, `#navp` visibility, `.navp__t[aria-expanded]`, Escape-to-close) rather than CSS-only proxies.

### Accessibility (delta-scoped)

Restored header ships `aria-label`, `aria-expanded`, `aria-controls` on both the burger and the Coverage toggle; `aria-current="page"` is computed per-route; the wordmark link has `aria-label="tribera home"`. Nothing in the delta regresses this.

Non-blocking, pre-existing in the untouched shared `Header` (explicitly out of scope, not introduced here, do not fix as part of restoration): `.dd__p` carries `role="menu"` while containing `<p class="dd__k">` headings and plain links without `role="menuitem"`, so the ARIA menu pattern is not fully honored; and the desktop dropdown is hover-driven, with keyboard users falling back to the `/industries` landing page. Both predate this change and both were flagged in review25 against legacy shared files.

### Minor observations (not defects)

- `mainClass="v126-route w-full"` drops `overflow-x-clip` from the layout default; the 320–1920 sweep passed, and this predates the restoration delta.
- The route's `is:global` body font (`Inter Tight`) now also applies to the restored nav, just as the original route's `--v58-ui` did. Expected consequence of keeping the updated home styling, not a regression.

### Verdict

**PASS** — no new restoration defects. The delta restores the previous navbar elements and items exactly, leaves the updated home sections and footer intact, introduces no duplicate IDs, dead CTAs, or broken nav scripts, and the navbar assertions are correctly written against the restored markup.
