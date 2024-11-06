"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import SongCard from "@/components/SongCard";
import Header from "@/components/Header";
import { Song } from "./types";

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [activeComponent, setActiveComponent] = useState<string>("Songs");

  // Fetch songs from the API
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("/api/songs");
        const data: Song[] = await response.json();
        setSongs(data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  const handleSongClick = (song: Song) => {
    setCurrentSong(song);
  };
  
  const handleChangeComponent = () => {
    setActiveComponent(activeComponent === "Songs" ? "Playlist" : "Songs");
  };

  return (
    <div className="h-screen flex text-black">
      {/* Sidebar */}
      <Sidebar currentSong={currentSong} />

      {/* Main Content */}
      <div className="flex-1 p-4 bg-gray-800">
        <Header
          activeComponent={activeComponent}
          handleChangeComponent={handleChangeComponent}
        />

        {activeComponent === "Songs" ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-14 m-2">
            {songs.map((song, index) => (
              <SongCard
                key={index}
                title={song.name}
                singer={song.artist}
                thumbnail={song.cover}
                onClick={() => handleSongClick(song)}
              />
            ))}
          </div>
        ) : (
          <div className="grid">Playlists</div>
        )}
      </div>
    </div>
  );
}
