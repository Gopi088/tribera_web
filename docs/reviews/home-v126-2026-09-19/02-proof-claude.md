## Step 02 — `#proof`: PASS on fidelity, with 6 non-fidelity issues

**Fidelity check:** the head (`eyebrow`/`h2`/`lead` incl. the `hd-word` SVG path), `verd-who`, `verd-big`, `verd-track`, `verd-ax`, `side-k`, `rows-ft`, `lab-foot`, and `proof-checks` are byte-identical to the sample. Deltas are confined to the two containers the sample left empty (`#labTiles`, `#labRows`) plus ARIA attributes — i.e. the sanctioned "static content without JS" + "semantic evidence buttons" changes.

**Static/JS consistency verified:** the SSR tiles match the `D` array on all nine short names, scores, and `low` flags (indices 2 and 5 at 2/5). SSR weights 14/14/12/12/10/8/8/10/12 sum to 100, giving `got=78`, `score=39.00`, band `Select` (≥34), pin `78%` — exactly the static values. Percentages use the same `.toFixed(1)+'%'` shape as `paint()`, and `var shown=39` matches the SSR seed, so there's no hydration flash.

### Actionable

1. **`aria-live="polite"` on `#labScore` will flood screen readers.** The counter is written once per rAF frame by the `step()` easing loop (~20–40 writes per change), and slider `input` fires that loop continuously during a drag. Polite regions queue rather than coalesce. Move the live region to a visually-hidden element written only when `shown=score` settles — and include `#labBand` in it, since the verdict word (Select/Grey/Reject) is the meaningful output and is currently announced nowhere.

2. **Tiles are a second source of truth for `D`.** `rows.innerHTML` is regenerated from `D`, but tiles are only ID-stamped (`t.id='tile'+i`), so the nine names/scores/`low` classes live in both the Astro template and the inline script. They agree today; nothing catches a future drift. Drive both from one array in Astro frontmatter (render tiles + rows server-side, expose the data to the script) rather than duplicating.

3. **No-JS render is missing `heavy`.** `paint()` marks `w >= max(7, max*0.92)` → 12.88, so indices 0 and 1 get `.heavy` on row and tile at first paint. The SSR markup has no `heavy` anywhere, so the JS-off state is missing the emphasis the default state is supposed to show. Add `heavy` to tile/row 0 and 1 in the template.

4. **Redundant keydown handler on native buttons.** `tiles.addEventListener('keydown', ...)` intercepting Enter/Space was needed when tiles were non-semantic; with `<button>`, activation already produces a `click`. It's harmless (`show()` is idempotent, and `preventDefault` suppresses the duplicate) but it's now dead code that will confuse the next reader.

5. **`tiles` isn't null-guarded.** The IIFE guards `if(!rows) return;` then calls `tiles.querySelectorAll(...)` unguarded — a missing `#labTiles` throws and aborts the rest of the lab init. Fold `tiles` into the same guard.

6. **`.picked` has no ARIA equivalent.** Selecting a tile is a persistent visual state with no programmatic counterpart; `aria-pressed` on `.lt` (toggled in `show()`) would match what you already did for `.pre`.

Nit, optional: the range inputs announce bare numbers — `aria-valuetext="14 percent"` (kept in sync in the `input` handler) reads better than "14".
