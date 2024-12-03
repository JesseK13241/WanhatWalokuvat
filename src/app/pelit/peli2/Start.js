import { useState } from "react"

export default function Start({ initGameWithParams }) {
  const handleSubmit = () => {
    initGameWithParams({
      rounds: rounds,
    })
  }

  const [rounds, setRounds] = useState(0)

  return (
    <div className="flex items-center justify-center">
      <form className="m-4 flex w-96 flex-col items-center space-y-4 rounded-md bg-secondary p-4 text-center shadow-lg">
        <h1 className="font-bold">Peli2</h1>
        <p className="rounded border bg-primary p-2 shadow-md">
          Pelissä sinulle näytetään kaksi kuvaa kerrallaa. Pelin tavoitteena on
          valita kuva-vaihtoehdoista vanhempi. Kuvan iällä tarkoitetaan vuotta,
          jolloin kuva on otettu.
        </p>

        <div className="flex w-64 justify-between">
          <label className="font-bold" htmlFor="roundInput">
            Kierroksia:
          </label>
          <input
            name="roundInput"
            className="mx-2 w-20 rounded border bg-primary p-1 text-center shadow-sm"
            type="number"
            value={rounds}
            onChange={(e) => {
              if (e.target.value >= 0) setRounds(e.target.valueAsNumber)
            }}
          />
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
