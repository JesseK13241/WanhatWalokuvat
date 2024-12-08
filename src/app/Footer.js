import { DeploymentDate } from "@/services/deploymentDate"
import Link from "next/link"

import { Github } from "lucide-react"

const Footer = () => {
  return (
    <footer className="flex items-center bg-secondary p-5 shadow-inner">
      <Link
        href="https://github.com/JesseK13241/TIEA207-projekti/"
        className="flex w-auto items-center gap-2 rounded-lg border border-black bg-inherit p-3 hover:saturate-200"
      >
        <Github />
        View on GitHub
      </Link>
      <DeploymentDate />
    </footer>
  )
}

export default Footer
