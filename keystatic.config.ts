import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        pubDate: fields.date({ label: 'Publication Date' }),
        description: fields.text({ label: 'Description', multiline: true }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.fields.value.value,
        }),
        readingTime: fields.text({ label: 'Reading Time', description: 'e.g. 5 min read' }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'src/assets/blog',
              publicPath: '/assets/blog/',
            },
          },
        }),
      },
    }),
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'summary' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        year: fields.text({ label: 'Year' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Web', value: 'WEB' },
            { label: 'CMS', value: 'CMS' },
            { label: 'Machine Learning', value: 'ML' },
            { label: 'API', value: 'API' },
          ],
          defaultValue: 'WEB',
        }),
        tags: fields.array(fields.text({ label: 'Tech Stack Tag' }), {
          label: 'Tech Stack Tags',
          itemLabel: (props) => props.fields.value.value,
        }),
        features: fields.array(fields.text({ label: 'Feature' }), {
          label: 'Feature Pills',
          itemLabel: (props) => props.fields.value.value,
        }),
        liveUrl: fields.url({ label: 'Live URL' }),
        codeUrl: fields.url({ label: 'Code / GitHub URL' }),
        demoUrl: fields.url({ label: 'Demo URL' }),
        summary: fields.markdoc({ label: 'Summary / Description' }),
      },
    }),
    docs: collection({
      label: 'Docs',
      slugField: 'title',
      path: 'src/content/docs/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        section: fields.text({ label: 'Section / Group label' }),
        order: fields.number({ label: 'Sort Order', defaultValue: 0 }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            table: true,
            code: true,
          },
        }),
      },
    }),
  },
});
