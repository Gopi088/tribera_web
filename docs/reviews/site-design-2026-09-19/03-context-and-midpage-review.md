## Method

Read all 57 crops at original pixel width (390 and 1520), then verified against `sample.css`, `Footer.astro`, `content-typography.css`, `MarkdownLayout.astro`, `EditorialPage.astro`. Contrast figures below are WCAG ratios computed from source hex/alpha values and the composited background, not eyeballed. I avoided `.lab`, `.card`, `.nav-links`, `.cand` and the `.hero .wrap`/`.dp-*` two-column hero block — all dormant per your note and none match what renders. Where I could not find the governing rule I say so.

---

# Findings (prioritized)

## P1-A · Two different components are shipping as "the global footer"

**Routes:** `/` vs all 75 others. **Evidence:** `home-footer-390/1520` vs `about-footer-390/1520`.

|                   | Home footer (`.ft-*`, sample.css)                                  | Shared footer (`Footer.astro`)                                                                           |
| ----------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Wordmark          | `tribera` + red superscript ™                                      | `tribera.` with period (L9)                                                                              |
| Value line        | "Hiring you can prove."                                            | "AI reads the interview. Senior experts add the judgment…" (L11)                                         |
| For hiring teams  | How it works / In practice / Results / How we work / What we cover | How it works / The bar / How decisions are made / Ways to work with us / Industries / Functions (L21–29) |
| Legal             | 4 items incl. **Request a DPA**                                    | 3 items, no DPA (L45–50)                                                                                 |
| Offices           | PUNE · BENGALURU · **NEW JERSEY**                                  | Pune · Bengaluru (L54)                                                                                   |
| Back to top       | `.ft-up` present                                                   | absent                                                                                                   |
| Column title size | `.ft-ttl` 0.6rem = **9.6px** (sample.css:2000‑2007)                | `.ft__ttl` **12px** (content-typography.css:192‑194)                                                     |
| Mobile columns    | 2-up grid (`.ft-top{1fr 1fr}`, :1907‑1911)                         | single stack — /about's mobile footer is ~2× taller                                                      |

Only "How it works" survives in both nav sets. New Jersey and Request a DPA exist on one page of the site.

**Fix (context-aware):** keep `Footer.astro`'s structure and IA as canonical, port into it the three things the homepage version does better — the 2-up mobile grid, back-to-top, and Request a DPA — then render the shared component on `/`. If the two link sets are genuinely different jobs (homepage anchors vs site routes), that's arguable; the wordmark, the office list and the DPA link are not.

---

## P1-B · Homepage secondary-text tokens are below AA, and lighter than the site's own muted value

**`--ink-3: #9a998f`** (sample.css:8) → **2.87:1 on white, 2.47:1 on `--paper #f1eee7`**. Carries:

- `.eyebrow` 11.2px (:142‑152) — the faint `\ WHAT THIS IS`, `\ HOW IT STAYS FAIR` in `home-thesis-390`, `home-trust-390`
- `.faq-ask-q` **16px** (:4447‑4452) — "Didn't see yours?" in `home-faq-390/1520`, visibly washed out
- `.faq-ic` ±icon fill (:4505‑4516) — 2.47:1 against a 3:1 non-text requirement
- `.xp span` 11.5px (:2170‑2175) — "system design · scale" under every expert card, `home-experts-390/1520`
- `.ratio-n` **27.2px** display figure (:3539‑3545) at 2.87:1

The rest of the site already uses **rgb(110,110,104)** for the same meta role (census: article date line, career-detail breadcrumb) = 4.6:1.

