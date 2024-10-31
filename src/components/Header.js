import "@/app/globals.css"
import Link from "next/link"

const Header = () => {
  return (
    <header className="bg-maincolor border border-black p-5">
      <h1 className="border border-black text-3xl">
        <a href="/">Aineopintojen projektityö</a>
      </h1>
      <Link href="/pelit/">Pelit</Link>
    </header>
  )
}

export default Header
