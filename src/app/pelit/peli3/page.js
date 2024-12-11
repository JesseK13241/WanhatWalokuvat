"use client"
import Start from "@/app/pelit/peli3/Start"
import PhotoContainer from "@/components/PhotoContainer"
import Tulokset from "@/components/Results"
import { getRandomPhoto } from "@/services/photos"
import { useState } from "react"

export default function Peli3() {
  const [firstPhoto, setFirstPhoto] = useState(null) // Ensimmäinen kuva
  const [secondPhoto, setSecondPhoto] = useState(null) // Toinen kuva
  const [thirdPhoto, setThirdPhoto] = useState(null) // Kolmas kuva
  const [answered, setAnswered] = useState(false) // Onko vastattu
  const [correct, setCorrect] = useState(0) // Onko vastaus oikein
  const [started, setStarted] = useState(false) // Onko peli aloitettu
  const [roundNumber, setRounds] = useState(0) // Kierroksen numero
  const [totalRounds, setTotalRounds] = useState(0) // Pelattavien kierrosten määrä
  const [grayscale, setGrayscale] = useState(false) // Onko kuvat mustavalkoisia
  const [score, setScore] = useState(0) // Oikein vastattujen määrä

  const startYear = 1880 // Minimiarvoksi kuvien vuodelle
  const currentYear = new Date().getFullYear() // Maksimiarvoksi kuvan vuodelle nykyinen
  let belongsDecade = null // Alustetaan muuttuja, johon tallennetaan kahteen kuvaan käytettävä vuosikymmen
  let impostorDecade = null // Alustetaan muuttuja, johon tallennetaan kolmanteen kuvaan käytettävä alue

  const startGame = (params) => {
    setTotalRounds(params.rounds)
    setGrayscale(params.grayscale ?? false)
    setScore(0)
    setRounds(1)
    setStarted(true)
    nextRound()
  }

  const nextRound = async () => {
    setFirstPhoto(null)
    setSecondPhoto(null)
    setThirdPhoto(null)

    setAnswered(false)
    setCorrect(false)

    const alternateOrder = [0, 1, 2]
    alternateOrder.sort(() => Math.random() - 0.5) // Arvotaan järjestys, jossa kuvat näytetään

    await fetchTeam1(alternateOrder[0])
    await fetchTeam2(alternateOrder[1])
    await fetchImpostor(alternateOrder[2])
  }

  const fetchTeam1 = async (index) => {
    const team1 = await getRandomPhoto({
      decade: `${startYear}-${currentYear}`,
    }) // Haetaan kuva väliltä 1880-nykyinen vuosi
    belongsDecade = Math.floor(team1.year / 10) * 10 // Tallennetaan haetun kuvan vuosikymmen toista kuvaa varten
    team1.belongs = true // Muuttuja joka kertoo tämän kuvan kuuluvan joukkoon
    setPhotoByIndex(index, team1)
  }

  const fetchTeam2 = async (index) => {
    const team2 = await getRandomPhoto({
      decade: `${belongsDecade}-${belongsDecade + 9}`,
    }) // Käytetään samaa vuosikymmentä hakemiseen kuin ensimmäisessä kuvassa
    team2.belongs = true // Tämäkin kuva kuuluu joukkoon
    setPhotoByIndex(index, team2)
  }

  const fetchImpostor = async (index) => {
    do {
      impostorDecade = Math.floor(
        Math.random() * (currentYear - startYear) + startYear // Arvotaan mikä tahansa vuosi väliltä 1880-nykyinen vuosi...
      )
      impostorDecade = Math.floor(impostorDecade / 10) * 10 // ...ja pyöristetään se vuosikymmenen alkuun...
    } while (
      impostorDecade >= belongsDecade - 10 &&
      impostorDecade <= belongsDecade + 19 // ...ja käytetään sitä, jos se on vähintään 10 vuoden päässä kahden ensimmäisen kuvan vuosista
    )

    const impostor = await getRandomPhoto({
      decade: `${impostorDecade}-${impostorDecade + 9}`,
    })
    impostor.belongs = false // Kuva ei kuulu joukkoon
    setPhotoByIndex(index, impostor)
  }

  const setPhotoByIndex = (index, photo) => {
    if (index === 0) {
      setFirstPhoto(photo)
    } else if (index === 1) {
      setSecondPhoto(photo)
    } else if (index === 2) {
      setThirdPhoto(photo)
    }
  }

  const handleSelectPhoto = (photo) => {
    setAnswered(true)
    if (!photo.belongs) {
      setScore(score + 1)
      setCorrect(true)
    }
  }

  const handleNext = () => {
    const isGameContinuing = totalRounds === 0 || roundNumber < totalRounds
    setRounds((prevRound) => prevRound + 1)

    if (isGameContinuing) {
      nextRound()
    }
  }

  const handleRestart = () => {
    setRounds(0)
    setScore(0)
    setStarted(false)
  }

  const handleRetry = () => {
    startGame({ rounds: totalRounds })
  }

  if (!started) {
    return <Start initGameWithParams={startGame} />
  }

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
          Valitse kuva, joka ei kuulu joukkoon
        </p>
      )}
      {answered && correct && (
        <p className="min-w-full rounded-xl bg-accent p-4 text-center font-bold">
          Oikein!
        </p>
      )}
      {answered && !correct && (
        <p className="min-w-full rounded-xl bg-red-400 p-4 text-center font-bold">
          Väärin!
        </p>
      )}
      <div className="mx-auto flex w-full flex-nowrap items-center justify-center gap-2 p-4">
        <PhotoContainer
          photo={firstPhoto}
          onClick={
            handleSelectPhoto ? () => handleSelectPhoto(firstPhoto) : null
          }
          grayscale={answered ? false : grayscale}
          useLoading={true}
          infoProps={{ showYear: answered }}
        />
        <PhotoContainer
          photo={secondPhoto}
          onClick={
            handleSelectPhoto ? () => handleSelectPhoto(secondPhoto) : null
          }
          grayscale={answered ? false : grayscale}
          useLoading={true}
          infoProps={{ showYear: answered }}
        />
        <PhotoContainer
          photo={thirdPhoto}
          onClick={
            handleSelectPhoto ? () => handleSelectPhoto(thirdPhoto) : null
          }
          grayscale={answered ? false : grayscale}
          useLoading={true}
          infoProps={{ showYear: answered }}
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
