"use client"
import PhotoAndAnswersContainer from "@/app/pelit/peli1/PhotoAndAnswersContainer"
import Results from "@/components/Results"
import Peli1Skeleton from "@/app/pelit/peli1/Skeleton"
import Start from "@/app/pelit/peli1/Start"
import { getPhotoByIndex, getResultCount } from "@/services/photos"
import Image from "next/image"
import { useEffect, useState } from "react"

import { BASE_URL } from "@/app/constants"

/**
 * Peli, jossa pelaajan pitää arvata miltä vuosikymmeneltä satunnainen kuva on.
 */
export default function Peli1() {
  const [currentPhoto, setCurrentPhoto] = useState(null) // Pelaajalle näytetäävä kuva (asetetaan null, jos kuvaa haetaan)
  const [decadeRange, setDecadeRange] = useState() // Vuosilukuhaarukka, jolta satunnaisia kuvia haetaan
  const [roundNumber, setRoundNumber] = useState(0) // Tämänhetkisen kierroksen numero. 1 = ensimmäinen kierros
  const [totalRounds, setTotalRounds] = useState() // Pelattavien kierrosten määrä (lopetetaan, kun tämä määrä kierroksia tulee täyteen)
  const [score, setScore] = useState(0) // Pelaajan pisteet (oikeasta arvauksesta saa 1 pisteen, väärästä 0)
  const [answered, setAnswered] = useState(false) // Onko pelaaja vastannut tällä kierroksella
  const [colorsOff, setColorsOff] = useState(false) // Näytetäänkö kaikki kuvat mustavalkoisina haasteen lisäämiseksi
  const [resultCount, setResultCount] = useState(null) // Löytyneiden hakutulosten (kuvien) määrä hakuparametreilla

  const [readyToFetch, setReadyToFetch] = useState(false) // Onko peli valmis hakemaan ensimmäisen kuvan
  const [preloadedPhoto, setPreloadedPhoto] = useState(null) // Seuraavan kierroksen kuva, joka haetaan valmiiksi

  // Funktio, jota kutsutaan, kun muuttujan readyToFetch arvo muuttuu.
  // Käytännössä funktiota kutsutaan ja if-lauseen sisältö suoritetaan,
  // kun asetetaan setReadyToFetch(true), eli kun peli on valmis aloitettavaksi.
  // Funktio aloittaa pelin
  useEffect(() => {
    if (readyToFetch) {
      nextRound("useEffect") // aloitetaan seuraava (ensimmäinen) kierros
      setRoundNumber(1) // Asetetaan kierroksen numero
      preloadNextPhoto() // Haetaan taustalla valmiiksi ensimmäinen kuva
    }
  }, [readyToFetch])

  /**
   * Hakee seuraavan kierroksen kuvan ja asetttaa sen muuttujaan preloadedPhoto
   */
  const preloadNextPhoto = async () => {
    // Asetetaan hakuun randomIndex (random kokonaisluku, mutta korkeintaan tulosten määrä tai 100 000)
    // 100 000 on rajapinnan kautta kerralla haettavien sivujen (kuvien) lukumäärä
    var randomIndex = resultCount
    if (!resultCount) randomIndex = 10000
    randomIndex = Math.ceil(Math.random() * Math.min(randomIndex, 100000))
    const img = await getPhotoByIndex({
      decade: decadeRange,
      index: randomIndex,
    })
    setPreloadedPhoto(img)
  }

  /**
   * Aloittaa seuraavan kierroksen asettamalla näytettävän kuvan nulliksi
   */
  const nextRound = async (source) => {
    console.log("nextRound, source: ", source)
    setCurrentPhoto(null)
    setAnswered(false)
  }

  // Funktiota kutsutaan, kun tämänhetkinen kuva tai seuraavan kierroksen kuva päivittyy
  //
  // Jos siis seuraavaa kuvaa ladataan vielä, currentPhoto on null kunnes preloadedPhoto saadaan ladattua.
  // PreloadedPhoton latauduttua se asetetaan currentPhotoon.
  // Jos preloadedPhoto on jo valmiina, kun currentPhoto asetetaan nulliksi (eli seuraava kierros),
  // preloadedPhoto asetetaan suoraan currentPhotoon.
  // Näiden jälkeen aletaan taustalla hakea seuraavaa preloadedPhotoa.
  useEffect(() => {
    if (currentPhoto == null && preloadedPhoto != null) {
      setCurrentPhoto(preloadedPhoto)
      setPreloadedPhoto(null)
      preloadNextPhoto()
    }
  }, [currentPhoto, preloadedPhoto])

  /**
   * Asetetaan pelin parametrit (vuosikymmenhaarukka, kierrosten määrä, mustavalkokuvat?).
   * Tätä kutsutaan Start-komponentista kun pelaaja aloittaa pelin.
   */
  const setParams = async (decadeRange, rounds, colorsOff) => {
    setDecadeRange(decadeRange)
    setTotalRounds(rounds)
    setColorsOff(colorsOff)
    setReadyToFetch(true) // Asetetaan readyToFetch, mikä taas aloittaa ensimmäisen kierroksen
    // Haetaan resultCount, jotta sitä ei tarvitse jokaisen kuvan kohdalla erikseen hakea.
    const resultCount = await getResultCount({ decade: decadeRange })
    setResultCount(resultCount)
  }

  /**
   * Tarkistaa ollaanko viimeisessä kierroksessa ja jos ei,
   * kutsuu nextRound ja aloittaa seuraavan kierroksen.
   * Tätä kutsutaan, kun pelaaja valitsee "seuraava"
   */
  const handleNext = () => {
    setCurrentPhoto(null)
    setRoundNumber(roundNumber + 1)
    if (!totalRounds || roundNumber < totalRounds) {
      nextRound("handleNext")
    }
  }

  /**
   * Nollaa pelin ja asettaa pelin takaisin aloitusnäkymään, jossa voi vaihtaa asetuksia.
   * Kutsutaan, kun pelaaja painaa tulosnäkymässä "Palaa alkuun"
   */
  const handleRestart = () => {
    setRoundNumber(0)
    setReadyToFetch(false)
  }

  /**
   * Nollaa pisteet ja kierrokset ja aloittaa pelin uudestaan kierroksesta 1.
   * Asetukset pidetään samoina.
   * Kutsutaan, kun pelaaja painaa tulosnäkymässä "Pelaa uudestaan"
   */
  const handleRetry = () => {
    setRoundNumber(1)
    setScore(0)
    nextRound("handleRetry")
  }

  /**
   * Kasvattaa pisteitä yhdellä. Kutsutaan kun pelaaja vastaa oikein.
   */
  const increaseScore = () => {
    setScore(score + 1)
  }

  // Palautetaan alkuvalikko
  if (roundNumber == 0) return <Start returnParams={setParams} />

  // Jos ollaan saavutettu pelattavien kierrosten määrä, näytetään tulokset
  if (roundNumber > totalRounds && totalRounds)
    return (
      <Results
        score={score}
        totalRounds={totalRounds}
        restart={handleRestart}
        retry={handleRetry}
      />
    )

  // Jos kuvaa ladataan, näytetään latauskomponentti
  if (currentPhoto == null) {
    return <Peli1Skeleton />
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <PhotoAndAnswersContainer
        currentPhoto={currentPhoto}
        decadeRange={decadeRange}
        onCorrectAnswer={increaseScore}
        answered={answered}
        setAnswered={setAnswered}
        colorsOff={colorsOff}
        handleNext={handleNext}
      />

      {preloadedPhoto && (
        <Image
          src={BASE_URL + preloadedPhoto.images[0]}
          alt=""
          height={0}
          width={0}
          className="hidden"
          onLoad={console.log("preloaded")}
        />
      )}
    </div>
  )
}
