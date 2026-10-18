# Independent Claude Review

Raw review, not an approved fix list. Intelligence root-cause, Services pass, trust subtitle-size and mobile job-title hierarchy claims are contradicted by measurements. See corrections in the main review.

## Heading/Subtitle Audit — 8 Templates

**Scope caveat:** read-only, based on the provided rendered-text dumps + listed desktop crops only. I did not visually review every sibling page in each template family — dispositions for "shared template" routes are inferred from the one or two samples read here, not exhaustively verified.

### Priority findings

**1. `/intelligence/` — H2 mobile size regression (real bug, needs fix)**
At 390px, every H2 on this page (`#fail`, `#avail`, `#method`, `#contact`) renders at **30px**, while the identical `h2.h2` component renders **32px** at 390px on Services, Contact, Careers/talent-associate, Functions/data-analytics, and Industries/banking. At 768px+ intelligence.astro's H2 correctly jumps to 32px/48px, matching everyone else — the divergence is mobile-only.
Root cause: `src/pages/intelligence.astro` still carries a legacy, page-local `.h2 { font-weight:700; font-size: clamp(30px, 4.2vw, 54px); }` block (~line 188) left over from a prior design pass, alongside the shared `EditorialPage.astro` `.h2` rule (`clamp(2rem, 3.9vw, 3rem)`, weight 500). Font-family/weight observed in the audit (Fraunces, 500) match the shared rule, but font-size at the small breakpoint matches the legacy block's 30px floor — i.e. two competing `.h2` rules are splitting property ownership rather than one cleanly winning. This needs an engineer to check in devtools, not just source order — I can't confirm the exact cascade mechanism from static analysis.
**Recommend:** delete/reconcile the legacy `.h1/.h2/.h3/.dek` block in `intelligence.astro` (lines ~180–216) so the page relies solely on `EditorialPage.astro`'s shared H2 scale. **Does not appear to affect other pages** — Services/Contact/Functions/Industries all show the correct 32px floor, so this is local to intelligence.astro's own `<style>` block, not a shared-component defect.

**2. `/category/candidate-experience/` — H1 → H3 heading-level skip (low priority, likely by design)**
The page has an H1 ("Candidate Experience") and a subtitle (`hero__p`), then jumps straight to H3 for each `EntryCard` title — no H2 in between. This is a common, acceptable pattern for flat card-grid taxonomy pages (visual hierarchy via type scale rather than strict semantic nesting), but flagging for awareness since the user wants consistent hierarchy. Low a11y priority; not a visual defect.

**3. `/contact/` — minor grey-value inconsistency on `.dek` (cosmetic only, not worth prioritizing)**
`p.dek` under `#write` and `#offices` renders `rgb(75,75,71)`, while `#after` and `#contact` use `rgb(87,86,91)` for the same semantic role (section subtitle). Values are close enough to be visually indistinguishable; not recommending an active fix, just noting for whoever eventually normalizes design tokens.

### Confirmed correct (no action)

- **`.dek` / `.fn__dek` / `.trust__dek` / `.hero__p` / `.jd__lead`** are consistently the true section/hero subtitles across all 8 routes: 16px/24.8px mobile → 16.72px/25.916px desktop (Fraunces H-adjacent grey body type), always paired directly under an H1/H2.
- **Services' `.lead__n` (24px Fraunces card titles) and `.oc__lead`/`.lead__give/get/why` (14–14.4px card copy)** are correctly card-internal microcopy, not page subtitles — matches the user's flagged example exactly. Same pattern holds for Functions/Industries card grids.
- **48px section H2 vs 53/58/62px hero H1** scale is intentional and consistent within each template family:
  - Marketing hero family (Services, Intelligence, Contact): H1 36px→62px, H2 32px→48px (except the Intelligence mobile bug above).
  - Vertical pages (Functions/data-analytics, Industries/banking — only these two sampled): H1 33.28px→53.12px, H2 32px→48px. Consistent between the two, but not verified across the rest of that family.
  - JD/career detail (`careers/talent-associate`): distinct bespoke hero (H1 32px→58px, weight 800, white-on-dark), but still strictly larger than its own H2 (48px desktop) — hierarchy intact, difference is an intentional template variant, not a bug.
  - Doc/legal template (`privacy`) and category/taxonomy H1 (`category/candidate-experience`) share the same smaller H1 clamp (31.2/34.4/53.12) via a simpler `EditorialHeading` component — expected, distinct from the hero-card marketing H1.
- **Doc H2 scale (privacy, max 32px) vs marketing H2 scale (max 48px)** is the accepted document/marketing split described in your brief, and the 22.5px vs 24px mobile/tablet difference is exactly the root-15px vs root-16px effect you already identified — not a new issue.
- Two apparent "missing space" artifacts in the raw text dumps — `wronghire`/`morethan` (industries/banking) and `you'restuck` (contact) — were visually verified via the desktop crops: both render with correct spacing and intentional bold-red emphasis line breaks. These are text-extraction line-join artifacts, not real bugs.

### Route dispositions

| Route | Disposition |
|---|---|
| `/services/` | Retain — hierarchy and subtitle/card-lead distinction correct at all breakpoints. |
| `/intelligence/` | **Fix** — remove legacy local `.h2` override causing 30px vs 32px mobile H2. |
| `/contact/` | Retain — optional cosmetic grey normalization on `.dek`, not urgent. |
| `/careers/talent-associate/` | Retain — distinct JD template, internally consistent, hierarchy intact. |
| `/functions/data-analytics/` | Retain (sample only) — matches shared vertical-page pattern. |
| `/industries/banking-financial-services/` | Retain (sample only) — matches shared vertical-page pattern; likely applies to sibling function/industry pages but not individually confirmed. |
| `/privacy/` | Retain — doc template scale behaving as designed. |
| `/category/candidate-experience/` | Retain, with low-priority note on H1→H3 skip; likely applies to other `/category/*` and taxonomy pages via shared `TopicIndex`/`EntryCard`, not individually confirmed. |
