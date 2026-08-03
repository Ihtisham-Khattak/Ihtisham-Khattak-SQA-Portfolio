# Ihtisham Khattak — SQA Portfolio

Hiring-manager-ready SPA for SQA experience, automation case studies, tool stack, work samples, and contact.

## Stack

- React 19 + Vite 7
- Framer Motion (reduced-motion aware)
- Lucide React
- Vanilla CSS with design tokens and dark mode (`data-theme`)

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint |

## Content edits

All copy lives in [`src/data/portfolioData.js`](src/data/portfolioData.js):

- `hero`, `metrics`, `services`
- `skills` (tool groups)
- `experience` (reverse-chronological)
- `projects` (case studies)
- `workSamples`
- `testimonials`, `personal`

### Adding documentation samples

1. Place sanitized PDFs or Markdown in [`public/samples/`](public/samples/).
2. Update the matching `workSamples` entry with `link: "/samples/your-file.pdf"` and remove `comingSoon: true`.

Resume PDF: [`src/assets/Ihtisham_Khattak_SQA.pdf`](src/assets/Ihtisham_Khattak_SQA.pdf).

## Page flow

Hero (+ metrics) → How I Help → Tool Stack → Experience → Case Studies → Work Samples → Testimonials → Contact

## Docker

```bash
docker compose up --build
```

App is served at `http://localhost:8080`.

See [ARCHITECTURE.md](ARCHITECTURE.md) for structure and design notes.

## Accessibility

- Skip-to-content link
- Dark/light theme with system preference + persistence
- `prefers-reduced-motion` support
- Labeled controls and carousel pause on focus/hover
