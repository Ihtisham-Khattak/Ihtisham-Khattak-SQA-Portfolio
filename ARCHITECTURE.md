# Architecture

## Overview

Client-only SPA (no backend). Navigation uses hash anchors to twelve sections. Unknown paths render the
in-app 404 (`NotFound`), and the build copies `index.html` to `404.html`. `public/brand/` is a standalone
static page (the brand kit) served as-is at `/brand/`.

```
Browser
  └── Vite SPA (React)
        └── AuditProvider            owns the self-audit state (re-renders only its consumers)
              ├── Navbar             floating pill nav, mobile menu sheet
              ├── Sections           Hero ... Contact, each wrapped in <Chapter>
              └── Footer             wordmark, email, theme switch, links, live run status
```

## The self-audit

- `src/audit/chapters.js`: ordered section registry (id, label)
- `src/audit/checks.js`: real checks against one section's live DOM. Async, sliced into short tasks that
  yield to the main thread; backgrounds are cached per run
- `src/hooks/useSelfAudit.js`: two IntersectionObservers (header crossing a line at 38% of the viewport; and
  sections, to catch jumps). Reaching the Run summary runs every remaining section. LCP is frozen at the first
  user input or scroll. Reduced motion skips the sweep
- `src/audit/AuditProvider.jsx` + `AuditContext.js`: state lives here, not in `App`
- `src/components/Chapter.jsx`: pill tag, status stamp, expandable check list, then the section body

## Folder structure

```
src/
  assets/        Resume PDF, WebP images, IK logo SVGs
  audit/         registry, checks, provider and context
  components/    One component per section, co-located CSS
    BugHunt      About: lens, X-ray layer and three planted bugs (pointer, touch, keyboard)
    Projects     Scroll-snap carousel (buttons, arrow keys, live counter)
    Result       Run summary card; lines print when scrolled into view
    Frame        Window with a glow, used for illustrations
    Illustrations  Inline SVG: PipelineDiagram, ChatProbe
    TestRunner   Terminal window (typewriter + coverage ring), always on the dark ground
    Reveal       CSS reveal driven by one shared IntersectionObserver
  data/          portfolioData.js
  hooks/         useSelfAudit, useTheme, usePrefersReducedMotion
  index.css      Tokens, base, buttons, pills, bezel cards, the shared `.mark` underline
public/          Favicon set, manifest, robots.txt, brand/ (kit page, logos, tokens, social card)
```

## Design system

- Tokens in `src/index.css`. Palette is three colors (Abyss `#00211E`, White `#FFFFFF`, Lime `#D5FB09`); all
  other tints are mixes of them. Dark is the home ground; light is white with Abyss text. `--accent` is a
  fill; `--accent-text` is the color for text and strokes (lime on dark, Abyss on light, because lime is
  1.19:1 on white)
- Cards use a bezel: an outer ring (radius 28) around an inner card (radius 20), with the tint on a
  pseudo-element so text sits on a solid, measurable color
- Section heads: pill tag, two-tone headline (white, then lime on dark or a lime highlighter on white),
  muted paragraph at the right
- The logo shows the lime-tile mark on dark and the Abyss-tile mark on light (`.logo-on-dark` / `.logo-on-light`)

## Motion

Reveals are CSS keyframes. The idle lens, stamp sweep and Run summary print are the only scroll- or
time-linked motion, and all of it is removed under `prefers-reduced-motion`.

## Theming

1. Inline script in `index.html` sets `data-theme` before paint: stored choice, else system preference, else dark.
2. `useTheme` syncs React state and `localStorage` (failures swallowed). The footer switch sets the theme.

## Deployment

- Static: `npm run build` then serve `dist/`
- Container: `docker compose up --build` (nginx on 8080)

## Out of scope

No backend, no contact form. Contact is mailto, tel, LinkedIn, resume and copy-to-clipboard.
