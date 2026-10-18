**PASS**

Measured facts:

- Diff removes `max-width:none` from exactly 6 intro paragraphs per template (5 `.dek` + 1 `.trust__dek`) in both `functions/[slug].astro` and `industries/[slug].astro`. Nothing else changes; `--d` delays and `data-rv` are preserved.
- Removing the inline override re-exposes two cascading constraints in `EditorialPage.astro`: the shared subtitle role (`max-width: var(--type-subtitle-measure)`, line 202) and the section-head child cap `max-width: 60ch` (line 218). The narrower of the two wins per context; both are role-level, so measure is now shared rather than per-instance.
- `h2 .h2` keeps its own inline `max-width:none` in every hunk, so headings are untouched — consistent with the stated scope (cards, charts, tables, closing CTA outside `.shead`, and `section.close` exclusions at line 208/214 all unaffected).
- 1520px screenshot: dek wraps to 2 lines, ending well short of the h2's right edge; the dek block is visibly narrower than the heading. 390px: dek runs to 4 lines at near-full container width; the 60ch/62ch caps are inert at that viewport, so mobile is unchanged.

Judgment: hierarchy improves — the shorter dek measure now sits under a wider heading, reinforcing heading-then-supporting-text order rather than competing full-bleed blocks. No orphan or awkward rag visible at either width. No legal-copy change present, as stated.