**`--pw2: rgba(255,255,255,0.42)`** (sample.css:12) over `--charcoal #121212` → **4.10:1 at every size it's used**. Carries: `.g-dark .eyebrow` 11.2px; `.verd-sub` 12.16px (:2451‑5 — exact census match "AI Senior Security Engineer · 5 yrs · Bengaluru"); `.fnl-step .d` 13.1px (:1436‑41, the funnel step descriptions); `.fnl-math` 13.6px (:1499‑1503, "About 38 hours stayed with the hiring team…"); `.proof-checks p` 14.4px (:2753‑7 — "No line, no score." in `home-proof-390-bottom`/`1520`); `.ft-line` 14.4px; `.rows-ft` 10.9px ("Importance adds to 100.00%").

**Fix:** two token edits. `--ink-3` → ≈`#6B6A62` (or just adopt rgb(110,110,104)). `--pw2` → `rgba(255,255,255,0.50)` = 5.3:1 (0.55 = 6.2:1). `--pw` (0.7) is already 9.4:1 and needs nothing.

---

## P1-C · Homepage label floor is 8.6–9.6px; the rest of the site's is 12px

`content-typography.css:21` sets `--type-label-size: 12px` for every eyebrow/label/meta on the 75 editorial routes. The v126 homepage runs its own scale:

- **8.64px** — `.own` (:1442‑1451): the `TRIBERA` / `THEIR FIRST HOUR` / `THEIR CALL` ownership chips in `home-funnel-390/1520`. These chips carry that section's entire argument about who does what.
- **8.8–9.3px** — `.hero-cue-k`, `.hero-card .hc-hd`, `.ho-mk`, `.side-k`, `.fchip`
- **9.6px** — `.ft-ttl`, `.flow .who`, `.fnl-gap`, `.save-k`, `.ops-eyebrow`, `.reg-k`, `.cost-lbl`, `.ho-k`, `.tm-tag`, `.row .rk`

Visible in `home-proof-390-top`: the verdict axis `0 · REJECT · 26 · GREY · 34 · SELECT · 50` and `HIS SCORES · OUT OF 5 · THESE DON'T MOVE`. Census corroborates — `/` is the only route in 76 with 9.6px and 9.92px paragraph sizes; every other route bottoms out at 10–12px.

**Fix:** floor the v126 mono labels at 11px, and at 12px for anything carrying meaning (`.own`, the scale axis, `.ft-ttl`). Let the 0.12–0.2em tracking carry the technical feel instead of the size.

---

## P2-D · The two long-form reading surfaces are the only uncapped measures in the system

