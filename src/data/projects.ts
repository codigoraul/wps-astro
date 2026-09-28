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
// Proyectos ejecutados entregados por el cliente (revisión sep. 2026).
export const projects: Project[] = [
  {
    slug: 'acueducto-26-escondida-piedra-roja',
    title: 'Pipeline de agua desalada – Acueducto 26"',
    client: 'Cliente: Baical',
    location: 'Minera Escondida · Tramo 10 km Piedra Roja',
    category: 'Pipeline',
    summary: 'Construcción de pipeline de agua desalada de 26" para Minera Escondida, en un tramo de 10 km en el sector Piedra Roja.',
    scope: ['Acueducto 26"', 'Tramo 10 km', 'Agua desalada'],
    image: '/images/flota/flota-1.jpg',
  },
  {
    slug: 'acueducto-20-centinela-tranque-relaves',
    title: 'Pipeline de agua recuperada – Acueducto 20"',
    client: 'Cliente: AVA Montajes',
    location: 'Minera Centinela · Tramo 9 km Tranque de Relaves PV3',
    category: 'Pipeline',
    summary: 'Construcción de pipeline de agua recuperada de 20" para Minera Centinela, en un tramo de 9 km del tranque de relaves PV3.',
    scope: ['Acueducto 20"', 'Tramo 9 km', 'Agua recuperada'],
    image: '/images/flota/flota-2.jpg',
  },
  {
    slug: 'arriendo-equipos-acueducto-12-salvador',
    title: 'Arriendo de equipos – Acueducto 12"',
    client: 'Cliente: Tecno Fast Construcciones',
    location: 'Minera Salvador · Pipeline de agua de proceso',
    category: 'Arriendo de equipos',
    summary: 'Arriendo de equipos de soldadura para la construcción del pipeline de agua de proceso de 12" de Minera Salvador.',
    scope: ['Acueducto 12"', 'Agua de proceso', 'Motosoldadoras Lincoln'],
    image: '/images/flota/flota-5.jpg',
  },
  {
    slug: 'arriendo-equipos-acueducto-10-mantos-blancos',
    title: 'Arriendo de equipos – Acueducto 10"',
    client: 'Cliente: J & C Ingeniería',
    location: 'Minera Mantos Blancos · Pipeline de agua recuperada',
    category: 'Arriendo de equipos',
    summary: 'Arriendo de equipos de soldadura para la construcción del pipeline de agua recuperada de 10" de Minera Mantos Blancos.',
    scope: ['Acueducto 10"', 'Agua recuperada', 'Camiones tie-in'],
    image: '/images/galeria/faena-03.webp',
  },
  {
    slug: 'arriendo-equipos-estaciones-escondida',
    title: 'Arriendo de equipos – Soldadura de estaciones',
    client: 'Cliente: Constructora El Sauce',
    location: 'Minera Escondida',
    category: 'Arriendo de equipos',
    summary: 'Arriendo de equipos para la soldadura de estaciones en Minera Escondida.',
    scope: ['Soldadura de estaciones', 'Motosoldadoras Lincoln', 'Faena minera'],
    image: '/images/flota/flota-4.jpg',
  },
];
