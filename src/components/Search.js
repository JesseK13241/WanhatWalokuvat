"use client"

import DecadePicker from "@/components/DecadePicker"
import LocationPicker from "@/components/LocationPicker"
import { SearchIcon, Search as searchIcon } from "lucide-react"

export default function Search({
  location,
  setLocation,
  decade,
  setDecade,
  onSearch,
}) {
  return (
    <div className="mx-auto flex w-[95%] max-w-xl justify-center gap-4 rounded-md bg-tertiary p-4 sm:p-8">
      <LocationPicker value={location} onChange={setLocation} />
      <DecadePicker value={decade} onChange={setDecade} />
      <button
        onClick={() => onSearch({ location, decade })}
        className="btn-primary flex min-w-28 items-center justify-center gap-2"
      >
        <SearchIcon />
        Hae
      </button>
    </div>
  )
}
