"use client"
import PhotoContainer from "@/components/PhotoContainer"
import Search from "@/components/Search"
import { getRandomPhoto } from "@/services/photos"
import { useState } from "react"

export default function SearchSlideshowContainer({ initialPhoto }) {
  // Hakupalkin ja kuvakomponentin tilat on nostettu tähän containeriin,
  // Sillä kuvakomponentti tarvitsee hakupalkin palauttaman datan

  // Tätä komponenttia voi myöhemmin käyttää myös varmistamaan, että
  // uudet satunnaiset kuvat eivät ole jo aikaisemmin haettuja

  const [displayedPhoto, setDisplayedPhoto] = useState(initialPhoto)
  const [location, setLocation] = useState("")
  const [decade, setDecade] = useState("1970-1979")

  console.log("Rendering SearchSlideshowContainer (client-side)..")

  const handleSearch = async (params) => {
    try {
      const results = await getRandomPhoto(params)
      console.log("Search results:", results)
      setDisplayedPhoto(results)
    } catch (error) {
      console.error("Search failed:", error)
    }
  }

  const handlePrevious = () => {
    console.log("Previous button clicked. Not implemented yet.")
    // TODO handle previous images (by pushing previous results to stack)
  }

  const handleNext = () => {
    console.log("Fetching the next random image...")
    handleSearch({ location, decade })
  }

  return (
    <div>
      <Search
        onSearch={handleSearch}
        location={location}
        setLocation={setLocation}
        decade={decade}
        setDecade={setDecade}
      />
      <div className="flex items-center justify-between gap-4">
        <button onClick={handlePrevious} className="btn-secondary">
          Edellinen
        </button>
        <div>
          {displayedPhoto?.randomIndex} / {displayedPhoto?.resultCount}
        </div>
        <button onClick={handleNext} className="btn-secondary">
          Seuraava
        </button>
      </div>
      <PhotoContainer photo={displayedPhoto} />
    </div>
  )
}
