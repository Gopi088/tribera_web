## Coverage Table

| Route                                             | Desktop       | Mobile | Copy (JSON) | Notes                                             |
| ------------------------------------------------- | ------------- | ------ | ----------- | ------------------------------------------------- |
| /blog                                             | ✅ top        | ✅ top | ✅          | Full-page images not opened; top crop + copy only |
| /blog/seventeen-interviews-one-hire               | ✅ top        | ✅ top | ✅          |                                                   |
| /blog/rethinking-hiring-metrics-signal-efficiency | ✅ top        | —      | ✅          | Mobile screenshot not opened                      |
| /careers                                          | ✅ top        | ✅ top | ✅          |                                                   |
| /careers/ai-ml-engineer                           | ✅ top        | —      | ✅          | Mobile screenshot not opened                      |
| /functions                                        | ✅ top        | ✅ top | ✅          |                                                   |
| /functions/engineering-platform                   | ✅ top        | —      | ✅          | Mobile screenshot not opened                      |
| /candidates/start                                 | ✅ top + full | ✅ top | ✅          | Full-page desktop opened                          |
| /privacy                                          | ✅ top        | ✅ top | ✅          |                                                   |
| /security                                         | ✅ top        | —      | ✅          | Mobile screenshot not opened                      |
| /terms                                            | ✅ top        | —      | ✅          | Mobile screenshot not opened                      |
| /dpa                                              | ✅ top        | —      | ✅          | Mobile screenshot not opened                      |

Only the above packet was reviewed; no other site routes were assessed. Below-the-fold sections not shown in `-top` crops were read from copy.json text only, not visually verified for those routes.

## Findings

**P1 — Careers (`/careers`), "Open roles" / "What it is actually like" sections: verbatim duplicated paragraph.**
Exact text — _"Pune and Bengaluru, with people in both. The roles open right now are in the Bengaluru office, in Indiranagar, where somebody makes filter coffee at about four."_ — appears twice, word-for-word, once under OPEN ROLES and again just before HOW WE HIRE. Reads as a templating/content-duplication slip, not a stylistic callback (the "Belong/Build/Become" motif repeats by design; this doesn't). **Fix:** remove the second instance, or replace it with a line specific to "What it is actually like" (e.g., team culture detail) rather than repeating the office-location sentence.

**P1 — /candidates/start, "Submit profile" CTA: off-brand washed-out color.**
Screenshot shows the primary CTA rendered as a muted salmon/pink, while every other primary CTA reviewed (Careers "See the roles," AI/ML Engineer "Apply for this role," Blog "Read the latest") is a solid saturated red. This is the one page whose entire job is to capture a candidate's CV, and the lighter tone reads as disabled/inactive rather than "restrained." **Fix:** confirm whether this is an unintended default/disabled style bleeding through, or a deliberate inactive state for a not-yet-wired form; if the latter, add inline microcopy (e.g., "Profile submission opens soon") so the lighter button is legible as intentional rather than broken.

**P2 — Privacy/Terms/Security, header dates: prominence imbalance between the two dates.**
Observed exactly as instructed — "Page updated" is the presentation date and "Content last revised" is the real policy date; this is intentional and not misreported here as a false update. But visually, both lines carry identical weight/size with "Page updated" listed first, so a scanning reader is more likely to register "updated 21 October 2026" than the older substantive date beneath it. **Fix:** differentiate the two lines typographically (e.g., mute "Page updated" to a caption-weight note, keep "Content last revised" as the primary legal date) so the distinction the owner intends is actually legible at a glance.

**P2 — Blog, newsletter CTA: disclosure of unavailability is inconsistent across surfaces.**
On the article page (`/blog/seventeen-interviews-one-hire`), the newsletter block explicitly states "Newsletter subscriptions are not available yet." The `/blog` index page's equivalent CTAs ("Join the newsletter waitlist," "Notify me") carry no such note in the extracted copy — only "We never share the list." A visitor landing on the index gets no signal the signup is a waitlist/illustrative state until they reach an article. **Fix:** surface the same "not available yet" framing next to the index-page CTA, or rename the button itself (e.g., "Join the waitlist" is already close — ensure the explanatory line travels with it everywhere the CTA appears).

**P2 — Blog teaser cards: some statistics are sourced, others aren't.**
The lead article's "17.6 interviews" figure is footnoted to an Ashby report. The teaser cards for "NO. 09 — 2.3M AI job openings expected in India by 2027" and "NO. 08 — 2,117 capability centres in India" carry no visible citation in the extracted copy. Inconsistent sourcing on adjacent cards undercuts the credibility the cited stat is trying to build. **Flag for owner:** confirm sources exist for the 2.3M and 2,117 figures and surface them (even a footnote link) the way the lead article does — no replacement figures are proposed here since these claims weren't verified by this review.

**P3 — Privacy/Terms/Security/DPA: narrow single-column layout leaves large unused desktop space.**
Consistently across all four legal pages (not a one-off bug), body copy sits in a ~630px column against a 1366px canvas, leaving roughly 45% of the right side empty. This is presumably a deliberate "readable line length" choice, but it sits oddly next to the richer two-column editorial hero treatment used elsewhere on the site. **Suggestion:** use the right rail for something purposeful and on-brand — a quick-link card to the other Trust & Transparency pages (Security/Terms/Privacy/DPA) or a contact card — rather than leaving it blank.

---

**Limitations:** this review covers only the 12 routes and screenshot/copy artifacts listed in the packet (desktop `-top` crops plus full copy.json for all; a handful of full-page and mobile images were not opened). No interaction testing, no verification of linked claims (Ashby citation, 200,000 interviews, etc.), and no comparison against routes outside this packet.
