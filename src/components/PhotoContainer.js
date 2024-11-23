"use client"
import Image from "next/image"

export default function PhotoContainer({ photo }) {
  // Kuvakomponentti kuvien ja metadatan näyttämiseen

  const IMAGE_BASE_URL = "https://www.finna.fi/Cover/Show?id="

  console.log("Rendering PhotoContainer (client-side)...")

  if (!photo) {
    return <p>No photos found</p>
  }

  // Parametrillä (photo) on 2 eri mahdollista muotoa:
  // 1) staattinen 'initialPhoto' tai 2) Finnan sivuilta haettu

  const isInitialPhoto = photo?.element
  if (!isInitialPhoto) {
    photo = photo.records[0]
  }

  return (
    <div className="mx-auto w-full max-w-xl overflow-hidden rounded-lg bg-primary shadow-md">
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

      <div className="space-y-2 p-4">
        {photo.year && (
          <p className="text-lg">
            <span className="font-semibold">Vuosi:</span> {photo.year}
          </p>
        )}
        {photo.location && (
          <p className="text-sm">
            <span className="font-semibold">Sijainti:</span> {photo.location}
          </p>
        )}
        {photo.author && (
          <p className="text-sm">
            <span className="font-semibold">Tekijä:</span> {photo.author}
          </p>
        )}
        {photo.building && (
          <p className="text-sm">
            <span className="font-semibold">Museo:</span> {photo.building}
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
