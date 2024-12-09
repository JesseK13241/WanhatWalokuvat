import { BASE_URL } from "@/app/constants"

/**
 * Komponentti, joka näyttää kuvan tiedot. Halutessaan tietyt tiedot voi piilottaa.
 */
export default function PhotoInfo({
  photo, // Kuva-olio, jonka tiedot näytetään
  showYear = true, // Totuusarvo. Jos true, kuvan vuosi näytetään, muuten piilotetaan.
  showTitle = null, // Totuusarvo. Jos true, kuvan otsikko näytetään, muuten piilotetaan. Oletuksena sama kuin showYear.
  showLink = true, // Totuusarvo. Jos true, kuvan linkki näytetään, muuten piilotetaan.
  variant = "default", // Haluttu versio komponentista. Määrää tyylin.
  className = "", // Mahdolliset lisäluokat komponentin tailwind tyyliin
  loading = false, // Jos true, ei näytetä tietoja vaan niiden sijasta "ladataan..."
}) {
  // Jos showTitle ei ole erikseen määritetty, asetetaan arvoksi sama kuin showYear.
  // Syynä tähän on se, että showYear=false piilottaa oletuksena myös otsikon, joka saattaa muuten paljastaa vuoden.
  showTitle = showTitle ?? showYear

  // Komponentin eri "versioiden" tyylit.
  // Valitsee muuttujan variantClasses arvon PhotoInfon propertyn variant perusteella
  const variantClasses = {
    default: "space-y-2 rounded-xl bg-primary p-4",
    slideshow: "space-y-2 p-4",
  }[variant]

  // Jos loading=true, näytetään tekstit "Ladataan..." tietojen sijasta.
  if (loading) {
    return (
      <div className="h-48 space-y-2 rounded-xl bg-primary p-4">
        <p className="truncate text-lg">
          <span className="font-bold">Otsikko: </span>
          Ladataan...
        </p>
        <p className="truncate text-sm">
          <span className="font-semibold">Vuosi: </span>
          Ladataan...
        </p>
        <p className="truncate text-sm">
          <span className="font-semibold">Sijainti: </span>
          Ladataan...
        </p>
        <p className="truncate text-sm">
          <span className="font-semibold">Tekijä: </span>
          Ladataan...
        </p>
        <p className="truncate text-sm">
          <span className="font-semibold">Organisaatio: </span>
          Ladataan...
        </p>
        <p className="inline-block text-sm">Ladataan</p>
      </div>
    )
  }

  // Palauttaa itse komponentin, jonka sisällä tarkistukset booleanien arvoille
  // ja niiden perusteella näytetään kuvan tiedot tai jätetään näyttämättä.
  return (
    <div className={`${variantClasses} ${className}`}>
      <p className="truncate text-lg">
        <span className="font-bold">Otsikko: </span>
        {(showTitle && photo.title) || "Piilotettu"}
      </p>
      <p className="truncate text-sm">
        <span className="font-semibold">Vuosi: </span>
        {showYear ? photo.year || "Ei tiedossa" : "Piilotettu"}
      </p>
      <p className="truncate text-sm">
        <span className="font-semibold">Sijainti: </span>
        {photo.subjects?.[photo.subjects.length - 1]?.[0] || "Ei tiedossa"}
      </p>
      <p className="truncate text-sm">
        <span className="font-semibold">Tekijä: </span>
        {photo.author || "Ei tiedossa"}
      </p>
      <p className="truncate text-sm">
        <span className="font-semibold">Organisaatio: </span>
        {photo.building || "Ei tiedossa"}
      </p>
      {showLink && (
        <a
          href={`${BASE_URL}${photo.recordPage}`}
          className="external-link inline-block text-sm"
        >
          Linkki aineistoon
        </a>
      )}
    </div>
  )
}
