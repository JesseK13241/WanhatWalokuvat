"use client"
import PhotoContainerClickable from "@/components/PhotoContainerClickable"
import PhotoContainerSkeleton from "@/components/PhotoContainerSkeleton"
import PhotoInfoContainer from "@/components/PhotoInfoContainer"
import getRandomPhoto from "@/services/photos"
import { useEffect, useState } from "react"

// Peli, jossa pelaaja arvaa kumpi kuva on vanhempi
export default function Peli2({ decadeRange }) {
  const [leftPhoto, setLeftPhoto] = useState(null)
  const [rightPhoto, setRightPhoto] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState(false)

  useEffect(() => {
    setAnswered(false)
    setCorrectAnswer(false)
    getRandomPhoto({
      decade: "1860-1930",
    }).then((left) => {
      left.isOlder = true
      setLeftPhoto(left)
    })

    getRandomPhoto({
      decade: "1940-2029",
    }).then((right) => {
      right.isOlder = false
      setRightPhoto(right)
    })
  }, [])

  const handleSelectLeft = () => {
    console.log("Selected left photo")
    setAnswered(true)
    if (leftPhoto.isOlder) {
      setCorrectAnswer(true)
      console.log("Oikein!")
    } else {
      console.log("Väärin!")
    }
  }

  const handleSelectRight = () => {
    console.log("Selected right photo")
    setAnswered(true)
    if (rightPhoto.isOlder) {
      setCorrectAnswer(true)
      console.log("Oikein!")
    } else {
      console.log("Väärin!")
    }
  }

  const styles = {
    correct:
      "w-[95%] mx-[2.5%] text-center font-bold border-black border-2 rounded-xl bg-green-500 px-4 py-2 shadow-md",
    incorrect:
      "w-[95%] mx-[2.5%] text-center font-bold border-black border-2 rounded-xl bg-red-500 px-4 py-2 shadow-md",
  }

  if (leftPhoto == null || rightPhoto == null) {
    return (
      <div>
        <div className="flex justify-center text-xl">
          <p className="mt-4 rounded-xl bg-tertiary p-4">
            Klikkaa vanhempaa kuvaa
          </p>
        </div>
        <div className="flex flex-wrap justify-center p-4 pb-14">
          <PhotoContainerSkeleton />
          <PhotoContainerSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="pb-14">
      <div className="flex justify-center text-xl">
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
          {answered && <p className={styles.correct}>{leftPhoto.year}</p>}
          <PhotoContainerClickable
            photo={leftPhoto}
            infoElem={
              <PhotoInfoContainer photo={leftPhoto} showTitle={answered} />
            }
            handleClick={handleSelectLeft}
          />
        </div>
        <div>
          {answered && <p className={styles.incorrect}>{rightPhoto.year}</p>}
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
  )
}
