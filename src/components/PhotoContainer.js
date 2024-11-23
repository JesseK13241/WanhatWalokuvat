"use client"
import Image from "next/image"

export default function PhotoContainer({ photo }) {
  const IMAGE_BASE_URL = "https://www.finna.fi/Cover/Show?id="

  console.log("In photo container, got photo:", photo)

  if (!photo) {
    return <p>No photos found</p>
  }

  const isInitialPhoto = photo?.element
  if (!isInitialPhoto) {
    photo = photo.records[0]
  }

  return (
    <div className="mx-auto w-full max-w-xl overflow-hidden rounded-lg bg-white shadow-md">
      <div className="relative w-full pt-[100%]">
        <div className="absolute inset-0 bg-slate-800">
          {isInitialPhoto ? (
            <div className="flex size-full items-center justify-center">
              {photo.element}
            </div>
          ) : (
            <Image
              src={`${IMAGE_BASE_URL}${encodeURIComponent(photo.id)}`}
              alt={photo.title || "Photo"}
              fill
              className="object-contain"
              priority
            />
          )}
        </div>
      </div>

      <div className="space-y-2 p-4">
        {photo.title && <p className="text-sm">{photo.title}</p>}
        {photo.year && (
          <p className="text-sm">
            <span className="font-semibold">Vuosi:</span> {photo.year}
          </p>
        )}
        {photo.location && (
          <p className="text-sm">
            <span className="font-semibold">Location:</span> {photo.location}
          </p>
        )}
        {photo.author && (
          <p className="text-sm">
            <span className="font-semibold">Author:</span> {photo.author}
          </p>
        )}
        {photo.building && (
          <p className="text-sm">
            <span className="font-semibold">Building:</span> {photo.building}
          </p>
        )}
        {!photo.local && photo.recordPage && (
          <a
            href={`https://www.finna.fi${photo.recordPage}`}
            className="inline-block text-sm text-blue-600 hover:text-blue-800 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkki aineistoon
          </a>
        )}
      </div>
    </div>
  )
}
