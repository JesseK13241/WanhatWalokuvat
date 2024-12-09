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
      <label className="relative mx-2 block h-8 w-14 border-2 border-accent cursor-pointer rounded-full bg-primary">
        <input
          defaultChecked={value}
          type="checkbox"
          className="peer sr-only"
          onChange={() => setValue(!value)}
        />
        <span className="absolute left-0.5 top-0.5 size-6 rounded-full bg-secondary peer-checked:left-7 peer-checked:bg-accent" />
      </label>
    </div>
  )
}
