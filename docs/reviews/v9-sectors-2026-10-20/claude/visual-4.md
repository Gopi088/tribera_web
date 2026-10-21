## Stage 1 — Desktop layout review (1366px, full-page)

**Images read:**

- `artifacts/v9-sectors/reference/industries-product-saas-1366.png` (1366×6618)
- `artifacts/v9-sectors/chromium/industries-product-saas-1366.png` (1366×6643)
- `artifacts/v9-sectors/reference/intelligence-1366.png` (1366×5228)
- `artifacts/v9-sectors/chromium/intelligence-1366.png` (1366×5344)

**Resolution note:** Both images were downscaled ~2.6–3.3x for display (e.g., 523→2000px wide). I did not attempt to read fine print beyond what's legibly resolvable at that scale; any text-level claims below are limited to clearly legible headline/stat copy.

### industries-product-saas

Section-by-section, both captures contain the same components in the same order and comparable spacing: hero + score-bar panel, dark "26%" stat band with comparison chart, "Three things a CV can't tell you" (3 items), "Three questions" panel, dark roles/guarantee band, FAQ band, CTA band, sources line, footer. No missing sections, no missing illustrations/chart elements in the candidate.

- **Confirmed intentional diff (FAQ):** Reference shows all 3 FAQ answers expanded (visible "−" state with answer copy); candidate shows only the first expanded, remaining two collapsed with "+". This matches the documented/expected reference-vs-candidate FAQ capture convention, not a defect.
- Candidate total page height (6643px) vs reference (6618px) is a ~25px difference, consistent with the FAQ expansion difference, not a layout regression.
- Chart panel, score bars, and dark stat sections are visually matched in structure and proportion between both.
- No cropped/missing illustrations observed.

**Verdict for this route (Stage 1 only): no defects found** — layout, section completeness, chart presence, and spacing match within the documented intentional differences.

### intelligence

Both captures contain the same sections in the same order: hero + "the market, sources" panel, dark function-picker/chart band, "Four numbers behind the market" (4 stat cards), "The demand is real" stat strip, dark "method" 4-column band, newsletter CTA band, sources list, footer.

- **Confirmed intentional diffs**, matching the review doc's documented sample/delivery boundary (doc lines 14, 18, 20):
  - Candidate section eyebrow adds "· ILLUSTRATIVE PREVIEW" and the chart card adds an "ILLUSTRATIVE · SAMPLE DATA" badge plus a note: "Illustrative preview for Q4 2026. No measured cohort, collection dates or sample size are available for this demonstration." Reference has neither.
  - Candidate newsletter block adds: "Subscription is unavailable in this private preview. Quarterly email delivery will be completed separately." Reference has no such note.
- These two additions account for the candidate's extra height (5344 vs 5228px) and are explicitly called out as required/expected in the review doc, not defects.
- All four stat cards, the demand-squeeze strip, the method 4-column band, and the chart's bar values/highlighted row ("Systems design," 28%) match between reference and candidate in position, value, and emphasis.
- No missing illustrations, no broken chart rendering, no truncated sections observed in the candidate.

**Verdict for this route (Stage 1 only): no defects found** — all differences observed are the documented sample-data/delivery notices, not implementation gaps.

---

**Stage 1 summary (2 routes only):** ACCEPT for desktop layout/section-completeness/chart-presence/spacing on `industries-product-saas` and `intelligence`. No confirmed defects. All observed differences from reference map directly to the documented, intentional boundaries (FAQ expansion state, sample-data/illustrative labeling, unavailable-subscription notice).

This covers only the 2 routes and Stage 1 (desktop) as requested — not the other 12 sector pages, not mobile widths, not animation/interaction behavior, and not a release-acceptance verdict. Let me know if you want me to continue to the remaining sector routes or into Stage 2 (mobile/interaction) checks.
