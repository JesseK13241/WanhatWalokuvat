"use client"
import Start from "@/app/pelit/peli3/Start"
import { useState } from "react"

export default function Peli3() {
  const [started, setStarted] = useState(false)
  const [roundNumber, setRounds] = useState(0)
  const [totalRounds, setTotalRounds] = useState(0)

  const startGame = (params) => {
    setTotalRounds(params.rounds)
    setStarted(true)
  }

  const endGame = () => {
    setStarted(false)
  }

  if (!started) {
    return <Start initGameWithParams={startGame} />
  }

  return (
    <div>
      <h1>Peli on käynnissä</h1>
      <button onClick={endGame}>Lopeta Peli</button>
    </div>
  )
}
