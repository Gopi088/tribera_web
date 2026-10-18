**PASS**

Measured from evidence:

- Diff adds exactly one declaration: `max-width: 70ch` on `.legal-document__body`. No change to `font: 400 16px/1.75 var(--v58-ui)`, color, margin-top, or any text/copy/list/link rule — semantics untouched as claimed.
- 1520 shot: H1 and section container still span the wider ~860px band while body paragraphs and list items wrap noticeably earlier (~630px), yielding roughly 75–85 characters per line — within readable-measure range and visibly narrower than the heading.
- 390 shot: body wraps at the viewport gutter, not at 70ch (70ch > 390px), so the cap is inert on mobile; no horizontal overflow, no clipped list markers, long URL link wraps inline correctly.

Judgment: the intent holds — legal reads as a document, not marketing type. Measure at 1520 sits at the upper edge of comfortable; 66ch would be tighter, but 70ch is defensible and not a defect.
