"use client"
import { useEffect, useState } from "react"

export default function MultipleChoiceButtons({
  correctYear,
  range,
  returnAnswer,
  disabled,
}) {
  const [currentAnswer, setCurrentAnswer] = useState(0)
  const [answers, setAnswers] = useState()

  useEffect(() => {
    setCurrentAnswer(0)
    generateAnswers()
  }, [correctYear])

  useEffect(() => {
    if (currentAnswer) {
      const correctAnswer = Math.floor(correctYear / 10) * 10
      returnAnswer(currentAnswer == correctAnswer)
    }
  }, [currentAnswer])

  const generateAnswers = () => {
    let newAnswers = [{}, {}, {}, {}]
    let correctDecade = Math.floor(correctYear / 10) * 10

    let [start, end] = range.split("-").map(Number)
    start = Math.max(start, correctDecade - 50)
    end = Math.min(end, correctDecade + 50)

    let possibleAnswers = []
    for (let i = start; i < end; i += 10) {
      if (i != correctDecade) possibleAnswers.push(i)
    }

    newAnswers[0].decade = correctDecade
    newAnswers[0].isCorrect = true

    for (let i = 1; i < 4; i++) {
      let j = Math.floor(Math.random() * possibleAnswers.length)
      let randomDecade = possibleAnswers[j]
      possibleAnswers.splice(j, 1)
      newAnswers[i].decade = randomDecade
      newAnswers[i].isCorrect = false
    }

    setAnswers(newAnswers)
  }

  const styles = {
    default:
      "border-primary border-2 rounded bg-primary px-4 py-2 enabled:hover:bg-tertiary enabled:hover:border-accent",
    correct:
      "font-bold border-black border-2 rounded bg-green-500 px-4 py-2 shadow-md",
    incorrect:
      "font-bold border-black border-2 rounded bg-red-500 px-4 py-2 shadow-md",
  }

  if (!answers) return <></>

  answers.forEach((a) => {
    if (currentAnswer && a.isCorrect) a.style = styles.correct
    else if (a.decade == currentAnswer) a.style = styles.incorrect
    else a.style = styles.default
  })

  return (
    <div className="flex items-center justify-center space-x-4">
      {answers
        .sort((a, b) => a.decade - b.decade)
        .map((answer, index) => (
          <button
            disabled={currentAnswer || disabled}
            key={index}
            onClick={() => setCurrentAnswer(answer.decade)}
            className={answer.style}
          >
            {answer.decade}
          </button>
        ))}
    </div>
  )
}

export function MultipleChoiceButtonsSkeleton() {
  const buttonSkeleton = (
    <button
      disabled
      className="border-primary border-2 rounded bg-primary px-4 py-2 enabled:hover:bg-tertiary enabled:hover:border-accent"
    >
      {"----"}
    </button>
  )

  return (
    <div className="flex items-center justify-center space-x-4">
      {buttonSkeleton}
      {buttonSkeleton}
      {buttonSkeleton}
      {buttonSkeleton}
    </div>
  )
}
