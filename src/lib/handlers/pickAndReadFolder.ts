import { open } from "@tauri-apps/plugin-dialog";
import { audioDir, join } from "@tauri-apps/api/path";
import { readDir, readFile, BaseDirectory } from "@tauri-apps/plugin-fs";

async function walk(
  dir: string,
  base = ""
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
    const basePath = await join(base, entryName);

    try {
      await readDir(fullPath, { baseDir: BaseDirectory.Audio });
      files = files.concat(await walk(fullPath, basePath));
    } catch {
      const data = await readFile(fullPath, { baseDir: BaseDirectory.Audio });
      files.push({ path: basePath, data });
    }
  }

  return files;
}

export async function pickAndReadFolder() {
  const selected = await open({ directory: true, multiple: false });
  if (!selected) return;

  const home = await audioDir();
  const relPath = (selected as string).replace(home, "").replace(/^\/+/, "");

  return await walk(relPath);
}
