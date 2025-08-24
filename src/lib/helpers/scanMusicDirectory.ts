import fs from "fs";
import path from "path";
import { musicFilesPath } from "../config/backendPaths.ts";
import type { Album, Artist } from "@/lib/types/artistsEntry.ts";

export function scanMusicDirectory(dirPath: string): Artist[] {
  const result: Artist[] = [];
  const artists = fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory());
  for (const artistDir of artists) {
    const artistPath = path.join(dirPath, artistDir.name);
    const albums = fs
      .readdirSync(artistPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory());
    const artistObj: Artist = { name: artistDir.name, albums: [] };
    for (const albumDir of albums) {
      const albumPath = path.join(artistPath, albumDir.name);
      const files = fs
        .readdirSync(albumPath, { withFileTypes: true })
        .filter(
          (dirent) =>
            dirent.isFile() && /\.(mp3|m4a|wav|flac|aac)$/i.test(dirent.name)
        );
      const albumObj: Album = {
        name: albumDir.name,
        songs: files.map((f) => ({
          name: f.name,
          path: path.relative(musicFilesPath, path.join(albumPath, f.name)),
        })),
      };
      artistObj.albums.push(albumObj);
    }
    result.push(artistObj);
  }
  return result;
}
