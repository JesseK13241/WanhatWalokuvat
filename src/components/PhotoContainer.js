"use client"
import Image from "next/image"
import PhotoInfo from "./PhotoInfo"

export default function PhotoContainer({ photo, infoElem }) {
  const IMAGE_BASE_URL = "https://www.finna.fi/Cover/Show?id="

  if (!photo?.id) {
    return (
      <div className="mx-auto w-[95%] max-w-xl rounded-lg border border-red-600 bg-primary p-12 text-red-500">
        No photos found
      </div>
    )
  }

  const defaultInfoElem = <PhotoInfo photo={photo} />

  return (
    <div className="mx-auto w-[95%] max-w-xl overflow-hidden rounded-lg bg-primary shadow-md">
      <div className="relative w-full pt-[100%]">
        <div className="absolute inset-0 bg-tertiary">
          <Image
            src={`${IMAGE_BASE_URL}${encodeURIComponent(photo.id)}`}
            alt={photo.title || "Photo"}
            title={photo.title || "Photo"}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {infoElem || defaultInfoElem}
    </div>
  )
}
