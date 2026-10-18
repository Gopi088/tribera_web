## Verdict: 3 of 6 fully resolved, 3 partially

**Resolved**

- **Static heavy state** ✓ — `heavy()` runs at build time on both rows and tiles, and the threshold matches `paint()` exactly (max weight 14 → 12.88 → A and B heavy in both paths).
- **Redundant native keydown** ✓ — tiles and `.pre` are real `<button type="button">` with click-only handlers. The explicit `keydown` survives only on `.fnl-step`, which is given `role="button"`/`tabindex="0"`, so it's required there. (I can't confirm from the supplied source that `.fnl-step` isn't itself a `<button>` — proof.html doesn't contain it. If it is, the `role`/`tabindex`/`keydown` triple is all redundant.)
- **aria-pressed evidence state** ✓ — rendered as `aria-pressed="false"`, toggled across all tiles in `show()`.

Static/dynamic consistency also checks out: weights sum to 100, score = 39.00, pin at 78%, band `Select` — the SSR markup and first `paint()` agree, and all three presets compute to the band their `NOTE` text claims (llm → 32.8 = Grey).

**Partially resolved — remaining blockers**

1. **Null guard is in the wrong order.** `var D=JSON.parse(byId('labData').textContent)` runs _before_ `if(!rows || !tiles) return;`. `byId` is scoped to `.v126-home`, but `#labData` is emitted by `Proof.astro` as a sibling of the fragment — if the component ever renders outside that root, this throws, and because every section lives in one outer IIFE, the throw also kills the underline draw, counters and `obCap` handlers below it. Move the guard up and include `labData`, `elScore`, `elBand`, `elPin`, `elTot`, `elNote` (all are dereferenced unguarded in `paint()`).

2. **Live region still fires per input event.** Under `prefers-reduced-motion: reduce`, `paint()` writes `#labStatus` synchronously on every `input` — a single slider drag queues dozens of polite announcements. Even without reduced motion, small nudges land inside the `<0.02` settle branch immediately. Needs a debounce (~400ms) around the `labStatus` write. Related: the initial `paint()` rewrites `labStatus` with a string identical to the SSR text, which some screen readers announce on load — skip the write when the text is unchanged.

3. **Duplicated data became duplicated logic.** Single build-time source of truth is fine now, but the heavy threshold `w >= Math.max(7, max * 0.92)` is written twice — `Proof.astro` and `paint()` — in different files and languages. They agree today; nothing keeps them agreeing. Also the three `markup.replace(...)` calls are exact-string matches against `proof.html` with no failure signal: reformat the HTML and rows render empty, `rows`/`tiles` still pass the guard, then `byId('pts0')` throws.

**New issue worth fixing in the same pass**

- **Stale preset note.** The `input` handler clears `.on`/`aria-pressed` from all `.pre` buttons but leaves `elNote` untouched, so after nudging a slider the page keeps asserting e.g. _"the verdict moves to Grey"_ while the verdict reads Select. Reset `elNote` to the `brief` copy on manual input.
- Minor: `show()` builds `ev.innerHTML` from raw `d.n` and `d.ev`, bypassing the `escape()` helper used everywhere else. Build-time trusted data, so not a live XSS, but it's the inconsistency the escaper was added to remove. `tiles.querySelectorAll('.lt').forEach(t => t.id = 'tile'+i)` is dead code — the IDs are already server-rendered.
