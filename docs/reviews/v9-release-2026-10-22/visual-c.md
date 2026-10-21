**Verdict: REVISE.** The main reason is that "New Jersey" still shows on several pages even though the owner asked for it to be dropped. There is also one small layout defect.

## Newly found problems (not on the scheduled list)

**1. "New Jersey" still appears (owner asked for it to be dropped)**

- **Footer, every page I checked, both widths.** The bottom line reads "PUNE · BENGALURU · NEW JERSEY". Seen in the footer crops for home, candidates, sample write-up and DPA, and in the full pages for contact, privacy, Intelligence and both industry pages. Source: `src/components/v9/Footer.astro:60`.
- **About, hero, both widths.** The line under the side card reads "FOUNDED JUNE 2024 · PUNE, BENGALURU, NEW JERSEY". At 1366 it wraps so "NEW JERSEY" sits alone on a second line. Source: `src/components/v9/editorial/about/AboutIntro.astro:32`.
- **Contact, "Three offices" section, both widths.** There is a fourth card reading "United States / New Jersey / Address to follow". If that card goes, the heading "Three offices. Come and sit down." needs to change too, or it will be wrong. Source: `src/components/v9/contact/Offices.astro:4` and `:21`.
- **Contact FAQ answer, not visible in the screenshots.** The answer is collapsed in the capture, so I only found it with a text search. It says "Our people sit in Pune, Bengaluru and New Jersey" (`src/components/v9/contact/Questions.astro:54`).
- **Older home footer file.** `src/components/home/v126/sections/footer.html:51` has the same text. I can't tell from the screenshots whether this file is still used.

**2. Banking page, 390 width: the breadcrumb wraps badly**

- At the top of the banking page, "INDUSTRIES" sits on one line, about 9px lower than "· BANKING & FINANCIAL / SERVICES". That second part wraps as its own two-line block next to it, so the two pieces don't line up.
- At 1366 it fits on one line and looks fine. The AI & Data page also fits on one line at 390, so only the banking page has this problem.

## Problems already scheduled, which I can confirm

- **About word collision, 390, hero side card:** "Who will actually belonghere?" shows with no space between "belong" and "here". At 1366 it is correct ("belong / here?").
- **Inconsistent sample/subscription labels:**
  - The home hero card says "Request a sample ›", while the sample write-up page button says "Email me the sample".
  - The Intelligence "Yours, either way" section has a "Get the quarterly note" button next to a line saying quarterly email subscriptions are not available yet.
  - I only saw both at the downscaled full-page size.
- **Not checked:** I didn't look at the Careers page or any journal/article pages, so I can't confirm the repeated Careers text, the missing article, or the related-card links.

## Optional polish (not defects)

1. **Services, 390, hero card:** the "YOURS TO KEEP" stamp sits at the bottom-left, half over the card's bottom border and against the bottom of the screen. At 1366 it sits neatly at the bottom-right.
2. **Banking, 390 and 1366, hero:** the paragraph repeats the headline almost word for word ("where the wrong hire costs more than a quarter"). At 390 it also wraps raggedly and leaves "the job." alone on the last line.
3. **Privacy and DPA, both widths, hero:**
   - The "TRUST AND TRANSPARENCY" label has no red "\" mark, unlike every other v9 label.
   - The text starts further right (x≈253 versus 171 on other pages) and leaves the right side of the page empty.
   - Privacy shows two date styles: "21 October 2026" and "July 27, 2025." (with a trailing full stop).
4. **About, 1366, hero:** the headline uses a high-contrast display font that looks different from the serif headlines on other pages. At 390 it matches the other pages. This may be intentional.
5. **Sample write-up, 1366, hero:** the right half of the hero is empty, and the page preview's small text is decorative and can't be read at 390. It does say it's an invented example.
6. **Candidates, 1366, "From people who have been through it":** the testimonials look like three cards and then one card alone on a second row. This is only from the downscaled full page; I had no close-up of this section.
7. **Contact, AI & Data and Banking, 1366, heroes:** the dotted background behind the right-hand card runs out to the right edge of the screen. It's harmless.

Everything else at readable scale looks clean. The headers, hero sections, shortlist and profile cards, the industry hero bar charts (all add up to 100%), the contact form and timeline, the sample request form, the privacy/DPA body text and the footers have no clipped or overlapping text and no broken cards. The styling is consistent across these pages.

## Images I actually opened

- **Home:** `_-390-top`, `_-390-full`, `_-390-section-0`, `_-390-footer`, `_-1366-top`, `_-1366-full`, `_-1366-section-0`, `_-1366-footer`
- **Candidates:** `_candidates-390-top`, `-390-full`, `-390-section-0`, `-1366-top`, `-1366-full`, `-1366-section-0`, `-1366-footer`
- **Services:** `-390-top`, `-390-full`, `-1366-top`, `-1366-full`
- **About:** `-390-top`, `-390-full`, `-390-section-0`, `-1366-top`, `-1366-full`, `-1366-section-0`
- **Contact:** `-390-top`, `-390-full`, `-1366-top`, `-1366-full`
- **Sample write-up:** `-390-top`, `-390-full`, `-1366-top`, `-1366-full`
- **Intelligence:** `-390-top`, `-390-full`, `-1366-top`, `-1366-full`
- **AI & Data industry page:** `-390-top`, `-390-full`, `-1366-top`, `-1366-full`
- **Banking industry page:** `-390-top`, `-390-full`, `-1366-top`, `-1366-full`
- **Privacy:** `-390-top`, `-390-full`, `-1366-top`, `-1366-full`
- **DPA:** `-390-top`, `-390-full`, `-1366-top`, `-1366-full`

## Coverage limits

- **Close-ups only exist for the top of each page.** For each route there is only a top screenshot, one section crop (which matches the top on the routes I opened) and sometimes a footer crop. Everything below the first screen I saw only in heavily shrunk full pages (about 1/2.3 to 1/6.5 scale at 390, 1/2.3 to 1/4.9 at 1366).
- **Charts and small text below the first screen weren't checked properly.** This includes the home slider and 126→2 grid, the About 319 chart, the Intelligence function chart and the industry comparison charts. I can only vouch for their order, the light/dark section colours and rough spacing, not small-text clipping or collisions.
- **Pages I didn't open:** the section crops for services, contact, sample write-up, Intelligence, the industry pages, privacy and DPA; the remaining footer crops; and `manifest.json` (too large to read).
- **Only two widths and the default state.** Only 390 and 1366 were captured, with nothing in between. I saw no hover, focus or open states, no open mobile menu and no expanded FAQs.
- **Out of scope:** Terms and Security pages, Careers, journal/article pages, and any legal, business, performance or delivery judgement.
