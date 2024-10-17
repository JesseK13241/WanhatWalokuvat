import Image from "next/image";
const imageDisplayUrl = "https://www.finna.fi/Cover/Show?id="

export default function SlideShow({ photos }) {
  console.log("SlideShow component got:", photos);
  const randomNumber = Math.floor(Math.random() * photos.length);
  return (
    <div className="border border-black p-20">
      {photos.length === 0 && <p>No photos found, click Search</p>}
      {photos.length > 0 && (
        <Image
          src={imageDisplayUrl + photos[randomNumber].id.replaceAll("+", "%2B")} 
          // TODO encode URL without manual hacks
          alt="Photo"
          width={500}
          height={500}
        />
      )}
    </div>
  );
}
