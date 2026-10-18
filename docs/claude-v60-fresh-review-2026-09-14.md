# Fresh Claude Review - 2026-09-14

Read-only review of current changes. Reviewer findings below are preserved as returned; they are not implementation changes or new workbook closure decisions. Claude inspected source, supplied screenshots and existing test evidence, but did not run tests or inspect the binary workbook. See inspection limits below.

## Findings (severity order)

All refs are to the current working tree. I could not run anything — see _Inspection limits_ at the end.

### 1. The R7 payoff line breaks badly at every width — `src/components/home/v58/Home.astro:160-170`, CSS `:1323-1332`

The key claim renders on three lines with an orphaned em dash and a visible leading indent, at **both** 390px (`/tmp/handoff-thesis-390.png`) and 1520px (`/tmp/handoff-thesis-1520.png`):

```
Three worth meeting
 — each with the
evidence to choose from.
```

Cause: `&nbsp;&mdash;` at `:169` combined with `max-width: 22ch` + `text-wrap: balance` on `.v58-thesis__claim`. At 1520 the column is ~700px wide and the text occupies ~360px — the 22ch cap, not the container, forces the break, and `balance` still produces a short middle line. The NBSP lands at the start of line 2 and reads as a typo.

This is a genuine regression introduced by the R7 whitespace fix, and it is invisible to the tests: `tests/v60-copy.test.mjs:7` (`clean()` collapses `\s`, which includes `\u00a0`) and `tests/home-handoff.test.mjs:50` both normalise whitespace before comparing, so exact-string assertions pass on a line that renders wrong. Fix candidates: widen `max-width` to ~28–30ch, or move the NBSP inside `.v58-hd-word` (`worth meeting&nbsp;`) so it cannot begin a line.

### 2. New `#cover` section wraps raggedly on mobile — `Home.astro:625-627`, CSS `:2623-2638`

`/tmp/v60-cover-390.png`: `.v58-role-coverage__list` is a wrapping flex row, so at 390px eleven rows carry one role and four carry two ("AI & machine learning / Cybersecurity", "Capital markets / Supply chain & planning", "Procurement & sourcing / HR operations", "Manufacturing / Product & design"). It reads as a broken grid rather than a list. At 1520 (`/tmp/v60-cover-1520.png`) the same markup is fine, so this is mobile-specific. No test covers it — `home-handoff.test.mjs:46` only counts 17 `li`s.

### 3. Duplicated coverage content and verbatim repeated sentences

- The same 17 roles render twice on one page: grouped at `Home.astro:478-495` (`#experts`) and flat at `:625-627` (`#cover`). `v60-copy.test.mjs:47` asserts the two lists are _identical_, so the duplication is locked in.
- "We confirm interviewer coverage on the first call." appears verbatim at `Home.astro:496` and again at `:622-623`.
- "Five qualified candidates." appears verbatim at `Home.astro:55` (funnel stage 4) and `:447` (funnel close).

The reconciliation documents the coverage section as an intentional sample restoration (`docs/v60-reconciliation-2026-09-14.md:37`), but the repeated sentence and the doubled role inventory are editorial defects, not sample fidelity.

### 4. R13 is a partial fix recorded as "Verified (local)" — `Home.astro:389-395`, `tests/funnel-stages.test.mjs:33-36`

R13 asked to trim the intro because "the paragraph currently repeats what the funnel shows". The `.v58-funnel-context` line was trimmed, but the lead directly above the funnel still says "**126 possible candidates. The hiring team met five.**" — restating the two numbers the funnel renders immediately below — and `funnel-stages.test.mjs:33-36` now asserts that wording. The manifest outcome ("simplified the context to avoid restating five introductions/two hires") is narrowly true of one paragraph while the section as a whole still duplicates the funnel. I'd re-state R13 as partially addressed rather than verified.

### 5. Candidates brief buttons are semantically disabled but visually indistinguishable — `src/components/candidates/Candidates.astro:132`, `:512-514`, CSS `:956-982`

