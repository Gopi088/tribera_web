I have everything: prior review, corrected source, both clean renders, corrected validation, and the `EditorialPage` system the page inherits from.

# Verdict: PASS

All four required items are fixed, verified independently in source **and** in measured output. Ship it.

---

## Required item 1 — Shared left edge ✅

Both offending `padding-inline` rules are gone. The hero rule (source 4374–4381) now carries only `min-height`, `padding-block`, `color`, and `max-width: 760px` on `__copy`; there is no `.industries-sectors__inner` rule at all. Both elements keep `class="wrap"` (4585, 4600) and are governed solely by `EditorialPage`'s `:root .site-editorial .wrap { width: min(calc(100% - clamp(44px,10vw,144px)), 1160px); padding-inline: 0 }` (EditorialPage 31–36), exactly as prescribed.

Measured, `heroLeft === sectorLeft` at every viewport:

| Viewport   | 320 | 390 | 768 | 1520 | 1920 |
| ---------- | --- | --- | --- | ---- | ---- |
| heroLeft   | 22  | 22  | 38  | 173  | 373  |
| sectorLeft | 22  | 22  | 38  | 173  | 373  |

The 72px desktop / 22px mobile offset is gone. Confirmed visually in both renders: `COVERAGE`, the H1, the lead, the CTA, `WHERE WE RUN MANDATES`, "Twelve sectors.", the card column, and `WHAT DOESN'T MOVE` all sit on one rule. Note the hero left also moved 252px → 173px, i.e. the _hero_ was corrected down to the page edge rather than the page being pushed out to meet it — the right direction.

## Required item 2 — Hover outline removed, focus ring intact ✅

`.secx__link:is(:hover, :focus-visible)` (4481–4484) now contains only `border-color` and `box-shadow`. Both `outline` declarations are deleted. Validation records `hoverOutline: "none"` at 1520.

Keyboard focus is still supplied, from two independent sources, and nothing suppresses it — there is no `outline: none` on `.secx__link` anywhere:

- `EditorialPage` 318–321: `:root .site-editorial :is(a, button, input, select, textarea):focus-visible { outline: 2px solid var(--red); outline-offset: 3px }`. `.secx__link` is an `<a>`, so it matches.
- The page's own global `:focus-visible { outline: 2px solid var(--red); outline-offset: 3px }` (75–78) as a floor.

The system's 3px offset is restored. Hover is now four coordinated signals (border, shadow, name, arrow) instead of five with a red ring — the restraint the rejection was about.

## Required item 3 — Duplicates removed, mobile card metrics correct ✅

One mobile block survives, and it is the intended one (4518–4527):

```css
@media (max-width: 759px) {
  .secx {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .secx__link {
    min-height: 0;
    padding: 20px;
  }
}
```

The `max-width: 767px` block (4554–4570) now contains **only** hero rules — no `.secx` or `.secx__link` declarations. The `min-height: 112px` override that was silently beating `min-height: 0` is gone, and there is exactly one industries `@media (prefers-reduced-motion: reduce)` block (4528–4534) targeting `.secx__link, .secx__name, .secx__arrow`; the dead `::before` duplicate is deleted.

Measured `cardMinHeight`: `0px` at 320 and 390, `152px` at 768/1520/1920 — the rule now applies where intended and only there. The 390 render confirms the behavioural payoff: short-description cards (Product & SaaS, Pharmaceutical, Industrial & engineering, AI & data, GCC) now hug their text and are visibly shorter than the two-line cards. The dead space is gone.

The 760–767px hole is also closed — that band now resolves to 2 columns at 20px via the `max-width: 1023px` rule, a defined state rather than the previous one-column-at-wrong-gap. Mobile page height dropped 4616 → 4571px, consistent with ~5 cards shedding their padding.

## Required item 4 — Sector band on `var(--paper)` ✅

Source 4433–4435: `.industries-sectors { background: var(--paper) }`. Within `.site-editorial` that resolves to `var(--surface-paper-editorial, #f4f3f0)` (EditorialPage 17), **not** the page-level `:root --paper: #f2f2f0` — and the measurement proves which one won: `sectorBg: "rgb(244, 243, 240)"` = `#f4f3f0` at all five viewports. That is byte-identical to the closing band, which inherits the same token off `.site-editorial`'s own background. The hand-mixed `#f1eee7` cream is gone and both off-whites on the page are now one value. Confirmed in the 1520 render — sector band and closing band read as a single surface.

