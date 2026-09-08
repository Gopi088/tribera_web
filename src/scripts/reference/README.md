# Reference Page Interactions

The 18 reference-derived routes import `initReferenceInteractions` from this
directory instead of carrying independent copies of the same browser script.
The current hiring and candidate demos retain their own implementations.

## Modules

- `volume.ts`: volume selector and its detail panel.
- `rubric.ts`: weights, scores, presets and linked highlighting.
- `score-card.ts`: score captions, pointer tilt and card faces.
- `funnel.ts`: candidate squares, stage selection and linked highlighting.
- `motion.ts`: section reveals, signal filters and tally animations.
- `candidate-ui.ts`: sticky apply bar and filename feedback.
- `copy.ts`: preserved standard/blog text variants.
- `dom.ts`: scoped ID lookup and initialization registry.

## Usage

Call the initializer from an Astro processed script after its markup is present.
The default root is the document. For separate widget instances, pass a distinct
container for each instance; IDs and other selectors resolve within that root.
Each feature initializes once per root. Calling it on an empty root does not
prevent initialization after markup is inserted. Replacing an already-initialized
widget requires a new root. This is not a client-router lifecycle manager.

The entry point preserves the original setup order. Features check for their
markup before binding listeners. Copy and card-click variants are explicit
options, rather than inferred from URLs. Individual feature initializers can
also be imported when a page needs only that feature.

Contact/newsletter submission, article reading progress, page-specific comparisons
and filters remain local. Inactive `text/plain` reference scripts have not been
removed or activated by this extraction.

## Verification

`tests/reference-widgets.test.mjs` checks repeated setup, late mounting, independent
rubric state, scoped card flips and upload labels. The route smoke and existing
interaction tests verify the callers. No change to copy, HTML or CSS is intended.
