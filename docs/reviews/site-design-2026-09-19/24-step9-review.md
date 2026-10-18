**Step9 — PASS (one verification note)**

**Diff scope (measured).** Six files, 14 hunks. Four new tokens in `content-typography.css`; `tailwind.css`, `sample.css` and `EditorialPage.astro` only swap literals for `var(--token, <same literal>)`, so the warm/editorial paper roles are provably colour-identical even if the token fails to load. `Eyebrow.astro` adds an optional `tone` prop defaulting to `'page'` — additive, no call-site churn. `about.astro` touches exactly two declarations. No serif-H3 or container edits appear, matching the Step8 agreement. Nothing unrelated.

**Visuals (390px).** `missing-390.png`: the 12px kicker sits on one line, the simple error layout and both CTAs are intact — readable. `about-claims-390.png`: the 11px `.own--you` badge in `#ff6b6f` is clearly legible against the dark card and no longer the 8.5px hairline. `home-proof-390-top.png`: 12px eyebrows and the `lab-key` line wrap cleanly; no overflow from the ~8.4–11.2px → 12px growth.

**Note, not a blocker.** The `.eyebrow` rule is scoped to `.v126-home/.v126-footer/.v126-header` wholesale, which includes dark sections; your stated ratios (5.44 white, 4.70 warm) cover light surfaces only. Step9 did not change that colour on dark — it only enlarged the text — so this is pre-existing. Please confirm a dark-surface override exists, or record the dark ratio.

The decorative `\` remains `--v58-red`; `aria-hidden`, so exempt.
