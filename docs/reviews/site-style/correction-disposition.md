# Site-Wide Review Corrections

Review date: 2026-09-08. Local worktree only; no deployment or commit.

## Implemented

- Shared editorial boundary, hiring typography/palette, left section headings,
  consistent cards and shared header/footer across the public route inventory.
- Font loading corrected so switching audiences does not lock one page into a
  fallback font and move the navigation.
- The full navigation geometry now lives in the shared shell, including legacy
  page logo width, link spacing and the stray mobile-menu top margin.
- Contact page now posts the existing contact schema to the inquiry endpoint,
  with hiring/candidate context, accessible feedback and tested error/retry/success.
- Services recommendations and accordions now operate; permanent-hire copy shortened.
- Intelligence chart caption explains relative gap shares rather than pass rates;
  availability caption no longer makes a false largest-pool claim; dead CTA fixed.
- Topic filters have readable foregrounds, active states and human-readable labels.
  Article cards use one consistent grid pattern instead of asymmetric masonry.
- Blog index derives all seven article links and filter counts from the post data.
  The assessment article's teaser and reading-time metadata match its public article.
- Careers roles and initial scorecard render server-side, then filter/switch with
  JavaScript. Seven role links remain useful without JavaScript.
- Job interview copy now refers to someone who has done the work, not always an
  engineer. Growth-intern experience no longer repeats the employment type.
- Function-page corrupted words and incomplete sentences corrected. Example weights
  normalized proportionally using largest-remainder rounding to total exactly 100.
  Function index consumes the detail-page data, avoiding divergent duplicate values.
  Charts explicitly describe examples, not universal or owner-approved hiring bars.
- Candidate profile form uses readable light-surface labels. Existing file validation
  and submission contracts retained.
- Readable-state review caught a white nested upload label and pale filename in the
  enabled form. Explicit dark foregrounds now cover both nested label and filename.
- Follow-up included collapsed FAQ text and corrected further SRE/security/finance
  sentences. Regression checks guard the reviewed corruption patterns and totals.
- Terms disclaimer heading punctuation corrected without changing legal substance.

## Findings Not Treated As Bugs

- Candidate submit button: it really is disabled before a CV is chosen. Do not make
  the empty form look submit-ready merely to match a screenshot. Test the enabled
  state after a valid upload; preserve disabled, submitting, error and success states.
- Coverage FAQs: native details/summary controls expand correctly. A screenshot of
  their collapsed state is not evidence of missing answers. Review copy captures
  now include closed details content, and interaction tests check expansion.
- Topic membership: cards show the category and at most two tags, not all tags.
  A different active topic can legitimately contain that same article. Do not alter
  taxonomy to match the subset of badges shown on a card.
- Historical five-person shortlist versus the three-person offer: preserve the
  user-confirmed case funnel; do not rewrite history to match a product promise.
- Long-form article arguments, testimonial wording and legal definitions retained.
  Similar themes across articles are not grounds to rewrite published substance.
- No testimonial section was added to coverage detail pages solely because the
  hiring page contains one. Shared style does not require identical page contents.
- Surface color represents section purpose, not audience. The hiring page itself
  alternates dark and light sections; the dark contact form is intentional.
- Seven genuine roles leave one card in the last row. No placeholder eighth job
  was invented to fill a grid. Cards within each populated row share their height.

## Owner Evidence Required Before Release

Claude's visual/copy review is not evidence for these factual or contractual claims:

- Interview volume, market statistics, salary/availability figures and named research.
- Client names/logo permissions, testimonial consent, expert names/tenure and outcomes.
- 36-hour targets, response SLAs, restart guarantees, live job openings and headcounts.
- Service prices, percentage fees and any savings/retention claims.
- Legal entity/address, liability cap, current privacy/security practices and dates.

These are tracked separately from implemented design/code fixes. No evidence was
invented, no legal commitments changed, and no production release was authorized.
