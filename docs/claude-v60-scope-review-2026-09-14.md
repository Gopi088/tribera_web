## What I read

`sample_data/tribera-home-v60 (2).html` (full body), `src/components/home/v58/Home.astro` (frontmatter + all markup), `docs/excel-bug-status.json` (rows 2–47), `docs/website-bugs-rca-2026-09-13.md`, `docs/claude-excel-status-review-2026-09-13.md`, `docs/website-bugfix-verification-2026-09-13.md`, `tests/home-handoff.test.mjs`.

**Could not open:** both `.xlsx` files and `Tribera-Fix-Handoff (2).docx` — binary formats, and I have no shell in this session. So the latest R7/R9/R11 wording and the four new rows (48–51) are taken from your message, not verified against the sheet. I made no edits and ran nothing.

## Priority ladder (recommended)

1. **Owner/legal gates** (R23 guarantee, R28 expert claims, R29 address, R33 statistics, R34/R37 legal) — never closed by copy, from any source.
2. **Latest workbook recommendations** (R7, R9, R11 + rows 48–51) — newest owner instruction; **beats the sample wording**.
3. **Handoff structure** (order, remove 1-2-3, preserve lab data/interactions and funnel sequence).
4. **Sample v60 copy** for anything rules 1–3 don't touch.
5. **Previously reviewed fixes stand** unless 2 or 3 overrides them: 32h, 126/40/14/5/2, 17 roles, approved 11-name client list, guarded pricing and consent copy.

The key insight: **the v60 sample predates the latest workbook on at least two lines.** R7 quotes "Three worth meeting. The proof to choose." and R11 quotes "Senior experts who've done the job, and one bar. Yours." — both appear _verbatim_ in the sample (lines 738 and 855). The sample is the artefact being reviewed, not the fix. R9 is the opposite case: the sample (line 790) already carries the requested fix and the repo does not.

## Structure: only three edits needed

Current: hero → logos → **intro (1-2-3)** → thesis → proof → **experts (coverage nested)** → **funnel** → work → benefits → ways → results → trust → start.

| #   | Edit                                                                                | Notes                                                               |
| --- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 1   | Delete `#in-three-steps` (`Home.astro:155-183`)                                     | Its "the bar" definition moves into the hero lead — do not lose it. |
| 2   | Swap `#experts` and `#funnel`                                                       | Funnel before experts.                                              |
| 3   | Lift `#cover` out of `#experts` into its own section between `#ways` and `#results` | Keep `id="cover"` so nav/footer anchors survive.                    |

`#benefits` already sits between `#work` and `#ways` — it _is_ the savings slot; retitle/repoint it rather than adding a section. That yields your target order exactly. Before removing the intro, check nav and footer link lists for `#in-three-steps` (I did not audit those files).

## Copy decisions

**Adopt from sample**

- Hero lead (line 710) — "Every role has a bar — what 'good' looks like for it…". This is the load-bearing change; it's what makes R3, R4 and R11 coherent.
- Lab default note (line 790) — matches R9 exactly.
- Funnel step titles "HR interviews" / "Technical interviews" — cleaner than "A first conversation" and still satisfies R14.
- Experts lead "…and the bench grows with demand" — consistent with the R22 resolution.
- Savings/coverage section framing and headings (see below).

**Use latest workbook, not sample**

- R7 thesis payoff → workbook string, replacing _both_ the sample's flagged line and the current interim `"That's the Tribera Three. Recruitment never gave you that."` (`Home.astro:195-203`).
- R11 experts H2 → workbook string; the "one bar" is now anchored by the hero.

**Reject from sample**

| Sample string                                                                          | Why                                                                                                                                                         |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "About **38 hours** stayed with the hiring team" (839)                                 | 38h = 126×4min + 40×45min, i.e. it counts Tribera's _own_ HR interviews as client time saved. Keep the protected 32h.                                       |
| "never a percentage of the salary" (952)                                               | Contradicts the 15–20%-per-hire model recorded in RCA R37. Keep "pricing agreed for the engagement".                                                        |
| "You interview three, hire one" (942)                                                  | Guarantee-adjacent; R23 still Pending–owner.                                                                                                                |
| "Recorded with consent, DPDP-aligned… export/delete on request" (994)                  | R34 Pending–legal. Keep the guarded trust card.                                                                                                             |
| "Protected attributes stay out. Scorecards are audited for adverse impact." (993)      | Asserts an audit programme. Unverified.                                                                                                                     |
| "It can't reject anyone." / "A person decides. **Always**." (986, 991)                 | Absolutes; current "The engine scores. A person decides." is defensible.                                                                                    |
| "screened on 100+ signals" (829), "close to a hundred checks on the resume" (809, 893) | Unsourced quantified method claims.                                                                                                                         |
| "questions the engine writes from the role **and the candidate's own CV**" (872)       | Reinstates the exact CV-only wording removed under R24.                                                                                                     |
| Bench tenure figures — 11 yrs, 9 yrs, 13 yrs… (859-869)                                | Same class as R28 (Pending–owner). Current non-numeric coverage groups are safe.                                                                            |
| "They hired two" (JS `LBL[5]`), "126 in play" (823)                                    | Regress the R16 pronoun fix and weaken the R15 denominator fix.                                                                                             |
| "all five hireable" (833)                                                              | Beyond the case record; "Five qualified candidates" is what's supported.                                                                                    |
| 14 coverage chips (964)                                                                | Drops Networks & DC, Capital markets, Manufacturing — and contradicts the sample's _own_ bench, which lists all three. Keep the 17-role inventory from R12. |

