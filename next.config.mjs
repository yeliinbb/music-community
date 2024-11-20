/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.scdn.co"
      },
      {
        hostname: "fjudnzlhchschbqcanpw.supabase.co"
      },
      {
        hostname: "via.placeholder.com"
      },
      {
        hostname: "static.vecteezy.com"
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        pathname: "/256/25/**"
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/image/**"
      }
    ]
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  webpack: (config) => {
    config.ignoreWarnings = [{ module: /node_modules/ }];
    return config;
  }
};

// module.exports = nextConfig;
export default nextConfig;
