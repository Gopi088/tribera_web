# Forms Security Audit

Date: 2026-03-22

Scope:

- `netlify/functions/site-inquiry.mjs`
- `netlify/functions/candidate-profile.mjs`
- `netlify/functions/careers-apply.mjs`
- `netlify/functions/_lib/form-utils.mjs`
- related form clients that submit to those handlers

## Must Fix Before Production

- Replace the current in-memory rate limiter with an edge- or datastore-backed implementation that works reliably across serverless instances and deploy replicas.
- Add stronger anti-bot controls beyond the current honeypot plus timing checks, such as signed tokens or equivalent edge protections.
- Enforce per-field server-side max lengths consistently across all inbound text fields, including names, company, phone, message, and free-text role metadata where still accepted.
- Review and remediate production dependency vulnerabilities that are reachable in deployed code paths.

## Should Fix Soon

- Tighten CSP with `object-src 'none'`, `base-uri 'self'`, and `form-action 'self'`.
- Reduce CSP exposure from `'unsafe-inline'` and broad third-party script allowances.
- Restrict and harden the Decap CMS admin surface, including pinning or self-hosting remote assets.
- Re-audit third-party chat/runtime integrations and remove unused trusted origins from CSP and runtime code.
- Add structured telemetry for rate-limit hits, invalid origins, rejected files, and validation failures.
- Reduce raw error logging in functions and prefer structured error codes or request IDs.

## Hardening Backlog

- Consolidate remaining duplicated validation, parsing, and outbound email behavior into shared utilities.
- Establish a dependency review cadence for production packages and document ownership.
- Add explicit operational ownership and review cadence for CMS exposure and third-party runtime integrations.
- Continue tightening field validation rules where business requirements become clearer, especially for phone number normalization and stricter URL allowlisting.

## Immediate Fixes

- Done: add best-effort server-side rate limiting guardrails for public form handlers.
- Partial: add layered anti-bot controls beyond the honeypot via submission timing checks; stronger signed or challenge-based protections are still open.
- Done: escape user-controlled values before rendering HTML email bodies.
- Done: validate and allowlist uploaded file types, and normalize attachment filenames.
- Done: add stricter server-side validation for email fields, LinkedIn URLs, and enumerated `interest` values.
- Done: add explicit server-side max-length enforcement across contact, candidate-profile, and careers-apply text fields.
- Done: stop trusting client-supplied job title/department in career applications; resolve role data from trusted `job_slug`.
- Done: add multipart limits for field size, field count, and field-name length.
- Done: fall back to the local rate limiter when the shared backend is unavailable, instead of returning 500s.
- Done: require configured upload scanning in production and fail closed when it is unavailable.
- Done: add request timeouts for outbound upload-scanner and shared-rate-limiter calls.
- Done: fail closed in production when the shared rate-limiter backend is unavailable, instead of silently weakening limits.
- Done: make DOCX validation compatible with standard ZIP central-directory parsing, including data-descriptor archives used by common office exporters.
- Done: trust only Netlify's authoritative connection IP header in production rate-limit keying; do not rely on client-supplied `Client-IP` or `X-Forwarded-For`.

## Hardening Backlog

- Done: add request origin validation for public POST endpoints as a secondary abuse control.
- Reduce CSP exposure by adding `object-src 'none'`, `base-uri 'self'`, and `form-action 'self'`.
- Move away from `'unsafe-inline'` in `script-src` and reduce third-party script sources.
- Restrict or self-host the Decap CMS admin surface and pin remote admin assets.
- Re-audit third-party chat/runtime integrations and remove unused trusted origins.
- Consolidate duplicated parsing and outbound email logic into shared utilities.
- Upgrade vulnerable production dependencies where fixes are available.
- Replace in-memory function throttling with a stronger edge- or datastore-backed rate limiter for production.
- Keep `FORM_UPLOAD_SCAN_URL` configured anywhere production uploads are accepted; production now fails closed when scanning is not configured.
- Keep the shared rate-limiter backend healthy in production; production now returns 429 rather than downgrading to per-instance limits when that backend is unavailable.
- Treat extension/MIME/signature checks as format heuristics only; the configured upload scanner remains the real production control for uploaded resumes.

## Operational Monitoring Gaps

- No evidence of rate-limit telemetry or alerting for form abuse spikes.
- No evidence of structured security logging for rejected uploads, invalid origins, or validation failures.
- No evidence of dependency-vulnerability review cadence for production packages.
- No documented owner or review cycle for third-party runtime integrations and CMS exposure.

