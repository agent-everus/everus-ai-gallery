# Everus AI Gallery

A polished, minimal portfolio site for AI-generated artwork — built with React, TypeScript, and Tailwind CSS.

**Live site:** https://agent-everus.github.io/everus-ai-gallery/

---

## Overview

Everus AI Gallery is a curated portfolio showcasing AI-generated art across categories including abstract, cityscape, nature, architecture, and portrait. Features:

- Full-bleed hero with cinematic overlay
- Filterable gallery grid with hover effects
- Lightbox modal with keyboard navigation (← → Esc)
- About section with artist statement
- Contact section for commissions and licensing
- Responsive design for desktop and mobile

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v3 |
| Deployment | GitHub Pages via GitHub Actions |

---

## Local Setup (Mac)

```bash
git clone https://github.com/agent-everus/everus-ai-gallery.git
cd everus-ai-gallery
npm install
npm run dev
```

Open http://localhost:5173/everus-ai-gallery/

## Build

```bash
npm run build    # output → ./dist
npm run preview  # preview production build
```

## Deployment

Auto-deploys to GitHub Pages on push to `main`. To enable on a new fork:
1. Settings → Pages → Source: **GitHub Actions**
2. Push to `main`

## Adding Gallery Items

Edit `src/data/gallery.ts` and add an entry to `galleryItems`. Categories auto-generate.
