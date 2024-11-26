"use client"
import MultipleChoiceButtons from "@/components/Peli1/MultipleChoiceButtons"
import PhotoAndAnswersContainer from "@/components/Peli1/PhotoAndAnswersContainer"
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
      preloadNextPhoto()
    } else {
      nextPhoto = await getRandomPhoto({
        decade: decadeRange,
      })
      setIsFetching(false)
    }
    setCurrentPhoto(nextPhoto.records[0])
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

  return (
    <div className="flex items-center justify-center">
      <div className="m-4 flex flex-col items-center rounded-md bg-secondary p-6 shadow-lg">
        <PhotoAndAnswersContainer
          currentPhoto={currentPhoto}
          decadeRange={decadeRange}
          score={score}
          setScore={setScore}
          setAnswered={setAnswered}
        />

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

      {preloadedPhoto && (
        <div className="hidden">
          <Image
            src={preloadedPhoto && "https://www.finna.fi" + preloadedPhoto.records[0].images[0]}
            width={0}
            height={0}
            alt={""}
            priority
          />
        </div>
      )}
    </div>
  )
}
