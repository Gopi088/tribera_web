Reviewed both evidence captures against the `.start-field` CSS (`src/components/home/v126/sample.css:1198-1219`).

**What's fixed:** At `top: 28%`, the field's radial mask now fades out well before the body paragraph on both breakpoints — desktop grid visibly terminates around the headline's baseline, paragraph text at 1273px starts on clean white with no grid squares behind it. On mobile the field sits behind the eyebrow + headline block and is fully faded before the paragraph begins; it no longer reads as a random strip crossing arbitrary copy. The core regression is resolved.

**Remaining defects:**

1. **Stray red accent square, desktop only.** Two `fill-opacity: 0.15` red squares are visible: one near the eyebrow's `\` tick (reads as intentional — echoes the red tick color), and a second isolated one floating in empty whitespace above-right of the headline, not touching any text, tick, or symmetric counterpart. It reads as a leftover grid-generation artifact rather than a placed accent, which undercuts "intentionally designed."

2. **Asymmetric coverage on the wrapped mobile headline.** At 390px the headline wraps to two lines ("...you're / stuck on."). Because the field's vertical center is fixed at the section's 28% mark, the grid is dense behind line 1 but has visibly faded to almost nothing by line 2 — the accent supports the first line strongly and the second line barely at all. On desktop (single-line headline) the same mask reads as evenly centered. This is a minor but real responsive-consistency gap: the relationship between field and headline isn't the same shape at both breakpoints, only the "doesn't cross the paragraph" constraint is.

Neither issue reintroduces the original failure (paragraph collision / mid-paragraph strip), and legibility and hierarchy are otherwise intact at both sizes — dark serif headline reads cleanly over the 5%-opacity grid, CTA row sits on clear white in both captures.

**PASS**
