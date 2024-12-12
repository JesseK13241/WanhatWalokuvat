"use client"
import Start from "@/app/pelit/peli2/Start"
import PhotoContainer from "@/components/PhotoContainer"
import Tulokset from "@/components/Results"
import { getRandomPhoto } from "@/services/photos"
import { useEffect, useState } from "react"

/**
 * Peli, jossa pitää arvata kumpi kahdesta kuvasta on vanhempi
 */
export default function Peli2() {
  const [leftPhoto, setLeftPhoto] = useState(null) // Vasen kuva
  const [rightPhoto, setRightPhoto] = useState(null) // Oikea kuva
  // Loading-muuttujia käytetään loading-spinnerin näyttämisessä, kun kuvaa ladataan
  const [preloadedLeft, setPreloadedLeft] = useState(null) // Esiladattu vasen kuva
  const [preloadedRight, setPreloadedRight] = useState(null) // Esiladattu oikea kuva
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
    fetchPreload() // Haetaan ensimmäiset kuvat
    setTotalRounds(params.rounds ?? 0) // Asetetaan kierrosten määrä
    setGrayscale(params.grayscale ?? false) // Asetetaan mustavalkoisuus (oletuksena false)
    setScore(0) // Nollataan pisteet
    setRoundNumber(1) // Asetetaan kierroksen numeroksi 1
    setStarted(true) // Merkataan started=true, jotta osataan palauttaa peli aloitussivun sijaan
    nextRound() // Aloitetaan 1. kierros
  }

  /**
   * Hakee uudet kuvat ja aloittaa uuden kierroksen
   */
  const nextRound = async () => {
    console.log("Current left:", leftPhoto, "right", rightPhoto)
    console.log("nextRound, left:", preloadedLeft, "right", preloadedRight)
    // Laitetaan kuvat nulliksi, jotta ne osataan useEffectissä korvata seuraavilla kuvilla
    setLeftPhoto(null)
    setRightPhoto(null)
    setAnswered(false) // Alustetaan peli tilaan, jossa pelaaja ei ole vastannut vielä
    setCorrectAnswer(false)
    console.log("Asetetaan kuvat:", preloadedLeft, preloadedRight)
  }

  /**
   * Tarkistaa ovatko pelin kuvat null ja jos ovat, tarkistaa ovatko esiladatut kuvat valmiit.
   * Jos esiladatut kuvat ovat valmiit, asetetaan ne pelin kuviksi ja esiladataan seuraavat.
   *
   * Funktiota kutsutaan aina, kun leftPhoto:n, rightPhoto:n, preloadedLeft:n tai preloadedRight:n
   * arvo muuttuu. Käytännössä siis kun pelin kuva asetetaan nulliksi (nextRoundissa), tarkistetaan
   * onko saatavilla esiladattuja kuvia. Jos esiladattu kuva tulee valmiiksi, tarkistetaan
   * onko peliin jo vastattu, jolloin pelin kuvat voi korvata esiladatuilla.
   */
  useEffect(() => {
    // Seuraava-painike klikattu
    if (started && leftPhoto == null && rightPhoto == null) {
      if (preloadedLeft && preloadedRight) {
        console.log("Asetetaan esiladatut kuvat")

        const newLeftPhoto = { ...preloadedLeft }
        const newRightPhoto = { ...preloadedRight }

        setLeftPhoto(newLeftPhoto)
        setRightPhoto(newRightPhoto)

        setPreloadedLeft(null)
        setPreloadedRight(null)

        fetchPreload().catch((error) => console.error("Preload failed:", error))
      } else {
        console.log("Odotetaan seuraavia kuvia...")
      }
    }
  }, [leftPhoto, rightPhoto, started, preloadedLeft, preloadedRight])

  /**
   * Hakee vanhemman kuvan ja asettaa sen vasemmaksi kuvaksi
   * (tai oikea, jos alternate order).
   * @param {import("react").Dispatch} setPhoto Funktio, jolla asetetaan kuva
   */
  const fetchOlder = async (setPhoto) => {
    const older = await getRandomPhoto({ decade: olderDecadeRange }) // Haetaan kuva
    console.log("Got newer photo:", older)
    older.isOlder = true // Asetetaan kuva-objectille attribuutti isOlder jotta tunnistetaan myöhemmin
    setPhoto(older) // Asetetaan kuva tilamuuttujaan
  }

  /**
   * Hakee uudemman kuvan ja asettaa sen oikean puoleiseksi kuvaksi
   * (tai vasen, jos alternate order).
   * @param {import("react").Dispatch} setPhoto Funktio, jolla asetetaan kuva
   */
  const fetchNewer = async (setPhoto) => {
    // Toiminta: katso fetchOlder() kommentit
    const newer = await getRandomPhoto({ decade: newerDecadeRange })
    console.log("Got older photo:", newer)
    newer.isOlder = false
    setPhoto(newer)
  }

  /**
   * Hakee taustalla seuraavat kuvat valmiiksi.
   */
  const fetchPreload = async () => {
    console.log("Preloading next photos...")
    const alternateOrder = Math.random() < 0.5
    const olderSetter = alternateOrder ? setPreloadedRight : setPreloadedLeft
    const newerSetter = alternateOrder ? setPreloadedLeft : setPreloadedRight

    await fetchNewer(newerSetter)
    console.log("Preloaded newer photo")

    await fetchOlder(olderSetter)
    console.log("Preloaded older photo")
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
    const isGameContinuing = totalRounds === 0 || roundNumber < totalRounds
    setRoundNumber((prevRound) => prevRound + 1)

    if (isGameContinuing) {
      nextRound()
    }
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

  return (
    <div className="mx-auto mt-10 flex max-w-screen-lg flex-col items-center">
      {!answered && (
        <p className="min-w-full rounded-xl bg-tertiary p-4 text-center font-bold">
          Klikkaa vanhempaa kuvaa
        </p>
      )}
      {answered && correctAnswer && (
        <p className="min-w-full rounded-xl bg-accent p-4 text-center font-bold">
          Vastasit oikein!
        </p>
      )}
      {answered && !correctAnswer && (
        <p className="min-w-full rounded-xl bg-red-400 p-4 text-center font-bold">
          Vastasit väärin!
        </p>
      )}
      <div className="mx-auto flex w-full flex-nowrap items-center justify-center gap-2 p-4">
        <PhotoContainer
          photo={leftPhoto}
          onClick={answered ? null :
            (handleSelectPhoto ? () => handleSelectPhoto(leftPhoto) : null)
          }
          grayscale={answered ? false : grayscale}
          useLoading={true}
          infoProps={{ showYear: answered }}
          showAltText={answered}
        />

        <PhotoContainer
          photo={rightPhoto}
          onClick={answered ? null : 
            (handleSelectPhoto ? () => handleSelectPhoto(rightPhoto) : null)
          }
          grayscale={answered ? false : grayscale}
          useLoading={true}
          infoProps={{ showYear: answered }}
          showAltText={answered}
        />
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
