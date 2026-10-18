## Review — `v126` Proof / Lab

### Correctness of the SSR ↔ client contract (the risky part) — verified

- **Score math matches the static markup.** `Σ(w·s/5) = 78`, `tw = 100` → `78/100·50 = 39.00`. Matches `#labScore` (`39.00`), `#labBand` (`Select`, since `≥34`), `#labPin` (`39/50·100 = 78%`), and `#labStatus` (`"Select, 39.00 out of 50"`). `var shown=39` is also consistent, so the first `paint()` settles immediately with no visible jump and — because `announce()` compares against existing text — no spurious live-region announcement on load.
- **`isHeavy` is shared** by `Proof.astro` and `interactions.js`, so the server-rendered `heavy` classes (A=14, B=14 against `max(7, 14·0.92=12.88)`) match what `paint()` computes on first run. No flash/reclass.
- **Preset arrays are all length 9 and all sum to 100**, and every value is within the slider's `min=0 max=40`:
  - `detect` → 40.00 → Select ✔ (note claims it carries the verdict)
  - `llm` → 32.80 → **Grey** ✔ (note explicitly claims "moves to Grey")
  - `own` → 41.00 → Select ✔ ("stays above the select threshold")
  - `brief` → 39.00, and `NOTE.brief` is byte-identical to the SSR `#labNote` copy, so round-tripping back to "As briefed" restores the original state exactly.
- **`PRE.brief = BASE.slice()`** is captured before any mutation of `D`, so reset works after arbitrary slider dragging.

### Security / escaping

- `escape()` covers `& < > " '` and is applied to every interpolated string (`d.n`, `d.sn`) in both text and attribute positions. `d.ev` is never injected as HTML — it goes through `createTextNode`, correct.
- `JSON.stringify(...).replaceAll('<', '\\u003c')` emits the six-character sequence `\u003c`, which is valid JSON and re-parses to `<`. This correctly defuses a `</script>` breakout inside `type="application/json"`. Good.
- The build-time placeholder guard (`throw` on missing `<!-- LAB_ROWS -->` etc.) means a silently-empty lab can't ship.

### Progressive enhancement / accessibility

- Sliders render `disabled` and are enabled only after every required node is found — correct no-JS behaviour, and the guard fails closed.
- `#labStatus` (`aria-live="polite"`) is debounced 400 ms and de-duplicated, and is updated only once the count-up settles — this avoids the classic "screen reader reads 40 intermediate values while dragging" bug. `#labScore` itself is correctly _not_ live.
- `paint()` keeps `aria-valuetext` in sync with the visible `%` label on every change.
- Tiles are real `<button type="button">` with `aria-label` carrying the score, so Enter/Space work natively; `link()` is bound to both `mouseover/mouseout` **and** `focusin/focusout`, so keyboard users get the same row↔tile cross-highlight as mouse users. Delegation via `closest()` handles the child `<i>`/`<b>` correctly (net state after the out→over pair is right).
- `classList.toggle('heavy', …)` and `.lit`/`.picked`/`.low` are independent and never clobber each other; `elBand.className=` is the only wholesale assignment and nothing else writes to that node.
- `cancelAnimationFrame(raf)` + `clearTimeout(announcementTimer)` at the top of `paint()` correctly prevents overlapping animation chains during a drag.
- `prefers-reduced-motion` is honoured in all five animation blocks (reveal, bench stagger, funnel, score count-up, lab tile stagger), including the `userTook` bail-out so the funnel autoplay yields to user input.

### Non-blocking notes (no action required for this review)

1. `interactions.js` guards `#fnlGrid` and `#labData` but then dereferences `#fnlField/#fnlN/#fnlLbl/#fnlFt/#fnlInPlay` and `IntersectionObserver.observe(byId('funnel'))` unguarded. Since everything lives in one un-`try`'d top-level IIFE, a throw in the funnel block would skip the lab block entirely and leave the sliders permanently `disabled`. The funnel markup isn't in scope here, so this is a hardening suggestion, not a defect.
2. SSR emits `aria-valuetext="14 percent"` while the first `paint()` rewrites it to `"14.0 percent"`. Cosmetic only, and invisible to users since it happens before any interaction.
3. `#labStatus` relies on a generic `.sr-only` utility; `sample.css` wasn't supplied, so I could not confirm the rule exists. Worth an eyeball — if it's absent the status string renders visibly above the score.

## Verdict: **PASS**

No current runtime, accessibility, fidelity, or integration bugs found in the supplied source.
