export type Track = {
  title: string;
  path: string;
};

export type Album = {
  name: string;
  img?: {
    src: string;
    alt: string;
  };
  releaseYear?: string;
  tracks: Track[];
};

export type Artist = {
  id: number;
  name: string;
  albums: Album[];
};
