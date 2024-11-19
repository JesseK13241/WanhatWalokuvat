"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getPhotos } from "@/services/photos"
import MultipleChoiceButtons from "@/components/Peli1/MultipleChoiceButtons"
import Skeleton from "@/components/Peli1/Skeleton"
import Aloitus from "@/components/Peli1/Start"
import Tulokset from "@/components/Peli1/Results"

export default function Peli1() {
  const [currentPhoto, setCurrentPhoto] = useState()
  const [decadeRange, setDecadeRange] = useState()
  const [roundNumber, setRoundNumber] = useState(0)
  const [totalRounds, setTotalRounds] = useState()
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)


  const [readyToFetch, setReadyToFetch] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [imageLoading, setImageLoading] = useState(true)

  useEffect(() => {
    if (readyToFetch) {
      nextRound("useEffect")
      setRoundNumber(1)
    }
  }, [readyToFetch])

  const nextRound = async (source) => {
    console.log("nextRound, source: ", source)
    setLoading(true)
    var results = await getPhotos({
      limit: 0,
      decade: decadeRange
    })
    var n = Math.floor(Math.random() * Math.min(results.resultCount, 100000))
    var nextPhoto = await getPhotos({
      page: n,
      limit: 1,
      decade: decadeRange
    })
    setCurrentPhoto(nextPhoto.records[0])
    setAnswered(false)
    setLoading(false)
    setImageLoading(true)
  }

  const setParams = (start, end, rounds) => {
    setDecadeRange(`${start}-${end+9}`)
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

  if (roundNumber == 0) 
    return <Aloitus returnParams={setParams}/>

  if (roundNumber > totalRounds && totalRounds) 
    return <Tulokset score={score} totalRounds={totalRounds} restart={handleRestart} retry={handleRetry}/>

  if (isLoading) return <Skeleton />

  const imageUrl = currentPhoto && 
    "https://www.finna.fi" + currentPhoto.images[0]


  currentPhoto.author = Object.keys(currentPhoto.authors.primary)[0]

  var buildings = currentPhoto.buildings[0].translated
  for (let i = 1; i < currentPhoto.buildings.length; i++) {
    let building = currentPhoto.buildings[i].translated
    if (building) buildings = buildings + ", " + building
  }

  currentPhoto.title = currentPhoto.title.replace(/\(?\d{4}\)?/, "")
  currentPhoto.building = buildings
   
  return (
    <div className="flex justify-center">
      <div className="m-4 flex flex-col items-center space-y-4 rounded bg-secondary p-4">
        <Image
          src={imageUrl}
          alt={currentPhoto.title}
          width={0}
          height={0}
          sizes="100vw"
          className={imageLoading ? "h-0" : "h-80 w-auto object-cover rounded"}
          onLoad={() => setImageLoading(false)}
          priority
        />
        {imageLoading && (
          <div className="size-80 animate-pulse rounded bg-gray-200" />
        )}
    
        <MultipleChoiceButtons
          correctYear={currentPhoto.year ? currentPhoto.year : undefined}
          range={decadeRange}
          returnAnswer={handleAnswer}
        />

        <button 
          className="btn-primary" 
          onClick={() => handleNext()}
          disabled={!answered}>
          Seuraava
        </button>

        <div className="w-80 rounded bg-primary text-center p-2">
          {currentPhoto.location && <p> Location: {currentPhoto.location} </p>}
          {currentPhoto.title && <p> Title: {currentPhoto.title} </p>}
          {currentPhoto.author && <p> Author: {currentPhoto.author} </p>}
          {currentPhoto.building && <p> Building: {currentPhoto.building} </p>}
          <a
            href={"https://www.finna.fi" + currentPhoto.recordPage}
            className="text-blue-600 visited:text-purple-600 hover:underline"
          >
            Linkki aineistoon
          </a>
        </div>
      </div>
    </div>
  )
}
