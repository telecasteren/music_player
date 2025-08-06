export type Artist = {
  id: number;
  name: string;
  album: {
    name: string;
    img: {
      src: string;
      alt: string;
    };
    releaseYear: string;
  };
};
