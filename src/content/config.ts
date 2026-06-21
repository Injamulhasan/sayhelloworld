import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    readingTime: z.string().default('5 min read'),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    year: z.string(),
    category: z.enum(['WEB', 'ML', 'API', 'CMS']),
    tags: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
    liveUrl: z.string().url().optional(),
    codeUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
  }),
});

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    section: z.string(),
    order: z.number().default(0),
    description: z.string().optional(),
  }),
});

export const collections = { blog, projects, docs };
