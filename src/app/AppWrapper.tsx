import React from "react";
import App from "./App";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "@/css/index.css";

// Sample tracks
const tracks = [
  { src: "src/lib/data/musicFiles/Future-design_penguinmusic.mp3" },
  { src: "src/lib/data/musicFiles/Tell-Me-What_Denys-Brodovskyi.mp3" },
  { src: "src/lib/data/musicFiles/tvari-tokyo-cafe_TVARI.mp3" },
];

const AppWrapper = () => {
  const [currentTrackIdx, setCurrentTrackIdx] = React.useState(0);

  return (
    <>
      <div className="pb-[80px] min-h-screen overflow-hidden">
        <App />
      </div>

      {/* Audio Player */}
      <div className="audio_wrapper fixed bottom-0 left-0 w-full z-[9999] shadow-lg">
        <AudioPlayer
          autoPlay
          src={tracks[currentTrackIdx].src}
          onPlay={() => console.log("Playing!")}
          onEnded={() => setCurrentTrackIdx((idx) => (idx + 1) % tracks.length)}
        />
      </div>
    </>
  );
};

export default AppWrapper;
