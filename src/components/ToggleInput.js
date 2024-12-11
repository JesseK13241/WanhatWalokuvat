import { useState } from "react"

/**
 * Komponentti, jolla voi valita booleanin arvon.
 * Käytetään esim. pelin asetuksissa valitsemaan näytetäänkö kuvat mustavalkoisina.
 *
 * Params:
 * labelText = Asetuksen nimi (teksti, joka näytetään käyttäjälle)
 * value     = Asetettava tilamuuttuja
 * setValue  = Funktio, jolla tilamuuttujan arvoa muutetaan.
 *             Funktio saa parametrina käyttäjän valitseman arvon.
 */
export default function ToggleInput({ labelText, value, setValue }) {
  return (
    <div className="flex w-64 justify-between font-bold">
      {labelText}
      <label htmlFor="toggleSwitch" className={`relative mx-2 block h-8 w-14 cursor-pointer rounded-full ${value ? "bg-green-500" : "bg-red-500"}`}>
        <input
          id="toggleSwitch"
          defaultChecked={value}
          type="checkbox"
          className="peer sr-only"
          onChange={() => setValue(!value)}
        />
        <span className="absolute left-1 top-1 size-6 rounded-full bg-primary shadow-md peer-checked:left-7" />
      </label>
    </div>
  )
}
