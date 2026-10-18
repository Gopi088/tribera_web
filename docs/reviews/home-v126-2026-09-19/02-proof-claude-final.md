# Review — Step 02 follow‑up

## Checklist

| #   | Requirement                                  | Status | Evidence                                                                                                                                                                                                                                                                                                                                                                                  |
| --- | -------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ------ | --- | -------- | --- | ------- | --- | ------ | --- | ------ | --- | ------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Guard `labData` + required DOM nodes         | ✅     | `if(!dataEl) return;` then the composite guard `if(!rows                                                                                                                                                                                                                                                                                                                                  |     | !tiles |     | !elScore |     | !elBand |     | !elPin |     | !elTot |     | !elNote |     | !byId('labStatus')) return;`. `labEv`separately guarded. Sliders ship`disabled` and are enabled only after the guard → correct progressive‑enhancement order. |
| 2   | Debounce live announcements + skip unchanged | ✅     | `announce()` clears/sets a 400 ms timer and compares `status.textContent!==text`. It is called only on the settle branch of the rAF loop (reduced‑motion or `Math.abs(diff)<0.02`), never per frame. Initial `paint()` computes exactly 39.00 (78/100×50) and `shown=39`, so the first call settles immediately and the text matches the SSR `labStatus` → no spurious load announcement. |
| 3   | Single shared heavy function                 | ✅     | `lab-model.ts` `isHeavy` imported by both `Proof.astro` (SSR class) and `interactions.js` (`paint()` toggle). Threshold semantics identical (`max` recomputed from live weights client‑side). No second copy.                                                                                                                                                                             |
| 4   | Explicit checked markup placeholders         | ❌     | Only `LAB_ROWS` / `LAB_TILES` are checked. See Blocker 1.                                                                                                                                                                                                                                                                                                                                 |
| 5   | Neutral note on custom input                 | ✅     | `"Custom weights — his scores stay fixed. The verdict follows what matters most to your role."` — no verdict direction claimed, set via `textContent`, and presets are de‑selected (`.on` + `aria-pressed="false"`).                                                                                                                                                                      |
| 6   | Safe `textContent` evidence                  | ✅     | `show()` builds `<b>` via `createElement` + `textContent` and `createTextNode(' — '+d.ev)` into `replaceChildren` — no `innerHTML` on the evidence path. Server side, `d.n`/`d.sn` pass through `escape()`.                                                                                                                                                                               |

Data sanity: weights sum to 100; all three presets also sum to 100; `tw>0` divide‑by‑zero guards present; `elPin` clamped 1–99%.

---

## Blocker (must fix)

**1. The third `replace()` is an unchecked, silently‑failing placeholder — and its failure bricks the whole widget.**

```js
.replace('<div class="verd-big">', '<div class="sr-only" id="labStatus" …>…</div><div class="verd-big">')
```

`<div class="verd-big">` is an incidental style hook in `proof.html`, not a declared contract, and it is excluded from the `markup.includes(...)` assertion. If that div gains a class/attribute, `String.replace` no‑ops silently, `labStatus` disappears, the composite guard returns early, and **the sliders stay `disabled` forever** — the lab renders as a dead, non‑interactive control panel with no error anywhere.

Fix: add `<!-- LAB_STATUS -->` to `proof.html` immediately before `.verd-big` and fold it into the existing assertion:

```js
for (const p of ['<!-- LAB_ROWS -->', '<!-- LAB_TILES -->', '<!-- LAB_STATUS -->'])
  if (!markup.includes(p)) throw new Error(`Missing lab markup placeholder: ${p}`);
```

---

## Should fix (not blocking)

2. **`39.00` is hardcoded in three places** — `labScore` in `proof.html`, the `labStatus` string in `Proof.astro`, and `shown=39` in `interactions.js` — while being derivable from `lab-data.json`. Today they agree; the moment a weight or score changes, the "skip unchanged" optimisation starts firing a spurious announcement on every page load and the score visibly animates from a stale 39. Compute the initial score/band once in `Proof.astro` and inject all three.

3. **`d.k` is the only interpolated field not passed through `escape()`** (`<span class="rk">${d.k}</span>`), where `d.n`/`d.sn` are. Data is trusted static JSON, so this is consistency, not an exploit — but the asymmetry invites a future miss. Same class of nit: `JSON.stringify(dimensions)` into an inline `<script>` is unescaped; if `ev` ever contains `</script>` it breaks out. Escape `<` as `\u003c`.

4. Minor: `JSON.parse(dataEl.textContent)` is unguarded (throws past the null check); `byId('labStatus')` is re‑queried inside the debounce callback without a null check; `TIER` and `sc` are dead variables; SSR `aria-valuetext="${d.w} percent"` (`"14 percent"`) is reformatted to `"14.0 percent"` on first `paint()`, and is only numerically correct because weights happen to sum to 100 — derive it the same way `paint()` does.

---

## Verdict

**NOT A PASS — 1 blocker.** Items 1, 2, 3, 5 and 6 are correctly implemented and verified. Item 4 is incomplete: the `labStatus` injection anchor is an unchecked placeholder whose silent failure degrades to a permanently disabled lab. Add the `<!-- LAB_STATUS -->` placeholder to the assertion loop and this is a PASS.

_(One assumption I could not verify from the supplied source: `byId()` scopes to `.v126-home`, which appears in neither `proof.html` nor `Proof.astro`. The `#labData` script is a sibling of the `<Fragment>` at the component root, so it is only reachable if the page wraps `<Proof />` inside that container. Please confirm in the parent layout.)_
