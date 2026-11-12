# Architecture

## Overview

Client-only SPA (no backend). Navigation uses hash anchors to twelve chapters. Unknown paths render
the in-app 404 (`NotFound`), and the build copies `index.html` to `404.html`.

```
Browser
  └── Vite SPA (React)
        └── AuditProvider            owns the self-audit state (re-renders only its consumers)
              ├── RunRail            margin rail (desktop) / status strip + sheet (mobile); the navigation
              ├── RunLine            the sweep line, retires when the report is complete
              ├── Chapters           TC-00 Title page ... TC-11 Contact, each wrapped in <Chapter>
              └── Footer             colophon; status line reports the real run
```

## The self-audit

- `src/audit/chapters.js`: ordered chapter registry (id, TC number, label)
- `src/audit/checks.js`: the real checks, run against one chapter's live DOM. Async and sliced
  into short tasks that yield to the main thread; backgrounds are cached per run
- `src/hooks/useSelfAudit.js`: the state machine. Two IntersectionObservers: one fires when a
  chapter header crosses the run line (38% of the viewport), one catches jumps that skip a header.
  Reaching the Result chapter runs every remaining chapter, so the seal is truthful. LCP is frozen
  at the first user input, like the browser's own definition. Reduced motion skips the sweep
- `src/audit/AuditProvider.jsx` + `AuditContext.js`: state lives here, not in `App`
- `src/components/Chapter.jsx`: numbered header, filling rule, stamp, expandable check list

## Folder structure

```
src/
  assets/        Resume PDF, optimized portrait and banner WebP
  audit/         chapters, checks, provider and context
  components/    One component per chapter, with co-located CSS
    Result       The peak: sticky stage; sentinel elements drive the line-by-line print
    Illustrations  Inline SVG: MagnifierBug, PipelineDiagram, ChatProbe
    Projects     Scroll-snap carousel of project cards (buttons, keys, live counter)
    TestRunner   Title-page terminal (typewriter + coverage ring), always on the ink ground
    Reveal       CSS reveal driven by one shared IntersectionObserver
  data/          portfolioData.js
  hooks/         useSelfAudit, useTheme, usePrefersReducedMotion
  index.css      Tokens (paper / ink grounds), base, buttons, utilities
scrollcraft/     Design record: BRIEF.md, contact sheets, fingerprint registry
```

## Design system

- Two grounds, `paper` and `ink`. `data-ground="base|subtle|alt"` on a chapter resolves to one of them;
  the theme toggle swaps which is the base. `.ground-ink` / `.ground-paper` force a ground (terminal, seal)
- Chapters are separated by hard cuts of ground plus a ruled header, never gradients
- Radii are small (6px); structure comes from rules, not boxes. Mono for IDs, labels and figures

## Motion

Reveals are CSS keyframes. The run line, stamps and Result print are the only scroll-linked motion; all
of it is removed under `prefers-reduced-motion`.

## Theming

1. Inline script in `index.html` sets `data-theme` before paint: stored choice, else system, else dark.
2. `useTheme` syncs React state and `localStorage` (failures swallowed).

## Deployment

- Static: `npm run build` then serve `dist/`
- Container: `docker compose up --build` (nginx on 8080)

## Out of scope

No backend, no contact form. Contact is mailto, tel, LinkedIn and copy-to-clipboard.
