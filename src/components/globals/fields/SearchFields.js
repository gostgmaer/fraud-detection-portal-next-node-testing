"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const SearchField = () => {
  const [searchText, setSearchText] = useState("");

  const handleClearClick = () => {
    setSearchText("");
  };

  return (
    <div className="flex flex-wrap items-center gap-4 w-full">
      <div className="rizzui-input-root flex flex-col">
        <label className="block ">
          <span className="rizzui-input-container bg-white flex items-center peer w-full transition duration-200 px-3.5 py-2 text-sm leading-[40px] rounded-md bg-transparent [&amp;.is-focus]:ring-[0.6px] border border-gray-300 [&amp;_input::placeholder]:text-gray-500 hover:border-gray-900 [&amp;.is-focus]:border-gray-900 [&amp;.is-focus]:ring-gray-900 h-9">
            <span className="rizzui-input-prefix whitespace-nowrap leading-normal">
              <FaSearch />
            </span>
            <input
              placeholder="Search by anything..."
              className="rizzui-input-field w-full  border-0 bg-transparent p-0 focus:outline-none focus:ring-0 [&amp;:placeholder-shown~.input-clear-btn]:opacity-0 [&amp;:placeholder-shown~.input-clear-btn]:invisible [&amp;:not(:placeholder-shown)~.input-clear-btn]:opacity-100 [&amp;:not(:placeholder-shown)~.input-clear-btn]:visible pl-2.5 rtl:pr-2.5"
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          
          </span>
         
        </label>
      </div>
    </div>
  );
};

export default SearchField;
