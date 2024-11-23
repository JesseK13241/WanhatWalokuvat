"use client"
import PhotoContainer from "@/components/PhotoContainer"
import Search from "@/components/Search"
import { getRandomPhoto } from "@/services/photos"
import { useState } from "react"

export default function SearchSlideshowContainer({ initialPhoto }) {
  const [displayedPhoto, setDisplayedPhotos] = useState(initialPhoto)
  const [location, setLocation] = useState("")
  const [decade, setDecade] = useState("1970-1979")

  console.log("Rendering SearchSlideshowContainer..")
  console.log("Displayed photo:", displayedPhoto)

  const handleSearch = async (params) => {
    try {
      const results = await getRandomPhoto(params)
      console.log("Search results:", results)
      setDisplayedPhotos(results)
    } catch (error) {
      console.error("Search failed:", error)
    }
  }

  const handlePrevious = () => {
    console.log("Previous button clicked")
    // TODO handle previous images by pushing previous results to stack
  }

  const handleNext = () => {
    console.log("Next button clicked")
    handleSearch({ location, decade })
  }

  return (
    <div>
      <Search onSearch={handleSearch} location={location} setLocation={setLocation} decade={decade} setDecade={setDecade} />
      <div className="flex items-center justify-between gap-4">
        <button onClick={handlePrevious} className="btn-secondary">
          Previous
        </button>
        <div>{displayedPhoto?.randomIndex} / {displayedPhoto?.resultCount}</div>
        <button onClick={handleNext} className="btn-secondary">
          Next
        </button>
      </div>

      <PhotoContainer photo={displayedPhoto} />
    </div>
  )
}
