# Injamul Hasan — Portfolio & Documentation Center

[![Astro](https://img.shields.io/badge/Astro-v5.0-FF5D01?style=flat-square&logo=astro&logoColor=white)](https://astro.build/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Keystatic](https://img.shields.io/badge/Keystatic-CMS-2B6CB0?style=flat-square&logo=contentful&logoColor=white)](https://keystatic.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Serverless-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

A fast, minimalist, and highly customized developer portfolio and technical reference dashboard built with **Astro (v5)**, **Tailwind CSS**, and **Keystatic CMS**.

This repository is optimized for speed, semantic markup, and serverless edge hosting. It serves as both a public portfolio and a project documentation engine.

---

## 🚀 Key Features

* **⚡ Ultra-Performance**: Hot-reload in development completes in **under 200ms** and Vite server render latency is below **10ms**.
* **📝 File-Based CMS**: Integrated with **Keystatic**, providing a Git-native admin interface (`/keystatic`) to manage blogs, docs, and projects directly as Markdown/MDX files.
* **📱 Responsive Hamburg Drawer**: Includes a custom-coded mobile navigation drawer that slides in from the **left** on mobile viewports, featuring staggered asymmetrical icon lines, blurred backdrop overlays, scroll-locking, and zero-dependency inline scripts.
* **🎨 curation & Modern Layout**: Features a full-width gradient hero header, circular profile crop with border-ring shadows, horizontal contact metadata badges, and a 3-column roles and focus card grid.
* **🌗 Dark/Light Mode**: Implemented using an inline theme provider script injected directly into `<head>` to avoid Flash of Unstyled Content (FOUC).

---

## 🛠️ Tech Stack & Dependencies

* **Framework**: `Astro 5.x` (Hybrid rendering mode)
* **Styling**: `Tailwind CSS 3.4` + `@tailwindcss/typography`
* **Content Management**: `@keystatic/astro` + `@keystatic/core`
* **Serverless Hosting**: `@astrojs/vercel` (Serverless Function adapter)
* **TypeScript & Linting**: Strict TS compilation checking, utilizing path aliases (`@/*` pointing to `src/*`)

---

## 📂 Repository Structure

```text
sayhelloworld/
├── src/
│   ├── components/       # Astro components
│   │   ├── Nav.astro     # Global navigation header & Mobile Drawer Menu
│   │   └── ui/           # Custom primitives (Badge, Card, Icon)
│   ├── content/          # Markdown Content Collections
│   │   ├── config.ts     # Zod schema validation rules
│   │   ├── blog/         # Blog markdown source
│   │   ├── projects/     # Projects markdown source
│   │   └── docs/         # Markdown technical documentation
│   ├── layouts/          # Astro Page layouts (Layout, LayoutDoc)
│   ├── lib/              # Class utilities and tailwind mergers
│   ├── pages/            # File-based routing (pages & dynamic slugs)
│   └── styles/           # Global styles and Tailwind base imports
├── public/               # Static assets (favicons, profile image)
├── astro.config.mjs      # Astro configuration (Vercel adapter, plugins)
├── keystatic.config.ts   # Keystatic CMS schemas and storage config
├── pnpm-workspace.yaml   # pnpm dependency build rules
├── tailwind.config.mjs   # Tailwind custom theme variables
├── tsconfig.json         # TypeScript configuration (paths, types)
└── package.json          # Manifest dependencies
```

---

## ⚡ Performance Optimization Case Study: Eager Globbing Fix
During local development, request-to-render times on the dev server originally averaged **14 seconds** per page load. We isolated this bottleneck to an eager globbing operation inside the `Icon` component:

```typescript
// The original, slow globbing approach:
const icons = import.meta.glob([
  "/node_modules/lucide-static/icons/*.svg",
  "/node_modules/simple-icons/icons/*.svg"
], { eager: true });
```
This forced Vite to parse and bundle **over 4,500 SVG files** as Astro components on every single hot reload, even though only a handful of icons were actually rendered.

### The Solution: Statically Mapped Dictionary + Server-Side fs Fallback
1. **Static Dictionary**: We mapped frequently used icons (like `sun`, `moon`, `github`, and `linkedin`) using Vite's `?raw` loader to bundle them at compile time.
2. **Server-Side File Reader**: If an icon name is requested that is not in the dictionary, the component falls back to dynamically reading the file from `node_modules` at compile/build time:
   ```typescript
   const path = path.join(process.cwd(), "node_modules", "lucide-static", "icons", `${name}.svg`);
   const svgContent = fs.readFileSync(path, "utf-8");
   ```
3. **Regex Attribute Merger**: Cleaned comments and compiled SVG content using regex rather than relying on heavy HTML parsers.

### The Results
* **Dev Server Render Latency**: Reduced from **14,200ms** to **~200ms** (a **98.5% improvement**).
* **Bundle Efficiency**: Prevents Vite from creating unnecessary chunk splits for thousands of unused SVGs in production.

---

## ⚙️ Content Modeling with Keystatic

Keystatic runs in **local storage mode** in development, which directly creates or edits Markdown files locally:

```typescript
// keystatic.config.ts
import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  collections: {
    blog: collection({
      label: 'Blog',
      path: 'src/content/blog/*',
      slugField: 'title',
      schema: { ... }
    }),
    // ...
  }
});
```

These Markdown collections are automatically synced with Astro's Type-Safe collections in `src/content/config.ts` via **Zod** schema validations:

```typescript
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});
```

---

## 🚀 Development & Deployment Guide

### Prerequisites
Make sure you have **Node.js 18+** and **pnpm** installed on your machine.

### Setup and Local Server
1. **Install Dependencies**:
   ```bash
   pnpm install
   ```
2. **Start Development Server**:
   ```bash
   pnpm dev
   ```
   * Live portfolio site: `http://localhost:4321`
   * Keystatic Admin dashboard: `http://localhost:4321/keystatic`

### Production Builds
Verify compilation and static routing locally:
```bash
pnpm build
```

---

## ☁️ Vercel Deployment Setup

### Adaptor Configuration
The project is configured with `@astrojs/vercel` serverless adapter in **hybrid output mode**. Pre-rendered static pages compile directly to Vercel CDN static routes, while dynamic endpoints (such as Keystatic admin assets or dynamic queries) are compiled to serverless lambdas.

### pnpm v11+ Build Script Approval
In pnpm v11, dependencies trying to execute native compilation scripts (like `esbuild` and image resizing library `sharp`) are ignored by default, resulting in `[ERR_PNPM_IGNORED_BUILDS]` build failures. 

To enable builds inside the Vercel builder environment, compile permissions are explicitly granted inside [pnpm-workspace.yaml](/pnpm-workspace.yaml):
```yaml
allowBuilds:
  esbuild: true
  sharp: true
```

### Windows build EPERM Warning
When building the project locally on a Windows environment:
* The Vercel adapter compiles output routes using symlinks.
* On Windows, creating symlinks throws an `EPERM: operation not permitted` error unless running as **Administrator** or having **Developer Mode** enabled in Windows settings.
* This error **only** affects local builds on Windows; Vercel's Linux builders compile the project seamlessly.
