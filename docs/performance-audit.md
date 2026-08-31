# Tribera Performance Audit

Last reviewed: 2026-05-28

Context:

- Netlify Lighthouse on production homepage reported:
  - Performance: `79`
  - Accessibility: `95`
  - Best Practices: `100`
  - SEO: `100`
- Key metrics:
  - FCP: `3.0s`
  - TTI: `3.8s`
  - Speed Index: `3.8s`
  - TBT: `70ms`
  - LCP: `3.9s`
  - CLS: `0.091`
- Top Lighthouse opportunities:
  - reduce initial server response time
  - reduce unused JavaScript
  - reduce unused CSS
  - preconnect to required origins

This file is a code audit only. No fixes were applied as part of this note.

## Main Findings

### 1. Global chat bootstrap is on the critical path

Files:

- `src/layouts/Layout.astro`

Relevant locations:

- preconnect + preload block around `Layout.astro:41`
- large inline chat runtime begins around `Layout.astro:64`

Why it matters:

- The layout preconnects and preloads Microsoft chat assets for `www.tribera.ai`.
- A large inline script then initializes chat runtime behavior on every production page load.
- That script performs synchronous setup work:
  - DOM queries
  - event listener registration
  - iframe/prewarm handling
  - widget state management
  - badge creation
- This is a strong candidate for:
  - unused JS
  - increased main-thread work
  - slower LCP / TTFB perception on the homepage

Next-pass direction:

- move chat further off the critical path
- reduce bootstrap size
- load only after clear user intent or idle conditions if acceptable

### 2. Homepage hero does too much work above the fold

Files:

- `src/pages/index.astro`

Relevant locations:

- hero section starts around `index.astro:62`
- animated particle field around `index.astro:79`
- hero copy and CTA area around `index.astro:116`
- animated glow card around `index.astro:237`

Why it matters:

- The hero renders 22 decorative particle elements with:
  - inline randomized styles
  - multiple custom properties
  - animation timings
  - box shadows
- This is all in the first viewport, where Lighthouse is measuring LCP.
- Decorative motion appears before core content value is delivered.
- Likely contributors:
  - slower LCP
  - non-composited animation warnings
  - avoid large layout shifts
  - avoid long main-thread tasks

Next-pass direction:

- simplify above-the-fold decorative DOM
- reduce animated elements in the hero
- prioritize headline / CTA rendering over visual effects

### 3. Large modal and CTA scripts are mounted globally

Files:

- `src/layouts/PageLayout.astro`
- `src/components/ContactSalesModal.astro`

Relevant locations:

- `PageLayout.astro:21` mounts `ContactSalesModal`
- directional trigger script starts around `PageLayout.astro:26`
- CTA / demo modal script starts around `PageLayout.astro:136`

Why it matters:

- Modal markup and form logic are shipped even on routes that may never use them.
- Inline scripts attach:
  - scroll listeners
  - resize listeners
  - document click listeners
  - keyboard listeners
  - fetch form submission logic
- This adds JS parse/execute cost and contributes to page-wide DOM and interaction overhead.

Next-pass direction:

- load modal logic only on routes/components that need it
- defer non-critical interaction systems
- reduce global inline script surface

### 4. Header is carrying too much DOM and interaction logic

Files:

- `src/components/widgets/Header.astro`
- `src/layouts/PageLayout.astro`

Relevant locations:

- header mounted globally at `PageLayout.astro:14`
- navigation and dropdown structure begin around `Header.astro:42`
- candidate modal subtree begins around `Header.astro:203`

Why it matters:

- The sticky header includes:
  - dropdown nav systems
  - action buttons
  - a full candidate modal form subtree
- That increases:
  - DOM size
  - CSS work
  - interaction complexity
- This is a likely contributor to Lighthouse reporting:
  - excessive DOM size (`1,270` elements)

Next-pass direction:

- trim header responsibility
- move large modal trees out of the always-rendered header where possible

### 5. Global view-transition/router runtime adds client overhead

Files:

- `src/layouts/Layout.astro`

Relevant locations:

- import at `Layout.astro:17`
- mount at `Layout.astro:60`

Why it matters:

- `ClientRouter` is enabled globally.
- On a marketing site that already carries significant custom runtime code, this adds more client-side work on every route.

Next-pass direction:

- reassess whether global view transitions are worth the JS/runtime cost

### 6. CSS bundle likely contains page-agnostic animation overhead

Files:

- `src/assets/styles/tailwind.css`

Relevant locations:

- utility and animation sections from roughly `tailwind.css:81` onward

Why it matters:

- The stylesheet contains multiple broad animation/background systems:
  - dotted backgrounds
  - iOS animation workarounds
  - marquee logic
  - icon stroke overrides
- This likely contributes to Lighthouse’s unused CSS warning, especially on simpler pages.

Next-pass direction:

- reduce globally shipped decorative CSS
- scope specialized animation styles more tightly

## Suggested Next Pass Order

1. Identify the exact homepage LCP element from a fresh Lighthouse trace.
2. Remove or defer the global chat/bootstrap work from the critical path.
3. Simplify the homepage hero DOM and above-the-fold animation system.
4. Reduce all-pages modal/header script weight.
5. Re-check CSS usage and route-level styling overhead.

## Status

- Not yet addressed
- Keep as a follow-up after the security and dependency stabilization work
