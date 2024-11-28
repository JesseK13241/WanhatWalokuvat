import SearchSlideshowContainer from "@/components/SearchSlideshowContainer"
import { getInitialPhoto } from "@/services/photos"
import { Suspense } from "react"

export default async function HomePage() {
  //console.log("Rendering homepage (server-side)...")

  // Sivuston nopeuttamisesksi ladtaan ensimmäisenä kuvana staattinen kuva
  const initialPhoto = await getInitialPhoto()

  return (
    <div className="flex flex-col items-center p-4 pb-14">
      <Suspense>
        <SearchSlideshowContainer initialPhoto={initialPhoto} />
      </Suspense>
    </div>
  )
}
