"use client"
import Image from "next/image"
import { useState } from "react"

export default function Slideshow({ photos }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const IMAGE_BASE_URL = "https://www.finna.fi/Cover/Show?id="

  if (!photos?.length) {
    return <p>No photos found</p>
  }

  console.log(`Rendering Slideshow with ${photos.length} photos..`)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0))
  }

  const currentPhoto = photos[currentIndex]
  const imageUrl = `${IMAGE_BASE_URL}${encodeURIComponent(currentPhoto.id)}`

  console.log("Current photo:", currentPhoto)

  currentPhoto.author = Object.keys(currentPhoto.authors.primary)[0]
  currentPhoto.building = currentPhoto.buildings[0].translated

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrevious}
          className="btn-secondary"
        >
          Previous
        </button>

        <div className="text-sm">
          {currentIndex + 1} / {photos.length}
        </div>

        <button
          onClick={handleNext}
          className="btn-secondary"
        >
          Next
        </button>
      </div>

      <div className="flex justify-center bg-slate-800">
        <Image
          src={imageUrl}
          alt={photos[currentIndex].title}
          width={0}
          height={0}
          className="h-80 w-auto object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <div className="space-y-2 text-center">
        {currentPhoto.year && <p> Year: {currentPhoto.year} </p>}
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
