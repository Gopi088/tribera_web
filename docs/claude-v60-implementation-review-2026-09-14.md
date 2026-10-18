I have enough to report. Two notes on what I could and couldn't reach: I had no shell/grep in this session, so I could not locate the workbook updater, and `services.astro` (11k+ lines) was not searchable for the R44 strings.

---

# 1. Blockers / required corrections

### B1 — R7 is not verified; the last production run of its own cited evidence failed
`/tmp/tribera-v60-preview.log` ends in a hard failure, not a pass:

```
+ 'Three worth meeting— each with the evidence to choose from.'
- 'Three worth meeting — each with the evidence to choose from.'
  at tests/home-handoff.test.mjs:48
Error: home-handoff exited with 1
```

The source fix is present — `Home.astro:169` now has `</span\n>{' '}&mdash;` — but no production-preview run has been recorded **since** that fix. `docs/excel-bug-status.json` R7 nonetheless says `"status": "Verified (local)"` and cites `tests/home-handoff.test.mjs`, the suite that currently fails on exactly this string. The status is ahead of the evidence.

Note `astro-compress@2.4.1` is in the toolchain (`package.json:61`). Whether `{' '}` survives production HTML compression is precisely what previously differed between dev and build, so it must be re-run, not reasoned about.

### B2 — the same construct silently guards R8/R50, and its assertion has never run in production
`Home.astro:252` uses the identical shape:
```
>your priorities<svg …></svg></span
>{' '}and the verdict follows &mdash; same person, a different bar.
```
Without the `{' '}`, this renders **`prioritiesand`** — the exact defect R50 documents and R8 was raised to fix. `scripts/test-reviewed-site.mjs:24` runs suites in order `home-handoff → v60-copy → …` and aborts on the first failure, so `tests/v60-copy.test.mjs:30` (`doesNotMatch(/prioritiesand/)`) **never executed** in that run. R8 and R50 are marked `Verified (local)` on strictly weaker evidence than R7, which demonstrably failed.

Required: rebuild and re-run `node scripts/test-reviewed-site.mjs` to completion; do not leave R7/R8/R50 at `Verified` until it passes.

### B3 — every row still carries the placeholder review field
All 50 records have `"claude_review": "Awaiting latest-workbook review; historical review does not verify the updated recommendations."` and `"reviewed_on": ""`. This is the same bookkeeping trap `docs/claude-excel-status-review-2026-09-13.md:62` flagged for the previous cycle. Writing the workbook from this JSON now publishes 50 rows stating the review has not happened. Must be populated before any workbook write.

### B4 — the workbook updater could not be located, so its refusal logic is unverified
`docs/v60-reconciliation-2026-09-14.md:65` claims "generalized to the latest 50 rows; six preservation/refusal tests passed." I could not find that script or its tests: it is absent from `package.json` (which has no test script beyond `test:handlers`), absent from `.github/workflows/actions.yaml`, absent from `scripts/test-reviewed-site.mjs`, unnamed in either Claude review doc, and not present at ~15 conventional paths I tried under `scripts/`, `tests/` and `/tmp`. None of the four logs I was given covers it. **The variable-row-count preservation/refusal behaviour you asked me to critically verify is therefore unverified, and the "six tests passed" claim is unsupported by any artefact in this session.** Please supply the path and its log.

### B5 — R44 has no evidence I can reach
Its only executable assertion is `tests/v60-copy.test.mjs:75-79`. That suite does not appear in any of the four logs (the preview run aborted before reaching it), and I could not confirm "Six to eleven dimensions, weighted at intake" or "six to eleven criteria agreed for the role" by reading, because `services.astro` exceeds what I can page through without search. Status `Verified (local)` is unsupported as things stand.

### B6 — evidence fields conflate dev with production
Rows 2-19 and 48-51 cite `tests/home-audit.test.mjs`, which defaults to `http://127.0.0.1:4321/` (`home-audit.test.mjs:5`) — the **dev** server — and is in neither `scripts/test-reviewed-site.mjs` nor CI. `tests/home-handoff.test.mjs` defaults to `:4331`, also dev. Only `scripts/test-reviewed-site.mjs` exercises a real `astro preview` build, and that is the run that failed. The manifest should distinguish dev-verified from build-verified rather than citing both under one "Verified (local)".

