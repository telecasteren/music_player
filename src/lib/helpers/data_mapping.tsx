import artists from "@/lib/data/artistsData";
import { BASE_URL } from "../config/frontendPaths.ts";
import type { Artist } from "@/lib/types/artistsEntry.ts";

// Used to play tracks with AudioPlayer
export async function getTracks() {
  const res = await fetch("http://localhost:4000/api/artists");
  const data = await res.json();
  if (data.artists) {
    const artists: Artist[] = data.artists;
    return artists.flatMap((artist) =>
      artist.albums.flatMap((album) =>
        album.songs.map((song) => `${BASE_URL}${encodeURIComponent(song.path)}`)
      )
    );
  }
  return [];
}

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
