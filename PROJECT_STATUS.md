# Vai Angola — Project Status

## Current state
- Phase 0: done (sandbox)
- Phase 1: done in sandbox — tokens, local fonts, header/nav, footer, container, placeholder routes
- Phases 2–6: not started

## Verified in sandbox (Node 22.22.2, npm 10.9.7)
- next 16.4.2, react 19.3.0, tailwindcss ^4 (@tailwindcss/turbopack), TypeScript strict
- `npm run lint`: pass | `npx tsc --noEmit`: pass (after `npx next typegen`) | `npm run build`: pass
- `next start`: /, /explore, /experiences, /events, /stories, /favorites, /itineraries -> 200; unknown route -> 404
- Not verified: visual rendering in a browser, keyboard walkthrough, mobile menu behaviour, Lighthouse
- `npm audit`: 5 high advisories in the eslint-config-next chain (dev tooling); not fixed

## Contrast (computed, WCAG)
- ink/paper 12.83 | terracotta/paper 3.68 (large text/UI only) | white/terracotta 4.18 (fails for small text)
- terracotta-deep #A8472A: 5.13 on paper, white on it 5.83 -> used for text and buttons
- olive/paper 4.38 (fails small text) -> olive-deep #4E5B44: 6.36

## Decisions
- Fonts self-hosted via next/font/local (Playfair Display, Manrope, latin subset, OFL licences in src/app/fonts)
- cacheComponents is on: avoid new Date()/dynamic data in server components without Suspense; MainNav (usePathname) sits in <Suspense>
- Placeholder pages ("em construção") for all nav routes so no link is dead
- `LayoutProps` is generated: run `npx next typegen` (or dev/build) before `tsc`

## Next task
Phase 2, Task 1: typed deterministic destination sample data (clearly marked demo)
