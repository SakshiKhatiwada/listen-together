"use client";
import React, { useState } from "react";
import MusicPlayerCard from "./MusicPlayerCard";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { SidebarProps } from "@/app/types";

export default function Sidebar({ currentSong }: SidebarProps) {
  const [url, setUrl] = useState("");

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      try {
        const response = await fetch("/api/add-song", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        });

        if (!response.ok) {
          throw new Error("Failed to add song");
        }
      } catch (error) {
        console.error("Error:", error);
      }
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
      {/* <div>
        <button className="w-full bg-green-500 p-2 rounded-full hover:bg-green-600 transition duration-200">
          Add New Song
        </button>
      </div> */}

      {/* Form to Add Link */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Add a Song Link</h3>
        <form className="space-y-4" onSubmit={handleAddLink}>
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
            onClick={handleAddLink}
          >
            Add Link
          </button>
        </form>
      </div>

      {/* Player Card */}
      {currentSong && <MusicPlayerCard currentSong={currentSong} />}
    </div>
  );
}
