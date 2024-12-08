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
  const [preloadedPreviousPhoto, setPreloadedPreviousPhoto] = useState(null)
  const [preloadedNextPhoto, setPreloadedNextPhoto] = useState(null)
  const [location, setLocation] = useState(null)
  const [decade, setDecade] = useState("vuosi")
  const [isLoading, setIsLoading] = useState(false)
  const [resultCount, setResultCount] = useState(null)
  const [lastSearchParams, setLastSearchParams] = useState(null)

  const getPhotos = useCallback(
    async ({ location, decade }) => {
      setIsLoading(true)
      try {
        const results = await getPhotoByIndex({
          location,
          decade,
          index: currentIndex,
        })
        setDisplayedPhoto(results)
        return results
      } catch (error) {
        console.error("Search failed:", error)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [currentIndex]
  )

  const handlePrevious = useCallback(async () => {
    if (currentIndex > 1) {
      if (preloadedPreviousPhoto) {
        console.log("Using preloaded previous photo")
        setDisplayedPhoto(preloadedPreviousPhoto)
        setPreloadedPreviousPhoto(null)
        setCurrentIndex((prevIndex) => prevIndex - 1)
      } else {
        setCurrentIndex((prevIndex) => prevIndex - 1)
        await getPhotos({ location, decade })
      }
    }
  }, [currentIndex, getPhotos, location, decade, preloadedPreviousPhoto])

  const handleNext = useCallback(async () => {
    if (preloadedNextPhoto) {
      console.log("Using preloaded next photo")
      setDisplayedPhoto(preloadedNextPhoto)
      setPreloadedNextPhoto(null)
      setCurrentIndex((prevIndex) => prevIndex + 1)
    } else {
      await getPhotos({ location, decade })
      setCurrentIndex((prevIndex) => prevIndex + 1)
    }
  }, [decade, location, preloadedNextPhoto, getPhotos])

  const handleRandomPhoto = useCallback(async () => {
    if (resultCount === null || resultCount === 0) {
      console.warn("No results to randomize")
      return
    }

    const randomIndex = Math.ceil(Math.random() * Math.min(resultCount, 100000))
    setCurrentIndex(randomIndex)
    setDisplayedPhoto(null)
    setPreloadedPreviousPhoto(null)
    setPreloadedNextPhoto(null)
    await getPhotos({ location, decade })
  }, [resultCount, getPhotos, location, decade])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") handlePrevious()
      if (e.key === "ArrowRight") handleNext()
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [handlePrevious, handleNext])

  useEffect(() => {
    const preloadPhotos = async () => {
      try {
        // Preload previous photo (if index > 1)
        if (currentIndex > 1) {
          const previousPhoto = await getPhotoByIndex({
            location,
            decade,
            index: currentIndex - 1,
          })

          if (previousPhoto) {
            setPreloadedPreviousPhoto(previousPhoto)
          }
        }

        // Preload next photo (if index < result count)
        if (!resultCount || currentIndex < resultCount) {
          const nextPhoto = await getPhotoByIndex({
            location,
            decade,
            index: currentIndex + 1,
          })

          if (nextPhoto) {
            setPreloadedNextPhoto(nextPhoto)
          }
        }
      } catch (error) {
        console.error("Preload failed:", error)
      }
    }

    if (displayedPhoto && displayedPhoto !== initialPhoto) {
      preloadPhotos()
    }
  }, [
    displayedPhoto,
    location,
    decade,
    initialPhoto,
    currentIndex,
    resultCount,
  ])

  const handleSearch = async (params) => {
    const searchParamsChanged =
      !lastSearchParams ||
      params.location !== lastSearchParams.location ||
      params.decade !== lastSearchParams.decade

    console.log("Search params have changed, fetching result count...")
    if (searchParamsChanged) {
      let results = await getResultCount(params)
      setResultCount(results)
      setLastSearchParams(params)
    }

    setPreloadedPreviousPhoto(null)
    setPreloadedNextPhoto(null)
    setCurrentIndex(1)
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

      {displayedPhoto ? (
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
            <button
              onClick={handlePrevious}
              className="btn-primary"
              disabled={currentIndex <= 1 || isLoading}
            >
              Edellinen
            </button>
            <div className="flex w-32 justify-center">
              {currentIndex} / {Math.min(resultCount, 100000)}
            </div>
            <button
              onClick={() => {
                setDisplayedPhoto(null)
                handleNext()
              }}
              className="btn-primary"
              disabled={currentIndex === resultCount || isLoading}
            >
              Seuraava
            </button>
          </div>
          <div className="flex w-full justify-center">
            <button
              onClick={handleRandomPhoto}
              className="btn-primary px-6"
              disabled={isLoading}
            >
              <Shuffle />
            </button>
          </div>
        </div>
      )}

      {/* Hidden preloaded elements */}
      {preloadedPreviousPhoto && (
        <div className="hidden">
          <PhotoContainer photo={preloadedPreviousPhoto} />
        </div>
      )}

      {preloadedNextPhoto && (
        <div className="hidden">
          <PhotoContainer photo={preloadedNextPhoto} />
        </div>
      )}
    </div>
  )
}
