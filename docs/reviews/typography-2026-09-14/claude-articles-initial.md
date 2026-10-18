# Independent Claude Review

Initial review. The explanation of the mobile root-size difference is superseded by the corrected article review.

## Findings: heading/subtitle hierarchy for the two article pages

### What's actually rendering (confirmed by audit data + crops)

Both `designing-for-trust-privacy-transparency-respect` and `why-tech-hiring-really-takes-so-long` are wrapped in `.site-editorial` (`EditorialPage.astro`). Its global rule:

```
:root .site-editorial :is(h2, .h2) { font-size: clamp(2rem, 3.9vw, 3rem); ... }
```

(`src/components/v58/EditorialPage.astro:48-55`)

has specificity `(0,2,1)` and **wins over** each page's own local `<style is:global>` block, e.g.:

```
.h2 { font-family: var(--display); font-weight: 700; font-size: clamp(30px, 4.2vw, 54px); ... }
```

(`src/pages/blog/why-tech-hiring-really-takes-so-long.astro:195-203`)

Result: every real `<h2>` on both pages — article-body section headers (`h2` in `article.art`), the related-articles header (`h2.h2` in `#related`), and the CTA header (`h2.h2` in `#contact`) — renders identically at **32px/34.56px (390px) → 32px (768px) → 48px/51.84px (1520px)**, Fraunces weight 500. This is confirmed both in the measurement data and visually (the "Three more…" and "Two doors…" crops use the same serif weight/size as article `h2`s). So **within these two pages, H2 is already fully consistent** — article body, related module, and CTA are not diverging from each other.

The "48px desktop / 30px mobile" global section H2 you referenced does not appear to be the rule actually governing these two pages — it's shadowed. I have not opened the marketing-page CSS to confirm that figure's source, so I can't say whether it's a separate system or dead code elsewhere too; flagging as unverified.

### Semantic subtitle vs. body-paragraph distinction

- `p.ahead__sub` (hero deck) and `p.dek` / `p.dek.in` (related/CTA decks) are genuine subtitles: short, single-purpose lines, tighter line-height (1.45-1.55×), muted grey, and positioned directly under their H1/H2. Correctly flagged as subtitle candidates.
- `p [article.art]` (the paragraph immediately following each body `h2`) is **not** a subtitle — it's the section's first regular paragraph (16.5px/28.38px, 1.72× line-height, full body grey `rgb(59,59,57)`, 3-8 lines long). The audit tool likely flagged it only because of its position right after an `h2`. This should be excluded from any subtitle/deck styling pass.

### Issues by severity

**Medium — line-height too tight for wrapping article-body H2 on mobile**
`article.art h2` uses `line-height: 1.08` (`EditorialPage.astro:53`, also baked into `EditorialHeading.astro:19`), the same tight display leading used for the 1-2-line hero H1. But body-section headers wrap to 3-4 lines at 390px (e.g. "Privacy without transparency is just a black box" at ~4 lines, y=3562.3 in the trust-article audit). 1.08 leading on 4 wrapped lines of Fraunces risks ascender/descender crowding — it's a mismatched reuse of a leading value meant for short display headlines, not wrapping mid-article subheads.
_Recommendation:_ Add a targeted override for `article.art h2` (not a global `EditorialHeading`/`EditorialPage` change, to avoid loosening the hero H1) — e.g. `line-height: 1.15-1.2` — or reduce mobile clamp minimum slightly so headers wrap to ≤2 lines.

**Low — dead/shadowed `.h2` CSS block per page (maintenance trap, not currently visible)**
Each blog page (e.g. `why-tech-hiring-really-takes-so-long.astro:195-203`) still defines its own `.h2` (Figtree, weight 700, different clamp/letter-spacing) that never applies today because `EditorialPage.astro`'s scoped rule always outranks it for real `<h2>` elements. It's not a live bug, but it's a specificity trap: any future removal/rescoping of `.site-editorial`, or any element carrying `class="h2"` on a non-`h2` tag, would silently switch to the wrong (Figtree/700) type system.
_Recommendation:_ Remove the redundant local `.h2` block from these article pages rather than leaving two competing definitions resolved only by specificity.

**Low — body paragraph and "dek" text sizes nearly converge on mobile**
Body paragraph is 16.5px/28.38px; dek is 16px/24.8px — a 0.5px font-size gap. They stay visually distinct today only via line-height and color-token difference (`rgb(59,59,57)` vs `rgb(87,86,91)`). Fragile if those tokens are ever consolidated, but not a current visible defect.

**Informational**

- `EditorialHeading.astro`'s `--h3` style (1.1rem/1.6) isn't exercised in either audited page's rendered content — can't assess in this review.
- The 48/30 "global section H2" baseline you cited wasn't found governing either page reviewed; I did not open the marketing-section source (e.g. `Home.astro`) to trace it, per scope.

### Recommendation

Don't force article-body H2 to match a marketing-section 48/30 scale — the two contexts (long-read serif subheads vs. dense marketing section rhythm) reasonably warrant different treatment, and the article H2 is already internally consistent across body/related/CTA on both pages. The two things actually worth fixing are the tight mobile line-height on wrapping article H2s, and removing the shadowed per-page `.h2` block so there's one clear source of truth instead of two competing definitions resolved by CSS specificity.
