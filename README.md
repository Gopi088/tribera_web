# tribera Website

Marketing website for `tribera`, built with Astro and Tailwind CSS.

## Stack

- Astro 6
- Tailwind CSS
- TypeScript

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run serve:local` — build and serve the optimized site at `http://localhost:4321` for navigation and visual testing (stop an existing server on that port first).
- `npm run check`
- `npm run test:migration:public:all` — test the production build across the promoted pages, remaining content pages, shared navigation and publication list. Set `BROWSER=firefox` or `BROWSER=webkit` to select another browser.
- `npm run fix`

For editing with hot reload, use `npm run dev` (or `npm run dev:astro` for Astro alone). The optimized local preview requires a rebuild to include source changes.

## Project Notes

- Main hiring-team funnel lives at `/`
- Candidate funnel lives at `/candidates`
- Blog lives at `/blog`
- Public pages use the v9 layout, fonts and shared navigation. Careers, Functions, blog articles and topic lists, candidate signup and the 404 page use the shared v9 content styles.
- Lead capture uses Netlify function endpoints; browser tests mock delivery.
- Pre-v9 components and regression files remain as historical source. Active public-page coverage is recorded in `tests/reviewed-suite-migration.json`.
- Production app login points to `https://app.tribera.ai/auth/login`

Current release scope, independent Claude reviews and verification boundaries are recorded in [the v9 release review](docs/v9-release-readiness-2026-10-22.md).

## Deployment

The repo includes deployment support for Docker, Nginx, Netlify, and Vercel. Check the root config files for the environment you want to use.
