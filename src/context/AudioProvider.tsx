import { useState, useRef } from "react";
import { AudioContext } from "@/context/AudioContext";
import type { Track } from "@/lib/types/artistsEntry";
import H5AudioPlayer from "react-h5-audio-player";

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [queue, setQueue] = useState<Track[]>([]);

  const audioPlayerRef = useRef<H5AudioPlayer | null>(null);

  const playTrack = (track: Track, queue?: Track[], startIndex?: number) => {
    setCurrentTrack(track);
    if (queue) {
      setQueue(queue);
      const trackIndex = queue.findIndex((t: Track) => t.path === track.path);
      setCurrentTrackIndex(trackIndex >= 0 ? trackIndex : startIndex || 0);
    } else {
      setQueue([track]);
      setCurrentTrackIndex(0);
    }
    setIsPlaying(true);
  };

  const playAlbum = (tracks: Track[], startIndex = 0) => {
    setQueue(tracks);
    setCurrentTrack(tracks[startIndex]);
    setCurrentTrackIndex(startIndex);
    setIsPlaying(true);
  };

  const playNext = () => {
    if (queue.length === 0) return;
    const newIndex = (currentTrackIndex + 1) % queue.length;

    setCurrentTrack(queue[newIndex]);
    setCurrentTrackIndex(newIndex);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    if (queue.length === 0) return;
    const newIndex = (currentTrackIndex - 1 + queue.length) % queue.length;

    setCurrentTrack(queue[newIndex]);
    setCurrentTrackIndex(newIndex);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTrackIndex,
        queue,
        playTrack,
        playAlbum,
        playNext,
        playPrevious,
        togglePlayPause,
        audioPlayerRef,
        setIsPlaying,
        setCurrentTrackIndex,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
