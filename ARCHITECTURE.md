# Architecture

## Overview

Client-only SPA (no backend). Navigation uses hash anchors (`#about`, `#skills`, `#experience`,
`#ai-testing`, `#contact`; `#process` and `#credentials` are scroll-only sections).
Unknown paths render the in-app 404 (`NotFound`), and the build copies `index.html` to `404.html`.

```
Browser
  └── Vite SPA (React)
        ├── Navbar (nav, theme toggle, resume, mobile overlay)
        ├── Hero (+ TestRunner illustration) → Stats
        ├── About → Skills → Experience → AITesting → Process → Credentials → Contact
        ├── Footer
        └── portfolioData.js (content source of truth)
```

## Folder structure

```
src/
  assets/           Resume PDF, portrait images (currently unused)
  components/       One component per section, with co-located CSS
    Illustrations   Inline-SVG: MagnifierBug, PipelineDiagram, ChatProbe
    TestRunner      Hero terminal illustration (typewriter + coverage ring)
    Reveal          Scroll reveal (CSS animation + one shared IntersectionObserver)
    SkillIcon       Renders an icon by key; registry lives in skillIcons.js
  data/             portfolioData.js
  hooks/            useTheme, usePrefersReducedMotion
  index.css         Tokens, typography, buttons, cards, chips, utilities
public/             favicon.svg (IK monogram), robots.txt, samples/
```

## Design system

- Tokens in `src/index.css`: `--bg*`, `--text*`, `--border*`, `--accent*`, `--danger*`, radii, spacing.
  Components reference tokens only; no hard-coded colors (brand-hover colors live in `skillIcons.js`).
- Radii: cards 16px, buttons 10px, chips 999px. Container max 1200px.
- Section spacing is `--section-space`, split half above / half below so neighbouring sections add up to one.

## Motion

Scroll reveals are CSS keyframes (`Reveal.css`) triggered by a single IntersectionObserver.
Framer Motion handles the mobile menu, copy toast, magnetic buttons and the 404 trace.
All of it is disabled or simplified under `prefers-reduced-motion`.

## Theming

1. Inline script in `index.html` sets `data-theme` before paint: stored choice, else system preference, else dark.
2. `useTheme` syncs React state and `localStorage` (failures are swallowed).
3. Sun/moon toggle in the navbar.

## Deployment

- Static: `npm run build` → serve `dist/`
- Container: `docker compose up --build` → nginx on port 8080

## Out of scope

No JWT, rate limiting, server-side forms, or backend. Contact is mailto / tel / social links plus copy-to-clipboard.
