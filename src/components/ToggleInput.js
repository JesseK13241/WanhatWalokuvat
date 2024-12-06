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
      <label
        className="relative mx-2 block h-8 w-14 cursor-pointer rounded-full bg-primary"
        htmlFor="bwInput"
      >
        <input
          defaultChecked={value}
          id="bwInput"
          type="checkbox"
          className="peer sr-only"
          onChange={() => setValue(!value)}
        />
        <span className="absolute left-1 top-1 size-6 rounded-full bg-white transition peer-checked:left-7 peer-checked:bg-accent" />
      </label>
    </div>
  )
}