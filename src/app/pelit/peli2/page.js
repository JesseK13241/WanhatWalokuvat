"use client"
import Start from "@/app/pelit/peli2/Start"
import PhotoContainer from "@/components/PhotoContainer"
import PhotoInfo from "@/components/PhotoInfo"
import getRandomPhoto from "@/services/photos"
import { useEffect, useState } from "react"

const PhotoContainerSkeleton = () => (
  <div>
    <div className="m-1 size-72 animate-pulse rounded bg-gray-300" />
    <div className="m-1 h-14 w-72 rounded bg-gray-300" />
  </div>
)

export default function Peli2({ decadeRange }) {
  const [leftPhoto, setLeftPhoto] = useState(null)
  const [rightPhoto, setRightPhoto] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState(false)
  const [started, setStarted] = useState(false)
  const [roundNumber, setRoundNumber] = useState(0)
  const [totalRounds, setTotalRounds] = useState(0)

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

  // Kutsutaan kerran, kun peli aloitetaan
  useEffect(() => {
    if (started) {
      setRoundNumber(1)
      nextRound()
    }
  }, [started])

  const startGame = (params) => {
    params.rounds && setTotalRounds(params.rounds)
    setStarted(true)
  }

  const nextRound = async () => {
    setLeftPhoto(null)
    setRightPhoto(null)
    setAnswered(false)
    setCorrectAnswer(false)

    const alternateOrder = Math.random() < 0.5

    await Promise.all([fetchOlder(alternateOrder), fetchNewer(alternateOrder)])
  }

  const fetchOlder = async (alternateOrder) => {
    const older = await getRandomPhoto({ decade: olderDecadeRange })
    older.isOlder = true
    alternateOrder ? setRightPhoto(older) : setLeftPhoto(older)
  }

  const fetchNewer = async (alternateOrder) => {
    const newer = await getRandomPhoto({ decade: newerDecadeRange })
    newer.isOlder = false
    alternateOrder ? setLeftPhoto(newer) : setRightPhoto(newer)
  }

  const handleSelectLeft = () => {
    setAnswered(true)
    setCorrectAnswer(leftPhoto.isOlder)
  }

  const handleSelectRight = () => {
    setAnswered(true)
    setCorrectAnswer(rightPhoto.isOlder)
  }

  const handleNext = () => {
    setRoundNumber(roundNumber + 1)
    if (totalRounds == 0 || roundNumber < totalRounds) nextRound()
  }

  const styles = {
    correct:
      "w-[95%] mx-[2.5%] text-center font-bold border-black border-2 rounded-xl bg-green-500 px-4 py-2 shadow-md",
    incorrect:
      "w-[95%] mx-[2.5%] text-center font-bold border-black border-2 rounded-xl bg-red-500 px-4 py-2 shadow-md",
  }

  if (!started) {
    return <Start initGameWithParams={startGame} />
  }

  if (totalRounds == 0 || roundNumber > totalRounds) {
    // TODO: Korvaa Tulokset-komponentilla
    return <div>Peli päättyi!</div>
  }

  if (leftPhoto == null || rightPhoto == null) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex justify-center text-xl">
          <p className="mt-4 rounded-xl bg-tertiary p-4">
            Klikkaa vanhempaa kuvaa
          </p>
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
    <div className="flex flex-col items-center">
      <div className="pb-14">
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
        <div className="flex flex-wrap justify-center p-4">
          <div>
            {answered && (
              <p
                className={
                  leftPhoto.isOlder ? styles.correct : styles.incorrect
                }
              >
                {leftPhoto.year}
              </p>
            )}
            <PhotoContainer
              photo={leftPhoto}
              onClick={handleSelectLeft}
              infoElem={<PhotoInfo photo={leftPhoto} showYear={answered} />}
            />
          </div>
          <div>
            {answered && (
              <p
                className={
                  rightPhoto.isOlder ? styles.correct : styles.incorrect
                }
              >
                {rightPhoto.year}
              </p>
            )}
            <PhotoContainer
              photo={rightPhoto}
              onClick={handleSelectRight}
              infoElem={<PhotoInfo photo={rightPhoto} showYear={answered} />}
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
