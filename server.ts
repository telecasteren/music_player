import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import mergeArtists from "./src/lib/helpers/mergeArtists.ts";

const app = express();
app.use(cors());
app.use(express.json());

const ARTISTS_DATA_PATH = path.join(
  process.cwd(),
  "src/lib/data/artistsData.ts"
);

function getExistingArtists() {
  try {
    const file = fs.readFileSync(ARTISTS_DATA_PATH, "utf-8");
    const match = file.match(/const artists\s*=\s*(\[.*\]);/s);

    if (match) {
      return JSON.parse(match[1]);
    }
  } catch (error) {
    console.error(`Couldn't read artistsData.ts: ${error.message}`);
  }
  return [];
}

app.get("/api/artists", (req, res) => {
  const existingArtists = getExistingArtists();
  res.json({ artists: existingArtists });
});

app.post("/api/update-artists", (req, res) => {
  const { artists } = req.body;
  if (!artists) {
    return res.status(400).json({ error: "Artists data not provided" });
  }

  const existingArtists = getExistingArtists();
  const mergedArtists = mergeArtists(existingArtists, artists);

  const fileContent = `// This file is auto-generated\nconst artists = ${JSON.stringify(
    mergedArtists,
    null,
    2
  )};export default artists`;

  fs.writeFile(ARTISTS_DATA_PATH, fileContent, (err) => {
    if (err) {
      console.error("Failed to write artistsData.ts:", err);
      return res.status(500).json({ error: "Failed to update artistsData.ts" });
    }
    res.json({ success: true, message: "artistsData.ts updated successfully" });
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
