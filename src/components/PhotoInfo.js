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

  // Palauttaa itse komponentin, jonka sisällä tarkistukset booleanien arvoille
  // ja niiden perusteella näytetään kuvan tiedot tai jätetään näyttämättä.
  return (
    <div className={`${variantClasses} ${className}`}>
      <p className="text-lg whitespace-nowrap overflow-hidden text-ellipsis">
        <span className="font-bold">Otsikko: </span>
        {loading ? "Ladataan..." : (showTitle && photo.title) || "Piilotettu"}
      </p>
      <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        <span className="font-semibold">Vuosi: </span>
        {loading ? "Ladataan..." : (showYear && photo.year) || "Piilotettu"}
      </p>
      <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        <span className="font-semibold">Sijainti: </span>
        {loading
          ? "Ladataan..."
          : photo.subjects?.[photo.subjects.length - 1]?.[0] || "Ei tiedossa"}
      </p>
      <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        <span className="font-semibold">Tekijä: </span>
        {loading ? "Ladataan..." : photo.author || "Ei tiedossa"}
      </p>
      <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        <span className="font-semibold">Organisaatio: </span>
        {loading ? "Ladataan..." : photo.building || "Ei tiedossa"}
      </p>
      {loading ? (
        <p className="inline-block text-sm">Ladataan</p>
      ) : (
        showLink && (
          <a
            href={`${BASE_URL}${photo.recordPage}`}
            className="inline-block text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            Linkki aineistoon
          </a>
        )
      )}
    </div>
  )
}
