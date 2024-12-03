"use client"
import PhotoAndAnswersContainer from "@/app/pelit/peli1/PhotoAndAnswersContainer"
import Tulokset from "@/components/Results"
import Skeleton from "@/app/pelit/peli1/Skeleton"
import Aloitus from "@/app/pelit/peli1/Start"
import PhotoInfo from "@/components/PhotoInfo"
import { getRandomPhoto } from "@/services/photos"
import Image from "next/image"
import { useEffect, useState } from "react"

import { BASE_URL } from "@/app/constants"

export default function Peli1() {
  const [currentPhoto, setCurrentPhoto] = useState()
  const [decadeRange, setDecadeRange] = useState()
  const [roundNumber, setRoundNumber] = useState(0)
  const [totalRounds, setTotalRounds] = useState()
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)

  const [readyToFetch, setReadyToFetch] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [preloadedPhoto, setPreloadedPhoto] = useState(null)

  useEffect(() => {
    if (readyToFetch) {
      nextRound("useEffect")
      setRoundNumber(1)
      preloadNextPhoto()
    }
  }, [readyToFetch])

  const preloadNextPhoto = async () => {
    const img = await getRandomPhoto({
      decade: decadeRange,
    })
    setPreloadedPhoto(img)
  }

  const nextRound = async (source) => {
    console.log("nextRound, source: ", source)
    setIsFetching(true)
    var nextPhoto
    if (preloadedPhoto) {
      nextPhoto = preloadedPhoto
      setIsFetching(false)
      setPreloadedPhoto(null)
      preloadNextPhoto()
    } else {
      nextPhoto = await getRandomPhoto({
        decade: decadeRange,
      })
      setIsFetching(false)
    }
    setCurrentPhoto(nextPhoto)
    setAnswered(false)
  }

  const setParams = (decadeRange, rounds) => {
    setDecadeRange(decadeRange)
    setTotalRounds(rounds)
    setReadyToFetch(true)
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
    return <Skeleton />
  }

  currentPhoto.author = Object.keys(currentPhoto.authors.primary)[0]

  var buildings = currentPhoto.buildings[0].translated
  for (let i = 1; i < currentPhoto.buildings.length; i++) {
    let building = currentPhoto.buildings[i].translated
    if (building) buildings = buildings + ", " + building
  }

  return (
    <div className="flex items-center justify-center">
      <div className="m-4 flex w-screen max-w-xl flex-col items-center rounded-md bg-secondary p-6 shadow-lg">
        <PhotoAndAnswersContainer
          currentPhoto={currentPhoto}
          decadeRange={decadeRange}
          score={score}
          setScore={setScore}
          answered={answered}
          setAnswered={setAnswered}
        />

        <button
          className="btn-primary mb-4 shadow-md"
          onClick={handleNext}
          disabled={!answered}
        >
          Seuraava
        </button>

        <PhotoInfo photo={currentPhoto} showYear={answered} />
      </div>

      {preloadedPhoto && (
        <Image
          src={BASE_URL + currentPhoto.images[0]}
          alt=""
          height={0}
          width={0}
          className="hidden"
          onLoad={console.log("preloaded")}
        />
      )}
    </div>
  )
}
