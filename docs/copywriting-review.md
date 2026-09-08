# Copywriting Review

Status: in progress

## Scope

Current pages are reviewed against these supplied references:

| Current page                 | Reference page                            |
| ---------------------------- | ----------------------------------------- |
| `src/pages/index.astro`      | `sample_data/tribera-home (1).html`       |
| `src/pages/about.astro`      | `sample_data/tribera-about (2).html`      |
| `src/pages/candidates.astro` | `sample_data/tribera-candidates (1).html` |
| `src/pages/contact.astro`    | `sample_data/tribera-contact (1).html`    |
| `src/pages/blog/index.astro` | `sample_data/tribera-blog (5).html`       |

The review protects the existing direct, evidence-led voice. It separates editorial improvements from factual, legal, product, and commercial claims that require an owner-confirmed source.

## Resolved

- Contact's hero response-time promise now matches the FAQ: one day for hiring teams and two days for candidates.
- Home's hero now explains the method before its outcome claim.
- About's output ratio now reads "One-third the output" rather than the ambiguous "A third less output."
- Blog retention copy now matches the defined retention and purge posture on About.
- Contact pricing copy is clearer without changing its terms.
- Contact and Home had small clarity edits, and Blog's subscription CTA now identifies the next field note.

## Validated Findings

1. Candidates' "Shortlisted everywhere" sits uneasily beside the deliberate selection promise of "one of three." The latter is more specific and defensible.
2. About's "Three times the volume. One-third the output." needs a named comparator, baseline, and source before it can carry headline weight.
3. Quantitative claims need a consistent style and a timeframe where material. Examples include `200,000` interviews, `50+` experts, and contact pricing.
4. Home's hiring outcome sentence is syntactically weak: "three names you'd take any of." A clearer direction is "Three names. You'd hire any of them."
5. About's five-year aspiration should use a concrete horizon when the date is known.
6. Contact pricing should retain its explicit commercial label and distinguish standard hiring fees from volume and RPO work.
7. Blog's retention wording should name the retention period when that period is approved for publication.
8. The numeric motif is a useful brand device, but each use of "three" must remain clear in its local context.

## Findings Requiring Owner Confirmation

- The source, timeframe, and comparator for About's volume/output ratio.
- The source and time period for `200,000` interviews, `50+` experts, and office/client claims.
- Whether candidate distribution can be described as "everywhere," and the exact scope of employer-blocking and anonymity controls.
- The standard pricing basis and the approved public explanation for volume and RPO work.
- The approved retention period and the legal language used to describe it.

## Claude Review Note

Claude Code was invoked successfully through `npx` in a constrained, no-tools pass after full-file traversal timed out on the pages' large inline assets. One Claude finding, that Candidates and About had no CTAs, was rejected after source verification: both pages contain clear actions. The remaining findings above were retained only where they matched the source review.

## Review Order

1. Home
2. About
3. Candidates
4. Contact
5. Blog

## Home Review

Current: `src/pages/index.astro`
Reference: `sample_data/tribera-home (1).html`

### Keep

- "Every name comes with its reasons" remains a strong, differentiated lead.
- The proof sequence from workload, to funnel, to expert judgment, to engagement terms is coherent for hiring teams.
- "The AI recommends. A person decides. Always." is concise and consistent with the trust position.

### Incorporated From Reference

- Restored the fit principle: no candidate is inherently bad; suitability depends on the role, manager, work, and team.
- Restored the hero's second audience path: "I'm looking" now links directly to the candidate section.
- Tightened the reference outcome line to "three names. You would hire any of them" and "one half-hour conversation replaces the other eight."

### Findings

1. Home still says every interview is "kept" in the compounding section. This conflicts with the defined retention posture now used on About and Blog. Replace it only with approved retention language.
2. Material numerical and testimonial claims need an owner-confirmed source before publication: 50 experts, 600 CVs, 11 hours, 126 profiles/five shown, eight interviews per hire, 36-hour shortlist, and customer outcomes.
3. The reference includes an explicit no-cost restart pledge under the three-person hiring promise. The current page should retain an equally clear service-recovery statement if that commercial commitment still applies.

### Proposed Decisions

- Confirm the approved retention wording for Home before changing the compounding copy.
- Confirm which quantified proof points and testimonial permissions may remain public.

### Claude Page Review

Claude reviewed a bounded current-versus-reference Home inventory through `npx`.

