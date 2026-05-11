# azzra.my.id

Personal portfolio and writing site for [azzra.my.id](https://azzra.my.id), built with Astro. Features a dark-first design, MDX content collections for projects and blog posts, React islands for interactive components, and a static output optimized for deployment.

## Stack

- **[Astro](https://astro.build)** — static site generator with content collections
- **[React](https://react.dev)** — interactive islands (`ThemeToggle`, `HeroHeading`, `ProjectList`)
- **[Tailwind CSS v4](https://tailwindcss.com)** — utility-first styling via `@tailwindcss/vite`
- **[MDX](https://mdxjs.com)** — rich content authoring for projects and blog posts
- **[Framer Motion](https://www.framer.com/motion/)** — entrance animations with `useReducedMotion` guard
- **[Shiki](https://shiki.style)** — syntax highlighting (`github-light` / `github-dark-dimmed`)
- **[@astrojs/rss](https://docs.astro.build/en/guides/rss/)** — RSS feed for blog posts
- **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)** — auto-generated sitemap

## Project Structure

```text
/
├── public/
│   ├── favicon.ico
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── visuals/
│   │   │   ├── DotGrid.astro        # SVG dot-grid hero backdrop
│   │   │   └── NodeLines.astro      # SVG node-connection decoration
│   │   ├── BlogEntry.astro
│   │   ├── CaseStudyHeader.astro
│   │   ├── Footer.astro
│   │   ├── HeroHeading.tsx          # Framer Motion hero (React island)
│   │   ├── Nav.astro
│   │   ├── ProjectEntry.astro
│   │   ├── ProjectList.tsx          # Staggered project list (React island)
│   │   ├── SEO.astro
│   │   ├── SectionLabel.astro
│   │   ├── StatusBadge.astro
│   │   ├── TechBadge.astro
│   │   └── ThemeToggle.tsx          # Dark/light toggle (React island)
│   ├── content/
│   │   ├── blog/                    # MDX blog posts
│   │   └── projects/                # MDX project case studies
│   ├── layouts/
│   │   ├── BaseLayout.astro         # HTML shell, SEO, Nav, Footer
│   │   └── ProseLayout.astro        # Prose-wrapped MDX layout
│   ├── lib/
│   │   └── readingTime.ts           # Word count → minutes utility
│   ├── pages/
│   │   ├── projects/
│   │   │   ├── index.astro          # All projects list
│   │   │   └── [slug].astro         # Case study detail
│   │   ├── writing/
│   │   │   ├── tag/
│   │   │   │   └── [tag].astro      # Tag-filtered post list
│   │   │   ├── index.astro          # All posts list
│   │   │   └── [slug].astro         # Post detail
│   │   ├── index.astro              # Homepage
│   │   └── rss.xml.ts               # RSS feed
│   ├── styles/
│   │   └── global.css               # Design tokens + base styles
│   └── content.config.ts            # Collection schemas
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Content Collections

### Projects (`src/content/projects/`)

```ts
{
  title: string;
  summary: string;
  tech: string[];
  date: Date;
  status: 'production' | 'archived' | 'in-progress';
  repo?: string;       // URL
  demo?: string;       // URL
  cover?: string;
  featured?: boolean;  // shown on homepage (default: false)
  category?: 'blockchain' | 'backend' | 'fullstack' | 'infrastructure';
  role?: string;
  challenges?: string;
  lessons?: string;
  decisions?: string[];
}
```

### Blog (`src/content/blog/`)

```ts
{
  title: string;
  description: string;
  date: Date;
  tags?: string[];
  cover?: string;
  draft?: boolean;     // excluded from build when true (default: false)
}
```

## Design System

The site uses a dark-first theme with CSS custom properties. Tokens are defined in `src/styles/global.css` and referenced in `tailwind.config.js`.

| Token | Role |
|---|---|
| `--bg` | Page background (bluish-charcoal) |
| `--bg-subtle` | Card / section background |
| `--border` | Borders and dividers |
| `--fg` | Primary text |
| `--muted` | Secondary text |
| `--accent` | Interactive / highlight (muted cyan) |
| `--accent-dim` | Hover accent |
| `--code-fg` | Inline code text |

Theme is toggled via `ThemeToggle.tsx`, persisted to `localStorage`, and applied before first paint via an inline script in `BaseLayout.astro` to prevent flash.

## Commands

All commands are run from the root of the project:

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run test` | Run all tests (unit + component + dist) |
| `npm run test:unit` | Run unit tests only |
| `npm run test:component` | Run component tests only |
| `npm run test:dist` | Run dist/build tests only |
| `npm run astro ...` | Run Astro CLI commands |

## Routes

| Route | Description |
| :--- | :--- |
| `/` | Homepage — hero, focus, selected work, contact |
| `/projects` | All project case studies |
| `/projects/[slug]` | Individual case study |
| `/writing` | All blog posts |
| `/writing/[slug]` | Individual post |
| `/writing/tag/[tag]` | Posts filtered by tag |
| `/rss.xml` | RSS feed (non-draft posts only) |
| `/sitemap-index.xml` | Auto-generated sitemap |