**Two judgement calls worth raising with the owner**

- Lab lead "**One real candidate**… his scores never move" (776) plus first-person evidence lines ("flagged the two gaps before I asked", 1184). Current copy says "This AI-security example". If this is a real anonymised interview, the sample wording is stronger; if not, it's an authenticity claim. Also: the site is currently pronoun-free about this candidate; the new copy introduces "his/he". Either is fine — just decide deliberately.
- The sample drops the "How the score is calculated" `<details>` + table (`Home.astro:375-400`). That block is what carries the R25/R44 comparability caveat. Keep it.

## Savings and coverage without new guarantees

**Savings** — one rule: every number must already be published and case-scoped.

- _Time_: "First shortlist in 36 hours" (already live in hero and CTA). Skip "Weeks → 36 hours" — the "weeks" baseline isn't yours to assert.
- _Cost_: reuse the **32-hour** estimate, labelled as the estimate from the Bengaluru case, not a per-role promise. **Drop the animated cost bar** (`.cost-bar` → fixed 72%, labelled "Manager hours handed back"): a hard percentage with no source, rendered as a measurement. Also drop "no re-opening the role with a new agency" — that reads as the R23 restart guarantee.
- _Effort_: "One call, three names" is safe and matches the existing third benefits card.

**Coverage** — adopt the sample's split (experts = who and why; coverage = what) and its two honest lines: "no role stalls for lack of the right interviewer" and "if we can't cover a role, we tell you on the call, not three weeks in". Keep all 17 roles and the existing "We confirm interviewer coverage on the first call."

## Assertions that pin the current state

These encode copy/structure the handoff changes, so they move _with_ the work rather than being deleted:

- `tests/home-handoff.test.mjs:29-40` — logo-strip→intro→thesis adjacency and the three-step grid geometry.
- `:44-46` — the "Tribera Three" claim string.
- `:51` — experts H2 must match `/your requirements/`.
- `:52` — `.v58-coverage__roles li` count of 17; the selector survives the move, the section it lives in does not.
- `:65-70` — lab default note and the LLM-preset note ("both scored 2 out of 5").
- `:58-59` (hiring team, 32 hours) and `:24-27` (cue clearance) should be unaffected — keep them as the guard on what must _not_ drift.

**One concrete risk in adopting the sample's preset notes:** the sample's llm note asserts "the verdict moves to Grey", but the sample uses different preset weight arrays (`PRE`, line 1187: `llm:[6,6,24,10,8,20,8,6,12]`) and a normalised formula against the repo's 0–12 sliders. Don't port note text that names a band unless the _current_ arithmetic actually produces that band — otherwise the note contradicts the number on screen.

## Open gaps

1. `docs/excel-bug-status.json` is keyed to `(1).xlsx` and covers rows 2–47. The latest is `(2).xlsx` with 50 rows. Rows 48–51 are unreviewed, and the JSON's R7/R9/R11 outcomes are now stale against the newer sheet. Re-extract to JSON and re-run the row reconciliation before any of the 50 is called verified.
2. Row 7's `claude_review` already says the v60 treatment "has not been reviewed by Claude" — this review covers the sample's _copy and structure_ only, not the layout/column-proportion work recorded there.
3. Sample-only interactions (tap-a-score evidence panel, square hover peek, testimonial marquee, expert hover flip, trust hover chips, count-up numbers) are outside "COPY + STRUCTURE only" — recommend deferring all of them. The evidence panel is the one worth revisiting, and it needs owner sign-off on nine real evidence lines first. Also keep the seeded Fisher-Yates scatter (`Home.astro:66-74`); the sample uses `Math.random()`, which would break SSR stability.
