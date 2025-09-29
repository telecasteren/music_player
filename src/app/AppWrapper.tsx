import App from "./App";
import AudioPlayer from "react-h5-audio-player";
import type H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "@/css/index.css";
import useSkipBtnTooltip from "@/components/controls/skipBtnTooltip";
import { useAudio } from "@/hooks/useAudio";
import { AudioProvider } from "@/context/AudioProvider";

const AppWrapperContent = () => {
  const {
    currentTrack,
    currentTrackIndex,
    queue,
    audioPlayerRef,
    setIsPlaying,
    playNext,
    playPrevious,
  } = useAudio();

  useSkipBtnTooltip();

  return (
    <>
      <div className="pb-[80px] min-h-screen overflow-hidden">
        <App />
      </div>

      {/* Audio Player */}
      <div className="audio_wrapper fixed bottom-0 left-0 w-full z-[9999] shadow-lg">
        <AudioPlayer
          ref={audioPlayerRef as React.RefObject<H5AudioPlayer>}
          autoPlay
          src={currentTrack?.url}
          onPlay={() => {
            console.log(
              `Playing track: ${currentTrack}, track nr: ${currentTrackIndex}`
            );
            setIsPlaying(true);
          }}
          onPause={() => setIsPlaying(false)}
          onEnded={() => queue.length && playNext()}
          progressJumpSteps={{ forward: 0, backward: 0 }}
          showSkipControls
          showJumpControls={false}
          onClickPrevious={() => playPrevious()}
          onClickNext={() => playNext()}
          onError={() => {
            console.error(`Error playing track: ${currentTrack?.name}`);
            if (queue.length > 1) {
              playNext();
            }
          }}
        />
      </div>
    </>
  );
};

const AppWrapper = () => {
  return (
    <AudioProvider>
      <AppWrapperContent />
    </AudioProvider>
  );
};
export default AppWrapper;
