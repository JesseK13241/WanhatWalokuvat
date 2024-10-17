import Image from "next/image";

export default function SlideShow({ photos }) {
  const imageDisplayUrl = "https://www.finna.fi/Cover/Show?id=";

  console.log("SlideShow component got:", photos);
  if (photos.length === 0) {
    return <p>No photos found, click Search</p>;
  }
  const randomNumber = Math.floor(Math.random() * photos.length);
  // TODO encode URL without manual hacks
  const imageUrl =
    imageDisplayUrl + photos[randomNumber].id.replaceAll("+", "%2B");
  console.log("Displaying image:", imageUrl);
  return (
    <div className="border border-black p-20">
      <Image
        src={imageUrl}
        alt="Photo"
        width={500}
        height={500}
      />
    </div>
  );
}
