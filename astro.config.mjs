// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/data/site-config.js';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: SITE_URL,
  integrations: [mdx(), sitemap()]
});
