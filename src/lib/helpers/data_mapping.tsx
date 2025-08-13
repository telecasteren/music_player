import data from "@/lib/data/sampleData";

export const tracks = data.artists.flatMap((artist) =>
  artist.albums.flatMap((album) =>
    Object.values(album.songs).map((song) => song.src)
  )
);

// Used to display album information per artist
export const albumInfo = data.artists.map((artist) => ({
  artistName: artist.name,
  albums: artist.albums.map((album) => ({
    imgSrc: album.img.src,
    imgAlt: album.img.alt,
    albumTitle: album.title,
    releaseYear: album.releaseYear,
    numberOfSongs: album.songs.length,
  })),
}));

// Used in the sidebar to display list of albums
export const albumsList = data.artists.flatMap((artist) =>
  artist.albums.map((album) => ({
    artistName: artist.name,
    imgSrc: album.img.src,
    imgAlt: album.img.alt,
    albumTitle: album.title,
    releaseYear: album.releaseYear,
    numberOfSongs: album.songs.length,
  }))
);
