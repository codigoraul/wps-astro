export interface Slide { image: string; eyebrow: string; title: string; text: string; align: 'left' | 'center'; href: string; cta: string; }
// Mismos 3 slides que el slider actual de wps.cl (Slider Revolution)
export const slides: Slide[] = [
  {
    image: '/images/slider/slide-1.jpg',
    eyebrow: 'WPS Welding & Pipelines',
    title: 'Soldadura, Montaje e Inspección de Tuberías y Equipos de Bombeo',
    text: 'WPS es un apoyo y servicio integral durante la ejecución de proyectos, tanto desde el punto de vista documental como selección de equipos de trabajo y su posterior ejecución y pruebas finales.',
    align: 'left',
    href: '/servicios/',
    cta: 'Ver servicios',
  },
  {
    image: '/images/slider/slide-2.jpg',
    eyebrow: 'Certificación de soldaduras',
    title: 'Servicios de Piping y Estaciones de Bombeo',
    text: 'Asesorías para calificación y certificado de soldadores, cursos de soldadura.',
    align: 'center',
    href: '/servicios/piping-y-estaciones-de-bombeo/',
    cta: 'Ver servicio',
  },
  {
    image: '/images/slider/slide-3.jpg',
    eyebrow: 'Nuestros servicios',
    title: 'Diques de Poliuretano para Pipelines',
    text: 'El poliuretano es un polímero que se caracteriza por su durabilidad, flexibilidad y resistencia química.',
    align: 'center',
    href: '/servicios/diques-de-poliuretano-para-los-pipelines/',
    cta: 'Ver servicio',
  },
];
