import { parseFile } from "music-metadata";
import fs from "fs";
import path from "path";
import { musicFilesPath } from "../config/backendPaths.ts";
import type { MusicIndexEntry } from "@/lib/types/MusicIndexEntry";

const INDEX_PATH = path.join(
  process.cwd(),
  "backend-data/musicFiles/metadata/userMusicIndex.json"
);

export async function updateMusicIndex(newFiles: string[]) {
  let index: MusicIndexEntry[] = [];

  if (fs.existsSync(INDEX_PATH)) {
    index = JSON.parse(fs.readFileSync(INDEX_PATH, "utf-8"));
  }

  for (const filePath of newFiles) {
    const parts = filePath.split(path.sep);
    const artist = parts[0];
    const album = parts[1];
    const fileName = parts[2];

    let title = fileName;
    let duration = null;

    try {
      const metadata = await parseFile(path.join(musicFilesPath, filePath));
      title = metadata.common.title || fileName;
      duration = metadata.format.duration || duration;
    } catch (error) {
      console.error("Error when parsing file:", filePath, error);
    }

    if (!index.some((entry) => entry.path === filePath)) {
      index.push({ artist, album, fileName, path: filePath, title, duration });
    }
  }

  fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2));
}
