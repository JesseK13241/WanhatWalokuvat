import Link from "next/link"

const Header = () => {
  return (
    <header className="border border-black">
      <h1 className="text-3xl border border-black">
        <a href="/">Aineopintojen projektityö</a>
      </h1>
      <Link href="/pelit/">Pelit</Link>
    </header>
  )
}

export default Header
