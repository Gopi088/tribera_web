## Coverage table

| Route                     | Desktop (1366) | Mobile (390)  | Copy extract | Notes                                                              |
| ------------------------- | -------------- | ------------- | ------------ | ------------------------------------------------------------------ |
| `/`                       | ✅ full + top  | ✅ full + top | ✅           | Reviewed in full                                                   |
| `/services`               | ✅ top         | ✅ top        | ✅           | Reviewed top viewport only; relied on copy.json for lower sections |
| `/interview-as-a-service` | ✅ top         | ✅ top        | ✅           | Same as above                                                      |
| `/candidates`             | ✅ top         | ✅ top        | ✅           | Same as above                                                      |
| `/contact`                | ✅ top         | ✅ top        | ✅           | Same as above                                                      |
| `/sample-write-up`        | ✅ top         | ✅ top        | ✅           | Short page, reviewed in full                                       |

Not in this packet: `/about`, `/intelligence`, `/case-study`, `/industries/*`, `/blog/*`, `/careers/*`, legal pages. Findings below are scoped only to the six routes supplied.

## Findings

**P1 — `/candidates`, "Your controls" section.** Toggles are styled as live switches ("HIDDEN", "3 BLOCKED", "ROUTED", "LIVE") sitting directly under the core trust promise "Your current employer can't see you." The only disclosure that these are inert is one small italic sentence above the card ("Demo only: these switches do not change an account..."). Given privacy/employer-visibility is the page's central credibility claim, a skimming visitor could mistake the demo for a working setting. _Proposed change:_ put a persistent small badge ("ILLUSTRATIVE") on the card itself, next to the status pills, not only in body copy above it.

**P1 — `/` footer, "Our numbers."** The footer link sits in the COMPANY column beside About/Blog/Careers, implying a dedicated data/methodology page, but it currently routes to `/about` (confirmed intentional per project notes — methodology page not yet built). On a site that leads with hard numbers (126→2, 36 hours, 22 days), a labeled "Our numbers" link landing on generic About copy is a credibility soft-spot for exactly the audience most likely to click it. _Proposed change:_ either relabel the footer link to "About" until the methodology page ships, or ship a minimal stub page at that route restating the numbers already on the homepage with sourcing notes.

**P1 — `/`, "07 · In their words."** This section sits on the hiring-manager-audience homepage (eyebrow: "FOR HEADS OF TALENT & HIRING MANAGERS") but of 5 testimonials shown, 4 are labeled CANDIDATE and only 1 is labeled HIRING TEAM (Sashank Pappu, Antz AI). For a buyer-facing homepage, the dominant social proof is from the wrong side of the transaction. _Proposed change:_ lead with 2–3 hiring-team quotes on `/`, and move the candidate-heavy set to `/candidates` (where it already also appears verbatim, see below).

**P2 — `/` and `/candidates`, "In their words" blocks.** The Anil Giri, Nirmala P, Reema Mitra and Prasath S quotes appear identically on both pages. A visitor comparing the hiring and candidate sides (a plausible path for someone researching the company) sees the same proof twice, which reads as a thinner evidence base than it may actually be. _Proposed change:_ split the testimonial pool so each audience page shows distinct quotes, or add 1–2 new candidate quotes to one of the pages.

**P2 — `/` homepage FAQ, "01 · How is this different from an agency or RPO?"** "RPO" is used unexplained in the very first FAQ question a first-time visitor sees. The rest of the page works hard to avoid jargon (e.g. explicitly writing out "agency," "model," "scorecard"). _Proposed change:_ expand on first use — "...or an RPO (recruiting-process outsourcer)?" — consistent with the plain-language tone elsewhere.

**P2 — `/`, CTA label reuse.** "Start with one role" is used for both the hero CTA (→ `#start`, in-page anchor) and the closing "GET STARTED" CTA (→ `/contact`). Same visible label, two different destinations on the same page. Low risk in normal browsing, but if either button is shared as a standalone link or screenshotted in isolation, the destination is unpredictable from the label alone. _Proposed change:_ keep the hero CTA as "Start with one role" (anchor) and make the closing CTA's distinct action clearer, e.g. "Send us the role →" (to `/contact`), since the surrounding copy already says "Give us the role you're stuck on."

**P3 — `/sample-write-up`.** Visually the thinnest page in the set: a headline, a short paragraph, a bulleted list, one static write-up image, and a form — next to the highly produced, interactive diagrams on `/` and `/services`. Since this page is reached at a high-intent moment (a hiring manager asking to see real work product), the relative plainness may undersell the "see what you're buying" moment. _Proposed change (inference — not confirmed against production, based on the downscaled thumbnail only):_ consider adding a second visible page-1 detail crop or a short "what you'll notice" callout next to the form to make the page feel as considered as the product it's selling.

**P3 — `/` mobile, "126 → 2" and 36-hour timeline diagrams.** Based on the full-page mobile thumbnail (390px), these data-visualization blocks compress into a small, dense area; legibility at this scale wasn't independently confirmed via a dedicated crop. _Flag for a targeted mobile-viewport check of these two components specifically_, since they carry the site's strongest quantitative trust signal.

**P3 — `/services` vs `/interview-as-a-service`, duplicated client-logo strip and testimonial-free FAQ wording.** Not a defect, but the "TEAMS HIRING THROUGH US" strip (Mizuho, Capco, Deloitte...) repeats identically across `/`, `/services`, and presumably `/interview-as-a-service` and `/candidates`. Reasonable for trust-building but worth knowing it's the same 13 logos everywhere in this packet — no diversification by service line or industry.

---

**Limitations:** Only the six routes and viewport crops listed were reviewed; `/about`, `/intelligence`, `/case-study`, legal pages, blog, careers, and industries pages were not assessed. No claims (36 hours, 126→2, 22 days, "50+ senior experts") were fact-checked — these require owner evidence before any public reuse or expansion. The candidate privacy toggles and homepage/candidates scoring sliders are confirmed-illustrative by design per project context and are not reported as functional bugs.
