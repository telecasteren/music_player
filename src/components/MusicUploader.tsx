import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
// import type { Folder } from "@/lib/types/uploader";
// import { folderToArtists } from "@/lib/helpers/transformMusic";
import { UPLOAD_MUSIC_URL } from "@/lib/config/frontendPaths";

type Props = {
  onData: () => void;
};

const MusicFolderUploader: React.FC<Props> = ({ onData }) => {
  // const [folders, setFolders] = useState<Folder[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // const buildFolderStructure = (files: File[]): Folder[] => {
  //   const root: Folder = { name: "root", children: [] };

  //   files.forEach((file) => {
  //     const parts = file.webkitRelativePath.split("/");
  //     let current: Folder = root;

  //     parts.forEach((part, index) => {
  //       if (index === parts.length - 1) {
  //         current.children.push({
  //           name: part,
  //           path: file.webkitRelativePath,
  //           file,
  //         });
  //       } else {
  //         let folder = current.children.find(
  //           (child): child is Folder =>
  //             "children" in child && child.name === part
  //         );
  //         if (!folder) {
  //           folder = { name: part, children: [] };
  //           current.children.push(folder);
  //         }
  //         current = folder;
  //       }
  //     });
  //   });
  //   return root.children as Folder[];
  // };

  const handleFolderSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const allFiles = Array.from(event.target.files).filter((file) =>
      /\.(mp3|m4a|wav|flac|aac)$/i.test(file.name)
    );

    // const folderTree = buildFolderStructure(allFiles);
    // setFolders(folderTree);
    // const artists = folderToArtists(folderTree);
    const formData = new FormData();
    allFiles.forEach((file) => {
      console.log(file.webkitRelativePath);

      formData.append("files", file);
      formData.append("files", file.webkitRelativePath);
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

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <Button
        onClick={triggerFileSelect}
        className="flex mx-auto bg-[var(--accent-dark)] text-[var(--text-dark)] hover:text-[var(--text-light)] cursor-pointer"
      >
        Upload music
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        style={{ display: "none" }}
        {...({ webkitdirectory: "" } as React.HTMLProps<HTMLInputElement>)}
        onChange={handleFolderSelect}
      />

      {/* Mockup to see the JSON structure - can be removed when Artist
      is constructed */}
      {/* <pre>{JSON.stringify(folders, null, 2)}</pre> */}
    </div>
  );
};

export default MusicFolderUploader;
