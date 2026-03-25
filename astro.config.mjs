// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/data/site-config.js';

const integrations = [mdx(), ...(SITE_URL ? [sitemap()] : [])];

// https://astro.build/config
export default defineConfig({
  output: 'static',
  ...(SITE_URL ? { site: SITE_URL } : {}),
  integrations
});
