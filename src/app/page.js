"use client";

import Link from "next/link";

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
      <h1 className="text-3xl border border-black">
        Aineopintojen projektityö
      </h1>
      <main>
        <Search onSearch={handleSearch} />
        <Slideshow photos={searchResults} />
      </main>
      <footer className="border border-black">
        <Link href="https://github.com/JesseK13241/TIEA207-projekti/">
          View on GitHub
        </Link>
      </footer>
    </div>
  );
}
