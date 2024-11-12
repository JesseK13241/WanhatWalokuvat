"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { getPhotos } from "@/services/photos"
import MultipleChoiceButtons from "@/components/MultipleChoiceButtons"
import Peli1Skeleton from "@/components/Peli1Skeleton"

export default function Peli1() {
  const [currentPhoto, setCurrentPhoto] = useState()
  const [isLoading, setLoading] = useState(true)
  const [imageLoading, setImageLoading] = useState(true)

  useEffect(() => {
    nextRound()
  }, [])

  const nextRound = async () => {
    setLoading(true)
    var results = await getPhotos({
      limit: 0,
    })
    var n = Math.floor(Math.random() * Math.min(results.resultCount, 100000))
    var nextPhoto = await getPhotos({
      page: n,
      limit: 1,
    })
    setCurrentPhoto(nextPhoto.records[0])
    setLoading(false)
    setImageLoading(true)
  }

  if (isLoading) return <Peli1Skeleton />

  const imageUrl = currentPhoto
    ? "https://www.finna.fi/Cover/Show?id=" +
      encodeURIComponent(currentPhoto.id)
    : null

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
          correctYear={currentPhoto.year ? currentPhoto.year : nextRound()}
        />
      </div>

      <button className="btn-primary" onClick={nextRound}>
        Uusi kierros
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
