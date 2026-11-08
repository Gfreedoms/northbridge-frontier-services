# Northbridge Frontier Services — Landing Page

Next.js (App Router) rebuild of the Northbridge Frontier Services Ltd landing
page — a security-services company in Uganda (home & corporate security,
CCTV installation, storage of valuables, security escorts, security dogs).

The visual design language (layout, color system, component shapes) is
inspired by jubileeinsurance.com/ke's landing page, re-skinned entirely with
Northbridge's own content, photography, and copy. See the original static
build's design notes for the full design-token breakdown.

## Stack

- Next.js 16 (App Router), React 19
- Plain CSS (no framework) — ported 1:1 from the static HTML/CSS build
- Static export (`output: 'export'`) — no server runtime required
- Font Awesome 6 + Google Fonts (Poppins) via CDN

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Building

```bash
npm run build            # plain static export, served from site root
npm run build:gh-pages   # static export with the GitHub Pages basePath baked in
```

Output goes to `out/`.

## Deployment

Deployed to GitHub Pages from the `gh-pages` branch, built via
`npm run build:gh-pages`. Live at:
https://<owner>.github.io/northbridge-frontier-services/

## Project status

Landing page only (phase 1). Interior pages (About, Services detail,
Careers, Contact) are stubbed as same-page anchors pending a later phase.
