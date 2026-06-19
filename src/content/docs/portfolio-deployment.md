---
title: Deployment & Vercel Setup
section: Portfolio Website
order: 3
description: Deploying to Vercel Serverless, handling pnpm v11+ build restrictions, and local vs remote build environments.
---

This document describes how this portfolio website is configured for production builds and serverless deployments to Vercel.

## Adapting for Serverless Vercel

Astro projects default to static site generation. If a project utilizes integrations that depend on dynamic server routes (like the Keystatic admin panel `/keystatic`), it requires a server adapter to process requests at runtime.

### Swapping Adapters

The project originally used the `@astrojs/node` adapter configured in standalone mode, which runs a continuous Node.js server. Because Vercel is a serverless platform, it cannot execute standalone servers, causing page load failures in production.

We migrated the project to the Vercel Serverless environment:

1. Installed the `@astrojs/vercel` adapter compatible with Astro v5:
   ```bash
   pnpm add @astrojs/vercel@9
   ```
2. Swapped the configurations in `astro.config.mjs`:
   ```javascript
   import { defineConfig } from 'astro/config';
   import vercel from '@astrojs/vercel';
   import keystatic from '@keystatic/astro';

   export default defineConfig({
     output: 'server',        // Set to server so dynamic routes build as functions
     adapter: vercel(),       // Configured Vercel adapter
     // ...
   });
   ```

With this setup, Vercel hosts all pre-rendered pages (e.g. pages exporting `export const prerender = true`) statically as fast assets, while deploying dynamic API endpoints (like Keystatic admin pages) as serverless Edge/Node functions.

---

## pnpm v11+ Build Permissions

In **pnpm v11**, dependency build scripts (such as those for compiling `esbuild` or native image-processing binary `sharp`) are ignored by default. If a dependency tries to run a build script without explicit approval, the installation terminates with a `[ERR_PNPM_IGNORED_BUILDS]` error.

### Configuring Build Approval

To allow these build scripts to execute on Vercel's build servers, we configured `allowBuilds` inside the workspace settings file:

1. Created a [pnpm-workspace.yaml](/pnpm-workspace.yaml) file at the root of the project:
   ```yaml
   allowBuilds:
     esbuild: true
     sharp: true
   ```
2. Staged and committed this file to Git so it is shared with the Vercel build container.

---

## Build Environment Constraints (Windows vs. Linux)

When running a local build on a Windows machine:
* The Vercel adapter performs static analysis of dependencies using `@vercel/nft` (Node File Trace) and attempts to create symbolic links (`symlinks`) inside the `.vercel/output/functions/_render.func/node_modules/` directory.
* Because Windows restricts the creation of symlinks to Administrator prompts or Developer Mode accounts, this can result in local build failures like `EPERM: operation not permitted, symlink`.

### Resolution
* **Vercel Builds:** When pushed to GitHub, Vercel compiles the project on a Linux environment where symlinks are natively supported, resulting in a successful deployment.
* **Local Development:** When developing locally, run `pnpm dev` which launches the Astro server in memory without attempting to trace/bundle symlinks.
* **Local Production Build:** If you must build the project locally on Windows, either run your terminal as an Administrator, or toggle **Developer Mode** on in your Windows Settings.

---

## Operational Guide

### 1. Local Development
Start the local server to edit code and update content:
```bash
pnpm dev
```
* public pages: `http://localhost:4321`
* Keystatic Admin Panel: `http://localhost:4321/keystatic`

### 2. Local Build Verification
Verify the build compiles successfully before committing:
```bash
pnpm build
```

### 3. Deploying Changes
Simply push commits to the `main` branch on GitHub. Vercel is configured with Git Integration and will trigger a build and publish the changes automatically.
