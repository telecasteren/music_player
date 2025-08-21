import artists from "@/lib/data/artistsData";

export const tracks = artists.flatMap((artist) =>
  artist.albums.flatMap((album) =>
    Object.values(album.tracks).map((track) => track.path)
  )
);

// Used to display album information per artist
export const albumInfo = artists.map((artist) => ({
  artistName: artist.name,
  albums: artist.albums.map((album) => ({
    imgSrc: album.img.src,
    imgAlt: album.img.alt,
    albumTitle: album.name,
    releaseYear: album.releaseYear,
    numberOfTracks: album.tracks.length,
  })),
}));

// Used in the sidebar to display list of albums
export const albumsList = artists.flatMap((artist) =>
  artist.albums.map((album) => ({
    artistName: artist.name,
    imgSrc: album.img.src,
    imgAlt: album.img.alt,
    albumTitle: album.name,
    releaseYear: album.releaseYear,
    numberOfTracks: album.tracks.length,
  }))
);
