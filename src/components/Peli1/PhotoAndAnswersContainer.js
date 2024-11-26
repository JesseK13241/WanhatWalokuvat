import React, { useState } from "react";
import Image from "next/image";
import MultipleChoiceButtons from "./MultipleChoiceButtons";

export default function PhotoAndAnswersContainer({ currentPhoto, decadeRange, setScore, score, setAnswered }) {
  const [imageLoading, setImageLoading] = useState(true)

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1)
    setAnswered(true)
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
    <div className="flex flex-col gap-4">
      <Image
        src={imageUrl}
        alt={currentPhoto.title}
        width={0}
        height={0}
        sizes="100vw"
        className={imageLoading ? "h-0" : "h-80 w-auto rounded object-cover shadow-md"}
        onLoad={() => setImageLoading(false)}
        priority
      />
      {imageLoading && (
        <div className="size-80 animate-pulse rounded bg-gray-100" />
      )}

      <div className="mb-4">
        <MultipleChoiceButtons
          correctYear={currentPhoto.year}
          range={decadeRange}
          returnAnswer={handleAnswer}
        />
      </div>
    </div>
  )
}