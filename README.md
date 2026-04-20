# ds_resume

Personal portfolio and publications site for **Cesare Scalia, PhD** — Lead Data Scientist.

Static site built with Astro 6 + Tailwind CSS v4 + MDX content collections. Deploys to GitHub Pages.

**Live URL:** <https://ngcex.github.io/ds_resume> (pending Pages config on first deploy — see _Deployment_ below).

## Stack

- **Astro 6** — static output, content collections, MDX rendering
- **Tailwind CSS v4** — CSS-first configuration in `src/styles/global.css` (no `tailwind.config.*` file)
- **MDX** (`@astrojs/mdx`) for long-form content (about, project case studies)
- **Sitemap** (`@astrojs/sitemap`) and **RSS** (`@astrojs/rss`)
- `astro-icon` + `@iconify-json/lucide` for icons
- Inter Variable (UI) + IBM Plex Serif (headings/quotes), with fallback-metric font faces to minimise layout shift

## Local development

```sh
npm run dev       # start dev server at http://localhost:4321/ds_resume/
npm run build     # build to ./dist
npm run preview   # preview production build locally
```

Requires Node `>=22.12.0` (version pinned in `.nvmrc`).

## Project layout

```
src/
  components/           # Astro components (Nav, Footer, Hero, Timeline, PublicationRow, …)
  content/
    site/               # Singleton site config (name, bio, socials)
    pages/              # MDX pages (about.mdx)
    experience/         # One markdown file per role
    education/          # Degrees, honours
    projects/           # Project case studies (MDX, one per slug)
    publications/       # Peer-reviewed papers, talks, posters (one YAML entry per pub)
  content.config.ts     # Zod schemas for every collection
  layouts/
    BaseLayout.astro    # HTML shell, head, nav, footer, skip link, theme script
    ProseLayout.astro   # Adds .prose-scientific wrapper for long-form MDX
  pages/                # Routes — index, about, experience, publications, contact,
                        # projects/index.astro, projects/[...slug].astro, rss.xml.ts
  styles/
    global.css          # Tailwind v4 theme + font metrics + prose + reduced-motion
public/                 # Static assets served as-is (CV PDF, favicon, OG image)
.github/workflows/
  deploy.yml            # Build + deploy to GitHub Pages on push to main
```

## Content

All content is sourced from `src/content/`. Each collection is schema-validated (`src/content.config.ts`).

- `site/` — single YAML with display name, tagline, bio, social URLs
- `pages/about.mdx` — long-form About page
- `experience/*.md` — one file per role (frontmatter: title, company, startDate, endDate, bullets…)
- `education/*.md` — degrees with honours
- `projects/*.mdx` — project case studies; set `featured: true` to surface on the home page
- `publications/*` — one entry per publication (title, year, venue, authors, DOI/ADS/URL, type)

## Environment variables

- `PUBLIC_FORMSPREE_ID` — Formspree form id used by `/contact`. If unset, the form falls back to a `mailto:` action.

## Accessibility & performance

- Single `<h1>` per page, sequential heading order (enforced via visually-hidden section headings where needed)
- Skip-to-content link, labelled landmarks (`<nav>`, `<main>`, `<footer>`)
- All external links carry `rel="noopener noreferrer"`; all icon-only buttons have `aria-label`
- Colour palette tuned to pass WCAG AA in both light and dark modes (Lighthouse accessibility = 100 on all pages)
- `@media (prefers-reduced-motion: reduce)` respected globally
- Dark-mode flash prevention via inline `<script is:inline>` in `BaseLayout.astro` before any stylesheet loads
- Fallback font-face metrics (`size-adjust`, `ascent-override`) keep cumulative layout shift low during web-font swap

## Deployment

The site auto-deploys to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`.

**One-time setup after the workflow first lands on `main`:**
GitHub → **Settings** → **Pages** → **Build and deployment** → **Source**: select **GitHub Actions**.

Subsequent pushes will build and publish automatically; no `gh-pages` branch is used.