## Implemented This Pass

- Added handler regression tests and a repeatable verification command via `npm run test:handlers`.
- Added shared HTML escaping, subject sanitization, email validation, and URL validation helpers.
- Added server-side resume type allowlisting and filename normalization.
- Added multipart limits for file count, file size, field count, field size, and field-name size.
- Added request-origin validation for form handlers.
- Added best-effort in-memory rate limiting per endpoint and client IP.
- Added submission timing validation using a hidden `form_loaded_at` field to reject unrealistically fast or stale form submissions.
- Added trusted server-side role resolution for career applications using `job_slug`.

## Bug List

### 1. No server-side rate limiting on public form endpoints

Severity: High

Status: Partially fixed

Affected files:

- `netlify/functions/site-inquiry.mjs`
- `netlify/functions/candidate-profile.mjs`
- `netlify/functions/careers-apply.mjs`

Issue:
The public form endpoints now have best-effort in-memory throttling, but it is not production-grade for distributed or serverless deployments. Abuse resistance improves locally and on single-instance paths, but it remains unreliable under replica churn or cold starts.

Remediation:

- Add per-IP and per-endpoint rate limiting at the edge or function layer.
- Apply stricter thresholds to attachment-bearing endpoints.
- Add basic request volume monitoring and alerting.

### 2. Honeypot-only anti-bot protection is insufficient

Severity: High

Status: Partially fixed

Affected files:

- `netlify/functions/site-inquiry.mjs`
- `netlify/functions/candidate-profile.mjs`
- `src/components/careers/CareersApplyModal.astro`
- `src/components/ContactSalesModal.astro`
- `src/pages/contact.astro`
- `src/layouts/Layout.astro`
- `src/components/widgets/Header.astro`

Issue:
The form layer no longer relies only on the hidden `botcheck` field. It now also enforces submission timing checks through a hidden `form_loaded_at` timestamp. That blocks naive instant-submit automation, but a determined bot can still mimic the timing field, so stronger signed or challenge-based controls remain open.

Remediation:

- Add stronger anti-automation controls such as signed form tokens or equivalent edge protections.
- Keep honeypot, timing checks, and rate limiting as layered controls rather than replacements for one another.

### 3. Unescaped user input is rendered into HTML emails

Severity: High

Status: Fixed

Affected files:

- `netlify/functions/site-inquiry.mjs`
- `netlify/functions/candidate-profile.mjs`
- `netlify/functions/careers-apply.mjs`

Issue:
Outsider-controlled input is interpolated directly into HTML email bodies. This can alter the rendered email content seen by internal recipients.

Remediation:

- HTML-escape every interpolated field before rendering email HTML.
- Only apply formatting transformations like newline-to-`<br />` after escaping.

### 4. File attachments are forwarded without type allowlisting

Severity: High

Status: Fixed

Affected files:

- `netlify/functions/_lib/form-utils.mjs`
- `netlify/functions/careers-apply.mjs`
- `netlify/functions/candidate-profile.mjs`

Issue:
Uploaded files are size-limited but not validated by MIME type, extension, or safe filename before being attached to outbound email.

Remediation:

- Allowlist accepted resume types such as PDF and DOC/DOCX.
- Reject all other file types.
- Normalize or replace user-supplied filenames server-side.

### 5. Unvalidated email fields are used as `replyTo`

Severity: Medium

Status: Fixed

Affected files:

- `netlify/functions/site-inquiry.mjs`
- `netlify/functions/candidate-profile.mjs`
- `netlify/functions/careers-apply.mjs`
- `netlify/functions/_lib/form-utils.mjs`

Issue:
Outsider-controlled email fields are used directly in downstream mail metadata without strict server-side validation.

Remediation:

- Validate emails with a strict parser before using them in mail headers.
- Reject invalid values.
- Consider using a fixed internal reply address if provider behavior requires tighter control.

### 6. Untrusted user input is also used in email subjects

Severity: Medium

Status: Fixed

Affected files:

- `netlify/functions/site-inquiry.mjs`
- `netlify/functions/candidate-profile.mjs`
- `netlify/functions/careers-apply.mjs`

Issue:
User-controlled values such as names and job titles are interpolated directly into email subjects. This is separate from the HTML-body issue and affects downstream mail metadata and internal triage.

Remediation:

- Sanitize and normalize subject components before use.
- Cap subject field lengths aggressively.
- Prefer server-resolved job metadata over client-provided values.

### 7. Presence-only validation is too weak for structured fields

