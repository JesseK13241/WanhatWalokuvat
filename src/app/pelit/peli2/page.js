"use client"
import PhotoContainerClickable from "@/components/PhotoContainerClickable"
import PhotoContainerSkeleton from "@/components/PhotoContainerSkeleton"
import PhotoInfoContainer from "@/components/PhotoInfoContainer"
import Start from "@/app/pelit/peli2/Start"
import getRandomPhoto from "@/services/photos"
import { useEffect, useState } from "react"

// Peli, jossa pelaaja arvaa kumpi kuva on vanhempi
export default function Peli2({ decadeRange }) {
  const [leftPhoto, setLeftPhoto] = useState(null)
  const [rightPhoto, setRightPhoto] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState(false)
  const [started, setStarted] = useState(false)

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

  useEffect(() => {
    if (started) {
      nextRound()
    }
  }, [started])

  const startGame = () => {
    setStarted(true)
  }

  const nextRound = async () => {
    setLeftPhoto(null)
    setRightPhoto(null)
    setAnswered(false)
    setCorrectAnswer(false)
    let alternateOrder = false // Jos true, oikea kuva on vanhempi, muuten vasen
    if (Math.random() < 0.5) {
      // Noin 50% todennäköisyys kummallekin vaihtoehdolle
      alternateOrder = true
    }

    fetchOlder(alternateOrder)
    fetchNewer(alternateOrder)
  }

  const fetchOlder = async (alternateOrder) => {
    // Vanhempi kuva:
    getRandomPhoto({
      decade: olderDecadeRange,
    }).then((older) => {
      older.isOlder = true
      alternateOrder ? setRightPhoto(older) : setLeftPhoto(older)
    })
  }

  const fetchNewer = async (alternateOrder) => {
    // Uudempi kuva:
    getRandomPhoto({
      decade: newerDecadeRange,
    }).then((newer) => {
      newer.isOlder = false
      alternateOrder ? setLeftPhoto(newer) : setRightPhoto(newer)
    })
  }

  const handleSelectLeft = () => {
    setAnswered(true)
    if (leftPhoto.isOlder) {
      setCorrectAnswer(true)
    }
  }

  const handleSelectRight = () => {
    setAnswered(true)
    if (rightPhoto.isOlder) {
      setCorrectAnswer(true)
    }
  }

  const styles = {
    correct:
      "w-[95%] mx-[2.5%] text-center font-bold border-black border-2 rounded-xl bg-green-500 px-4 py-2 shadow-md",
    incorrect:
      "w-[95%] mx-[2.5%] text-center font-bold border-black border-2 rounded-xl bg-red-500 px-4 py-2 shadow-md",
  }

  if (!started) {
    return <Start initGame={startGame} />
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
        <button className="btn-primary mb-4 shadow-md p-4 px-6" disabled={true}>
          Seuraava
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="pb-14">
        <div className="flex justify-center items-center text-xl">
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
            <PhotoContainerClickable
              photo={leftPhoto}
              infoElem={
                <PhotoInfoContainer photo={leftPhoto} showTitle={answered} />
              }
              handleClick={handleSelectLeft}
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
            <PhotoContainerClickable
              photo={rightPhoto}
              infoElem={
                <PhotoInfoContainer photo={rightPhoto} showTitle={answered} />
              }
              handleClick={handleSelectRight}
            />
          </div>
        </div>
      </div>
      <button
        className="btn-primary mb-4 shadow-md p-4 px-6"
        onClick={nextRound}
        disabled={!answered}
      >
        Seuraava
      </button>
    </div>
  )
}
