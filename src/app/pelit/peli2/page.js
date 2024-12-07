"use client"
import Start from "@/app/pelit/peli2/Start"
import PhotoContainer from "@/components/PhotoContainer"
import PhotoInfo from "@/components/PhotoInfo"
import Tulokset from "@/components/Results"
import getRandomPhoto from "@/services/photos"
import { useState } from "react"

// Loading-componentti, joka näytetään photocontainerin tilalla, jos kuva vielä lataa
const PhotoContainerSkeleton = () => (
  <div>
    <div className="m-1 size-72 animate-pulse rounded bg-gray-300" />
    <div className="m-1 h-14 w-72 rounded bg-gray-300" />
  </div>
)

/**
 *
 */
export default function Peli2() {
  const [leftPhoto, setLeftPhoto] = useState(null) // Vasen kuva
  const [rightPhoto, setRightPhoto] = useState(null) // Oikea kuva
  const [answered, setAnswered] = useState(false) // Onko pelaaja vastannut
  const [correctAnswer, setCorrectAnswer] = useState(false) // Onko vastaus oikein
  const [started, setStarted] = useState(false) // Onko peli aloitettu
  const [roundNumber, setRoundNumber] = useState(0) // Tämän kierroksen numero
  const [totalRounds, setTotalRounds] = useState(0) // Kuinka monta kierrosta pelataan (0=loputtomasti)
  const [grayscale, setGrayscale] = useState(false) // Määrää näytetäänkö kaikki kuva mustavalkoisina
  const [score, setScore] = useState(0) // Kuinka monta kertaa pelaaja on vastannut oikein

  const startYear = 1880 // Minimivuosi
  const currentYear = new Date().getFullYear() // Tämä vuosi (maksimiarvo kuvan vuodelle)
  // Vanhempi kuva arvotaan splitDecade:a vanhemmista ja uudempi uudemmista kuvista
  // Jos startYear=1920 ja currentYear=2014, splitDecade on joku seuraavista:
  // [1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000]
  // Kuvat arvotaan niin, että jos splitDecade=1950, vanhempi kuva < 1950 ja uudempi > 1959
  // Näin kuvien vuosilla on vähintään 10 vuoden ero
  const splitYear = // Satunnainen vuosi väliltä [startYear+10, currentYear-11] (-11, koska Math.floor)
    Math.floor(Math.random() * (currentYear - startYear - 20)) + startYear + 10
  const splitDecade = splitYear - (splitYear % 10) // Vuosikymmenen alkuvuosi (esim. 1980 -> 1980-1989)
  const olderDecadeRange = `${startYear}-${splitDecade - 1}`
  const newerDecadeRange = `${splitDecade + 10}-${currentYear}`

  /**
   * Asettaa pelille valitut asetukset ja aloittaa pelin.
   * Kutsutaan, kun aloitusvalikossa valitaan "aloita".
   * Funktiota kutsutaan aloitusvalikko(Start)-komponentissa.
   * @param {Object} params Objekti, joka sisältää aloitusvalikossa valitut asetukset.
   */
  const startGame = (params) => {
    setTotalRounds(params.rounds ?? 0) // Asetetaan kierrosten määrä
    setGrayscale(params.grayscale ?? false)
    setScore(0) // Nollataan pisteet
    setRoundNumber(1) // Asetetaan kierroksen numeroksi 1
    setStarted(true) // Merkataan started=true, jotta osataan palauttaa peli aloitussivun sijaan
    nextRound() // Aloitetaan 1. kierros
  }

  /**
   * Hakee uudet kuvat ja aloittaa uuden kierroksen
   */
  const nextRound = async () => {
    setLeftPhoto(null) // Alustetaan kuvat null, jotta löydetään virheet helpommin
    setRightPhoto(null)
    setAnswered(false) // Alustetaan peli tilaan, jossa pelaaja ei ole vastannut vielä
    setCorrectAnswer(false)

    const alternateOrder = Math.random() < 0.5 // Arvotaan totuusarvo n. 50% - 50% todennäköisyydellä

    // Haetaan kuvat (await Promise.all odottaa, kunnes kummatkin kuvat on haettu)
    await Promise.all([fetchOlder(alternateOrder), fetchNewer(alternateOrder)])
  }

  /**
   * Hakee vanhemman kuvan ja asettaa sen vasemmaksi kuvaksi
   * (tai oikea, jos alternate order).
   * @param {Boolean} alternateOrder Jos true, asetetaan vanhempi kuva oikealle, muuten vasemmalle
   */
  const fetchOlder = async (alternateOrder) => {
    const older = await getRandomPhoto({ decade: olderDecadeRange }) // Haetaan kuva
    older.isOlder = true // Asetetaan kuva-objectille attribuutti isOlder jotta tunnistetaan myöhemmin
    alternateOrder ? setRightPhoto(older) : setLeftPhoto(older) // Asetetaan kuva tilamuuttujaan
  }

  /**
   * Hakee uudemman kuvan ja asettaa sen oikean puoleiseksi kuvaksi
   * (tai vasen, jos alternate order).
   * @param {Boolean} alternateOrder Jos true, asetetaan uudempi kuva vasemmalle, muuten oikealle
   */
  const fetchNewer = async (alternateOrder) => {
    // Toiminta: katso fetchOlder() kommentit
    const newer = await getRandomPhoto({ decade: newerDecadeRange })
    newer.isOlder = false
    alternateOrder ? setLeftPhoto(newer) : setRightPhoto(newer)
  }

  /**
   * Pelaaja klikkaa vasenta kuvaa. Muutetaan peli tilaan, jossa pelaaja on vastannut.
   * Tarkistetaan oliko vastaus oikein ja näytetään tulos (oikein vai väärin).
   */
  const handleSelectPhoto = (photo) => {
    setAnswered(true) // Asetetaan, jotta tiedetään pelaajan vastanneen
    if (photo.isOlder) {
      setScore(score + 1) // Jos oikea vastaus, score += 1
      setCorrectAnswer(true) // Ja merkitään pelaajan vastanneen oikein
    }
  }

  /**
   * Tarkistaa ollaanko pelattu kaikki kierrokset ja jos ei, aloittaa seuraavan.
   * Kutsutaan, kun pelaaja painaa Seuraava-nappia.
   */
  const handleNext = () => {
    setRoundNumber(roundNumber + 1) // Kasvatetaan kierroksen numeroa yhdellä
    if (totalRounds == 0 || roundNumber < totalRounds) nextRound()
  }

  /**
   * Nollaa pelin ja asettaa pelin takaisin aloitusnäkymään, jossa voi vaihtaa asetuksia.
   * Kutsutaan, kun pelaaja painaa tulosnäkymässä "Palaa alkuun"
   */
  const handleRestart = () => {
    setRoundNumber(0) // Nollataan kierroksen numero ja pisteet
    setScore(0)
    setStarted(false) // Pelin tila: ei aloitettu -> pelaajalle näytetään aloitusnäkymä
  }

  /**
   * Nollaa pisteet ja kierrokset ja aloittaa pelin uudestaan kierroksesta 1.
   * Asetukset pidetään samoina.
   * Kutsutaan, kun pelaaja painaa tulosnäkymässä "Pelaa uudestaan"
   */
  const handleRetry = () => {
    startGame({ rounds: totalRounds })
  }

  // Tyylit, joilla näytetään onko vastaus oikein (vanhempi kuva).
  const styles = {
    correct:
      "text-center font-bold border-black border-2 rounded-md bg-green-500 px-8 py-4 mb-2 shadow-md",
    incorrect:
      "text-center font-bold border-black border-2 rounded-md bg-red-500 px-8 py-4 mb-2 shadow-md",
    neutral:
      "text-center font-bold border-black border-2 rounded-md bg-gray-500 px-8 py-4 mb-2 shadow-md",
  }

  // Jos peliä ei ole aloitettu, palautetaan pelin aloitusnäkymä (Start-komponentti)
  if (!started) {
    return <Start initGameWithParams={startGame} />
  }

  // Jos ollaan pelattu aikaisemmin asetettu kierrosten määrä, palautetaan tulosnäkymä.
  // Jos pelattavien kierrosten määräksi on asetettu 0, peliä voi jatkaa loputtomasti.
  if (totalRounds != 0 && roundNumber > totalRounds) {
    return (
      <Tulokset
        score={score}
        totalRounds={totalRounds}
        restart={handleRestart}
        retry={handleRetry}
      />
    )
  }

  // Jos jompikumpi kuvista ei ole vielä ladannut, palautetaan loading-komponentti (skeleton)
  if (leftPhoto == null || rightPhoto == null) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex justify-center text-xl">
          <p className="mt-4 rounded-xl p-4">Klikkaa vanhempaa kuvaa</p>
        </div>
        <div className="flex flex-wrap justify-center p-4 pb-14">
          <PhotoContainerSkeleton />
          <PhotoContainerSkeleton />
        </div>
        <button className="btn-primary mb-4 p-4 px-6 shadow-md" disabled>
          Seuraava
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center px-40">
      <div className="w-full pb-14">
        <div className="flex items-center justify-center text-xl">
          {!answered && (
            <p className="mt-4 rounded-xl bg-tertiary p-4">
              Klikkaa vanhempaa kuvaa
            </p>
          )}
          {answered && correctAnswer && (
            <p className="mt-4 rounded-xl bg-accent p-4">Vastasit oikein!</p>
          )}
          {answered && !correctAnswer && (
            <p className="mt-4 rounded-xl bg-red-400 p-4">Vastasit väärin!</p>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-10 p-4">
          <div className="flex-1 border">
            <div className="m-auto flex w-max border">
              {answered ? (
                <div
                  className={
                    leftPhoto.isOlder ? styles.correct : styles.incorrect
                  }
                >
                  {leftPhoto.year}
                </div>
              ): <div className={styles.neutral}>Vuosi</div>}
            </div>
            <PhotoContainer
              photo={leftPhoto}
              onClick={() => handleSelectPhoto(leftPhoto)}
              infoElem={<PhotoInfo photo={leftPhoto} showYear={answered} />}
              grayscale={answered ? false : grayscale}
            />
          </div>
          <div className="flex-1 border">
            <div className="m-auto flex w-max border">
              {answered ? (
                <div
                  className={
                    rightPhoto.isOlder ? styles.correct : styles.incorrect
                  }
                >
                  {rightPhoto.year}
                </div>
              ) : <div className={styles.neutral}>Vuosi</div>}
            </div>
            <PhotoContainer
              photo={rightPhoto}
              onClick={() => handleSelectPhoto(rightPhoto)}
              infoElem={<PhotoInfo photo={rightPhoto} showYear={answered} />}
              grayscale={answered ? false : grayscale}
            />
          </div>
        </div>
      </div>
      <button
        className="btn-primary mb-4 p-4 px-6 shadow-md"
        onClick={handleNext}
        disabled={!answered}
      >
        Seuraava
      </button>
    </div>
  )
}