Severity: Medium

Status: Partially fixed

Affected files:

- `netlify/functions/site-inquiry.mjs`
- `netlify/functions/candidate-profile.mjs`
- `netlify/functions/careers-apply.mjs`

Issue:
Validation is stronger than before: emails are validated, LinkedIn URLs are validated, `interest` is allowlisted, submission timing is checked, and explicit per-field length caps are enforced across names, company, phone/mobile numbers, role metadata, and free-text fields.

Remediation:

- Add per-field validation rules server-side.
- Enforce max lengths on all text fields.
- Restrict enumerated fields like `interest` to known values.
- Validate URLs such as LinkedIn with strict parsing and allowed-host checks if needed.

### 8. No request origin validation for public POST endpoints

Severity: Medium

Status: Fixed

Affected files:

- `netlify/functions/site-inquiry.mjs`
- `netlify/functions/candidate-profile.mjs`
- `netlify/functions/careers-apply.mjs`

Issue:
The handlers now validate request origin and same-host submissions, reducing cross-site abuse risk. This remains a secondary control rather than a primary anti-abuse measure.

Remediation:

- Validate `Origin` and/or `Referer` against allowed site origins.
- Use this as a secondary abuse control, not a substitute for rate limiting and anti-bot measures.

### 9. Multipart parsers do not limit field size or field count

Severity: Medium

Status: Partially fixed

Affected files:

- `netlify/functions/_lib/form-utils.mjs`
- `netlify/functions/careers-apply.mjs`

Issue:
Multipart parsing now limits file size, field count, field-name length, and field size. The remaining gap is stronger per-field post-parse max-length enforcement tied to business rules.

Remediation:

- Add Busboy limits for `fields`, `fieldSize`, and `fieldNameSize`.
- Enforce per-field max lengths after parsing.

### 10. Career application trusts client-supplied job metadata

Severity: Medium

Status: Fixed

Affected files:

- `netlify/functions/careers-apply.mjs`
- `src/components/careers/CareersApplyModal.astro`

Issue:
Career applications now resolve canonical role metadata server-side from trusted `job_slug` values instead of trusting client-supplied title and department fields.

Remediation:

- Accept only `job_slug`.
- Resolve canonical title and department server-side from trusted job data.
- Ignore client-provided display metadata.

### 11. File upload controls rely partly on client hints that are not security controls

Severity: Medium

Status: Fixed

Affected files:

- `src/components/careers/CareersApplyModal.astro`
- `src/components/widgets/Header.astro`
- `netlify/functions/candidate-profile.mjs`
- `netlify/functions/careers-apply.mjs`

Issue:
The UI still uses client-side hints for usability, but the server now independently enforces resume type restrictions and rejects invalid uploads.

Remediation:

- Keep the client-side restrictions for usability, but treat them as non-security controls.
- Mirror all file constraints server-side and reject anything outside the allowlist.

### 12. No canonicalization or sanitization of attachment filenames

Severity: Medium

Status: Fixed

Affected files:

- `netlify/functions/_lib/form-utils.mjs`
- `netlify/functions/careers-apply.mjs`

Issue:
Attachment filenames are now normalized server-side before they are forwarded downstream, reducing unsafe outsider-controlled metadata in email attachments.

Remediation:

- Strip unsafe characters from filenames.
- Normalize to a simple server-generated convention such as `resume.pdf`.
- Preserve the original name only in escaped email body text if needed.

### 13. Raw caught errors are logged

Severity: Low

Status: Fixed

Affected files:

- `netlify/functions/site-inquiry.mjs`
- `netlify/functions/candidate-profile.mjs`
- `netlify/functions/careers-apply.mjs`

Issue:
The handlers now emit minimal structured error logs with operation and request ID instead of logging raw error objects. This reduces the risk of leaking provider or request-derived detail into logs while preserving failure observability.

Remediation:

- Log structured error codes and request IDs instead of raw provider errors where possible.
- Avoid logging raw request-derived values.

### 14. Validation and email-send logic is duplicated

Severity: Low

Status: Fixed

Affected files:

- `netlify/functions/_lib/form-utils.mjs`
- `netlify/functions/careers-apply.mjs`

Issue:
Shared request checks and outbound email delivery are now centralized in shared utilities, reducing the risk that future form hardening lands in one handler path but not the others.

Remediation:

- Consolidate parsing, attachment validation, and outbound email construction into shared utilities.

## Notes

