/**
 * Capa de acceso a contenido.
 *
 * Etapa 1 (ahora): datos locales en src/data.
 * Etapa 2: WordPress headless. Cambiar CMS_SOURCE=wordpress en .env y
 * completar los mapeos de fetchWp* con los custom post types / ACF del WP.
 *
 * Todas las páginas consumen SOLO estas funciones, así el cambio de fuente
 * no toca ningún componente.
 */
import { services as localServices, type Service } from '@/data/services';
import { projects as localProjects, type Project } from '@/data/projects';
import { team as localTeam, type Member } from '@/data/team';

const SOURCE = import.meta.env.CMS_SOURCE ?? 'local';
const WP_API = import.meta.env.WP_API_URL ?? '';

async function wpGet<T>(path: string): Promise<T> {
  const res = await fetch(`${WP_API}${path}`);
  if (!res.ok) throw new Error(`WP API ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

// --- Mapeos WP -> modelos del sitio (ajustar cuando exista el WP) ---
type WpPost = {
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  acf?: Record<string, any>;
};

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, '').trim();
}

function mapWpService(p: WpPost): Service {
  return {
    slug: p.slug,
    title: stripHtml(p.title.rendered),
    excerpt: stripHtml(p.excerpt.rendered),
    description: stripHtml(p.content.rendered).split(/\n{2,}/).filter(Boolean),
    features: p.acf?.features ?? [],
    icon: p.acf?.icon ?? 'pipe',
    featured: Boolean(p.acf?.featured),
    image: p.acf?.image ?? '',
    gallery: p.acf?.gallery ?? [],
  };
}

// --- API pública ---
export async function getServices(): Promise<Service[]> {
  if (SOURCE === 'wordpress') {
    const posts = await wpGet<WpPost[]>('/servicio?per_page=100&_fields=slug,title,excerpt,content,acf');
    return posts.map(mapWpService);
  }
  return localServices;
}

export async function getService(slug: string): Promise<Service | undefined> {
  return (await getServices()).find((s) => s.slug === slug);
}

export async function getFeaturedServices(limit = 3): Promise<Service[]> {
  const all = await getServices();
  const featured = all.filter((s) => s.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

export async function getProjects(): Promise<Project[]> {
  // TODO etapa 2: wpGet('/proyecto?...') y mapear
  return localProjects;
}

export async function getTeam(): Promise<Member[]> {
  // TODO etapa 2: wpGet('/equipo?...') o ACF options page
  return localTeam;
}
