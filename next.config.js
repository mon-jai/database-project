/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.ctfassets.net"]
  },
  // https://stackoverflow.com/a/74981491/
  webpack: config => ({
    ...config,
    watchOptions: {
      ...config.watchOptions,
      poll: 10,
      aggregateTimeout: 10
    }
  })
}

export default nextConfig
