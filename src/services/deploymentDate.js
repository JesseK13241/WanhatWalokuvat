export const DeploymentDate = () => {
  const deploymentTimestamp = process.env.VERCEL_DEPLOYMENT_TIMESTAMP
  let dateString = "?"
  if (deploymentTimestamp) {
    const deploymentDate = new Date(parseInt(deploymentTimestamp))
    dateString = deploymentDate.toLocaleDateString()
  } else {
    const today = new Date()
    dateString = today.toLocaleDateString() + " (DEV)"
  }

  return (
    <p className="ml-auto text-sm">Updated: {dateString}</p>
  )
}
