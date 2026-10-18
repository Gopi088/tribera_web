## Step 12 — Procurement — **PASS**

**Fidelity check (markup):** byte-for-byte identical to the sample except for the single added `id="procurement"` on the `<section>`. All four `.reg-row` pairs (Data / Scoring / Commercials / Guarantee), the `<b>` emphasis spans, the em dashes, the eyebrow `\` tick, and the `--d:60ms` / `--d:120ms` reveal delays match exactly. No text, ordering, or nesting drift.

**CSS coverage:** every class used is defined in the supplied namespaced sheet — `.proc`, `.proc-head`, `.proc h2`, `.reg`, `.reg-row` (+ `:first-child` border reset, hover, `max-width:600px` single-column collapse), `.reg-k`, `.reg-v`, `.reg-v b`, plus shared `.wrap`, `.eyebrow`, `.eyebrow .tick`, `.g-white`, `[data-rv]`. No orphaned or missing selectors.

**Specificity spot-check:** `:is(.v126-home,…) .proc{padding-block:clamp(48px,6.5vw,88px)}` is (0,2,0) and correctly beats the generic `:is(…) section{padding-block:clamp(76px,10vw,140px)}` at (0,1,1), so the sample's tighter vertical rhythm for this band is preserved.

**Added `id` is safe:** `:is(…) section[id]{scroll-margin-top:74px}` already exists, so the new anchor lands below the 62px sticky nav rather than under it. No style side effects from the id itself.

### Minor, non-blocking notes

1. **Double top border risk.** `.proc` carries its own `border-top:1px solid var(--line)`, and the adjacency rule `.g-white + .g-white{border-top:1px solid var(--line)}` also applies. If the preceding section is `.g-white`/`.g-paper` this is still a single 1px line (same element, one border), so no visual defect — but if a wrapper ever separates the sections, only the `.proc` rule survives. Worth knowing; matches the sample, so not a defect here.
2. **No-JS visibility.** `[data-rv]{opacity:0}` means the eyebrow, `<h2>`, and the entire `.reg` table render invisible unless the homepage reveal script adds `.in`. The reduced-motion fallback exists, but there is no no-JS fallback. This is a pre-existing cross-cutting pattern inherited from the sample, not introduced here — flagging once for the overall migration, not as a step-12 blocker.
3. **Optional a11y polish (deviation from sample, so only if you want it):** `<span class="tick">\</span>` is decorative and is announced as "backslash" by screen readers; `aria-hidden="true"` would clean that up. Likewise `.reg-row` pairs are semantically a description list (`<dl>/<dt>/<dd>`) rather than `div`+`span`. Both are sample-faithful as-is — changing them is a conscious upgrade, not a fix.

No actionable issues for this step.
