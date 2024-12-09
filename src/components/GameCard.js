import Image from "next/image"
import Link from "next/link"

/**
 * Komponentti, jota käytetään linkkinä peliin.
 * Kortti näyttää myös kuvan ja lyhyen kuvauksen pelistä.
 *
 * title       = Pelin nimi (otsikko)
 * imageSrc    = Peliä kuvaava kuva (esim. screenshot)
 * description = Lyhyt kuvaus pelistä
 * path        = Polku peliin (esim. "/pelit/peli1")
 *
 * Käyttö: katso pelit-sivu
 */
export default function GameCard({ title, imageSrc, description, path }) {
  // Koko kortti toimii linkkinä ja kortin tyyli muuttuu, kun hiiren vie sen päälle.
  return (
    <Link
      href={path}
      className="flex flex-col items-center justify-between rounded-xl border-2 border-accent bg-secondary p-4 hover:opacity-75"
    >
      <h1 className="text-2xl font-bold">{title}</h1>
      <Image
        src={imageSrc}
        alt={title}
        width={400}
        height={200}
        className="m-4 rounded-xl border-2 border-tertiary shadow-lg"
      />
      <p className="text-center">{description}</p>
    </Link>
  )
}
