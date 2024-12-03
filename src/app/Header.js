import "@/app/globals.css"
import { Bokor } from "next/font/google"
import Link from "next/link"

const bokor = Bokor({
  subsets: ["latin"],
  weight: "400",
})

const Header = () => {
  return (
    <header className="flex w-screen flex-col items-center bg-secondary px-8 py-6 shadow-md sm:flex-row">
      <h1 className="text-5xl font-bold transition-all duration-200 hover:text-accent">
        <Link href="/" className={bokor.className}>
          Wanhat Walokuvat
        </Link>
      </h1>
      <nav>
        <div className="ml-10 flex cursor-pointer justify-center rounded-3xl bg-accent px-6 py-2 shadow-md transition-all duration-200 hover:saturate-200">
          <Link href="/pelit/" className="sm:text-xl">
            Pelit
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
