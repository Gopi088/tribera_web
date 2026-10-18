# QA report

Handoff v9, 17 October 2026. Every page was tested in Chromium with the real brand fonts at 360, 768, 1024, 1366 and 1920 px wide, then reviewed by eye at 1366 and 390.

## Results after fixes

| Check | Result |
|---|---|
| Pages tested | 40 pages plus 404 |
| Sideways scrolling | 0 pages |
| Elements wider than the screen | 0 |
| Text cut off inside its box | 0 |
| Script errors or console errors | 0 |
| Broken images, distorted images | 0, 0 |
| Images without alt text | 0 |
| Links or buttons without a label | 0 |
| Duplicate IDs, dead `#anchors` | 0, 0 |
| Heading levels skipped | 0 |
| Pages with more than one h1 | 0 |
| Internal links to missing pages | 0 |
| Search titles over 60 characters | 0 |

## Fixed in this pass

- **About, founder cards.** The three bios ran 7, 5 and 4 lines, so the cards looked uneven. They are now the same length (5/5/5 at desktop widths), and the italic closing line sits at the same height on all three.
- **Contact, office photos.** Pune and Bengaluru photos rendered at different heights (354 px vs 332 px), and the captions ran 3 and 6 lines. Both photos are now the same 3:2 frame, and both captions follow one pattern: label, name, full address.
- **Careers headline at 360 px.** "We publish the bar we hire you against." overflowed on small phones because the underlined phrase couldn't wrap. The underline moved to "the bar", which wraps cleanly.
- **Role page, process cards.** Card text ran 1 to 3 lines; now 3/3/3/3.
- **Banking page, market figure.** An old style made the footnote number a full-width grey bar. Removed.
- **Case study headline.** "twenty-two" could break at the hyphen. Now a non-breaking hyphen.
- **Footer.** "How we work with numbers" wrapped onto two lines on phones; now "Our numbers".
- **Touch targets.** On phones, footer links, the logo, text links, filter chips, toggles and form fields are at least 40 to 44 px tall. The footnote numbers have an enlarged invisible tap area.
- **Contrast.** The red "Belong" in the footer on charcoal was 3.6:1; it now uses the lighter red the system already uses on dark grounds. Three 10 px hints on the candidates page moved up to 11 px with stronger grey.
- **Small avatars on dark grounds** (Pranav's signature on Services) were too dark to see; they now have a hairline ring and lifted brightness.
- **Lead paragraphs** are balanced, so they rarely end on a single word.
- **Home and candidates heroes.** The two first-screen cards were 449 px and 496 px tall, with different side insets and tag styles, so the headline, button and card sat at different heights on the two pages. Both cards are now 496 px with an 18 px inset and identical tags. The eyebrow, headline, button and card occupy exactly the same positions on both pages at 1024 to 1920 px.
- **First-screen motion.** The background grid had a scan so faint it went unnoticed. It now reads as intended, and stays quiet: a soft light passes across the grid every 14 seconds, a few cells in the rows under the button light up as it passes, and on every second pass one of them turns red, the brand's mark for someone who cleared the bar. The card and grid drift a few pixels apart as the cursor moves, which gives the screen depth. All of it pauses off-screen, in background tabs and for visitors who prefer reduced motion. Nothing moves on phones except the scan.
- **Every first-screen card.** Home, candidates, Services and Intelligence cards are all 496 px, with eyebrow, headline and card at identical positions. The compact heroes (Interview as a service, the case study, contact and the twelve sector pages) now carry the same grid field behind their card, with the same quiet scan and cursor depth.
- **Homepage, "Who interviews".** The five-row list became an interactive panel: pick a field and see a fluent answer struck through in red, then what the interviewer actually listens for. It advances by itself every 7 seconds while on screen, pauses on hover, and stops for good the moment someone clicks or uses the arrow keys. On phones the fields become a row of chips.
- **The scorer on home and candidates** shows itself once: four seconds after it comes into view it switches to the next brief and back, so visitors see the verdict move. It never runs again, and not at all if the visitor touches it first.
- **The closing grid** (home, About) breathes: one cell at a time lifts softly while it is on screen.
- **Blog covers.** The strip of cells on a cover lights in sequence when you hover the story.
- **Client list.** One list everywhere: Mizuho, Capco, Deloitte, Flipkart, Myntra, Motherson, Publicis Sapient, Publicis Resources, Heineken, Ascendion, Evident Microscopy, CMART, Antz. ArcelorMittal and "and others" removed.
- **Testimonials.** A fifth quote (Nirmala P, placed at Capco), written around the process, with no team names.
- **Icons.** favicon.ico (16/32/48), favicon.svg, apple-touch-icon.png, icon-192/512, a maskable icon for Android, and site.webmanifest, on every page.
- **Browser fixes.** -webkit-backdrop-filter for Safari's frosted header, a solid fallback where blur isn't supported, text-size-adjust for iOS, color-scheme light so dark-mode browsers don't invert form fields.
- **Sample write-up.** Skill weights removed from the PDF. The page shows page one as a preview; the full PDF goes out by email.

## Devices and browsers

| Profile | Width × height | Result |
|---|---|---|
| iPhone SE | 375 × 667 @2x | Pass |
| iPhone 15 Pro Max | 430 × 932 @3x | Pass |
| Pixel 7 | 412 × 915 @2.6x | Pass |
| Galaxy S8 | 360 × 740 @3x | Pass |
| iPad portrait / landscape | 820 × 1180, 1180 × 820 | Pass |
| Windows laptop at 125% with a 17 px scrollbar | 1536 × 864 | Pass |
| MacBook Air | 1440 × 900 @2x | Pass |
| Small laptop | 1280 × 720 | Pass |
| 4K desktop | 2560 × 1440 | Pass |

410 page loads (41 pages × 10 profiles): no sideways scroll, no nav wrapping, no card over a headline, no script errors. These runs use Chromium (the engine in Chrome, Edge, Opera, Brave and Samsung Internet). Safari (WebKit) and Firefox engines could not be downloaded in the build environment, so every CSS and JS feature was checked against their support tables instead: anything newer than Safari 15 / Firefox 115 is either prefixed, given a fallback, or degrades to a still-correct page (page transitions, text-wrap balance and pretty, hanging punctuation). **Before launch, open the homepage, a sector page, contact and a blog post in Safari on a Mac and an iPhone, and in Firefox.** That is a 10-minute check.

## Known and accepted

- **Testimonial cards** share one height in their row, so shorter quotes leave space at the bottom. Equal heights read better in a moving row.
- **Legal page headings** sometimes end on a short word at wide screens. They are numbered list headings; left as is.
- **Contrast flags on the case-study timeline** are labels drawn on top of coloured bars; checked by eye and readable.
- **Browser support.** Page transitions (View Transitions) work in Chrome, Edge and Safari 18+; Firefox loads pages normally. `text-wrap: pretty/balance` is ignored by older browsers with no harm.

## Re-running the checks

The audit scripts are Playwright-based. Ask for them if you want them in CI: one runs every page at five widths and reports overflow, clipped text, uneven card rows, tap targets, contrast, headings, images and console errors.
