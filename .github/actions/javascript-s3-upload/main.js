const { getInput, setOutput, notice } = require('@actions/core')
const { exec } = require('@actions/exec')

function main() {
  notice('Starting action...')

  const bucket = getInput('bucket', { required: true })
  const bucketRegion = getInput('bucket-region', { required: true })
  const distFolder = getInput('dist-folder', { required: true })

  const s3Uri = `s3://${bucket}`
  exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`)

  const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`
  setOutput('website-url', websiteUrl)
}

main()
