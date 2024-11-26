import Link from "next/link"
import Image from "next/image"
import arvaa from "../../public/images/arvaa.jpg"

export default function Pelit() {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="border p-4 text-center flex flex-col justify-center items-center">
        <Link href="/pelit/peli1">
          <div className="flex flex-col justify-center items-center">
            <h1>Arvaa vuosikymmen</h1>
            <Image
              src={arvaa}
              alt="Arvaa vuosikymmen"
              width={400}
              height={200}
            />
            <p>Arvaa neljästä vaihtoehdosta, miltä vuosikymmeneltä kuva on</p>
          </div>
        </Link>
      </div>
      <div className="border p-4 text-center">
        <div>
          <h2>Peli 2</h2>
          <p>Tähän vois laittaa toisen pelin</p>
        </div>
      </div>
    </div>
  )
}
