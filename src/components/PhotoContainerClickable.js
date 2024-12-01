"use client"
import Image from "next/image"
import SlideshowPhotoInfo from "./SlideshowPhotoInfo"

export default function PhotoContainer({ photo, infoElem, handleClick }) {
  // Klikattava kuvakomponentti kuvien ja metadatan näyttämiseen
  // Funktiota {handleClick} kutsutaan, kun komponenttia klikataan

  const IMAGE_BASE_URL = "https://www.finna.fi/Cover/Show?id="

  if (!infoElem) {
    infoElem = <SlideshowPhotoInfo photo={photo} />
  }

  return (
    <div
      className="group mx-auto w-[95%] max-w-xl overflow-hidden rounded-lg bg-primary shadow-md"
      onClick={handleClick}
    >
      <div className="relative w-full pt-[100%]">
        <div className="absolute inset-0 bg-tertiary group-hover:bg-accent">
          <Image
            src={`${IMAGE_BASE_URL}${encodeURIComponent(photo.id)}`}
            alt={photo.title || "Photo"}
            title={photo.title || "Photo"}
            fill
            className="object-contain group-hover:opacity-70"
            priority
          />
        </div>
      </div>

      {infoElem}
    </div>
  )
}
