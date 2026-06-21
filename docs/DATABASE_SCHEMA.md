# Database Schema (Content Collections)

> **Architectural Note:** This project uses Astro with **Keystatic** as a local, file-based CMS. It does NOT use a traditional relational database (like PostgreSQL/MySQL) or an ORM like Drizzle. Therefore, there are no relational tables or `onDelete: cascade` rules. Instead, "tables" are defined as Markdown/MDX content collections in `keystatic.config.ts`.

Below is the exact schema definition mapped to Keystatic syntax principles used in the project.

## Collections (Tables)

### 1. `blog` Collection
Stores all technical articles and personal blog posts.
- **Path:** `src/content/blog/*`
- **Fields:**
  - `title` (Slug/String): Primary identifier and title of the post.
  - `pubDate` (Date): Publication date.
  - `description` (Text): Short summary.
  - `tags` (Array of Text): List of associated tags (e.g., "Astro", "React").
  - `readingTime` (Text): e.g., "5 min read".
  - `content` (Markdoc): The rich text markdown content body.

### 2. `projects` Collection
Stores portfolio projects showcased on the `/projects` page.
- **Path:** `src/content/projects/*`
- **Fields:**
  - `title` (Slug/String): Primary identifier and title of the project.
  - `year` (Text): Year of completion.
  - `category` (Select): Project category (Enum: 'WEB', 'ML', 'API'). Default: 'WEB'.
  - `tags` (Array of Text): Tech stack tags used (e.g., "React", "FastAPI").
  - `features` (Array of Text): Feature pills/bullet points.
  - `liveUrl` (URL): Link to the live production site.
  - `codeUrl` (URL): Link to the GitHub repository.
  - `demoUrl` (URL): Link to a video or interactive demo.
  - `summary` (Markdoc): Full description and details of the project.

### 3. `docs` Collection
Stores architectural patterns, user guides, and reference documentations.
- **Path:** `src/content/docs/*`
- **Fields:**
  - `title` (Slug/String): Primary identifier and title of the document.
  - `section` (Text): Grouping label to organize docs into categories.
  - `order` (Number): Sort order for sidebars or lists. Default: 0.
  - `content` (Markdoc): The rich text markdown documentation body.

## Relations
Since this is a file-based NoSQL-like structure, relations are implicitly managed by frontmatter fields (e.g., filtering `projects` by `category` or filtering `docs` by `section` at build time). There are no strict relational foreign keys.
