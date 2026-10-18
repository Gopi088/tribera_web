# Tribera website: handoff v9

17 October 2026. Replaces every earlier package, including v6, v7 and v8. **Open `START-HERE.html` first.** It shows every page with its share image, and sets out the design and motion rules.

## Pages

| Page | File | Goes live at | Hero | Status |
|---|---|---|---|---|
| Homepage | `index.html` | `/` | Product | Ready |
| For candidates | `candidates.html` | `/candidates` | Product | Ready |
| About | `about.html` | `/about` | Editorial | Ready |
| Services | `services.html` | `/services` | Product | Ready |
| Interview as a service | `interview-as-a-service.html` | `/interview-as-a-service` | Compact | Ready |
| Intelligence | `intelligence.html` | `/intelligence` | Product | Lab uses sample data, labelled “Illustrative” |
| Industries index | `industries/index.html` | `/industries` | Editorial | Ready |
| Sector pages ×12 | `industries/<slug>.html` | `/industries/<slug>` | Compact | Ready |
| Careers | `careers/index.html` | `/careers` | Editorial | Needs live roles |
| Role page | `careers/backend-engineer.html` | `/careers/backend-engineer` | Compact | Six more roles to build from it |
| Blog index | `blog/index.html` | `/blog` | Editorial | Ready |
| Blog posts ×10 | `blog/<slug>.html` | `/blog/<slug>` | Own header | Ready |
| Sample write-up | `sample-write-up.html` | `/sample-write-up` | Compact | Form needs a backend |
| Legal pages ×4 | `privacy.html` | `/privacy` | Compact | Draft for legal review |
| Case study | `case-study.html` | `/case-study` | Compact | Client sign-off on the anonymised page |
| How we work with numbers | `how-we-work-with-numbers.html` | `/how-we-work-with-numbers` | Compact | Rules need Akshata’s sign-off |
| Contact | `contact.html` | `/contact` | Compact | Form needs a backend |

Every file is self-contained, with inline CSS and JS. Open any one in a browser to see the final design.

## Design rules

- **Type:** Fraunces for display and quotes. Inter Tight for body. JetBrains Mono only for data and UI: scores, forms, tickets, dates.
- **Colour:** Charcoal `#131313`, paper `#F1EEE7`, white, and red `#DA0007`. Charcoal means cleared. Red appears only where a person judged or someone belongs. No green, no amber.
- **Grounds:** Sections alternate white, paper and dark (`g-white`, `g-paper`, `g-dark`).
- **Red, rationed:** One red underline per page at most, always on a promise. The client logo strip appears on home, candidates and services only. The field mark closes home and About only.
- **Labels:** Editorial labels are sentence case (`.ql`) or serif italic (`.ql--i`). Small mono capitals are kept for data.
- **Openers:** Most sections open on eyebrow and headline. A few open on a quote (`.op-q`) or a giant numeral (`.op-n`), one numeral per page at most. That one is the page’s signature moment.
- **Headlines:** One line at 1024px and up. Facts over adjectives.
- **Words:** “skills”, not dimensions. “scorecard”, not rubric. “searches”, not mandates. Verdicts are Select, Grey and Reject.
- **Promises:** Three scored candidates in about 36 hours. 30 to 45-minute interviews by people who have done the job. If none of the three fit, we search again at no extra cost. Free for candidates, always. A reply within a day.
- **Logo:** Use the files in `brand/`: black on light grounds, white on dark, red only where the brand itself is the subject. The header and footer use them at 22px and 28px tall. Never retype the wordmark in a font.
- **Photos:** Real photographs only. The Bengaluru set in `office/` is from IndiQube TownHub, a managed shared office. IndiQube’s own signs stay, other tenants’ and advertisers’ names are blurred, and Tribera appears only where it really would: on the building directory. The Pune photo of Zenith Complex is unedited apart from blurred number plates, with a Tribera label pointing to the building. It appears only on the contact page.
- **Numbered sources:** Every outside figure carries a small numbered note. Hover or tap it and the source opens beside the number; the full list sits at the end of the page and links to How we work with numbers. In code: `shell.Notes()`, `.ref(source, url)`, `.section()` or `.end()`.
- **Typesetting:** Paragraphs use `text-wrap: pretty` so no word is stranded on the last line, and headlines are balanced. Openers that start with a quote mark take the class `hq`, so the mark hangs outside the text edge. Scores, tables and counts use tabular figures so digits line up. Fraunces is loaded with its optical-size axis, so large headlines draw tighter. Dashes are true en dashes in ranges (2024–25).
- **Sources:** Market figures come from consulting firms, industry bodies and government: Bain, KPMG, EY, Nasscom, Zinnov, ISC2, ministries. Never from a staffing firm, because they are competitors.

## Motion

