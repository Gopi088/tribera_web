# Follow-Up Production Evidence

Executed after the follow-up changes. Preview runner and workbook tests exited 0. The experts test's obsolete disclosure-loop wording was corrected during the run and its final version separately passed all four widths; see /tmp/tribera-review-followup-experts.log.

## Preview

```text
13:17:00 [astrowind] Astrowind `./src/config.yaml` has been loaded.
 astro  v6.4.0 ready in 11 ms
┃ Local    http://127.0.0.1:4333/
320px: v60 copy/order, preserved lab/funnel and reduced motion passed
390px: v60 copy/order, preserved lab/funnel and reduced motion passed
768px: v60 copy/order, preserved lab/funnel and reduced motion passed
1520px: v60 copy/order, preserved lab/funnel and reduced motion passed
Scroll animation, staggered checks and JavaScript-disabled fallback passed
320px: structure, CTA intents, thresholds and overflow passed
390px: document height 14905
390px: structure, CTA intents, thresholds and overflow passed
640px: structure, CTA intents, thresholds and overflow passed
768px: structure, CTA intents, thresholds and overflow passed
900px: structure, CTA intents, thresholds and overflow passed
1520px: document height 10548
1520px: structure, CTA intents, thresholds and overflow passed
1920px: structure, CTA intents, thresholds and overflow passed
No-JS: true shortlist time, coloured funnel and working contact fallback passed
R48: homepage title already correct
R2: exact latest hero definition
R7: exact latest spreadsheet replacement, not stale sample
R8/R50: explanation and spacing
R9/R10: note and footer
R11/R12: contextual heading and all 17 roles retained
R14/R15/R16/R51: funnel labels and explicit hiring-team references
R49: latest sample order; no three-step strip
R39: exact corrected cross-link
R44: explicit workbook range aligned with Services; models unchanged
50-row tracker covers latest workbook and retains unresolved owner/legal/deployment gates
320px: grouped coverage, retained roles, keyboard disclosures and bounds passed
390px: grouped coverage, retained roles, keyboard disclosures and bounds passed
768px: grouped coverage, retained roles, keyboard disclosures and bounds passed
1607px: grouped coverage, retained roles, keyboard disclosures and bounds passed
320px: removed copy, stage labels, linked highlighting, keyboard selection and square counts passed
390px: removed copy, stage labels, linked highlighting, keyboard selection and square counts passed
1520px: removed copy, stage labels, linked highlighting, keyboard selection and square counts passed
Index policy: local, preview, branch, production, Netlify host, route exception passed
390px / enabled: comparison selections, SSR values, narrative, candidate scores passed
390px / disabled: comparison selections, SSR values, narrative, candidate scores passed
390px / blocked: comparison selections, SSR values, narrative, candidate scores passed
1520px / enabled: comparison selections, SSR values, narrative, candidate scores passed
1520px / disabled: comparison selections, SSR values, narrative, candidate scores passed
1520px / blocked: comparison selections, SSR values, narrative, candidate scores passed
All seven careers: canonical order, unchanged label/weights, bounded bar widths passed
320px: About removal, retained claims, layout and unchanged Home list passed
390px: About removal, retained claims, layout and unchanged Home list passed
768px: About removal, retained claims, layout and unchanged Home list passed
1520px: About removal, retained claims, layout and unchanged Home list passed
No-JS: retained About clients server-rendered
390px: all 34 detail routes render, headings visible, no overflow or browser errors; GET-only audit
1520px: all 34 detail routes render, headings visible, no overflow or browser errors; GET-only audit

```

## Workbook

```text
test_changed_issue_is_rejected (test_bug_workbook.WorkbookTests) ... ok
test_future_approved_update_keeps_original_status (test_bug_workbook.WorkbookTests) ... ok
test_missing_row_is_rejected (test_bug_workbook.WorkbookTests) ... ok
test_original_backup_preservation_and_real_review_gate (test_bug_workbook.WorkbookTests) ... ok
test_round_trip_preserves_workbook (test_bug_workbook.WorkbookTests) ... ok
test_unknown_status_is_rejected (test_bug_workbook.WorkbookTests) ... ok
test_unreviewed_row_is_rejected (test_bug_workbook.WorkbookTests) ... ok

----------------------------------------------------------------------
Ran 7 tests in 0.217s

OK

```

