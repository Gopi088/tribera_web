# Forms Handler Baseline

Date: 2026-03-22

Purpose:

- lock the current happy-path behavior and response contract before security hardening
- make it explicit which behaviors must keep working while validation and abuse controls are added

Verification command:

```bash
npm run test:handlers
```

Current baseline covered by tests:

## Site Inquiry

- valid `contact` submission returns `200` with `{ "success": true }`
- invalid `form_type` returns `400` with `Invalid form submission.`
- honeypot submissions return `200` with `{ "success": true }` and do not call the downstream email provider

## Candidate Profile

- valid submission with a resume returns `200` with `{ "success": true }`
- missing resume returns `400` with `Please complete the required fields and attach your resume.`

## Careers Apply

- valid application with resume returns `200` with `{ "success": true }`
- missing required role metadata or resume returns `400` with `Please complete the required fields and attach your resume.`

## Stable behavior to preserve during hardening

- success responses should remain JSON with the same `success` shape
- existing valid UI flows must continue to work for contact, demo, candidate profile, and careers apply
- advertised resume formats must continue to work after server-side file validation is added
- career applications should still resolve to the correct role after client-supplied metadata is reduced

## Security hardening now covered by tests

- invalid emails are rejected server-side
- unknown contact `interest` values are rejected server-side
- HTML in email content is escaped before outbound email rendering
- disallowed resume file types are rejected server-side
- trusted `job_slug` metadata overrides spoofed client role/title/department values
- unknown `job_slug` values are rejected server-side
- disallowed request origins are rejected server-side
- basic rate limiting returns `429` after the configured threshold

## Security hardening areas that will intentionally change behavior later

- oversized or disallowed text fields should be rejected more aggressively server-side
- origin validation may need rollout refinement for production and preview environments
- rate limiting will need stronger persistence or edge enforcement for production effectiveness
