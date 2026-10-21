# Private sample write-up migration

Source: `sample_data/tribera-web-handoff-v9/sample-write-up.html`.

`/__v9/sample-write-up` exists only in development or a `V9_PREVIEW=1` build and uses the accepted shared V9Layout with noindex. Hero, preview figure/caption, five-item contents list, form labels, privacy note and confirmed-success wording preserve the handoff. Native Astro components and scoped final-cascade CSS replace the standalone document. The public `/sample-write-up` route uses the same components with public navigation and metadata. Source global header/footer are supplied by V9Layout. No raw HTML or iframe is shipped.

## Asset boundary

`public/images/v9/sample/write-up-page-one.jpg` is only the JPEG embedded in the source page (1270 × 1797; 187589 bytes; SHA256 `d449395b37d5af1774ba2d138e53a2cd9b72865c66a770694fbbd10a679f189c`). The invented-person caption remains visible. No complete PDF or page-two asset is copied to public output. The backend owns private PDF delivery.

## Request contract

The client `src/assets/scripts/v9/sample.ts` prepares on focus or valid submission, never page load. GET `/.netlify/functions/sample-form-v9?format=json` returns a server-issued `request_token`, `form_loaded_at`, and `ready_at`. The client waits until ready_at before POSTing FormData to `/.netlify/functions/sample-request-v9` with name, email, company, empty website/botcheck honeypots, and the server fields. It never invents the timestamp or token.

Only an HTTP success with JSON `success: true` reveals the success state. Network/JSON failures and retryable provider failures retain exactly the same FormData and token, with visible fields read-only for an explicit retry. Validation 400 permits correction; expired/conflict or explicit nonretryable responses stop further submission. Conflict and expiry warn that the original may have completed. The native alternate is hidden once a delivery attempt exists, including ambiguous retries; a terminal state never encourages a fresh request. The backend owns provider confirmation and durable idempotency; no live send was performed during implementation.

The SSR submit button is disabled until JavaScript attaches. A permanently visible native email-request-form link provides the no-JavaScript path. This is an intentional addition to the handoff, as are inline accessible validation, status/error regions, focus styles, and truthful error/retry states. Reduced-motion overrides remove motion. Form privacy copy still requires product approval alongside backend retention policy.

## Stable inspection points

- `#swForm[data-sample-form]`: enhanced form.
- `[data-sample-status]`: pending/retry status only.
- `#swErr:not([hidden])`: announced final error (`role=alert`).
- `#swDone:not([hidden])`: confirmed success (`role=status`, receives focus).
- `#sample-name`, `#sample-email`, `#sample-company`: visible fields; associated error spans and aria-invalid.
- `.sw-native a`: native fallback.

Scoped ESLint and Prettier checks pass. Coordinator owns production exclusion, mocked-provider integration, browser, visual, no-JavaScript, accessibility, and independent Claude review gates. No claim of those gates passing is made here.
