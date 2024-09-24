"use client";
import React, { useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

interface YouTubeAudioPlayerProps {
  videoId: string;
}

const YouTubeAudioPlayer: React.FC<YouTubeAudioPlayerProps> = ({ videoId }) => {
  const [player, setPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    setPlayer(event.target);
  };

  const opts: YouTubeProps["opts"] = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
      controls: 0, 
      modestbranding: 1, 
      showinfo: 0, 
      rel: 0, 
      iv_load_policy: 3,
      quality: "small",
    },
  };

  const togglePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
      <button onClick={togglePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default YouTubeAudioPlayer;
