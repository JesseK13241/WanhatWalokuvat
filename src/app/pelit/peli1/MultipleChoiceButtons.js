"use client"
import { useEffect, useState } from "react"

/**
 * Komponentti, joka pitää sisällään 4 vaihtoehtoa kuvan vuosikymmenelle.
 *
 * Params:
 * correctYear  = Valokuvan oikea vuosi
 * range        = Vuosikymmenten haarukka (esim. 1950-2010) jolta vastausvaihtoehdot valitaan
 * returnAnswer = Funktio, joka saa parametriksi true, jos vastaus oli oikein ja false, jos väärin
 * disabled     = Totuusarvo, jos true, vaihtoehtoja ei voi klikata (nappien disabled-property)
 */
export default function MultipleChoiceButtons({
  correctYear,
  range,
  returnAnswer,
  disabled,
}) {
  const [currentAnswer, setCurrentAnswer] = useState(0) // Pelaajan valitseman vaihtoehdon vuosikymmen
  const [answers, setAnswers] = useState() // Vastausvaihtoehdot taulukossa

  // Kutsutaan, kun correctYear-muuttujan arvo päivittyy (eli aloitetaan uusi kierros)
  useEffect(() => {
    setCurrentAnswer(0) // Nollataan valittu vastaus (pelaaja ei ole valinnut mitään)
    generateAnswers() // Generoidaan uudet vastausvaihtoehdot
  }, [correctYear])

  // Kutsutaan, kun currentAnswer-muuttujan arvo päivittyy (esim. kun pelaaja vastaa)
  useEffect(() => {
    if (currentAnswer) {
      // Javascriptissa 0 evaluoituu falseksi, eli tarkistetaan onko vastattu (currentAnswer != 0)
      const correctAnswer = Math.floor(correctYear / 10) * 10 // Vuosikymmen, jolle kuvan vuosi kuuluu
      returnAnswer(currentAnswer == correctAnswer) // Tarkistetaan oliko vastaus sama vuosikymmen
    }
  }, [currentAnswer])

  /**
   * Generoi vastausvaihtoehdot ja asettaa ne tilamuuttujaan answers
   */
  const generateAnswers = () => {
    let newAnswers = [{}, {}, {}, {}] // Taulukko vastauksille
    let correctDecade = Math.floor(correctYear / 10) * 10 // Kuvan oikea vuosikymmen

    let [start, end] = range.split("-").map(Number) // Erotetaan range-muuttujasta min ja max vuosikymmen
    start = Math.max(start, correctDecade - 50) // Vaihtoehdot max 50 vuotta oikeasta vaihtoehdosta
    end = Math.min(end, correctDecade + 50)

    // Laitetaan taulukkoon kaikki mahdolliset vuosikymmenvaihtoehdot +-50 vuotta oikeasta
    let possibleAnswers = []
    for (let i = start; i < end; i += 10) {
      if (i != correctDecade) possibleAnswers.push(i) // Jätetään oikea vaihtoehto pois
    }

    // Asetetaan vastaustaulukon ensimmäiseksi oikea vastaus
    newAnswers[0].decade = correctDecade
    newAnswers[0].isCorrect = true

    // Arvotaan 3 kertaa satunnainen vastausvaihtoehto,
    // poistetaan se mahdollisista vastausvaihtoehdoista ja lisätään varsinaisiin vaihtoehtoihin
    for (let i = 1; i < 4; i++) {
      let j = Math.floor(Math.random() * possibleAnswers.length)
      let randomDecade = possibleAnswers[j]
      possibleAnswers.splice(j, 1)
      newAnswers[i].decade = randomDecade
      newAnswers[i].isCorrect = false
    }
    // Asetetaan generoidut vastausvaihtoehdot muuttujaan answers
    setAnswers(newAnswers)
  }

  // Tyyli vastauksille
  const styles = {
    default:
      "border-primary border-2 rounded bg-primary px-4 py-2 enabled:hover:bg-tertiary enabled:hover:border-accent",
    correct:
      "font-bold border-black border-2 rounded bg-green-500 px-4 py-2 shadow-md",
    incorrect:
      "font-bold border-black border-2 rounded bg-red-500 px-4 py-2 shadow-md",
  }

  // Jos vastausvaihtoehtoja ei ole, palautetaan tyhjä
  if (!answers) return <></>

  answers.forEach((a) => {
    if (currentAnswer && a.isCorrect) a.style = styles.correct
    else if (a.decade == currentAnswer) a.style = styles.incorrect
    else a.style = styles.default
  })

  return (
    <div className="flex items-center justify-center space-x-4">
      {answers
        .sort((a, b) => a.decade - b.decade)
        .map((answer, index) => (
          <button
            disabled={currentAnswer || disabled}
            key={index}
            onClick={() => setCurrentAnswer(answer.decade)}
            className={answer.style}
          >
            {answer.decade}
          </button>
        ))}
    </div>
  )
}

export function MultipleChoiceButtonsSkeleton() {
  const buttonSkeleton = (
    <button
      disabled
      className="rounded border-2 bg-primary text-primary px-4 py-2"
    >
      <span className="text-primary text-opacity-0">____</span>
    </button>
  )

  return (
    <div className="flex items-center justify-center space-x-4">
      {buttonSkeleton}
      {buttonSkeleton}
      {buttonSkeleton}
      {buttonSkeleton}
    </div>
  )
}
