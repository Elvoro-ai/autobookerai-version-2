/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Static export for Netlify deployment
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true
  },
  
  // Remove trailing slash to avoid redirect issues
  trailingSlash: false,
  
  // Webpack configuration for better compatibility
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
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Experimental features for better Netlify compatibility
  experimental: {
    esmExternals: true,
  },
};

module.exports = nextConfig;