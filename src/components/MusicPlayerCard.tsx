import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaHeart,
  FaRedo,
} from "react-icons/fa";
import { MusicPlayerCardProps } from "@/app/types";


const MusicPlayerCard: React.FC<MusicPlayerCardProps> = ({ currentSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  // Explicitly typing audioRef as React.RefObject<HTMLAudioElement>
  const audioRef = useRef<HTMLAudioElement>(null);

  // Play the song when currentSong changes
  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.audio;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSong]);

  const playSongHandler = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const restartSong = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play();
      }
      setSongInfo({ ...songInfo, currentTime: 0 });
    }
  };

  const dragHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(e.target.value);
      setSongInfo({ ...songInfo, currentTime: parseFloat(e.target.value) });
    }
  };

  const getTime = (time: number): string => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  return (
    <div className="bg-gray-800 border-1 text-white rounded-lg p-4 w-full mx-auto mb-8">
      <div className="rounded-lg overflow-hidden">
        <Image
          src={currentSong?.cover}
          alt="Song Thumbnail"
          width={"500"}
          height={"500"}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold truncate">{currentSong.name}</h3>
        <p className="text-sm text-gray-300 truncate">{currentSong.artist}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs">{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
          className="w-3/4 mx-2"
        />
        <p className="text-xs">{getTime(songInfo.duration)}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <FaRedo
          className="text-xl cursor-pointer hover:text-gray-400"
          onClick={restartSong}
        />
        <FaStepBackward className="text-2xl cursor-pointer hover:text-gray-400" />
        <button
          className="text-white bg-green-500 p-4 rounded-full hover:bg-green-600 transition-colors focus:outline-none"
          onClick={playSongHandler}
        >
          {!isPlaying ? (
            <FaPlay fontSize="14px" />
          ) : (
            <FaPause fontSize="14px" />
          )}
        </button>
        <FaStepForward className="text-2xl cursor-pointer hover:text-gray-400" />
        <FaHeart className="text-xl cursor-pointer hover:text-gray-400" />
      </div>
      <audio
        ref={audioRef}
        onLoadedMetadata={(e) =>
          setSongInfo({
            ...songInfo,
            duration: e.currentTarget?.duration,
          })
        }
        onTimeUpdate={(e) =>
          setSongInfo({
            ...songInfo,
            currentTime: e.currentTarget?.currentTime,
          })
        }
      />
    </div>
  );
};

export default MusicPlayerCard;
