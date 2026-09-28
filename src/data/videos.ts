export interface VideoItem {
  id: string;
  title: string;
  caption: string;
  /** 'youtube' usa el id de YouTube; 'file' usa un mp4 en /videos/ */
  type: 'youtube' | 'file';
  src: string;
  poster: string;
  /** Formato del video: horizontal (16:9) o vertical (9:16, grabado con celular) */
  orientation: 'landscape' | 'portrait';
  /** Duración en segundos (se usa en la tarjeta y en el schema VideoObject) */
  duration?: number;
  /** Se muestra en la sección de videos del inicio */
  featured?: boolean;
  /** Fecha de grabación/publicación (ISO) para schema VideoObject */
  uploadDate?: string;
}

export const videos: VideoItem[] = [
  {
    id: 'institucional',
    title: 'WPS en obra',
    caption: 'Montaje industrial de pipelines y estaciones',
    type: 'youtube',
    src: 'UJ9BzmSAxgA',
    poster: '/videos/yt-poster.jpg',
    orientation: 'landscape',
    featured: true,
  },
  {
    id: 'terreno',
    title: 'Equipos y faena en terreno',
    caption: 'Flota y equipamiento WPS trabajando en faena',
    type: 'file',
    src: '/videos/wps-terreno.mp4',
    poster: '/videos/wps-terreno-poster.jpg',
    orientation: 'landscape',
    featured: true,
  },
  // ── Videos de faena enviados por el cliente (sep. 2026) ──
  { id: 'obra-04', title: 'Camiones y equipos en la línea', caption: 'Recorrido por la faena: camiones tie-in, zanja y cuadrillas', type: 'file', src: '/videos/obra/obra-04.mp4', poster: '/videos/obra/obra-04.webp', orientation: 'portrait', duration: 114, featured: true, uploadDate: '2026-09-27' },
  { id: 'obra-01', title: 'Camión de soldadura en faena', caption: 'Unión soldada, maniobra de izaje y camión tie-in con motosoldadora', type: 'file', src: '/videos/obra/obra-01.mp4', poster: '/videos/obra/obra-01.webp', orientation: 'portrait', duration: 74, featured: true, uploadDate: '2026-09-27' },
  { id: 'obra-03', title: 'Soldadura manual en pipeline', caption: 'Soldadores trabajando en pareja sobre la unión de tubería', type: 'file', src: '/videos/obra/obra-03.mp4', poster: '/videos/obra/obra-03.webp', orientation: 'portrait', duration: 67, featured: true, uploadDate: '2026-09-27' },
  { id: 'obra-05', title: 'Tendido de tubería', caption: 'Bajada de la línea a zanja con equipos de izaje', type: 'file', src: '/videos/obra/obra-05.mp4', poster: '/videos/obra/obra-05.webp', orientation: 'portrait', duration: 65, featured: true, uploadDate: '2026-09-27' },
  { id: 'obra-07', title: 'Cuadrilla de soldadura en línea', caption: 'Avance del frente de soldadura junto a grúas de tendido', type: 'file', src: '/videos/obra/obra-07.mp4', poster: '/videos/obra/obra-07.webp', orientation: 'portrait', duration: 33, featured: true, uploadDate: '2026-09-28' },
  { id: 'obra-08', title: 'Pasadas de relleno y presentación', caption: 'Soldadores completando uniones de la línea en terreno', type: 'file', src: '/videos/obra/obra-08.mp4', poster: '/videos/obra/obra-08.webp', orientation: 'portrait', duration: 56, featured: true, uploadDate: '2026-09-28' },
  { id: 'obra-02', title: 'Soldadura con clamp de alineación', caption: 'Pase de raíz en junta alineada con clamp', type: 'file', src: '/videos/obra/obra-02.mp4', poster: '/videos/obra/obra-02.webp', orientation: 'portrait', duration: 69, uploadDate: '2026-09-27' },
  { id: 'obra-06', title: 'Alineación y preparación de juntas', caption: 'Cuadrilla preparando uniones antes de soldar', type: 'file', src: '/videos/obra/obra-06.mp4', poster: '/videos/obra/obra-06.webp', orientation: 'portrait', duration: 62, uploadDate: '2026-09-28' },
];
