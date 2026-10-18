## What I actually inspected

| File                                                        | Result                                                                                       |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `artifacts/site-design-review-2026-09-19/home-390.png`      | Read OK — mobile viewport, legible                                                           |
| `artifacts/site-design-review-2026-09-19/home-390-full.png` | Read OK — but rendered at 44×2000 from 390×17884; **only band rhythm is legible, no text**   |
| `artifacts/site-design-review-2026-09-19/home-1520.png`     | Read OK — **the new inventory capture exists**, desktop hero, legible, current shared navbar |
| `artifacts/home-v126/original-nav-restored-1920.png`        | Read OK — navbar strip only                                                                  |
| `artifacts/home-v126/audit-site-1520.png`                   | Read OK — 1520×14030 shown at 217px wide; **band sequence only, no text**                    |
| `src/components/home/v126/sample.css`                       | Read lines 1–999                                                                             |

Because `home-1520.png` was ready, I used it as the desktop reference; `audit-site-1520.png` served only for whole-page band rhythm, and I ignored its nav per your instruction.

---

## Baseline pattern (measured)

**Type — three roles, cleanly separated**

- Display `Fraunces` 500, used _only_ for `h1` (clamp 2.6→4.15rem), `h2` (2→3rem), and deliberate accents (`.claim`, the big figure numerals, `.lab .name`). Line-height 1.08, tracking −0.01em.
- Body `Inter Tight` — and note `h3` is **body font**, 1.05rem/600, not serif. So the serif never appears at card-title level. This is the single most portable rule for inner pages.
- Mono `JetBrains Mono` carries every piece of metadata: eyebrows (0.7rem/0.2em), card labels, pills, scores, captions, stage numbers. Mono = "this is data or a label," never prose.
- Italic serif is a semantic accent, not decoration — confirmed in both captures: _worth the interview_ is the only italic in the H1.

**Palette**
`--ink #131313` / `--ink-2 #57565b` / `--ink-3 #9a998f` / `--red #da0007` / `--paper #f1eee7` / `--charcoal #121212` / `--take #3e9e63`. Red is reserved: primary CTA fill, text links, the `.em` accent, and a 5–9% radial wash behind hero/proof/funnel. Green appears only as verdict/positive state.

**Layout rhythm**
`--wrap 1160px`, `--pad clamp(22px, 5vw, 72px)`, `section { padding-block: clamp(76px, 10vw, 140px) }`. Sections alternate `.g-white` / `.g-paper` / `.g-dark`; a hairline `border-top` is added _only_ where two light bands meet — dark slabs do the separating themselves. From `audit-site-1520.png` I count roughly 15 alternating bands over 14,030px, with dark used ~4 times.

**CTA hierarchy** — consistent and only three levels: pill `btn-primary` (red, red-tinted shadow; inverts to white on dark), `btn-ghost` (hairline border, fills charcoal on hover), and red text `.link ›` whose arrow gap widens on hover. Both captures show the same pairing: one red pill + one quiet ghost/link. Nothing competes.

**Cards/charts** — white or `#0b0b0b` surface, 1px hairline, `--shadow`, internal structure by hairline dividers (`.card-hd`, `.cand`, `.card-ft`) rather than nested boxes. Charts are inline SVG at `width:100%`, with a mono `.lbl` above and a mono `.cap` below. Good, and genuinely reusable.

**Accessibility hygiene already in place** — global `:focus-visible` 2px red outline offset 3px (white on dark), and `prefers-reduced-motion` honored for scroll behavior, flow arrows, and stage reveals.

---

## Reusable vs. home-only

**Port site-wide:** type roles, palette + band alternation (incl. the light-on-light hairline rule), eyebrow convention, the 3-level CTA ladder, the hairline card shell, mono-for-metadata, `--wrap`/`--pad`/section padding, focus + reduced-motion.

**Do not port** (home-specific theatre): the interactive "Move the bar / Watch the verdict move" lab (`.lab` on `#0b0b0b`, `.mh` toggle chips, `.vbadge` take/hold/decline), the hero's dotted-grid field + red radial wash, the oversized `39.00`-scale figure box (7.2rem numerals), the sequenced `.flow-arrow` stroke-draw animation, and the marquee logo strip. These carry a density and a motion budget that a Services or Blog page shouldn't try to match.

---

## Actual visual risks on the homepage

1. **`--ink-3 #9a998f` on white measures ≈2.9:1** — below even the 3:1 large-text floor. It is the color of _every_ eyebrow, chart caption and card label. And it's applied at 0.7rem (≈11.2px) for eyebrows, 0.64rem (≈10.2px) for `.barcard .cap`/`.figbox .cap`, with 0.1–0.2em tracking. This is visible, not theoretical: in both `home-390.png` and `home-1520.png` the eyebrow and "MOVE THE BAR YOURSELF" read as grey texture rather than text. If this palette is rolled site-wide unchanged, the defect multiplies onto every page's eyebrows.
2. **The dark-mode equivalent is worse in size, better in contrast.** `--pw2` (white 42% on charcoal) computes to roughly 4.1:1 — passable — but it's used at 0.58–0.6rem (≈9.3–9.6px) for `.fw-n`, `.fw-label`, `.lab .hd .tag`, `.verdict-chip`. Sub-10px uppercase mono is the readability risk here, independent of contrast.
3. **Three card radii coexist**: 18px (`.card`, `.stack:before`), 14px (`--card-r`: `.barcard`, `.flow .step`, `.flow-work`), 16px (`--r-lg`: `.figbox`, `.lab`). Plus two shadow families. On the homepage the bands separate them enough to hide it; the moment inner pages mix these components in one viewport it will read as sloppy. Worth settling _before_ the pattern propagates.
4. **Mobile hero is mostly empty.** In `home-390.png` I measure ~215px of blank space above the eyebrow and ~170px below the CTA row before the scroll hint — the entire first screen is type + two buttons, with the shortlist proof card pushed below the fold. Desktop gets headline _and_ evidence side by side; mobile gets only the claim. The H1 also breaks to four lines with an awkward split ("Every one _worth_ / _the interview._").
5. **Logo strip truncates mid-word at both widths** — "Deloitt…" at 390, "Pub…" at 1520. Presumably an intentional marquee, but the static first paint shows a cut word at the right edge. Worth confirming it animates rather than just clipping.
6. **Navbar density between 861px and ~1100px is unverified.** `.nav-links` only hides at `max-width: 860px`, so just above that breakpoint the wrap must hold wordmark + hiring/looking toggle + 7 links + Log in + red CTA inside 1160px minus padding. I have no capture at that width, so I'm flagging it as an evidence gap, not a defect. (The navbar itself is correct and consistent across `original-nav-restored-1920.png` and `home-1520.png`; I'm treating it as fixed.)
7. **`sample.css`'s header rules describe the sample's own nav, not the live one** (`.nav-links`, `.brand sup`, the 4-anchor underline behavior). Anyone deriving a site-wide header from this stylesheet would reintroduce exactly the header you said to leave alone. Flagging as a trap in the source, not a recommendation.

---

## Evidence gaps

Both full-page captures were returned downscaled ~7–9× — I can vouch for band sequence and section density from them, **not** for body-copy legibility, card spacing, or chart labels in the lower two-thirds of the page. I also have no tablet-width capture, and no hover/active-state evidence. If the whole-site review needs to assert anything about mid-page readability, a 1520 capture split into readable segments (and one at ~900px) would close that.

No changes proposed — review only, as requested.
