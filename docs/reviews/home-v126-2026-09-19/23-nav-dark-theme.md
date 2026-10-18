## Review scope problem (blocking)

The only source supplied in `/tmp/tribera-header-backing-review.txt` is:

1. A prose description of the intended fix, and
2. A **truncated** excerpt of a Playwright spec that begins mid-statement (`ath: ${shots}/${width}.png` …).

Nothing in the supplied material contains the implementation being reviewed: no `.v126-header` / wrapper CSS rule, no nav CSS, no shared `Layout` component, no theme-class logic. I cannot confirm that `background:#fff` was applied to the wrapper, that the sample nav's `rgba(255,255,255,.75)` was left untouched, or that the dark class is applied where the description claims. **A PASS cannot be issued against a description of a diff.**

## Concrete issues visible in what _was_ supplied

**1. The test additions the description claims do not exist in the supplied spec.**
The excerpt covers layout/scoring/FAQ/no-JS/marquee/funnel-focus assertions only. There is no `colorScheme: 'dark'` page context, no 1920 viewport case, and no assertion on wrapper or nav `backgroundColor` anywhere in the supplied file. Either the excerpt was cut before those lines (in which case they must be supplied to be reviewed) or the claimed regression test is absent. As supplied, the fix has **zero** test coverage.

**2. The described assertion is insufficient even if present.**
"Wrapper white and nav white" asserts background only. The failure mode this fix targets is theme-driven color inversion; a dark class that also flips nav link/label `color` to a light value will now render light text on a force-white wrapper — an invisible or sub-4.5:1 nav — and the described assertions would still pass. The regression test must also assert the nav's resolved foreground `color` (and any logo/icon `fill`/`currentColor`) under the dark context, not just background.

**3. The dropdown is not covered by the wrapper backing.**
Per the stated geometry — wrapper `position:sticky`, inner nav `position:relative`, dropdown `position:absolute` _below_ the nav — the dropdown's painted box extends outside the wrapper's border box. A wrapper `background:#fff` paints only the wrapper's own box, so an open dropdown that inherits the sample's translucent `rgba(255,255,255,.75)` still composites over the (possibly dark) body and exhibits exactly the bug being fixed. The fix must either give the dropdown panel its own opaque backing or the dropdown must be verified as already opaque; neither is shown. This is the same class of defect, one layer down, and the described test (nav only) would not catch it.

**4. `z-index:60` on a sticky wrapper that is now opaque.**
Previously transparent, the wrapper's box did not visually occlude. Now opaque and stacked at 60, any content that legitimately needs to pass under/over the header band (skip-link target, focus ring of the first in-page element, in-page anchor offsets) will be clipped/hidden against a solid band rather than a see-through one. Worth confirming the skip-to-content link and anchor scroll offset still work; not verifiable from the supplied text.

## Verdict

**Not PASS.** Supply the actual wrapper/nav CSS, the shared `Layout` theme-class code, and the complete spec file (including the dark-scheme 1920 case). Independently of that, items **2** and **3** are concrete defects in the fix as described: the assertion set cannot detect a foreground-color inversion, and the force-white wrapper does not back the absolutely-positioned dropdown.
