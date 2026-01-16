import React from "react";
import { Button } from "./ui/button";
import { UPLOAD_MUSIC_URL } from "@/lib/config/frontend-paths";
import { pickAndReadFolder } from "@/lib/handlers/pick-and-read-folder";

type Props = {
  onData: () => void;
};

const MusicFolderUploader: React.FC<Props> = ({ onData }) => {
  const triggerFileSelect = async () => {
    const files = await pickAndReadFolder();
    if (!files) return;

    const formData = new FormData();
    const relativePaths: string[] = [];

    files.forEach(({ path, data }) => {
      console.log(
        "typeof data:",
        typeof data,
        "instanceof ArrayBuffer:",
        data instanceof ArrayBuffer,
        "instanceof Uint8Array:",
        data instanceof Uint8Array
      );

      let uint8: Uint8Array;
      if (data instanceof Uint8Array) {
        uint8 = data;
      } else if (data instanceof ArrayBuffer) {
        uint8 = new Uint8Array(data);
      } else if (ArrayBuffer.isView(data)) {
        uint8 = new Uint8Array(data.buffer);
      } else {
        throw new Error("Unsupported data type for file upload");
      }
      const blob = new Blob([uint8], { type: "audio/mpeg" });
      formData.append("files", blob, path);
      relativePaths.push(path);
    });
    relativePaths.forEach((relPath) =>
      formData.append("relativePaths", relPath)
    );

    fetch(UPLOAD_MUSIC_URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Music folders uploaded successfully");
          onData();
        } else {
          alert("Failed to upload music folders");
        }
      })
      .catch(() => {
        alert("Error connecting to server.");
      });
  };

  return (
    <div>
      <Button
        onClick={triggerFileSelect}
        className="flex mx-auto bg-[var(--accent-dark)] text-[var(--text-dark)] hover:text-[var(--text-light)] cursor-pointer"
      >
        Upload music
      </Button>
    </div>
  );
};

export default MusicFolderUploader;
