/**
 * Komponentti, jolla voi valita pelin kierrosten määrän.
 *
 * Params:
 * rounds    = Tällä hetkellä valittu kierrosten määrä.
 * setRounds = Funktio, jolla asetetaan uusi kierrosten määrä,
 *             kun valittu kierrosten määrä muuttuu.
 *             Funktio saa parametrina uuden kierrosten määrän.
 */
export default function RoundsSelector({ rounds, setRounds }) {
  const handleChange = (e) => {
    let value = parseInt(e.target.value)
    if (!value) setRounds(0)
    if (value >= 0) {
      e.target.value = value
      setRounds(value)
    }
  }

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
        onChange={(e) => handleChange(e)}
        onFocus={(e) => e.target.select()}
      />
    </div>
  )
}
