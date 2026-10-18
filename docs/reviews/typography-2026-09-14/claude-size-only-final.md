Based on the CSS and three screenshots:

**No blockers found.** The rule at line 31 (`h3.blog-display`, `.post__t` → `--type-marketing-card-size`) and line 62 (`.post__x` → `--type-text-size`) are size-only, plain `font-size` declarations — no color/weight/font-family/font-style properties touched, consistent with the rest of the file's pattern.

Specific checks against your constraints:
- `.lead__n` stays grouped with card titles (line 31), not touched as a subtitle — confirmed, matches your note.
- Journal h3/excerpt on topic-mobile.png (`Rethinking hiring metrics...` title + its excerpt) render as bold serif title / regular gray excerpt — no visual regression apparent.
- Contact captions/labels (14px/12px roles, lines 89–103, 111–120) are untouched by this diff.
- Muted colors in ways.png/controls.png (gray card body text, gray eyebrow labels) are preserved as-is — CSS confirms no color rules were added or changed anywhere in the size-only blocks.

**Residual risks (not blockers, just noting since none were visible in these 3 screenshots):**
1. I only inspected 3 screenshots (one journal-list mobile view, two desktop card sections) — the actual 16-route/width production comparison isn't something I can independently verify beyond what you've described; I'm trusting your reported pass.
2. `h3.blog-display`/`.post__t` and `.post__x` are new additions to existing shared selector groups (marketing-card-size, text-size) — if any other page reuses `.blog-display` or `.post__t`/`.post__x` class names for a different, unrelated component, this rule would apply there too. Worth a quick grep for those exact class names outside the journal templates if you haven't already.

No evidence of boldness, color, or family changes in what I reviewed.
