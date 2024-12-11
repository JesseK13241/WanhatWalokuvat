export const DeploymentSha = ({ url }) => {
  const vercel_sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
  const render_sha = process.env.RENDER_GIT_COMMIT
  const sha = vercel_sha || render_sha
  let shortSha = "DEV"
  let commitUrl = url
  if (sha) {
    shortSha = vercel_sha.substring(0, 7)
    commitUrl = `${url}/commit/${vercel_sha}`
  }

  return (
    <p>
      Versio
      <a className="external-link p-1" href={commitUrl}>
        {shortSha}
      </a>
    </p>
  )
}
