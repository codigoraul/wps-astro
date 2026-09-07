export interface Service {
  slug: string;
  title: string;
  shortTitle?: string;
  excerpt: string;
  description: string[];
  features: string[];
  icon: 'weld' | 'pipe' | 'pressure' | 'shield' | 'coating' | 'tank' | 'fitting';
  featured?: boolean;
  image: string;
  gallery: string[];
}

export const services: Service[] = [
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
    slug: 'pruebas-hidroestaticas',
    image: '/images/servicios/pruebas-1.jpg',
    gallery: ['/images/servicios/pruebas-1.jpg', '/images/servicios/pruebas-2.jpg', '/images/servicios/pruebas-3.jpg'],
    title: 'Pruebas Hidrostáticas',
    excerpt:
      'Evaluación de resistencia e integridad de equipos y sistemas que trabajan a presión, con registro y certificación.',
    description: [
      'Las pruebas hidrostáticas evalúan la resistencia y la integridad de equipos y sistemas que operan a presión. Son el paso obligatorio antes de la puesta en servicio de cualquier pipeline o sistema de piping.',
      'Ejecutamos llenado, presurización, estabilización, registro de presión y temperatura, y vaciado controlado, entregando un dossier de calidad completo para la aprobación del cliente.',
    ],
    features: [
      'Diseño del plan de prueba por tramos',
      'Registro continuo con manómetros y registradores calibrados',
      'Gestión del agua de prueba y su disposición',
      'Dossier de calidad y certificados',
    ],
    icon: 'pressure',
    featured: true,
  },
  {
    slug: 'diques-de-poliuretano-para-los-pipelines',
    image: '/images/servicios/diques-1.jpg',
    gallery: ['/images/servicios/diques-1.jpg', '/images/servicios/diques-2.jpg', '/images/servicios/diques-3.jpg'],
    title: 'Diques de Poliuretano y Revestimientos para Pipeline',
    shortTitle: 'Diques de Poliuretano',
    excerpt:
      'Protección y contención para pipelines en terreno: diques de poliuretano y revestimientos de alta durabilidad.',
    description: [
      'Los diques de poliuretano son soluciones de contención y protección instaladas a lo largo de pipelines enterrados o en superficie, evitando el desplazamiento del relleno y protegiendo el revestimiento de la tubería.',
      'Combinamos la instalación de diques con revestimientos de protección anticorrosiva para maximizar la vida útil del pipeline en condiciones de terreno exigentes.',
    ],
    features: [
      'Diques de poliuretano en zanja',
      'Protección de revestimiento en tramos de pendiente',
      'Aplicación en terreno con equipos propios',
      'Inspección y control de calidad',
    ],
    icon: 'shield',
  },
  {
    slug: 'revestimientos-de-tuberia',
    image: '/images/servicios/revestimiento-1.jpg',
    gallery: ['/images/servicios/revestimiento-1.jpg', '/images/servicios/revestimiento-2.jpg', '/images/servicios/revestimiento-3.jpg', '/images/servicios/revestimiento-4.jpg'],
    title: 'Revestimientos de Tubería',
    excerpt:
      'Revestimientos anticorrosivos y de protección mecánica para tuberías, en taller y en terreno.',
    description: [
      'Aplicamos revestimientos anticorrosivos y de protección mecánica para tuberías de acero, tanto en juntas de soldadura en terreno como en tramos completos.',
      'Trabajamos con sistemas de mangas termocontraíbles, epóxicos líquidos y cintas de protección según especificación del proyecto.',
    ],
    features: [
      'Revestimiento de juntas en terreno',
      'Mangas termocontraíbles y epóxicos',
      'Preparación de superficie según SSPC / NACE',
      'Control de espesores y holiday detector',
    ],
    icon: 'coating',
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
