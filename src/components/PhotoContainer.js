import { IMAGE_BASE_URL } from "@/app/constants";
import PhotoInfo from "@/components/PhotoInfo";
import Image from "next/image";

export default function PhotoContainer({ 
  photo, 
  infoElem, 
  onClick, 
  className = '' 
}) {
  if (!photo?.id) {
    return (
      <div className="mx-auto w-[95%] max-w-xl rounded-lg border border-red-600 bg-primary p-12 text-red-500">
        No photos found
      </div>
    );
  }

  const defaultInfoElem = <PhotoInfo photo={photo} />;
  const containerClasses = `
    mx-auto w-[95%] max-w-xl overflow-hidden rounded-lg bg-primary shadow-md
    ${onClick ? 'cursor-pointer group' : ''}
    ${className}
  `;

  const imageClasses = `
    object-contain 
    ${onClick ? 'group-hover:opacity-70' : ''}
  `;

  const backgroundClasses = `
    absolute inset-0 bg-tertiary
    ${onClick ? 'group-hover:bg-accent' : ''}
  `;

  return (
    <div 
      className={containerClasses}
      onClick={onClick}
    >
      <div className="relative w-full pt-[100%]">
        <div className={backgroundClasses}>
          <Image
            src={`${IMAGE_BASE_URL}${encodeURIComponent(photo.id)}`}
            alt={photo.title || "Photo"}
            title={photo.title || "Photo"}
            fill
            className={imageClasses}
            priority
          />
        </div>
      </div>

      {infoElem || defaultInfoElem}
    </div>
  );
}