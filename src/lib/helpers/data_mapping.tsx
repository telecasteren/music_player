import artists from "@/lib/data/artists-data.ts";
import { BASE_URL } from "../config/frontend-paths.ts";
import type { Track } from "@/lib/types/artists-entry.ts";
// import type { Artist } from "@/lib/types/artistsEntry";

// Used to play tracks with AudioPlayer
// export async function getTracks() {
//   const res = await fetch("http://localhost:4000/api/artists");
//   const data = await res.json();
//   if (data.artists) {
//     const artists: Artist[] = data.artists;
//     return artists.flatMap((artist) =>
//       artist.albums.flatMap((album) =>
//         album.tracks.map(
//           (track) => `${BASE_URL}${encodeURIComponent(track.path)}`
//         )
//       )
//     );
//   }
//   return [];
// }

// Used to create track URL for playback
export const createTrackUrl = (trackPath: string): string => {
  return `${BASE_URL}${encodeURIComponent(trackPath)}`;
};
// Used to enhance single track for AudioPlayer
export const enhanceTrack = (track: Track): Track => ({
  ...track,
  url: track.url || createTrackUrl(track.path),
});
// Used to enhance album tracks for AudioPlayer
export const enhanceTracks = (tracks: Track[]): Track[] => {
  return tracks.map(enhanceTrack);
};

// Used to display album information per artist
export const albumInfo = artists.map((artist) => ({
  artistName: artist.name,
  albums: artist.albums.map((album) => ({
    imgSrc: album.img.src,
    imgAlt: album.img.alt,
    albumTitle: album.name,
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
    numberOfTracks: album.tracks.length,
  }))
);
