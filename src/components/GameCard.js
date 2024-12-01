import Link from "next/link"
import Image from "next/image"

export default function GameCard({
  title, // Game title
  imageSrc, // Source for the game image
  description, // Description of the game
  path, // Path to the game (from main page)
}) {
  return (
    <Link
      href={path}
      className="border-secondary border-4 rounded-xl mt-4 hover:bg-secondary hover:opacity-75"
    >
      <div className="p-4 text-center flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h1>{title}</h1>
          <Image
            src={imageSrc}
            alt={title}
            width={400}
            height={200}
            className="shadow-lg mb-4"
          />
          <p>{description}</p>
        </div>
      </div>
    </Link>
  )
}
