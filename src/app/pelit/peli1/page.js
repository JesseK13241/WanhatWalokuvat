"use client"
import Image from "next/image"
import { useState } from "react"

export default function Peli1() {
  const [correctAnswer, setCorrectAnswer] = useState(2000)
  const [currentAnswer, setCurrentAnswer] = useState(0)

  const styles = {
    basic: "px-4 py-2 border rounded hover:bg-gray-100",
    correct: "px-4 py-2 border rounded bg-green-100",
    incorrect: "px-4 py-2 border rounded bg-red-100",
  }

  const answers = [
    { year: 1900, style: "basic" },
    { year: 1950, style: "basic" },
    { year: 2000, style: "basic" },
    { year: 2050, style: "basic" },
  ]

  if (currentAnswer != 0) {
    answers.forEach((a) => {
      if (a.year == correctAnswer) a.style = "correct"
      else if (a.year == currentAnswer) a.style = "incorrect"
    })
  }

  const handleClick = (answer) => {
    setCurrentAnswer(answer)
    setTimeout(() => {
      setCurrentAnswer(0)
    }, 3000)
  }

  return (
    <div className="flex flex-col px-10 text-center">
      <h1 className="m-4 font-bold">Peli 1</h1>
      <div className="flex justify-center">
        <Image
          src={
            "https://api.finna.fi/Cover/Show?source=Solr&id=sls.SLSA%2B367_SLSA%2B367%253A5%253A5%253A5.1&index=0&size=large"
          }
          alt={"Albert Edelfelt"}
          height={500}
          width={500}
        />
      </div>

      <div className="m-4 grid grid-cols-2 gap-4">
        {answers.map((answer) => (
          <button
            key={answer.year}
            onClick={() => handleClick(answer.year)}
            className={styles[answer.style]}
          >
            {answer.year}
          </button>
        ))}
      </div>
    </div>
  )
}
