import React from "react"

const Peli1Skeleton = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-4 size-80 animate-pulse rounded bg-gray-200" />
      <div className="mt-4 flex h-10 w-80 justify-between animate-pulse">
        <div className="h-10 w-16 rounded bg-gray-200" />
        <div className="h-10 w-16 rounded bg-gray-200" />
        <div className="h-10 w-16 rounded bg-gray-200" />
        <div className="h-10 w-16 rounded bg-gray-200" />
      </div>
      <div className="m-4 h-10 w-32 animate-pulse rounded bg-gray-200" />
    </div>
  )
}

export default Peli1Skeleton
