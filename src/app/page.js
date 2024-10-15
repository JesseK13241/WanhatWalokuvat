"use client";


import { useState } from "react";
import Search from "../components/Search";
import Slideshow from "../components/Slideshow";

const fetchSearchResults = async (location, decade) => {
  return [
    "https://www.finna.fi/Cover/Show?source=Solr&id=ta_ah.M011-1445702&index=0&size=large"
  ];
};

export default function HomePage() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (location, decade) => {
    console.log("Fetching by location:", location, "decade:", decade);
    const results = await fetchSearchResults(location, decade);
    console.log("Found results:", results);
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
