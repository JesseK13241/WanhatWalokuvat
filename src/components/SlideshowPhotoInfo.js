// Komponentti kuvan tietojen näyttämiseen (otsikko, tekijä, organisaatio, linkki)
// photo = kuva, showTitle = boolean, otsikko ja linkki näytetään jos true
export default function SlideshowPhotoInfo({ photo }) {
  return (
    <div className="space-y-2 p-4">
      {photo.year && (
        <p className="text-lg">
          <span className="font-semibold">Vuosi:</span> {photo.year}
        </p>
      )}
      {photo.location && (
        <p className="text-sm">
          <span className="font-semibold">Sijainti:</span> {photo.location}
        </p>
      )}
      {photo.author && (
        <p className="text-sm">
          <span className="font-semibold">Tekijä:</span> {photo.author}
        </p>
      )}
      {photo.building && (
        <p className="text-sm">
          <span className="font-semibold">Museo:</span> {photo.building}
        </p>
      )}
      {!photo.local && photo.recordPage && (
        <a
          href={`https://www.finna.fi${photo.recordPage}`}
          className="inline-block text-sm text-blue-600 hover:text-blue-800 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Linkki aineistoon
        </a>
      )}
    </div>
  )
}
