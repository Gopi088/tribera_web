## Review: ACCEPT

**Scope:** Local, read-only inspection of shared v9 header/footer components, legal page layout/dates, and DPA content changes. Not a legal, accessibility, or full-release review.

### Findings

**1. Shared header/footer implementation — consistent**

- `widgets/Header.astro` and `widgets/Footer.astro` both wrap the single `v9/Header.astro` / `v9/Footer.astro` components with `isolated` + `linkOverrides={publicLinks}`, so legal/public pages render the same markup as the rest of the v9 site rather than a divergent copy.
- `publicLinks` (`src/data/v9/preview-links.ts`) maps `/dpa` to itself (a real route) while other nav destinations route to `__v9/*` preview paths — intentional and consistent with the "private preview" pattern already used elsewhere.
- `shared-chrome.css` only sets `isolated`-scoped font sizing/box-sizing resets to decouple legal pages from legacy global resets — doesn't touch layout/color, so visual identity with the main site chrome is preserved.

**2. Visual consistency — confirmed by screenshots and result.json**

- `_-1920-header.png` vs `_blog-1920-header.png`: identical nav layout, labels, spacing, logo.
- `_-1920-footer.png` vs `_blog-1920-footer.png`: identical columns, ordering, and footer bar; both include the `Legal` column (`Security`, `Terms`, `Privacy`, `Data processing`).
- `result.json`: `"status": "passed"`, 81 static pages checked, zero `errors`. `/privacy`, `/security`, `/terms`, `/dpa` all report `status: "passed"` with the same font/size/background values as `/` at all three measured widths (390/1366/1920) — no outlier styling on legal routes.

**3. Date semantics — clear and non-misleading**

- `MarkdownLayout.astro` renders `pageUpdated` (formatted, with a `<time datetime>`) and, separately, `policyUpdated` as a distinct "Content last revised" line — not merged or overwritten.
- `privacy.md`: `pageUpdated: 2026-10-21`, `policyUpdated: 'July 27, 2025'`. The `privacy-390.png` screenshot confirms both lines render distinctly: "Page updated: 21 October 2026" and "Content last revised: July 27, 2025." This correctly distinguishes a template/chrome refresh date from the actual last substantive policy revision — matches the stated intent.
- `dpa.md` only sets `pageUpdated` (no `policyUpdated`), consistent with it being a new contact-style page rather than a dated legal policy.

**4. /dpa is not a misleading Privacy alias**

- Content is a genuine "Request data-processing terms" page: directs to `/contact?topic=data-processing` or an email, then separately links out to the real Privacy/Security/Terms pages for policy content. No agreement text or implied legal commitment is presented as already in effect.
- `dpa-390.png` confirms this rendered content matches the source markdown, with correct header/footer chrome and `robots: noindex, follow` appropriate for a private/preview-style page.

### Limitations

- No code changes made; this is presentation/navigation-only, not a correctness or accessibility audit.
- Did not verify the "supplied replacement legal HTML" (unpublished draft) — out of scope since it was not applied to any file reviewed.
- Did not check desktop vs. mobile breakpoints beyond the four screenshots provided, nor cross-browser rendering (only `chromium` artifacts available).
- Not a legal/factual review of policy wording — only confirmed existing Privacy/Terms/Security text was structurally preserved, not its substantive accuracy.
- Did not verify live/deployed behavior — this reviewed only local source and pre-generated artifacts.
