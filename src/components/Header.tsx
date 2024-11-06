import React, { useState } from "react";
import { TbHomeFilled } from "react-icons/tb";
import { BiCategory, BiMusic } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { TbBrandGravatar } from "react-icons/tb";

const Header = ({ activeComponent, handleChangeComponent }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <span className="material-icons bg-gray-900 text-gray-400 m-2 p-4 rounded-full">
          <TbHomeFilled size="1.5rem" />
        </span>
        <div
          className={`flex items-center bg-gray-900 text-gray-400 rounded-full p-2 w-full group transition-all duration-300 ease-in-out ${
            isFocused ? "ring-2 ring-white" : "ring-0"
          }`}
        >
          <span
            className={`mx-2 material-icons text-gray-400 group-hover:text-white ${
              isFocused && "text-white"
            }`}
          >
            <IoSearchOutline size="1.5rem" />
          </span>
          <input
            type="url"
            placeholder="What do you want to play?"
            className="flex-1 bg-transparent text-gray-200 placeholder-gray-400 outline-none p-2"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <button className="ml-2 pr-2">
            <span
              className={`material-icons text-gray-400 group-hover:text-white ${
                isFocused && "text-white"
              }`}
            >
              {!(activeComponent === "Songs") ? (
                <BiMusic size="1.5rem" onClick={handleChangeComponent}/>
              ) : (
                <BiCategory size="1.5rem" onClick={handleChangeComponent} />
              )}
            </span>
          </button>
        </div>

        {/* Login Button */}
        {isAuthenticated ? (
          <span className="ml-4 bg-white text-gray-900 p-4 rounded-full cursor-pointer hover:bg-gray-200 transition-all duration-300">
            <TbBrandGravatar size="1.5rem" />
          </span>
        ) : (
          <button className="ml-4 bg-white text-gray-900 font-semibold py-2 px-4 rounded-full cursor-pointer hover:bg-gray-200 transition-all duration-300">
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
