import { createContext } from "react";
import type { Artist, Album } from "@/lib/types/artists-entry";

interface SelectedDataContextType {
  selectedArtist: Artist | null;
  setSelectedArtist: (artist: Artist | null) => void;

  selectedAlbum: Album | null;
  setSelectedAlbum: (album: Album | null) => void;
}

export const SelectedDataContext = createContext<
  SelectedDataContextType | undefined
>(undefined);
