export default {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false
      };
    }
    return config;
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY
  },
  experimental: {
    esmExternals: true
  }
};
