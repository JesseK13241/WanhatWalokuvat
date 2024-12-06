import RoundsSelector from "@/components/RoundsSelector"
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

        <div className="flex w-64 justify-between">
          <label className="font-bold" htmlFor="startSelect">
            Vuosikymmenestä:
          </label>
          <select
            name="startSelect"
            className="mx-2 w-20 rounded bg-primary p-2 text-center shadow-sm"
            onChange={(e) => setStartDecade(parseInt(e.target.value))}
          >
            {decades.map(
              (decade, index) =>
                decade < Math.min(currentDecade - 40, endDecade - 40) && (
                  <option key={index} value={decade}>
                    {decade}
                  </option>
                )
            )}
          </select>
        </div>

        <div className="flex w-64 justify-between">
          <label className="font-bold" htmlFor="endSelect">
            Vuosikymmeneen:
          </label>
          <select
            name="endSelect"
            className="mx-2 w-20 rounded bg-primary p-2 text-center shadow-sm"
            defaultValue={endDecade}
            onChange={(e) => setEndingDecade(parseInt(e.target.value))}
          >
            {decades.map(
              (decade, index) =>
                decade > startDecade + 40 && (
                  <option key={index} value={decade}>
                    {decade}
                  </option>
                )
            )}
          </select>
        </div>

        <RoundsSelector rounds={rounds} setRounds={setRounds} />

        <div className="flex w-64 justify-between font-bold">
          Piilota värit:
          <label
            className="relative mx-2 block h-8 w-14 cursor-pointer rounded-full bg-primary"
            htmlFor="bwInput"
          >
            <input
              defaultChecked={colorsOff}
              id="bwInput"
              type="checkbox"
              className="peer sr-only"
              onChange={() => setColorsOff(!colorsOff)}
            />
            <span className="absolute left-1 top-1 size-6 rounded-full bg-white transition peer-checked:left-7 peer-checked:bg-accent" />
          </label>
        </div>

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