- Keep the opening promise, the workload evidence, the 126-to-five funnel proof, "One bar: yours," and the paired hero CTAs.
- Restore the no-cost restart pledge if it remains commercially valid. Claude identifies this as the only clear risk reversal supporting the three-name promise.
- Restore the reference's culture-to-specific-fit logic in the hero: culture, then manager, work, and team.
- Replace the vague "other eight" with a direct comparison to eight interviews.
- Keep the reference punctuation in the fit and human-judgment lines: the colon and semicolon carry the reasoning and parallelism.
- Do not publish the eight-interviews-per-hire industry average without an approved source or attribution.
- Rework the compounding claim only after retention wording is confirmed. "Cheaper" is a commercial claim that needs a mechanism and proof.
- In the closing copy, address the individual visitor: "You are hiring, or you are looking," rather than "One of you is hiring and one of you is looking."

## About Review

Current: `src/pages/about.astro`
Reference: `sample_data/tribera-about (2).html`

### Keep

- The hero's experience statement and the restored story, "The question nobody had a column for," retain the reference's strongest human premise.
- The additional origin-year, team, facts, and forward-looking sections can remain. They are intentional extensions rather than replacements for the reference's core story.
- The current retention debate is a legitimate product distinction and should not be replaced by the reference's score-visibility debate without a product decision.

### Findings

1. The hero's "before we let anyone outside three near it" is unclear. The reference's "outside the three of us use it" names the people and the action, so the current sentence should restore that precision.
2. The current founder letter opens as an abstract explanation of leaving and returning to the industry. The reference earns its conclusion through a specific moment of reviewing notes and finding that the problem was the room, not the person. Restore an equally concrete incident before the point of view.
3. "Three things. The rest we argue about" omits a central operating principle from the reference: judgment evaporates unless it is written down. That principle explains why tribera's interview reasoning has value and should be restored if it remains true of the process.
4. The retention debate is clearer than the current body copy's promise but needs one explicit link to the written-judgment principle: retain reasoning only long enough to improve the next brief, then purge it under the approved policy.
5. The naming section has the three-word cadence but not the reference's explanation of `tribe` and `era`. Add the etymology or another specific origin, otherwise the section reads as a generic values statement.
6. "Three times the volume. One-third the output." remains a headline claim with no visible comparator, timeframe, or source. It should be removed, qualified, or substantiated before publication.

### Proposed Sequence

1. Restore the hero's precise access wording.
2. Rebuild the founder letter around a concrete observed moment, using the reference as the structural model while preserving the current founders' facts.
3. Confirm whether written judgment is an approved operating principle; if so, restore it as the fourth belief and connect it to the retention explanation.
4. Confirm the evidence behind the volume/output ratio before retaining it.

### Claude Review Status

Claude reviewed the compact current-versus-reference inventory through `npx` after a successful authenticated probe.

- Restore "outside the three of us use it" in the hero. Claude identifies the current "outside three near it" as both ungrammatical and vague.
- Restore "Judgment evaporates unless you write it down" as the fourth belief if it remains operationally true. Claude sees it as the missing premise for the product's reasoning and retention approach.
- Make the belief and Debate section prove each other. Either restore the reference's score-visibility question to demonstrate transparency, or retain the intentional retention debate and pair it with the written-judgment principle.
- Replace the founder letter's summary opening with a concrete moment. The reference's own-notes/room-not-person structure is the model; the resulting account must still use only approved founder facts.
- Retain the sharper business-card line, but restore the `tribe`/`era` explanation before Belong/Build/Become and close with a concrete long-term outcome rather than the abstract triad.
- Ground the volume/output ratio in an attributable observation, comparator, and timeframe, or remove it. Claude flags its proximity to the 200k figure as a credibility risk.

## Candidates Review

Current: `src/pages/candidates.astro`
Reference: `sample_data/tribera-candidates (1).html`

### Keep

- The page's candidate journey, controls, interview explanation, team checks, and closing two-door structure all follow the reference and serve a coherent candidate proposition.
- The reference's "Interviewed once. Shortlisted everywhere." headline remains viable only when the following copy makes the controlled distribution model explicit.

### Findings

1. The reference's CV/LinkedIn mechanism paragraph is HTML-commented out in the current hero. Restore it: without it, the page promises one conversation and one-of-three treatment before explaining how the conversation creates a reusable, credible profile.
2. "Shortlisted everywhere" and "travels to every team that asks" imply unbounded distribution, while the profile controls promise candidate-controlled access. Keep the headline, but change the body to say the reasoning is reused only for teams the candidate allows tribera to introduce.
3. "The cheapest way anyone has found" is an unsupported industry superlative. Replace it with "how we tell the two apart" or another claim that belongs to tribera's own process.
4. "Your employer will never know you were here" is an unconditional promise under a section whose controls require candidate action. Use the existing, more precise direction: the employer sees nothing until the candidate decides otherwise.
5. The CV-drop fine print repeats the employer-privacy promise while referring to tribera. State the product boundary directly: no account or email is stored until the candidate chooses to continue.
6. The `85%`, `3 weeks`, and `1.8 offers` figures need an approved population and timeframe. The repeated three-week label should be differentiated so the evidence block does not merely restate the timeline.

