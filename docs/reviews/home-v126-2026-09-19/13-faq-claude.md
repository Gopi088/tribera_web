## Step 13 — FAQ: PASS

**Fidelity check**

| Item                                                                                                 | Result                  |
| ---------------------------------------------------------------------------------------------------- | ----------------------- |
| Section wrapper / `g-paper` / `wrap` / `faq-top` structure                                           | ✅ identical            |
| Eyebrow (`\` tick + "Before you ask")                                                                | ✅ verbatim             |
| H2 + `hd-word` / `hd-underline` SVG (path `d`, viewBox, `preserveAspectRatio`, `stroke-width="2.2"`) | ✅ byte-identical       |
| `faq-ask` block, `#start` link, `→` arrow                                                            | ✅ verbatim             |
| `data-rv` + `--d` delays (60/120/180ms)                                                              | ✅ preserved            |
| All 4 Q/A strings, incl. curly apostrophes (`don’t`, `that’s`) and straight `Didn't`                 | ✅ verbatim, no drift   |
| Order of items                                                                                       | ✅ same                 |
| Class hooks (`faq-list`, `faq-item`, `faq-q`, `faq-ic`, `faq-a > div > p`)                           | ✅ same                 |
| CSS ported with `.faq-item.open` → `.faq-item[open]`, marker suppression added                       | ✅ correct and complete |
| No-JS fallback (`:not(.is-enhanced) [data-rv]{opacity:1}`) covers this section                       | ✅                      |

`<button>`→`<summary>`, `name="home-faq"` single-open, and `id="faq"` are within the stated intentional-change scope. No missing `aria-expanded` concern since `details/summary` exposes expanded state natively, and `faq-ic` is `aria-hidden`.

**Minor, non-blocking notes (no fidelity failure, your call):**

1. **Dead transition.** `.faq-a{grid-template-rows:0fr→1fr;transition:grid-template-rows .36s}` no longer animates: the UA applies `content-visibility:hidden`/`display:none` to non-`summary` children, so open/close is an instant jump in every browser. Either accept the snap and drop the now-inert `transition` line, or restore the slide with:

   ```css
   :is(.v126-home) .faq-item::details-content {
     block-size: 0;
     overflow: hidden;
     transition:
       block-size 0.36s var(--ease),
       content-visibility 0.36s allow-discrete;
   }
   :is(.v126-home) .faq-item[open]::details-content {
     block-size: auto;
   }
   ```

   (needs `interpolate-size:allow-keywords` on the root; wrap in `@supports selector(::details-content)` and keep the reduced-motion override).

2. **`name` group support.** In browsers without `details name=` (Firefox <130, Safari <17.2) multiple panels can be open at once. Acceptable degradation, but worth confirming it matches the agreed baseline rather than being an unintended regression.
