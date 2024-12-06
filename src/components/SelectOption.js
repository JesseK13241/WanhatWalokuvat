/**
 * Komponentti, jolla voi valita arvon useasta vaihtoehdosta.
 * Käytetään esim. vuosiluvun valitsemisessa pelin aloitusnäkymässä.
 *
 * Params:
 * labelText    = Teksti, joka näytetään käyttäjälle. (esim. "Valitse vuosikymmen:")
 * options      = Select-komponentin sisältö (options-komponentit esim. <option value="1990">1990</option>)
 * defaultValue = Vaihtoehto, joka on oletuksena valittu
 * setValue     = Funktio, jolle annetaan parametrina käyttäjän valitsema vaihtoehto
 */
export default function SelectOption({
  labelText,
  options,
  defaultValue,
  setValue,
}) {
  return (
    <div className="flex w-64 justify-between">
      <label className="font-bold">{labelText}</label>
      <select
        className="mx-2 w-20 rounded bg-primary p-2 text-center shadow-sm"
        onChange={(e) => setValue(e.target.value)}
        defaultValue={defaultValue}
      >
        {options}
      </select>
    </div>
  )
}
