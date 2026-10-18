**PASS**

---

## Measured facts

**Correction 1 — no-JS.** `<noscript><style>[data-rv]{opacity:1!important;transform:none!important}</style></noscript>` now sits in the head at 4650–4657, after the global style block closes at 4649, so it wins on both cascade order and `!important`. `nojs-390.png` and `nojs-1520.png` render the complete page: eyebrow, H1, lead, red CTA + "How the method works", the key line, all 12 sector rows with description and evidence phrase, the dark method band with four steps and the closing line, the "Not listed" band with both CTAs, plus navbar and footer. No blank regions, no clipping, no horizontal overflow. `validation.md:9` now matches the source.

**Correction 2 — cleanup.** File is 4,898 lines (was 6,452); markup starts at 4659. The `.hero` block at 343–358 is four short rules with no min-height ladder. `.hero__card`/`.flip`/`.face`/`.tiles`/`.sig`, `.logos`, `.swap`, `.cases`, `.desk`, `.lab`, `.verd` are absent from the inspected ranges; 343–760 runs hero → tags → funnel → steps → ramp with no orphaned fragments. `final2-hero-1520/390` and `final2-method-1520/390` are visually identical to the prior final captures.

**Correction 3 — steps.** `.step:hover`, `:focus` and `.step.on` are gone from 574–659. The authoritative override (4598–4605) sets `cursor: default`, `opacity: 1`, and `background: transparent` on hover. `final-validation.json` reports `methodSteps: ["1","1","1","1"]` at all five widths; both method captures show four equally weighted steps. Base `.step { opacity: .4; cursor: pointer }` survives at 589–590 but is fully overridden by the higher-specificity `:root body .site-editorial #same` rule — measured, not theoretical.

**Correction 4 — labels.** Hero eyebrow 12px (4406), `.sector-index__key` 12px (4476), `.secx__weight i` 12px (4582), method eyebrow 12px (4607). All at or above the brief's floor.

**Correction 5 — row key.** `Evidence that matters` appears in all 12 rows (4691–4818). No "weighted", percentage, select, sparkline or comparison widget remains; `dropdowns: 0` at every width.

**Preservation.** `SiteHeader` (4660) and `SiteFooter` (4888) untouched; navbar with Coverage/Services/Intelligence/Blog/About/Contact/Careers and the red "Start with one role" renders in every capture, including no-JS.

## Judgment

Idea clarity holds: one question ("do you cover me?") answered above the fold at 1520 and within one short scroll at 390. Hierarchy is stronger now that the mono keys sit at 12px — the evidence line reads as a labelled fact rather than fine print. Mobile remains a uniform, thumb-sized list; 132/112px targets and full-width primary CTA are sound. Homepage fit is intact: Fraunces, red italic, `\` eyebrow, dark band, paper close.

No blocker remains. Ship it.
