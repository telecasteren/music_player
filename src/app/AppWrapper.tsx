import React from "react";
import App from "./App";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "@/css/index.css";
import { getTracks } from "@/lib/helpers/data_mapping";
import useSkipBtnTooltip from "@/components/controls/skipBtnTooltip";

const tracks = await getTracks();

const AppWrapper = () => {
  const [currentTrackIdx, setCurrentTrackIdx] = React.useState(0);

  useSkipBtnTooltip();

  return (
    <>
      <div className="pb-[80px] min-h-screen overflow-hidden">
        <App />
      </div>

      {/* Audio Player */}
      <div className="audio_wrapper fixed bottom-0 left-0 w-full z-[9999] shadow-lg">
        <AudioPlayer
          autoPlay
          src={tracks[currentTrackIdx]}
          onPlay={() =>
            console.log(
              `Playing track: ${tracks[currentTrackIdx]} nr: ${currentTrackIdx}`
            )
          }
          onEnded={() => setCurrentTrackIdx((idx) => (idx + 1) % tracks.length)}
          progressJumpSteps={{ forward: 0, backward: 0 }}
          showSkipControls
          showJumpControls={false}
          onClickPrevious={() =>
            setCurrentTrackIdx(
              (idx) => (idx - 1 + tracks.length) % tracks.length
            )
          }
          onClickNext={() =>
            setCurrentTrackIdx((idx) => (idx + 1) % tracks.length)
          }
          onError={() => {
            throw new Error("Error playing track");
          }}
        />
      </div>
    </>
  );
};

export default AppWrapper;
