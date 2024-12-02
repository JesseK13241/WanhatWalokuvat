// Komponentti kuvan tietojen näyttämiseen (otsikko, tekijä, organisaatio, linkki)
// photo: kuva
// showYear: boolean (Kuvan vuosi näytetään, jos true.)
// showTitle: boolean (Kuvan otsikko näytetään, jos true. Oletuksena sama kuin showYear)
// showLink: boolean (Kuvan linkki näytetään, jos true. Oletuksena sama kuin showYear)
export default function PhotoInfo({
  photo,
  showYear = true,
  showTitle = null,
  showLink = null,
}) {
  // Jos parametreille showTitle ja showLink ei ole annettu arvoa,
  // ne ovat oletuksena sama kuin showYear, joka taas on oletuksena true

  // Jos pelkästään kuva annetaan parametrina, kaikki tiedot näytetään.
  // Jos pelkästään kuva ja showYear on annettu, kaikki vuoden paljastavat
  // tiedot (vuosi, otsikko, linkki) näytetään, kun showYear on true.
  if (showTitle == null) {
    showTitle = showYear
  }
  if (showLink == null) {
    showLink = showYear
  }

  return (
    <div className="max-w-md space-y-2 rounded-xl bg-primary p-4">
      <p className="text-lg">
        <span className="font-bold">Otsikko: </span>
        {showTitle ? photo.title : "Piilotettu"}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Vuosi: </span>
        {showYear ? photo.year : "Piilotettu"}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Sijainti: </span>
        {photo.subjects?.[photo.subjects.length - 1]?.[0] || "Ei tiedossa"}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Tekijä: </span>
        {photo.author || "Ei tiedossa"}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Organisaatio: </span>
        {photo.building || "Ei tiedossa"}
      </p>
      {showLink ? (
        <a
          href={`https://www.finna.fi${photo.recordPage}`}
          className="inline-block text-sm text-blue-600 hover:text-blue-800 hover:underline"
        >
          Linkki aineistoon
        </a>
      ) : (
        <p className="text-sm">Linkki aineistoon piilotettu</p>
      )}
    </div>
  )
}
/* 
<div className="rounded bg-primary object-fill p-2 text-center shadow-md">
      {photo.title && showTitle && <p className="font-bold"> {photo.title} </p>}
      {photo.author && <p> Tekijä: {photo.author} </p>}
      {photo.building && <p> Organisaatio: {photo.building} </p>}
      {showTitle && (
        <a
          href={"https://www.finna.fi" + photo.recordPage}
          className="text-blue-600 visited:text-purple-600 hover:underline"
        >
          Linkki aineistoon
        </a>
      )}
    </div>
*/
