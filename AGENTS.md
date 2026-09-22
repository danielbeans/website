# Repository Guidelines

Personal portfolio and technical blog website (`https://danielfwilliams.com`). Minimal Astro-based static site generator project documenting dated technical entries.

## Project Overview

- **Name**: Personal Website - Version 3
- **Type**: Static site generator (Astro SSG)
- **Purpose**: Portfolio + technical blog with dated entries (YYYY-MM-DD format)
- **Template**: Based on astro-nano
- **Repository**: GitHub (danielbeans/website)
- **Previous Versions**: v2 (v2.danielfwilliams.com), v1 (v1.danielfwilliams.com)

## Architecture & Data Flow

### High-Level Structure
- **Static generation**: All routes pre-rendered at build time via Astro's SSG output
- **No server runtime**: Compiled output is pure HTML/CSS/JavaScript; deployable to any static host
- **Minimal interactivity**: Client-side animations and scroll tracking only; no frameworks (React, Vue, etc.)

### Data Flow

```
consts.ts (SITE config) → types.ts (Site interface)
                       ↓
                    Consumed in components (Header, Head)

content.config.ts (schema via Zod)
                       ↓
Blog.astro getCollection('blog')
    ↓
 [slug].astro render() + getStaticPaths()
    ↓
 Static HTML routes pre-rendered at build time
```

### Key Modules

1. **Constants** (`src/consts.ts`): Site constants (NAME='DW', EMAIL='danielfwilliams@proton.me')
2. **Types** (`src/types.ts`): Central TypeScript definitions (Site interface)
3. **Content Schema** (`src/content.config.ts`): Astro Content Collections with Zod validation
4. **Root Layout** (`src/layouts/RootLayout.astro`): Page shell wrapping all routes (html > Head + Header + main + Footer)
5. **Pages** (`src/pages/`): File-based routing (index.astro, blog/[...slug].astro)
6. **Components** (`src/components/`): Reusable Astro components (Head, Header, Footer, Blog, Link, Container)
7. **Styles** (`src/styles/global.css`): Tailwind CSS with typography plugin

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `src/` | Application source code |
| `src/components/` | Reusable Astro components (7 files) |
| `src/layouts/` | Page layout templates (RootLayout.astro) |
| `src/pages/` | File-based routing pages (index.astro, blog/[...slug].astro) |
| `src/styles/` | Global CSS (global.css with Tailwind directives) |
| `content/blog/` | Markdown blog posts with YAML frontmatter |
| `content/images/` | Image assets referenced in posts |
| `public/` | Static assets served at root (favicon.ico) |
| `.astro/` | Generated type definitions and build artifacts |
| `dist/` | Production build output (static HTML/CSS/JS) |

## Development Commands

```bash
npm run dev      # Start dev server (http://localhost:3000) with HMR
npm run build    # Create production build → dist/
npm run preview  # Preview production build locally
npm run astro    # Direct Astro CLI access for advanced commands
```

**Workflow**: `npm run dev` → edit components/pages/content → hot reload → `npm run build` before deployment.

**Dev server**: Hot module reload enabled; changes to components, pages, and content auto-refresh.

## Code Conventions & Common Patterns

### Naming Conventions

| Type | Convention | Examples |
|------|-----------|----------|
| Components | PascalCase (.astro) | Container, Header, Footer, Blog, Link, Head |
| Layouts | PascalCase + 'Layout' | RootLayout |
| Pages | kebab-case | index.astro, blog/[...slug].astro |
| Content files | YYYY-MM-DD.md | 2025-07-07.md, 2025-06-23.md |
| Utilities | camelCase (.ts) | consts.ts, types.ts, content.config.ts |
| CSS classes | kebab-case | tailwind utilities + custom (.animate, .show) |
| Constants | SCREAMING_SNAKE_CASE | SITE (in consts.ts) |

### TypeScript

- **Strict mode**: Enabled (`astro/tsconfigs/strict`)
- **Path aliases**: `@/*` → `./src/*` (use `@/components`, `@/types`)
- **Null checks**: `strictNullChecks: true`
- **Type definitions**: Centralized in `src/types.ts` (Site interface)

### Component Architecture

**Pattern**: File-based component structure in `src/components/`

- **Pure Astro components** (.astro files)—zero client-side JavaScript by default
- **Props**: Typed via `type Props` interface, destructured from `Astro.props`
- **Composition**: Components imported and composed via `<slot />` for children
- **Example hierarchy**:
  ```
  RootLayout
  ├─ Head (meta tags, animations, scroll tracking)
  ├─ Header (navigation + branding)
  └─ Footer (attribution)
  
  Pages (index, blog/[slug])
  ├─ Container (width constraint)
  └─ Blog component (list) or dynamic content (render())
  ```

