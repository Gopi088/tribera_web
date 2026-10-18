# Homepage Flow Review - 2026-09-14

Review only. No website source or workbook statuses changed in this review.
Fresh desktop/mobile browser captures and section measurements were taken from
the current local site. The current order matches the latest v60 sample; matching
it is not proof of narrative quality. Prior verification addressed component
correctness and exact copy, not the complete reader journey.

## Findings

1. The workflow is introduced too late. The detailed scoring lab appears before
   the visitor sees the staffed service process. Work begins near 5,050px at
   1520px viewport width, and 6,627px at 390px. This risks presenting Tribera as
   scoring software rather than a team doing hiring work.
   Sources: Home.astro #proof (line 238), #work (512), #ways (585).
2. Experts and Coverage answer overlapping questions in distant sections.
   Removing identical role lists fixed duplication inside components but left
   two full sections presenting the same expertise proposition. The full role
   list is still far below the expertise introduction.
   Sources: Home.astro #experts (460), #cover (608).
3. Visual hierarchy is too uniform. Many blocks have full chapter-size padding,
   a narrow stacked heading/lead and a large empty upper-right area. The continuous
   dark lab/funnel block measures roughly 2,359px on desktop and 3,649px on mobile.
   Sources: Home.astro shared section padding (1018-1021); #proof and #funnel.
4. Savings repeats process promises rather than advancing the case. Its Time,
   Cost and Effort labels largely describe the same reduced screening workload;
   the case evidence and buyer payoff are currently separated.
   Sources: Home.astro #funnel (388), #savings (555).
5. The final stretch keeps explaining instead of concluding. Ways introduces the
   commercial options late, Coverage then returns to expertise, and Trust
   reintroduces human judgment. These are useful facts but need distinct jobs.
   Sources: Home.astro #ways (585), #cover (608), #trust (647), #start (688).

## Recommended Story and Visual Chapters

| Order | Chapter                                | Question answered                                       | Treatment                                                                                                                                                                            |
| ----- | -------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1     | Hero and logos                         | What result do I get?                                   | White; existing red accents.                                                                                                                                                         |
| 2     | Concise thesis plus five-step workflow | What is Tribera, and who does what?                     | One introductory white chapter, not two full-height restarts. Acknowledge sourcing or an existing pipeline briefly.                                                                  |
| 3     | Scoring lab                            | How do role priorities change the assessment?           | Dark. Do not describe weighting alone as proof that the underlying interview evidence is trustworthy.                                                                                |
| 4     | Experts plus Coverage                  | Who assesses candidates, and can you cover my role?     | Paper. Four specialisms with all 17 roles grouped locally; regular columns or accessible grouped disclosures on mobile, not ragged chips. Include the human-review explanation here. |
| 5     | Case funnel plus concise benefits      | What work happens before my team sees candidates?       | Dark. Preserve interactions/counts; attach buyer payoff directly to the case. No independent Savings chapter repeating the process.                                                  |
| 6     | Ways to engage                         | Which service fits my situation, and how is it charged? | White. Preserve approved per-hire/per-interview wording and the ranked-list distinction.                                                                                             |
| 7     | Compact assurances                     | What is agreed and checked before we start?             | Paper. Retain an easily scanned assurance/privacy block, but stop re-teaching the engine-versus-person story. No new compliance claims.                                              |
| 8     | Testimonials                           | Has the experience worked for others?                   | Dark. Preserve approved quotes and attribution.                                                                                                                                      |
| 9     | Closing action                         | What do I do next?                                      | White. Short request, not another full pitch.                                                                                                                                        |

The colours express purpose rather than strict alternating bands: white for
orientation/engagement, paper for people/assurances, dark for demonstrations and
evidence. Preserve the existing fonts, red accent, cards and paper shade.

For desktop, pair chapter headlines with their short explanation on the shared
two-column grid where appropriate. Do not apply maximum section spacing to every
sub-block. On mobile, keep the role list regular and nearby, shorten introductions,
and avoid stacking multiple full-height explanations before the workflow.

