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
  //console.log("Rendering Search (client-side)..")

  return (
    <div className="flex justify-evenly rounded bg-tertiary p-8">
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
