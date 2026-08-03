# Architecture

## Overview

Client-only SPA (no backend). Navigation uses hash anchors (`#services`, `#skills`, `#experience`, `#projects`, `#samples`, `#contact`).

```
Browser
  └── Vite SPA (React)
        ├── Header (nav + theme toggle)
        ├── Hero + metrics
        ├── Services → Skills → Experience → Projects → WorkSamples → Testimonials → Contact
        └── portfolioData.js (content source of truth)
```

## Folder structure

```
src/
  assets/           Resume PDF, optimized portrait (webp/jpg)
  components/       Section components + co-located CSS
  data/             portfolioData.js
  hooks/            useTheme, reduced-motion helpers
  index.css         Global tokens, typography, buttons, a11y
  App.jsx           Composition root
  main.jsx          React entry
public/
  favicon.svg
  samples/          Optional QA docs (test plans, bug reports)
Dockerfile          Multi-stage Node build + nginx runtime
nginx.conf          Static hosting, caching, security headers
```

## Content model (`portfolioData.js`)

| Key | Purpose |
|-----|---------|
| `personal` | Name, title, email, social |
| `hero` | Role, headline, subheadline, focus chips |
| `metrics` | Impact strip under hero |
| `services` | How I Help cards |
| `skills` | Tool stack groups |
| `experience` | Reverse-chronological roles |
| `projects` | Case studies (problem/solution/outcome, impact, repo) |
| `workSamples` | Links to GitHub / docs |
| `testimonials` | Social proof |

## Design system

CSS custom properties on `:root` / `[data-theme="dark"]` for colors, typography, spacing, and container width.

## Motion

Framer Motion for header, hero, section fades, carousel, and mobile nav. Disabled or simplified under `prefers-reduced-motion`.

## Theming

1. Inline script in `index.html` sets `data-theme` before paint.
2. `useTheme` syncs React state, `localStorage`, and the document attribute.
3. Header sun/moon toggle.

## Deployment

- Static: `npm run build` → serve `dist/`
- Container: `docker compose up --build` → nginx on port 8080

## Out of scope

No JWT, rate limiting, server-side forms, or multi-module backend. Contact is mailto / social links only.
