// Komponentti kuvan tietojen näyttämiseen (otsikko, tekijä, organisaatio, linkki)
// photo = kuva, showTitle = boolean, otsikko ja linkki näytetään jos true
export default function PhotoInfoContainer({ photo, showTitle }) {
  // Seuraava mahdollistaa koodin toimimisen riippumatta siitä onko
  // photo yksittäinen kuva vai koko API-kyselyn vastaus
  if (photo.records) {
    photo = photo.records[0]
  }

  return (
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
  )
}
