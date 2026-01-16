// import type { Artist } from "@/lib/types/artists";

// export default function mergeArtists(
//   existing: Artist[],
//   incoming: Artist[]
// ): Artist[] {
//   const merged = [...existing];

//   incoming.forEach((newArtist) => {
//     const existingArtist = merged.find((a) => a.name === newArtist.name);

//     if (existingArtist) {
//       newArtist.albums.forEach((newAlbum) => {
//         const existingAlbum = existingArtist.albums.find(
//           (a) => a.name === newAlbum.name
//         );

//         if (existingAlbum) {
//           existingAlbum.img = newAlbum.img?.src
//             ? newAlbum.img
//             : existingAlbum.img;
//           existingAlbum.releaseYear =
//             newAlbum.releaseYear ?? existingAlbum.releaseYear;

//           newAlbum.tracks.forEach((track) => {
//             if (!existingAlbum.tracks.some((t) => t.path === track.path)) {
//               existingAlbum.tracks.push(track);
//             }
//           });
//         } else {
//           existingArtist.albums.push(newAlbum);
//         }
//       });
//     } else {
//       merged.push(newArtist);
//     }
//   });
//   return merged;
// }
