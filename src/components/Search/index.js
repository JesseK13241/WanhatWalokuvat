"use client";

import DecadePicker from "./DecadePicker";
import LocationPicker from "./LocationPicker";

import { useState } from "react";

export default function Search({ onSearch }) {
  const [location, setLocation] = useState("");
  const [decade, setDecade] = useState("1970-1979"); // Default value for DecadePicker

  return (
    <div className="flex border border-black p-10 space-x-20">
      <LocationPicker
        value={location}
        onChange={setLocation}
      />
      <DecadePicker
        value={decade}
        onChange={setDecade}
      />
      <button
        onClick={() => onSearch(location, decade)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Search
      </button>
    </div>
  );
}
