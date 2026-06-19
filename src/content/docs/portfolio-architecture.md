---
title: Architecture Overview
section: Portfolio Website
order: 1
description: Core technology stack, project directory layouts, and Keystatic CMS integration schemas.
---

This document outlines the core architecture and technology stack of this developer portfolio website. It is designed to help developers understand how the codebase is organized, how data flows, and how components interact.

## Core Tech Stack

The site is built as a fast, type-safe, content-driven web application using the following technologies:

1. **Framework:** [Astro (v5)](https://astro.build/) - Selected for its hybrid server/static rendering capability, minimal client-side Javascript footprint (island architecture), and excellent developer experience.
2. **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Integrated directly into Astro using utility classes and customized styling systems for dark mode.
3. **CMS:** [Keystatic](https://keystatic.com/) - A Git-native, file-based CMS that allows editing content locally via a user-friendly UI without needing external databases.
4. **Typings:** [TypeScript](https://www.typescriptlang.org/) - Ensures compile-time safety and self-documenting code.

---

## Directory Structure

Here is a look at the standalone project directory layout:

```
sayhelloworld/
├── src/
│   ├── components/       # Reusable Astro components
│   │   ├── Nav.astro     # Global navigation header
│   │   └── ui/           # Basic UI components (Badge, Button, Card, Icon, etc.)
│   ├── content/          # Markdown content collections (Blog, Projects, Docs)
│   │   ├── config.ts     # Zod schema declarations for Astro collections
│   │   ├── blog/         # Markdown files for blog posts
│   │   ├── projects/     # Markdown files for projects
│   │   └── docs/         # Markdown documentation pages (like this one)
│   ├── layouts/          # Astro layout wrappers (Layout, LayoutDoc)
│   ├── lib/              # Utility helpers (cn classes merger, etc.)
│   ├── pages/            # File-based routing index files
│   └── styles/           # Global styles (Tailwind base and fonts)
├── public/               # Public assets (Favicon, logos, images)
├── astro.config.mjs      # Astro configuration (integrations, server settings)
├── keystatic.config.ts   # Keystatic collections schema definitions
├── pnpm-workspace.yaml   # pnpm settings (build permissions)
├── tailwind.config.mjs   # Tailwind customizations and themes
├── tsconfig.json         # TypeScript configuration and path aliases
└── package.json          # Dependency manifest
```

---

## Component Philosophy

The components in the project are designed with a **minimalist, dependency-free** mindset. Instead of importing large third-party React component libraries, the project implements custom primitives:

* **Minimal Footprint:** Components are written as native `.astro` files, ensuring they compile to static HTML at build time with **zero JavaScript shipped to the client** by default.
* **Aesthetic Theme Toggle:** The theme toggle uses an inline script injected directly into the HTML to prevent flash-of-unstyled-content (FOUC) when switching between dark and light modes.
* **Tailwind Class Merging:** Built-in styling helpers (`clsx`, `tailwind-merge`, and `class-variance-authority`) are used to create clean, reusable layouts and state modifiers without cluttering template files.

---

## Content & CMS Modeling

Content collections are managed using **Keystatic** in local mode. Keystatic operates directly on Markdown/MDX files:

```typescript
// keystatic.config.ts
import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: { kind: 'local' }, // Stores edits in local files during dev
  collections: {
    blog: collection({ ... }),
    projects: collection({ ... }),
    docs: collection({ ... })
  }
});
```

These collections are bound to Astro's content schemas in `src/content/config.ts` using Zod validation. During production builds, Astro reads the generated Markdown files and compiles them into static routes.
