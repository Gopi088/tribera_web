## Step 09 — `#ways` review

**Markup fidelity: PASS.** The copied section is byte-for-byte identical to the sample: same section/`id`/class, same `max-width:640px` wrapper, eyebrow with `\` tick, `--d` stagger values (60/100/220/250ms), both `.way` cards with identical tag/h3/p/`.more` copy and the `&#8217;` entity, the `.ways-merge` SVG (`viewBox="0 0 800 66"`, `preserveAspectRatio="none"`, both `pathLength="1"` curves, `.wm-node`), `aria-hidden="true"`, and both footer paragraphs. `/services` is a real route, consistent with the intentional placeholder-link fix. No stray edits, no re-ordering, no `data-rv` loss.

**One actionable CSS issue (no-JS fallback is broken for the merge dot):**

The static-fallback rule loses on specificity to the component rule:

- Component: `:is(.v126-home, …) .ways-merge .wm-node { opacity:0 }` → specificity **(0,3,0)**
- Fallback: `:is(.v126-home, …) :is(.xp, …, .wm-node) { opacity:1 }` → `:is()` takes its most specific argument, so **(0,2,0)**

Result: without JS (i.e. before/without `.ways-merge.in`) the two converging strokes _do_ render (that fallback ties at (0,2,1) with `.ways-merge path` and wins on source order), but the junction dot stays invisible — you get two lines converging on nothing. This contradicts the stated "preserve static content without JS" goal, and it only self-corrects under `prefers-reduced-motion:reduce`, where the (0,3,0) media-query rule sets `opacity:1`.

Fix by raising the fallback's specificity for this selector, e.g. add `.ways-merge .wm-node` to the fallback selector list (or `:is(…) .ways-merge .wm-node{opacity:1}` placed after the component rule), rather than relying on the flat `:is()` group.

**Note (not a defect, just flagging for the later responsive pass):** `#ways .ways-merge` is hidden at `max-width:900px`, while the `.ways{grid-template-columns:1fr}` collapse sits in a media query whose breakpoint is omitted from the excerpt. If those two breakpoints differ, the merge graphic will briefly point at a single-column stack. Worth confirming they share the same threshold when the full media-query context is available.
