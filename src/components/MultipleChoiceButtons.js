"use client"
import { useState } from "react"

export default function MultipleChoiceButtons({ answers }) {
  const [currentAnswer, setCurrentAnswer] = useState(0)

  const styles = {
    default: "btn-secondary",
    correct: "btn-secondary hover:bg-green-100 bg-green-100",
    incorrect: "btn-secondary hover:bg-red-100 bg-red-100",
  }

  answers.forEach((a) => {
    if (currentAnswer && a.isCorrect) a.style = "correct"
    else if (a.decade == currentAnswer) a.style = "incorrect"
    else a.style = "default"
  })

  return (
    <div className="m-4 grid grid-cols-2 gap-4">
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