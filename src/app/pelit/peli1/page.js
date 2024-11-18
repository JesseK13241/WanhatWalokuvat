"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getPhotos } from "@/services/photos"
import MultipleChoiceButtons from "@/components/Peli1/MultipleChoiceButtons"
import Skeleton from "@/components/Peli1/Skeleton"
import Aloitus from "@/components/Peli1/Aloitus"
import Tulokset from "@/components/Peli1/Tulokset"

export default function Peli1() {
  const [currentPhoto, setCurrentPhoto] = useState()
  const [decadeRange, setDecadeRange] = useState()
  const [roundNumber, setRoundNumber] = useState(0)
  const [totalRounds, setTotalRounds] = useState()
  const [answered, setAnswered] = useState(false)

  const [readyToFetch, setReadyToFetch] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [imageLoading, setImageLoading] = useState(true)

  useEffect(() => {
    if (readyToFetch) nextRound()
  }, [readyToFetch])

  const nextRound = async () => {
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
    setRoundNumber(roundNumber + 1)
    setAnswered(false)
    setLoading(false)
    setImageLoading(true)
  }

  const setParams = (start, end, rounds) => {
    setDecadeRange(`${start}-${end+9}`)
    setTotalRounds(rounds)
    setReadyToFetch(true)
  }

  const handleAnswer = () => {
    setAnswered(true)
  }

  const handleNext = () => {
    if (totalRounds == 0) nextRound()
    if (roundNumber < totalRounds) nextRound()
    else setRoundNumber(roundNumber + 1)
  }

  if (roundNumber == 0) 
    return <Aloitus returnParams={setParams}/>

  if (roundNumber > totalRounds && totalRounds != 0) 
    return <Tulokset/>

  if (isLoading) return <Skeleton />

  const imageUrl = currentPhoto && 
    "https://www.finna.fi" + currentPhoto.images[0]


  currentPhoto.author = Object.keys(currentPhoto.authors.primary)[0]
  currentPhoto.building = currentPhoto.buildings[0].translated

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="mt-4">
        <Image
          src={imageUrl}
          alt={currentPhoto.title}
          width={0}
          height={0}
          sizes="100vw"
          className={imageLoading ? "h-0" : "h-80 w-auto object-cover"}
          onLoad={() => setImageLoading(false)}
          priority
        />
        {imageLoading && (
          <div className="size-80 animate-pulse rounded bg-gray-200" />
        )}
      </div>

      <div>
        <MultipleChoiceButtons
          correctYear={currentPhoto.year ? currentPhoto.year : undefined}
          returnAnswer={handleAnswer}
        />
      </div>

      <button 
        className="btn-primary" 
        onClick={() => handleNext()}
        disabled={!answered}>
        Seuraava
      </button>

      <div className="mx-4 mb-4 text-center">
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
  )
}