The readiness change itself is correct: handlers are attached at `:487-511` and only then `button.disabled = false` at `:512-514`. But there is no `:disabled` rule anywhere in the component's CSS; author styles set `background: transparent`, an explicit `color`, and `cursor: pointer`, which override the UA disabled treatment. In SSR, no-JS, and CSP-blocked states the four buttons look fully interactive, keep a pointer cursor, and one still looks selected — the "inert-looking-active control" the R26/R40 outcome claims to have fixed. `tests/reviewed-bugs.test.mjs:94-96` only asserts `isDisabled()`, so it passes without catching the visual gap. In `blocked` mode the `<noscript>` hint cannot render, and `reviewed-bugs.test.mjs:99` actively asserts _no_ hint is present — so a CSP/extension-blocked visitor gets inert controls and no explanation.

### 6. The disabled-until-ready policy is not applied to the home lab — `Home.astro:303-311`, `:324-334`

The home lab's four preset buttons and nine range inputs have no `disabled` attribute and no readiness gate. With JS off or blocked, the sliders still drag (native behaviour) while the score, shares and band never move — more misleading than a dead button. R40's outcome claims "disabled-until-ready selectors" for the widget family; the home lab is outside that treatment, and no test asserts anything about it in the `blocked`/`disabled` modes. Consistency gap rather than a new break, but it undercuts how broadly R40 is stated.

### 7. Indexing policy fails open when `CONTEXT` is unset — `src/utils/indexing-policy.ts:12-17`, `tests/reviewed-bugs.test.mjs:17`

`shouldNoIndex({})` returns `false`, and the test encodes that expectation. `import.meta.env.DEV` is false in any build, so any build outside Netlify (plain `astro build`, a different CI, a self-hosted pipeline) emits `index, follow` on every page. R20 is correctly held as **Pending - deployment**, but the residual risk is the opposite direction from the original bug: the unknown-environment default is indexable. Worth naming explicitly in R20's next action.

### 8. Two manifest evidence citations don't match the cited test

- **R31** (`docs/excel-bug-status.json:449-451`) claims "Cards consistently show Bengaluru" citing `tests/reviewed-bugs.test.mjs`. That file (all 142 lines) asserts index policy, comparison widgets, the intelligence chart, candidate briefs, and careers dimension order/weights — there is no location-label assertion anywhere. The source change looks real (`src/data/careers.ts:15-16` separates `loc` from an optional `neighborhood`), but the named evidence does not verify it.
- **R25** (`:359-361`) claims "Added purpose/unit/comparability context" citing the same file; the caveat text exists (`Candidates.astro:161-164`, `Home.astro:344-346`) but that test asserts scores, not the caveat.

### 9. Workbook tests no longer prove preservation of the pre-update original — `tests/test_bug_workbook.py:18-22`, `:24-32`

Two structural issues, both consequences of the workbook having been written:

- `setUp` overwrites `claude_review` and `reviewed_on` on every record with fixture strings, so **no test ever validates the real manifest's 50 review verdicts**. `test_unreviewed_row_is_rejected` proves the gate mechanism works, not that the shipped manifest passes it.
- `self.original` is read from the workbook **as it is now** — i.e. already updated. So `test_round_trip_preserves_workbook` exercises updated→updated idempotency, not original→updated preservation. The only artefact proving A–E survived is the backup `sample_data/Tribera-Website-Bugs-Reviewed (2).before-status-update.xlsx`, and nothing compares the live workbook against it.

Concrete fix: add a test that opens the backup and asserts A–E cell-XML equality plus `F ∈ (previous_status, status)` against the current workbook. The updater's own guards (`scripts/update_bug_workbook.py:86`, `:90-91`, `:137-146`) are sound; the _test suite_ is what no longer covers the transition.

### 10. The "unsupported claims" regression is narrower than the evidence states — `tests/v60-copy.test.mjs:75`

