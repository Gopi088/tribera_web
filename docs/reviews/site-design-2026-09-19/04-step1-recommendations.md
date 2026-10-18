## What I inspected

`docs/reviews/site-design-2026-09-19/README.md`; `src/components/home/v126/sample.css` (4716 lines, read through the footer block); `src/components/home/v126/sections/funnel.html`; `src/components/standalone/SharedNavFrame.astro`; `src/components/standalone/StandaloneNavScripts.astro`; `src/components/widgets/Footer.astro`; `src/pages/careers/[slug].astro` (token block + funnel/lab/footer CSS); `src/components/v58/EditorialPage.astro`. `src/styles/tailwind.css` does not exist — the tokens that matter are the three page-local sets below. Contrast figures are my sRGB/WCAG computations from the source colors (alpha composited against the actual painted surface); they reproduce the README's measured values (2.81, 2.87, 3.65, ~4.12), which is a good cross-check.

## The one trap to avoid

Two "faint" tokens are used on **both** light and dark surfaces. Darkening either globally fixes the light cases and breaks the dark ones:

| Token                             | Light use (fails)                              | Dark use (currently fine)                                                            |
| --------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| `--ink-3: #9a998f` (sample.css:8) | `.eyebrow` etc. on white/paper — **2.87:1**    | `.ft`, `.ft-tribe`, `.ft-bar` on `#121212` — **6.6:1** (sample.css:1902, 1949, 2030) |
| `--faint: #9c9c97` (careers:41)   | `.eyebrow`, `.gz__k`, `.xp span`… — **2.76:1** | `.ft__tribe` on `#131313` — **6.7:1** (careers:4033)                                 |

So: add a second light-surface token rather than editing `--ink-3`, and if you do edit `--faint`, add a one-line override for `.ft__tribe`.

Conversely, `--pw2` (sample.css:12) and `--onc3` (careers:45) are **dark-only** in these files, so they can be raised at the token.

---

## Step 1 — concrete fixes

### 1. Home light-surface labels (`sample.css`)

Add to the token block (after line 8), keep `--ink-3` unchanged:

```css
--ink-3-strong: #6b6a61; /* 5.44:1 on #fff, 4.70:1 on --paper #f1eee7 */
```

Swap `var(--ink-3)` → `var(--ink-3-strong)` **only** at these light-surface selectors:
`.eyebrow` (147) · `.hero .micro` (338) · `.card-hd .t` (390) · `.cand .meta` (434) · `.card-ft` (463) · `.barcard .lbl` (532) · `.figbox .lbl` (601) · `.figbox .cap` (616) · `.way .tag` (1045) · `.flow .who.yours` / `.who.ours` (753, 756) · `.refs` (1182) · `.xp span` (2173) · `.inds-k` (2208) · `.hero-bar-cap` (2839) · `.hero-card .hc-hd` (2863) · `.hc-sc` (2887) · `.hc-ft` (2903).

Leave on `--ink-3` (decorative / large / dark): `.figbox .old .num` (70px faded figure), `.clients .and`, `.flow-arrow path` stroke, `.ft`, `.ft-tribe`, `.ft-bar`.

Size floor for meaningful mono labels — raise the sub-10px ones only:
`.flow .who` `0.6rem → 0.68rem`; `.figbox .lbl` `0.62 → 0.68rem`; `.way .tag` `0.62 → 0.68rem`; `.inds-k` `0.62 → 0.68rem`; `.hero-card .hc-hd` `0.58 → 0.66rem`. Tracking and uppercase stay.

### 2. Home dark-surface labels (`sample.css`) — covers proof labels, ownership chips, home footer

```css
--pw2: rgba(255, 255, 255, 0.58); /* was 0.42 — 6.8:1 on #121212, 6.0:1 on #232320 */
--pw-quiet: rgba(255, 255, 255, 0.42);
```

Then reapply `--pw-quiet` to the three genuinely decorative axis keys so the chart hierarchy is unchanged: `.dp-scale-k` (1731), `.verd-ax` (2551), `.dp-hd`'s sibling scale text. Everything else improves in place, which resolves:

- **Proof labels** (`#proof`, `#0b0b0b`/`#121212`): `.proof-checks p` **4.17 → 6.8:1**; `.lab .hd .tag`, `.lab-hint`, `.vtotal`, `.rows-ft`, `.verd-sub`.
- **Home footer**: `.ft-ttl` **4.12 → 6.8:1**, `.ft-line` **4.17 → 6.8:1**, `.ft-up`.
- **Funnel**: `.field__hd`, `.fnl-step .d`, `.fnl-gap`, `.fnl-math`, `.case-meta`.

