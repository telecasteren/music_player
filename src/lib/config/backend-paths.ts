import path from "path";

export const musicFilesPath = path.join(
  process.cwd(),
  "backend-data/music/user_uploads"
);

export const INDEX_PATH = path.join(
  process.cwd(),
  "backend-data/music/metadata/userMusicIndex.json"
);
