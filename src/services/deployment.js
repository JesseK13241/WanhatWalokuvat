export const DeploymentSha = ({ url }) => {
  const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
  let shortSha = "DEV"
  let commitUrl = url
  if (sha) {
    shortSha = sha.substring(0, 7)
    commitUrl = `${url}/commits/master/${sha}`
  }

  return <a className="ml-auto text-sm" href={commitUrl}>Version {shortSha}</a>
}
