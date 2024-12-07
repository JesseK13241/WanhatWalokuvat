export default function PhotoInfoSkeleton() {
  return (
    <div className="space-y-2 h-48 rounded-xl bg-primary p-4">
      <p className="text-lg whitespace-nowrap overflow-hidden text-ellipsis">
        <span className="font-bold">Otsikko: </span>
        Ladataan...
      </p>
      <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        <span className="font-semibold">Vuosi: </span>
        Ladataan...
      </p>
      <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        <span className="font-semibold">Sijainti: </span>
        Ladataan...
      </p>
      <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        <span className="font-semibold">Tekijä: </span>
        Ladataan...
      </p>
      <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        <span className="font-semibold">Organisaatio: </span>
        Ladataan...
      </p>
      <p className="inline-block text-sm">Ladataan</p>
    </div>
  )
}
