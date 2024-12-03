import "@/app/globals.css"
import { Bokor } from "next/font/google"
import Link from "next/link"

const bokor = Bokor({
  subsets: ["latin"],
  weight: "400",
})

const Header = () => {
  return (
    <header className="flex w-screen flex-col items-center justify-between bg-secondary p-5 pr-10 shadow-md sm:flex-row">
      <h1 className="text-5xl font-bold transition-all duration-200 hover:text-accent">
        <Link href="/" className={bokor.className}>
          Wanhat Walokuvat
        </Link>
      </h1>
      <nav>
        <div className="flex justify-center rounded-3xl bg-accent px-4 py-2 shadow-md transition-all duration-200 hover:saturate-200">
          <Link href="/pelit/" className="sm:text-xl">
            Pelit
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
