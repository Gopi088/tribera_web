**CHANGES REQUIRED**

Two concrete corrections; the design itself is a clear improvement and I would not re-litigate it.

---

## Measured facts

**Verified against the brief**
- Comparison card, both `<select>`s, `.cmpw`/picker, all six-bar `.isp` sparklines and every percentage are gone. `final-validation.json`: `dropdowns: 0` at 320/390/768/1520/1920.
- 12 sector links, unique, all HTTP 200 (`statuses`). Descriptions and evidence phrases render verbatim; row label is `Evidence that matters` as intended (code 6245–6372).
- Columns 3 / 2 / 1 at 1520 / 768 / 390; `pageOverflow: false` everywhere; `minLinkWidth` 217px at 320.
- `indexStartsAboveFold: true` at all five widths; at 1520 the first row sits ~690px, below a 62px header (`final-full-1520.png`).
- Hero `min-height: 0` (5957); the 1321px ladder no longer applies to any rendered element.
- Method steps all `opacity: 1` (`methodSteps: ["1","1","1","1"]`), `cursor: default`; dek rewritten as briefed; eyebrow, four steps, owner tags, closing line and the whole `#contact` block unchanged. Navbar and footer intact (`final-full-390/1520.png`).
- Page height at 390: 5,289px, down from 6,965px.

**Defects**
1. **No-JS completeness fails in code.** `[data-rv] { opacity: 0 }` (217–224) is cleared only by `.in`, added only by `initReveals` (`scripts/reference/index.ts:20`). The only exemption is `prefers-reduced-motion` (229–242, EditorialPage 348–359). There is no `<noscript>` anywhere in the page — head is `StandaloneMetadata` + one preload + a single `<style is:global>`; body is header/main/footer. Every element on the page carries `data-rv` (6219, 6220, 6221, 6225, 6233, 6385–6436). With JS disabled the page renders blank. `validation.md:9` asserts the opposite; that assertion is not supported by the source.
2. **Dead CSS was not removed.** Markup begins at line 6213 of a 6,452-line file. Still present and unused: the `.hero__top` min-height ladder (381–457), `.hero__card`/`.flip`/`.face`/`.tiles`/`.sig` (531–1067), `.logos` (1069–1139), `.swap` (1200–1306), `.desk` (1714–1859), `.lab`/`.verd` (1861+), `.cases` (1614–1708). Brief §4 required these deleted.
3. Minor: `.step:hover { background: rgba(255,255,255,.04) }` (1502) still fires on non-interactive `<div class="step">`. Mono keys ship at 11px (5972, 6042, 6148) against the brief's ≥12px.

---

## Judgment

**1. Point clarity — yes.** Eyebrow → H1 → one lead → twelve names, in under 700px at 1520. A buyer's real question ("do you cover me?") is answered before any scroll. It is honest rather than persuasive — there is still no outcome evidence — but that was deliberately deferred pending data, and no invented proof has crept in.

**2. Index position — deserved.** Zero state, zero hidden content, 12 targets instead of 66 pairs. The old comparison's mobile failure mode is structurally impossible now.

**3. Homepage fit — good.** Fraunces with the red italic second line, `\` mono eyebrow, red pill, dark method band, paper closing band. Left-aligned, dot-matrix-free, rules-not-cards reads as an index rather than a landing page. Correct divergence.

**4. Mobile length — acceptable; cut nothing.** ~2,500px of index is ~3 screens of a uniform, scannable list where the user only needs their own name. The brief's 3,500px target should not be enforced here.

**5. Coherence — yes.** Hero and closing CTA are the same action; the white→dark pivot into "what doesn't move" now reads as argument, not repetition.

**6. Accessibility/responsive — sound apart from #1.** Inset red focus ring is clearly visible on the paper hover fill (`focus-index-390.png`); arrow and rule are `aria-hidden`; sector name is announced first. Link names are verbose (~20 words) but per the brief that is accepted.

---

## Prioritised corrections

1. **Make the page render without JS.** Add a `<noscript><style>[data-rv]{opacity:1;transform:none}</style></noscript>` to the head, or invert the pattern (visible by default; JS adds a `js-reveal` class that hides then reveals). Then re-run the JS-disabled check and correct `validation.md:9`.
2. **Delete the unused CSS** listed in defect 2 (the min-height ladder, hero card/flip/tiles/sig, logos, swap, desk, lab, verd, cases), per brief §4. Re-capture at 390/1520 to confirm no visual change.
3. Remove `.step:hover` background for `#same`, and raise the three mono keys to 12px.