`assert.doesNotMatch(await page.locator('.steps').textContent(), /A hundred signals|all hireable/)` is scoped to a single `.steps` container. `docs/v60-verification-evidence-2026-09-14.md:96` states "Functions index no longer says A hundred signals or all hireable; regression asserts their absence" — page-wide. The phrases are genuinely gone from the section I inspected (`src/pages/functions/index.astro:6575-6602`), but the guard would not catch a reappearance elsewhere on the page. Widen the locator to `body`.

### 11. Home logo marquee duplicates client names to screen readers — `Home.astro:135-145`

`[...heroClients, ...heroClients]` renders 22 `<span>`s with no `aria-hidden` on the second copy, and `aria-label` on a role-less `<div>` (`:136`) is not reliably exposed. `Candidates.astro:54-64` solves exactly this correctly (`aria-hidden={copy === 1 ? 'true' : undefined}`). Same content, two different treatments.

### 12. CTA label and modal title disagree — `Home.astro:710-712`, `tests/home-audit.test.mjs:83`

The link reads "Book a walkthrough ›"; the modal it opens is titled "Book a demo", and the test asserts the modal title. Low impact, but it's a user-visible mismatch on a conversion path.

### 13. Mixed apostrophe glyphs in display type

Straight apostrophes at `Home.astro:153` ("don't"), `:156` ("who's"), `:463` ("who've"), `:288` ("we'd") sit alongside typographic ones at `:115` (`&ldquo;good&rdquo;`) and `:127` (`It&rsquo;s`). Visible in `/tmp/handoff-thesis-1520.png` — the straight mark in "We don't send you people." is conspicuous in the Fraunces face. Note this also means the R11/R9 "exact workbook string" claims are exact modulo apostrophe glyph (the workbook uses curly); `v60-copy.test.mjs:43` locks in the straight form.

### 14. Inconsistent hedging on case statistics — `Home.astro:450-455` vs `:447-449`

The 32-hour figure is correctly hedged ("An estimated **32 hours**"). Three lines above, the second case card states "50+ profiles over six months without a hire. **4 interviews · 2 selected · 1 hired**" with no qualifier, and the funnel lead states "open nine months without a hire" as fact. These are in R33's provenance queue (`excel-bug-status.json:484`) and the evidence packet is honest that preserving them is not verification — but the hedging should be uniform within the section.

### 15. Minor / trivial

- `tests/home-audit.test.mjs:43` — the heading-alignment sweep lists nine section ids and omits the new `cover`; the new section isn't checked for alignment or left-alignment.
- `Home.astro:2572-2573` — empty `@media (min-width: 900px) {}` block.
- `src/pages/blog/designing-ai-for-high-stakes-technical-assessment.astro:7056` — the edited line overruns the surrounding print width; the R44 edit wasn't re-wrapped.
- Hero at 1520 (`/tmp/v60-hero-1520.png`) has ~200px of empty space between the micro line and the scroll cue. `home-handoff.test.mjs:27-28` bounds the gap _below_ the cue (60–100px) but nothing bounds the band above it, which is where R5's "dead band" concern actually reappears.

---

## What I verified as correct

Spot-checks that held up, so they're not in the list above: hero definition and three accents (`Home.astro:114-117`, `:72`); "See it live" / "It's live — see it yourself" (`:121`, `:127`); funnel stage copy and hiring-team antecedents (`:51-57`); R15 field label (`:399`); R10 lab footer (`:373`); R9 note identical in SSR and the client preset (`:288` and `:2874`); R12 clarifier (`:477`); 17 roles from shared data; R39 cross-link exact label and `/industries` destination (`src/pages/functions/index.astro:6620`); R44 in both places (`services.astro:11112`, article `:7056`); R21 approved client list, exactly the eleven names in workbook order (`src/data/clients.ts:2-14`); R24 softened method wording (`functions/index.astro:6585`).

The funnel and lab interactions are intact — hover preview vs. committed selection, keyboard focus, stable seeded scatter, share rounding that doesn't perturb scoring (`Home.astro:2889-2898`), reduced-motion handling. `tests/funnel-stages.test.mjs` is the strongest suite in the packet.

