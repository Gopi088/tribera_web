# Dev Release Package

The explicit file selection is in `dev-release-files.json`. It includes the
site-wide source changes, required new components/fonts, regression tests,
reusable visual-audit tools and archived review records.

Reference samples, private source material, one-off migration scripts and the
unused static italic font are not part of this staged change. Existing tracked
files remain in the repository. No source files are deleted by this selection.
Build output, dependencies, local environment files and screenshots remain ignored.

The Netlify deployment publishes `dist` and bundles `netlify/functions`; it does
not publish this documentation or the source tree as website files.

## Verification

Verified on 2026-09-08: all 148 staged paths match the manifest. A clean index
export at `/tmp/tribera-dev-package-mELpSU` built all 76 pages successfully and
passed all 49 handler tests. The export omitted untracked workspace assets and
local environment files; it reused the installed dependencies via a symlink.
`git diff --cached --check` passes. This is not a clean dependency-install test.

Export the Git index into a fresh temporary directory and build it there. This
checks the actual staged source without access to untracked workspace assets.
The local dependency installation may be linked into that directory; a clean
dependency install and hosted environment checks are separate release gates.

Static-check triage subsequently added paths to the manifest and refreshed
the selected files with formatting and diagnostic fixes. See
`reviews/static-check-triage.md` for the latest results: the working-tree build
and handler tests passed. The follow-up script cleanup resolves all 1,704
remaining Astro errors (zero errors and warnings). The earlier clean
index export above predates this triage and is not verification of the new index.

## Final Review

The subsequent release-closure pass fixes standalone font loading, industries
method contrast and the banking FAQ heading. A selected-index export at
`/tmp/tribera-final-export-beSYbe` builds all 76 pages successfully using linked
installed dependencies. It excludes untracked samples and local environment
files. This is not a clean dependency-install test.

Claude reviewed all 76 routes and then fresh representative screenshots after
the fixes. See `reviews/release-closure/disposition.md` for evidence, scope and
remaining owner-evidence questions. Navbar geometry passes 228 comparisons.

Staging is preparation only. Netlify authentication and the intended dev site
are still required; hosted checks remain pending. No commit, push or deployment
has been performed.
