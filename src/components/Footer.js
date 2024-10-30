import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="flex border border-black p-5">
      <Link
        href="https://github.com/JesseK13241/TIEA207-projekti/"
        className="flex w-auto items-center gap-2 rounded border border-black bg-slate-300 p-2"
      >
        <Image
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub Logo"
          width={30}
          height={30}
        />
        View on GitHub
      </Link>
    </footer>
  )
}

export default Footer
