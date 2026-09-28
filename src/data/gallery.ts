export interface GalleryPhoto {
  src: string;
  /** Versión liviana para la grilla (opcional) */
  thumb?: string;
  alt: string;
  width: number;
  height: number;
}

export const galleryPhotos: GalleryPhoto[] = [
  { src: '/images/galeria/faena-01.webp', thumb: '/images/galeria/faena-01-sm.webp', alt: 'Cuadrilla WPS soldando una unión de pipeline dentro de la zanja', width: 1200, height: 1600 },
  { src: '/images/equipo-terreno.webp', alt: 'Equipo de supervisión de WPS en una faena minera', width: 1024, height: 768 },
  { src: '/images/galeria/faena-02.webp', thumb: '/images/galeria/faena-02-sm.webp', alt: 'Soldadores trabajando sobre la línea de tubería en terreno', width: 1200, height: 1600 },
  { src: '/images/flota/flota-1.jpg', alt: 'Equipo WPS en faena de pipeline', width: 1200, height: 1600 },
  { src: '/images/galeria/faena-03.webp', thumb: '/images/galeria/faena-03-sm.webp', alt: 'Máquina de soldar montada en camión de soldadura', width: 1200, height: 1600 },
  { src: '/images/flota/flota-4.jpg', alt: 'Camión equipado WPS', width: 1600, height: 900 },
  { src: '/images/galeria/faena-04.webp', thumb: '/images/galeria/faena-04-sm.webp', alt: 'Panel y conexiones de equipo de soldadura en terreno', width: 1200, height: 1600 },
  { src: '/images/flota/flota-5.jpg', alt: 'Equipamiento de soldadura montado en camión', width: 1600, height: 900 },
  { src: '/images/flota/flota-2.jpg', alt: 'Flota de camiones WPS', width: 1600, height: 900 },
  { src: '/images/flota/flota-3.jpg', alt: 'Camiones y equipos WPS en faena', width: 1600, height: 900 },
  { src: '/images/flota/flota-6.jpg', alt: 'Camión WPS con equipos de terreno', width: 1600, height: 900 },
];
