# REMOVE

Remove the choose-two-sectors comparison from the page. Keep the weighting *idea*; it already lives, better, in the twelve-card grid.

---

## Observed facts

**Page structure (index.astro).** Four blocks only: hero + comparison card; "Twelve sectors, twelve different bars." (12 linked cards, 6738–7058); "The method is the same in all twelve." (4 steps, 7060–7101); "Not listed" CTA (7103–7119); footer.

**The card's own disclaimer.** The comparison footer reads: *"Controls and risk moves from 8% to 30%. Difference: 22 percentage points. **Example weights; your hiring manager sets the actual priorities.**"* The hero's primary visual object declares itself illustrative.

**The numbers.** Six dimensions — Core depth, Systems design, Controls and risk, Delivery speed, Documentation, Stakeholder handling. Default A sums to 100 (30+24+8+22+6+10); B sums to 100 (20+14+30+10+18+8). They are weight percentages. Source is `industryPages[].bars` via `chart-series.ts`; that file's own comment at line 13 says provenance "remains an owner-review item." No methodology, sample size, date, or author anywhere on the page. Bars render with `data-scale="relative"` (6609), so bar length ≠ the printed percentage.

**Duplication.** Each of the 12 cards already carries a 6-bar sparkline with the tall red bar, plus a "WEIGHTED HEAVIEST" line (e.g. Banking: "Control failure, not framework recall"). That is the hero's entire thesis, shown twelve times at once, with zero interaction. "Twelve" appears in the meta description, the hero CTA ("See the twelve"), two H2s, and the closing line.

**Interaction cost.** 12 × 12 selectors = 66 unique pairs. `initComparison` (charts.ts) hides both native `<select>`s (187–188) and drives a custom listbox.

**Mobile (hero-open-390).** The panel is absolutely positioned inside `.cmpw` with `max-height: calc(100% - var(--picker-top) - 18px)`; when open it covers the entire chart it is meant to change, and 4 of 12 options sit below the fold behind a sticky "SCROLL FOR ALL SECTORS ↓" cue. Hero `min-height` is hard-coded at 1321px at 390px (411–415), inside a 6,965px page — roughly two full phone screens before the first sector name.

**Proof.** No client logos, no case studies, no outcome metrics, no named people, no testimonials on this page. (`.logos`, `.cases`, `.desk`, `.verd` CSS exists but renders nothing here.) Primary hero CTA "See the twelve" is an in-page scroll; the contact path is the unstyled text link "Ask about yours."

---

## Answers

**1 — Does it deserve the hero? No.** *Judgment.* A buyer arriving at /industries is asking one question: *do you work in my sector, and are you any good at it?* The comparison answers neither. It requires the visitor to select a sector they don't care about in order to see a contrast they didn't request. It establishes no credibility — it is a rendering of our own opinion, self-labelled "example." It moves nobody toward contact: the hero's dominant action is a scroll. It reads as an invented demo because it functionally is one — an interaction built to be looked at, with no downstream consequence.

**2 — Credibility of the six dimensions: low, and the page admits it.** *Fact:* percentages sum to 100 with no source. *Judgment:* precise-looking integers (8%, 30%, 22 points) invoke measurement, then the caption withdraws the claim. That combination is worse than either alone — it signals *we made this up but styled it like data.* A sophisticated hiring lead will read "Documentation 6% vs 18%" and ask "measured across how many mandates, when?" There is no answer. Risk of looking arbitrary: high. The relative bar scaling compounds it — bar lengths don't match the printed numbers.

**3 — Is a dropdown right? No, on four counts.** Discoverability: two closed chevrons in a dark card read as a filter, not a story. Cognitive load: the user must hold two sectors, six dimensions, and twelve numbers in mind to extract one sentence the caption already writes for them. Mobile: choosing hides the result (measured above) — the cardinal sin of a comparison UI. Motivation: buyers operate in one sector. The genuine comparison audience is roughly nobody. Note this is not a craft failure — the picker is well built (grouping, typeahead, swap-not-duplicate, no-JS fallback). It is a well-executed answer to a question no visitor asked.

**4 — Narrative and IA.** The page is thin and circular: *weighting differs by sector* (hero) → *weighting differs by sector* (12 cards) → *but the method doesn't* (steps) → *ask us*. One idea, stated three times, then a CTA. The 12-sector grid is the strongest thing here and is buried below a 1,321px hero. Copy is confident but unsupported — "Three vetted people for roles where the wrong hire costs more than a quarter," "Precision hiring for an industry where accuracy is the whole job" — assertions a competitor could paste verbatim. Missing entirely: any evidence of having done this work. Coverage is presented adequately (clear names, sparkline, "weighted heaviest") but without volume, geography, seniority, or a single outcome.

---

## Recommended direction

**Replace the hero object with the twelve themselves.**

New hero (dark, full-bleed, as now): eyebrow `INDUSTRIES` → H1 kept (`The sector changes / what the role demands.`) → one sentence → **the 12 sectors as a live, clickable index in the hero right column**, each a link with its sparkline and "weighted heaviest" line on hover. Primary CTA becomes solid red `Ask about your sector`; secondary `See how the method works`. The hero now answers coverage instantly, is fully usable with no JavaScript, has zero invented data, and every pixel of it is a navigation target.

**Revised sequence**
1. Hero + 12-sector index (above).
2. **Proof band** (new, dark→paper): mandates run, sectors live, median time-to-shortlist, offer-accept or 12-month retention; 3 anonymised mandate lines ("Series C fintech, Bengaluru — Head of Risk Engineering, 19 days, 3 shortlisted, 1 hired, still in seat").
3. The twelve, expanded — cards as today, now the elaboration rather than the repeat.
4. **One worked sector** — a single weighting shown properly, with a methodology footnote (n, period, who sets it) and the mandate it came from. This does the comparison's job with evidence, once, and is far more persuasive than 66 hypothetical pairs.
5. "The method is the same in all twelve" — keep, tighten; drop one of the three "twelve" restatements.
6. "Not listed" CTA — keep.

**Data required before build:** provenance for every weighting (source, sample, date, owner); 3–5 anonymised outcomes with real numbers; logo-use permissions or a "clients include" line legal will clear; a one-line methodology statement that can sit under any chart on the site.

**Visual fit.** Nothing new is needed. Reuse the homepage system exactly: `--char #131313` hero, Figtree 800 H1 with `em` in `--red #da0007`, Inter Tight body, mono 11px/0.22em eyebrows, 16px panel radius, `clamp(48px,6vw,80px)` band rhythm, alternating `--paper` / `--card` / `--char` bands. The Industries context is carried by the 12-item index and the sparklines — sector-specific content, homepage grammar. Delete `.cmpw`, `.sel`, `.sector-picker`, `.bw` CSS and the `initComparison` import from this page only (`charts.ts` stays for other consumers). **`.nav` / `.navp` / `.dd` (5980–6426) are untouched.**
