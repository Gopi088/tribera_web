# Claude Follow-Up Review

Verified against source, tests, and the five screenshots. No blockers found; below is what I could actually confirm.

## Verification notes

**Confirmed fixed in source + pixels**
- Payoff: `max-width: 30ch` (`Home.astro:1326`) + NBSP moved inside `.v58-hd-word` (`:168`). `/tmp/handoff-thesis-390.png` and `/tmp/handoff-thesis-1520.png` both render two lines, dash trailing line 1, no leading indent. Whitespace-blind gap closed by the per-glyph line-box assertions in `home-handoff.test.mjs:59-84`.
- Coverage grid: `repeat(auto-fit, minmax(min(100%,260px),1fr))` (`Home.astro:2613-2616`); `/tmp/v60-cover-390.png` shows one aligned role per row, 17 items; geometry pinned at `home-handoff.test.mjs:49-58`.
- Experts vs Coverage: `/tmp/experts-grouped-1607.png` shows four specialisms with focus text and no role inventory; roles appear once at `Home.astro:616-618`. Locked by `v60-copy.test.mjs:45-50` (`#experts ul` count 0, 17 unique roles).
- Readiness: Candidates `:disabled` rule exists (`Candidates.astro:983-987` — dashed border, 0.65 opacity, `not-allowed`), server-rendered hint at `:165-167` (not `<noscript>`, so it survives CSP), enable-after-handlers at `:510-514`. Home lab mirrors it (`Home.astro:303-311`, `:324-335`, CSS `:1254-1259`, enable after `update(false)` at `:2946-2953`). Asserted in all six enabled/disabled/blocked × width combinations (`reviewed-bugs.test.mjs:95-128`).
- Indexing now fails closed (`indexing-policy.ts:12`; `reviewed-bugs.test.mjs:17-18`).
- Workbook: `setUp` no longer stubs verdicts (`test_bug_workbook.py:17-19`), so the real 50 reviews now pass `render`'s gate (`update_bug_workbook.py:88`); `:21-26` renders from the backup **and** runs `validate(backup, current)` — which enforces A–E cell-XML equality (`:143-146`), byte equality of every other ZIP part (`:136-139`) and F–L against the manifest (`:147-152`). That is the test finding 9 asked for; 7 tests passed per your log.

## Remaining actionable defects (none blocking)

1. **Low — dangling section name.** `Home.astro:477` says "listed below in **Coverage**", but that section is labelled "What we cover" / "Someone who's done the job runs your interview." (`:610-611`). The reader has no "Coverage" heading to follow.
2. **Low — contradictory instruction when scripts don't run.** `Home.astro:313-315` ("Adjust the sliders to set what matters most.") stays visible next to the static-example notice and remains each disabled slider's `aria-describedby` target (`:334`). Candidates has no equivalent conflict.
3. **Low — test gap on the de-duplication.** Nothing asserts the removed repeats stay removed (no guard against "We confirm interviewer coverage" recurring in `#experts`, or "Five qualified candidates" reappearing in `.v58-funnel-close`); `funnel-stages.test.mjs:33` covers only the lead.
4. **Trivial — underline overrun.** The payoff underline now spans the trailing NBSP (`Home.astro:168` + CSS `:888-896`), so the red rule runs slightly past "meeting" toward the dash in `/tmp/handoff-thesis-1520.png`.
5. **Trivial — spacing.** In `/tmp/experts-grouped-1607.png` the "Four groups…" line sits tight against "Engineering & infrastructure" and reads as that group's subtitle.
6. **Evidence accuracy, not product.** The eight-suite log in `v60-review-followup-evidence-2026-09-14.md:37-40` still prints the pre-correction experts wording; the shipped file prints "four visible specialisms…" and matches `/tmp/tribera-review-followup-experts.log`. Documented at line 3 of that doc, but that one suite's line in the preview block isn't from the final tree. Also, disposition 11 says "eleven accessible names"; `client-publication.test.mjs:52-53` counts spans without `aria-hidden`, not computed accessible names. And the 1520 hero band is bounded (`home-handoff.test.mjs:30`, <170px) rather than eliminated — `/tmp/v60-hero-1520.png` still shows ~150px above the cue.

## Verdict per finding

| # | Verdict |
| --- | --- |
| 1 Payoff wrapping | **ACCEPT** |
| 2 Mobile coverage | **ACCEPT** |
| 3 Duplicated coverage/copy | **ACCEPT** |
| 4 Funnel lead (R13) | **ACCEPT** |
| 5 Candidate readiness | **ACCEPT** |
| 6 Home lab readiness | **ACCEPT** |
| 7 Indexing default | **ACCEPT** |
| 8 Evidence citations | **ACCEPT** (tests now assert what R31/R25 cite; manifest text refresh still outstanding) |
| 9 Workbook preservation | **ACCEPT** |
| 10 Unsupported-claims guard | **ACCEPT** |
| 11 Marquee a11y | **ACCEPT** (disposition wording overstated, see 6 above) |
| 12 CTA/modal label | **ACCEPT** |
| 13 Apostrophes | No verdict — optional style, retention is a legitimate call |
| 14 Case provenance | **Correctly left open** under R33; I did not close it and no methodology was invented. The hedging asymmetry (`Home.astro:393`, `:453` vs `:448`) is still live and unresolved by design |
| 15 Minor checks | **ACCEPT** (cover added to sweep `home-audit.test.mjs:43`; empty media query gone; article rewrapped at `:7056`; hero capped `Home.astro:740` + gap bound) |

Approved. Seven owner/legal/deployment gates remain open and untouched; I ran nothing and read no binary workbook — all test results cited are from your logs plus the test sources.

