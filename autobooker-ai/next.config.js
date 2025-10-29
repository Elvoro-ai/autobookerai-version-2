/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Optimize images for Netlify
  images: {
    unoptimized: true
  },
  
  // Ensure static export compatibility
  trailingSlash: true,
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  
  // Environment variable configuration
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Experimental features for better Netlify compatibility
  experimental: {
    esmExternals: true,
  },
};

module.exports = nextConfig;