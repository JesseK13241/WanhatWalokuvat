"use client";

import { useState } from "react";
import Search from "../components/Search";
import Slideshow from "../components/Slideshow";

import photos from "../services/photos";

const fetchSearchResults = async params => {
  const results = await photos();
  return results;
};

export default function HomePage() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async params => {
    console.log("Fetching by params:", params);
    const results = await fetchSearchResults(params);
    setSearchResults(results);
  };

  return (
    <div className="flex flex-col items-center p-10">
      <>
        <Search onSearch={handleSearch} />
        <Slideshow photos={searchResults} />
      </>
    </div>
  );
}
