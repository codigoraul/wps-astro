import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://wps.cl',
  base: '/',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
  // Redirecciones 301 de las URLs del WordPress anterior: ver public/.htaccess
});
