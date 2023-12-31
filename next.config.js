/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.ctfassets.net"]
  },
  // https://stackoverflow.com/a/74981491/
  webpack: config => ({
    ...config,
    externals: [...config.externals, "bcrypt"],
    watchOptions: {
      ...config.watchOptions,
      poll: 10,
      aggregateTimeout: 10
    }
  }),
  experimental: {
    serverComponentsExternalPackages: ["bcrypt"]
  }
}

export default nextConfig
