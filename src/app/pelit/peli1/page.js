"use client"
import MultipleChoiceButtons from "@/components/Peli1/MultipleChoiceButtons"
import Tulokset from "@/components/Peli1/Results"
import Skeleton from "@/components/Peli1/Skeleton"
import Aloitus from "@/components/Peli1/Start"
import { getRandomPhoto } from "@/services/photos"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Peli1() {
  const [currentPhoto, setCurrentPhoto] = useState()
  const [decadeRange, setDecadeRange] = useState()
  const [roundNumber, setRoundNumber] = useState(0)
  const [totalRounds, setTotalRounds] = useState()
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)

  const [readyToFetch, setReadyToFetch] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [imageLoading, setImageLoading] = useState(true)
  const [preloadedImage, setPreloadedImage] = useState(null)

  useEffect(() => {
    if (readyToFetch) {
      nextRound("useEffect")
      setRoundNumber(1)
      preloadNextImage()
    }
  }, [readyToFetch])

  useEffect(() => {
    console.log("isFetching: ", isFetching)
  }, [isFetching])

  useEffect(() => {
    console.log("imageLoading: ", imageLoading)
  }, [imageLoading])

  useEffect(() => {
    console.log("answered: ", answered)
  })

  const preloadNextImage = async () => {
    console.log("Preloading new image...")
    const img = await getRandomPhoto({
      decade: decadeRange,
    })
    setPreloadedImage(img)
    console.log("Image preloaded")
  }

  const nextRound = async (source) => {
    console.log("nextRound, source: ", source)
    setIsFetching(true)
    var nextPhoto
    if (false){//preloadedImage != null) {
      console.log("Using preloaded image:", preloadedImage)
      nextPhoto = preloadedImage
      setPreloadedImage(null)
      setIsFetching(false)
      preloadNextImage()
    } else {
      console.log("No preloaded photo. Fetcing...")
      nextPhoto = await getRandomPhoto({
        decade: decadeRange,
      })
      console.log("Photo fetched")
      setIsFetching(false)
    }
    setCurrentPhoto(nextPhoto.records[0])
    setAnswered(false)
    setImageLoading(true)
  }

  const setParams = (decadeRange, rounds) => {
    setDecadeRange(decadeRange)
    setTotalRounds(rounds)
    setReadyToFetch(true)
  }

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1)
    setAnswered(true)
  }

  const handleNext = () => {
    setRoundNumber(roundNumber + 1)
    if (!totalRounds) nextRound("handleNext")
    else if (roundNumber < totalRounds) nextRound("handleNext")
  }

  const handleRestart = () => {
    setRoundNumber(0)
    setReadyToFetch(false)
  }

  const handleRetry = () => {
    setRoundNumber(1)
    setScore(0)
    nextRound("handleRetry")
  }

  if (roundNumber == 0) return <Aloitus returnParams={setParams} />

  if (roundNumber > totalRounds && totalRounds)
    return (
      <Tulokset
        score={score}
        totalRounds={totalRounds}
        restart={handleRestart}
        retry={handleRetry}
      />
    )

  if (isFetching) {
    console.log("return skeleton")
    return <Skeleton />
  } 

  const imageUrl =
    currentPhoto && "https://www.finna.fi" + currentPhoto.images[0]

  currentPhoto.author = Object.keys(currentPhoto.authors.primary)[0]

  var buildings = currentPhoto.buildings[0].translated
  for (let i = 1; i < currentPhoto.buildings.length; i++) {
    let building = currentPhoto.buildings[i].translated
    if (building) buildings = buildings + ", " + building
  }

  return (
    <div className="flex items-center justify-center">
      <div className="m-4 flex flex-col items-center rounded-md bg-secondary p-6 shadow-lg">
        <div className="mb-4">
          <Image
            src={imageUrl}
            alt={currentPhoto.title}
            width={0}
            height={0}
            sizes="100vw"
            className={
              imageLoading
                ? "h-0"
                : "h-80 w-auto rounded object-cover shadow-md"
            }
            onLoad={() => setImageLoading(false)}
            priority
          />
          {imageLoading && (
            <div className="size-80 animate-pulse rounded bg-gray-100" />
          )}
        </div>

        <div className="mb-4">
          <MultipleChoiceButtons
            correctYear={currentPhoto.year ? currentPhoto.year : undefined}
            range={decadeRange}
            returnAnswer={handleAnswer}
          />
        </div>

        <button
          className="btn-primary mb-4 shadow-md"
          onClick={handleNext}
          disabled={!answered}
        >
          Seuraava
        </button>

        <div className="w-80 rounded bg-primary p-2 text-center shadow-md">
          {currentPhoto.title && answered && (
            <p className="font-bold"> {currentPhoto.title} </p>
          )}
          {currentPhoto.author && <p> Tekijä: {currentPhoto.author} </p>}
          {currentPhoto.building && (
            <p> Organisaatio: {currentPhoto.building} </p>
          )}
          {answered && (
            <a
              href={"https://www.finna.fi" + currentPhoto.recordPage}
              className="text-blue-600 visited:text-purple-600 hover:underline"
            >
              Linkki aineistoon
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
