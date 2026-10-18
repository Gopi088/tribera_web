## Implementation brief — /industries replacement

**Measured note before you start.** The live homepage (`sample.css:27`) sets `--display: 'Fraunces', Georgia, serif` at weight 500, `--body: 'Inter Tight'`, `--mono: 'JetBrains Mono'`. The industries page file still declares `--display: 'Figtree'` (`index.astro:47`), but `artifacts/industries-idea-review/full-1520.png` renders the Fraunces serif, so a global token is already winning. **Use Fraunces/Inter Tight/JetBrains Mono** (the brief's "Figtree" is stale) and delete the local Figtree declaration and its preload links (`index.astro:25–27`).

---

### 1. Page-level copy (exact)

- **Eyebrow** (mono, with the homepage `\` tick): `\ COVERAGE — TWELVE SECTORS`
- **H1** (two lines, line 2 italic + red): `What counts as proof` / `changes with the sector.`
- **Lead**: `All twelve sectors we run mandates in are listed below. What we ask a candidate to evidence changes with the sector. How the decision gets made — and who makes it — does not.`
- **Primary CTA** (red pill → `/contact`): `Ask about your sector`
- **Secondary** (text link → `#same`): `How the method works ›`
- **Index key** (mono, above the list): `TWELVE SECTORS · CHOOSE YOURS`
- **`<title>`**: `Industries — twelve sectors, one method — tribera`
- **meta description**: `The twelve sectors we run mandates in. What a hire has to evidence changes with the sector; how the decision gets made does not.`

---

### 2. Hero composition

White field (`--white`), left-aligned, no dot-matrix, no glow, no card — deliberately _not_ the homepage's centred hero. Section padding-block `clamp(56px, 7vw, 104px)` top, `clamp(40px, 5vw, 72px)` bottom. **No `min-height` at any breakpoint** — delete the entire `1576px…calc(100svh)` ladder (`index.astro:385–465`).

**≥1000px:** copy block constrained to `max-width: 760px` inside `.wrap` (`--wrap: 1160px`, `--pad: clamp(22px,5vw,72px)`). H1 `clamp(2.6rem, 5.6vw, 4.15rem)`, `max-width: 16ch`, line-height 1.08. Lead `clamp(1.08rem,1.55vw,1.28rem)`, `--ink-2`, `max-width: 52ch`, `margin-top: 1.5rem`. CTA row `margin-top: 2.3rem`, gap `12px 24px`. Copy block ends ~465px below the 62px header, so the first index row sits at ~530px — visible at 1520×900.

**≤999px:** same order, single column. H1 `max-width: 14ch`. CTA row: primary full-width `min-height 48px`, secondary below it, left-aligned (not centred as today).

**1920px:** `--wrap` stays 1160px; hero does **not** stretch. Whitespace absorbs the extra width, matching the homepage.

---

### 3. The visible 12-sector index (same `<header>`, immediately below the CTA)

Markup: `<nav aria-label="Sectors"><ul class="secx">` → 12 `<li><a>`. Each `<a>` is the whole row. **No JS, no hover-only content, no truncation.**

**Row contents, in order:**

1. `ind__n` — sector name, Inter Tight 600, `1.05rem`, `--ink`.
2. `ind__x` — the existing sector description verbatim (e.g. `Three vetted people for roles where the wrong hire costs more than a quarter.`), `0.92rem`, `--ink-2`, 2 lines max.
3. Hairline `1px solid var(--line)`, `margin: 0.75rem 0 0.6rem`.
4. `ind__w` — mono key `WEIGHTED HEAVIEST` (`0.6875rem`, `0.14em`, `--ink-3-strong`) then the existing phrase on the next line (`0.88rem`, `--ink`, e.g. `Control failure, not framework recall`), preceded by a 2px × 12px red bar.
5. `ind__ar` — `→`, `aria-hidden="true"`, top-right, `--ink-3`.

**Delete every `.isp` six-bar SVG** (`index.astro:6753–7055`). They are the unsourced weighting rendered as a chart; the red bar in item 4 carries the same emphasis without implying measurement. Remove the "six bars / tall red one" explanation copy too.

**Grid:** `display: grid; gap: 0` with 1px `--line` separators drawn as row/column borders (rules, not cards — cards are the old look).

- ≥1200px: 3 columns, 4 rows.
- 768–1199px: 2 columns, 6 rows.
- <768px: 1 column, 12 rows.
  Row padding `clamp(18px, 1.6vw, 24px)`; min-height 132px desktop, 112px mobile. Column gaps `clamp(24px, 3vw, 44px)`; vertical rules via `border-left` on non-first columns.

**Hover/focus (identical for both):** background `--paper` (#f1eee7); left inset 3px red bar animating `height 0 → 100%` in 180ms `--ease`; `ind__n` → `--red`; arrow translates `4px`. `transition: background .18s var(--ease)`. Focus uses `outline: 2px solid var(--red); outline-offset: -2px` (inset so it isn't clipped by the rule grid). No transform on the row; no scale.

Keep `id="all"` on this `<nav>` so existing `#all` links resolve.

---

### 4. Revised page sequence

1. **Hero + index** (white) — above.
2. **`#same` — "The method is the same in all twelve."** (dark, `--charcoal`). **Keep** the eyebrow `What doesn't move`, the H2, the dek, all four steps and their `engine/expert/yours` owner tags, and the closing line `Twelve sectors. One way of making the call.` **Rewrite** only the dek to: `Sector context changes the questions and who does the interviewing. It never changes how the decision gets made, or who makes it.` (drops the unsourced "weighting"). Make the steps static — **remove** `opacity: .4` / `.on` toggling and `cursor: pointer` (`index.astro:1494–1519`); all four render at full opacity.
3. **`#contact` — "Not listed"** (paper). **Keep** verbatim: eyebrow, H2, dek, both buttons.
4. Footer unchanged.

**Cut entirely:** the hero comparison card and `initComparison` import (`index.astro:6594–6733`, `7124–7129`) plus `.cmpw`, `.sel`, `.sector-picker`, `.bw`, `.feat__*` CSS; the `industrySeries`/`comparison` imports (`3–8`); the whole `#all` card section wrapper and its "Twelve sectors, twelve different bars" heading + six-bars dek (`6738–6750`) — the index replaces it. `.logos`, `.cases`, `.desk`, `.verd` dead CSS goes too. `SiteHeader`, `SiteFooter`, `.nav/.navp/.dd` untouched. Nothing new is invented: every string ships from existing copy.

---

### 5. Component tokens

| Role       | Value                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------- |
| Hero field | `--white #ffffff`; method band `--charcoal #121212`; not-listed band `--paper #f1eee7`          |
| Rules      | `--line rgba(19,19,19,.1)`; dark band `--line-d rgba(255,255,255,.11)`                          |
| Text       | `--ink #131313`, `--ink-2 #57565b`, `--ink-3-strong #6b6a61`; dark band `--pw / --pw2`          |
| Accent     | `--red #da0007` — italic H1 line, hover bar, weighted-heaviest tick, focus ring, primary button |
| Display    | Fraunces 500, `letter-spacing -.01em`, `line-height 1.08`                                       |
| Body       | Inter Tight 400/600                                                                             |
| Mono       | JetBrains Mono, 12px, `letter-spacing .2em` (eyebrows) / `.14em` (row keys), uppercase          |
| Radii      | buttons `100px`; index rows `0` (rules, not cards); any chip `100px`                            |
| Shadow     | primary button only: `0 8px 20px -8px rgba(218,0,7,.5)`                                         |
| Motion     | reveal `[data-rv]` 18px/0.9s `--ease`, stagger 60/120/180ms; hover 180ms; nothing else          |

---

### 6. Accessibility & responsive

- Index is a `<nav aria-label="Sectors">` + `<ul>`; one `<a>` per `<li>`; accessible name = sector name (description and weighted line are inside the link — acceptable; verify with VoiceOver/NVDA that the name is announced first).
- Every interactive target ≥48px high; hit area = full row.
- `:focus-visible` 2px `--red`, never removed; tab order = DOM order = visual order at all breakpoints.
- Contrast measured on white: `--ink-2` ≈ 7.0:1, `--ink-3-strong` ≈ 5.3:1, `--red` ≈ 5.9:1 — all pass AA; keep mono keys ≥12px.
- `prefers-reduced-motion: reduce` → reveals render final state, hover bar switches to instant background change, `scroll-behavior: auto`.
- No JavaScript is required for any content, link or state; the page must be complete with JS disabled.
- Verify 320 / 390 / 768 / 1520 / 1920: no horizontal scroll, H1 does not clip at 320 (test `Every sector` wrap), 2-column index does not drop below 300px per column at 768.
- `scroll-margin-top: 74px` on `#same` and `#contact`.

---

### 7. Acceptance checklist

1. No percentage, weight value, bar chart, sparkline or "22 percentage points" string appears anywhere on the page (grep for `%`, `bw__`, `isp`, `cmpw`).
2. All 12 sector hrefs present, unique, and resolving; 12 descriptions and 12 weighted-heaviest phrases match the current strings byte-for-byte.
3. With JS disabled, all 12 sectors are visible and clickable, and the hero CTA reaches `/contact`.
4. No dropdown, tab, carousel or disclosure anywhere on the page.
5. Hero has no `min-height`; at 1520×900 the eyebrow, H1, lead, both CTAs and at least the first index row are above the fold.
6. Primary action at every breakpoint is `Ask about your sector`; no in-page scroll button outranks it.
7. Header, navbar, footer, the four method steps and the not-listed CTA are byte-identical to today except the one rewritten method dek.
8. Total page height at 390px is under 3,500px (today: 6,965px), and keyboard tab from the header reaches sector 1 within three stops.
9. Axe: zero violations; manual check of focus ring visibility on the paper hover background.
