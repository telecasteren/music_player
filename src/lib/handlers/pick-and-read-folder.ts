import { open } from "@tauri-apps/plugin-dialog";
import { join } from "@tauri-apps/api/path";
import { readDir, readFile, BaseDirectory } from "@tauri-apps/plugin-fs";

async function walk(
  dir: string,
  root: string,
  selectedFolderName: string
): Promise<{ path: string; data: Uint8Array }[]> {
  const entries = await readDir(dir, { baseDir: BaseDirectory.Audio });
  let files: { path: string; data: Uint8Array }[] = [];

  for (const entry of entries) {
    const entryName = entry.name;
    if (!entryName) continue;
    if (entryName === ".DS_Store") {
      console.log("Skipped file - " + entryName);
      continue;
    }

    const fullPath = await join(dir, entryName);
    console.log("Processing fullPath:", fullPath);
    console.log("Processing root:", root);
    console.log("Processing dir:", dir);
    console.log("Selected folder name:", selectedFolderName);

    try {
      await readDir(fullPath, { baseDir: BaseDirectory.Audio });
      files = files.concat(await walk(fullPath, root, selectedFolderName));
    } catch {
      const data = await readFile(fullPath, { baseDir: BaseDirectory.Audio });

      const relPath = fullPath.replace(root + "/", "");
      const uploadPath = selectedFolderName + "/" + relPath;
      files.push({ path: uploadPath, data });
    }
  }

  return files;
}

export async function pickAndReadFolder() {
  const selected = await open({ directory: true, multiple: false });
  if (!selected) return;
  const selectedFolder = selected as string;
  const selectedFolderName = selectedFolder.split("/").pop()!;

  const root = selectedFolder;
  console.log("Selected folder:", selectedFolder);

  return await walk(selectedFolder, root, selectedFolderName);
}
