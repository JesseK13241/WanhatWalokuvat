import Image from "next/image"
import Link from "next/link"

// Komponentti eri pelien tietojen näyttämiseen

export default function GameCard({ title, imageSrc, description, path }) {
  return (
    <Link
      href={path}
      className="mt-4 flex flex-col items-center rounded-xl border-4 border-secondary p-5 hover:bg-secondary hover:opacity-75"
    >
        <h1 className="text-2xl font-bold">{title}</h1>
        <Image
          src={imageSrc}
          alt={title}
          width={400}
          height={200}
          className="m-4 border border-black shadow-lg"
        />
        <p className="mt-auto text-sm font-bold">{description}</p>
    </Link>
  )
}
