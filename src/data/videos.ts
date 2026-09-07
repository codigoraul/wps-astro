export interface VideoItem {
  id: string;
  title: string;
  caption: string;
  /** 'youtube' usa el id de YouTube; 'file' usa un mp4 en /videos/ */
  type: 'youtube' | 'file';
  src: string;
  poster: string;
}

export const videos: VideoItem[] = [
  {
    id: 'institucional',
    title: 'WPS en obra',
    caption: 'Montaje industrial de pipelines y estaciones',
    type: 'youtube',
    src: 'UJ9BzmSAxgA',
    poster: '/videos/yt-poster.jpg',
  },
  {
    id: 'terreno',
    title: 'Equipos y faena en terreno',
    caption: 'Flota y equipamiento WPS trabajando en faena',
    type: 'file',
    src: '/videos/wps-terreno.mp4',
    poster: '/videos/wps-terreno-poster.jpg',
  },
];