This is consolidation, not deletion of meaningful information: keep all 17 roles,
both service offers, approved pricing/testimonials, the two protected interactive
models and the existing owner/legal/deployment gates. Preserved case numbers still
require their existing provenance review.

## Claude Review and Reconciliation

Claude's first pass emphasised layout inflation and proposed a minimal reorder.
I challenged leaving Work sixth and restoring ragged chips. The second pass agrees
that earlier process explanation is needed and supports grouping role details.
It recommends retaining a compact assurance block for scanability. The proposed
sequence above places that block before testimonials so the final social proof can
lead directly into the CTA.

### Initial Independent Pass

I read the markup, the sample sections 730–1015, and all seven crops. Here's the review.

## Verdict on the order

Current order does match v60, but v60's own ordering has two real faults (Experts/Coverage split; Savings as a standalone payoff after Work). Most of the "messed up" feeling, though, is layout inflation added locally, not order.

## Recommended order (one coherent journey)

| #   | Section                                  | Job it does                             | Bg    |
| --- | ---------------------------------------- | --------------------------------------- | ----- |
| 1   | Hero + logo strip                        | The promise, and who trusts it          | white |
| 2   | Thesis `#what`                           | What we actually do                     | white |
| 3   | Proof lab `#proof`                       | Why the score is trustworthy            | dark  |
| 4   | Funnel `#funnel`                         | What that costs on one real role        | dark  |
| 5   | **Experts + Coverage merged** `#experts` | Who makes the call, and for which roles | paper |
| 6   | Work `#work`                             | How the engagement runs                 | white |
| 7   | **Ways** `#ways` (moved up)              | Two shapes of that same process         | paper |
| 8   | Savings `#savings`                       | The payoff                              | white |
| 9   | Testimonials                             | Other people confirm it                 | dark  |
| 10  | Trust                                    | How it stays defensible                 | paper |
| 11  | Start                                    | Ask                                     | white |

Only change vs today: Cover merges into Experts, Ways moves ahead of Savings (and swaps bg with it). No new alternation invented; paper/serif/red untouched.

## Five strongest findings

**1. Experts and Coverage say the same sentence 3,286px apart.** `Home.astro:462–471` ("Senior experts who've done the job…") vs `Home.astro:611` ("Someone who's done the job runs your interview") — same claim, two sections, y3982 and y7268. Worse, `Home.astro:477` promises "spanning the roles listed below" and the list is five sections later. **Merge:** keep Experts' heading and four groups; drop the Cover heading/lead entirely; move the 17-role list in under the four groups as the detail; keep the coverage caveat ("we confirm interviewer coverage on the first call") as a one-line foot. Nothing is dropped, one section disappears.

**2. The 17-role list is 941px on mobile because of how it renders, not what it says.** `Home.astro:616–618` emits one `<li>` per row; v60 used wrapping chips (`sample:964`). Render the same 17 roles as wrapping chips and the block goes from ~941px to ~300px. Pure implementation inflation.

**3. Four section heads pin everything to the left third and leave the right half blank.** Visible in `/tmp/flow-experts-1520.png`, `flow-work-1520.png`, `flow-savings-1520.png`, `flow-ways-1520.png`. Trust (`Home.astro:649`) uses the two-column `v58-proof__head` and reads correctly — Savings (`555–563`), Experts (`462–474`) and Work (`514–520`) stack kicker/h2/lead in the narrow column instead. v60 used the two-column head for savings (`sample:915–921`). Restoring that head pattern fixes most of the "empty rhythm" without touching type.

**4. Work and Savings both describe the recruitment path only; Ways arrives after both.** A reader reaches y6392 before learning Interview-as-a-Service exists, having just read a five-step flow that doesn't apply to it. Moving Ways to sit directly after Work makes Savings a payoff for both paths. Also trim Savings: "One call, three names" (`Home.astro:577`) restates the Work flow and "First shortlist in 36 hours" (`566`) restates the hero micro-line (`123`) — keep three cards but reframe the Effort card around what the team stops doing, rather than repeating the flow.

