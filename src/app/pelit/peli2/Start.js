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
    <div className="flex items-center justify-center">
      <form className="m-4 flex w-96 flex-col items-center space-y-4 rounded-md bg-secondary p-4 text-center shadow-lg">
        <h1 className="font-bold">Peli2</h1>
        <p className="rounded border bg-primary p-2 shadow-md">
          Pelissä sinulle näytetään kaksi kuvaa kerrallaa. Pelin tavoitteena on
          valita kuva-vaihtoehdoista vanhempi. Kuvan iällä tarkoitetaan vuotta,
          jolloin kuva on otettu. Halutessaan pelistä voi tehdä haastavamman
          valitsemalla Piilota värit, jolloin kaikki kuvat näytetään
          mustavalkoisina kunnes pelaaja on vastannut.
        </p>

        <RoundsSelector rounds={rounds} setRounds={setRounds} />

        <GrayscaleToggle
          grayscale={isGrayscale}
          setGrayscale={setIsGrayscale}
        />

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
