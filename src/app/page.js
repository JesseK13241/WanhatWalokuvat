import SearchSlideshowContainer from "@/components/SearchSlideshowContainer"
import { getInitialPhoto } from "@/services/photos"

export default async function HomePage() {
  console.log("Rendering home page...")

  const initialPhoto = await getInitialPhoto()
  console.log("Found initial photo:", initialPhoto)

  return (
    <div className="flex flex-col items-center p-10">
      <SearchSlideshowContainer initialPhoto={initialPhoto} />
    </div>
  )
}
