## Step 10 — `#results` (testimonial marquee): **PASS**

**Markup fidelity:** byte-for-byte equivalent to the sample. Verified: section classes (`tm g-dark`), `id="results"`, the 640px header block, `eyebrow`/`tick`, `h2`, `p.tm-lede`, all `data-rv` + `--d` stagger values (60/110/150ms), and all six `figure.tm-card` nodes in the same order with identical tags (`tm-tag--ta` / `tm-tag--cd`), quote text, names, roles, and `aria-hidden="true"` on the three duplicate cards. No content drift, no dropped entities (`&ldquo;`, `&amp;`, em dashes intact).

**CSS coverage:** every class used by this section has a namespaced rule present — `.tm h2`, `.tm-lede`, `.tm-marquee` (+mask), `.tm-track` (+`v126-tmmove`), `.tm-card`/`:hover`, `.tm-mark`, `.tm-tag`/`--ta`/`--cd`, `blockquote`, `figcaption b|span`, plus `.g-dark .eyebrow` and `[data-rv]`. The keyframes are renamed (`v126-tmmove`) and referenced consistently. Duplicate-set + `translateX(-50%)` loop math still matches the 3+3 card structure.

**Namespacing:** all selectors are scoped under `:is(.v126-home, .v126-footer, .v126-header)`; nothing here can leak to other pages.

Two non-blocking observations (both inherited from the sample, not regressions):

1. **Reduced-motion handling is slightly better than the sample** — the added `.tm-card[aria-hidden="true"]{display:none}` under `prefers-reduced-motion` correctly prevents the duplicate set from rendering as visible wrapped cards once `.tm-track` switches to `flex-wrap:wrap;width:auto`. Note the later global `animation:none !important` rule already kills the marquee, so the earlier `.tm-track{animation:none;flex-wrap:wrap}` block is redundant but harmless.

2. **`[data-rv]` starts at `opacity:0`** — if the scoped homepage JS fails to load, this section's heading/lede/marquee stay invisible. Given the stated goal of "static content without JS," you may want a `<noscript>` (or `html:not(.js)`) override that forces `[data-rv]{opacity:1;transform:none}`. This is a site-wide concern rather than a step-10 fidelity issue, so flagging only.

No actionable defects in this section.
