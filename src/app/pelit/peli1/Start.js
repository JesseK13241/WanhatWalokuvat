import GameStartMenu from "@/components/GameStartMenu"
import GrayscaleToggle from "@/components/GrayscaleToggle"
import RoundsSelector from "@/components/RoundsSelector"
import SelectOption from "@/components/SelectOption"
import { useState } from "react"

/**
 * Pelin aloitusnäkymä, jossa voi vaihtaa pelin asetuksia.
 * (Mistä vuosikymmenestä mihin vuosikymmeneen, kuinka monta kierrosta, jne.)
 *
 * Params:
 * returnParams = Funktio, jonka avulla asetukset palautetaan pelille.
 *                Funktiota kutsutaan, kun pelaaja valitsee "Aloita".
 *                returnParams(decadeRange, rounds, colorsOff)
 *                  decadeRange = vuosilukuhaarukka esim. 1950-2019
 *                  rounds      = pelattavien kierrosten määrä
 *                  colorsOff   = halutaanko kuvat mustavalkoisina (boolean)
 */
export default function Aloitus({ returnParams }) {
  const minDecade = 1860
  const currentDecade = Math.floor(new Date().getFullYear() / 10) * 10
  const [startDecade, setStartDecade] = useState(minDecade) // Minimivuosikymmen pelin kuville (oletuksena 1860)
  const [endDecade, setEndingDecade] = useState(currentDecade) // Maksimivuosikymmen pelin kuville (oletuksena kuluva vuosikymmen)
  const [rounds, setRounds] = useState(7) // Kierrosten määrä
  const [colorsOff, setColorsOff] = useState(false) // Halutaanko näyttää kaikki kuvat aluksi mustavalkoisina

  const decades = [] // Taulukko kaikille mahdollisille vuosikymmenille esim. [1860, 1870, ... , 2010, 2020]
  for (let a = minDecade; a <= currentDecade; a += 10) {
    decades.push(a)
  }

  /**
   * Funktio, jota kutsutaan, kun pelaaja valitsee "aloita"
   * Funktio muodostaa decadeRangen yhdistämällä start ja end vuosikymmenet
   * muotoon esim. 1950-2019
   * Tämän jälkeen kutsutaan returnParams pelaajan valitsemilla asetuksilla
   */
  const handleSubmit = async () => {
    const decadeRange = `${startDecade}-${Number(endDecade) + 9}`
    returnParams(decadeRange, rounds, colorsOff)
  }

  return (
    <GameStartMenu
      name={"Veikkaa vuosikymmen"}
      description={`Tehtävänäsi on arvata annetun valokuvan vuosikymmen neljästä vaihtoehdosta. 
        Jos määrittelet pelille kierrosmäärän, pelin lopussa näytetään oikeiden ja väärien
        vastausten lukumäärät. Haastetasoa voit kontrolloida rajaamalla vuosikymmenten väliä
        ja päättämällä piilotetaanko valokuvien värit.`}
      handleSubmit={handleSubmit}
    >
      {/* Valitaan vuosikymmenten alaraja: */}
      <SelectOption
        labelText={"Vuosikymmenestä:"}
        options={decades.map(
          // Vaihtoehdoksi annetaan vuosikymmenet siten, että väli on väh. 50 vuotta
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
      {/* Valitaan vuosikymmenten yläraja: */}
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
      {/* Valitaan pelattavien kierrosten määrä: */}
      <RoundsSelector rounds={rounds} setRounds={setRounds} />
      {/* Valitaan halutaanko kaikki kuvat mustavalkoisina: */}
      <GrayscaleToggle grayscale={colorsOff} setGrayscale={setColorsOff} />
    </GameStartMenu>
  )
}
