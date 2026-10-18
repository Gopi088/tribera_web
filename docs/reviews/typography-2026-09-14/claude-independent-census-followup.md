# Typography follow-up — read-only

## 1. The eight metadata selectors: confirmed 12px

All eight are at 12px across all four widths (320/390/768/1520) in the latest `groups.tsv`. This reverses the prior census's finding #1, which was reading a pre-fix capture.

| selector                        | route                                                      | sizes       | family         |
| ------------------------------- | ---------------------------------------------------------- | ----------- | -------------- |
| `span.oc__m` (×8 cards)         | `/services/`                                               | 12/12/12/12 | JetBrains Mono |
| `p.rec__k`                      | `/services/`                                               | 12/12/12/12 | JetBrains Mono |
| `p.jd__k` (×2)                  | `/careers/ai-ml-engineer/`                                 | 12/12/12/12 | JetBrains Mono |
| `p.crumb` (+ `a`, `i` children) | `/careers/ai-ml-engineer/`                                 | 12/12/12/12 | JetBrains Mono |
| `i` in `span.ind__w`            | `/functions/`                                              | 12/12/12/12 | JetBrains Mono |
| `span.qq__k` (×2)               | `/functions/data-analytics/`                               | 12/12/12/12 | JetBrains Mono |
| `a.atag`                        | `/blog/designing-ai-for-high-stakes-technical-assessment/` | 12/12/12/12 | JetBrains Mono |
| `span` in `p.door__next`        | `/about/` and `/blog/`                                     | 12/12/12/12 | JetBrains Mono |

Two notes on reading that table:

- `.ind__w i` is 12px while its parent `span.ind__w` stays 14px Inter Tight. That's the intended label-inside-action pairing, not a partial fix.
- `.atag` appears on **one** route in `groups.tsv`, not seven. That is a property of the TSV, not of the fix — see §3.

`p.door__k` still differs by family across routes (`/about/` JetBrains Mono, `/blog/` Fraunces, both 12px). Unchanged, as you specified.

## 2. Screenshot scope — 1 of 34, not 3

I viewed **only `services-offers-390.png`**. I did not open `career-details-390` or `about-doors-1520`, despite selecting them. Treat the visual pass as one image.

What that one image supports: the eight offer cards render `oc__m` as a small mono metadata line — legible, not clipped, red emphasis on "Part on hire"/"Fixed price" preserved, hierarchy intact against the Fraunces card titles. `4–18 months · Build + operate · Fixed price` wraps to two lines at 390; that is a wrap, not an overflow.

What it does not support: only the first card ("Executive search") is expanded, so the body typography of the other seven collapsed cards is unseen. `rec__k` lives in the `#rec` section, outside this crop, so it is confirmed by data only. And at this scale I cannot distinguish 12 from 12.5 — the image is a gross-break check, not a size confirmation.

## 3. `groups.tsv` is a style table, not a route-coverage table

It collapses across routes and shows the first route only. Evidence from the file: `/blog/designing-for-trust.../` contributes 4 rows, `/blog/rethinking-hiring-metrics.../` contributes 1, and `/blog/signal-vs-noise-technical-hiring/` and `/blog/why-tech-hiring-really-takes-so-long/` contribute **zero**. Their text is style-identical to contexts already recorded.

So the 1001 TSV rows cannot tell you a route was covered, added, or dropped. I did separately confirm from `inventory.json`'s route strings that there are **76 distinct routes × 4 widths = 304 records**, matching your figure.

## 4. Remaining same-key size splits — exactly two

A file-wide search for a width appearing twice in one row returns two hits, down from many in the prior grouping:

- `p.fct__n` in `div.fct`, `/about/` — `320:30,22.5 · 390:30,22.5 · 768:30,24 · 1520:44,40`
- `span` in `div.c-weights-heading`, `/candidates/` — `10,9` at every width

Per your constraint I am not reading these as interactive states. They are sibling elements sharing a grouping key. The `c-weights-heading` pair is two unclassed sibling spans and looks like a label/unit pairing — benign.

`fct__n` is the one I'd actually eyeball. The ratio between the two sizes is not constant across widths (0.75, 0.75, 0.80, 0.909), which is more consistent with a length-dependent shrink on longer fact values than with one scale step. I did not view a screenshot covering the `/about/` facts block, so this is a data observation only, not a confirmed defect.

## 5. Automated scope vs. visual scope

**Short labels are now covered.** The contract keys every text row regardless of length, and `tests/text-inventory-contract.test.mjs` proves an unreviewed short label is rejected (`new-short-label` mutation). That is real coverage the ≥50-character prose test never had. You report the current page-specific contract at 17468 keys with new-label/size/weight/color/italics mutations all passing — I read the contract _before_ that rewrite, so I am taking the key count and the five mutation results from you rather than confirming them. The version I read keyed on `[width, selector, context, kind]` with no route; adding the page dimension addresses the cross-route blind spot I would otherwise have raised here, so I am not raising it.

**Interactive states are captured but not asserted.** In the version I read, `scripts/test-reviewed-site.mjs:56` runs the CI capture with `AUDIT_STATES: '0'`, and `scripts/text-inventory-contract.mjs:10` filters to `s.name === 'default'`. If that is still true, the 751 states in `/tmp/tribera-all-text-states-final` are a manual artifact with no automated gate behind them — a typography regression in a hover, expanded panel, tab, preset or slider state would not fail CI. This is the largest remaining gap between your visual/manual scope and your automated scope.

**The `--record` guard checks quantity, not health.** `assert(records.length >= 304, ...)` does not check that `errors` is empty, that `states` is non-empty, or that all 76 routes × 4 widths are present. A capture where most routes failed still pushes a record per route/width and still satisfies the assertion. The verify branch has no floor either: an empty fixture compares equal to empty actual, passes, and prints `0 independent text-context/width contracts passed`. CI is protected by a different mechanism — `audit-all-text.mjs:219` sets a non-zero exit and `test-reviewed-site.mjs:15` throws on it — but `--record` is run by hand, outside that path. Worth tightening the assertion to per-route/width completeness plus zero errors. (I read this before the page-specific change; the constant may have moved.)

## 6. What I did not inspect

- **`/tmp/tribera-text-inventory-diff.json` — not opened at all.** The 17788 matches / zero family-weight-style-color differences claim is unverified by me.
- **The states capture** — I listed filenames only (and the listing truncated at 100 of 661). The 152 records / 751 states / zero errors / zero control failures claim is unverified by me; I opened no state screenshot.
- **`inventory.json` body** — I grepped route strings only. My attempt to enumerate non-default state names was inconclusive because the file is a single line, so a line-count grep says nothing about occurrences.
- **`groups.tsv` lines 478–1002** — read in full only to line 477. The rest is covered by file-wide greps for the eight selectors, `door__k`, and the duplicate-width pattern. The duplicate-width sweep was file-wide, so §4 is complete; a different class of anomaly in the unread portion would not have surfaced.
- **`tests/discovered-text-coverage.test.mjs`** — not read this session. I have not re-verified the prior census's claim about its ≥50-character prose limit.
- **33 of 34 screenshots**, and the contract/test files as they stand after the page-specific rewrite.

I ran nothing; bash was sandboxed to the repo, so all `/tmp` evidence came through read and grep.
