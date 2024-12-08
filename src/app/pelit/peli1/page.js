"use client"
import PhotoAndAnswersContainer from "@/app/pelit/peli1/PhotoAndAnswersContainer"
import Results from "@/components/Results"
import Peli1Skeleton from "@/app/pelit/peli1/Skeleton"
import Start from "@/app/pelit/peli1/Start"
import { getRandomPhoto, getResultCount } from "@/services/photos"
import Image from "next/image"
import { useEffect, useState } from "react"

import { BASE_URL } from "@/app/constants"
import { preload } from "react-dom"

export default function Peli1() {
  const [currentPhoto, setCurrentPhoto] = useState(null)
  const [decadeRange, setDecadeRange] = useState()
  const [roundNumber, setRoundNumber] = useState(0)
  const [totalRounds, setTotalRounds] = useState()
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [colorsOff, setColorsOff] = useState(false)
  const [resultCount, setResultCount] = useState(null)

  const [readyToFetch, setReadyToFetch] = useState(false)
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
      resultCountParam: resultCount,
    })
    setPreloadedPhoto(img)
  }

  const nextRound = async (source) => {
    console.log("nextRound, source: ", source)
    setCurrentPhoto(null)
    setAnswered(false)
  }

  useEffect(() => {
    if (currentPhoto == null && preloadedPhoto != null) {
      setCurrentPhoto(preloadedPhoto)
      setPreloadedPhoto(null)
      preloadNextPhoto()
    }
  }, [currentPhoto, preloadedPhoto])

  const setParams = async (decadeRange, rounds, colorsOff) => {
    setDecadeRange(decadeRange)
    setTotalRounds(rounds)
    setColorsOff(colorsOff)
    setReadyToFetch(true)
    const results = await getResultCount({ decade: decadeRange })
    setResultCount(results)
  }

  const handleNext = () => {
    setCurrentPhoto(null)
    setRoundNumber(roundNumber + 1)
    if (!totalRounds || roundNumber < totalRounds) {
      nextRound("handleNext")
    }
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

  const increaseScore = () => {
    setScore(score + 1)
  }

  if (roundNumber == 0) return <Start returnParams={setParams} />

  if (roundNumber > totalRounds && totalRounds)
    return (
      <Results
        score={score}
        totalRounds={totalRounds}
        restart={handleRestart}
        retry={handleRetry}
      />
    )

  if (currentPhoto == null) {
    return <Peli1Skeleton />
  }

  currentPhoto.author = Object.keys(currentPhoto.authors.primary)[0]

  var buildings = currentPhoto.buildings[0].translated
  for (let i = 1; i < currentPhoto.buildings.length; i++) {
    let building = currentPhoto.buildings[i].translated
    if (building) buildings = buildings + ", " + building
  }

  currentPhoto.building = buildings

  return (
    <div className="flex items-center justify-center border">
      <div className="m-4 flex w-screen max-w-2xl flex-col items-center rounded-md bg-secondary p-6 shadow-lg">
        <PhotoAndAnswersContainer
          currentPhoto={currentPhoto}
          decadeRange={decadeRange}
          onCorrectAnswer={increaseScore}
          answered={answered}
          setAnswered={setAnswered}
          colorsOff={colorsOff}
          handleNext={handleNext}
        />
      </div>

      {preloadedPhoto && (
        <Image
          src={BASE_URL + preloadedPhoto.images[0]}
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
