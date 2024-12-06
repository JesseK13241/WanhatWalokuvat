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
    <div className="flex items-center justify-center">
      <form className="m-4 flex w-96 flex-col items-center space-y-4 rounded-md bg-secondary p-4 text-center shadow-lg">
        <h1 className="font-bold">Veikkaa vuosikymmen</h1>
        <p className="rounded border bg-primary p-2 shadow-md">
          Pelin tavoitteena on arvata vuosikymmen, jolla annettu kuva on otettu.
          Sinulle annetaan neljä vastausvaihtoehtoa ja tehtävänäsi on valita
          niistä oikea. Kun kaikki kierrokset on pelattu, näytetään tulokset.
          Voit itse valita kierrosmäärän, sekä rajata vuosiväliä. Jos haluat
          pelata ilman kierroksia valitse kierrosten määräksi nolla.
          Lisähaastetta saat piilottamalla värit.
        </p>

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

        <button
          type="button"
          onClick={handleSubmit}
          className="btn-primary shadow-md"
        >
          Aloita
        </button>
      </form>
    </div>
  )
}
