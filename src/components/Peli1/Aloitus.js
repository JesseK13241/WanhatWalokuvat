import { useState } from "react";

export default function Aloitus({ returnParams }) {
  const [startDecade, setStartDecade] = useState(1800)
  const [endDecade, setEndingDecade] = useState(Math.floor(new Date().getFullYear() / 10) * 10)
  const [rounds, setRounds] = useState(0)


  const currentDecade = Math.floor(new Date().getFullYear() / 10) * 10
  const decades = []
  for (let a = 1800; a <= currentDecade; a += 10) {
    decades.push(a) 
  }

  const handleSubmit = () => {
    returnParams(startDecade, endDecade, rounds)
  } 

  return (
    <div className="m-2 flex justify-center">
      <form className="flex w-96 flex-col items-center space-y-4 rounded border p-4 text-center">
        <h1>Peli1</h1>
        <p className="rounded border p-2">
          Pelin tavoitteena on arvata vuosikymmen, jolla annettu kuva on otettu.
          Sinulle annetaan neljä vastausvaihtoehtoa ja tehtävänäsi on valita niistä oikea.
          Kun kaikki kierrokset on pelattu, näytetään tulokset.
          Voit itse valita kierrosmäärän, sekä rajata vuosiväliä. 
          Jos haluat pelata ilman kierroksia valitse kierrosten määräksi nolla.
        </p>

        <label>
          Vuosikymmenestä: 
          <select name="startSelect" className="mx-2 rounded p-2"
            onChange={(e) => setStartDecade(parseInt(e.target.value))}>
            {decades.map((decade, index) => 
              decade < Math.min(currentDecade - 40, endDecade - 40) &&
                <option key={index} value={decade}>
                  {decade} 
                </option>
            )}
          </select>
        </label>

        <label>
          Vuosikymmeneen:
          <select name="endSelect" className="mx-2 rounded p-2"
            defaultValue={endDecade}
            onChange={(e) => setEndingDecade(e.target.value)}>
            {decades.map((decade, index) => 
              decade > startDecade + 40 &&
                <option key={index} value={decade}>
                  {decade} 
                </option>
            )}
          </select>
        </label>

        <label>
          Kierroksia:
          <input name="roundInput" 
            className="mx-2 w-16 rounded border p-2 text-center"
            type="number"
            value={rounds}
            onChange={(e) => {
              if (e.target.value >= 0) setRounds(e.target.valueAsNumber)
            }}
          />
        </label>
        
        <button type="button" onClick={handleSubmit} className="btn-primary">
          Aloita
        </button>

      </form>
    </div>
  )
}