---

## Optional improvements — applied and verified

- **One section-heading size.** `.industries-sectors__head h2` (4444–4448) now sets only `max-width: none`, `margin`, `color`. Size, weight, tracking and leading all fall through to `EditorialPage`'s `:is(h2, .h2)` → `--type-section-size` / `--type-display-weight` / `--type-display-tracking` / `--type-section-leading`. In the 1520 render all three H2s — "Twelve sectors.", "The method is the same in all twelve.", "We cover more than we list, but not everything." — now render at the same size. The one-H2-outranking-the-others tell is resolved.
- **Hero wash.** No `background` override remains on `.industries-hero`, so `EditorialPage`'s `radial-gradient(ellipse at 35% 0%, rgba(218,0,7,.035), transparent 60%), #fff` (line 72) shows through. Visible in the desktop render as the faint warm bloom above the H1. Ties the hero to the homepage at zero added noise.
- **Tokens over literals.** `font-weight: var(--type-display-weight)`, `letter-spacing: var(--type-display-tracking)`, `color: var(--type-kicker-neutral, #6b6a61)`, and the lead's `color: var(--grey)` all now reference the system.
- **Hero lead shortened.** Now one sentence — _"What we ask a candidate to evidence changes with the sector."_ The verbatim restatement of "how the decision gets made does not" 1,100px later is gone; the method dek is the only place that claim lands, and it lands with four steps behind it.

## Non-blocking residue (do not hold the ship)

- Some literals still restate tokens: `color: #131313` (= `--ink`), `#same { background: #121212 }` (= `--char`), `.secx__desc { color: #6b6b67 }`, `.secx__link { border-color: #e3e3df }`. Same pixels today; drift risk only if a token moves.
- `#same .step { cursor: default; opacity: 1 }` (4540–4543) still duplicates `EditorialPage` 164–167.
- The inline `style="text-align:center;justify-items:center"` on the method band's `.shead` (4708) is still inert — `section:not(.close) .shead` forces left with `!important`. Cosmetic dead code.
- **One thing to eyeball before release, not a defect I can attribute:** validation adds a `hiddenAfterScroll` field reading 5 / 2 / 0 / 1 / 1 at 320/390/768/1520/1920. I can't determine its definition from the supplied evidence, so I won't score it. It tracks page height rather than any viewport-dependent CSS (there is none for reveals), which reads as scroll/transition timing in the harness — a 0.9s transition plus up to 180ms delay measured too soon. The guarantee the prior review actually required is met: `nojs.hiddenReveal: 0` at both 390 and 1520, so no content is ever unreachable without JS, and the reduced-motion path forces `opacity: 1`. Worth a manual scroll on a phone to close it out.

## Regression check clean

12/12 sector links return 200. No overflow at any of the five viewports (`documentWidth` ≤ viewport throughout). Columns are 1 / 1 / 2 / 3 / 3 at 320 / 390 / 768 / 1520 / 1920 — the 3/2/1 spec exactly. Desktop height 3271 → 3222px. `SiteHeader`, the method band and the closing band are structurally untouched.

---

## Stakeholder objections — resolved

**"AI generated."** The four-field template is two fields deep, the aphorism layer is deleted, antitheses are down from seven to three (and only where the recommendation said to keep them), "twelve" from six to two, and the page no longer narrates itself. The hero lead shortening removed the last verbatim self-echo.

**"Too much noise."** 84 marks and 12 resting red ticks became 36 marks and none. The last piece of gratuitous red — the hover ring on all 12 cards — is now gone too, which was the one noise defect the _corrected_ build had introduced on the page that was rejected for noise.

**"The old Netlify page looked cleaner."** That was about containment, and it's recovered: a real `--paper` band with a hard edge, white cards with 16px radius, hairline and shadow — the Netlify discipline without its sparklines, keeping the stronger point Netlify lacked. With the band now on the same off-white as the closing band and the hero sharing the page's left rule, the page finally reads as one grid instead of three.

The two blockers and two cleanups are closed, the four optional improvements landed, and nothing regressed. **Ready to ship.**
