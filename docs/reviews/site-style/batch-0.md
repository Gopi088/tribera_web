# Batch 0: Baseline

Status: captured; migration findings remain open in their respective batches.

## Evidence

- Main manifest: `/tmp/tribera-site-style/baseline/manifest.json`.
- 76 public routes, desktop 1520px and mobile 390px. CMS excluded.
- Retry manifest: `/tmp/tribera-site-style/baseline-retry/manifest.json`.
  Private-equity industry and quality-of-hire tag mobile captures initially failed
  during navigation; both routes now captured successfully at both widths.
- Screenshots and rendered copy are stored alongside each manifest.

## Findings To Carry Forward

- Services desktop and careers mobile reported horizontal overflow. Fix and retest
  in batches 2 and 4 respectively.
- Numerous standalone routes lack exactly one main landmark. Restore semantics as
  those templates migrate; the manifest identifies each affected route.
- Services metadata says seven services while the page describes twelve. Its
  bench size, savings frequency, prices and turnaround claims require verification
  or qualification during batch 2. Do not treat sample copy as substantiation.
- Default check exhausted Node memory. With an 8GB heap, Astro reports 1709 errors
  across 188 files. No diagnostics name the edited V58/candidate component paths.
  ESLint and formatting stages were not reached; the repository gate remains open.
- The baseline navigation test measured before styles/fonts finished loading.
  Waiting for network idle before font readiness fixes the measurement race;
  nine widths and all 12 foundation/navigation tests pass after recovery.

No route is marked Claude-reviewed by this automated baseline audit.
