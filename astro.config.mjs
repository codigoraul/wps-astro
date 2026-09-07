import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://wps.cl',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
  // URLs del sitio WordPress anterior -> nuevas rutas (SEO)
  redirects: {
    '/nuestros-proyectos/': '/proyectos/',
    '/soldadura-pipelines/': '/servicios/soldadura-pipelines/',
    '/piping-y-estaciones-de-bombeo/': '/servicios/piping-y-estaciones-de-bombeo/',
    '/pruebas-hidroestaticas/': '/servicios/pruebas-hidroestaticas/',
    '/diques-de-poliuretano-para-los-pipelines/': '/servicios/diques-de-poliuretano-para-los-pipelines/',
    '/revestimiento-de-tuberias/': '/servicios/revestimientos-de-tuberia/',
    '/element/montaje-y-soldadura-de-estanques/': '/servicios/montaje-y-soldadura-de-estanques/',
    '/element/pigs-plugs-fitting-y-piezas-especiales/': '/servicios/pigs-plugs-fitting-y-piezas-especiales/',
  },
});
