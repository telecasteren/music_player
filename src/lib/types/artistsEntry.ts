export type Song = { name: string; path: string };
export type Album = { name: string; songs: Song[] };
export type Artist = { name: string; albums: Album[] };
