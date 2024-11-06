import React from "react";
import Image from "next/image";
import DefaultCover from "@/static/default.webp";

export default function SongCard({ title, singer, thumbnail, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="group relative w-48 bg-gray-800 rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
      style={{ minHeight: "250px" }}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-48">
        <Image
          src={thumbnail ?? DefaultCover}
          alt={`${title} thumbnail`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-t-lg"
        />
      </div>

      {/* Title and Singer */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm truncate">{title}</h3>
        <p className="text-gray-400 text-xs mt-1 truncate">{singer}</p>
      </div>
      {/* Play Button on Hover */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:scale-105">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14.752 11.168l-5.197-3.853A1 1 0 008 8.121v7.758a1 1 0 001.555.832l5.197-3.853a1 1 0 000-1.664z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
