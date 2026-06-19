---
title: Development & Performance
section: Portfolio Website
order: 2
description: Step-by-step refactoring process and case study on optimizing dev page loading times from 14s to 200ms.
---

This document outlines the step-by-step development process, refactoring stages, and critical performance optimizations applied during the development of this portfolio site.

## Monorepo to Standalone Migration

The project was originally developed within a Replit monorepo workspace containing multiple unrelated packages (API server, database schemas, scripts, and sandbox configurations). To build a production-ready, clean portfolio, the project underwent a comprehensive refactoring:

1. **Stale File Deletion:** Removed 15+ unused directories and configuration files, including Replit-specific scripts, Drizzle DB folders, mockup sandboxes, and root configuration files.
2. **Promoting Portfolio to Root:** Moved the Astro portfolio files out of sub-folders directly to the workspace root.
3. **Dependency Cleanup:** Fixed broken package versions (replacing pnpm-specific `catalog:` versions with real npm semantic versions) and removed unused modules (`fulldev-ui`, `astro-icon`, etc.).
4. **Fixing Build Failures:** Fixed critical page template bugs, such as utilizing top-level `await` within template JSX maps (`await project.render()`), which breaks Astro's compilation engine.

---

## Case Study: Optimizing Page Load Speeds (from 14s to 200ms)

During local development, page load times on the Astro dev server were averaging **13.5 to 14.2 seconds** per request. This bottleneck was traced down to the template's custom `Icon` component.

### The Bottleneck: Eager Globbing

The original `Icon.astro` implementation globbed all SVG files from two giant npm packages (`lucide-static` and `simple-icons`) eagerly:

```typescript
const icons = import.meta.glob(
  [
    "/node_modules/lucide-static/icons/*.svg",
    "/node_modules/simple-icons/icons/*.svg",
  ],
  { eager: true }
)
```

In development, Vite is forced to parse, transpile, and bundle **4,500+ SVG files** as Astro/React components on every single page load. Since the website only used **2 icons** (sun and moon in the theme toggle), 99.9% of these modules were compiled and served completely in vain.

### The Solution: Static Imports + Dynamic Fallback

We optimized the `Icon` component by introducing a hybrid strategy:

1. **Static Dictionary:** Statically import the most commonly used icons (`sun`, `moon`, and social media logos) using Vite's `?raw` loader. This ensures they are bundled at compile time, bypassing the glob parser entirely.
2. **Dynamic File Reader Fallback:** If an icon name is requested that is not in the static dictionary, the component falls back to a server-side dynamic read using Node's `fs.readFileSync` relative to `process.cwd()`.
3. **Regex SVG Parser:** A high-performance string parser was written to strip out package HTML comments (like `<!-- @license ... -->`) and parse SVG attributes into an object, which merges with component props without duplicating attributes.

```typescript
// Optimized Icon parsing inside icon.astro
const cleanSvg = svgString.replace(/<!--[\s\S]*?-->/g, "").trim()
const match = cleanSvg.match(/^<svg([^>]*)>([\s\S]*)<\/svg>$/i)
```

### The Results

The optimization resulted in immediate speed improvements in development:

* **Page Load Speed:** Dropped from **14,000ms** to **~200ms** (a **98.5% improvement**).
* **Vite Server Render Latency:** Reduced from **13,600ms+** to just **7ms - 10ms**.
* **Zero Bloat:** Build output directory (`dist`) no longer contains thousands of entry chunks for unused SVG icons.
