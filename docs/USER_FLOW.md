# User Flow

This document maps out the exact step-by-step route and state lifecycles for the primary user journeys within the portfolio site.

## 1. Landing and Discovery Flow
- **Entry Point:** User navigates to the root `/` (Home).
- **Hero Section:** User is presented with the profile image, introductory tagline, and a brief value proposition ("Results-driven Full Stack Developer...").
- **Action:** User scrolls down to the Bento Grid ("At a Glance").
- **State Transition:** 
  - If user clicks a specific Bento card (e.g., Experience or Skills), they consume the information inline or navigate to a dedicated section if applicable.
  - If user clicks "Read the Blog", they transition to the `/blog` route.

## 2. Project Exploration Flow
- **Entry Point:** User navigates to `/projects`.
- **View State:** The user sees a list of projects categorized by type (Web, Machine Learning, API).
- **Action:** User clicks on a specific project card.
- **State Transition:** 
  - User is routed to `/projects/[slug]` to view detailed project documentation (features, tech stack).
  - External navigation occurs if the user clicks "Live URL", "Code / GitHub URL", or "Demo URL".

## 3. Blog & Documentation Consumption Flow
- **Entry Point:** User navigates to `/blog` or `/docs`.
- **View State:** User views a paginated or grouped list of markdown-based articles/documentation cards.
- **Action:** User selects an article.
- **State Transition:**
  - Route changes to `/blog/[slug]` or `/docs/[slug]`.
  - Content is rendered statically from Keystatic markdown collections.

## 4. Content Management Flow (Admin)
- **Entry Point:** Admin (Injamul) navigates to `/keystatic` locally or in the deployed environment.
- **State:** Keystatic UI loads, authenticating via local file system (in dev) or GitHub/deployed config.
- **Action:** Admin creates a new Blog Post, Project, or Doc entry.
- **State Lifecycle:** 
  - Draft -> Saved (Commit to Git repo).
  - Vercel webhook triggers a new site build.
  - New content becomes available statically on the live site.
