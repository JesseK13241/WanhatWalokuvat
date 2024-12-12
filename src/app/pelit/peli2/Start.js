import GameStartMenu from "@/components/GameStartMenu"
import GrayscaleToggle from "@/components/GrayscaleToggle"
import RoundsSelector from "@/components/RoundsSelector"
import { useState } from "react"

export default function Start({ initGameWithParams }) {
  const handleSubmit = () => {
    initGameWithParams({
      rounds: rounds,
      grayscale: isGrayscale,
    })
  }

  const [rounds, setRounds] = useState(7)
  const [isGrayscale, setIsGrayscale] = useState(false)

  return (
    <GameStartMenu
      name={"Arvaa vanhempi kuva"}
      description={`Tehtävänäsi on valita vanhin kuva kahdesta eri vaihtoehdosta.         
        Halutessasi pelistä voi tehdä haastavamman piilottamalla värit, 
        jolloin kuvat näytetään mustavalkoisina ennen vastausta.`}
      handleSubmit={handleSubmit}
    >
      <RoundsSelector rounds={rounds} setRounds={setRounds} />

      <GrayscaleToggle grayscale={isGrayscale} setGrayscale={setIsGrayscale} />
    </GameStartMenu>
  )
}
