import Link from "next/link";

import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="flex bg-secondary p-5 shadow-inner">
      <Link
        href="https://github.com/JesseK13241/TIEA207-projekti/"
        className="flex w-auto items-center gap-2 p-3 border border-black rounded-lg bg-inherit hover:saturate-200"
      >
        <Github/>
        View on GitHub
      </Link>
    </footer>
  )
}

export default Footer
