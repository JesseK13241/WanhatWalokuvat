"use client"
import getRandomPhoto from "@/services/photos"
import { useEffect, useState } from "react"
import PhotoContainer from "@/components/PhotoContainer"

// Peli, jossa pelaaja arvaa kumpi kuva on vanhempi
export default function Peli2({ decadeRange }) {
  const [leftPhoto, setLeftPhoto] = useState(null)
  const [rightPhoto, setRightPhoto] = useState(null)

  useEffect(() => {
    getRandomPhoto({
      decade: "1860-1929",
    }).then((left) => {
      setLeftPhoto(left)
    })

    getRandomPhoto({
      decade: "1930-2029",
    }).then((right) => {
      setRightPhoto(right)
    })
  }, [])

  if (leftPhoto == null || rightPhoto == null) {
    return <div>Loading...</div>
  } else {
    console.log("left", leftPhoto)
    console.log("right", rightPhoto)
  }

  return (
    <div className="flex">
      <div>
        <PhotoContainer photo={leftPhoto} />
      </div>
      <div>
        <PhotoContainer photo={rightPhoto} />
      </div>
    </div>
  )
}
