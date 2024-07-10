/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.scdn.co"
      },
      {
        hostname: "via.placeholder.com"
      }
    ]
  }
};

export default nextConfig;
