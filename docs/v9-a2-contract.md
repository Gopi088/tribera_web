# A2 Contact and sample request: bounded integration contract

Starting checkpoint: `449d693`, accepted A1. Candidate worktree `/tmp/tribera-v9-a2`; the user migration branch stays at the accepted checkpoint until local gates and actual Claude acceptance pass.

Scope: complete private Contact and sample-write-up pages plus real server handlers and native no-JavaScript forms. Existing public HTML/routes and legacy handler contracts remain unchanged. Contact validates only the active hiring/looking fields, resolves recipients server-side, and carries bounded service/sector context into the notification. No personal recipient address is invented; missing required routing configuration fails visibly. Sample delivery attaches the server-only full PDF, records a lead without subscription, and must handle duplicate submissions and partial failures without duplicate delivery. Production must not silently rely on process-local state for deduplication.

Three isolated workers own Contact UI, sample UI, and new form handlers/tests. The coordinator owns independent source/browser journeys, integration, navigation, CI and acceptance evidence. Workers cross-review other work; actual Claude review remains mandatory. Never exercise live mail/provider calls in local tests: use explicit mocks and record the hosted-verification boundary.

Private pages are generated only in development or V9_PREVIEW builds, noindex and outside sitemaps. Only the source first-page sample preview may be public; the complete PDF remains server-only and must be absent from dist. Private CTAs move to the new private destinations; existing public pages retain their byte baseline.

Required local gates: full checks and legacy/new handler tests; source h1/h2 and long-paragraph coverage; responsive, no-JavaScript, native/enhanced form and error/retry journeys in Chromium, Firefox and WebKit; A1 and affected existing navigation regression; private/production static and browser gates; exact production comparison; full-height visual review at five widths; independent Claude review on frozen source and complete evidence. Preserve failures and explain corrections; do not weaken assertions to obtain a pass.

Native forms receive fresh server timing/token state, preserve bounded context, reject invalid uploads and bot submissions, and use POST/Redirect/GET after success. Enhanced forms must not show success when delivery/configuration fails. Samples need request identity and a bounded retry/expiry contract; details are recorded with the implementation before acceptance. New POST aliases and actual platform transport/configuration remain hosted gates; direct function URLs are used in private previews.

G4 complete route regression, G5 authorized hosted/scanner/provider/test-inbox validation, G6 publication/content/recipient decisions and G7 release verification remain pending. No push, deployment or live email is authorized by this local batch.
