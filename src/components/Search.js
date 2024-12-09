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
    <div className="mx-auto flex w-[95%] flex-col justify-center gap-y-2 rounded-md bg-tertiary p-4 sm:flex-row sm:p-8">
      <div className="flex justify-center gap-x-4">
        <LocationPicker value={location} onChange={setLocation} />
        <DecadePicker value={decade} onChange={setDecade} />
      </div>
      <button
        onClick={() => onSearch({ location, decade })}
        className="btn-primary mx-auto flex items-center gap-2 sm:mx-4"
      >
        <SearchIcon />
        Hae
      </button>
    </div>
  )
}