**5. The dark run is two 1,100px+ data sections back to back (3,649px on mobile).** Proof y1623 h1151 + Funnel y2775 h1207. Don't split the colour — the dark run reads as one "machine room" and alternating here would be arbitrary. Condense the funnel's entry instead: `Home.astro:390–395` stacks kicker + h2 + lead + `v58-funnel-context` where v60 used three (`sample:818–820`). Fold the "every square is one candidate" line into the field head caption (`398–399`).

## Is the demo too early?

No — it's the differentiator and it earns the scroll. But it's labelled "How it works" (`Home.astro:241`) while the actual process lives at y5050 under "The work". Re-kicker the lab to something scoped to scoring ("How the score is set", or "The bar, in practice") so "how it works" belongs to Work alone. One-line change, removes the biggest story collision.

## Sample decisions vs local inflation

- **Sample's fault:** Experts/Coverage split (`sample:852`, `957`); Savings as a standalone payoff restating Work (`913`); proof+funnel dark adjacency (`769`, `816`).
- **Local inflation:** narrow-left heads (finding 3); role list as rows (finding 2); the forward reference at `477`; Ways' foot split into three stacked paragraphs (`601–604`) where v60 had one line with the link inline (`952`); the extra funnel intro paragraph (`394`).

Nothing here needs new claims, and the lab/funnel interactions, 17 roles, testimonials, pricing wording and legal gates all stay as they are.

### Second Pass: Narrative Challenge

I re-read the source before answering; both challenges land.

## (1) No — renaming the lab was not enough

I was wrong that a kicker change fixes the collision. The lab isn't ambiguous about _topic_, it's ambiguous about _what you buy_: nine weighted dimensions and a live verdict read as a SaaS tool. A buyer who hasn't met the five-step Work can't tell whether Tribera sells scoring software or a staffed service — and `Home.astro:490` ("the engine handles sourcing and scoring") only sharpens that question. Work at #6 leaves it open for ~5000px. Your fused chapter fixes the actual fault, not the label.

## (2) Chips conceded — the grid already exists

`coverageGroups` (`Home.astro:4–39`) already partitions all 17 roles 6/5/4/2. Render each group's roles as a fixed-column list under its existing `<h3>`, or `<details>` per group on mobile. Regular rows, no ragged wrap, no revert loop, forward reference at `477` dies because the roles sit under the groups.

## Verdict: adopt your structure, with one amendment

It is more coherent than my reorder, for a reason my version missed: it resolves duplication by _ownership_ rather than adjacency. Experts+Coverage becomes "who decides," Ways becomes "engagement terms," and Funnel→Savings finally reads as case-then-payoff instead of Savings restating Work.

**Amendment — keep Trust, slimmed.** You're right that Trust's "A person decides" (`651–664`) duplicates Experts' note (`490`); move that _narrative_ into Experts. But keep a compact late Trust holding the four assurance cards as terms, not story. Two reasons: procurement and legal scan for AI oversight as a block, not inside a roles section; and your pending owner gates stay in one place instead of split across two sections and re-reviewed twice.

## Tradeoffs

- Chapter 1 becomes heavy before any proof — and the barcard SVG and Work's five steps are the same "one bar" metaphor twice. Keep the barcard; let Work be typographic.
- The sourcing/IaaS acknowledgment in Work must stay a clause on "Find & check," or it pre-empts Ways.
- Experts + oversight + 17 roles is one long paper section; the grouped role grid is what keeps it survivable.

No code changed, no claims added, gates untouched.

## Visual Evidence

Fresh captures: /tmp/flow-home-1520.png, /tmp/flow-home-390.png and
/tmp/flow-{proof,funnel,experts,work,savings,ways,cover,trust,start}-{1520,390}.png.
Full-page images were used for colour rhythm; readable section crops and source
were used for copy/hierarchy assessment. No tests were rerun for this review and
no implementation or launch approval is implied.
