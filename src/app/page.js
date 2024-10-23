import SearchSlideshowContainer from "@/components/SearchSlideshowContainer";
import { getPhotos } from "@/services/photos";

export default async function HomePage() {
  console.log("Rendering home page...");

  const initialPhotos = await getPhotos();
  console.log(`Found ${initialPhotos.length} initial photos`);	

  return (
    <div className="flex flex-col items-center p-10">
      <SearchSlideshowContainer initialPhotos={initialPhotos} />
    </div>
  );
}
