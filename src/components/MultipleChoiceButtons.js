"use client"
import { useEffect, useState } from "react"

export default function MultipleChoiceButtons({ correctYear }) {
  const [currentAnswer, setCurrentAnswer] = useState(0)
  const [answers, setAnswers] = useState()

  useEffect(() => {
    generateAnswers()
  }, [])

  const generateAnswers = () => {
    var newAnswers = [{}, {}, {}, {}]
    const correctDecade = (Math.floor(correctYear / 10)) * 10

    var possibleAnswers = []
    for (let i = correctDecade - 50; i < correctDecade + 50; i += 10) {
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

  const styles = {
    default: "btn-secondary",
    correct: "btn-secondary hover:bg-green-100 bg-green-100",
    incorrect: "btn-secondary hover:bg-red-100 bg-red-100",
  }

  if (!answers) return <p>Loading..</p>

  answers.forEach((a) => {
    if (currentAnswer && a.isCorrect) a.style = "correct"
    else if (a.decade == currentAnswer) a.style = "incorrect"
    else a.style = "default"
  })

  return (
    <div className="flex justify-between space-x-4">
      {answers.map((answer) => (
        <button
          disabled={currentAnswer}
          key={answer.decade}
          onClick={() => setCurrentAnswer(answer.decade)}
          className={styles[answer.style]}
        >
          {answer.decade}
        </button>
      ))}
    </div>
    )
}