"use client"
import PhotoContainer from "@/components/PhotoContainer"
import Search from "@/components/Search"
import { getRandomPhoto } from "@/services/photos"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

export default function SearchSlideshowContainer({ initialPhoto }) {
  // Hakupalkin ja kuvakomponentin tilat on nostettu tähän containeriin,
  // Sillä kuvakomponentti tarvitsee hakupalkin palauttaman datan

  // Tätä komponenttia voi myöhemmin käyttää myös varmistamaan, että
  // uudet satunnaiset kuvat eivät ole jo aikaisemmin haettuja

  const router = useRouter()
  const pathname = usePathname()
  // /page/?a=1&b=2 | const a = searchParams.get('a') => a == 1
  const searchParams = useSearchParams()

  const [currentIndex, setCurrentIndex] = useState(1)
  const [displayedPhoto, setDisplayedPhoto] = useState(initialPhoto)
  const [preloadedPhoto, setPreloadedPhoto] = useState(null)
  const [location, setLocation] = useState({
    lat: 0,
    lon: 0,
    r: 10,
    location: "",
  })
  const [decade, setDecade] = useState("1970-1979")
  const [isLoading, setIsLoading] = useState(false)

  const handlePrevious = useCallback(() => {
    console.log("Previous button clicked. Not implemented yet.")
    // setCurrentIndex(currentIndex - 1)
    // TODO handle previous images (by pushing previous results to stack)
  }, [])

  const handleNext = useCallback(() => {
    setCurrentIndex(currentIndex + 1)
    if (preloadedPhoto) {
      // Näytä esiladattu kuva jos jo valmiina
      console.log("Using preloaded")
      setDisplayedPhoto(preloadedPhoto)
      setPreloadedPhoto(null)
    } else {
      console.log("Using non-preloaded")
      handleSearch({ location, decade })
    }
  }, [decade, location, preloadedPhoto, currentIndex])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") handlePrevious()
      if (e.key === "ArrowRight") handleNext()
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [handlePrevious, handleNext])

  useEffect(() => {
    const preloadNextPhoto = async () => {
      console.log("Preload")
      const nextPhoto = await getRandomPhoto({ location, decade })
      setPreloadedPhoto(nextPhoto)
    }

    // Skippaa preload jos navigaatiota ei ole aloitettu
    if (displayedPhoto !== initialPhoto) {
      preloadNextPhoto()
    }
  }, [displayedPhoto, location, decade, initialPhoto])

  const setRouteParams = () => {
    const params = new URLSearchParams(searchParams)
    params.set("photoId", displayedPhoto.records[0].id)
    params.set("decade", decade)
    console.log(params)
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleSearch = async (params) => {
    setIsLoading(true)
    setCurrentIndex(1)
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
          {currentIndex} / {displayedPhoto?.resultCount}
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
