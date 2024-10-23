"use client";

import { useState } from "react";
import Search from "../components/Search";
import Slideshow from "../components/Slideshow";
import photos from "../services/photos";

export default function HomePage() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async ({location, decade}) => {
    console.log("Fetching by params", { location, decade });
    const results = await photos(location, decade);
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
