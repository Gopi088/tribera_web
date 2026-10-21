## Follow-up review — resolution of flagged uncertainties (read-only)

**Images actually read this session:** `faq-{320,390,768,1366,1920}.png`, `faq-state.json`, `industries-{320,768,1366}-{top,middle,bottom}.png` (9), `industries-healthcare-life-sciences-{320,768,1366}-{top,middle,bottom}.png` (9), `intelligence-{320,768,1366}-{top,middle,bottom}.png` (9, with `intelligence-768-top.png` re-read directly to resolve an anomalous first-pass result), `pe-comparison-reference.png`, `pe-comparison-chromium.png`. Plus `suites-chromium/firefox/webkit.json.txt`.

### 1. FAQ "closed at small widths" — viewports-3 claim is **incorrect, now corrected**

`faq-state.json` (28 direct DOM probes: 5 Chromium widths × 4 routes, + Firefox/WebKit at 390 × 4 routes) shows the first FAQ item `open: true` with non-zero `answerHeight` (95–221px depending on width) in **every one of the 28 cases**, none collapsed. The `faq-{320…1920}.png` crops confirm this visually — first answer visibly expanded with full paragraph text at all five widths. viewports-3's claim of "all three items collapsed at 320/390/768" does not hold up against direct probing and is retracted. There is no breakpoint-dependent FAQ bug.

### 2. PE comparison-control — reference vs candidate: **no defect**

Side-by-side `pe-comparison-reference.png` / `pe-comparison-chromium.png`: identical bar chart, identical per-skill values (20/16, 14/10, 10/34, 32/8, 8/24, 16/8), identical layout and sector-pill list. The only difference is copy style — reference says "against 34% **in pharma**," candidate says "against 34% **in Pharmaceutical**." This matches the already-documented normalized-label pattern (visual-1 flagged the same thing on another route) — informational, not a defect.

### 3. Global capability centers/centres — alias clarification confirmed

UI copy consistently renders the British spelling "Global capability **centres**" as the display label (seen in `industries-1366-bottom.png`, `pe-comparison-*.png` sector-pill lists). Per your clarification, the canonical route is `industries-global-capability-centers` (American spelling in the URL), with `-centres` as the alias — this is a URL-slug fact, not something visible in these screenshots, and I'm relaying your correction rather than independently re-deriving it from image content. Noting it so prior viewports-2 language isn't treated as authoritative.

### 4. Legibility / chart labels / mobile wrapping — industries, healthcare, intelligence families at 320/768/1366

All three families: headline/body copy wraps cleanly at 320px (no overlap, no truncation), card grids collapse 1-col → 2-col → 3-col as width increases, chart axis labels ("CORE DEPTH," "CONTROLS AND RISK," etc.) stay legible and don't collide with bars at any width, sector-pill lists wrap to multiple rows without clipping at 768. No legibility or wrapping defects found in the enlarged crops. I am not claiming pixel-perfect text-kerning parity — only that nothing is garbled, clipped, or overlapping in the regions inspected.

### 5. One confirmed visual issue — intelligence page, 768px "Pick a function" tab row

Re-reading `intelligence-768-top.png` directly (my first-pass parallel read of this file returned mismatched/stale content, which I caught and corrected by re-reading it) confirms viewports-4's concern: at 768px the function-tab row ("Backend & platform," "Data & analytics," "AI & machine learning," "Cybersecurity," "Infrastructure…") is cut off hard at the right edge of the 768px viewport, with "Infrastructure" clipped mid-word and the remaining four functions (Product & design, Risk & compliance, Leadership & GCC, etc.) not visible in the viewport. This upgrades the item from "unconfirmed, resolution-limited guess" to **confirmed visual overflow symptom** — the row does extend past the viewport. What I still cannot determine from a static image is whether the container scrolls horizontally (acceptable, by-design) or is genuinely clipped/unreachable (a bug). **Severity: Medium. Disposition: needs a live-browser check of this one widget at 768px before sign-off** — not blocking on its own if scrollable, but unconfirmed either way from screenshots.

### 6. Motion/regression — evidence audit only, not live observation

`suites-{chromium,firefox,webkit}.json.txt` all report `status: "passed"`, same commit (`590be3c`), same `buildHash`/`sourceHash` across all three engines, including `tests/v9-ink-motion.test.mjs` (exit code 0 in all three). This is test-suite evidence that the automated motion/ink-animation checks passed on this exact build in all three engines — I have not personally watched the animation render; I'm relaying what the archived pass/fail record shows, not an independent visual confirmation of motion quality or timing.

### Verdict — local visual/responsive scope only

**ACCEPT**, with one open item: the 768px "Pick a function" tab-overflow on `intelligence` should be verified live (scrollable vs. clipped) before full sign-off. All other prior-stage findings (FAQ expand-state, wording normalization, PE comparison, GCC labeling, legibility/wrapping) are resolved as non-defects in this pass.

**Explicitly out of scope / not inspected here:** production environment, G2/G3 sign-off, the other 8 industry-detail routes' enlarged crops (only industries, healthcare-life-sciences, and intelligence were requested as the three representative families), live animation/interaction behavior (only test-pass records were read), and any DOM-level horizontal-scroll measurement for the 768px tab row. No claim of pixel-perfect parity is made anywhere above.
