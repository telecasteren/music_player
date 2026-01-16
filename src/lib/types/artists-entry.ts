export type Track = {
  name: string;
  path: string;
  duration: number;
  artist?: string;
  album?: string;
  albumImage?: { src: string; alt: string };
  url?: string;
};
export type Album = {
  name: string;
  img: { src: string; alt: string };
  tracks: Track[];
};
export type Artist = { name: string; albums: Album[] };
