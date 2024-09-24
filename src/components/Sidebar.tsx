"use client";
import React, { useState } from "react";
import MusicPlayerCard from "./MusicPlayerCard";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { SidebarProps } from "@/app/types";
import YouTubeAudioPlayer from "./YoutubeAudioPlayer";

export default function Sidebar({ currentSong }: SidebarProps) {
  const [url, setUrl] = useState("");

  const downloadAudio = async (videoURL: string) => {
    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoURL }),
      });

      if (!response.ok) {
        throw new Error("Failed to download audio");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "audio.mp3";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (url) {
      await downloadAudio(url);
    }
  };

  return (
    <div className="w-1/5 bg-gray-700 text-white p-4 flex flex-col space-y-6">
      {/* Top Logo */}
      <div className="flex items-center space-x-2 mb-6">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-green-600 drop-shadow-md flex items-center">
          <span className="m-2 rounded-full">
            <IoMusicalNotesOutline color="white" />
          </span>
          Musicify
        </h2>
      </div>

      {/* Upload Music from PC */}
      <div>
        <button className="w-full bg-green-500 p-2 rounded-full hover:bg-green-600 transition duration-200">
          Add New Song
        </button>
      </div>

      {/* Form to Add Link */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Add a Song Link</h3>
        <form className="space-y-4" onClick={handleSubmit}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target?.value)}
            placeholder="Enter youtube URL"
            className="w-full px-4 py-2 bg-gray-900 text-white rounded focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition duration-200"
          >
            Add Link
          </button>
        </form>
      </div>

      {/* Player Card */}
      {currentSong && <MusicPlayerCard currentSong={currentSong} />}
      {/* <YouTubeAudioPlayer videoId="NO2R_vOPrYo"/> */}
    </div>
  );
}
