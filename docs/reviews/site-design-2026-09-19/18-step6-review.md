**PASS**

**Measured (diff, 8 changed lines):** A single `isBlogRoute` predicate is defined once and reused verbatim in both the desktop (`.nav__l[href="/blog"]`) and mobile (`.navp a[href="/blog"]`) calls. It covers `/blog`, `/blog/*`, `/category/*`, `/tag/*`. The exact-vs-prefix pairing matches the pattern used by every sibling item, so `/blogs-extra` or `/categories` cannot false-match. All other `markPage` lines — Services, Intelligence, About, Contact, Careers, home — are byte-identical; no destinations, Coverage, switch, login or CTA markup touched.

**Visual:** 1520px shows Blog underlined, all seven items and the CTA in original order/spacing. 390px shows Blog with the grey active fill; Coverage, Log in, CTA and row rhythm unchanged.

**Judgment:** Predicate correct and active state renders as specified on both breakpoints. Not verified here: that `/category/*` and `/tag/*` are the only archive prefixes in the router.
