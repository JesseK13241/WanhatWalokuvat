import ToggleInput from "./ToggleInput"

/**
 * Komponentti, jolla voi valita näytetäänkö kuvat mustavalkoisina.
 *
 * Params:
 * grayscale    = Tämän hetkinen arvo muuttujalle grayscale (onko toggle valittuna)
 * setGrayscale = Funktio, jolla muuttujan arvoa muutetaan.
 *                Funktio saa parametrina käyttäjän valitseman arvon.
 */
export default function GrayscaleToggle({ grayscale, setGrayscale }) {
  return (
    <ToggleInput
      labelText={"Piilota värit"}
      value={grayscale}
      setValue={setGrayscale}
    />
  )
}
