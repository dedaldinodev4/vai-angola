# Vai Angola — Project Status

## Current state
- Phase 0: completed in sandbox (see verified facts)
- Phases 1–6: not started

## Verified facts (sandbox, Node 22.22.2, npm 10.9.7)
- next 16.4.2, react/react-dom 19.3.0, tailwindcss ^4, typescript ^5, eslint ^9
- Tailwind v4 via @tailwindcss/turbopack (config in CSS, no tailwind.config.*)
- tsconfig: "strict": true; alias "@/*" -> "./src/*"
- next.config.ts enables cacheComponents and partialPrefetching
- Scripts: dev, build, start, lint (no test script yet)
- `npm run lint`: passed
- `npm run build`: FAILED in sandbox only — Google Fonts unreachable (no internet). Re-run on a machine with internet.
- `npm audit`: 5 high-severity advisories in dev tooling (eslint-config-next chain); not fixed, do not run `audit fix --force` blindly.

## Decisions
- npm; no extra dependencies until needed
- AGENTS.md warns this Next.js differs from older versions: read node_modules/next/dist/docs/ before writing Next-specific code

## Next task
Phase 1, Task 1–2: tokens, fonts (self-hosted or next/font/google), layout.tsx
