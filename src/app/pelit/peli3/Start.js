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

  const [rounds, setRounds] = useState(0)
  const [isGrayscale, setIsGrayscale] = useState(false)

  return (
    <GameStartMenu
      name={"Arvaa vanhempi"}
      description={
        "Pelissä sinulle näytetään kolme kuvaa kerrallaan. Pelin tavoitteena " +
        "on valita kuva-vaihtoehdoista se, joka ainoana on otettu eri " +
        "vuosikymmeneltä. Halutessaan pelistä voi tehdä haastavamman" +
        "valitsemalla Piilota värit, jolloin kaikki kuvat " +
        "näytetään mustavalkoisina kunnes pelaaja on vastannut."
      }
      handleSubmit={handleSubmit}
    >
      <RoundsSelector rounds={rounds} setRounds={setRounds} />

      <GrayscaleToggle grayscale={isGrayscale} setGrayscale={setIsGrayscale} />
    </GameStartMenu>
  )
}
