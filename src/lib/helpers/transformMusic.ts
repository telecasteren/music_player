import type { Folder, MusicFile } from "@/lib/data/types/uploader";
import type { Artist } from "@/lib/data/types/artists";

export function folderToArtists(folders: Folder[]): Artist[] {
  let idCount = 1;

  return folders.map((artistFolder) => {
    const artist: Artist = {
      id: idCount++,
      name: artistFolder.name,
      albums: artistFolder.children
        .filter((child): child is Folder => "children" in child)
        .map((albumFolder) => ({
          name: albumFolder.name,
          img: undefined,
          releaseYear: undefined,
          tracks: albumFolder.children
            .filter((child): child is MusicFile => "file" in child)
            .map((file) => ({
              title: file.name.replace(/\.[^/.]+$/, ""),
              path: file.path,
            })),
        })),
    };
    return artist;
  });
}
