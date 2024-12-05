import { BASE_URL } from "@/app/constants";

export default function PhotoInfo({
  photo,
  showYear = true,
  showTitle = null,
  showLink = true,
  variant = 'default', 
  className = '' 
}) {
  
  showTitle = showTitle ?? showYear;

  const variantClasses = {
    default: 'space-y-2 rounded-xl bg-primary p-4',
    slideshow: 'space-y-2 p-4'
  }[variant];

  const truncate = (text, maxLength = 45) => {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + "…"
    }
    return text;
  }

  return (
    <div className={`${variantClasses} ${className}`}>
      {showTitle && (
        <p className="text-lg">
          <span className="font-bold">Otsikko: </span>
          {truncate(photo.title) || "Piilotettu"}
        </p>
      )}
      {showYear && (
        <p className="text-sm">
          <span className="font-semibold">Vuosi: </span>
          {photo.year || "Piilotettu"}
        </p>
      )}
      <p className="text-sm">
        <span className="font-semibold">Sijainti: </span>
        {truncate(photo.subjects?.[photo.subjects.length - 1]?.[0]) || "Ei tiedossa"}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Tekijä: </span>
        {truncate(photo.author) || "Ei tiedossa"}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Organisaatio: </span>
        {photo.building || "Ei tiedossa"}
      </p>
      {showLink && (
        <a
          href={`${BASE_URL}${photo.recordPage}`}
          className="inline-block text-sm text-blue-600 hover:text-blue-800 hover:underline"
        >
          Linkki aineistoon
        </a>
      )}
    </div>
  );
}