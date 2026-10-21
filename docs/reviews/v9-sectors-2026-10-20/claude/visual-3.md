## Stage 1 findings — desktop (1366px) full-page comparison

**Images actually read** (all at native 1366px-wide full-page captures):

- `artifacts/v9-sectors/reference/industries-industrial-engineering-1366.png` (1366×6507) vs `artifacts/v9-sectors/chromium/industries-industrial-engineering-1366.png` (1366×6538)
- `artifacts/v9-sectors/reference/industries-manufacturing-1366.png` (1366×6555) vs `artifacts/v9-sectors/chromium/industries-manufacturing-1366.png` (1366×6587)
- `artifacts/v9-sectors/reference/industries-pharmaceutical-1366.png` (1366×6645) vs `artifacts/v9-sectors/chromium/industries-pharmaceutical-1366.png` (1366×6682)
- `artifacts/v9-sectors/reference/industries-private-equity-portfolio-1366.png` (1366×6624) vs `artifacts/v9-sectors/chromium/industries-private-equity-portfolio-1366.png` (1366×6656)

### Per-route verdict

**industries-industrial-engineering — ACCEPT (Stage 1 only)**
All sections present and in matching order: hero (headline, dek, CTAs, market stat, hero bar chart), dark "24%" stat/compare chart section, "Three things a CV can't tell you" triptych, "What we actually ask" Q&A cards, "Every level, one guarantee" roles/interview grid, FAQ block, closing CTA, sources, footer. Hero bar chart values, dark-section horizontal bar chart, and sector dot-grid illustration all render in the candidate. FAQ shows only the first answer expanded in the candidate vs. all three expanded in the reference — matches the documented intentional difference (review doc line 36). No missing sections or illustrations found.

**industries-manufacturing — ACCEPT (Stage 1 only)**
Same section set and ordering as reference; hero stat ("14.39 lakh"), hero bar chart, dark "22%" section with compare chart, triptych, Q&A cards, roles grid, FAQ, closing CTA, sources, footer all present. FAQ again first-only-expanded in candidate (intentional per review doc). No missing content observed.

**industries-pharmaceutical — ACCEPT (Stage 1 only)**
All sections match: hero ("3rd largest..." stat), hero bar chart, dark "34%" compare section, triptych, Q&A cards, roles grid, FAQ, closing CTA, sources, footer. FAQ state difference is the same documented intentional pattern. No missing sections.

**industries-private-equity-portfolio — ACCEPT (Stage 1 only)**
All sections match: hero ("$36 bn" stat), hero bar chart, dark "32%" compare section, triptych ("first ninety days" etc.), Q&A cards, roles grid, FAQ, closing CTA, sources, footer. FAQ difference intentional as documented.

### Concrete findings

- **Observation, not a confirmed defect — uniform page-height offset (low severity).** Across all four routes, the candidate full-page screenshot is consistently ~30–37px taller than the reference (industrial-engineering +31px, manufacturing +32px, pharmaceutical +37px, PE-portfolio +32px), despite the candidate's FAQ having _fewer_ expanded answers than the reference (which should make it shorter, not taller). This is a small, consistent delta (~0.5% of page height) and is most plausibly a font-metric/line-height rendering difference between the reference capture tool and headless Chromium rather than a layout defect. I cannot confirm the cause from static screenshots alone — flagging as uncertain, not a finding requiring REVISE.
- **Compare-sector list row-pairing (uncertain, not claimed as confirmed).** On the private-equity-portfolio page, the "Compare with" sector list in the dark chart section appears to group differently between reference and candidate (e.g., which sector pairs share a row). Given the downscaled render I reviewed, I can't reliably read this fine text to confirm an actual ordering defect versus a benign reflow from the current-sector exclusion. Not raising as a defect — would need a cropped/full-resolution capture of just that widget to verify.
- No missing sections, missing illustrations, missing charts, or broken hierarchy/spacing found in any of the four routes.
- Static screenshots cannot confirm chart-draw animation, stagger, or reduced-motion behavior — that would require the archived test evidence, which I have not inspected in this stage.

### Stage 1 verdict for these 4 routes: **ACCEPT**

This covers only the 4 routes requested in Stage 1 (industrial-engineering, manufacturing, pharmaceutical, private-equity-portfolio) at 1366px desktop. The remaining 10 industries/sector/Intelligence routes, other breakpoints, and any Stage 2+ instructions are still outstanding — let me know how you'd like to proceed.
