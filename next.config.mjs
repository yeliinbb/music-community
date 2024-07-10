/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.scdn.co"
      },
      {
        hostname: "via.placeholder.com"
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
  }
};

export default nextConfig;
