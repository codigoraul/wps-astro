export interface Service {
  slug: string;
  title: string;
  shortTitle?: string;
  excerpt: string;
  description: string[];
  features: string[];
  icon: 'weld' | 'pipe' | 'pressure' | 'shield' | 'coating' | 'tank' | 'fitting' | 'truck';
  featured?: boolean;
  image: string;
  gallery: string[];
}

export const services: Service[] = [
  {
    slug: 'arriendo-equipos-soldadura-pipelines',
    image: '/images/flota/flota-1.jpg',
    gallery: ['/images/flota/flota-1.jpg', '/images/flota/flota-4.jpg', '/images/galeria/faena-03.webp', '/images/flota/flota-5.jpg', '/images/galeria/faena-04.webp', '/images/flota/flota-2.jpg', '/images/flota/flota-6.jpg', '/images/flota/flota-3.jpg'],
    title: 'Arriendo de Equipos de Soldadura para Pipelines',
    shortTitle: 'Arriendo de Equipos de Soldadura',
    excerpt:
      'Equipos propios de soldadura para pipelines, listos para faena remota: camiones tie-in equipados con motosoldadoras Lincoln Electric.',
    description: [
      'Arrendamos equipos propios de soldadura para pipelines, listos para operar en faenas remotas. Nuestros camiones tie-in están equipados con motosoldadoras Lincoln Electric para pipelines, certificados por la marca y acreditados en minería.',
      'Hemos provisto equipos para acueductos de agua de proceso y de agua recuperada, y para la soldadura de estaciones, en faenas como Minera Salvador, Minera Mantos Blancos y Minera Escondida.',
    ],
    features: [
      'Camiones tie-in equipados para faena',
      'Motosoldadoras Lincoln Electric para pipelines',
      'Equipos certificados por la marca',
      'Acreditados para operar en minería',
      'Listos para faena remota',
    ],
    icon: 'truck',
    featured: true,
  },
  {
    slug: 'soldadura-pipelines',
    image: '/images/servicios/soldadura-1.jpg',
    gallery: ['/images/servicios/soldadura-1.jpg', '/images/servicios/soldadura-2.jpg', '/images/servicios/soldadura-3.jpg', '/images/servicios/soldadura-4.jpg'],
    title: 'Soldadura de Pipelines',
    excerpt:
      'Proceso normalizado bajo códigos API y ASME, crucial en la industria. Soldadura de pipelines y piping con tecnología Lincoln Electric.',
    description: [
      'La soldadura de pipelines y piping es un proceso normalizado (códigos API 1104 – ASME IX / B31.3 / B31.4) y crucial en la industria de transporte de fluidos. Cada junta es ejecutada por soldadores calificados bajo procedimientos WPS/PQR aprobados y controlada mediante ensayos no destructivos.',
      'Contamos con equipos de soldadura Lincoln Electric de última generación, lo que nos permite trabajar en zonas remotas y bajo condiciones climáticas complejas manteniendo productividad y calidad.',
    ],
    features: [
      'Procedimientos WPS/PQR calificados',
      'Soldadores certificados API 1104 y ASME IX',
      'Ensayos no destructivos (RT, UT, PT)',
      'Soldadura automática y semiautomática',
      'Trazabilidad completa de juntas',
    ],
    icon: 'weld',
    featured: true,
  },
  {
    slug: 'piping-y-estaciones-de-bombeo',
    image: '/images/servicios/piping-1.jpg',
    gallery: ['/images/servicios/piping-1.jpg', '/images/servicios/piping-2.jpg', '/images/servicios/piping-3.jpg', '/images/servicios/piping-4.jpg'],
    title: 'Piping y Estaciones de Bombeo',
    excerpt:
      'Elementos fundamentales en la infraestructura de transporte de fluidos: prefabricación, montaje y puesta en marcha.',
    description: [
      'El piping y las estaciones de bombeo son elementos fundamentales en la infraestructura de transporte de fluidos para minería, energía y plantas desaladoras. Ejecutamos la prefabricación, el montaje mecánico y la puesta en marcha de líneas y estaciones booster.',
      'Nuestro equipo ha participado en estaciones de bombeo de los principales proyectos de Chile y Perú, integrando piping, equipos rotatorios, válvulas e instrumentación bajo un mismo estándar de calidad.',
    ],
    features: [
      'Prefabricación de spools en taller y terreno',
      'Montaje de estaciones booster',
      'Alineamiento y montaje de equipos rotatorios',
      'Integración de válvulas e instrumentación',
      'Pre-comisionamiento y puesta en marcha',
    ],
    icon: 'pipe',
    featured: true,
  },
  {
    slug: 'diques-de-poliuretano-para-los-pipelines',
    image: '/images/servicios/diques-1.jpg',
    gallery: ['/images/servicios/diques-1.jpg', '/images/servicios/diques-2.jpg', '/images/servicios/diques-3.jpg'],
    title: 'Diques de Poliuretano para Pipelines',
    shortTitle: 'Diques de Poliuretano',
    excerpt:
      'Protección y contención para pipelines en terreno mediante diques de poliuretano de alta durabilidad.',
    description: [
      'Los diques de poliuretano son soluciones de contención y protección instaladas a lo largo de pipelines enterrados o en superficie, evitando el desplazamiento del relleno y protegiendo la tubería.',
      'Instalamos los diques con equipos propios, controlando su ubicación y calidad en tramos de pendiente y zonas de relleno exigentes.',
    ],
    features: [
      'Diques de poliuretano en zanja',
      'Contención del relleno en tramos de pendiente',
      'Aplicación en terreno con equipos propios',
      'Inspección y control de calidad',
    ],
    icon: 'shield',
  },
  {
    slug: 'montaje-y-soldadura-de-estanques',
    image: '/images/servicios/estanques-1.jpg',
    gallery: ['/images/servicios/estanques-1.jpg', '/images/servicios/estanques-2.jpg', '/images/servicios/estanques-3.jpg', '/images/servicios/estanques-4.jpg'],
    title: 'Montaje y Soldadura de Estanques',
    excerpt:
      'Fabricación, montaje y soldadura de estanques de almacenamiento bajo API 650 y normas asociadas.',
    description: [
      'Realizamos el montaje y soldadura de estanques de almacenamiento para agua, relaves, combustibles y reactivos, siguiendo API 650 y las especificaciones del cliente.',
      'Desde el fondo hasta el techo, controlamos verticalidad, redondez y soldaduras con ensayos no destructivos, entregando estanques listos para prueba y operación.',
    ],
    features: [
      'Montaje de estanques API 650',
      'Soldadura de fondo, manto y techo',
      'Ensayos de vacío y líquidos penetrantes',
      'Pruebas de llenado y asentamiento',
    ],
    icon: 'tank',
  },
  {
    slug: 'pigs-plugs-fitting-y-piezas-especiales',
    image: '/images/servicios/pigs-1.jpg',
    gallery: ['/images/servicios/pigs-1.jpg', '/images/servicios/pigs-2.jpg'],
    title: "PIG's, PLUG's, Fittings y Piezas Especiales",
    shortTitle: 'Fittings y Piezas Especiales',
    excerpt:
      'Suministro e importación de PIG’s, PLUG’s, fittings y piezas especiales para pipelines y piping.',
    description: [
      'Suministramos e importamos PIG’s de limpieza y calibración, PLUG’s de prueba, fittings y piezas especiales para pipelines y sistemas de piping, con asesoría técnica en la selección.',
      'Nuestra área de importaciones y venta de piezas especiales acorta los tiempos de abastecimiento de los proyectos, integrando el suministro con la ejecución en terreno.',
    ],
    features: [
      'PIG’s de limpieza, calibración e inspección',
      'PLUG’s y accesorios para pruebas',
      'Fittings, bridas y piezas especiales',
      'Asesoría técnica e importación directa',
    ],
    icon: 'fitting',
  },
];
