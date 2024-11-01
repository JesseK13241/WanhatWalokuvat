"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import MultipleChoiceButtons from "@/components/MultipleChoiceButtons"

export default function Peli1() {
  const [correctAnswer, setCorrectAnswer] = useState(1990)
  
  const answers = [
    { decade: 1950, isCorrect: false },
    { decade: 1970, isCorrect: true  },
    { decade: 1990, isCorrect: false },
    { decade: 2010, isCorrect: false }
]

  const handleClick = () => {
    setCorrectAnswer(correctAnswer + 1)
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

      <MultipleChoiceButtons 
        key={correctAnswer}
        answers={answers}
      />
      
      <button
       className="btn-primary"
       onClick={() => handleClick()}>
        Uusi kierros
      </button>
    </div>
  )
}