- **`/security` (and `/privacy`, `/terms`):** `.legal-document { width: min(…, 860px) }` + `.legal-document__body { font: 400 16px/1.75 }` (MarkdownLayout.astro:34‑44) → **~115ch**. `legal-body-1520-top` shows "Publicly disclose a vulnerability before we have had a reasonable opportunity to investigate and address it" as one 105-character line.
- **`/blog/why-tech-hiring-really-takes-so-long`:** column measures ≈632px (ragged right edge across `article-body-1520-top/middle/bottom` confirms it's the column, not the crop), 16px/1.72 → longest line 88 characters.
- Meanwhile `.site-editorial :is(.hero__p, .dek, …){max-width:62ch}` and `.shead > *{max-width:60ch}` (EditorialPage.astro:198‑203, 214‑219).

So the short deks are the most disciplined type on the site and the two surfaces people actually _read_ are the least.

**Fix:** cap `.legal-document__body` at ~68ch (keep the 860px container for headings if wanted) and cap `article.art p, article.art li` at ~68ch. Lands both on the 60–62ch rule the system already states.

---

## P2-E · Footnote captions on light editorial panels are ~2.1:1

**Directly visible:** `/careers/talent-associate` — "Nice to have means nice to have. Nobody has been rejected here for a missing line in this column." is markedly paler than the list items immediately above it, at **both** `career-details-390` and `career-details-1520`.

Census gives this role as **14px rgb(170,169,162)**; against `--paper: #f4f3f0` (EditorialPage.astro:17) that is **2.11:1**. The census shows the same 14px/rgb(170,169,162) role on `/functions`, `/functions/*`, `/industries`, `/industries/*`, `/intelligence`, `/careers` — the "Example weights, not a fixed hiring standard…" and "Share of recorded assessment gaps…" captions, each sitting under an rgb(19,19,19) mono label, i.e. on a light surface. ~35 routes.

**Likely cause (unconfirmed):** `#aaa9a2` is declared as `--onc3` inside `.site-editorial .hero .cmpw` (EditorialPage.astro:88‑95) — a _dark_ card, where it measures 8:1. The light-surface `--onc3` is `#77776f` (:67‑70, :233‑236). This reads like the dark-surface value reaching light panels, but I did not find the rule that paints these captions. The measurement and the symptom are not in doubt; the mechanism is.

**Fix:** use rgb(110,110,104) = 4.62:1 on `#f4f3f0`, already the site's meta colour on articles and career details. Do **not** reach for `#77776f` — it's only 4.07:1 on that paper.

---

## P2-F · "Inactive" states are pushed below reading contrast, and mobile has no active item

- **`/industries`** — `industry-cards-1520-top`: "Banking & financial services" is active (white card, red top rule, near-black serif title). The other 11 cards have grey serif titles and pale grey descriptions. `industry-cards-390-top`: **all four visible cards including the first are dim — nothing is active.**
- **`/functions/engineering-platform`** — `function-evidence-1520`: Q2 is full contrast; Q1 and Q3 have grey headings _and_ pale "A THIN ANSWER" / "EVIDENCE TO LISTEN FOR" bodies. Same split at 390.
- **`/intelligence`** — `intelligence-availability-390/1520`: "Short" is active; "Immediate", "Standard", "Long" are pale — including their headline **22% / 29% / 34% CLEAR THE BAR** figures, which are the section's entire payload.

The focus device itself is well made and worth keeping. The floor of the inactive state is the problem.

**Fix:** carry "active" with the _surface_ (white card + red rule + shadow — you already do this) and let inactive text sit at rgb(110,110,104) body / near-ink titles. Set the first item active by default at ≤900px on `/industries`.

**Uncertainty:** inferred from static captures only; I could not locate the rule. If it's `:hover`-driven, mobile can never reach the readable state and this is a defect rather than a tuning question. Confirm that first.

---

## P3-G · Mono labels on shared components render with per-glyph colour variation

`about-footer-390` and `about-footer-1520`: "FOR HIRING TEAMS", "FOR CANDIDATES", "COMPANY", "LEGAL" render with some glyphs red and others near-black — **and the affected glyphs differ between the two captures** (the "F" of FOR CANDIDATES is dark at 1520, red at 390). That's an animated text-fill frozen at a different phase, not a static style. `blog-newsletter-390/1520` shows the same on "NEWSLETTER IN PREPARATION".

Even at full red, `#da0007` on the footer's near-black is **3.30:1** at 12px; the dark glyphs are far below. The homepage footer doesn't do this — `.ft-ttl` is a flat `--pw2`.

**Fix:** resolve these labels to one flat colour. If the moving fill is wanted, floor the gradient so no glyph drops below 4.5:1 and have `prefers-reduced-motion` land it on the flat colour rather than an arbitrary phase.

**Uncertainty:** `Footer.astro` has no `<style>` block and `EditorialPage.astro`'s scope explicitly excludes the footer (:12), so I could not locate the rule. Symptom is directly observable in four captures; mechanism is my reading.

---

## P3-H · `/about` letter: centred eyebrow over a left-aligned two-column layout

`about-letter-1520-top`: "FROM AKSHATA" sits at x≈697–808 — page-centred (content spans 173–1332, centre ≈752) — while its headline "The pause was always the same." starts at x=173 and the right-hand column starts at x=788. The label reads as a heading for the _right_ column, detached from the headline it introduces. At 390 the same centring reads only as a slight indent.

Every other eyebrow I inspected is flush-left with its heading — `services-letter-1520` has "WHY IT IS BUILT THIS WAY" and the headline both starting at x=474; same on `/careers`, `/contact`, `/industries`, `/intelligence`, `/functions`.

**Fix:** left-align `.ltr__k` to the left column. (Rule not in the files I read.)

---

## P3-I · `/contact` dark form card: labels and placeholders

`contact-form-1520-top`: "FIRST NAME / LAST NAME / EMAIL / COMPANY" are uppercase letter-spaced mono in a dim grey; the placeholders ("First name", "your@email.com", "Where you work") are dimmer still; the input borders are close to invisible, so the fields read as flat panels rather than editable inputs. Same placeholder problem on `/blog`'s newsletter input (`blog-newsletter-1520`).

`/candidates/start` gets this right and shows the target: sentence-case ink labels on light fields, with `::placeholder { color: var(--grey) #57565b }` = **6.6:1** (EditorialPage.astro:141‑143). Note both forms already share their label _size_ — `content-typography.css:196‑198` sets `.cf__k` and `.apply__field label` to 14px — so only colour and case diverge, which is fine per your candidate/client split.

**Fix:** lift the dark-card placeholder to ≥rgba(255,255,255,0.55) and give inputs a ≥3:1 border so the field boundary is an affordance. I could not confirm the `.cf__k` colour token — measure before changing.

---

## P3-J · `/candidates/start` disabled submit reads as an off-brand CTA

`candidate-start-390/1520`: "Submit profile →" is a salmon pill with white text. The fill is consistent with `#da0007` at ~45% opacity over white — a disabled state on an unfilled form, not a wrong colour. Disabled controls are exempt from WCAG contrast, so this is a _reads-as-broken_ issue, not a conformance one: it's the only CTA in the card and "faded brand red" looks like a rendering fault rather than "not yet".

**Fix:** neutral disabled treatment (grey fill, dark label). Keep red exclusively for the enabled control.

---

## P3-K · Homepage score encodings have no legend; `/candidates` has one

`home-proof-1520` shows red-bordered chips ("Systems built 5", "Detection 5" — `.lt.heavy`, sample.css:2593‑6) and amber numerals ("LLM security **2**", "Data access **2**" — `.lt.low b`, :2590‑2) with **no key**. `candidate-score-1520` uses the same two encodings and _does_ provide one: "Amber: relatively weaker areas · Bright borders: this team's leading priorities". Same UI, one page explains itself and one doesn't.

**Fix:** carry the `/candidates` legend into the homepage verdict card.

---

## P3-L · `/404.html` eyebrow is 8.96px _(census-derived; no crop inspected)_

Census gives `/404.html` paragraph sizes as 18px and **8.96px**, the latter being "\404 / Page not found" in JetBrains Mono rgb(154,153,143). 8.96px = 0.56rem, matching `:root .site-editorial .eyebrow { font-size: 0.56rem }` (EditorialPage.astro:61‑66). On the other 74 editorial routes that declaration is outranked by `:root body .site-editorial :is(.eyebrow,…){font-size:var(--type-label-size)}` = 12px (content-typography.css:154‑194; specificity 0‑3‑1 vs 0‑3‑0). `/404` appears to sit outside that selector's reach — content-typography names only `.missing-page .v58-button` for this page (:147). The colour is also `#9a998f` = 2.87:1.

**Fix:** add `.missing-page` to the label-size selector list; use rgb(110,110,104).

---

# Already consistent (leave alone)

- **Families.** 228/228 H1s in Fraunces. The Fraunces / Inter Tight / JetBrains Mono triad holds everywhere, including v126, which declares the same three stacks (sample.css:26‑28) as EditorialPage (:14‑16). No stray families in any crop.
- **Heading scale across the 75 editorial routes.** H1 32→53.12px, section H2 28→36px, article H2 24→32px — one set of clamps (content-typography.css:6‑12), and the census shows it holding on every route with no drift.
- **Body copy on the real reading surfaces.** 16px `--grey #57565b` = **6.55:1** on `#f4f3f0`. Article body 16px/1.72 with generous paragraph spacing reads cleanly at 390 and 1520.
- **Article furniture.** Short red rule above each H2, red-bar pull quote, bold lead-in on the load-bearing sentence — identical at both widths, scales without breaking. `/blog/why-tech-hiring-really-takes-so-long` is the best-set text on the site apart from its measure.
- **Homepage card system.** One radius for cards (`--card-r` 14px), one for full-bleed panels (`--r-lg` 16px), one shadow, one hover lift. The differences are between roles, not within one — nothing to flag.
- **Section-head measure discipline.** Deks at 62ch, section heads at 60ch (EditorialPage.astro:198‑219). Exactly what P2‑D is missing.
- **Strongest body sections:** `/careers` role cards, `/services` offer accordion, `/candidates` preview cards, `/contact` response timeline — all full contrast, well spaced, correct at 390.
- **Forms share their label size** (14px both, content-typography.css:196‑198) and both hold 44px minimum targets (EditorialPage.astro:295‑300, 340‑347).
- **Focus-visible** is a red 2px outline in both systems (sample.css:308‑313, 4600‑4603; EditorialPage.astro:318‑321).
- **Reduced motion is thoroughly handled** — every reveal, stroke-draw and marquee has an explicit reset (sample.css:702‑709, 855‑860, 1114‑1121, 1269‑1275, 2415‑2427, 3098‑3104, 3200‑3206, 4608‑4621) plus a `:not(.is-enhanced)` no-JS fallback (:4573‑4588, 4624‑4635). The stopped marquees and hidden duplicate testimonials in the captures are that system working correctly.

# Intentional differences to keep

- **Centred homepage hero, no side-by-side evidence card.** `.hero-c { text-align:center }` (:2804‑2822) supports it and it reads cleanly. The two-column `.hero`/`.dp-*` rules are dormant.
- **Fraunces for statement headings, Inter Tight semibold for compact UI card titles.** Two roles, not a drift. The one debatable boundary is `home-proof`'s three closing claims (sans, bare columns under a rule) vs `home-trust`'s cards (serif, elevated white cards) — different containers, and I'd leave it.
- **Article H2 32px vs trailing module H2 36px on the same blog page.** The article H2 lives in a ~630px column and the module H2 in the 1160px wrap, so the article heading reads _larger_ relative to its measure. Keep.
- **`/candidates/start` (light card, sentence-case labels) vs `/contact` (dark card, mono labels).** Deliberate candidate-vs-client register. Keep the divergence; fix only the contrast inside each.
- **Amber `#e8a33d` as a third semantic for "relatively weaker"** (`.lt.low b`, :2590‑2) reads consistently on `/` and `/candidates`. Keep.
- **Legal pages with no eyebrow and no hero band** while marketing pages have both — correct for `/privacy`, `/security`, `/terms`.
- **Mono for all metadata, uppercase with wide tracking** — distinctive and consistent. The problem is size (P1‑C) and contrast (P1‑B, P2‑E), not the choice.

# Not counted as findings — verify before acting

- **`/intelligence` "Standard" row count label at 390** (`intelligence-availability-390`) appears cut at the right edge while the other three bands' labels sit inboard. My crop is 375px against a 390px viewport and the census reports no true visible-text clipping site-wide, so I cannot separate a crop boundary from a real overflow. Check the live 390 render.
- **`/contact` FAQ "+" icons** render one grey among five red, at a _different_ row at 390 than at 1520 — almost certainly a transition artefact of the capture, not a style. Ignoring.
- **Census attributes 14px rgb(170,169,162) to `/careers` card copy**, but `careers-roles-1520` shows that copy at full contrast. One of the two is sampling a different element. I grounded P2‑E on the career-detail caption, which I can see directly at both widths.
- I did not open a `/404` capture; P3‑L is derived from census numbers plus two stylesheets only.
