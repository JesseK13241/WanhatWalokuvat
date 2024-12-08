import { BASE_URL } from "@/app/constants"
import { useState } from "react"
import MultipleChoiceButtons from "./MultipleChoiceButtons"
import PhotoContainer from "@/components/PhotoContainer"
import PhotoInfo from "@/components/PhotoInfo"

/**
 * Komponentti, joka pitää sisällään kuvan, vuosilukuvaihtoehdot
 * "seuraava"-napin ja kuvan tiedot.
 *
 * Params:
 * currentPhoto    = Tämän kierroksen kuva
 * decadeRange     = Pelin vuosilukurange (vuosilukuväli, jolta kuvia haetaan)
 * onCorrectAnswer = Funktio, jota kutsutaan kun pelaaja vastaa oikein. (Käytetään esim. pisteiden asettamiseen)
 * answered        = Tilamuuttuja, joka kertoo onko pelaaja vastannut tällä kierroksella
 * setAnswered     = Funktio, jolla answered-muuttujan tilaa muutetaan
 * colorsOff       = Totuusarvo, halutaanko näyttää kaikki kuvat mustavalkoisina ennen vastaamista.
 * handleNext      = Funktio, jota kutsutaan, kun pelaaja on vastannut ja painaa "seuraava"
 */
export default function PhotoAndAnswersContainer({
  currentPhoto,
  decadeRange,
  onCorrectAnswer,
  answered,
  setAnswered,
  colorsOff,
  handleNext,
}) {
  const [readyToAnswer, setReadyToAnswer] = useState(false) // Kertoo voidaanko pelaajan antaa vastata

  /**
   * Kutsutaan, kun pelaaja arvaa kuvan vuosilukua.
   * @param {Boolean} isCorrect - Vastasiko pelaaja väärin
   */
  const handleAnswer = (isCorrect) => {
    if (isCorrect) onCorrectAnswer() // Kutsutaan onCorrectAnswer, jos vastaus oli oikein
    setAnswered(true) // Merkataan vastatuksi
    setReadyToAnswer(false) // Ei voi vastata uudelleen
  }

  /**
   * Kutsutaan, kun kuva saadaan ladattua
   */
  const onLoad = () => {
    setReadyToAnswer(true) // Merkataan, että pelaaja voi vastata
  }

  const imageUrl = currentPhoto && BASE_URL + currentPhoto.images[0]

  return (
    <PhotoContainer
      photo={currentPhoto}
      onLoad={onLoad}
      className="flex flex-col gap-4 bg-secondary px-2 shadow-none"
      grayscale={answered ? false : colorsOff}
    >
      <div className="mb-4">
        <MultipleChoiceButtons
          correctYear={currentPhoto.year}
          range={decadeRange}
          returnAnswer={handleAnswer}
          disabled={!readyToAnswer}
        />
      </div>
      <button
        className="btn-primary mx-auto mb-4 shadow-md"
        onClick={handleNext}
        disabled={!answered}
      >
        Seuraava
      </button>
      <PhotoInfo photo={currentPhoto} showYear={answered} />
    </PhotoContainer>
  )
}
