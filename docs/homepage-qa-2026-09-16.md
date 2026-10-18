# Homepage QA - 2026-09-16

## Scope

Local production preview of the current worktree, not the deployed website.
Approved v61 copy, named experts, colours and layout were retained. No real
enquiries were sent, and nothing was committed, merged or deployed.

## Findings And Fixes

- The enquiry popup left keyboard focus behind the overlay and did not trap or
  restore focus. Added dialog semantics, accessible field names, initial focus,
  Tab wrapping, Escape handling and focus restoration.
- A success timer or response from an earlier opening could affect a reopened
  popup. Opening/closing now invalidates stale UI responses and clears the timer.
  This does not cancel requests already received by the server.
- The scoring regression test expected superseded emphasis text and exact old
  button dimensions. Updated it to the approved markup and shared action size,
  retaining mobile touch-target and interaction checks. No scoring implementation
  change was required.
- Added enquiry lifecycle coverage and included it, along with responsive scoring
  coverage, in the reviewed-site test runner.

## Verification

The baseline production run passed hero-viewport, home-handoff, home-audit,
home-operations, v61-approvals, experts-layout, funnel-stages, audience-nav,
nav-contrast, home-refresh, nav-refresh, contact-journey and
site-hover-regression. The corrected proof-responsive test subsequently passed
at 320, 390, 820 and 1555px.

The final production rebuild completed successfully with 76 pages. Astro checked
259 files: zero errors, zero warnings, 146 hints. Targeted ESLint, Prettier and
`git diff --check` passed.

The rebuilt enquiry test passed at 320, 390 and 1520px, covering validation,
mocked failure/retry/success, keyboard focus, stale timers/responses and reopening.
Final production reruns of home-audit, home-handoff, proof-responsive and
hero-viewport also passed. No failures remain in the executed homepage checks.

Browser tests use Chromium. Hero geometry includes 11 viewports from 320px to
1920px, the 899/900/901px breakpoint and no-JavaScript rendering. Checks include
desktop client-strip placement, navbar/logo stability, hover contrast, scoring
presets and keyboard controls, funnel stages and linked highlighting, section
order, v61 approved content, CTA intent and contact fallback.

Visual inspection covered desktop hero, engagement cards and funnel, plus mobile
scoring controls and the closing CTA. Baseline screenshots are under
`/tmp/home-after-*`; test logs and final results are under
`/tmp/tribera-home-qa/`. These temporary artifacts are not committed evidence.

## Limits

Live Netlify form delivery, email/CRM integration and other browser engines were
not verified. This audit does not certify every page or resolve deferred owner
decisions. It is a homepage regression check, not a new design or copy review.
