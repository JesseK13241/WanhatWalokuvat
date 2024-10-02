import Image from "next/image";

export default function SlideShow({ photos }) {
  console.log("SlideShow component got:", photos);
  console.log(photos[0]);
  return (
    <div className="border border-black p-20">
      <Image
        src={photos[0]}
        alt="Photo"
        width={500}
        height={500}
      />
    </div>
  );
}
