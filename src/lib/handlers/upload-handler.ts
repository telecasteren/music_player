import { parseFile } from "music-metadata";
import fs from "fs";
import path from "path";
import { musicFilesPath, INDEX_PATH } from "../config/backend-paths.ts";
import type { MusicIndexEntry } from "@/lib/types/music-index-entry.ts";

export async function updateMusicIndex(newFiles: string[]) {
  let index: MusicIndexEntry[] = [];

  if (fs.existsSync(INDEX_PATH)) {
    index = JSON.parse(fs.readFileSync(INDEX_PATH, "utf-8"));
  }

  const audioExtensions = [
    ".mp3",
    ".m4a",
    ".wav",
    ".flac",
    ".aac",
    ".ogg",
    ".aiff",
    ".alac",
  ];
  const imageExtensions = [".jpg", ".jpeg", ".png", ".webp"];

  const albumFolders = new Set<string>();
  for (const filePath of newFiles) {
    const ext = path.extname(filePath).toLowerCase();
    if (audioExtensions.includes(ext)) {
      const albumFolder = path.dirname(filePath);
      albumFolders.add(albumFolder);
    }
  }

  const albumCovers: Record<string, string> = {};
  for (const filePath of newFiles) {
    const ext = path.extname(filePath).toLowerCase();
    if (imageExtensions.includes(ext)) {
      for (const albumFolder of albumFolders) {
        if (filePath.startsWith(albumFolder + path.sep)) {
          if (!albumCovers[albumFolder]) {
            albumCovers[albumFolder] = filePath;
          }
        }
      }
    }
  }

  for (const filePath of newFiles) {
    const ext = path.extname(filePath).toLowerCase();
    if (!audioExtensions.includes(ext)) {
      continue;
    }

    const parts = filePath.split(path.sep);
    const artist = parts[0];
    const album = parts[1];
    const fileName = parts[2];

    let title = fileName;
    let duration: number = 0;
    const albumFolder = path.dirname(filePath);
    const img = albumCovers[albumFolder] || "src/assets/proxy-image.png";

    try {
      const metadata = await parseFile(path.join(musicFilesPath, filePath));
      title = metadata.common.title || fileName;
      duration =
        typeof metadata.format.duration === "number" &&
        !isNaN(metadata.format.duration)
          ? metadata.format.duration
          : 0;
    } catch (error) {
      console.error("Error when parsing file:", filePath, error);
    }

    if (!index.some((entry) => entry.path === filePath)) {
      index.push({
        artist,
        album,
        fileName,
        path: filePath,
        title,
        duration,
        img,
      });
    }
  }

  fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2));
}
