**PASS**

Measured facts (diff + screenshots):

- Prefix applied conditionally — only when `categories.some(c => c.slug === activeTag.slug)`; a non-colliding tag keeps its bare title. ✔
- Only `label` changed; `slug`, `type`, and `href: getPermalink(activeTag.slug, 'tag')` are untouched, so both hrefs and distinct tag-vs-category filtering semantics are preserved. ✔
- Guard block (`!filters.some(... type === 'tag' ...)`) is unchanged, so `aria-current` and wrapping logic outside this push are unmodified. ✔
- Label clarity: at both widths the category chip "Technical Hiring" and the active "Tag: Technical Hiring" chip are visually distinguishable and the active one is the filled/dark state.
- Mobile (390px): the longer label fits on its own wrapped row, no truncation or overflow. Desktop (1520px): wraps cleanly to row 2.

Judgment: no correction needed.
