**PASS** — step 05 (operations) is a faithful copy.

Fidelity check:

- Section/wrap structure, `g-white` background class, eyebrow with `\` tick, `h2`, 4-item `ops-grid`, and `ops-foot` are byte-identical to the sample, including all `--d` stagger values (0/70/140/210/280ms).
- Copy text, em-dashes, curly apostrophe in "don't", and `<span class="em">` highlight all match.
- Only diff: `<span class="cu" data-to="36">0</span>` → `...>36<`. This is the stated intentional "static content without JS" change — the rendered value now matches `data-to`, so no JS is needed to show the correct number. Not a fidelity failure.
- CSS excerpts are the sample rules with `:is(.v126-home, .v126-footer, .v126-header)` namespacing applied consistently; no selector specificity conflicts within this section (`.ops`, `.ops-grid`, `.ops-item`, `.ops-eyebrow`, `.ops-n`, `.ops-k`, `.ops-item p`, `.ops-foot`, 820px 2-col breakpoint all present).

Non-blocking observations (no change required):

1. `data-to="36"` is now vestigial on the static value. Harmless, and keeping it preserves markup parity; only worth removing if a future counter script would pick it up and re-animate from a different start value.
2. The top hairline (`.ops-item::before` at `scaleX(0)`) and all hover affordances (`translateY`, `height:3px`, eyebrow color) are gated behind the `.in` class. Since the homepage-scoped reveal JS that adds `.in` to `[data-rv]` is carried over per the stated setup, this matches the sample; just be aware this section's rules/hover are entirely dependent on that observer running here.
3. `.ops-item` stagger relies on inline `--d` also feeding the `::before` transition-delay — preserved correctly, including the first item defaulting to `0ms`.
