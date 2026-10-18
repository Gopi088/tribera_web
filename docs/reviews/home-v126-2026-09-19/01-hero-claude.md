**PASS** — step 01 hero is a byte-for-byte match with the sample.

Verified:

- `<header class="hero-c g-white" id="top">`, `.hero-glow`, `.hero-field` wrapper attributes identical, including `aria-hidden="true"` on both decorative layers.
- SVG `viewBox="0 0 740 190"`, full 9×34 rect grid (306 rects) identical; the three `#DA0007` accent cells land on the same coordinates in both: (352,22), (484,88), (286,132).
- Copy identical: eyebrow (`\` tick + "For heads of talent & hiring managers"), h1 with `<br>` and `<span class="i hd-word">`, lead, CTA labels.
- Reveal attributes and stagger preserved: `data-rv` with `--d:60ms / 120ms / 180ms / 320ms`.
- `.hero-cue` kept outside `.hero-main` but inside `<header>`, with same `aria-label`.
- Logo strip: `.ls-k` label and both duplicated `.cl-item` tracks match, including the 11 names in order and trailing `·`.

Two things to confirm when the later steps land (not fidelity issues, nothing to change here):

- The hero's `href="#start"` and `href="#proof"` are in-page anchors — they only work if the later sections carry those exact ids.
- `data-rv` elements are hidden by the sample's reveal CSS until JS marks them visible. Given the stated "static content without JS" goal, the hero copy should still render when the homepage script doesn't run — worth checking the namespaced `[data-rv]` rule has a `no-js`/`prefers-reduced-motion` fallback.