- No authenticated user workflow was found in these endpoints, so no classic authz bypass finding was identified in this review.
- CSRF risk here is operational abuse against public endpoints rather than account/session compromise.
- The client-side `fetch()` form handlers in `src/pages/contact.astro`, `src/components/ContactSalesModal.astro`, `src/components/careers/CareersApplyModal.astro`, `src/components/widgets/Header.astro`, and `src/layouts/Layout.astro` improve UX only. They do not provide security guarantees and should not be relied on as enforcement points.

## Broader Security Findings

### 15. CSP is missing tighter containment directives for modern browser hardening

Severity: Medium

Status: Open

Affected files:

- `netlify.toml`
- `public/_headers`

Issue:
The site sets a baseline CSP, but it does not include stronger containment directives such as `object-src 'none'`, `base-uri 'self'`, and `form-action 'self'`. Those omissions widen the blast radius if markup injection or third-party script compromise occurs.

Remediation:

- Add `object-src 'none'`.
- Add `base-uri 'self'`.
- Add `form-action 'self'`.
- Review whether additional directives such as `frame-src` and `connect-src` can be narrowed further.

### 16. CSP allows `unsafe-inline` scripts and broad third-party script sources

Severity: Medium

Status: Open

Affected files:

- `netlify.toml`
- `public/_headers`

Issue:
The current CSP permits `'unsafe-inline'` in `script-src` and allows multiple remote script origins, including CDN-hosted assets. This materially weakens XSS resistance and increases supply-chain exposure.

Remediation:

- Move toward nonce- or hash-based script allowances.
- Remove `'unsafe-inline'` where feasible.
- Reduce external script origins to the minimum required set.
- Prefer self-hosted assets or pinned vendor bundles for critical dependencies.

### 17. Public CMS/admin surface is exposed and loads remote code from `unpkg`

Severity: Medium

Status: Open

Affected files:

- `public/decapcms/index.html`
- `public/decapcms/config.yml`
- `public/robots.txt`

Issue:
The Decap CMS admin surface is publicly reachable under `/decapcms/` and loads its runtime from `https://unpkg.com/decap-cms@^3.0.0/...`. Even if Git Gateway protects content changes, this still exposes an administrative surface and introduces third-party script supply-chain risk.

Remediation:

- Restrict access to the CMS admin route if possible.
- Replace the broad `^3.0.0` CDN load with a pinned, reviewed asset.
- Consider self-hosting the admin bundle.
- Audit Git Gateway access controls and disable the admin surface when not needed.

### 18. Third-party chat/runtime integrations expand trust and attack surface

Severity: Medium

Status: Open

Affected files:

- `src/layouts/Layout.astro`
- `netlify.toml`
- `public/_headers`

Issue:
The site trusts multiple Microsoft and Crisp origins for scripts, frames, and runtime messaging. The `postMessage` checks in the chat bootstrap are better than nothing, but these integrations still expand the remote code and messaging surface significantly.

Remediation:

- Re-verify every allowed external origin in CSP.
- Remove unused vendor origins from `script-src`, `connect-src`, and `frame-src`.
- Keep origin allowlists strict and avoid fallback trust patterns where possible.
- Document the business owner and review cadence for each third-party integration.

### 19. Production dependencies include known vulnerabilities

Severity: Medium

Status: Open

Affected files:

- `package.json`
- `package-lock.json`

Issue:
`npm audit --omit=dev` reports known vulnerabilities in production dependency paths, including `fast-xml-parser`, `h3`, `undici`, `tar`, `svgo`, and `devalue`.

Remediation:

- Upgrade vulnerable dependency paths where fixes are available.
- Review whether the vulnerable code paths are reachable in production.
- Track transitive dependency risk explicitly when direct fixes are unavailable.

### 20. Client-side hidden fields and modal state carry trusted workflow context

Severity: Low

Status: Partially fixed

Affected files:

- `src/components/careers/CareersApplyModal.astro`
- `src/components/ContactSalesModal.astro`
- `src/layouts/Layout.astro`
- `src/components/widgets/Header.astro`

Issue:
Several workflows rely on hidden fields and client-side state to carry business context such as form type, department, and role metadata. This is normal UX plumbing, but it is not a trust boundary and should not be treated as authoritative anywhere server-side. Careers role metadata is now partially hardened through trusted `job_slug` resolution, but other hidden field values still need to be treated as convenience-only.

Remediation:

- Continue treating all hidden field values as untrusted input.
- Resolve authoritative workflow metadata server-side wherever possible.
- Document which fields are convenience-only versus trusted identifiers.
