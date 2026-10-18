**Defects found:**

1. **Accessibility — missing separator in markup**: `proof.html:51` has `<span>Red outline: leading role priorities</span><span>Amber score: 2/5 or lower</span>` with no whitespace or delimiter between the spans. The `flex` gap in `.lab-key` (sample.css:4733–4743) supplies visual spacing, but the accessible-description text computed from `aria-describedby="labKey"` (and any plain-text extraction/copy) concatenates them with no space: "...priorities" + "Amber score..." risk reading/joining as "prioritiesAmber score." Add a visible separator (e.g. `·`) or at least a text space between the two spans.

2. **Redundant stacked dividers**: the card now closes with three consecutive top-border rules in quick succession — the verdict-panel border, then `.verd-note`'s implicit spacing, then `.lab-key`'s own `border-top` (sample.css:4739). Not broken, but the bottom of the card reads as slightly divider-heavy at 1450px; worth confirming intentional.

**Checks that passed:**
- Contrast: `--pw2` (rgba(255,255,255,.58)) on the dark card composites to roughly 6.9:1 against the card background — clears AA for the 10px text.
- Mobile (390px): labels wrap to their own lines cleanly, no overflow/clipping, matches screenshot.
- `aria-describedby="labKey"` still correctly targets the moved element; screen-reader association is unaffected by the DOM repositioning itself.
- Visual hierarchy: demoting the key to a footnote below the verdict note is reasonable now that the live red outline/amber tiles carry the primary visual cue.

**PASS** (ship with the missing-separator fix recommended before merge).
