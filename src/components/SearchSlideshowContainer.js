"use client"
import PhotoContainer from "@/components/PhotoContainer"
import Search from "@/components/Search"
import { getRandomPhoto, getResultCount } from "@/services/photos"
import { Shuffle } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { LoaderCircle } from "lucide-react"
import PhotoInfo from "./PhotoInfo"

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
  const [location, setLocation] = useState(null)
  const [decade, setDecade] = useState("vuosi")
  const [isLoading, setIsLoading] = useState(false)
  const [resultCount, setResultCount] = useState(null)

  // console.log("Displayed photo:", displayedPhoto)

  const handlePrevious = useCallback(() => {
    console.log("Previous button clicked. Not implemented yet.")
    // setCurrentIndex(currentIndex - 1)
    // TODO handle previous images (by pushing previous results to stack)
  }, [])

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => prevIndex + 1)

    if (preloadedPhoto) {
      // Näytä esiladattu kuva jos jo valmiina
      console.log("Using preloaded")
      setDisplayedPhoto(preloadedPhoto)
      setPreloadedPhoto(null)
    } else {
      console.log("Using non-preloaded")
      getPhotos({ location, decade })
    }
  }, [decade, location, preloadedPhoto])

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
      console.log("Preloading photo")
      const nextPhoto = await getRandomPhoto({
        location,
        decade,
        resultCountParam: resultCount,
      })
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

  const getPhotos = async ({ location, decade }) => {
    setIsLoading(true)
    try {
      const results = await getRandomPhoto({
        location,
        decade,
        resultCountParam: resultCount,
      })
      setDisplayedPhoto(results)
      const nextPhoto = await getRandomPhoto({
        location,
        decade,
        resultCountParam: resultCount,
      })
      setPreloadedPhoto(nextPhoto)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (params) => {
    setCurrentIndex(1)
    let results = await getResultCount(params)
    setResultCount(results)
    await getPhotos(params)
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

      {displayedPhoto ? ( // Jos kuva on null (eli lataa), palautetaan skeleton
        <PhotoContainer photo={displayedPhoto} useLoading={true} />
      ) : (
        <div className="mx-auto w-[95%] max-w-xl overflow-hidden rounded-lg bg-primary shadow-md">
          <div className="relative w-full bg-tertiary pt-[100%]">
            <div className="flex absolute inset-0 animate-pulse rounded items-center justify-center">
              <LoaderCircle className="animate-spin w-32 h-32 stroke-primary" />
            </div>
          </div>
          <PhotoInfo loading={true} />
        </div>
      )}

      {resultCount && (
        <div className="flex flex-wrap items-center justify-center gap-10">
          <div className="flex items-center gap-4">
            <button onClick={handlePrevious} className="btn-primary">
              Edellinen
            </button>
            <div className="flex w-24 justify-center">
              {" "}
              {/* Fixed width for counter */}
              {currentIndex} / {resultCount}
            </div>
            <button
              onClick={() => {
                setDisplayedPhoto(null) // Asetetaan null, jotta kuva häviää näkyvistä
                handleNext()
              }}
              className="btn-primary"
              disabled={isLoading}
            >
              Seuraava
            </button>
          </div>
          <div className="flex w-full justify-center">
            <button className="btn-primary px-6">
              <Shuffle />
            </button>
          </div>
        </div>
      )}
      {/* Piilotettu DOM-komponentti kuvan esilataamista varten */}
      {preloadedPhoto && (
        <div className="hidden">
          <PhotoContainer photo={preloadedPhoto} />
        </div>
      )}
    </div>
  )
}
