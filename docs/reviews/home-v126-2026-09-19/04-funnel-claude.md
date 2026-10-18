## Review — Step 04: `#funnel`

**Verdict: PASS with 2 small actionable items** (markup/copy fidelity is exact; issues are in the static-render integration, not the sample).

### Fidelity checks performed

- Copy, structure, class names, `data-rv`/`--d` values, `.fnl-gap`, `.own`/`.own--you`, `hd-ring` path data and `stroke-width="2.4"`, `.fnl-close`, `.fnl-math` (incl. curly apostrophe), `.fnl-case` — byte-identical to the sample.
- Pre-rendered squares: **126 total**, exactly `7×18` rows for `grid-template-columns:repeat(18,1fr)`. Tier distribution counted: `1→86, 2→26, 3→9, 4→3, 5→2`, matching JS `GROUPS=[[86,1],[26,2],[9,3],[3,4],[2,5]]`. Every inline `background` matches the JS `TIER` map (`#3a3a37 / #585852 / #8a8a83 / #d7d7d1 / #DA0007`).
- Static `#fnlN` (126), `#fnlLbl`, and `#fnlFt` exactly match `COUNT[1] / LBL[1] / REST[1]`, so `setStage(1)` on init causes no flash or text change.
- Captions consistent with the stated normalization (126 / 40 / 14 / 5 / 2); `REST`/`REACH`/`STOP` arithmetic is internally consistent (86+26+9+3+2).
- CSS hooks all present and exercised: `.fgrid.dim .sq.out`, `.fgrid.peek .sq(.co)`, `.field.at5 .field__n`, `.field__ft .dotk`, `.fnl-step:last-child .n`. Reduced-motion and no-IntersectionObserver paths both terminate at stage 1.

### Issues

1. **`hd-ring` renders as a dotted ring without/before JS.** CSS sets `stroke-dasharray:1` on `.hd-ring path`, and `stroke-dashoffset` is forced to `0`. The `pathLength="1"` that makes `dasharray:1` equal the whole path is only applied at runtime (`p.setAttribute('pathLength','1')`). In a no-JS render — and in the window between first paint and script execution — the dash array is 1 _user unit_ on an 80×60 viewBox, so the ring around the "2" paints as a dashed/dotted scribble and then snaps solid. Given the "preserve static content without JS" goal, add `pathLength="1"` to the path directly in the markup:
   `<path pathLength="1" d="M42,7 C64,5 ..." stroke-width="2.4"/>` (the JS `setAttribute` then becomes a harmless no-op).

2. **Dead/unsynced generator code in the funnel IIFE.** Now that squares are authored in HTML, `TIER`, `GROUPS` and `arr` are computed and never used — nothing enforces that the hand-written markup keeps matching the distribution the captions assert. Either delete them, or keep `GROUPS` and add a cheap dev assertion (e.g. warn if the counted `data-drop` tallies differ from `GROUPS`). Current data is correct; this is drift protection only.

### Optional (non-blocking, inherited from the sample — flagging, not requesting a change)

- `#fnlFt` is the only feedback surface for step focus/hover but has no `aria-live`; the `.fgrid` is `aria-hidden`, so keyboard/SR users get a silent caption swap. `aria-live="polite"` on `#fnlFt` would be a one-attribute win.
- `.field__hd` right-hand span stays hard-coded `126 in play` while `#fnlLbl` changes, so stage 5 reads "HIRED … 126 in play" over a big "2". Same as the sample; only worth touching if you want it to track `COUNT[n]`.
- Square-level "stopped here" detail is `mouseover`-only, so it's unavailable on touch/keyboard. Sample behaviour; the step-level `reached` path still covers keyboard.
