# Ihtisham Khattak, Senior QA Engineer Portfolio

A single-page portfolio in Abyss Green, Pure White and Electric Lime. The design language follows a
product-marketing pattern: a floating glass nav, a centered tag pill and two-tone headline per
section, bezel cards, framed windows with a glow, and a footer theme switcher.

## Highlights

- **Bug hunt (About).** An interactive demo screen with three planted bugs. A magnifier lens follows the
  cursor or finger and shows an X-ray of the screen; each of the three working principles owns one bug.
  Keyboard users reveal the same bugs from the principle buttons. Finding all three prints a release-gate message.
- **The page audits itself.** Each section's stamp (Unverified, Running, Passed n/n) reports real checks run
  in the visitor's browser: alt text, heading order, link names, computed contrast, tap-target size, overflow,
  document language, title, zoom, single `h1`, landmarks and a skip link. The Run summary section prints the
  totals plus measured LCP and CLS (when the browser reports them) and says plainly that this is not a full audit.
- **Projects carousel.** Native scroll-snap (swipe, wheel, arrow keys) with previous/next buttons and a live
  counter. No autoplay.
- **Brand kit** at `/brand/`: logo variants, colors with computed contrast, typography, favicon set, downloads.

## Stack

- React 19 + Vite 7; Framer Motion for the menu sheet, toast and magnetic button only
- Scroll reveals are CSS + one shared IntersectionObserver (`Reveal`)
- Vanilla CSS with design tokens; dark and light themes (`data-theme`)
- Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (labels, figures)
- Lucide for concept icons, `react-icons` for tool logos

## Getting started

```bash
npm install
npm run dev
```

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint |

## Editing content

All copy lives in [`src/data/portfolioData.js`](src/data/portfolioData.js); components never hold content.

| Key | Section |
|-----|---------|
| `personal`, `hero` | Hero, contact |
| `stats` | Highlights |
| `about` | About: body, `highlights` (phrases underlined in the body), portrait alt text, the three principles |
| `skills` | Skills grid (each skill has an `icon` key) |
| `experience` | Experience cards |
| `projects` | Projects carousel (see below) |
| `aiTesting`, `process` | AI Testing, Process |
| `testimonials` | Testimonials |
| `credentials`, `initiative` | Credentials and the "Keep the Earth Green" banner (alt text) |

**Projects.** A project shows one of two bodies: a test-case story (`details.problem` / `approach` /
`outcome`, with `impact` as the headline figure) or plain facts (`facts`: platform, tooling, approach, with a
`headline`). Other fields: `description` (what was tested), `platform` (`web` or `mobile`, picks the icon),
`techStack` (tags), `role` (optional). Add story fields to any project and its card switches to the
test-case layout.

Key phrases are underlined with the shared `.mark` style (see `src/index.css`). Skills show a "seen in"
company only when an experience tag names that skill. Skill icon keys map to icons in
[`src/components/skillIcons.js`](src/components/skillIcons.js). Chapter order, ids and labels live in
[`src/audit/chapters.js`](src/audit/chapters.js).

## Colors and brand

Three colors: **Abyss Green `#00211E`**, **Pure White `#FFFFFF`**, **Electric Lime `#D5FB09`**. Dark is the
home ground (Abyss, white text, lime accent); light is white with Abyss text, where lime is a fill and an
underline only (it is 1.19:1 on white, so it never carries text). Tokens live in
[`src/index.css`](src/index.css). The full kit is at `/brand/` and in [`BRAND.md`](BRAND.md). One functional
red exists for failed checks and the 404 page.

## Images and icons

Optimized WebP copies in `src/assets/`: `portrait-{480,880}.webp`, `banner-keep-earth-green-{1200,2400}.webp`.
The IK logo variants are `ik-mark.svg` (primary) and `ik-mark-inverse.svg`; the favicon set is in `public/`.
The resume is `Ihtisham_Khattak_SQA.pdf`.

## Design record

The original brief and fingerprint are in [`scrollcraft/builds/portfolio/BRIEF.md`](scrollcraft/builds/portfolio/BRIEF.md).
It describes the first (printed test report) direction; the current visual design supersedes it, and the
self-audit idea carries over.

## Docker

```bash
docker compose up --build
```

App is served at `http://localhost:8080`. See [ARCHITECTURE.md](ARCHITECTURE.md).

## Accessibility

- Skip-to-content link is the first tab stop; visible focus ring
- WCAG AA contrast, measured live by the page; zoom is never disabled
- Theme follows system preference; the footer switch persists the choice
- `prefers-reduced-motion` removes the idle lens, the stamp sweep and non-essential animation
- Mobile menu traps focus, closes on Escape and returns focus; the carousel and bug hunt are keyboard operable
- Decorative SVGs are `aria-hidden`; informative ones are labelled