The CSP handling in `reviewed-bugs.test.mjs:35-48` is sound: fulfilling the navigation response with an injected `script-src 'none'` header defeats Astro's inlined scripts, which a request-blocker alone would miss, and aborting non-GET requests keeps forms from being submitted. My criticism is what it asserts (item 5), not how it blocks.

Workbook status counts are accurate and internally consistent: 33 / 1 / 1 / 7 / 4 / 2 / 1 / 1 = 50, matching `docs/v60-reconciliation-2026-09-14.md:68`, and `v60-copy.test.mjs:90-92` pins the seven Pending rows. "Pending means pending" is held to throughout.

## Intentional sample differences, not defects

Two consecutive dark sections (`#proof` + `#funnel`); 17 roles retained instead of the sample's 14; the production nav/footer shell rather than the sample's; 32-hour estimate preserved rather than the sample's 38; no "all five hireable", percentage graphic, or no-reopening guarantee imported; distinct home (9 criteria, /50, bands) vs candidate (6, /100, no bands) models kept deliberately under R25. The precedence rule — workbook copy over stale sample HTML on R7 and R11 — is correctly applied and correctly documented.

## Open gates (unchanged — I am not closing any)

R20 deployment indexing/canonical/sitemap; R23 restart guarantee; R28 named-expert identity, claims and consent; R29 registered address; R33 Intelligence figures, the About interview-volume claim and homepage case-figure provenance; R34 privacy/DPDP; R37 terms liability, jurisdiction and dates.

One cross-reference worth adding to R34: the site asserts per-score transcript traceability — `Home.astro:375` ("Every score points to the exact line behind it") and the assessment article `:7064` ("the transcript line it came from") — while the privacy policy still omits recordings, transcripts and scores. That is a published product claim with an unresolved disclosure dependency, not a separate defect.

Also worth noting for consistency of the approval standard: R21 shipped eleven client names on the strength of an asserted owner authorisation recorded only in a code comment (`src/data/clients.ts:1`) and a manifest field, while R28/R29 are held open pending owner confirmation. Same class of approval, different artefact standard.

## Inspection limits

- No shell, grep or test execution in this session — read-only file access. Every test result I cite is from the source of the test plus your `/tmp/tribera-v60-release-preview.log` excerpt in `docs/v60-verification-evidence-2026-09-14.md:9-65`. **I did not run anything and am not independently confirming any suite passed.**
- The XLSX is binary and unreadable to me. I reviewed `scripts/update_bug_workbook.py`, `tests/test_bug_workbook.py` and `docs/excel-bug-status.json` only, and I make no claim about the workbook's actual cell contents or about the backup file's contents.
- Screenshots reviewed: the five you named plus `/tmp/handoff-thesis-1520.png` and `/tmp/v60-cover-1520.png` (needed to tell mobile-only from general). `/tmp/home-after-full-390.png` is 15,276px tall and downscales past legibility — I drew no conclusions from it.
- Not inspected: About, Contact, the three legal pages, Intelligence, the 12 industry and 8 function detail pages, the career role pages beyond `careers.ts`, `built-links.test.mjs`, `client-publication.test.mjs`, `reviewed-route-audit.test.mjs`, and the sample HTML/docx themselves. Item 8 (R31) is therefore a citation finding, not a claim that the careers labels are wrong.
- I made no edits.

## Verdict

**No blockers among the changes I reviewed.** Items 1–3 are visible defects that I'd fix before this is shown to a client — item 1 in particular, because it disfigures the page's single most important line at every width and slipped through precisely because the assertions normalise whitespace. Items 4, 8, 9 and 10 are accuracy problems in the evidence packet rather than the product: the fixes are mostly real, but four statements claim more coverage than the cited artefacts provide, and after the workbook write the Python suite no longer demonstrates the preservation it is offered as proof of.

I am **not** certifying launch readiness. Seven owner/legal/deployment gates remain open, nothing here is deployed, and the R33 provenance queue still covers figures that are currently published as fact.
