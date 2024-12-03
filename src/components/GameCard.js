import Image from "next/image"
import Link from "next/link"

// Komponentti eri pelien tietojen näyttämiseen

export default function GameCard({
  title,
  imageSrc, 
  description, 
  path, 
}) {
  return (
    <Link
      href={path}
      className="mt-4 rounded-xl border-4 border-secondary hover:bg-secondary hover:opacity-75"
    >
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <div className="flex flex-col items-center justify-center">
          <h1>{title}</h1>
          <Image
            src={imageSrc}
            alt={title}
            width={400}
            height={200}
            className="mb-4 shadow-lg"
          />
          <p>{description}</p>
        </div>
      </div>
    </Link>
  )
}
