## Corrected findings

**Mobile H1 (390px, experts-390.png) — re-transcribed:**

```
Senior experts who've
done the job — held to
one bar: the one you set.
```

This is **3 lines**, not 4, and there is no orphaned "one" on its own line — "one bar:" and the italic "the one you set." wrap onto the same third line. The prior report's transcription was wrong. **No orphan exists; no nowrap/non-breaking-space fix is warranted.**

**Heading level:** Confirmed the prior report mislabeled this as an H1. Per your instruction, the source defines it as an H2 — treat it as a section-level heading, not a hero H1. The full-width title with subtitle below (user-approved layout) is unaffected and should be retained as-is.

**Desktop layout (1520px, experts-1520.png):** The expertise section is a **two-column grid containing four groups** (Engineering & infrastructure / Finance & risk on row 1, Operations / Product & leadership on row 2) — not a four-column layout. Prior report's "four-column expertise grid" description was incorrect.

**Revised verdict (these two images only):** Pass. Heading wraps cleanly at 3 lines on mobile with no orphan; desktop 2-column/4-group layout has consistent spacing and alignment. No line-wrap fix needed.

## Source verification

- **Layout.astro:210–285 / CriticalStyles.astro:** `CriticalStyles.astro` contains no hero `h1` font-size overrides — it's now scoped to grid/layout geometry only (`hero__top`, `hero__card`, padding), so that obsolete override is gone from there. However, `Layout.astro:206–213` still has a hardcoded `.hero h1` critical-path rule (`font-family: Figtree`, `font-size: clamp(36px, 4.6vw, 62px)`, `font-weight: 800`, `line-height: 0.97`) that is independent of the `--type-hero-size` token and uses a different font family than the Fraunces requirement enforced by the test suite. This appears to be an intentional pre-hydration FOUC guard rather than a leftover duplicate, but it's worth confirming that's still the intent, since it doesn't match the centralized type tokens.

- **tests/content-typography.test.mjs:** Confirmed — the viewport list at line 22 includes `320`, and explicit card-role selectors (`.v58-heading--h3`, `.c-preview__heading h3`, mapped to `role: 'card'`) are present at lines 45–50. Both are covered as you expected.
