## Verdict — Step 2 (footer unification): **PASS**

Read-only review of the diff, `measurements.json`, the four PNGs, and current `src/components/widgets/Footer.astro`. No files were modified.

---

### 1. Measured facts (from `measurements.json`)

One footer contract now renders identically across route families and widths:

| Selector        | `/` @390                                                  | `/functions/engineering-platform/` @1920 | `/privacy/` @1920        |
| --------------- | --------------------------------------------------------- | ---------------------------------------- | ------------------------ |
| `.ft__ttl`      | 12px JetBrains Mono, `rgb(255,107,111)`                   | identical                                | identical                |
| `.ft__line`     | 14.5px Inter Tight, `rgb(154,153,146)`, `max-width:288px` | identical                                | identical                |
| `.ft__bar`      | 12.5px, width 346, height 74.75                           | width 1160, height 44.75                 | width 1160, height 44.75 |
| `.ft__bar` text | `© 2026 … · Pune · Bengaluru · New Jersey Back to top ↑`  | identical                                | identical                |
| `pageOverflow`  | false                                                     | false                                    | false                    |

The brand-line copy string is byte-identical in all three blocks. `36ch` resolves to exactly 288px everywhere, so the measure is stable, not accidental.

**Contrast (computed by WCAG formula from the measured colors, on the declared `#121212`):**

- `.ft__ttl` `#ff6b6f` → **≈6.77:1** (was `#da0007` → 3.55:1 per the review README; the 3.55 figure reproduces exactly for `#da0007` on `#121212`, confirming which token changed).
- `.ft__line` / `.ft__made` `#9a9992` → **≈6.55:1**.
- Link/`.ft__up` `#bdbdb7` → **≈9.9:1**.

All three now clear AA normal text (4.5:1); the P1 footer half of the finding is measurably resolved.

### 2. Screenshot check

Home @1520 and About @1920 are structurally and typographically indistinguishable: same 1-brand + 4-nav column grid, same salmon mono kickers, same link color/size, same baseline-aligned bottom bar. Mobile crops match too.

One **evidence caveat, not a defect**: `about-footer-390.png` renders ~375px wide while `home-footer-390.png` is 390px. That ~15px alone explains the only visible delta — "Back to top" wraps below the city line on About and sits inline on Home. The measured `.ft__bar` height of 74.75 at 390 confirms the bar is already a two-row flex at that width, so this is capture width, not a style divergence. Worth re-capturing About at a true 390 for a clean pair.

### 3. Requirements confirmed in source

- Canonical source: `widgets/Footer.astro`; `home/v126/Footer.astro` is now a 5-line re-export; `index.astro` dropped its `slot="footer"` override. Single implementation.
- Explicit dark surface/color/font/grid contract, `isolation: isolate`, and `:root body footer.ft` specificity (0,2,2) to beat legacy route-local rules — and the measurements empirically prove nothing on the v126 homepage overrides it.
- Preserved: `tribera<i>.</i>` wordmark, `/industries`, `/functions`.
- Added: homepage IA anchors, latest brand copy, `Request a DPA` → `/contact`, New Jersey, `{year}` from `new Date().getFullYear()` (renders 2026).
- Back-to-top targets `#nav`, not a nonexistent `#top`. Correct call — note `TopicIndex.astro:23` does carry `id="top"`, which is exactly the trap of assuming it is global.
- Footer `.wrap` formula `min(calc(100% - clamp(44px,10vw,144px)),1160px)` is character-identical to `EditorialPage.astro:31-36`. Good precedent to generalize in Step 9.
- Navbar untouched (not reopened here).

### 4. Non-blocking follow-ups (do not hold Step 2)

1. **Verify anchors exist.** `#funnel` is corroborated by the `home-funnel` capture block and `#proof` by `Proof.astro`; `#results`, `#ways`, `#experts` are **not** covered by my evidence. Cheap one-time check — a dead footer link is worse than a wrong label.
2. **Breakpoint is tight at 1020px.** At exactly 1020px: wrap = 918px, gaps 4×26.52, `1.5fr + 4×0.9fr` → columns ≈143.3px. Measured `.ft__ttl` "For hiring teams" is 135.05px — ≈8px slack (computed). Consider `@media (min-width: 1100px)` for the 5-column grid.
3. `.ft__bbb` uses `white-space: nowrap`; unverified below 390px.
4. Confirm no remaining importers of `home/v126/Footer.astro`, then delete the shim.

---

## Concrete minimal recommendations for the next individual steps

**Step 3 — archive title/lead gap (`TopicIndex.astro`)**
The component already has a scoped `<style>`; add one rule there (scoping raises specificity over the global editorial rules):

```css
.hero h1 + .hero__p {
  margin-top: 18px;
}
```

18px is not arbitrary: on specialist heroes the measured `.hero h1` bottom 426.97 → `.hero__p` top 444.97 = exactly 18px. This matches the existing site gap instead of inventing one. Do not re-add `.hero__p`; it is already present (`TopicIndex.astro:27`).

**Step 4 — distinguish tag/category labels (`HeroFilters.astro`), no URL change**
The duplicate has a single, precise origin: line 28 already excludes tags whose slug collides with a category, but lines 38–49 push the _active_ tag back in unconditionally. Fix only that push:

```js
const collides = categories.some((c) => c.slug === activeSlug);
filters.push({
  label: collides ? `Tag: ${activeTag.title}` : activeTag.title,
  slug: activeTag.slug,
  type: 'tag',
  href: getPermalink(activeTag.slug, 'tag'),
});
```

