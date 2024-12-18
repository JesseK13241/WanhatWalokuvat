import "@/app/globals.css"
import { Gamepad2 } from "lucide-react"
import { Bokor } from "next/font/google"
import Link from "next/link"

const bokor = Bokor({
  subsets: ["latin"],
  weight: "400",
})

const Header = () => {
  return (
    <header className="flex w-screen flex-col items-center gap-y-2 bg-secondary px-4 py-6 shadow-md sm:flex-row">
      <Link href="/" className={bokor.className}>
        <h1 className="text-5xl font-bold transition-all duration-200 hover:text-accent sm:text-6xl">
          Wanhat Walokuvat
        </h1>
      </Link>
      <Link href="/pelit/" className="sm:ml-8 sm:text-xl">
        <h2 className="flex items-center justify-center gap-2 rounded-3xl bg-accent px-6 py-2 font-bold shadow-md transition-all duration-200 hover:saturate-200">
          <Gamepad2 />
          Pelit
        </h2>
      </Link>
    </header>
  )
}

export default Header