### Claude Page Review

Claude reviewed a compact current-versus-reference inventory through `npx`.

- The commented-out hero paragraph is the necessary bridge between the interview promise and the one-of-three outcome.
- The central contradiction is unbounded language ("everywhere" and "every team that asks") versus the controlled-release model. Scope the body copy to the candidate's explicit release choice.
- Remove the unsubstantiated "cheapest way anyone has found" claim.
- Make the employer-privacy headline conditional on the controls rather than presenting it as an unconditional system guarantee.
- Separate the CV-drop privacy wording from the employer-control promise.
- Retain the outcome statistics only with an approved period and population qualifier.

## Contact Review

Current: `src/pages/contact.astro`
Reference: `sample_data/tribera-contact (1).html`

### Keep

- The tiered response promise is an intentional and necessary correction to the reference: hiring teams receive a reply within one day and candidates within two. It matches the responder card and the candidate journey.
- The current "The next step is never a mystery" is clearer than the reference but loses the product's black-box callback; this is an editorial choice, not a factual issue.

### Findings

1. Pricing says volume and RPO work will be explained "on the call," but the page only offers a message form and a promised written reply. Change this to "in our reply," or add a real booking path.
2. The `15–20%` fee has no stated base. Confirm whether it applies to first-year base salary or another defined figure, and publish that basis if approved.
3. The after-send heading should either restore the reference's "No black boxes here either" callback or name the actual action: a reply from the person who read the message rather than a queue.
4. "Urgent messages move to the top" has no visible urgency control and weakens the fixed reply promise. Remove it unless the form gains a defined urgent path.
5. The tiered response time appears in the hero, responder card, and form beside the `36 hours` shortlist outcome. Keep the tiering, but avoid competing time promises by making the hero/form point to the named responder and label the 36-hour commitment as a role-delivery outcome.
6. The global-hiring statement needs an approved, specific delivery scope. The page only otherwise establishes Pune and Bengaluru as operating locations.

### Claude Page Review

Claude reviewed a compact current-versus-reference inventory through `npx`.

- It confirms that the reference's single one-day promise conflicted with its own candidate `<48 hours` responder card; the current tiered promise should remain.
- It flags the pricing call-to-action mismatch and undefined percentage base as the two highest-priority items.
- It recommends removing the unsupported urgency priority unless the form exposes a real mechanism.
- It recommends narrowing or evidencing the global-coverage language.

## Blog Review

Current: `src/pages/blog/index.astro`
Reference: `sample_data/tribera-blog (5).html`

### Keep

- "Keep the record for a defined period" is an intentional privacy correction to the reference's unqualified "keep it." It remains aligned with the About and Home retention posture.
- The field-notes framing, archive structure, and the "no thought leadership" stance match the reference and establish a useful evidence-led editorial voice.

### Findings

1. The newsletter form sends an email address through `GET /subscribe`, placing it in URLs, history, and request logs. Confirm the subscription endpoint accepts `POST`, then change the form method.
2. Newsletter cadence contradicts itself: "Once a month, at most" is a ceiling, while "Roughly one email a month" is an average. Choose the approved policy and state it identically in both places.
3. The reference's "unsubscribe link that works on the first click" is not present. Add it only after confirming the email provider implements one-click unsubscribe without a confirmation or preference-centre detour.
4. "Things we got wrong" is not substantiated by the visible archive excerpts, which mostly demonstrate data and outcomes. Surface an article that owns a mistake, or narrow the hero promise.
5. "We publish when we have something to say" and "Each of these came out of a mandate" are broad claims. Use "most" unless every current and future article can be traced to a mandate.

### Claude Page Review

Claude reviewed a compact current-versus-reference inventory through `npx`.

- It correctly flags the `GET` subscription form and cadence inconsistency as high-priority issues.
- Its request to revert the defined-retention wording is rejected: this would conflict with the approved privacy posture elsewhere on the site.
- The first-click unsubscribe promise requires an implementation check before publication, not a copy-only change.
- It recommends substantiating the "things we got wrong" promise and softening the all-mandates statement unless it is universally true.
