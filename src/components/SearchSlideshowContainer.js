"use client"
import PhotoContainer from "@/components/PhotoContainer"
import Search from "@/components/Search"
import { getPhotoByIndex, getResultCount } from "@/services/photos"
import { LoaderCircle, Shuffle } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import PhotoInfo from "./PhotoInfo"

export default function SearchSlideshowContainer({ initialPhoto }) {
  // Hakupalkin ja kuvakomponentin tilat on nostettu tähän containeriin,
  // Sillä kuvakomponentti tarvitsee hakupalkin palauttaman datan

  // const router = useRouter()
  // const pathname = usePathname()
  // /page/?a=1&b=2 | const a = searchParams.get('a') => a == 1
  // const searchParams = useSearchParams()
  //
  // const setRouteParams = () => {
  //   const params = new URLSearchParams(searchParams)
  //   params.set("photoId", displayedPhoto.records[0].id)
  //   params.set("decade", decade)
  //   console.log(params)
  //   router.replace(`${pathname}?${params.toString()}`)
  // }

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

  const getPhotos = useCallback(
    async ({ location, decade }) => {
      setIsLoading(true)
      try {
        const results = await getPhotoByIndex({
          location,
          decade,
          index: currentIndex,
        })
        console.log("Got photo:", results)
        setDisplayedPhoto(results)
      } catch (error) {
        console.error("Search failed:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [currentIndex]
  )

  const handleNext = useCallback(async () => {
    if (preloadedPhoto) {
      console.log("Using preloaded")
      setDisplayedPhoto(preloadedPhoto)
      setPreloadedPhoto(null)
      setCurrentIndex((prevIndex) => prevIndex + 1)
    } else {
      console.log("Using non-preloaded")
      setIsLoading(true)
      await getPhotos({ location, decade })
      setCurrentIndex((prevIndex) => prevIndex + 1)
      setIsLoading(false)
    }
  }, [decade, location, preloadedPhoto, getPhotos])

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
      const nextPhoto = await getPhotoByIndex({
        location,
        decade,
        index: currentIndex + 1,
      })
      console.log("Got next photo:", nextPhoto)
      setPreloadedPhoto(nextPhoto)
    }

    // Skippaa preload jos navigaatiota ei ole aloitettu
    if (displayedPhoto !== initialPhoto) {
      preloadNextPhoto()
    }
  }, [displayedPhoto, location, decade, initialPhoto, currentIndex])

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
            <div className="absolute inset-0 flex animate-pulse items-center justify-center rounded">
              <LoaderCircle className="size-32 animate-spin stroke-primary" />
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
            <div className="flex w-32 justify-center">
              {" "}
              {/* Fixed width for counter */}
              {currentIndex} / {Math.min(resultCount, 100000)}
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
            <button
              onClick={async () => {
                const randomIndex = Math.ceil(
                  Math.random() * Math.min(resultCount, 100000)
                )
                setCurrentIndex(randomIndex)
                setDisplayedPhoto(null)
                setPreloadedPhoto(null)
                await getPhotos({ location, decade })
              }}
              className="btn-primary px-6"
            >
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
