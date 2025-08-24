import { parseFile } from "music-metadata";
import fs from "fs";
import path from "path";
import { musicFilesPath, INDEX_PATH } from "../config/backendPaths.ts";
import type { MusicIndexEntry } from "@/lib/types/MusicIndexEntry";

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

  const albumCovers: Record<string, string> = {};
  for (const filePath of newFiles) {
    const ext = path.extname(filePath).toLowerCase();
    if (imageExtensions.includes(ext)) {
      const parts = filePath.split(path.sep);
      const artist = parts[0];
      const album = parts[1];
      if (artist && album) {
        albumCovers[`${artist}/${album}`] = filePath;
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
    let duration = null;
    const img = albumCovers[`${artist}/${album}`] || null;

    try {
      const metadata = await parseFile(path.join(musicFilesPath, filePath));
      title = metadata.common.title || fileName;
      duration = metadata.format.duration || duration;
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