### Content & Markdown

**Blog posts** (`content/blog/*.md`):
```yaml
---
title: "Authentication Architecture for NAS Services"
date: "2025-07-07"
description: "Technical blog entry"
---

## Post content here
```

- Schema validation via Zod: `title` (string), `date` (string), `description` (string)
- Content loaded dynamically via `getCollection('blog')`
- Sorted by date descending (newest first)
- File naming: `YYYY-MM-DD.md` format
- Images referenced from `content/images/`

### Async Patterns

- **Content loading**: `getCollection('blog')` returns a Promise, awaited in components (Blog.astro, blog/[...slug].astro)
- **Markdown rendering**: `render(post)` returns async Promise with Content component
- **Static generation**: `getStaticPaths()` async function in `[...slug].astro` pre-renders all blog routes at build time
- **Error handling**: Minimal; relies on Astro's build-time validation

### Styling

**Framework**: Tailwind CSS v4.1.8 with typography plugin

- **Organization**: Single `src/styles/global.css` with Tailwind directives
- **Approach**: Utility-first (no custom component classes)
- **Dark mode**: Supported via class strategy (`.dark` on html element)
- **Patterns**:
  - Responsive design: Tailwind breakpoint utilities
  - Animations: CSS transitions for entry (opacity/translate)
  - Staggered entry: Class-based (`.animate`, `.show`) with `setTimeout`
  - Session state: `sessionStorage` prevents re-animation on revisits
  - Scroll tracking: `.scrolled` class added/removed on scroll

### Project-Specific Patterns

- **Inline script**: `Head.astro` includes large `<script is:inline>` for DOM initialization (not extracted)
- **Event reinitialization**: `astro:after-swap` listener reinitializes bindings for View Transitions
- **Container component**: Minimal layout wrapper (width constraint, not a content boundary)
- **Link component**: Wrapper for consistent styling; props: `href`, `external` (rel="noopener"), `underline` toggle

## Important Files

### Entry Points

| File | Purpose |
|------|---------|
| `src/pages/index.astro` | Homepage (hero + blog list) |
| `src/pages/blog/[...slug].astro` | Dynamic blog post pages (SSG via getStaticPaths) |
| `src/layouts/RootLayout.astro` | Global page shell; wraps all pages |

### Configuration

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro config; Tailwind CSS Vite plugin integration |
| `tsconfig.json` | TypeScript config (strict, path aliases @/* → ./src/*) |
| `package.json` | Dependencies, npm scripts, ESM module config |
| `.gitignore` | Ignores: dist/, .astro/, node_modules/, .env*, .idea/, .vscode/, .DS_Store |

### Core Modules

| File | Purpose |
|------|---------|
| `src/consts.ts` | Site constants (SITE: name, email) |
| `src/types.ts` | TypeScript interfaces (Site type) |
| `src/content.config.ts` | Astro Content Collections schema (blog posts with Zod; date field) |
| `src/styles/global.css` | Global Tailwind CSS (typography plugin) |

## Runtime/Tooling Preferences

### Required Runtime

- **Node.js**: >= 18.20.8 (supported: 18.20.8 || ^20.3.0 || >=22.0.0)
- **Package manager**: npm (v>=9.6.5); uses package-lock.json v3
- **Module system**: ES modules ("type": "module" in package.json)

### Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| astro | ^5.9.1 | Static site generator |
| tailwindcss | ^4.1.8 | Utility-first CSS framework |
| @tailwindcss/vite | ^4.1.8 | Vite plugin for Tailwind |
| @tailwindcss/typography | ^0.5.19 | Typography plugin for prose styling |

**Note**: Only 4 direct dependencies. No dev dependencies declared. Deliberately minimal.

### Build & Deployment

- **Build output**: `dist/` directory (static HTML/CSS/JavaScript)
- **Output type**: Fully pre-rendered static site; no server runtime required
- **Hosting**: Any static host (Netlify, Vercel, GitHub Pages, S3, traditional web servers)
- **Content-addressed filenames**: Astro default; CDN-friendly

### Project Constraints

- **Minimalist approach**: Project deliberately minimal; only essential dependencies
- **Static generation**: All logic runs at build time; no server runtime, API routes, or dynamic features

**Current philosophy**: Keep project minimal; focus on simplicity. Add testing/linting only if complexity increases.
