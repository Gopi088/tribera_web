# Independent Claude Review

Corrected role-based review. Standalone pages retain a 16px root because they do not load the main-layout root override; .site-editorial itself does not set the root.

I don't have file-write access in this session, so I can't update the report file directly. Here are the corrected findings and recommendation — you can paste this over `/tmp/tribera-heading-claude-articles.txt`.

## Findings: heading/subtitle hierarchy for the two article pages (CORRECTED)

### Correction: the 48/30 rule is NOT shadowed — it's the same rule, different root font-size

The prior report claimed the marketing-section "48px desktop / 30px mobile" H2 was a separate, shadowed rule that doesn't govern the article pages. That's wrong.

Confirmed measurements: both articles' body H2 = 48/32; Home.astro's section H2 = 48/30; both use the **same** `clamp(2rem, 3.9vw, 3rem)`. At mobile widths this clamp bottoms out at its `2rem` minimum, so the rendered size is just `2 × root-font-size`. `CustomStyles.astro:220-224` sets `html { font-size: 93.75% }` (15px root) under `@media (max-width: 640px)` in the main Layout that Home.astro uses directly → 2rem = 30px. The standalone articles render inside `.site-editorial`, whose scope keeps the root at 16px → 2rem = 32px. So 48/32 vs 48/30 is a **1px root-font-size artifact of one shared rule**, not two competing type systems — the "shadowed CSS" explanation for this number should be discarded. (The unrelated finding that each blog page carries a dead local `.h2` (Figtree/700) block that never wins against `.site-editorial` still stands and is unaffected.)

### Does the uniform article-body/related/CTA H2 produce good hierarchy?

Internal consistency across body/related/CTA H2 is real, but it's not the same as good hierarchy:

- **Desktop:** H1 53.12 vs H2 48 → ~9.6% gap — workable but modest.
- **Mobile: H1 33.28 vs H2 32 → only ~4% gap (1.28px).** H1 appears once per page; H2 recurs repeatedly (every body section, plus related/CTA). A one-time page title barely distinguishable in size from a heading repeated 4-8+ times flattens the page outline, especially on mobile where readers scan by size.

Against the proposed role-based alternative (article-body H2 28-32 desktop / 24-26 mobile, 1.2 line-height; marketing-section 36 desktop / 28 mobile, 1.15):
- Desktop H1-to-body-H2 gap becomes 21-25px (40-47%).
- Mobile gap becomes 7-9px (24-28%), clearly perceivable vs. the current ~4%.

That's a genuine improvement for in-body subheads. But applying role-based sizing uniformly to *all three* contexts isn't obviously right either — related-articles and CTA headers are discrete UI modules, not sequential prose, so they don't need to defer to the article's H1 the way body subheads do. The marketing-section scale (36/28) is arguably the better fit for them.

### Recommendation

Don't keep "uniform H2 everywhere" just because it's currently consistent, and don't apply one flat role-based number everywhere either. A three-tier treatment is more defensible:

1. **H1**: 53.12/33.28 — leave as is.
2. **In-body content subheads** (`article.art h2`): shrink to ~28-32 desktop / 24-26 mobile, line-height ~1.2 — restores a real gap from H1, especially on mobile where it's currently only ~4%.
3. **Related-articles / CTA headers**: keep near the marketing-section scale (36/28, ~1.15) rather than matching body subheads — they're module headers, not article content.

Separately, still worth doing regardless: remove the dead per-page `.h2` (Figtree/700) block since it's unreachable and a specificity trap.
