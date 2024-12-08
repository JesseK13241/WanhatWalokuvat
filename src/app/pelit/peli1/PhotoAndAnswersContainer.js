import { BASE_URL } from "@/app/constants"
import Image from "next/image"
import { useState } from "react"
import MultipleChoiceButtons from "./MultipleChoiceButtons"
import PhotoContainer from "@/components/PhotoContainer"
import PhotoInfo from "@/components/PhotoInfo"

export default function PhotoAndAnswersContainer({
  currentPhoto,
  decadeRange,
  setScore,
  score,
  answered,
  setAnswered,
  colorsOff,
  handleNext,
}) {
  const [imageLoading, setImageLoading] = useState(true)
  const [readyToAnswer, setReadyToAnswer] = useState(false)

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1)
    setAnswered(true)
    setReadyToAnswer(false)
  }

  const onLoad = () => {
    setImageLoading(false)
    setReadyToAnswer(true)
  }

  const imageUrl = currentPhoto && BASE_URL + currentPhoto.images[0]

  return (
    <PhotoContainer
      photo={currentPhoto}
      onLoad={onLoad}
      className="flex flex-col gap-4 bg-secondary px-2 shadow-none"
    >
      <div className="mb-4">
        <MultipleChoiceButtons
          correctYear={currentPhoto.year}
          range={decadeRange}
          returnAnswer={handleAnswer}
          disabled={!readyToAnswer}
        />
      </div>
      <button
        className="btn-primary mx-auto mb-4 shadow-md"
        onClick={handleNext}
        disabled={!answered}
      >
        Seuraava
      </button>
      <PhotoInfo photo={currentPhoto} showYear={answered} />
    </PhotoContainer>
  )

  // Ei käytössä:
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
            : `h-80 w-auto rounded bg-tertiary object-contain shadow-md ${
                colorsOff ? (answered ? "" : "grayscale") : ""
              }`
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
