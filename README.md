# Noah Lynch Website

Marketing site and EPK built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## Quick Start

```bash
npm ci
npm run dev
```

Quality checks:

```bash
npm run format:check
npm run all
```

## Repository Layout

- `app/` — routes, route metadata, and route-specific wiring.
- `components/` — reusable UI by feature (`components/features/*`) and shared primitives (`components/ui/*`).
- `lib/` — data domains, hooks, utility functions, shared types, and app constants.
- `public/` — static assets (photos, covers, videos, overlays).
- `.github/workflows/` — CI checks.

## Route Map

- `/` -> `app/page.tsx` (re-export of `app/home.tsx`)
- `/music/[slug]` -> `app/music/[slug]/page.tsx`
- `/tour-dates` -> `app/tour-dates/page.tsx`
- `/gallery` -> `app/gallery/page.tsx`
- `/epk` -> `app/epk/page.tsx`
- `/wrongnote` -> `app/wrongnote/page.tsx`
- Global error boundary -> `app/error.tsx`
- Not-found redirect -> `app/not-found.tsx`

## Conventions

### Component placement

- Put reusable feature UI in `components/features/<feature>/`.
- Keep route-local components inside `app/<route>/components/` only when they are truly route-private.
- EPK mobile actions now live in `components/features/epk/` to align with feature ownership.

### File naming

- React components: `kebab-name.component.tsx`
- Hooks: `use-*.hook.ts`
- Utilities: `*.utils.ts`
- Data domain entries: `lib/data/<domain>/index.ts`

### Public asset naming

- Use lowercase kebab-case filenames.
- Avoid spaces and parentheses.
- Venue media path format: `/public/venues/<venue-slug>/<optional-year>/...`

## Data Domain Layout

Each domain under `lib/data/<domain>/` should expose an `index.ts` entrypoint and keep domain-specific files behind it.

Current domains:

- `music/` -> release transformations and selectors
- `tour/` -> repository + models + raw show data
- `epk/` -> EPK profile and gallery data
- `venues/` -> venue gallery photo collections

## Error and Fallback Strategy

- `app/not-found.tsx` redirects to `/wrongnote` for branded 404 UX.
- `app/wrongnote/page.tsx` is the user-facing 404 page.
- `app/error.tsx` handles unexpected runtime route errors.

Keep this behavior intact unless intentionally redesigning the fallback UX.

## Quality Pipeline

- Local pre-commit hook runs `lint-staged`.
- CI runs:
  - `npm run format:check`
  - `npm run all`
