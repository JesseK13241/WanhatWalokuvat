import GameStartMenu from "@/components/GameStartMenu"
import GrayscaleToggle from "@/components/GrayscaleToggle"
import RoundsSelector from "@/components/RoundsSelector"
import SelectOption from "@/components/SelectOption"
import { useState } from "react"

export default function Aloitus({ returnParams }) {
  const minDecade = 1860
  const [startDecade, setStartDecade] = useState(minDecade)
  const [endDecade, setEndingDecade] = useState(
    Math.floor(new Date().getFullYear() / 10) * 10
  )
  const [rounds, setRounds] = useState(0)
  const [colorsOff, setColorsOff] = useState(false)

  const currentDecade = Math.floor(new Date().getFullYear() / 10) * 10
  const decades = []
  for (let a = minDecade; a <= currentDecade; a += 10) {
    decades.push(a)
  }

  const handleSubmit = async () => {
    const decadeRange = `${startDecade}-${Number(endDecade) + 9}`
    returnParams(decadeRange, rounds, colorsOff)
  }

  return (
    <GameStartMenu
      name={"Veikkaa vuosikymmen"}
      description={
        `Tehtävänäsi on arvata annetun valokuvan vuosikymmen neljästä vaihtoehdosta. 
        Jos määrittelet pelille kierrosmäärän, pelin lopussa näytetään oikeiden ja väärien
        vastausten lukumäärät. Haastetasoa voit kontrolloida rajaamalla vuosikymmenten väliä
        ja päättämällä piilotetaanko valokuvien värit.`
      }
      handleSubmit={handleSubmit}
    >
      <SelectOption
        labelText={"Vuosikymmenestä:"}
        options={decades.map(
          (decade, index) =>
            decade < Math.min(currentDecade - 40, endDecade - 40) && (
              <option key={index} value={decade}>
                {decade}
              </option>
            )
        )}
        defaultValue={minDecade}
        setValue={(value) => setStartDecade(parseInt(value))}
      />

      <SelectOption
        labelText={"Vuosikymmeneen:"}
        options={decades.map(
          (decade, index) =>
            decade > startDecade + 40 && (
              <option key={index} value={decade}>
                {decade}
              </option>
            )
        )}
        defaultValue={endDecade}
        setValue={(value) => setEndingDecade(parseInt(value))}
      />

      <RoundsSelector rounds={rounds} setRounds={setRounds} />

      <GrayscaleToggle grayscale={colorsOff} setGrayscale={setColorsOff} />
    </GameStartMenu>
  )
}
