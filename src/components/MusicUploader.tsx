import React from "react";
import { Button } from "./ui/button";
import { UPLOAD_MUSIC_URL } from "@/lib/config/frontendPaths";
import { pickAndReadFolder } from "@/lib/handlers/pickAndReadFolder";

type Props = {
  onData: () => void;
};

const MusicFolderUploader: React.FC<Props> = ({ onData }) => {
  const triggerFileSelect = async () => {
    const files = await pickAndReadFolder();
    if (!files) return;

    const formData = new FormData();
    files.forEach(({ path, data }) => {
      const arrayBuffer =
        data instanceof ArrayBuffer ? data : new Uint8Array(data).buffer;
      const uint8 = new Uint8Array(arrayBuffer);
      const blob = new Blob([uint8], { type: "audio/mpeg" });

      formData.append("files", blob, path);
    });

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
