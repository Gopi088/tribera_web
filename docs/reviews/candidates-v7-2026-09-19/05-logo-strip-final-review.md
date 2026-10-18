## Review: Candidate Logo Strip (hybrid alignment)

**1440px:** Label reads as intended (mono, uppercase, small, muted — "Teams hiring through us"), still nested in the light hero, not converted to a dark section-breaker. Company names are Fraunces 500 at a legible size relative to the label, red `·` separators are present and consistent, marquee row runs clean with no visible seam artifact or double-dot at the loop point (the `::after` rule targets both the original spans and the `.logos__dup` spans, so the separator rhythm carries through the wrap).

**390px:** Same structure holds — label stays small and out of the way, names scale down to the clamp floor (~17px) and remain legible, separators render correctly. The last visible name is cut mid-word at the viewport edge, but that's expected marquee/mask behavior (`overflow:hidden` + edge mask), not new overflow — no horizontal page scroll is introduced.

**CSS check (lines 252–275):** `.logos__tk span` correctly uses `var(--display)` (Fraunces) at `font-weight:500` with the clamp sizing described. Separator implementation via pseudo-elements is sound and matches the homepage's `.dot`-style pattern conceptually.

**One inconsistency worth flagging (non-blocking):** the resting-state color is `var(--ink2)` (`#57565B`), essentially unchanged from the pre-fix `#5C5C57` — the implementation description says "stronger ink contrast" but the default state barely moved; full `var(--ink)` only applies on `:hover`/`:focus-within`, which pauses the marquee and is unreachable on touch. Contrast against white is still comfortably AA-compliant (~7.3:1) either way, so this doesn't break legibility, but the "stronger contrast" claim overstates what changed for the default (non-hover, non-desktop) state.

No layout defects, no overflow, scaling is appropriate at both ends tested, and the loop math change (`-50%` with separator-rendered gaps) produces a visually continuous scroll with no jump or duplicate/missing dot.

**PASS**
