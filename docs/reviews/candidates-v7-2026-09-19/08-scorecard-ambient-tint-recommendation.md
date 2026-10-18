I have what I need. Here's the review.

## Design review: ambient tint, homepage vs. candidate scorecard

**Semantic case for consistency is real.** Both blocks are the same demonstration — a fixed candidate score reweighted live (`.proof`/`.funnel` on the homepage; `.lab#score` on the candidate page: "Move the bar" ↔ "Change the team"). They're the same feature shown to two audiences. A shared ambient signature would visually mark "this is the reweighting demo" as a site-wide motif, not just a homepage flourish.

**Structural fit is good, not coincidental.** `.lab#score` is a single unique section, directly analogous to `.proof`. Its grid is `.86fr / 1.14fr` — card left, controls right — the same left-card/right-controls arrangement as the homepage's proof layout. The homepage tint sits at 80% -4% (upper right, fading before it reaches the card), which lands over the _controls/heading_ column in both layouts, not the card. That mapping transfers cleanly.

**Color is already load-bearing, not borrowed.** The candidate CSS defines `--red:#DA0007`, i.e. `rgb(218,0,7)` — the exact same red the homepage tint uses. It's already driving `.lt.heavy` glows, `.row.heavy` thumb color, `.row__k`, and `.lab__foot em` in this very section. Adding the tint doesn't introduce a new hue; it extends a color already anchoring this section's "this one carries more weight" language.

**Where it would need to differ from a straight copy:**

- Ground tone: home's tint sits on `#0b0b0b`-ish black; here `.lab` background is `var(--char)` = `#131313`, and the card (`.verd`) has its own multi-stop gradient (`#232320→#1A1A18→#141413`) plus a heavy drop shadow. A tint sized/positioned like home's is fine since it's confined to the right column and behind the header, but it must stay _behind_ both `.verd` and `.rows`/`.pre` controls (z-index 0, content wrapped at z-index 1) so it never washes over the card's own gradient or the red slider-thumb glows on `.row.heavy`.
- Focal position: home's 80% -4% assumes a top-right-heavy composition. The candidate section's heading/dek block sits above `.lab__grid`, spanning full width, so the anchor should sit slightly lower and centered over the _controls column_, not jammed into the extreme corner — otherwise it reads as clipped by the heading text before the grid even starts.
- Mobile: home already reorders `.lab` to `order:-1` and flattens to 1 column under a breakpoint; the tint must not become a visible corner blob once the card stacks above the controls — same risk applies here, so same fix (shrink/reposition at the same breakpoint) is needed.

**Recommended treatment (illustrative, not applied):**

```css
.candidate-v7 .lab,
.candidate-v7 .lab .lab__grid {
  position: relative;
}

.candidate-v7 .lab::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(680px 420px at 78% 8%, rgba(218, 0, 7, 0.07), transparent 60%);
}

.candidate-v7 .lab > .wrap {
  position: relative;
  z-index: 1;
}

@media (max-width: 620px) {
  .candidate-v7 .lab::before {
    background: radial-gradient(420px 300px at 50% -6%, rgba(218, 0, 7, 0.06), transparent 60%);
  }
}
```

Opacity is dialed down from `.09` to `.07` because `.lab`'s own gradient card and heavy-row glows already carry more red incident than the homepage's flatter `.proof` background — stacking the full-strength tint on top would compete rather than unify. Anchor moved from `-4%` to `8%` vertically to clear the full-width heading block before the grid begins.

**RECOMMEND: ADD TINT**
