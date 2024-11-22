import React from "react"

const Peli1Skeleton = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="m-4 flex animate-pulse flex-col items-center rounded-md border border-gray-200 p-6">
        <div className="size-80 animate-pulse rounded bg-gray-100" />
        <div className="mt-4 flex h-10 w-80 animate-pulse justify-between space-x-4">
          <div className="h-10 w-32 rounded bg-gray-100" />
          <div className="h-10 w-32 rounded bg-gray-100" />
          <div className="h-10 w-32 rounded bg-gray-100" />
          <div className="h-10 w-32 rounded bg-gray-100" />
        </div>
        <div className="m-4 h-10 w-28 animate-pulse rounded bg-gray-100" />
        <div className="h-28 w-80 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  )
}

export default Peli1Skeleton
