import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import keystatic from '@keystatic/astro';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    keystatic(),
  ],
  server: {
    port: parseInt(process.env.PORT || '4321'),
    host: true,
  },
});
