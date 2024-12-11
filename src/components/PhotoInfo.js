import { BASE_URL } from "@/app/constants"
import { useState } from "react"

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
  const [expanded, setExpanded] = useState([])
  // Jos showTitle ei ole erikseen määritetty, asetetaan arvoksi sama kuin showYear.
  // Syynä tähän on se, että showYear=false piilottaa oletuksena myös otsikon, joka saattaa muuten paljastaa vuoden.
  showTitle = showTitle ?? showYear

  // Komponentin eri "versioiden" tyylit.
  // Valitsee muuttujan variantClasses arvon PhotoInfon propertyn variant perusteella
  const variantClasses = {
    default: "space-y-2 rounded-xl bg-primary p-4",
    slideshow: "space-y-2 p-4",
  }[variant]

  const handleClick = (e) => {
    var clickedField = e.target.id
    if (expanded.includes(clickedField))
      setExpanded(expanded.filter((field) => field !== clickedField))
    else setExpanded([...expanded, clickedField])
  }

  // Palauttaa itse komponentin, jonka sisällä tarkistukset booleanien arvoille
  // ja niiden perusteella näytetään kuvan tiedot tai jätetään näyttämättä.
  return (
    <div className={`${variantClasses} ${className}`}>
      <p
        className={`text-lg ${expanded.includes("title") ? "" : "truncate"}`}
        onClick={(e) => handleClick(e)}
        id="title"
      >
        <span className="font-bold">Otsikko: </span>
        {loading ? "Ladataan..." : (showTitle && photo.title) || "Piilotettu"}
      </p>
      <p
        className={`text-sm ${expanded.includes("year") ? "" : "truncate"}`}
        onClick={(e) => handleClick(e)}
        id="year"
      >
        <span className="font-semibold">Vuosi: </span>
        {loading
          ? "Ladataan..."
          : showYear
            ? photo.year || "Ei tiedossa"
            : "Piilotettu"}
      </p>
      <p
        className={`text-sm ${expanded.includes("location") ? "" : "truncate"}`}
        onClick={(e) => handleClick(e)}
        id="location"
      >
        <span className="font-semibold">Sijainti: </span>
        {loading
          ? "Ladataan..."
          : photo.subjects?.[photo.subjects.length - 1]?.[0] || "Ei tiedossa"}
      </p>
      <p
        className={`text-sm ${expanded.includes("author") ? "" : "truncate"}`}
        onClick={(e) => handleClick(e)}
        id="author"
      >
        <span className="font-semibold">Tekijä: </span>
        {loading ? "Ladataan..." : photo.author || "Ei tiedossa"}
      </p>
      <p
        className={`text-sm ${expanded.includes("building") ? "" : "truncate"}`}
        onClick={(e) => handleClick(e)}
        id="building"
      >
        <span className="font-semibold">Organisaatio: </span>
        {loading ? "Ladataam..." : photo.building || "Ei tiedossa"}
      </p>
      {loading ? (
        <p className="text-sm">Ladataan...</p>
      ) : (
        showLink && (
          <a
            href={`${BASE_URL}${photo.recordPage}`}
            className="external-link inline-block text-sm"
          >
            Linkki aineistoon
          </a>
        )
      )}
    </div>
  )
}
