## Why it reads as AI-written

Measured, from source and the 1520 capture:

1. **One template, filled twelve times.** Every row is the identical four-part stack: name + `→`, description, hairline, red tick + `EVIDENCE THAT MATTERS` + bold phrase. That's 48 text elements and 12 red ticks in one block. Humans vary; generators don't.
2. **The same rhetorical figure in 7 of 12 phrases** — "Control failure, *not* framework recall", "Time on the floor, *not* time in the plan", "Incident response *over* certification", "who ship — *not* people who clear a screen", "who run plants, *not* ones who describe them", "Product thinkers. *Not just* product managers". The X-not-Y antithesis repeated is the strongest tell on the page.
3. **The page narrates itself.** "All twelve sectors we run mandates in are listed below" tells the reader what they can already see.
4. **One idea stated four times:** H1 → hero lead ("how the decision gets made… does not") → method dek ("It never changes how the decision gets made") → closing line. "Twelve" appears 6×.
5. **Two eyebrows back-to-back** (`\ COVERAGE — TWELVE SECTORS`, then `TWELVE SECTORS · CHOOSE YOURS`) with no band between them.
6. **No section boundary.** Hero and all 12 links sit inside one `<header class="hero industries-hero">` on white — `comparison.json` reports 3 sections vs the old page's 4. The old page's containment (paper band, white cards, shadow) is gone; the rows are a table pretending to be cards.

## Direction: two bands, one line per sector

**Hero** — white band, ends at a hard edge.

- Eyebrow: `Coverage`
- H1 (keep): `What counts as proof` / *`changes with the sector.`*
- Lead, one sentence: `What we ask a candidate to evidence changes with the sector. How the decision gets made does not.`
- Single CTA: `Ask about your sector` → `/contact`

**Sector band** — new `<section class="band">` on `--paper`.

- Eyebrow red: `Where we run mandates`
- H2: `Twelve sectors.`
- No dek. Nothing between heading and grid.

**Each card — exactly two things:**

1. Sector name (existing), Inter Tight 600 / 17px / `--ink`, with muted `→` right-aligned; name and arrow go `--red` on hover.
2. Existing description, 14px / 1.5 / `--grey`.

Nothing else. The description already makes every link understandable; the bold phrase belongs on the sector page, which is the reward for clicking.

**Card shell:** `--card` white, 16px radius, 1px `--hair`, 24px padding, equal min-height, existing `.panel` hover shadow. This is the old page's rhythm minus its sparklines.

**Layout:** ≥1024px — 3 columns, 20px gap, 1160px wrap. 760–1023px — 2 columns. <760px — 1 column, 14px gap, full-width cards. Mobile height drops from 5308px to roughly 3400px.

## Delete

- All 12 `.secx__weight` blocks (label `Evidence that matters`, the 12 bold phrases, the red tick) and all 12 `.secx__rule` hairlines — plus their CSS.
- Hero sentence "All twelve sectors we run mandates in are listed below."
- Secondary hero link `How the method works ›` and the `#same` scroll — that section is the next thing on screen.
- Eyebrow `Twelve sectors · choose yours`.
- Closing line `Twelve sectors. One way of making the call.` — the H2 above it already says it.
- `.secx` borderless-row CSS; rebuild as cards.

**Unchanged:** `SiteHeader`, `SiteFooter`, the dark method band (four steps), the "Not listed" CTA band, all 12 hrefs, and the `--display`/`--ui`/`--mono`, `--red #da0007`, `--paper`/`--card`/`--char` system.

**Judgment, not measurement:** losing the twelve phrases costs some distinctiveness on this page. I'd take it. Twelve aphorisms in one viewport read as generated; one per sector page reads as written. Restraint is the thing the stakeholder is asking for, and restraint means the index does one job — routing — and does it in two lines per card.
