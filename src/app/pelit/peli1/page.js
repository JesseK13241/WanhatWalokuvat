import Image from "next/image";

export default function Peli1() {
  return (
    <div className="flex flex-col item-center px-10 text-center">
      <h1 className="font-bold m-4">
        Peli 1
      </h1>
      <div className="flex justify-center">
        <Image
          src={"https://api.finna.fi/Cover/Show?source=Solr&id=sls.SLSA%2B367_SLSA%2B367%253A5%253A5%253A5.1&index=0&size=large"}
          alt={"Albert Edelfelt"}
          height={500}
          width={500}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 m-4">
        <button
        className="px-4 py-2 border rounded hover:bg-gray-100">
          Option 1
        </button>
        <button
        className="px-4 py-2 border rounded hover:bg-gray-100">
          Option 2
        </button>
        <button
        className="px-4 py-2 border rounded hover:bg-gray-100">
          Option 3
        </button>
        <button
        className="px-4 py-2 border rounded hover:bg-gray-100">
          Option 4
        </button>
      </div>
    </div>
  );
}
