"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { getPhotos } from "@/services/photos"
import MultipleChoiceButtons from "@/components/MultipleChoiceButtons"

export default function Peli1() {
  const [currentPhoto, setCurrentPhoto] = useState()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    nextRound()
  }, [])

  const nextRound = async () => {
    setLoading(true)
    var results = await getPhotos({
      limit: 0
    })
    var n = Math.floor(Math.random() * Math.min(results.resultCount, 100000))
    var nextPhoto = await getPhotos({
      page: n,
      limit: 1
    })
    setCurrentPhoto(nextPhoto.records[0])
    setLoading(false)
  }

  const answers = [
    { decade: 1950, isCorrect: false },
    { decade: 1970, isCorrect: true  },
    { decade: 1990, isCorrect: false },
    { decade: 2010, isCorrect: false }
  ]

  if (isLoading) return <p>Loading...</p>
  const imageUrl = "https://www.finna.fi/Cover/Show?id=" + encodeURIComponent(currentPhoto.id)

  return (
    <div className="flex flex-col text-center">
      <h1 className="m-4 font-bold">Peli 1</h1>
      <div className="flex justify-center"> 
        <Image
            src={imageUrl}
            alt={currentPhoto.title}
            width={500}
            height={500}
            sizes="100vw"
            priority
          />
      </div>
     
      <div className="flex justify-center">
        <MultipleChoiceButtons 
            answers={answers}
        />
      </div>

      <div className="flex justify-center">
        <button
          className="btn-primary"
          onClick={nextRound}>
            Uusi kierros
        </button>
      </div>
    </div>
  )
}
