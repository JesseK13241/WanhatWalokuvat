"use client"

import DecadePicker from "@/components/DecadePicker"
import LocationPicker from "@/components/LocationPicker"

export default function Search({
  location,
  setLocation,
  decade,
  setDecade,
  onSearch,
}) {
  console.log("Rendering Search (client-side)..")

  return (
    <div className="flex space-x-20 border border-black bg-tertiary p-10">
      <LocationPicker value={location} onChange={setLocation} />
      <DecadePicker value={decade} onChange={setDecade} />
      <button
        onClick={() => onSearch({ location, decade })}
        className="btn-primary"
      >
        Hae
      </button>
    </div>
  )
}
