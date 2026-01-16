import { createContext } from "react";
import type { Track } from "@/lib/types/artists-entry";
import type H5AudioPlayer from "react-h5-audio-player";

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTrackIndex: number;

  queue: Track[];

  playTrack: (track: Track, queue?: Track[], startIndex?: number) => void;
  playAlbum: (tracks: Track[], startIndex?: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlayPause: () => void;

  audioPlayerRef: React.RefObject<H5AudioPlayer | null>;

  setIsPlaying: (playing: boolean) => void;
  setCurrentTrackIndex: (index: number) => void;
}

export const AudioContext = createContext<AudioContextType | undefined>(
  undefined
);
