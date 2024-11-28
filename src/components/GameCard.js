import Link from "next/link"
import Image from "next/image"

export default function GameCard({
  title, // Game title
  imageSrc, // Source for the game image
  description, // Description of the game
  path, // Path to the game (from main page)
}) {
  return (
    <div className="border p-4 text-center flex flex-col justify-center items-center">
      <Link href={path}>
        <div className="flex flex-col justify-center items-center">
          <h1>{title}</h1>
          <Image src={imageSrc} alt={title} width={400} height={200} />
          <p>{description}</p>
        </div>
      </Link>
    </div>
  )
}
