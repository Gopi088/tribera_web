## Step 1 — verdict: **PASS** (3 follow-ups, no rollbacks)

### What the evidence confirms

**1. Dark-surface opacity `.42 → .58` — real, measured, and the biggest win.**
`measurements.json` shows every sampled `.side-k`, `.eyebrow` (dark), `.verd-ax` at `rgba(255,255,255,0.58)`. Computed against the `#131313` surface: **4.07:1 → 6.79:1**. That moves the whole dark-label layer from below AA to comfortably above it. Visible in `home-proof-390.png` / `home-funnel-390.png`: "OPTIONAL — OR NUDGE ANY SINGLE WEIGHT", "ALL OF THIS BEFORE THE TEAM SAW A SINGLE NAME" now read as text, not texture.

**2. The "selective" claim holds — I checked the surface behind every recolored class I could reach.**
`--ink-3-strong: #6b6a61` was only applied to elements sitting on white: `.hero-card` (`background:#fff`, sample.css:2849), `.ho-you` (:3351), `.way` (:1031), `.card` (:372), `.flow .step` (:712), `.ratio-*` (light). The dark twins kept `--pw2`: `.ho-engine .ho-k` (:3362), `.flow .step.s-ours .who` (:744 — 5-class specificity, still beats the 4-class `.flow .who.ours` at :756). Strongest proof is empirical: the same `.eyebrow` selector measures `rgb(107,106,97)` on light sections ("\ What this is") and `rgba(255,255,255,0.58)` on dark ones ("\ How it works"). **No dark-surface element received the dark grey.** That was the main risk of this approach and it was avoided.

**3. Navbar `#8d8c83 → #63625a`, inactive only.** Measured `.nav__sw a:not(.is)` = `rgb(99,98,90)` @12.5px on every route sampled (home, careers, about, archive, category, 1920). **3.38:1 → 6.04:1** on white. Active/inactive distinction survives (`home-hero-390.png`: "I'm hiring" on a white pill still reads as selected) — but the gap is now weight/background, not colour. If anyone objects, add weight; don't lighten it back.

**4. JD note is genuinely targeted.** `.jd__note` measures `rgb(107,106,97)` @14px, `max-width:352px` (`career-note-390.png`, bottom line). ~5.3:1 on the paper background. Surrounding career faint tokens (`.shead .dek` = `rgb(87,86,91)`, eyebrows = `rgb(218,0,7)`) are untouched — the "no global career token change" claim checks out.

**5. Shared footer tint resists page CSS.** `#9a9992` on `.ft__line`/`.ft__bar` and `#ff6b6f` on `.ft__ttl` render identically on `/careers/talent-associate/`, `/about/`, `/tag/…`, `/category/…`, at both 390 and 1920. ~6.2:1 and ~6.4:1 on the footer surface. The `:root body footer.ft` ladder won everywhere it was measured.

**6. No layout cost.** `pageOverflow: false` on every entry I sampled. The 11px floor makes labels reflow rather than clip — `.side-k` "His scores · out of 5 · these don't move" is `height: 33` (two lines at 390), not truncated. The apparent cut-off in `home-proof-390.png` is the sticky navbar overlaying the capture, not a clip.

### Follow-ups (none block Step 1)

- **Residual sub-11px off-home:** `.own` "under 2 today" measures **8.5px** on `/about/` at both 390 and 1920. Correctly out of the declared scope, but it's the one label still under the floor — put it on the Step 3 list.
- **Truncation headroom shrank:** `.lt i` / `.tl i` went `0.61/0.65rem → 0.6875rem` while keeping `white-space:nowrap; overflow:hidden`. All nine score labels still render fully at 390 ("Cloud runtime", "Authenticity"), so no defect — but there's now ~13% less slack for longer copy.
- **Micro-hierarchy flattened:** ~60 declarations spanning `0.54rem`–`0.68rem` all collapse to exactly 11px, so `.own` chips now match row labels in size (`home-funnel-390.png`: "TRIBERA" / "THEIR FIRST HOUR" chips). Legible, but the size ladder is gone. Accept deliberately or reintroduce 2 steps (11px floor / 12px emphasis) later.

---

## Step 2 — footer unification

The two footers are structurally parallel but share nothing: home uses `.ft-*`, shared uses `.ft__*`. That's why the Step 1 global block correctly did _not_ touch home. Unify on the **shared `.ft__*` names** — `.ft-*` collides with the `:is(.v126-home, .v126-footer, .v126-header) .ft-*` rules in `sample.css`.

**Content to carry over from `footer.html` into `Footer.astro`:**

- Copy: `<b>Hiring you can prove.</b> The AI reads the interview, a senior expert reads the person…`
- IA: For hiring teams → How it works / In practice / Results / How we work / What we cover (replaces The bar / How decisions are made / Ways to work with us / Industries / Functions)
- Legal → add **Request a DPA**; cities → **Pune · Bengaluru · New Jersey**; add **Back to top ↑**

**Keep from the current shared component:**

- `tribera<i>.</i>` wordmark with `data-astro-reload` — drop home's `<sup>™</sup>`, per your earlier navbar decision.
- **Dynamic year.** `footer.html:49` hardcodes `© 2026`; `Footer.astro:2` already computes it. Non-negotiable carry-over.

**Two correctness items:**

- **Absolute anchors.** Home's `#proof`, `#funnel`, `#results`, `#ways`, `#experts` are page-relative and will dead-end on `/about`, `/careers`, `/blog`. Rewrite to `/#proof` etc.
- **Back-to-top target.** `href="#top"` needs an `id="top"` on every layout, or it's a no-op off home. Either add it in the shared Layout or use a scroll handler.

**Styling isolation** — extend what already proved itself: keep `is:global`, keep the `body footer.ft …` ladder (measured winning on 6 routes), but declare every `.ft__*` property explicitly — `color`, `font-family`, `font-size`, `line-height`, `letter-spacing`, `text-transform`, `text-decoration` — with literal values, never `var(--faint)` / `var(--ink-3)` / `var(--pw2)`. Add `isolation: isolate` on `footer.ft`. Then retire the Step 1 patch block so footer colour has exactly one source.

**2-column mobile links.** `home-footer-390.png` pairs For hiring teams │ For candidates and Company │ Legal; `about-footer-390.png` is a single stacked column and noticeably taller. Port it: at ≤640px, `.ft__top { grid-template-columns: 1fr 1fr }` with `.ft__brand { grid-column: 1 / -1 }`.

**Leave the navbar alone** — `SharedNavFrame.astro` items and the `#63625a` inactive state are settled; don't reopen them in a footer change.

**Verify after:** re-shoot `/about`, `/careers/*`, `/blog`, `/tag/*`, `/category/*` footers at 390 + 1520, re-run measurements, and diff on three things — `.ft__*` colours unchanged from Step 1 values, the cities line reading three cities everywhere, and `pageOverflow: false` holding at 390 with the new 2-column grid.
