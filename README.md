# Ihtisham Khattak — Senior QA Engineer Portfolio

Single-page portfolio for test automation, API testing, and AI/LLM quality assurance.
Design concept: **"Quality, Verified."** — black, white and one green accent, with test-run
language (passed checks, assertions, pipelines, coverage) woven into the UI.

## Stack

- React 19 + Vite 7
- Framer Motion (menu, toast, button physics) — scroll reveals are CSS + IntersectionObserver
- Lucide React for concept icons, `react-icons` (Simple Icons) for tool logos
- Vanilla CSS with design tokens; dark and light themes (`data-theme`)
- Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (labels, code)

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
| `personal` | Name, location, phone, email, LinkedIn / GitHub URLs |
| `hero`, `stats` | Hero and the stats strip |
| `about` | About + the three value cards |
| `skills` | Bento groups (each skill has an `icon` key) and the logo marquee |
| `experience` | Timeline entries |
| `aiTesting`, `process`, `credentials` | AI testing, how I work, education |

Skill `icon` keys map to icons in [`src/components/skillIcons.js`](src/components/skillIcons.js).
Brand logos show their brand color on hover; add a new tool by adding one entry there.

Resume PDF: [`src/assets/Ihtisham_Khattak_SQA.pdf`](src/assets/Ihtisham_Khattak_SQA.pdf).

## Page flow

Hero → Stats → About → Skills → Experience → AI Testing → Process → Credentials → Contact

## Colors

Defined once as tokens in [`src/index.css`](src/index.css) (`:root` for light, `[data-theme="dark"]` for dark).
Palette is green / white / black. `--danger` is used only for the bug in the About illustration,
the failing-assertion states on the 404 page, and the copy-failed toast.

## Docker

```bash
docker compose up --build
```

App is served at `http://localhost:8080`. See [ARCHITECTURE.md](ARCHITECTURE.md) for structure.

## Accessibility

- Skip-to-content link, semantic landmarks, visible accent focus ring
- WCAG AA contrast on every text/background token pair, in both themes
- Theme follows system preference, toggle persists to `localStorage`
- `prefers-reduced-motion` disables all non-essential animation
- Keyboard-navigable mobile menu with focus trap and Escape to close
- Decorative SVGs are `aria-hidden`; informative ones have labels
