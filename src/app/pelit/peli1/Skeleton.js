import React from "react"

const Peli1Skeleton = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="m-4 flex w-screen max-w-xl animate-pulse flex-col items-center rounded-md border border-gray-300 p-6">
        <div className="size-80 animate-pulse rounded bg-gray-100" />
        <div className="mt-4 flex h-10 w-80 animate-pulse justify-between gap-x-4">
          <div className="h-10 w-32 rounded bg-gray-100" />
          <div className="h-10 w-32 rounded bg-gray-100" />
          <div className="h-10 w-32 rounded bg-gray-100" />
          <div className="h-10 w-32 rounded bg-gray-100" />
        </div>
        <div className="my-4 h-10 w-28 animate-pulse rounded bg-gray-100" />
        <div className="h-20 w-80 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  )
}

export default Peli1Skeleton
