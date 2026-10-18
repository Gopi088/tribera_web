**Review results:**

- **722px (before → after):** neutral grid boxes go from essentially invisible to a soft, consistently perceptible checkerboard field behind the headline. The three red accent cells (near "worth," under "clear your bar," left of CTA row) are now visible as faint red tints rather than disappearing. Text and CTA remain fully legible — the mask gradient still fades the field toward the edges, and contrast against the black headline/red button is unaffected.
- **390px (mobile):** boxes are faintly visible behind the headline and subhead without competing with text; the red cell near "the interview." is subtle, not distracting. Legibility of the "Start with one role" CTA and body copy is unaffected — no boxes overlap the button fill itself in a way that muddies the white label text.
- **1440px (desktop):** field is evenly visible, red cells (3 marked squares) read as light pink accents, not alarming or attention-stealing. No clipping/overflow at grid edges; mask radial gradient still fades correctly into the whitespace.

**Concrete observations:**
- No legibility regression on any headline, subhead, eyebrow, or CTA text at any of the three widths.
- No overflow, clipping, or stacking issues; CTA button and marquee footer render normally at 1440px.
- Opacity increase (0.028→0.04 neutral, →0.17 red) is subtle but clearly restores visibility versus the "before" screenshot, matching the sample's intended light-box field without becoming a busy or distracting pattern.
- Red cells are tasteful accents, not alarming — they don't visually compete with the red CTA button.

No defects found.

**PASS**
