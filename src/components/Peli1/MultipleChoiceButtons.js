"use client"
import { useEffect, useState } from "react"

export default function MultipleChoiceButtons({ correctYear, range, returnAnswer }) {
  const [currentAnswer, setCurrentAnswer] = useState(0)
  const [answers, setAnswers] = useState()

  useEffect(() => {
    generateAnswers()
  }, [])

  useEffect(() => {
    if (currentAnswer) handleAnswer()
  }, [currentAnswer])

  const generateAnswers = () => {
    var newAnswers = [{}, {}, {}, {}]
    const correctDecade = Math.floor(correctYear / 10) * 10

    var [start, end] = range.split("-").map(Number)
    start = Math.max(start, correctDecade - 50)
    end = Math.min(end, correctDecade + 50)

    var possibleAnswers = []
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

    newAnswers.sort((a, b) => a.decade > b.decade)
    setAnswers(newAnswers)
  }

  const handleAnswer = () => {
    let correct = Math.floor(correctYear / 10) * 10
    let current = currentAnswer
    returnAnswer(current == correct)
  }

  const styles = {
    default: "btn-secondary disabled:hover:bg-primary bg-primary shadow-md",
    correct: "btn-secondary hover:bg-green-400 bg-green-400 border-none shadow-md",
    incorrect: "btn-secondary hover:bg-red-400 bg-red-400 border-none shadow-md",
  }

  if (!answers) return <></>

  answers.forEach((a) => {
    if (currentAnswer && a.isCorrect) a.style = styles.correct
    else if (a.decade == currentAnswer) a.style = styles.incorrect
    else a.style = styles.default
  })

  return (
    <div className="flex justify-center space-x-4">
      {answers.map((answer) => (
        <button
          disabled={currentAnswer}
          key={answer.decade}
          onClick={() => setCurrentAnswer(answer.decade)}
          className={answer.style}
        >
          {answer.decade}
        </button>
      ))}
    </div>
  )
}
