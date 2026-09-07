export interface Project {
  slug: string;
  title: string;
  client: string;
  location: string;
  category: string;
  summary: string;
  scope: string[];
  image: string;
}
// Contenido de referencia. Reemplazar con proyectos reales de WPS (o traer desde WordPress en la etapa 2).
export const projects: Project[] = [
  {
    slug: 'pipeline-planta-desaladora',
    title: 'Pipeline de impulsión para planta desaladora',
    client: 'Minería · Cliente confidencial',
    location: 'Región de Antofagasta, Chile',
    category: 'Pipelines',
    summary: 'Soldadura, bajada y revestimiento de juntas de pipeline de agua desalada en zona desértica de altura.',
    scope: ['Soldadura API 1104', 'Revestimiento de juntas', 'Pruebas hidrostáticas por tramos'],
    image: '/images/servicios/diques-1.jpg',
  },
  {
    slug: 'estacion-booster-relaves',
    title: 'Estación booster para transporte de relaves',
    client: 'Minería · Cliente confidencial',
    location: 'Región de O’Higgins, Chile',
    category: 'Estaciones de bombeo',
    summary: 'Montaje mecánico de piping, equipos rotatorios e integración de válvulas en estación booster.',
    scope: ['Prefabricación de spools', 'Montaje de bombas', 'Pre-comisionamiento'],
    image: '/images/servicios/piping-3.jpg',
  },
  {
    slug: 'estanques-agua-proceso',
    title: 'Estanques de agua de proceso',
    client: 'Energía · Cliente confidencial',
    location: 'Perú',
    category: 'Estanques',
    summary: 'Montaje y soldadura de estanques API 650 para agua de proceso, con pruebas de llenado.',
    scope: ['Montaje API 650', 'Ensayos no destructivos', 'Prueba de llenado'],
    image: '/images/servicios/estanques-1.jpg',
  },
];
