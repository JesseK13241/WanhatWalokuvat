/**
 * Komponentti, jolla voi valita pelin kierrosten määrän.
 *
 * Params:
 * rounds    = Tällä hetkellä valittu kierrosten määrä.
 * setRounds = Funktio, jolla asetetaan uusi kierrosten määrä,
 *             kun valittu kierrosten määrä muuttuu.
 */
export default function RoundsSelector({ rounds, setRounds }) {
  return (
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
  )
}