### Screenshot provenance — explicitly flagged
All six images are **dev-server artefacts, and none evidences the production whitespace fix**:
- `/tmp/handoff-thesis-390.png`, `-1520.png`, `/tmp/v60-hero-390.png`, `-1520.png`, `/tmp/v60-cover-390.png` are written by `home-handoff.test.mjs:87-107`, which sits *after* the assertion at line 48. The failing production run aborted at line 48, so these cannot have come from it — they are from a dev run. They show the correctly spaced "Three worth meeting — …", which is dev rendering, not proof of the build.
- `/tmp/home-after-full-1520.png` is 1520×11045 and matches `/tmp/tribera-v60-home-audit.log:7` ("document height 11045"), so it is current to that dev audit run.

Content in the screenshots is otherwise correct: hero copy/CTAs/36-hour value, 3 red + 5 grey bar squares, 17 coverage roles, and the full-page capture confirms the documented section order end to end.

---

# 2. Sample/policy deviations not documented in the reconciliation

| # | Finding | Location |
|---|---|---|
| a | **"Three names, all hireable"** — the all-hireable assurance the reconciliation says was kept off the homepage ("No 38-hour or all-five-hireable claim imported") is live on /functions, and is guarantee-adjacent to the R23 gate. | `src/pages/functions/index.astro:6597` |
| b | **"A hundred signals"** — the unsourced quantified method claim rejected for the homepage ("screened on 100+ signals", scope review line 52) survives here. | `src/pages/functions/index.astro:6578` |
| c | **Hyphen/em-dash inconsistency.** R2's recommendation explicitly included "hyphens→em dashes". The hero and thesis payoff use em dashes, but adjacent body copy still uses spaced hyphens — visible within one section in `/tmp/handoff-thesis-1520.png`. | `Home.astro:157, 528, 602, 611` |
| d | **Ungated quantified case claim.** "50+ profiles over six months without a hire. 4 interviews · 2 selected · 1 hired" carries no owner gate, while comparable figures are gated under R28/R33. | `Home.astro:453-455` |
| e | **R13's specific complaint partly unaddressed.** The intro was trimmed, but the remaining context line still restates what the funnel shows ("five introductions and two hires" duplicates stages 4-5). | `Home.astro:394-396` |
| f | **Hero dead space at desktop.** The cue sits inside the centred copy block rather than anchored to the hero's lower edge, leaving ~240px of empty band below it at 1520px. It satisfies R5's clearance requirement but reads as unintentional. | `Home.astro:124-128`; `/tmp/v60-hero-1520.png` |
| g | R39's manifest outcome also asserts "Index H1s are distinct." No test asserts this and I did not reach both `h1` elements. Unverified sub-claim. | `docs/excel-bug-status.json` R39 |

**Things I checked that are correct and worth recording as sound:**
- The `:is()` → `:where()` specificity fix is genuinely correct: preparation is `0,2,0`, the completed rules are `0,3,0` / `0,2,1`, so `.drawn` wins (`Home.astro:1372-1399`).
- All four preset notes are arithmetically consistent with the live model — this was the concrete risk raised in the prior scope review. `brief` → 39.00 SELECT (matches SSR), `llm` → 32.80 **GREY** (the note names GREY and the arithmetic produces it), `detection` → 40.00, `ownership` → 41.00 (note says "meets the select threshold"). SSR shares and table points match the JS output because Σweights = 50 exactly.
- Funnel tiering preserves 126/40/14/5/2 exactly (86/26/9/3/2 split, `Home.astro:58-60`), with the seeded Fisher-Yates retained rather than the sample's `Math.random()`.
- R19's "added to CI" is real: `actions.yaml:29` runs the preview suite including `home-handoff`. (`home-audit` is *not* in CI.)

---

# 3. Row-by-row verdict (rows 2-51)

