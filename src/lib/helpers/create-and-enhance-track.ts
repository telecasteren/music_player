import { BASE_URL } from "../config/frontend-paths.ts";
import type { Track } from "@/lib/types/artists-entry.ts";

// Used to create track URL for playback
export const createTrackUrl = (trackPath: string): string => {
  return `${BASE_URL}${encodeURIComponent(trackPath)}`;
};

// Used to enhance single track for AudioPlayer
export const enhanceTrack = (track: Track): Track => ({
  ...track,
  url: track.url || createTrackUrl(track.path),
});

// Used to enhance album tracks for AudioPlayer
export const enhanceTracks = (tracks: Track[]): Track[] => {
  return tracks.map(enhanceTrack);
};
