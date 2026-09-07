# wps-astro — Rediseño de wps.cl

Sitio corporativo de **WPS Welding & Pipelines** (montaje industrial de pipelines) construido en Astro.

## Comandos
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview
```

## Estructura
```
src/
  data/        site.ts (datos empresa/nav), services.ts, team.ts, projects.ts
  lib/cms.ts   ÚNICA puerta de acceso a contenido (local ahora, WordPress después)
  layouts/     Layout.astro (SEO, fuentes, JSON-LD, WhatsApp flotante, reveal)
  components/  Header, Footer, Icon, ServiceCard, CtaBand, PageHero
  pages/       index, nosotros, servicios/index, servicios/[slug], proyectos, contacto, 404
  styles/      global.css (design tokens: navy + naranjo del logo)
```

## Etapa 2 — WordPress headless
1. En el WP crear CPTs `servicio`, `proyecto` (y `equipo` u options page) con ACF (`features`, `icon`, `featured`, etc.).
2. Copiar `.env.example` a `.env`, poner `CMS_SOURCE=wordpress` y `WP_API_URL`.
3. Ajustar los mapeos `mapWp*` en `src/lib/cms.ts`. Las páginas no cambian.
4. Build estático (SSG) con webhook desde WP al hosting para regenerar al publicar.

## Pendientes de contenido
- Fotos reales de obras (hero, nosotros, proyectos) — hoy hay fondos gráficos.
- Proyectos reales en `src/data/projects.ts` (hoy son referenciales).
- Formulario: hoy apunta a FormSubmit (`contacto@wps.cl`); requiere confirmar el email la primera vez o cambiar por el endpoint que uses.
