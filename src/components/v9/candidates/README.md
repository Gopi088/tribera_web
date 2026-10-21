# Private candidate page (G2)

`/__v9/candidates` is emitted only in development or with `V9_PREVIEW=1`. The public `/candidates` route uses the same components with public navigation. The accepted V9 shell, client strip, native FAQ and testimonial cards compose seven candidate-owned components. Root-owned `previewLinks` keeps the preview navigation in the migration journey.

## Source and deliberate differences

The authoritative source is `sample_data/tribera-web-handoff-v9/candidates.html`, including its final CSS overrides. `candidates.css` retains only selectors used by the decomposed components, in source order, under `.v9-candidates`. Font families inherit the accepted local font aliases. The hero, profile, scorer, CV questions, team checks, privacy controls, clock, upload, FAQs and closing copy come from that file. Structured scorer/question/FAQ data is in `src/data/v9/candidate-demo.json`; the four candidate testimonials come from the supplied testimonials JSON. No source HTML is embedded at runtime.

- All nine scores and their evidence exist without JavaScript. Enhancement enables controls. Range maximum is 50 because the supplied ML preset assigns 50 to ML data (the source's maximum of 40 silently clamped it). Scores normalize relative weights; displayed integer shares sum to 100, or 0 if every weight is zero. Verdict thresholds retain rounded score 26/34.
- The team demonstration runs once, has an explicit play/pause control, and stops on user input/focus, visibility loss or reduced motion. CV questions have keyboard tabs, play/pause, visibility handling and cancellation after manual selection. All four question/answer pairs remain visible without JavaScript. Reduced motion suppresses autoplay and transitions.
- Privacy switches are explicitly illustrative, never persist, and never claim to modify an account. The hero is labeled “Example · anonymous”.
- The source's scroll timeline remains, with an added accessible day scrubber. Manual selection stops scroll-driven updates. Reduced motion and no-JavaScript modes show the final timeline and complete milestones.
- Testimonials use the accepted component in a 28px/second pausable drift on desktop and a swipe row on phones. Reduced motion and no-JavaScript modes retain all four original quotes. FAQs use the accepted native disclosure component. The file chooser stays keyboard-accessible, unlike the source's hidden input. Hero sweep/parallax, profile bars/stamp, scorer staging, question transitions, the scroll cue and closing cells follow the handoff. Decorative entrances do not hide no-JavaScript content.

## Submission boundary

Enhanced multipart POSTs use `/.netlify/functions/candidate-profile-v9`, `Accept: application/json`, exactly `cv`, `intent` (`active`/`open`), optional `phone`, empty `botcheck` and a fresh `form_loaded_at`. Existing backend origin, timing, rate, upload signature/size, scanner and delivery guards remain authoritative. Error states retain the selected CV and fields; success resets them. Duplicate submissions are locked. Tests intercept every POST and never deliver real email.

Without JavaScript, `/.netlify/functions/candidate-form-v9` supplies the separate server-rendered native form and fresh timing field. That endpoint is coordinator-owned. Both a native-form link and email alternative remain available if enhancement fails. A private-preview notice makes the real submission effect explicit. Deployment transport/body-size limits, real provider/scanner configuration and recruiter contact handling for CVs without usable details still require deployment/operations acceptance; local mocks do not certify them.

## Verification

Start Astro development on port 4392, or set `TEST_BASE_URL` to the combined private preview. Run `node --test tests/v9-candidates-score.test.mjs tests/v9-candidates.test.mjs tests/v9-candidates-reference.test.mjs`. `BROWSER` supports chromium/firefox/webkit. The browser journey covers 320,360,390,768,1024,1366,1920px, scorer arithmetic/keyboard/evidence, question cancellation, switches, manual clock, mocked error/retry/success, multipart fields, duplicate locking, invalid extension, no-JavaScript and reduced motion. The reference suite compares 147 exact final typography observations with script-stripped handoff and the same local fonts. It saves full-page source/migrated screenshots; typography assertions do not substitute for complete-page visual review. Artifacts remain under `artifacts/v9-g2-candidates/`.
