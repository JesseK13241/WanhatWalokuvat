export const DeploymentSha = ({ url }) => {
  const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
  let shortSha = "DEV"
  let commitUrl = url
  if (sha) {
    shortSha = sha.substring(0, 7)
    commitUrl = `${url}/commit/${sha}`
  }

  return (
    <p>
      Version 
      <a className="external-link p-1" href={commitUrl}>
        {shortSha}
      </a>
    </p>
  )
}
