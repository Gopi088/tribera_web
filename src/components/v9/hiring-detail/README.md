# Hiring detail previews

`InterviewPage` and `CaseStudyPage` compose native Astro sections from the complete v9 handoff. Their routes exist only in development or `V9_PREVIEW=1`, use the accepted `V9Layout`, and are noindex with no canonical. Shared header/footer routing remains coordinator-owned.

The CSS retains relevant source selector families in source order, including the final responsive overrides, scoped beneath `.v9-hiring-iaas` or `.v9-hiring-case`. Fonts inherit the accepted local foundation faces. The hero fields and closing marks are native inline SVG from the handoff; no HTML document injection, iframe, remote font request, or copied handoff JavaScript is used.

## Behavior and deliberate differences

- IaaS retains the distinct 48-hour batch promise, 30–45 minute expert interview, and per-interview fee plus success fee. Six source questions are native, mutually exclusive `details` disclosures; the first starts open. They remain usable without JavaScript, unlike the source's script-dependent buttons.
- The case page retains all seven sections, same-scale five-month/22-day timeline, intake questions, comparison table, quotation, and all 327 profile cells. `src/data/v9/case-studies.ts` defines the 11 passed-over profile positions, two returning profiles and one hire. This is a different case from Home's 126-profile/two-hire funnel.
- The case displays the completed result on the server, including with scripts blocked. Four explicit buttons progressively show all profiles, eleven re-read, two returning and one hired. They support normal Tab/Enter/Space plus Left/Right/Home/End, pressed states, a graphic label and a polite status. Controls are hidden until initialized. There is no autoplay, simulated live pipeline, storage or network submission.
- Reveal effects, moving hero decoration, cell shimmer and timeline drawing become stable completed states. Reduced-motion users retain every interaction; no motion is needed to read any content. Manual case controls add a small block below the source graphic.
- Header and footer use the accepted shared shell. Source Services/Home links use private preview routes; IaaS Contact links preserve `service=iaas`. The sample CTA honestly says “Request a sample” and links to `/contact?intent=sample-write-up`; there is no pretend download.
- The matching field note already exists at `/blog/why-tech-hiring-really-takes-so-long`, so the original direct source link remains. “Another search” points to the distinct private Home funnel. No unrelated article is substituted.
- The product promises and anonymised case claims are preserved source content, not independently verified approval. Hosted form/provider behavior, query capture inside the legacy form, content approval and deployment remain later gates.

## Validation ownership

Scoped ESLint, Prettier and Astro compiler parsing are run here. The coordinator owns combined build, boundaries, visual/content comparisons, three-engine interaction/no-JavaScript tests, and actual Claude review before acceptance. No local build or browser process is started by this worker without the coordinator's resource go-ahead.
