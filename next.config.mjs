import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/core/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons', 'framer-motion', 'date-fns'],
  },
  async redirects() {
    return [
      {
        source: '/favicon.ico',
        destination: '/favicon_io/favicon.ico',
        permanent: true,
      },
      {
        source: '/:locale(en|ar)/web/home',
        destination: '/:locale',
        permanent: true,
      },
      {
        source: '/:locale(en|ar)/web/:path*',
        destination: '/:locale/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default withNextIntl(nextConfig);
