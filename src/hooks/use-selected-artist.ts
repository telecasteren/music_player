import { useContext } from "react";
import { SelectedDataContext } from "../context/selected-data-context";

export const useSelectedArtist = () => {
  const context = useContext(SelectedDataContext);
  if (!context) {
    throw new Error(
      "useSelectedArtist must be used within a SelectedArtistProvider"
    );
  }
  return context;
};
