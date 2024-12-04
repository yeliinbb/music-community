/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'i.scdn.co',
      },
      {
        hostname: 'fjudnzlhchschbqcanpw.supabase.co',
      },
      {
        hostname: 'via.placeholder.com',
      },
      {
        hostname: 'static.vecteezy.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        pathname: '/256/25/**',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/image/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [300], // 실제로 사용하는 이미지 크기만 지정
    imageSizes: [300],
    minimumCacheTTL: 60,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.ignoreWarnings = [{ module: /node_modules/ }];
    return config;
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

// module.exports = nextConfig;
export default nextConfig;
