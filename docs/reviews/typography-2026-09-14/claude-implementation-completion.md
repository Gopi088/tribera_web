**Verdict: Pass — no typography defects found in these five crops.**

- **Central rule confirmed working:** `.v58-route :is(h1,h2)` (tailwind.css:1660-1664) now pulls `--type-display-weight: 500` and `--type-display-tracking: -0.01em` from content-typography.css:4-5 — no hardcoded overrides left in the rule itself.
- **Experts (390 & 1520):** H2 renders full-width with subtitle below at both sizes; the four specialism groups render as a single stacked column at 390px and two columns at 1520px — matches the approved two-column desktop layout. Heading weight/tracking is visually consistent between the H2 and the group H3s (H3s aren't touched by the h1/h2 rule but read as matching weight in these crops).
- **Candidate score (390, dark theme):** "Same person / Different team / Different score" H2 and card title "Anirudh Mehta" show the same serif weight/tracking as the light-theme pages; large `91.1/100` score display doesn't clip or overlap the slider/legend below it.
- **About hero (390):** H1 with inline red "everything" renders at consistent weight/tracking with no overflow into the CTA buttons.
- **Career hero (390):** Title "Senior Delivery Partner" now visually matches the weight of the other page H1s (previously 800, now consuming the shared 500) — no orphaned single-word wrap, no truncation in the scorecard percentages/tags.

No overlap, clipping, mismatched font-family, or leading/tracking outliers observed in any of the five crops. This assessment is limited strictly to these images — I did not load the site in a browser and am not asserting broader route coverage beyond what's shown.
