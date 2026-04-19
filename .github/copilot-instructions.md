# Project Guidelines

## Overview

Personal portfolio site ([pratheeks.dev](https://pratheeks.dev)) built with Next.js 13, React 18, TypeScript, and Tailwind CSS.

## Build and Test

```bash
yarn          # install dependencies
yarn dev      # development server
yarn build    # production build (outputs to dist/)
yarn lint     # ESLint (next/core-web-vitals)
```

Package manager: **Yarn**. Do not use npm or pnpm.

## Architecture

- **Pages Router** — file-based routing in `pages/`. No App Router.
- **Layout** — all pages wrap content in `MinimalistLayout` from `components/MinimalistLayout.tsx`.
- **API routes** — `pages/api/` (currently only `contact.ts`).
- **Styling** — utility-first Tailwind with custom component classes defined in `styles/globals.css` via `@layer components`. No CSS modules.
- **Animations** — Framer Motion with container/item variant pattern for staggered entrances.
- **Icons** — `react-icons` library.

## Code Style

- TypeScript strict mode. Use functional components with explicit typing.
- Prettier: single quotes, trailing commas, semicolons, 2-space indent, 100 print width.
- Mobile-first responsive design using Tailwind breakpoints.

## Conventions

- **Theming**: Colors use CSS custom properties (`--foreground`, `--background`, `--accent`, etc.) defined in `styles/globals.css`. Dark mode via `prefers-color-scheme` media query. Reference existing variables instead of hardcoding colors.
- **Custom components**: Use classes from `@layer components` in globals.css (`.card`, `.heading`, `.subheading`, `.link`, `.button-primary`, `.button-secondary`, `.tag`) rather than repeating utility strings.
- **External links**: Use `target="_blank" rel="noopener noreferrer"` and the `OpenInNewLink` component where appropriate.
- **Path aliases**: Use `@/*` for root-relative imports (configured in tsconfig).
- **Environment variables**: Stored in `.env.local` (git-ignored). Server-only secrets must not be prefixed with `NEXT_PUBLIC_`.
