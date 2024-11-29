"use client"
import getRandomPhoto from "@/services/photos"
import { useEffect, useState } from "react"
import PhotoContainer from "@/components/PhotoContainer"
import PhotoInfoContainer from "@/components/PhotoInfoContainer"
import PhotoContainerSkeleton from "@/components/PhotoContainerSkeleton"

// Peli, jossa pelaaja arvaa kumpi kuva on vanhempi
export default function Peli2({ decadeRange }) {
  const [leftPhoto, setLeftPhoto] = useState(null)
  const [rightPhoto, setRightPhoto] = useState(null)
  const [answered, setAnswered] = useState(false)

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
  } else {
    console.log("left", leftPhoto)
    console.log("right", rightPhoto)
  }

  return (
    <div>
      <div className="flex justify-center text-xl">
        <p className="mt-4 rounded-xl bg-tertiary p-4">
          Klikkaa vanhempaa kuvaa
        </p>
      </div>
      <div className="flex flex-wrap justify-center p-4 pb-14">
        <div>
          {leftPhoto ? (
            <PhotoContainer
              photo={leftPhoto}
              infoElem={
                <PhotoInfoContainer
                  photo={leftPhoto.records[0]}
                  showTitle={answered}
                />
              }
            />
          ) : (
            <PhotoContainerSkeleton />
          )}
        </div>
        <div>
          {rightPhoto && (
            <PhotoContainer
              photo={rightPhoto}
              infoElem={
                <PhotoInfoContainer photo={rightPhoto} showTitle={answered} />
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}
