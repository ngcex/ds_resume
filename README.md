# ds_resume

Personal portfolio and publications site for Cesare Scalia.

Built with Astro 6, Tailwind CSS v4, and MDX content collections. Deploys as a static site to GitHub Pages at <https://ngcex.github.io/ds_resume>.

## Stack

- Astro 6 (static output, content collections)
- Tailwind CSS v4 (CSS-first config in `src/styles/global.css`)
- MDX for long-form content
- `astro-icon` + `@iconify-json/lucide` for icons
- Inter Variable (UI) + IBM Plex Serif (headings)

## Local development

```sh
npm run dev       # start dev server
npm run build     # build to ./dist
npm run preview   # preview production build locally
```

Requires Node `>=22.12.0` (see `.nvmrc`).

## Project layout

```
src/
  components/   # Astro components (Nav, Footer, Hero, Timeline, ...)
  content/      # Content collections (experience, education, publications, projects, site)
  content.config.ts
  layouts/      # BaseLayout, ProseLayout
  pages/        # Routes (index, about, experience, contact, projects/…)
  styles/       # global.css (Tailwind v4 theme)
public/         # Static assets served as-is
```

## Environment variables

- `PUBLIC_FORMSPREE_ID` — Formspree form id used by `/contact`. If unset, the form falls back to a `mailto:` action.
