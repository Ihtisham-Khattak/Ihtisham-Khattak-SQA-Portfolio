# Ihtisham Khattak, Senior QA Engineer Portfolio

A single-page portfolio set as a **printed test report**. White paper, black ink, one green
PASS stamp. Every section is a numbered test case (TC-00 to TC-11) that the page **verifies
for real, in the visitor's browser, as they scroll**.

## The signature move: the page audits itself

A thin run line sweeps down the viewport. As each chapter's header crosses it, the chapter's
stamp goes UNVERIFIED, then RUNNING, then PASSED n/n (or FAILED, honestly). The checks are
measured against the live DOM, never assumed:

- landmark is named, headings do not skip levels
- images and SVGs have text alternatives
- links are named, external links carry `rel=noopener`
- computed text contrast against the real background (WCAG AA)
- tap targets are at least 24px (WCAG 2.2)
- no horizontal overflow
- document language, title, pinch zoom, exactly one `h1`, main landmark, skip link

Click a stamp to see its check list. The **Result** chapter prints the totals plus measured LCP
and CLS (only when the browser reports them), uncaught runtime errors, and signs the report. It says
plainly that automated checks are not a full audit. Reduced motion skips the sweep and shows
every stamp in its final measured state.

## Stack

- React 19 + Vite 7; Framer Motion for the menu sheet, toast and magnetic button only
- Scroll reveals are CSS + one shared IntersectionObserver (`Reveal`)
- Vanilla CSS with tokens. Palette is green / white / black, two grounds (paper and ink)
- Fonts: Space Grotesk, Inter, JetBrains Mono
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

| Key | Chapter |
|-----|---------|
| `personal`, `hero` | Title page, contact |
| `stats` | Highlights |
| `about` | About (copy, portrait alt text, three principles) |
| `skills` | Skills ledger (each skill has an `icon` key) |
| `experience` | Experience log |
| `projects` | Projects, shown as test cases (see below) |
| `aiTesting`, `process` | AI Testing, Process |
| `testimonials` | Testimonials |
| `credentials`, `initiative` | Credentials and the "Keep the Earth Green" banner (alt text) |

**Projects are test cases.** Field mapping: `description` = what was tested, `details.problem` =
what broke, `details.approach` = what was fixed, `details.outcome` = the result, `impact` = the
headline number. The current three projects are interim content restored from the original site;
replace them with the final write-ups.

Skills show a "seen in" company only when an experience tag names that skill (see `Skills.jsx`).
Skill icon keys map to icons in [`src/components/skillIcons.js`](src/components/skillIcons.js).

Chapter order, ids and labels live in [`src/audit/chapters.js`](src/audit/chapters.js). Adding a
chapter means adding it there and wrapping its content in `<Chapter id="...">`.

## Colors

Defined once in [`src/index.css`](src/index.css). `--paper-*` and `--ink-*` are the two grounds; a
chapter picks one with `data-ground` (`base`, `subtle`, `alt`) and the theme toggle swaps which
ground is the base. Every text and background pair is checked for WCAG AA by the page itself.
`--danger` appears only for failed checks, the bug in the About illustration and the 404.

## Images

Optimized WebP copies live in `src/assets/`: `portrait-{480,880}.webp` and
`banner-keep-earth-green-{1200,2400}.webp`. The resume is `Ihtisham_Khattak_SQA.pdf`.

## Design record

The brief, feeling curve, peak and fingerprint live in
[`scrollcraft/builds/portfolio/BRIEF.md`](scrollcraft/builds/portfolio/BRIEF.md), with contact
sheets for desktop, mobile, dark, and reduced motion beside it.

## Docker

```bash
docker compose up --build
```

App is served at `http://localhost:8080`. See [ARCHITECTURE.md](ARCHITECTURE.md) for structure.

## Accessibility

- Skip-to-content link is the first tab stop; visible accent focus ring
- WCAG AA contrast, measured live by the page; zoom is never disabled
- Theme follows system preference, toggle persists
- `prefers-reduced-motion` removes the sweep, sticky print and non-essential animation
- Mobile chapter sheet traps focus, closes on Escape and returns focus
- Decorative SVGs are `aria-hidden`; informative ones are labelled
