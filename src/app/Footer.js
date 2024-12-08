import { REPO_URL } from "@/app/constants"
import { DeploymentSha } from "@/services/deployment"
import Link from "next/link"

import { Github } from "lucide-react"

const Footer = () => {
  return (
    <footer className="flex items-center bg-secondary p-5 shadow-inner">
      <Link
        href={REPO_URL}
        className="flex w-auto items-center gap-2 rounded-lg border border-black bg-inherit p-3 hover:saturate-200"
      >
        <Github />
        View on GitHub
      </Link>
      <DeploymentSha url={REPO_URL} />
    </footer>
  )
}

export default Footer
