## Review — Step 14: `#start` section

**Verdict: PASS**

### Fidelity check

**Markup/text** — Identical to the sample:

- Section wrapper `class="start g-white" id="start"` and `aria-hidden="true"` on `.start-field` preserved.
- Eyebrow (`\` tick + "Stop screening. Start choosing."), `h2`, and `.lead` copy match character-for-character, including curly apostrophes/em-dashes and the `›` in the secondary link.
- `data-rv` attributes and stagger delays (`--d:60ms`, `120ms`, `180ms`) and the inline `justify-content:center` on the eyebrow are preserved.

**Decorative SVG** — Verified row by row (`viewBox="0 0 740 146"`, 7 rows × 34 rects, step 22, `rx="3"`). All three accent cells match the original exactly: `(198,22)`, `(594,44)`, `(440,88)` at `#DA0007 / 0.16`; all remaining cells `#131313 / 0.03`. No dropped, duplicated, or shifted rects.

**CSS coverage** — Every selector this section depends on is present and namespaced under `:is(.v126-home, .v126-footer, .v126-header)`: `.start` (position/overflow), `.start > .wrap` (z-index:1), `.start-field` (absolute + radial mask + `width:min(880px,94vw)`), `.start-field svg`, `.start-head`, `.start .lead`, `.start .cta-row`, plus shared `.eyebrow`, `.btn-primary`, `.link`, `.cta-row`, `.wrap`, `.g-white`, and the `.g-white + .g-white` top border. Nothing referenced by the markup is missing.

**Behavior without JS** — `:not(.is-enhanced) [data-rv]{opacity:1;transform:none}` plus the reduced-motion block ensure this static section renders fully with JS disabled. No JS dependency in this section.

### Intentional integration changes (not defects)

- `href="#"` → `href="/contact"` on both CTAs with `data-form-intent` / `data-form-source="v126-start"` — matches the stated placeholder-link fix.

### Non-blocking observations

- The `.start-field` SVG could carry `focusable="false"` alongside `aria-hidden` for legacy IE/Edge tab-order safety, but this mirrors the sample and every other decorative SVG in the migration, so it's consistent.
- Both CTAs resolve to the same `/contact` URL and are distinguished only by data attributes; if the downstream form reads those attributes this is correct, and it is outside the fidelity scope of this step.

No actionable issues.
