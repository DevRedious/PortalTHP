/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Fallbacks pour les modules Node.js non disponibles dans le navigateur
    config.resolve.fallback = { 
      fs: false, 
      net: false, 
      tls: false,
    };

    // Ignorer les modules optionnels React Native qui ne sont pas nécessaires en web
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@react-native-async-storage/async-storage': false,
      'pino-pretty': false,
    };

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.ipfs.w3s.link',
      },
      {
        protocol: 'https',
        hostname: '*.ipfs.dweb.link',
      },
      {
        protocol: 'https',
        hostname: 'gateway.pinata.cloud',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
      },
    ],
    // Optimisation des images
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 jours
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Code splitting optimisé
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-avatar'],
  },
  // Compression
  compress: true,
};

module.exports = nextConfig;