Sizes, same block: `.ft-ttl` `0.6rem → 0.7rem` (9.6 → 11.2px); `.lab .hd .tag` `0.6 → 0.68rem`; `.lab-hint` `0.64 → 0.7rem`; `.mh` `0.58 → 0.66rem`.

`.mh` is an interactive toggle whose resting border is `--line-d` = `rgba(255,255,255,0.11)` ≈ **1.1:1** against the `#0b0b0b` panel — below the 3:1 non-text minimum. Set `.mh { border-color: rgba(255,255,255,0.32); }` (3.0:1). The pressed state (`#fff` on `--red`) is 4.8:1 and needs no change.

**Ownership chips** (`funnel.html` lines 147–171, CSS at sample.css:1442–1455). Contrast is already fine (`.own` ≈ 7.5:1, `.own--you` `#ff7a7d` on the red wash ≈ 6.3:1) — the defect is size only:

```css
.own {
  font-size: 0.66rem;
} /* was 0.54rem = 8.64px → 10.56px */
```

Keep both backgrounds and `#ff7a7d`; that red-on-dark tint is the contextual surface to preserve.

### 3. Shared navbar inactive audience switch (`SharedNavFrame.astro`)

`#nav .nav__sw a { color: #8d8c83 }` on the `#eceae4` track = **2.81:1** at 12.5px. The declaration appears **twice** — lines ~140 and ~223 — change both:

```css
#nav .nav__sw a {
  color: #63625a !important;
} /* 5.09:1 on #eceae4 */
```

Nothing else moves: items, order, wordmark, Coverage dropdown, login, CTA, mobile menu, the 30/26px pill geometry, the `#fff` + `#131313` active pill, hover-to-`#131313`, and the `<390px` hide all stay. `StandaloneNavScripts.astro`'s `--onc2, #9b9b95` rules for `.nav__l`/`.dd__t` are already overridden to `#131313` by `#nav` specificity — leave them for the cleanup pass, don't touch them here.

### 4. Career JD note and career detail labels (`careers/[slug].astro`)

```css
--faint: #6b6b66; /* was #9c9c97 — 5.36:1 on #fff, 4.78:1 on --paper, 4.58:1 on --warm */
--onc3: #8a8a83; /* was #6e6e68 — 5.35:1 on --char #131313 */
```

`--faint` is light-surface everywhere **except** `.ft__tribe`, so add exactly one override:

```css
.ft__tribe {
  color: var(--onc3);
} /* keeps ~5.3:1 instead of dropping to 3.5:1 */
```

Before shipping, confirm no dark band renders an un-overridden `.eyebrow` — `.hero`, `.fn`, `.buy` override to `--onc3`; `.lab`, `.trust`, `.deal`, `.cand` override to `--red`.

`--onc3 → #8a8a83` fixes the JD-side dark copy in one line: `.field__ft`, `.step__d`, `.fn__math`, `.cmp__l`, `.cmp__ft`, `.trust__ft`, `.pledge2__s`, `.verd__note`, `.rows__ft` (all **3.32 → 5.35:1**). `--onc2 #9b9b95` stays at 6.6:1, so the two dark greys remain distinguishable.

Career ownership chips and 8.5–9px labels:

```css
.own {
  font-size: 10.5px;
} /* was 8.5px; color now --onc3 = 5.3:1 */
.own--you {
  color: var(--red-on-dark);
} /* keep the rgba(218,0,7,0.45) border */
.step__gap,
.cmp__stop,
.cg__w,
.ratio__k,
.ratio__ft {
  font-size: 10.5px;
}
```

### 5. Footer text — and one structural note

`.ft__ttl` is `var(--red)` at 10px on `--char`: **3.89:1** (3.55:1 on the lighter `#1c1c1b` band the README sampled). Keep brand red for CTAs, bars, rules and dots; add a dark-surface tint used **only** for small text on dark:

```css
--red-on-dark: #ff6b6f; /* 6.71:1 on #131313 */
.ft__ttl {
  color: var(--red-on-dark);
  font-size: 11px;
}
```

`.ft__line` (14.5px) and `.ft__bar` (12.5px) are fixed by the `--onc3` change (**3.67 → 5.35:1**).

Important: `Footer.astro` ships markup only — the `.ft__*` rules live page-local (e.g. `careers/[slug].astro:3991–4124`). Verify each route template carries its own copy; in Step 1 patch the copies, and hoist them into a `SharedFooterStyles.astro` (mirroring `SharedNavFrame.astro`) during the P2 footer unification rather than now.

