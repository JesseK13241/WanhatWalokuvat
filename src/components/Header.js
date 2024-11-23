import "@/app/globals.css"
import Link from "next/link"

const Header = () => {
  return (
    <header className="bg-secondary p-6 shadow-xl flex justify-between items-center">
      <h1 className="text-5xl font-bold  hover:text-accent transition-all duration-300">
        <Link href="/">Wanhat Walokuvat</Link>
      </h1>
      <nav>
        <Link
          href="/pelit/"
          className="text-2xl black hover:text-accent transition-all duration-300 mr-8"
        >
          Pelit
        </Link>
      </nav>
    </header>
  )
}

export default Header
