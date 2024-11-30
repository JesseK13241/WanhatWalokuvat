"use client"
import Image from "next/image"
import SlideshowPhotoInfo from "./SlideshowPhotoInfo"

export default function PhotoContainer({ photo, infoElem }) {
  // Kuvakomponentti kuvien ja metadatan näyttämiseen

  const IMAGE_BASE_URL = "https://www.finna.fi/Cover/Show?id="

  //console.log("Rendering PhotoContainer (client-side)...")

  // Parametrillä (photo) on 2 eri mahdollista muotoa:
  // 1) staattinen 'initialPhoto' tai 2) Finnan sivuilta haettu

  const isInitialPhoto = photo?.element
  if (!isInitialPhoto) {
    if (photo.records) {
      photo = photo.records[0]
    } else {
      return (
        <div className="mx-auto w-[95%] max-w-xl rounded-lg border border-red-600 bg-primary p-12 text-red-500">
          No photos found
        </div>
      )
    }
  }

  if (!infoElem) {
    infoElem = <SlideshowPhotoInfo photo={photo} />
  }

  return (
    <div className="mx-auto w-[95%] max-w-xl overflow-hidden rounded-lg bg-primary shadow-md">
      <div className="relative w-full pt-[100%]">
        <div className="absolute inset-0 bg-tertiary">
          {isInitialPhoto ? (
            <div className="flex size-full items-center justify-center">
              {photo.element}
            </div>
          ) : (
            <Image
              src={`${IMAGE_BASE_URL}${encodeURIComponent(photo.id)}`}
              alt={photo.title || "Photo"}
              title={photo.title || "Photo"}
              fill
              className="object-contain"
              priority
            />
          )}
        </div>
      </div>

      {infoElem}
    </div>
  )
}
