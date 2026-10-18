# Independent Claude Review

Initial visual/source review. Several factual claims below are rejected; see the main review and claude-primary-corrected.md before using these recommendations.

## Typography Review — Home, Candidates, About

### 0. Data & method limits
- No live browser session — findings come from a static rendered-DOM audit (text + computed px/line-height/width per node) captured at 390/768/1520, plus static PNG crops and source reads. I did not verify hover/focus states, animation-in-progress states, or intermediate breakpoints (e.g. 900–1519px, 800–1519 for `.site-editorial`).
- The audit's reported "width" is the element's box width, not necessarily glyph/line width — for `text-wrap: balance` headings this can be ambiguous. Where a `max-width: Nch` rule exists in source but the audit shows a full-`wrap`-width box, I flag it as **unverified** rather than asserting it's broken or fine.
- Three independent CSS implementations exist for the same nominal scale: `EditorialPage.astro` (global, used by About), `Home.astro` inline `<style>` (home only), and a `c-*` system for Candidates (not shown here but inferred from class names/numbers). `EditorialHeading.astro` is a fourth, mostly-unused-for-h2 component. I did not get to fully read the candidates CSS file — treat candidates-specific max-width/measure claims as inferred from rendered output, not confirmed source.

---

### 1. The shared cascade (what's actually true)

All three pages independently define the **same nominal H2 scale**: `clamp(2rem, 3.9vw, 3rem)` → 30px @390 → 32px @768 → 48px @1520, line-height 1.08, Fraunces 500. H1 is one step up: `clamp(2.08rem, 4.48vw, 3.32rem)` → 31–36px @390/768 → 53–62px @1520 (About's H1 hits the full 62px because its container is wider; Home/Candidates H1 tops out lower because it's center-constrained).

So: **there is no font-size drift on H2 anywhere in this audit.** Every section H2 on every page renders 30/32/48 (with two legitimate, deliberate exceptions noted below). The "Senior experts" heading is not larger than its peers — it *reads* larger because of what follows.

### 2. Why "Senior experts" feels oversized — root cause, not font-size

Confirmed in `Home.astro`:
```css
.v58-proof__head h2 { max-width: 20ch; }
.v58-proof .v58-proof__head h2 { max-width: 14ch; }   /* only inside #proof */
```
`#experts` reuses the `.v58-proof__head` markup pattern but is **not** inside `.v58-proof`, so it only gets the looser 20ch measure, not the 14ch one used for `#proof`'s own heading. Combined with the copy itself — *"Senior experts who've done the job — held to one bar: the one you set."* (73 characters, one continuous clause) — this is the **longest, least-broken H2 sentence on either page**. Compare:
- `#work`: "You set the bar.We do the work to it." — two short, hand-broken clauses (~38 chars total)
- `#tally` (candidates): "The same experience.A different picture." — same pattern
- `#experts`: one long unbroken sentence, no forced break, wraps at ~35–40 chars/line into two heavy 48px lines that fill the full measure

Every other flowing single-sentence H2 on the page (`#funnel` "Nobody shows you the funnel.", `#ways` "Either way, three worth the interview.", `#trust` "Clear criteria. Clear responsibilities.") is short enough to hold 1 line even at full 1160px width. `#experts` is the one place where length + measure + a single 48px size stack up. **This is a copy/measure problem, not a type-scale problem.**

### 3. Critique of the prior proposal (36px desktop / 28px mobile for all peer H2s)

Reject as stated. Reasons:
1. **It doesn't fix the actual cause.** Shrinking every H2 site-wide to 36/28 would shrink `#funnel`, `#ways`, `#trust`, `#what`, `#work` — all of which render fine as single short lines today — to solve a problem that's specific to one heading's copy length and measure. The complained-about heading would still wrap to two lines at 36px, just marginally less heavy.
2. **It flattens an intentional hierarchy.** H1 (53–62px) → H2 (48px) is currently only a ~15–25% step at desktop. Cutting H2 to 36px doubles that gap for no stated reason, and does nothing for H1, which isn't in question.
3. **It's page-blind.** About's H2 in `#name` ("Tribe, and era.") is one short line at 48px and reads correctly weighted against its dark, sparse section — shrinking it would under-power a section that's currently balanced.
4. **28px mobile would collide with H3.** On Candidates mobile, `#profile-panel` H3 is already 28px (`Senior backend engineer`). Pushing peer H2s down to 28px would put section headings and card subheads at literally the same size, destroying the H2/H3 distinction the audit currently preserves (30px H2 vs 24–28px H3 on mobile).

The right fix for the actual complaint is narrower: give `#experts` the same tightened measure `#proof` already gets (`max-width: 14–16ch` inside `.v58-experts`), or hand-break the sentence like its siblings do. That's a one-rule/one-line change, not a global rescale.

### 4. Confirmed inconsistencies (worth fixing)

