import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import multer from "multer";
import fsExtra from "fs-extra";
import { musicFilesPath } from "./src/lib/config/backendPaths.ts";
import { scanMusicDirectory } from "./src/lib/helpers/scanMusicDirectory.ts";
import { updateMusicIndex } from "./src/lib/handlers/uploadHandler.ts";

/**
 * POST /api/upload-music
 * Handles uploading of multiple music files.
 * Saves files to the user uploads directory, ensuring unique filenames if a conflict occurs.
 * Updates the music index after successful uploads.
 *
 * @name UploadMusic
 * @function
 * @async
 * @param {import('express').Request} req - Express request object. Expects files in `req.files`.
 * @param {import('express').Response} res - Express response object. Responds with JSON.
 * @returns {Promise<void>} Sends JSON response indicating success or failure.
 */

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });

app.use("/music", express.static(musicFilesPath));

app.post("/api/upload-music", upload.array("files"), async (req, res) => {
  const files = req.files;
  if (!files || !Array.isArray(files)) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const relPaths = Array.isArray(req.body.relativePaths)
    ? req.body.relativePaths
    : req.body.relativePaths
    ? [req.body.relativePaths]
    : [];
  console.log("Received files:", files.length);
  console.log("Received relative paths:", relPaths);

  const baseDir = musicFilesPath;
  const newFilePaths: string[] = [];

  try {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const relPath = relPaths[i] || file.originalname;
      const destPath = path.join(baseDir, relPath);
      await fsExtra.ensureDir(path.dirname(destPath));

      // Add timestamp if file already exists
      let finalDest = destPath;
      if (fs.existsSync(destPath)) {
        const ext = path.extname(destPath);
        const name = path.basename(destPath, ext);
        finalDest = path.join(
          path.dirname(destPath),
          `${name}_${Date.now()}${ext}`
        );
      }
      await fsExtra.writeFile(finalDest, file.buffer);

      newFilePaths.push(relPath);
    }

    await updateMusicIndex(newFilePaths);
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to save uploaded files:", err);
    res.status(500).json({ error: "Failed to save uploaded files" });
  }
});

app.get("/api/artists", (req, res) => {
  try {
    if (!fs.existsSync(musicFilesPath)) {
      return res.json({ artists: [] });
    }
    const artists = scanMusicDirectory(musicFilesPath);
    res.json({ artists });
  } catch (err) {
    console.error("Failed to scan music directory:", err);
    res.status(500).json({ error: "Failed to scan music directory" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
