# CLAUDE.md — everus-ai-gallery

## What This Project Is

A React + TypeScript portfolio for AI-generated art, deployed to GitHub Pages via GitHub Actions.

Live: https://agent-everus.github.io/everus-ai-gallery/

## Stack

- React 18 + TypeScript (strict)
- Vite (dev server + build)
- Tailwind CSS v3
- GitHub Actions → GitHub Pages

## File Map

| Path | Purpose |
|---|---|
| `src/App.tsx` | Root layout |
| `src/types.ts` | `GalleryItem` interface |
| `src/data/gallery.ts` | All gallery data + category list |
| `src/components/Header.tsx` | Fixed nav, scroll effect, mobile menu |
| `src/components/Hero.tsx` | Full-screen hero |
| `src/components/Gallery.tsx` | Grid + filter state |
| `src/components/GalleryCard.tsx` | Card tile with hover overlay |
| `src/components/Lightbox.tsx` | Modal with prev/next/keyboard nav |
| `src/components/About.tsx` | Artist statement |
| `src/components/Contact.tsx` | Contact + CTA |
| `src/components/Footer.tsx` | Footer |
| `vite.config.ts` | base MUST stay `/everus-ai-gallery/` |
| `.github/workflows/deploy.yml` | CI/CD to Pages |

## Rules

**Do:**
- Keep `base: '/everus-ai-gallery/'` in `vite.config.ts` — removing it breaks routing on GitHub Pages
- Add gallery items only via `src/data/gallery.ts`
- Use Tailwind utility classes; custom colors are `obsidian`, `warm-white`, `gold`, `gold-light`
- Keep TypeScript strict — no `any`

**Don't:**
- Don't add React Router (single-page, anchor nav)
- Don't add a UI component library alongside Tailwind
- Don't change the GitHub Actions workflow without testing the build first
- Don't change `GalleryItem` without updating all consumers

## Deployment

Automatic on push to `main`. GitHub Pages source must be set to **GitHub Actions** in repo settings.
