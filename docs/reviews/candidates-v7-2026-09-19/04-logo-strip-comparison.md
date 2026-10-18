I have enough to answer.

## Verdict: HYBRID

**Keep**: light hero placement, position above the score section, and "Teams hiring through us" label — these are correct for page context.

**Align**: typography scale, color contrast, and separator treatment toward the homepage's system, but don't literally copy the dark section-breaker.

### Why not MATCH HOME outright

The homepage's charcoal "Mandates run for" strip is a **section-breaker** — a full-bleed dark slab that punctuates the transition from a light hero into the rest of the page. It works there because the _next_ section is also light, so the dark strip is the seam.

On the candidate page, the very next section (`#score`) is already dark (`.lab`, `--char`). Inserting another dark full-width slab between a light hero and a dark section would stack two dark blocks with a thin light hero sandwiched oddly, and the transition read (light → dark) would happen twice in quick succession — a real hierarchy/rhythm problem, not just a style mismatch. Keeping the strip light, nested at the bottom of the hero, is the correct call: it lets the hero end on a soft note and the dark score section arrive as one clean, intentional cut.

### Why not KEEP fully as-is

The current candidate treatment (`.logos__tk span`, 14.5px, `#5C5C57` on `--white`) reads as an afterthought — it's low-contrast, unlabeled by separators, and visually thinner than everything else in the hero (60px+ Fraunces headline, bold CTAs). Given both strips list identical companies and serve the identical trust-signal job ("real companies use this"), the size/weight/color mismatch isn't a deliberate design choice tied to page context — it looks like an inherited artifact from the supplied sample template that was never reconciled with the redesigned homepage system. That's a **defect** (inconsistent execution of the same content pattern), not intentional differentiation.

### Concrete recommendation

- **Container**: keep it inside the light hero, bottom-anchored above the border, not full-bleed dark.
- **Label**: keep "Teams hiring through us" — correct audience-specific phrasing (candidate, not client-mandate framing).
- **Size/weight**: bump names from 14.5px to something closer to 1.15–1.6rem clamp (matching `.clients` on homepage's non-marquee variant), Fraunces 500, so it doesn't feel like fine print next to a 60px+ h1.
- **Color**: darken from `#5C5C57` to `--ink`/`--ink-2` (`#131313`/`#57565B`) for real hierarchy against `--white`, not a washed-out grey-on-white.
- **Separators**: add the red `·` dot between names (`--red`), matching homepage's `.d`/`.dot` treatment — this is a near-zero-cost brand touchpoint currently missing.
- **Spacing**: increase `gap` slightly (34px → ~40–48px) to match the larger type.

This keeps the two strips feeling like the same design system applied contextually, rather than either identical components or two unrelated ones — reducing "templated" risk while fixing the actual inconsistency (weak type/color/no separators), which is the defect worth flagging to design/eng regardless of the MATCH-vs-DISTINCT debate.
