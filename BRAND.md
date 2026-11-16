# Brand kit

The live version is the page at `/brand/` ([`public/brand/index.html`](public/brand/index.html)).
This file is the short reference. All files below live in [`public/brand/`](public/brand/).

**Attributes:** precise, trustworthy, detail-obsessed, but not boring.

## Colors

| Name | HEX | RGB | Role |
|------|-----|-----|------|
| Abyss Green | `#00211E` | 0, 33, 30 | Ground: dark theme background, primary logo tile |
| Pure White | `#FFFFFF` | 255, 255, 255 | Text on dark, light theme background, logo letterforms |
| Electric Lime | `#D5FB09` | 213, 251, 9 | Accent: buttons, highlights, underlines, inverse logo tile |

Usage ratio: about 60% Abyss, 30% white, 10% lime.

**The rule:** lime on white is 1.19:1, so lime is a fill and an underline there, never text.
On Abyss it is 14.3:1 and can be text. Every other surface and text tint is a mix of these
three (see `brand-tokens.json`); the only color outside the palette is a functional red for
failed checks and the 404 page.

| Pair | Contrast | Use |
|------|----------|-----|
| White on Abyss | 17.0:1 | Body text, dark |
| Lime on Abyss | 14.3:1 | Accent text, dark |
| Abyss on Lime | 14.3:1 | Text on buttons and badges |
| Abyss on White | 17.0:1 | Body text, light |
| White on Lime / Lime on White | 1.19:1 | Never |

## Logo

The IK monogram. Geometry is fixed; only the ground changes.

| File | Use |
|------|-----|
| `logo/ik-mark-primary.svg` | Abyss tile. White and light grounds |
| `logo/ik-mark-inverse.svg` | Lime tile. Abyss grounds only |
| `logo/ik-mark-mono-abyss.svg` / `-white.svg` | Single color, no tile |
| `logo/ik-lockup-on-light.png` / `-on-dark.png` | Mark plus wordmark |

Clear space: a quarter of the mark's width on every side. Minimum size: 16 px (favicon),
24 px (interface), 8 mm (print). Do not recolor, stretch, rotate, outline, add shadows, put the
lime tile on white, or set lime text on white.

## Typography

Space Grotesk (headings, 400 / 500), Inter (body, 400 / 500), JetBrains Mono (labels and
figures, 400 / 500). All free on Google Fonts. Body is 17 px / 1.7 with lines of at most
62 characters.

## Favicon and app icons

`favicon.svg` is adaptive: Abyss tile on light browser chrome, lime tile on dark. Also provided:
`favicon.ico` (16 / 32 / 48), `apple-touch-icon.png` (180, square), `icon-192.png`, `icon-512.png`,
`icon-maskable-512.png`, and `social/og-card-1200x630.png`.
Copies used by the site are in [`public/`](public/) and referenced from `index.html` and
`site.webmanifest`.

## Tokens

`brand-tokens.css` (custom properties) and `brand-tokens.json`. The app's live tokens are in
[`src/index.css`](src/index.css).
