# Deploying the Tribera website

Handoff v9, 17 October 2026. Read START-HERE.html first for the design rules. This file is the engineering checklist.

## 1. What to deploy

Deploy everything in the folder **except** `docs/`, `START-HERE.html` and `README.md`.

| Path | What it is |
|---|---|
| `*.html`, `blog/`, `careers/`, `industries/` | 40 pages. Each is self-contained with inline CSS and JS |
| `404.html` | Served for any unknown route |
| `og/` | One 1200×630 share image per page |
| `team/`, `office/`, `brand/` | Photos and logo files (see section 4) |
| `logo.png`, `apple-touch-icon.png` | Root files the structured data and phones expect |
| `sitemap.xml`, `robots.txt` | Ready as they are |
| `_headers`, `_redirects` | Cloudflare rules. In Astro, put both in `public/` |

`docs/email-assets/` holds the full sample write-up PDF. **Never deploy it.** The form on /sample-write-up emails it.

## 2. Porting to Astro (Cloudflare)

1. **One layout.** Every page carries the same stylesheet: the v184 base, then the page block that starts `/* ═══ PAGENAME`, then `CALM`, `MICRO`, `TYPE`, `NOTES`, `PAGE TRANSITIONS`, `BRAND` and `QA`. Put the shared parts in the layout once, and keep each page block with its page. Keep the order: later blocks deliberately override earlier ones.
2. **Components.** Nav (takes the active route; candidates has its own audience nav), footer, numbered sources (`Notes`), testimonials (reads `data/testimonials.json`), hero types (product, editorial, compact).
3. **Content collections.** `data/sectors.json` (12 sector pages from one `[slug].astro`), `data/careers.json`, `data/testimonials.json`, and the blog posts.
4. **Keep the small scripts.** The reveal hand-off (`rv-done`), the footnote pop-ups and the testimonial drift each sit just before `</body>`.
5. **Trailing slashes.** Set `trailingSlash: 'never'` in Astro so URLs match the sitemap and canonicals.

## 3. Forms

Every form posts with JavaScript and falls back to a normal POST. Each must reply within its promise.

| Page | Posts to | Fields | Promise | Notes |
|---|---|---|---|---|
| Candidates | `/candidates/start` | `cv` (file), `intent`, `phone` | Reply within a day | CV upload: PDF or Word, cap at 10 MB |
| Contact | `/contact/send` | `side` (hiring/looking), `name`, `email`, `company`, `role`, `message` or `cv`, `note`; `sector`, `service` from the URL | Reply inside a day | Route hiring to Abhishek, looking to Akshata |
| Role page | `/careers/backend-engineer/apply` | `cv`, `paragraph`, `phone` | Reply within 3 days | |
| Sample write-up | `/sample/request` | `name`, `email`, `company`; `website` is a honeypot (reject if filled) | Email the PDF straight away | Attach `docs/email-assets/tribera-sample-candidate-write-up.pdf`; log the lead |
| Intelligence | `/intelligence/subscribe` | `email` | One email a quarter | Double opt-in recommended |
| Blog | `/subscribe` | `email` | Once a month at most | Same list provider as Intelligence |

Return HTTP 200 on success. The sample form shows its own confirmation on a 200, and an error with the email address otherwise.

## 4. Images

The previews embed every image so they open offline. In production, point them at files: `/team/<name>.jpg` (44px bylines use `-sm.jpg`), `/office/<name>.jpg` (`-sm.jpg` for phones via `srcset`), `/brand/tribera-logo-black.png` / `-white.png`. Keep `width`/`height` attributes and `loading="lazy"` below the fold. With images as files, pages weigh 48 to 61 KB gzipped (median 54 KB).

## 5. Fonts

Fraunces (with the optical-size axis), Inter Tight and JetBrains Mono from Google Fonts, preloaded. For speed and privacy, self-hosting them from `@fontsource` is better: same files, no third-party request, and no consent question under the DPDP Act. If you self-host, drop the Google entries from the CSP in `_headers`.

## 6. Before you switch DNS

1. Search Console: export every indexed URL and add any missing one to `_redirects`.
2. Submit `sitemap.xml`. Request indexing for the homepage, Services, the case study and the 19 October post.
3. Analytics: none is installed. If you add one, add a consent notice and update the cookie section of /privacy.
4. Hold the 19 October 2026 post until its date if launch comes first (the blog index and sitemap list it).
5. Test the five forms end to end, including the sample email.
6. Check the open sign-offs listed in START-HERE.html (legal review, client approval of the case study, photo rights, privacy/security email).