| Row | Verdict | Reason |
|---|---|---|
| 2 | ACCEPT | Hero lead verbatim, `Home.astro:115-116`; assertion passed in the production run before the abort. |
| 3 | ACCEPT | `Home.astro:121` — "See it live ›" secondary, primary unchanged. |
| 4 | ACCEPT | `Home.astro:125` — "It's live — see it yourself", `href="#proof"`. |
| 5 | ACCEPT | Cue is last child of hero copy; ≥60px clearance asserted at 4 widths and passed in production. |
| 6 | ACCEPT | `Home.astro:233` — "Three clear it. Five don't." |
| 7 | **REJECT** | Replacement string is correct in source, but "Verified (local)" contradicts the only production run of its cited evidence, which failed on this exact string (B1). |
| 8 | **REJECT** | Same unverified whitespace boundary at `Home.astro:252`; its guarding assertion never executed in production (B2). |
| 9 | ACCEPT | Exact workbook note in both SSR (`:288-290`) and client preset (`:2874`); no other preset or model data touched. |
| 10 | ACCEPT | `Home.astro:373` — "Tell us what matters most — and we re-weight to it." |
| 11 | ACCEPT | `Home.astro:464` — exact workbook heading. |
| 12 | ACCEPT | "Four groups, with the functions we cover listed within each" (`:478`); 17 roles across 4 groups, count asserted. |
| 13 | ACCEPT | Blob replaced by short lead + funnel; sequence preserved. Residual duplication noted (2e). |
| 14 | ACCEPT | `Home.astro:52` — "Every CV read. Forty got a first call." |
| 15 | ACCEPT | `Home.astro:400` — "126 possible candidates for this role". |
| 16 | ACCEPT | All three references use "the hiring team" (`:55-56`, `:448`). |
| 17 | ACCEPT | `Home.astro:525` — explicit `<br />` between the two sentences; `br` count asserted. |
| 18 | ACCEPT | 3 hero accents (`:72`) and 3 red bar squares (`:216`); both DOM-counted. |
| 19 | ACCEPT | `:where()` fix correct by specificity; dash-offset asserted in reduced-motion and no-JS; suite is in CI. |
| 20 | ACCEPT | Pending-deployment is accurate; policy unit-tested (`reviewed-bugs.test.mjs:9-20`), production unverified. |
| 21 | ACCEPT | Shared `~/data/clients` consumed by Home; cut names asserted absent. Not re-read in About this session. |
| 22 | ACCEPT | Carried from the prior source check; no fixed count reintroduced on Home. |
| 23 | ACCEPT | Pending-owner accurate; no guarantee wording altered. |
| 24 | ACCEPT | Confirmed softened this session: "questions shaped by the role and the candidate's experience" (`functions/index.astro:6585`). |
| 25 | ACCEPT | Both models preserved; comparability caveat retained (`Home.astro:344-348`). |
| 26 | ACCEPT | Verified-existing accurate; enabled/disabled/blocked all covered (`reviewed-bugs.test.mjs:85-96`). |
| 27 | ACCEPT | No defect; claim correctly limited to on-site collateral. |
| 28 | ACCEPT | Pending-owner accurate; named bios unchanged. |
| 29 | ACCEPT | Pending-owner accurate; "majority agreement is not legal verification" is the right stance. |
| 30 | ACCEPT | Built-links log confirms format checks; outcome correctly separates format from provenance. |
| 31 | ACCEPT | Careers loop asserts labels/weights across all seven roles. |
| 32 | ACCEPT | Coverage checkpoint, explicitly not a product defect. |
| 33 | ACCEPT | Pending-owner accurate; credits only the R40 rendering fix. |
| 34 | ACCEPT | Pending-legal accurate; no speculative rewrite. |
| 35 | ACCEPT | Coverage checkpoint. |
| 36 | ACCEPT | Deferred-enhancement accurate; no unevidenced security assurances added. |
| 37 | ACCEPT | Pending-legal accurate; cap/jurisdiction/date untouched. |
| 38 | ACCEPT | Coverage checkpoint. |
| 39 | ACCEPT | Confirmed in source: `functions/index.astro:6620` is `href="/industries"` labelled exactly "Browse by industry"; no self-link. H1 sub-claim unverified (2g). |
| 40 | ACCEPT | All three widgets plus candidate fallback covered across 2 widths × 3 JS modes. |
| 41 | ACCEPT | Coverage checkpoint. |
| 42 | ACCEPT | `/tmp/tribera-v60-links.log:3` — all seven read times match served bodies. |
| 43 | ACCEPT | Coverage checkpoint. |
| 44 | **REJECT** | Outcome is coherent, but no recorded run of its only assertion and I could not confirm either string in source (B5). |
| 45 | ACCEPT | Coverage checkpoint, folded into R44. |
| 46 | ACCEPT | Canonical order + independent max, bars bounded 0-100 (`reviewed-bugs.test.mjs:111-122`). |
| 47 | ACCEPT | Coverage checkpoint; does not claim launch readiness. |
| 48 | ACCEPT | `src/pages/index.astro:6` already reads "every one worth the interview"; verified-existing is the right label. |
| 49 | ACCEPT | Order confirmed three ways: source, asserted list, and `/tmp/home-after-full-1520.png`; three-step strip absent. |
| 50 | **REJECT** | Same boundary as R8; the `prioritiesand` guard never ran in production (B2). |
| 51 | ACCEPT | No "their team" anywhere in the funnel; all three replaced. |

**Totals:** 46 ACCEPT, 4 REJECT (R7, R8, R44, R50). No pending row was moved; R20/23/28/29/33/34/37 remain pending and R36 remains an enhancement, all correctly dispositioned.

The four rejections are about evidence, not about the code: in three of them (R7/R8/R50) the source fix looks right and one clean production-preview run would settle them.