- **Curve:** `cubic-bezier(.25,.1,.25,1)`, one curve for everything. Nothing bounces, overshoots or glows.
- **Durations:** 0.18s for presses and colour, 0.32s for hover lifts and arrows, 0.7s for content arriving.
- **Arrival:** Sections fade in and rise 8px as they reach the screen, once. The hero rises 14px. Items in a row arrive 60ms apart (`--d`).
- **Hover, cards:** Clickable cards lift 2px and their border darkens. No shadows (the de-SaaS rule stands). Blog list rows slide right 4px instead.
- **Hover, links:** The underline darkens to full colour and the gap before the chevron opens a little. Arrows in buttons move 3px right.
- **Hover, nav:** A faint underline slides in under the item; the active page keeps its full one.
- **Press:** Every button settles to 97% while it’s pressed.
- **Testimonials:** On home and candidates, the quotes drift slowly (28px a second) and pause when hovered, focused, off screen, or when Pause is pressed. On phones they become a swipe row. Both pages read one list, `data/testimonials.json`: add a quote there and it appears. Home shows every quote, and candidates shows the candidate ones.
- **Photos:** Greyscale avatars take their colour on hover. About portraits colour once, in view.
- **FAQ:** Answers open over 0.32s; the plus turns into a minus.
- **Focus:** Keyboard focus is a 2px ink ring, 4px out (white on dark grounds).
- **Signature motion:** Only these move on their own: the hero entrance, the lab, the ink lines, the stamps, the portraits, the scorecard ticks, the bars, the 36-hour clock and the field mark.
- **Between pages:** Moving from page to page cross-fades in about a third of a second, and the header stays in place (cross-document View Transitions). Browsers without support load pages normally.
- **Reduced motion:** With `prefers-reduced-motion` on, everything appears in place and nothing moves.

The motion lives in two blocks at the end of each stylesheet. `CALM` holds the quiet labels and section openers, and `MICRO · m1` holds the motion above. A short script at the end of each page swaps an element to the quick hover timing once it has arrived (`.rv-done`). Keep both blocks and the script when porting.

## Porting to Astro

- **Shared CSS:** each page carries the v184 stylesheet, plus a page block that starts `/* ═══ PAGENAME · … ═══ */` just above `/* ═══ v167 · MOTION`, then `CALM` and `MICRO`. Move the shared parts into the layout, and keep each page block with its page.
- **Nav and footer** are identical on every page except candidates, which has its own audience nav. Make them components that take the active route.
- **Industries:** one `[slug].astro` route from `data/sectors.json`. The hero, the short line, the market figure and the FAQ per sector are in the page script (`HERO`, `SHORT`, `MARKET`, `COMMON_FAQ`). Move them into the JSON when you port.
- **Blog:** the posts become a content collection. The cover numeral, the caption and the margin notes are fields (`cover_number`, `cover_caption`, `notes`).
- **Careers:** the page reads `/careers.json`. Adding a role there adds a card.
- **Testimonials:** home and candidates render from `data/testimonials.json` (`side`, `quote`, `name`, `role`). Make it one component, and keep the drift script with it.
- **Photos and logos:** the previews embed every image (portraits, office photos, the logo) so the files open offline, which is why careers and contact are about 1 MB here. In Astro, point them at the files: `/team/<name>.jpg` (and `-sm.jpg` for 44px bylines), `/office/<name>.jpg` (and `-sm.jpg` for phones), `/brand/tribera-logo-black.png` and `-white.png`. Use `loading="lazy"` below the fold. Each page then drops to under 250 KB.
- **Tested** at 390, 600, 830, 1024, 1360, 1600 and 1920px in the real fonts, with no sideways scroll and no script errors.

## SEO

- **Titles and descriptions:** each page has a search title of 60 characters or fewer, and a description of 110 to 165 characters.
- **Head tags:** canonical, Open Graph and Twitter tags, with the locale `en_IN`.
- **Structured data:** a JSON-LD graph per page, covering Organization, WebSite, Service, AboutPage and Person, ContactPage, ItemList, FAQPage, BlogPosting, JobPosting and BreadcrumbList.
- **Share images:** one per page in `og/`.
- **Files:** `sitemap.xml` and `robots.txt` are ready to serve.
- **Logo:** `logo.png` (600×600, black on white) is in the root of this folder, where the structured data expects it.

## Forms that need a backend

| Page | Posts to | Fields |
|---|---|---|
| Candidates | `/candidates/start` | `cv`, `intent`, `phone` |
| Contact | `/contact/send` | `side` (`hiring` or `looking`). Hiring: `name`, `email`, `company`, `role`, `message`. Looking: `name`, `email`, `cv`, `note`. Plus `sector` and `service` from the URL |
| Role page | `/careers/backend-engineer/apply` | `cv`, `paragraph`, `phone` |
| Intelligence | `/intelligence/subscribe` | `email` |
| Blog | `/subscribe` | `email` |

Contact and candidates promise a reply inside a day, and careers within three days. Route each form to a real inbox.

## Before launch

1. Replace the Intelligence lab sample with Tribera’s own scored-interview data: one `DATA` object in the page script, then set `DATA.sample = false`.
2. Build the six other role pages from the Backend Engineer template.
3. Have a lawyer review Privacy, Terms, Security and Data processing before launch. They keep every clause from the live pages and add what India’s DPDP Act asks for. The grievance officer is Pranav Gandhi. Confirm a privacy or security email address.
4. Wire the five forms to real inboxes (table in the README).
5. Confirm before publishing: the 22-day case numbers (327 profiles, 11 passed over, 1 hired) and “around three interviews per hire”.
6. Schedule the three new posts to publish on their dates: 9 June 2026 (Pranav, GCC leadership), 27 August 2026 (Abhishek, AI hiring) and 19 October 2026 (Akshata, the flagship). If the site launches before 19 October, hold that post back until the day.
7. Sign off the eight rules on How we work with numbers and the line in Akshata’s voice at the end of it. Each rule is a public promise.
8. Confirm Tribera may use the three Bengaluru photos (they look like IndiQube’s own photography), or replace them with your own shots of the same spaces.
9. Keep the case story matched: Services and the blog post “Five months open. Closed in 22 days.” use the same numbers.
10. Leave the comment at the top of each file. It lists what is backed and what still needs confirming.
