# Claude Review: Flow Trial

Read-only story and visual review of the first trial. The final finishing adjustments and production verification are tracked in homepage-flow-trial-2026-09-14.md. The reviewer suggestion to use a single-file checkout is NOT a safe rollback method in this dirty worktree; use the saved trial-only patch, which includes the affected tests.

## Verdict

The trial reads as one journey rather than nine restarts, and the core narrative risk is fixed: `#work` (237) now sits directly under the thesis with a shared border-top head (CSS 2709–2716), so "Yours/Ours" ownership, "One call per role" and "a senior advisor who has held the role" (249–263) all land before the lab. The lab kicker is scoped to scoring ("The bar, in practice", 289) and its closure claims evidence traceability, not trustworthiness of the verdict — no SaaS-product or scoring-trust overreach. Expertise is now owned once: groups, focus and all 17 roles are local to `#experts`/`#cover` (456–476), the forward reference is gone, and disclosures are native `<details>` — SSR, keyboard-operable, no-JS safe. Colour reads by purpose. Desktop is 19% shorter, mobile 10%.

## Genuine problems

**Medium — no role name is visible without interaction.** All four groups are closed `<details>` (465). A buyer scanning "can you cover my role?" sees four headings and four "View N roles" summaries and nothing else (`/tmp/handoff-experts-1520.png`). Minimal fix: add `open` to the first group only (Engineering, 6 roles) — one SSR attribute, keeps the block regular, no chips.

**Medium — human-review narrative still appears three times.** Experts lead (452–455 "Our team reviews the evidence before shortlisting"), Experts note (481–482 "The engine supports scoring…"), then Trust card one (627–629 "A human-reviewed shortlist… reviews interview evidence"). The proposal moved the narrative into Experts and left Trust as *terms*; card one is still story. Cut the review clause from the Experts lead, or reduce Trust card one to the agreed-criteria/oversight statement.

**Low-medium — Experts' lower third is left-pinned.** 478–499 (confirmation, note, industries) stack in the narrow column while the right half is blank below y≈780 in the 1520 crop, the exact fault finding 3 targeted. Pair 478–480 and 481–482 on the two-column head grid at ≥820px.

**Low-medium — two `v58-experts__confirmation` paragraphs** (458 and 478) share styling but do different jobs (instruction vs. commitment); they read as a repeated footnote. Give 458 its own class or fold it into the `#cover` label.

**Low — `#benefits` anchor.** The empty span at 574 sits outside the `scroll-margin-top` rule, which targets `.v58-case-benefits` (2743–2746); unless a global `[id]` rule covers it, that anchor lands under the header. `#savings` on the aside is fine.

**Low — "Recruitment: three with the proof. Your pipeline: one ranked list." (269–271)** names both offers ~3,000px before `#ways` explains them. Acceptable as a teaser; only flag if the trial shows confusion.

**Low — Time/Cost/Effort** (577–591) still describe one benefit three ways, but the new heading "Less screening for your team." frames them as facets rather than three claims, which defuses finding 4.

## Suitability

Yes, as a reversible user trial. The change surface is one component plus four home tests; revert is a single-file checkout. Model, weights, funnel counts, pricing wording, quotes and legal gates are untouched, and no new compliance or accuracy claims appear. Caveat as stated: only home-handoff/home-audit/v60-copy are green; the production build and the full eight-suite run are still in flight, so nothing here certifies build health or launch readiness, and the owner/legal/deployment gates plus Excel's accepted baseline remain open by design.

