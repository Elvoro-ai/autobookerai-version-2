#!/bin/bash

# AutoBooker AI - Netlify Deployment Fix Script
# This script fixes all deployment issues for Netlify

echo "🚀 Starting AutoBooker AI Netlify deployment fix..."

# Move to the app directory
cd autobooker-ai

# 1. Fix Next.js configuration
echo "📝 Updating Next.js configuration..."
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Static export for Netlify
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true
  },
  
  // Remove trailing slash
  trailingSlash: false,
  
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
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Experimental features
  experimental: {
    esmExternals: true,
  },
};

module.exports = nextConfig;
EOF

# 2. Update package.json build script
echo "📦 Updating package.json build scripts..."
npm pkg set scripts.build="next build"
npm pkg set scripts.netlify:build="npm ci --legacy-peer-deps && npm run build"

# 3. Create/update _redirects file for SPA routing
echo "🔀 Creating redirects file..."
cat > public/_redirects << 'EOF'
# Handle client-side routing
/*    /index.html   200
EOF

# 4. Create optimized Netlify configuration
echo "⚙️ Creating optimized Netlify configuration..."
cat > ../netlify.toml << 'EOF'
[build]
  base = "autobooker-ai"
  publish = "out"
  command = "npm ci --legacy-peer-deps && npm run build"

[build.environment]
  NODE_VERSION = "20"
  NPM_FLAGS = "--legacy-peer-deps"
  CI = "false"
  NETLIFY = "true"
  NODE_ENV = "production"
  NEXT_TELEMETRY_DISABLED = "1"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOF

# 5. Ensure required directories exist
echo "📁 Creating required directories..."
mkdir -p public/images
touch public/.gitkeep

# 6. Clean up and prepare for build
echo "🧹 Cleaning up..."
rm -rf .next out node_modules/.cache

echo "✅ AutoBooker AI Netlify deployment fix completed!"
echo "🎯 Next steps:"
echo "1. Commit these changes to your repository"
echo "2. Connect your GitHub repository to Netlify"
echo "3. Set the build command to: npm ci --legacy-peer-deps && npm run build"
echo "4. Set the publish directory to: out"
echo "5. Add your environment variables in Netlify dashboard"
echo "6. Deploy!"

echo "🌟 Your AutoBooker AI SaaS will be live on Netlify!"