### Result

| Target                             | Before                | After                       |
| ---------------------------------- | --------------------- | --------------------------- |
| Home eyebrow / small light labels  | 2.87:1 @ 11.2px       | 5.44:1 (4.70:1 on paper)    |
| Career JD note / light mono labels | 2.76:1                | 5.36:1 (4.58:1 on warm)     |
| Navbar inactive audience switch    | 2.81:1 @ 12.5px       | 5.09:1                      |
| Home footer column headings        | ~4.12:1 @ 9.6px       | 6.8:1 @ 11.2px              |
| Shared footer red headings         | 3.55–3.89:1 @ 10–12px | 6.71:1 @ 11px               |
| Shared footer muted prose          | 3.65:1 @ 14.5px       | 5.35:1                      |
| Proof labels on dark               | 4.17:1                | 6.8:1                       |
| Ownership chips                    | 8.5–8.64px            | 10.5px (contrast unchanged) |

---

## Sequence for the remaining confirmed findings

1. **Step 1 (above)** — muted-text contrast and tiny meaningful labels. Lowest blast radius, no layout or structural change; do it first so later reviews are read against a readable baseline.
2. **P2 — unify the two footers.** Pick the shared `.ft__*` implementation, hoist its CSS to one component, reconcile branding (`tribera™` vs `tribera.`), the hiring link set, the DPA link and the city line against approved copy, and make the home anchors absolute (`/#work`, `/#proof`, `/#ways`) so they resolve from every route. Carries Step 1's values forward, so ordering it second avoids fixing the same labels twice.
3. **P2 — `TopicIndex` title→lead margin.** Add the missing margin to the H1/`.hero__p` pair; the class and 18px size are already correct, so it is a spacing rule only. One template, 27 archive routes.
4. **P2 — active tag vs category labelling.** Prefix or separate the active chip ("Tag: Technical Hiring") while keeping `/category/*` and `/tag/*` as distinct destinations with distinct filtering. Do this after 3 so both archive changes are verified in one pass.
5. **P2 — specialist intro measure.** Remove the inline `max-width:none` on the `.shead` paragraph in `functions/[slug].astro` and `industries/[slug].astro`; leave wide charts, comparison tables and heading layout alone. 20 routes.
6. **P3 — Blog active state.** Extend the `markPage('.nav__l[href="/blog"]', …)` match in `StandaloneNavScripts.astro:449` to include `/category/*` and `/tag/*`. Navbar items and destinations unchanged. Order after 4 so the taxonomy work lands together.
7. **P3 — neutral palette and container model.** Agree shared roles for `#f1eee7` vs `#f4f3f0` and for the 1160px/72px wrap vs the editorial column. Largest visual blast radius, least urgent — last.
8. **Type-role decision** (not a defect, needs a call): resolve H3 by component role — display serif for editorial/story card titles, UI family for compact interactive panels and form sections — and define one readable page-kicker role plus a separate red accent-kicker role. Decide before 7 so the palette work encodes it.
9. **Re-capture** the 228 checks at 390/1520/1920 with reduced motion and re-sample the contrast pairs listed above.

## Differences to preserve through all of the above

Navbar items, wordmark, audience switch, Coverage dropdown, login, CTA and mobile menu exactly as restored (Step 1 changes one inactive colour value, nothing else). Serif display vs UI/mono roles. Data layout: scorecards, funnel grids, rubric rows, chart axes and the `#da0007` brand red on light surfaces. Contextual surfaces: dark article/career heroes, the `#ff7a7d` / `rgba(218,0,7,0.2)` chip wash, `.own--you` red identity, the faded `.figbox .old .num`, dim/`out` square states, masked marquees. Homepage's larger display scale and spacious hero; narrower article/legal measures and relaxed leading; form labels, helper text and disabled states as separate roles; the simple 404.

**Caveats.** Read-only — no files were modified. Contrast numbers are computed from source colours against the surface each label actually paints on, not sampled from renders; `.ft__ttl`'s 3.55:1 in the README implies the sampled route's footer sits on a lighter band (`#1c1c1b`) than `careers/[slug].astro`'s `--char`, so confirm the footer background per template before finalising the red tint. Sizes in `rem` assume the 16px root these pages set. I read the `.ft__*` block in `careers/[slug].astro` only; whether every other route template duplicates it is unverified and should be checked before step 2. I did not read `TopicIndex.astro`, `HeroFilters.astro`, or the `functions`/`industries` templates, so items 3–5 restate the README's findings rather than independently confirming them.
