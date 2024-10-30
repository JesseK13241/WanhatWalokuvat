"use client"

import DecadePicker from "@/components/DecadePicker"
import LocationPicker from "@/components/LocationPicker"
import { useState } from "react"

export default function Search({ onSearch }) {
  const [location, setLocation] = useState("")
  const [decade, setDecade] = useState("1970-1979")

  console.log("Rendering Search..")

  return (
    <div className="flex space-x-20 border border-black p-10">
      <LocationPicker value={location} onChange={setLocation} />
      <DecadePicker value={decade} onChange={setDecade} />
      <button
        onClick={() => onSearch({ location, decade })}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  )
}
