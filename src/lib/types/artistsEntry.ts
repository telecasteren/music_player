export type Track = { name: string; path: string };
export type Album = {
  name: string;
  img: { src: string; alt: string };
  tracks: Track[];
};
export type Artist = { name: string; albums: Album[] };
