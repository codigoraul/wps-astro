/**
 * Antepone el `base` configurado en astro.config.mjs (ej. '/prueba/') a una ruta
 * absoluta de public/ o a un link interno, sin importar cuán anidada esté la
 * página que lo usa. Usar SIEMPRE en vez de escribir "/images/..." o "/servicios/..."
 * a mano — eso se rompe apenas el sitio se sube a una subcarpeta.
 *
 * withBase('/images/logo.svg') -> '/images/logo.svg' (base '/')
 *                               -> '/prueba/images/logo.svg' (base '/prueba/')
 */
export const withBase = (path: string): string => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
};