Add `data-type={filter.type}` to the anchor for an optional non-color cue (e.g. `.topic-filters a[data-type='tag'] { border-style: dashed; }`). `href` values and `aria-current` logic stay untouched, so both filter semantics survive. Chip wrapping at 390 is normal and needs no change.

**Step 5 — two separate measures**

_Specialist intros._ `EditorialPage.astro:198-203` already gives `.hero__p, .dek, .fn__dek, .trust__dek` a `max-width: var(--type-subtitle-measure)`, and `:208-219` gives `.shead > *` a 60ch cap. The measurements show `.shead .dek` with `maxWidth:"none"` at 809/913/1011px @18px — i.e. the inline attribute is the only thing defeating an already-correct cascade. Preferred: delete `max-width:none` from the inline `style` on those `<p>` elements in `src/pages/functions/[slug].astro` and `src/pages/industries/[slug].astro` (paragraphs only). If you cannot touch the templates, one scoped override:

```css
:root .site-editorial :is(.shead .dek, .trust__dek, .fn__dek) {
  max-width: 60ch !important;
}
```

Scoped to those three paragraph selectors only — headings, cards, charts and comparison tables keep their widths.

_Legal prose._ `MarkdownLayout.astro:35` sets the section to 860px and `:41` sets 16px body — measured `.legal-document__body` width 860 @16px (≈110 characters). Add one declaration to the existing scoped block, leaving `.legal-document` at 860px so the H1 stays wide:

```css
.legal-document__body {
  max-width: 70ch;
}
```

**Step 6 — Blog active on taxonomy routes (`StandaloneNavScripts.astro`)**
Lines 449 (desktop `.nav__l`) and 461 (mobile `.navp a`) match only `/blog`. Hoist one predicate and use it in both:

```js
const isBlogRoute =
  pathname === '/blog' ||
  pathname.startsWith('/blog/') ||
  pathname.startsWith('/category/') ||
  pathname.startsWith('/tag/');
markPage('.nav__l[href="/blog"]', isBlogRoute); // line 449
markPage('.navp a[href="/blog"]', isBlogRoute); // line 461
```

Destinations and items unchanged. If the `category`/`tag` prefixes are configurable, derive them from `utils/permalinks` rather than hardcoding.

**Step 7 — About letter kicker**
`.ltr__k` inherits `text-align: center` while the statement is left-aligned. Minimal scoped rule alongside the letter block:

```css
.ltr__k {
  text-align: left;
  justify-self: start;
  align-self: start;
}
```

`justify-self` covers the case where the parent centers via grid `justify-items` rather than `text-align`. I did not open the About source (per instruction), so confirm which of the two mechanisms is active and keep only the needed declaration.

**Step 8 — homepage lab semantics**
The model is already correct and centralized: `lab-model.ts` is exactly `weight >= Math.max(7, maxWeight * 0.92)`, and `Proof.astro:12,22` applies `heavy` to rows/tiles and `low` for `d.s <= 2`. Remaining work is presentation and parity, not logic:

- Give the two states semantic dark-surface tokens with AA contrast — reuse the footer's `#ff6b6f` for heavy (**6.77:1** on `#121212`, computed) so lab red and footer red agree, and `#f0b429` for low (**≈10:1**, computed). Apply on the real class combinations emitted at `Proof.astro:16,22`: `.row.heavy .rp`, `.lt.heavy`, `.lt.low b`.
- Keep state legible without color alone — `.lt i` is currently `rgba(255,255,255,0.7)` at 11px (measured); pair the amber with the existing `aria-label="…: N out of 5"`.
- The sliders ship `disabled` but `#labData` is emitted for the client. Ensure any client-side recompute imports `isHeavy` from `lab-model.ts` rather than duplicating the threshold, or server and browser states will drift.

**Step 9 — shared kicker and surface roles**
`Eyebrow.astro` currently hardcodes one role: `accent = true` (always the red slash) and `color: var(--v58-faint)`, the token behind the measured 2.87:1 failure. Keep `accent` controlling the slash for call-site compatibility and add a color role:

```text
const { accent = true, tone = 'page' } = Astro.props;  // 'page' | 'accent'
```

- `tone="page"` → `#57565b` (**7.3:1** on `#fff`, **6.6:1** on `#f4f3f0`, computed) — the default, so every existing call site gains contrast with no markup churn.
- `tone="accent"` → `#da0007` (**5.3:1** on white, computed) for CTA-adjacent kickers only.

Do not add the slash to all metadata, and leave the deliberately different 11.2px home vs 12px specialist sizes alone until the color role lands.

For surfaces/containers, name the difference instead of erasing it: `--paper-warm: #f1eee7` (home marketing) and `--paper-editorial: #f4f3f0` (`EditorialPage.astro:17`), plus one container contract — adopt the editorial/footer formula `width: min(calc(100% - clamp(44px,10vw,144px)), 1160px)` with `padding-inline: 0` as the shared wrap, which removes the home's 1160-outer/1016-inner discrepancy. Retain narrower article/form measures, compact Inter Tight UI H3s vs Fraunces story headings, and the warm home paper.

---

### Scope and limits

Static Chromium style/geometry evidence at 390/1520/1920 from the supplied artifacts plus the named sources. Contrast values are computed by me from measured colors, not sampled from rendered pixels. I did not verify hover/focus states, keyboard behavior, cross-browser rendering, the existence of `#results`/`#ways`/`#experts`, or the inline `max-width:none` attributes in the two `[slug].astro` templates (inferred from the measured `maxWidth:"none"` against a cascade that would otherwise cap at 60ch). Steps 3–9 recommendations are proposals against read-only source; none were applied.
