/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.ctfassets.net"]
  },
  // https://stackoverflow.com/a/74981491/
  webpack: config => ({
    ...config,
    // https://github.com/kelektiv/node.bcrypt.js/issues/979#issuecomment-1446526365
    externals: [...config.externals, "bcrypt"],
    watchOptions: {
      ...config.watchOptions,
      poll: 10,
      aggregateTimeout: 10
    }
  })
}

export default nextConfig
