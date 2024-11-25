"use client"
import PhotoContainer from "@/components/PhotoContainer"
import Search from "@/components/Search"
import { getRandomPhoto } from "@/services/photos"
import { useEffect, useState } from "react"

export default function SearchSlideshowContainer({ initialPhoto }) {
  // Hakupalkin ja kuvakomponentin tilat on nostettu tähän containeriin,
  // Sillä kuvakomponentti tarvitsee hakupalkin palauttaman datan

  // Tätä komponenttia voi myöhemmin käyttää myös varmistamaan, että
  // uudet satunnaiset kuvat eivät ole jo aikaisemmin haettuja

  const [displayedPhoto, setDisplayedPhoto] = useState(initialPhoto)
  const [preloadedPhoto, setPreloadedPhoto] = useState(null)
  const [location, setLocation] = useState("")
  const [decade, setDecade] = useState("1970-1979")
  const [isLoading, setIsLoading] = useState(false)

  console.log("Rendering SearchSlideshowContainer (client-side)..")

  useEffect(() => {
    const preloadNextPhoto = async () => {
      const nextPhoto = await getRandomPhoto({ location, decade })
      setPreloadedPhoto(nextPhoto)
    }

    // Skippaa preload jos navigaatiota ei ole aloitettu
    if (displayedPhoto !== initialPhoto) {
      preloadNextPhoto()
    }
  }, [displayedPhoto, location, decade, initialPhoto])

  const handleSearch = async (params) => {
    setIsLoading(true)
    try {
      const results = await getRandomPhoto(params)
      setDisplayedPhoto(results)
      const nextPhoto = await getRandomPhoto(params)
      setPreloadedPhoto(nextPhoto)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrevious = () => {
    console.log("Previous button clicked. Not implemented yet.")
    // TODO handle previous images (by pushing previous results to stack)
  }

  const handleNext = () => {
    if (preloadedPhoto) {
      // Näytä esiladattu kuva jos jo valmiina
      setDisplayedPhoto(preloadedPhoto)
      setPreloadedPhoto(null)
    } else {
      handleSearch({ location, decade })
    }
  }

  return (
    <div className="flex w-screen flex-col gap-4">
      <Search
        onSearch={handleSearch}
        location={location}
        setLocation={setLocation}
        decade={decade}
        setDecade={setDecade}
      />

      <PhotoContainer photo={displayedPhoto} />

      <div className="flex items-center justify-center gap-10">
        <button onClick={handlePrevious} className="btn-primary">
          Edellinen
        </button>
        <div>
          {displayedPhoto?.randomIndex} / {displayedPhoto?.resultCount}
        </div>
        <button
          onClick={handleNext}
          className="btn-primary"
          disabled={isLoading}
        >
          Seuraava
        </button>
      </div>

      {/* Piilotettu DOM-komponentti kuvan esilataamista varten */}
      {preloadedPhoto && (
        <div className="hidden">
          <PhotoContainer photo={preloadedPhoto} />
        </div>
      )}
    </div>
  )
}
