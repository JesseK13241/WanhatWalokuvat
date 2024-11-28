import React, { useState } from "react"
import Image from "next/image"
import MultipleChoiceButtons from "./MultipleChoiceButtons"

export default function PhotoAndAnswersContainer({
  currentPhoto,
  decadeRange,
  setScore,
  score,
  setAnswered,
}) {
  const [imageLoading, setImageLoading] = useState(true)
  const [readyToAnswer, setReadyToAnswer] = useState(false)

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1)
    setAnswered(true)
    setReadyToAnswer(false)
  }

  const imageUrl =
    currentPhoto && "https://www.finna.fi" + currentPhoto.images[0]

  return (
    <div className="flex flex-col gap-4 px-2">
      <Image
        src={imageUrl}
        alt={currentPhoto.title}
        width={0}
        height={0}
        sizes="100vw"
        className={
          imageLoading
            ? "h-0"
            : "h-80 w-auto rounded bg-tertiary object-contain shadow-md"
        }
        onLoad={() => {
          setImageLoading(false)
          setReadyToAnswer(true)
        }}
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
          disabled={!readyToAnswer}
        />
      </div>
    </div>
  )
}