| Issue | Evidence | Severity |
|---|---|---|
| `#experts` H2 measure not tightened like `#proof` despite sharing `.v58-proof__head` | Home.astro:1027–1044 | High — this *is* the user's complaint |
| H3 is used for three unrelated visual roles: 24–28px serif "subsection" titles (`#experts` coverage groups, `#ways` "We find them"), 16–18.75px serif "card title" (About `.dek` sections, `#trust`, `#when`, `#controls`), and 16px **sans-serif bold** "process-step label" (`#work` flow steps, `#when` steps) | home.md lines 23,35,53,59; candidates.md lines 49,92 | Medium — same tag, three unrelated type families/weights/sizes; a screen-reader/heading-outline user gets no consistent signal from `<h3>` |
| Three parallel CSS implementations of the same nominal scale (`EditorialPage.astro`, `Home.astro`, candidates `c-*`) | source reads | Medium (maintainability, not visual) — identical numbers today only by coincidence/copy-paste discipline; future edits will drift silently |
| `v58-coverage__focus` ("System design and scale...") renders at 17px/28.05 — larger font-size than the H3 "Finance & risk" *and* the H4 card body copy elsewhere (14–16px) despite being body/supporting text, not a heading | home.md lines 36,38 | Low-medium — it's legitimately a "focus statement" role but its 17px exceeds most H3 card-title sizes (16–16.5px) on the same page, which is visually backwards for a `<p>` vs `<h3>` |

### 5. Legitimate variants (not inconsistencies — leave alone)
- H1 > H2 globally (53–62px vs 48px desktop): correct, consistent hierarchy across all three pages.
- `#proof` H2 narrower measure (14ch) than other H2s (20ch default): intentional, and it's the "controlled" example of the pattern `#experts` is missing.
- Dark-section H2s (`#proof`, `#funnel`, `#voices`, `#year`, `#whynow`, `#name`, `#ahead`) using white/rgba text on charcoal: consistent role, just a color variant, not a size variant.
- Card/metadata paragraphs like `.v58-coverage__focus`, `.c-micro`, `.p.feat__k` (mono, small, muted): these are metadata/supporting-statement roles, not misclassified subtitles — correctly distinguished from `.v58-lead`/`.c-lead`/`.dek` which are the true section subtitle role (16–19px, sans, muted grey, consistent across all three pages at every breakpoint).
- H4 usage (`#profile-panel` card titles 18.75–20px, `#funnel` benefit-card titles 17.25–18.4px): both are legitimately "card title inside a component," smaller than H3, larger than body — consistent role even though absolute px differs slightly between the two components (expected, different card widths/contexts).

### 6. Role-based recommended scale (not a blanket number change)

Instead of one flat 36/28 rule, define roles and hold each to its own consistent number:

| Role | Desktop (1520) | Mobile (390) | Notes |
|---|---|---|---|
| Hero H1 | 53–62px (current, keep clamp) | 31–36px (current) | No change |
| Section H2 — statement/thesis (short, ≤~45 char, hand-broken) | 48px (current) | 30px (current) | No change; this is the majority case and already works |
| Section H2 — long unbroken sentence (`#experts` today) | 48px **but measure capped ~16–18ch**, or break the sentence into two clauses like its siblings | same, cap measure | Fixes the actual complaint without touching the other 8 H2s |
| Card/coverage subhead (currently H3, 24–28px serif) | 24–28px, keep serif | 22–24px | Keep distinct from process-step label below |
| Process-step / small-card label (currently H3, 16px sans bold) | 16px sans, semibold | 16px | Consider reclassifying to a styled `<h4>`/`<p>` since it's visually and semantically a label, not a subsection heading — stop overloading `<h3>` |
| Card title inside component (H4, 17–20px serif) | 17–20px | 17–18px | No change |
| Section subtitle (`.v58-lead`/`.c-lead`/`.dek`) | 16–19px sans, muted | 13–16px | No change, already consistent |
| Metadata/kicker/focus statement | 8.4–10px mono or 17px sans (coverage focus) | same | Flag `.v58-coverage__focus` 17px as slightly oversized relative to its H3 sibling; consider dropping to 15–16px |

### 7. Page-by-page disposition

**Home** — Primary fix target. Only real defect: `#experts` H2 measure/copy-length interaction. Everything else on the page (H1, other 8 H2s, H3/H4 card roles, `.v58-lead` subtitles) is internally consistent across 390/768/1520. Do **not** apply a global H2 resize.

**Candidates** — No H2 font-size issues found; scale matches Home's numbers exactly at every breakpoint. `#score-title` and `#tally` both use the same short hand-broken-clause pattern that keeps them well-behaved at 48px. The one thing worth a second look (not confirmed, needs source read of the `c-*` stylesheet): whether `c-scorecard` H3 dropping from 24px (390/768) to 22px (1520) is an intentional refinement or an accidental non-matching breakpoint step — inconsistent with every other H3 on the page, which scales up, not down, at 1520.

**About** — Scale matches Home/Candidates exactly. No H2 size defects. Two short single-line H2s (`#name` "Tribe, and era.", `#facts` "The plain facts.") correctly stay compact; longer ones (`#ahead`) correctly wrap to 2–3 lines without feeling heavy because, like Home's well-behaved sections, the copy is hand-broken/short per line. This page is the cleanest of the three and a good reference for what "correct" looks like — no changes recommended.

**Bottom line:** don't rescale the H2 system. Fix `#experts`' measure (or its copy), and separately consider splitting the overloaded H3 role in the shared component set into "subsection title" vs "process-step label" so the tag maps to one consistent visual weight per page.
