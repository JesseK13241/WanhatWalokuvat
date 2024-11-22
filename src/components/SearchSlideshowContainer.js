"use client"
import Slideshow from "@/components//Slideshow"
import Search from "@/components/Search"
import { getPhotos } from "@/services/photos"
import { useState } from "react"

export default function SearchSlideshowContainer({ initialPhotos }) {
  const [searchResults, setSearchResults] = useState(initialPhotos)

  console.log("Rendering SearchSlideshowContainer..")

  const handleSearch = async (params) => {
    try {
      const results = await getPhotos(params)
      setSearchResults(results)
    } catch (error) {
      console.error("Search failed:", error)
    }
  }

  return (
    <div>
      <Search onSearch={handleSearch} />
      <Slideshow
        photos={searchResults.records}
        count={searchResults.resultCount}
      />
    </div>
  )
}
