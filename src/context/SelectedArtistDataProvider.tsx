import React, { useState } from "react";
import { SelectedDataContext } from "./SelectedDataContext";
import type { Artist, Album } from "@/lib/types/artistsEntry";

export const SelectedArtistDataProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  return (
    <SelectedDataContext.Provider
      value={{
        selectedArtist,
        setSelectedArtist,
        selectedAlbum,
        setSelectedAlbum,
      }}
    >
      {children}
    </SelectedDataContext.Provider>
  );
};
