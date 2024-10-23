"use client";
import Image from "next/image";
import { useState } from "react";

export default function Slideshow({ photos }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const IMAGE_BASE_URL = "https://www.finna.fi/Cover/Show?id=";

  if (!photos?.length) {
    return <p>No photos found</p>;
  }

  console.log(`Rendering Slideshow with ${photos.length} photos..`);

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const currentPhoto = photos[currentIndex];
  const imageUrl = `${IMAGE_BASE_URL}${encodeURIComponent(currentPhoto.id)}`;

  console.log("Current photo:", currentPhoto);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 border rounded hover:bg-gray-100">
          Previous
        </button>

        <div className="text-sm">
          {currentIndex + 1} / {photos.length}
        </div>

        <button
          onClick={handleNext}
          className="px-4 py-2 border rounded hover:bg-gray-100">
          Next
        </button>
      </div>

      <div className="flex justify-center">
        <Image
          src={imageUrl}
          alt={photos[currentIndex].title}
          width={500}
          height={500}
          className="object-contain"
          priority
        />
      </div>

      <div className="text-center space-y-2">
        {currentPhoto.year && (
          <p className="text-gray-700">Year: {currentPhoto.year}</p>
        )}
        {currentPhoto.location && (
          <p className="text-gray-700">Location: {currentPhoto.location}</p>
        )}
        {currentPhoto.title && (
          <p className="text-gray-900 font-medium">Title: {currentPhoto.title}</p>
        )}
      </div>
    </div>
  );
}
