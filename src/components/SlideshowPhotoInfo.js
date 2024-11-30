// Komponentti kuvan tietojen näyttämiseen (otsikko, tekijä, organisaatio, linkki)
// photo = kuva, showTitle = boolean, otsikko ja linkki näytetään jos true
export default function SlideshowPhotoInfo({ photo }) {
  return (
    <div className="space-y-2 p-4">
      
      <p className="text-lg">
        <span className="font-semibold">Vuosi: </span> 
        {photo.year ? photo.year: "?"}
      </p>
      
      <p className="text-sm">
        <span className="font-semibold">Sijainti: </span> 
        {photo.location ? photo.location : "Ei tiedossa"}
      </p>

      <p className="text-sm">
        <span className="font-semibold">Tekijä: </span> 
        {photo.author ? photo.author : "Ei tiedossa"}
      </p>

      <p className="text-sm">
        <span className="font-semibold">Museo: </span> 
        {photo.building ? photo.building : "Ei tiedossa"}
      </p>

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
