"use client"
import Start from "@/app/pelit/peli3/Start"
import PhotoContainer from "@/components/PhotoContainer"
import PhotoInfo from "@/components/PhotoInfo"
import getRandomPhoto from "@/services/photos"
import { useState } from "react"

export default function Peli3() {
  const [firstPhoto, setFirstPhoto] = useState(null) // Ensimmäinen kuva
  const [secondPhoto, setSecondPhoto] = useState(null) // Toinen kuva
  const [thirdPhoto, setThirdPhoto] = useState(null) // Kolmas kuva
  const [started, setStarted] = useState(false)
  const [roundNumber, setRounds] = useState(0)
  const [totalRounds, setTotalRounds] = useState(0)

  const startYear = 1880 // Minimiarvoksi kuvien vuodelle
  const currentYear = new Date().getFullYear() // Maksimiarvoksi kuvan vuodelle nykyinen
  let belongsDecade = null // Alustetaan muuttuja, johon tallennetaan kahteen kuvaan käytettävä vuosikymmen
  let impostorDecade = null // Alustetaan muuttuja, johon tallennetaan kolmanteen kuvaan käytettävä alue

  const startGame = (params) => {
    setTotalRounds(params.rounds)
    setStarted(true)
    nextRound()
  }

  const nextRound = async () => {
    setFirstPhoto(null)
    setSecondPhoto(null)
    setThirdPhoto(null)

    const alternateOrder = [0, 1, 2]
    alternateOrder.sort(() => Math.random() - 0.5)

    await Promise.all([
      fetchTeam1(alternateOrder[0]),
      fetchTeam2(alternateOrder[1]),
      fetchImpostor(alternateOrder[2]),
    ])
  }

  const fetchTeam1 = async (index) => {
    const team1 = await getRandomPhoto({
      decade: `${startYear}-${currentYear}`,
    }) // Haetaan kuva väliltä 1880-nykyinen vuosi
    belongsDecade = Math.floor(team1.year / 10) * 10 // Tallennetaan haetun kuvan vuosikymmen
    team1.belongs = true // Kuva kuuluu joukkoon
    setPhotoByIndex(index, team1)
  }

  const fetchTeam2 = async (index) => {
    const team2 = await getRandomPhoto({
      decade: `${belongsDecade}-${belongsDecade + 9}`,
    })
    team2.belongs = true // Kuva kuuluu joukkoon
    setPhotoByIndex(index, team2)
  }

  const fetchImpostor = async (index) => {
    do {
      impostorDecade = Math.floor(
        Math.random() * (currentYear - startYear) + startYear
      )
      impostorDecade = Math.floor(impostorDecade / 10) * 10
    } while (
      impostorDecade >= belongsDecade - 10 &&
      impostorDecade <= belongsDecade + 19
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

  const endGame = () => {
    setStarted(false)
  }

  if (!started) {
    return <Start initGameWithParams={startGame} />
  }

  return (
    <div className="flex flex-col items-center px-40">
      <button onClick={endGame}>Lopeta Peli</button>
      <div className="w-full pb-14">
        <div className="flex flex-wrap justify-center gap-10 p-4">
          <PhotoContainer
            photo={firstPhoto}
            infoElem={<PhotoInfo photo={firstPhoto} />}
          />
          <PhotoContainer
            photo={secondPhoto}
            infoElem={<PhotoInfo photo={secondPhoto} />}
          />
          <PhotoContainer
            photo={thirdPhoto}
            infoElem={<PhotoInfo photo={thirdPhoto} />}
          />
        </div>
      </div>
    </div>
  )
}
