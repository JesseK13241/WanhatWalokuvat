import { IMAGE_BASE_URL } from "@/app/constants"
import PhotoInfo from "@/components/PhotoInfo"
import Image from "next/image"
import { useState } from "react"
import { LoaderCircle } from "lucide-react"

/**
 * Komponentti, jolla esitetään kuva ja siihen liittyvät tiedot.
 * Komponenttia voi myös käyttää painikkeena, jos propertyna onClick
 * annetaan funktio, jota kutsutaan komponenttia klikatessa.
 * Tällöin myös kursori ja komponentin tyyli muuttuvan, kun hiiri viedään komponentin päälle
 *
 * Käyttö esim.:
 * <PhotoContainer photo={kuvaOlio} />
 * <PhotoContainer photo={kuva} infoElem={<PhotoInfo photo={kuva} />} onClick={handleClick} className="p-4 m-2" />
 */
export default function PhotoContainer({
  photo, // Kuva-olio (pakollinen).
  grayscale = false, // Näytetäänkö kaikki kuvat mustavalkoisina. Oletuksena näytetään alkuperäisessä värissä.
  infoElem, // Komponentti, jolla näytetään kuvan tiedot (oletuksena perus <PhotoInfo photo={photo} />).
  onClick, // Funktio, jota kutsutaan, kun komponenttia (kuvaa) klikataan. Jos tyhjä, komponentti ei toimi nappina.
  className = "", // Komponentin oletustyyliin lisättävät tailwind-tyylit
  useLoading = false, // Totuusarvo, joka kertoo käytetäänkö loading-komponenttia
  infoProps, // PhotoInfo-komponentille välitettävät propertyt objectina
}) {
  const [isLoading, setIsLoading] = useState(useLoading)

  // Näytetään ilmoitus, jos hakuehdoilla ei löydy kuvia
  if (!photo?.id) {
    return (
      <div className="mx-auto w-[95%] max-w-xl rounded-lg border border-red-500 bg-primary p-12 font-bold text-red-500">
        Hakuehtoja vastaavia kuvia ei löytynyt!
      </div>
    )
  }

  const handleOnLoad = () => {
    setIsLoading(false)
  }
  // PhotoInfo, jossa kaikki tiedot näytetään
  const defaultInfoElem = // ...infoProps levittää infoProps-objectin sisällön komponentin propseiksi
    <PhotoInfo photo={photo} loading={isLoading} {...infoProps} />

  // Koko Containerin (uloin div) tyyli.
  // Jos onClick-funktio on annettu, muutetaan tyyliä napin tapaan, kun hiiri viedään komponentin päälle.
  // Jos propertynä className on annettu lisää tailwind-luokkia, ne lisätään tyylin perään.
  const containerClasses = `
    mx-auto w-[95%] max-w-xl overflow-hidden rounded-lg bg-primary shadow-md
    ${onClick ? "cursor-pointer group" : ""}
    ${className}
  `

  // Image-komponentin tyylit.
  const imageClasses = `
    object-contain 
    ${onClick ? "group-hover:opacity-70" : ""}
    ${grayscale ? "grayscale" : ""}
  `

  // Kuvan taustan tyylit.
  const backgroundClasses = `
    flex absolute inset-0 bg-tertiary items-center justify-center
    ${onClick ? "group-hover:bg-accent" : ""}
  `

  // Palautetaan komponentti.
  // Jos info-elementtiä ei ole annettu propertynä, käytetään oletusta (defaultInfoElem)
  return (
    <div className={containerClasses} onClick={onClick}>
      <div className="relative w-full pt-[100%]">
        <div className={backgroundClasses}>
          {isLoading && (
            <LoaderCircle className="animate-spin w-32 h-32 stroke-primary" />
          )}
          <Image
            src={`${IMAGE_BASE_URL}${encodeURIComponent(photo.id)}`}
            alt={photo.title || "Photo"}
            title={photo.title || "Photo"}
            fill
            className={imageClasses}
            priority
            onLoad={handleOnLoad}
          />
        </div>
      </div>

      {infoElem || (
        <PhotoInfo photo={photo} loading={isLoading} {...infoProps} />
      )}
    </div>
  )
}
